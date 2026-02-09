from django.db import models

class Company(models.Model):
    TYPE_CHOICES = [
        ('pvt_ltd', 'Private Limited'),
        ('llp', 'LLP'),
        ('partnership', 'Partnership'),
        ('proprietorship', 'Proprietorship'),
        ('public_ltd', 'Public Limited'),
    ]

    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('blacklisted', 'Blacklisted'),
    ]

    name = models.CharField(max_length=255)
    legal_name = models.CharField(max_length=255, blank=True)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='pvt_ltd')
    
    # Registration
    gstin = models.CharField(max_length=15, blank=True, null=True, unique=True)
    pan = models.CharField(max_length=10, blank=True, null=True)
    cin = models.CharField(max_length=21, blank=True, null=True, help_text="Corporate Identification Number")
    
    # Industry
    industry = models.CharField(max_length=100, blank=True)
    
    # Location
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    pincode = models.CharField(max_length=20, blank=True)
    
    # Contact
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    website = models.URLField(blank=True)
    
    # Financial
    credit_score = models.IntegerField(default=0, help_text="Credit score 0-100")
    
    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    
    # Notes
    notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Companies"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.type})"
