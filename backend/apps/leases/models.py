from django.db import models
from apps.companies.models import Company
from apps.spaces.models import Space

class Lease(models.Model):
    TYPE_CHOICES = [
        ('lease', 'Lease'),
        ('license', 'License'),
        ('coworking_membership', 'Co-working Membership'),
    ]

    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('active', 'Active'),
        ('expired', 'Expired'),
        ('terminated', 'Terminated'),
    ]

    lease_number = models.CharField(max_length=50, unique=True)
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='leases'
    )
    space = models.ForeignKey(
        Space,
        on_delete=models.CASCADE,
        related_name='leases'
    )
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='lease')
    
    # Dates
    start_date = models.DateField()
    end_date = models.DateField()
    
    # Financial
    rent_amount = models.DecimalField(max_digits=12, decimal_places=2, help_text="Monthly rent in INR")
    security_deposit = models.DecimalField(max_digits=12, decimal_places=2, default=0, help_text="Security deposit in INR")
    
    # Terms
    rent_escalation_percent = models.DecimalField(max_digits=5, decimal_places=2, default=0, help_text="Annual rent escalation %")
    notice_period_days = models.IntegerField(default=30, help_text="Notice period in days")
    
    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    
    # Documents
    document_url = models.URLField(blank=True, help_text="URL to lease agreement document")
    
    # Notes
    notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.lease_number} - {self.company.name} ({self.space.code})"
