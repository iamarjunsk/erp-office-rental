from decimal import Decimal
from django.db import models
from django.db.models import Sum
from apps.companies.models import Company
from apps.leases.models import Lease

class Invoice(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('sent', 'Sent'),
        ('paid', 'Paid'),
        ('overdue', 'Overdue'),
        ('partial', 'Partial'),
        ('cancelled', 'Cancelled'),
    ]

    TYPE_CHOICES = [
        ('rent', 'Rent'),
        ('utility', 'Utility'),
        ('maintenance', 'Maintenance'),
        ('service', 'Service'),
        ('deposit', 'Security Deposit'),
        ('other', 'Other'),
    ]

    invoice_number = models.CharField(max_length=50, unique=True)
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='invoices'
    )
    lease = models.ForeignKey(
        Lease,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='invoices'
    )
    
    # Invoice period
    period_start = models.DateField()
    period_end = models.DateField()
    
    # Dates
    invoice_date = models.DateField()
    due_date = models.DateField()
    
    # Financial
    subtotal = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    tax_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    discount_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    amount_paid = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    balance_due = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    
    # GST details
    gst_rate = models.DecimalField(max_digits=5, decimal_places=2, default=18.00)
    
    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='rent')
    
    # Notes
    notes = models.TextField(blank=True)
    terms = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.invoice_number} - {self.company.name}"

    def calculate_totals(self):
        """Calculate invoice totals from items"""
        # Optimized: Use database aggregation instead of iterating in Python
        self.subtotal = self.items.aggregate(total=Sum('line_total'))['total'] or 0
        self.tax_amount = self.subtotal * (self.gst_rate / Decimal(100))
        self.total_amount = self.subtotal + self.tax_amount - self.discount_amount
        self.balance_due = self.total_amount - self.amount_paid
        self.save()


class InvoiceItem(models.Model):
    invoice = models.ForeignKey(
        Invoice,
        on_delete=models.CASCADE,
        related_name='items'
    )
    description = models.CharField(max_length=255)
    quantity = models.DecimalField(max_digits=10, decimal_places=2, default=1)
    unit_price = models.DecimalField(max_digits=12, decimal_places=2)
    line_total = models.DecimalField(max_digits=12, decimal_places=2)
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f"{self.description} - {self.line_total}"

    def save(self, *args, **kwargs):
        self.line_total = self.quantity * self.unit_price
        super().save(*args, **kwargs)


class Payment(models.Model):
    PAYMENT_METHOD_CHOICES = [
        ('cash', 'Cash'),
        ('cheque', 'Cheque'),
        ('bank_transfer', 'Bank Transfer'),
        ('upi', 'UPI'),
        ('credit_card', 'Credit Card'),
        ('debit_card', 'Debit Card'),
        ('netbanking', 'Net Banking'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]

    invoice = models.ForeignKey(
        Invoice,
        on_delete=models.CASCADE,
        related_name='payments'
    )
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_date = models.DateField()
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    transaction_id = models.CharField(max_length=100, blank=True)
    reference_number = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='completed')
    notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-payment_date']

    def __str__(self):
        return f"Payment {self.amount} for {self.invoice.invoice_number}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Update invoice balance
        # Optimized: Use database aggregation instead of iterating in Python
        total_paid = self.invoice.payments.filter(status='completed').aggregate(total=Sum('amount'))['total'] or 0
        self.invoice.amount_paid = total_paid
        self.invoice.balance_due = self.invoice.total_amount - self.invoice.amount_paid
        
        # Update invoice status
        if self.invoice.balance_due <= 0:
            self.invoice.status = 'paid'
        elif self.invoice.amount_paid > 0:
            self.invoice.status = 'partial'
        
        self.invoice.save()
