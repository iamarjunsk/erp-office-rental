from django.contrib import admin
from .models import Asset, AssetCategory, AssetMaintenance, AssetAssignmentHistory

class AssetMaintenanceInline(admin.TabularInline):
    model = AssetMaintenance
    extra = 0
    fields = ['maintenance_date', 'description', 'cost', 'next_maintenance_date']

class AssetAssignmentHistoryInline(admin.TabularInline):
    model = AssetAssignmentHistory
    extra = 0
    fields = ['assigned_to', 'assigned_date', 'returned_date']
    readonly_fields = ['assigned_date']

@admin.register(AssetCategory)
class AssetCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'default_useful_life_years', 'default_depreciation_rate']
    search_fields = ['name']

@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ['asset_code', 'name', 'category', 'property', 'status', 'condition', 'purchase_date']
    list_filter = ['status', 'condition', 'category', 'property']
    search_fields = ['asset_code', 'name', 'serial_number']
    date_hierarchy = 'purchase_date'
    inlines = [AssetMaintenanceInline, AssetAssignmentHistoryInline]
    readonly_fields = ['asset_code', 'created_at', 'updated_at']

@admin.register(AssetMaintenance)
class AssetMaintenanceAdmin(admin.ModelAdmin):
    list_display = ['asset', 'maintenance_date', 'cost', 'performed_by']
    list_filter = ['maintenance_date']
    search_fields = ['asset__asset_code', 'asset__name']
    date_hierarchy = 'maintenance_date'

@admin.register(AssetAssignmentHistory)
class AssetAssignmentHistoryAdmin(admin.ModelAdmin):
    list_display = ['asset', 'assigned_to', 'assigned_date', 'returned_date']
    list_filter = ['assigned_date']
    search_fields = ['asset__asset_code', 'assigned_to__first_name', 'assigned_to__last_name']
