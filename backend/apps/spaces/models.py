from django.db import models
from apps.properties.models import Property

class Space(models.Model):
    TYPE_CHOICES = [
        ('private_office', 'Private Office'),
        ('open_desk', 'Open Desk'),
        ('meeting_room', 'Meeting Room'),
        ('virtual_office', 'Virtual Office'),
        ('hot_desk', 'Hot Desk'),
    ]

    STATUS_CHOICES = [
        ('available', 'Available'),
        ('occupied', 'Occupied'),
        ('maintenance', 'Maintenance'),
        ('reserved', 'Reserved'),
    ]

    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=255)
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='spaces'
    )
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='private_office')
    
    # Location details
    floor = models.IntegerField()
    
    # Specifications
    area = models.DecimalField(max_digits=10, decimal_places=2, help_text="Area in sqft")
    capacity = models.IntegerField(null=True, blank=True, help_text="Number of people")
    
    # Pricing
    base_rent = models.DecimalField(max_digits=12, decimal_places=2, help_text="Monthly base rent in INR")
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    # Features
    amenities = models.JSONField(default=list, blank=True, help_text="List of amenities like WiFi, AC, etc.")
    
    # Management
    current_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    description = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['property', 'floor', 'code']
        unique_together = ['property', 'code']

    def __str__(self):
        return f"{self.code} - {self.name} ({self.property.name})"
