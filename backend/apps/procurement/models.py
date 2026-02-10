from django.db import models
from django.contrib.auth import get_user_model
from apps.properties.models import Property

User = get_user_model()

class Vendor(models.Model):
    VENDOR_TYPE_CHOICES = [
        ('supplier', 'Supplier'),
        ('service_provider', 'Service Provider'),
        ('contractor', 'Contractor'),
        ('consultant', 'Consultant'),
    ]
    
    VENDOR_CATEGORY_CHOICES = [
        ('furniture', 'Furniture'),
        ('it_hardware', 'IT Hardware'),
        ('office_supplies', 'Office Supplies'),
        ('cleaning_supplies', 'Cleaning Supplies'),
        ('security', 'Security'),
        ('maintenance', 'Maintenance'),
        ('electrical', 'Electrical'),
        ('plumbing', 'Plumbing'),
        ('hvac', 'HVAC'),
        ('catering', 'Catering'),
        ('other', 'Other'),
    ]
    
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('blacklisted', 'Blacklisted'),
    ]
    
    CONTRACT_TYPE_CHOICES = [
        ('one_time', 'One Time'),
        ('amc', 'Annual Maintenance Contract'),
        ('rate_contract', 'Rate Contract'),
    ]
    
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=50, unique=True)
    vendor_type = models.CharField(max_length=20, choices=VENDOR_TYPE_CHOICES, default='supplier')
    category = models.CharField(max_length=30, choices=VENDOR_CATEGORY_CHOICES, default='other')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    
    # Contact Information
    contact_name = models.CharField(max_length=100, blank=True)
    contact_email = models.EmailField(blank=True)
    contact_phone = models.CharField(max_length=20, blank=True)
    contact_designation = models.CharField(max_length=100, blank=True)

    # Address
    address_street = models.TextField(blank=True)
    address_city = models.CharField(max_length=100, blank=True)
    address_state = models.CharField(max_length=100, blank=True)
    address_pincode = models.CharField(max_length=20, blank=True)
    address_country = models.CharField(max_length=100, default='India')
    
    # Bank Details
    bank_name = models.CharField(max_length=200, blank=True)
    account_number = models.CharField(max_length=50, blank=True)
    ifsc_code = models.CharField(max_length=20, blank=True)
    
    # Tax Details
    gst_number = models.CharField(max_length=20, blank=True)
    pan_number = models.CharField(max_length=20, blank=True)
    
    # Contract Information
    contract_type = models.CharField(max_length=20, choices=CONTRACT_TYPE_CHOICES, blank=True)
    contract_expiry = models.DateField(null=True, blank=True)
    
    # Performance
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    total_orders = models.PositiveIntegerField(default=0)
    total_value = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    
    # Notes
    notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Vendor'
        verbose_name_plural = 'Vendors'
    
    def __str__(self):
        return f"{self.code} - {self.name}"


class PurchaseRequisition(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('pending_approval', 'Pending Approval'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('converted_to_po', 'Converted to PO'),
        ('cancelled', 'Cancelled'),
    ]
    
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]
    
    CATEGORY_CHOICES = [
        ('furniture', 'Furniture'),
        ('it_hardware', 'IT Hardware'),
        ('office_supplies', 'Office Supplies'),
        ('cleaning_supplies', 'Cleaning Supplies'),
        ('security', 'Security'),
        ('maintenance', 'Maintenance'),
        ('electrical', 'Electrical'),
        ('plumbing', 'Plumbing'),
        ('hvac', 'HVAC'),
        ('catering', 'Catering'),
        ('other', 'Other'),
    ]
    
    pr_number = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    
    # Requester Information
    requested_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='requisitions_created'
    )
    department = models.CharField(max_length=100)
    
    # Property
    property_ref = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='requisitions',
        null=True,
        blank=True
    )
    
    # Classification
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium')
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='other')
    
    # Dates
    required_date = models.DateField()
    
    # Status & Approval
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    approved_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name='requisitions_approved',
        null=True,
        blank=True
    )
    approved_at = models.DateTimeField(null=True, blank=True)
    rejection_reason = models.TextField(blank=True)
    
    # Financial
    total_estimated_amount = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    
    # Conversion
    converted_to_po = models.ForeignKey(
        'PurchaseOrder',
        on_delete=models.SET_NULL,
        related_name='source_requisition',
        null=True,
        blank=True
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Purchase Requisition'
        verbose_name_plural = 'Purchase Requisitions'
    
    def __str__(self):
        return f"{self.pr_number} - {self.title}"
    
    def calculate_total(self):
        """Calculate total estimated amount from items"""
        self.total_estimated_amount = sum(item.total_estimated_price for item in self.items.all())
        self.save()


class PurchaseRequisitionItem(models.Model):
    requisition = models.ForeignKey(
        PurchaseRequisition,
        on_delete=models.CASCADE,
        related_name='items'
    )
    item_name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    quantity = models.DecimalField(max_digits=10, decimal_places=2, default=1)
    unit = models.CharField(max_length=20, default='pcs')
    estimated_unit_price = models.DecimalField(max_digits=12, decimal_places=2)
    total_estimated_price = models.DecimalField(max_digits=15, decimal_places=2)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['id']
    
    def save(self, *args, **kwargs):
        self.total_estimated_price = self.quantity * self.estimated_unit_price
        super().save(*args, **kwargs)


class PurchaseOrder(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('pending_approval', 'Pending Approval'),
        ('approved', 'Approved'),
        ('sent', 'Sent'),
        ('acknowledged', 'Acknowledged'),
        ('partially_received', 'Partially Received'),
        ('received', 'Received'),
        ('closed', 'Closed'),
        ('cancelled', 'Cancelled'),
    ]
    
    po_number = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=200)
    
    # Links
    pr = models.ForeignKey(
        PurchaseRequisition,
        on_delete=models.SET_NULL,
        related_name='purchase_orders',
        null=True,
        blank=True
    )
    vendor = models.ForeignKey(
        Vendor,
        on_delete=models.CASCADE,
        related_name='purchase_orders'
    )
    
    # Terms
    terms = models.CharField(max_length=200, blank=True)
    delivery_date = models.DateField()
    delivery_location = models.TextField()
    
    # Financial
    subtotal = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    tax_rate = models.DecimalField(max_digits=5, decimal_places=2, default=18.00)
    tax_amount = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    shipping_cost = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    discount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    
    # Status & Workflow
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    
    prepared_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name='pos_prepared',
        null=True
    )
    approved_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name='pos_approved',
        null=True,
        blank=True
    )
    approved_at = models.DateTimeField(null=True, blank=True)
    sent_at = models.DateTimeField(null=True, blank=True)
    received_at = models.DateTimeField(null=True, blank=True)
    
    # Notes
    notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Purchase Order'
        verbose_name_plural = 'Purchase Orders'
    
    def __str__(self):
        return f"{self.po_number} - {self.title}"
    
    def calculate_totals(self):
        """Calculate totals from items"""
        items = self.items.all()
        self.subtotal = sum(item.total_price for item in items)
        self.tax_amount = self.subtotal * (self.tax_rate / 100)
        self.total_amount = self.subtotal + self.tax_amount + self.shipping_cost - self.discount
        self.save()
    
    def update_received_status(self):
        """Update status based on received quantities"""
        items = self.items.all()
        total_quantity = sum(item.quantity for item in items)
        total_received = sum(item.received_quantity for item in items)
        
        if total_received == 0:
            return
        elif total_received >= total_quantity:
            self.status = 'received'
        else:
            self.status = 'partially_received'
        
        self.save()


class PurchaseOrderItem(models.Model):
    purchase_order = models.ForeignKey(
        PurchaseOrder,
        on_delete=models.CASCADE,
        related_name='items'
    )
    item_name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=20, default='pcs')
    unit_price = models.DecimalField(max_digits=12, decimal_places=2)
    total_price = models.DecimalField(max_digits=15, decimal_places=2)
    received_quantity = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['id']
    
    def save(self, *args, **kwargs):
        self.total_price = self.quantity * self.unit_price
        super().save(*args, **kwargs)
