from rest_framework import serializers
from .models import Vendor, PurchaseRequisition, PurchaseRequisitionItem, PurchaseOrder, PurchaseOrderItem

class VendorSerializer(serializers.ModelSerializer):
    contact = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()
    bank_details = serializers.SerializerMethodField()

    # Write fields
    contact_name = serializers.CharField(write_only=True, required=False, allow_blank=True)
    contact_email = serializers.EmailField(write_only=True, required=False, allow_blank=True)
    contact_phone = serializers.CharField(write_only=True, required=False, allow_blank=True)
    contact_designation = serializers.CharField(write_only=True, required=False, allow_blank=True)
    address_street = serializers.CharField(write_only=True, required=False, allow_blank=True)
    address_city = serializers.CharField(write_only=True, required=False, allow_blank=True)
    address_state = serializers.CharField(write_only=True, required=False, allow_blank=True)
    address_pincode = serializers.CharField(write_only=True, required=False, allow_blank=True)
    address_country = serializers.CharField(write_only=True, required=False, allow_blank=True)
    bank_name = serializers.CharField(write_only=True, required=False, allow_blank=True)
    account_number = serializers.CharField(write_only=True, required=False, allow_blank=True)
    ifsc_code = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = Vendor
        fields = [
            'id', 'name', 'code', 'vendor_type', 'category', 'status',
            'contact', 'address', 'bank_details', 'gst_number', 'pan_number',
            'contract_type', 'contract_expiry', 'rating', 'total_orders',
            'total_value', 'notes', 'created_at', 'updated_at',
            # Write-only fields
            'contact_name', 'contact_email', 'contact_phone', 'contact_designation',
            'address_street', 'address_city', 'address_state', 'address_pincode', 'address_country',
            'bank_name', 'account_number', 'ifsc_code'
        ]

    def get_contact(self, obj):
        return {
            'name': obj.contact_name,
            'email': obj.contact_email,
            'phone': obj.contact_phone,
            'designation': obj.contact_designation,
        }

    def get_address(self, obj):
        return {
            'street': obj.address_street,
            'city': obj.address_city,
            'state': obj.address_state,
            'pincode': obj.address_pincode,
            'country': obj.address_country,
        }

    def get_bank_details(self, obj):
        return {
            'bank_name': obj.bank_name,
            'account_number': obj.account_number,
            'ifsc': obj.ifsc_code,
        }


class PurchaseRequisitionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseRequisitionItem
        fields = ['id', 'item_name', 'description', 'quantity', 'unit', 'estimated_unit_price', 'total_estimated_price', 'created_at']
        read_only_fields = ['total_estimated_price']


class PurchaseRequisitionListSerializer(serializers.ModelSerializer):
    requested_by = serializers.SerializerMethodField()
    property = serializers.SerializerMethodField()
    approved_by = serializers.SerializerMethodField()
    converted_to_po = serializers.SerializerMethodField()
    total_estimated_amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    
    class Meta:
        model = PurchaseRequisition
        fields = [
            'id', 'pr_number', 'title', 'description', 'requested_by',
            'department', 'property_ref', 'property', 'priority', 'category',
            'required_date', 'status', 'total_estimated_amount', 'approved_by',
            'approved_at', 'converted_to_po', 'created_at', 'updated_at'
        ]
    
    def get_requested_by(self, obj):
        if obj.requested_by:
            return {
                'id': obj.requested_by.id,
                'first_name': obj.requested_by.first_name,
                'last_name': obj.requested_by.last_name,
                'email': obj.requested_by.email,
            }
        return None
    
    def get_property(self, obj):
        if obj.property_ref:
            return {
                'id': obj.property_ref.id,
                'name': obj.property_ref.name,
            }
        return None
    
    def get_approved_by(self, obj):
        if obj.approved_by:
            return {
                'id': obj.approved_by.id,
                'first_name': obj.approved_by.first_name,
                'last_name': obj.approved_by.last_name,
                'email': obj.approved_by.email,
            }
        return None
    
    def get_converted_to_po(self, obj):
        if obj.converted_to_po:
            return {
                'id': obj.converted_to_po.id,
                'po_number': obj.converted_to_po.po_number,
            }
        return None


class PurchaseRequisitionDetailSerializer(PurchaseRequisitionListSerializer):
    items = PurchaseRequisitionItemSerializer(many=True, read_only=True)
    
    class Meta(PurchaseRequisitionListSerializer.Meta):
        fields = PurchaseRequisitionListSerializer.Meta.fields + ['items', 'rejection_reason']


class PurchaseRequisitionCreateUpdateSerializer(serializers.ModelSerializer):
    items = PurchaseRequisitionItemSerializer(many=True)
    
    class Meta:
        model = PurchaseRequisition
        fields = [
            'title', 'description', 'department', 'property_ref',
            'priority', 'category', 'required_date', 'items'
        ]
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        
        # Generate PR number
        from datetime import datetime
        year = datetime.now().year
        count = PurchaseRequisition.objects.filter(
            created_at__year=year
        ).count() + 1
        pr_number = f"PR-{year}-{count:03d}"
        
        pr = PurchaseRequisition.objects.create(
            pr_number=pr_number,
            requested_by=self.context['request'].user,
            **validated_data
        )
        
        for item_data in items_data:
            PurchaseRequisitionItem.objects.create(requisition=pr, **item_data)
        
        pr.calculate_total()
        return pr
    
    def update(self, instance, validated_data):
        items_data = validated_data.pop('items', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if items_data is not None:
            # Delete existing items and recreate
            instance.items.all().delete()
            for item_data in items_data:
                PurchaseRequisitionItem.objects.create(requisition=instance, **item_data)
            instance.calculate_total()
        
        return instance


class PurchaseOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrderItem
        fields = ['id', 'item_name', 'description', 'quantity', 'unit', 'unit_price', 'total_price', 'received_quantity', 'created_at']
        read_only_fields = ['total_price']


class PurchaseOrderListSerializer(serializers.ModelSerializer):
    pr = serializers.SerializerMethodField()
    vendor = serializers.SerializerMethodField()
    prepared_by = serializers.SerializerMethodField()
    approved_by = serializers.SerializerMethodField()
    total_amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    
    class Meta:
        model = PurchaseOrder
        fields = [
            'id', 'po_number', 'pr', 'vendor', 'title',
            'terms', 'delivery_date', 'delivery_location', 'subtotal',
            'tax_rate', 'tax_amount', 'shipping_cost', 'discount', 'total_amount',
            'status', 'prepared_by', 'approved_by', 'approved_at', 'sent_at',
            'received_at', 'notes', 'created_at', 'updated_at'
        ]
    
    def get_pr(self, obj):
        if obj.pr:
            return {
                'id': obj.pr.id,
                'pr_number': obj.pr.pr_number,
                'title': obj.pr.title,
            }
        return None
    
    def get_vendor(self, obj):
        if obj.vendor:
            return {
                'id': obj.vendor.id,
                'name': obj.vendor.name,
                'contact_name': obj.vendor.contact_name,
                'contact_email': obj.vendor.contact_email,
                'contact_phone': obj.vendor.contact_phone,
            }
        return None
    
    def get_prepared_by(self, obj):
        if obj.prepared_by:
            return {
                'id': obj.prepared_by.id,
                'first_name': obj.prepared_by.first_name,
                'last_name': obj.prepared_by.last_name,
            }
        return None
    
    def get_approved_by(self, obj):
        if obj.approved_by:
            return {
                'id': obj.approved_by.id,
                'first_name': obj.approved_by.first_name,
                'last_name': obj.approved_by.last_name,
            }
        return None


class PurchaseOrderDetailSerializer(PurchaseOrderListSerializer):
    items = PurchaseOrderItemSerializer(many=True, read_only=True)
    
    class Meta(PurchaseOrderListSerializer.Meta):
        fields = PurchaseOrderListSerializer.Meta.fields + ['items']


class PurchaseOrderCreateUpdateSerializer(serializers.ModelSerializer):
    items = PurchaseOrderItemSerializer(many=True)
    
    class Meta:
        model = PurchaseOrder
        fields = [
            'pr', 'vendor', 'title', 'terms', 'delivery_date',
            'delivery_location', 'tax_rate', 'shipping_cost', 'discount', 'items', 'notes'
        ]
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        
        # Generate PO number
        from datetime import datetime
        year = datetime.now().year
        count = PurchaseOrder.objects.filter(
            created_at__year=year
        ).count() + 1
        po_number = f"PO-{year}-{count:03d}"
        
        po = PurchaseOrder.objects.create(
            po_number=po_number,
            prepared_by=self.context['request'].user,
            **validated_data
        )
        
        for item_data in items_data:
            PurchaseOrderItem.objects.create(purchase_order=po, **item_data)
        
        po.calculate_totals()
        
        # Update PR status if linked
        if po.pr and po.pr.status == 'approved':
            po.pr.status = 'converted_to_po'
            po.pr.converted_to_po = po
            po.pr.save()
        
        return po
    
    def update(self, instance, validated_data):
        items_data = validated_data.pop('items', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        if items_data is not None:
            instance.items.all().delete()
            for item_data in items_data:
                PurchaseOrderItem.objects.create(purchase_order=instance, **item_data)
            instance.calculate_totals()
        
        return instance
