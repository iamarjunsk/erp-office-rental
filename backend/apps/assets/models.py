from django.db import models
from django.conf import settings
from apps.properties.models import Property
from apps.spaces.models import Space

class AssetCategory(models.Model):
    """Categories for assets (Computers, Furniture, Appliances, etc.)"""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    
    # Depreciation settings
    default_useful_life_years = models.IntegerField(null=True, blank=True, help_text="Default useful life in years")
    default_depreciation_rate = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, help_text="Annual depreciation %")
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Asset Categories"
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Asset(models.Model):
    """Asset/Equipment tracking system"""
    
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('in_maintenance', 'In Maintenance'),
        ('damaged', 'Damaged'),
        ('disposed', 'Disposed'),
        ('lost', 'Lost'),
    ]
    
    CONDITION_CHOICES = [
        ('excellent', 'Excellent'),
        ('good', 'Good'),
        ('fair', 'Fair'),
        ('poor', 'Poor'),
    ]
    
    # Identification
    asset_code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    
    # Category
    category = models.ForeignKey(
        AssetCategory,
        on_delete=models.SET_NULL,
        null=True,
        related_name='assets'
    )
    
    # Location
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='assets'
    )
    space = models.ForeignKey(
        Space,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assets'
    )
    
    # Specifications
    manufacturer = models.CharField(max_length=255, blank=True)
    model_number = models.CharField(max_length=255, blank=True)
    serial_number = models.CharField(max_length=255, blank=True)
    specifications = models.TextField(blank=True, help_text="Technical specifications")
    
    # Purchase info
    purchase_date = models.DateField(null=True, blank=True)
    purchase_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    vendor = models.CharField(max_length=255, blank=True)
    warranty_expiry = models.DateField(null=True, blank=True)
    
    # Depreciation
    useful_life_years = models.IntegerField(null=True, blank=True)
    depreciation_rate = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    
    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES, default='good')
    
    # Assignment
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_assets'
    )
    assignment_date = models.DateField(null=True, blank=True)
    
    # Maintenance
    last_maintenance_date = models.DateField(null=True, blank=True)
    next_maintenance_date = models.DateField(null=True, blank=True)
    
    # Photos/Documents
    photo_url = models.URLField(blank=True)
    document_url = models.URLField(blank=True, help_text="Purchase invoice or warranty document")
    
    # Notes
    notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.asset_code} - {self.name}"
    
    def calculate_current_value(self):
        """Calculate current book value after depreciation"""
        if not self.purchase_price or not self.purchase_date:
            return self.purchase_price or 0
        
        from datetime import date
        
        years_elapsed = (date.today() - self.purchase_date).days / 365.25
        rate = (self.depreciation_rate or self.category.default_depreciation_rate or 0) / 100
        
        if rate > 0:
            # Straight line depreciation
            value = float(self.purchase_price) * (1 - (rate * years_elapsed))
            return max(0, value)
        
        return self.purchase_price
    
    def get_age_years(self):
        """Calculate age in years"""
        if not self.purchase_date:
            return 0
        from datetime import date
        return round((date.today() - self.purchase_date).days / 365.25, 1)
    
    def check_warranty(self):
        """Check if asset is still under warranty"""
        if not self.warranty_expiry:
            return False
        from datetime import date
        return date.today() <= self.warranty_expiry


class AssetMaintenance(models.Model):
    """Maintenance history for assets"""
    
    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE,
        related_name='maintenance_history'
    )
    maintenance_date = models.DateField()
    description = models.TextField()
    cost = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    performed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    vendor_name = models.CharField(max_length=255, blank=True)
    
    # Next scheduled maintenance
    next_maintenance_date = models.DateField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-maintenance_date']
        verbose_name_plural = "Asset Maintenance Records"
    
    def __str__(self):
        return f"{self.asset.asset_code} - {self.maintenance_date}"
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Update asset's maintenance dates
        self.asset.last_maintenance_date = self.maintenance_date
        self.asset.next_maintenance_date = self.next_maintenance_date
        self.asset.save()


class AssetAssignmentHistory(models.Model):
    """Track asset assignment history"""
    
    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE,
        related_name='assignment_history'
    )
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='asset_assignment_history'
    )
    assigned_date = models.DateField()
    returned_date = models.DateField(null=True, blank=True)
    assigned_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='asset_assignments_given'
    )
    notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-assigned_date']
        verbose_name_plural = "Asset Assignment History"
    
    def __str__(self):
        return f"{self.asset.asset_code} assigned to {self.assigned_to} on {self.assigned_date}"
