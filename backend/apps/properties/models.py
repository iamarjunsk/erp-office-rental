from django.db import models
from django.conf import settings

class Property(models.Model):
    TYPE_CHOICES = [
        ('commercial', 'Commercial Office'),
        ('coworking', 'Co-working Space'),
        ('mixed_use', 'Mixed Use'),
    ]

    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('under_renovation', 'Under Renovation'),
    ]

    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='commercial')
    
    # Location
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=20)
    
    # Stats
    total_area = models.DecimalField(max_digits=10, decimal_places=2, help_text="Total area in sqft")
    build_year = models.IntegerField(null=True, blank=True)
    floors = models.IntegerField(null=True, blank=True)
    
    # Management
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    manager = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='managed_properties'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Properties"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.code})"
