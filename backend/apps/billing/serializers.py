from rest_framework import serializers
from .models import Invoice, InvoiceItem, Payment
from apps.companies.models import Company
from apps.leases.models import Lease

class CompanyBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name']

class LeaseBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lease
        fields = ['id', 'lease_number']

class InvoiceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceItem
        fields = ['id', 'description', 'quantity', 'unit_price', 'line_total']
        read_only_fields = ['line_total']

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            'id', 'invoice', 'amount', 'payment_date', 'payment_method',
            'transaction_id', 'reference_number', 'status', 'notes',
            'created_at'
        ]

class InvoiceSerializer(serializers.ModelSerializer):
    company_details = CompanyBriefSerializer(source='company', read_only=True)
    lease_details = LeaseBriefSerializer(source='lease', read_only=True)
    items = InvoiceItemSerializer(many=True, required=False)
    payments = PaymentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Invoice
        fields = [
            'id', 'invoice_number', 'company', 'company_details',
            'lease', 'lease_details', 'period_start', 'period_end',
            'invoice_date', 'due_date', 'subtotal', 'tax_amount',
            'discount_amount', 'total_amount', 'amount_paid', 'balance_due',
            'gst_rate', 'status', 'type', 'notes', 'terms',
            'items', 'payments', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at', 'subtotal', 'tax_amount', 'total_amount', 'balance_due']

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        invoice = Invoice.objects.create(**validated_data)
        
        # Create invoice items
        for item_data in items_data:
            InvoiceItem.objects.create(invoice=invoice, **item_data)
        
        # Calculate totals
        invoice.calculate_totals()
        return invoice

    def update(self, instance, validated_data):
        items_data = validated_data.pop('items', None)
        
        # Update invoice fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update items if provided
        if items_data is not None:
            # Delete existing items and recreate
            instance.items.all().delete()
            for item_data in items_data:
                InvoiceItem.objects.create(invoice=instance, **item_data)
        
        # Recalculate totals
        instance.calculate_totals()
        return instance
