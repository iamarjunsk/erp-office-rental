from django.contrib import admin
from .models import Vendor, PurchaseRequisition, PurchaseRequisitionItem, PurchaseOrder, PurchaseOrderItem

@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = ['code', 'name', 'vendor_type', 'category', 'status', 'rating', 'contact_name']
    list_filter = ['status', 'vendor_type', 'category']
    search_fields = ['name', 'code', 'contact_name', 'contact_email', 'gst_number']
    ordering = ['-created_at']

@admin.register(PurchaseRequisition)
class PurchaseRequisitionAdmin(admin.ModelAdmin):
    list_display = ['pr_number', 'title', 'requested_by', 'department', 'status', 'priority', 'total_estimated_amount']
    list_filter = ['status', 'priority', 'category', 'department']
    search_fields = ['pr_number', 'title', 'description']
    ordering = ['-created_at']

@admin.register(PurchaseRequisitionItem)
class PurchaseRequisitionItemAdmin(admin.ModelAdmin):
    list_display = ['item_name', 'requisition', 'quantity', 'unit', 'total_estimated_price']
    search_fields = ['item_name', 'description']

@admin.register(PurchaseOrder)
class PurchaseOrderAdmin(admin.ModelAdmin):
    list_display = ['po_number', 'title', 'vendor', 'status', 'total_amount', 'delivery_date']
    list_filter = ['status']
    search_fields = ['po_number', 'title', 'vendor__name']
    ordering = ['-created_at']

@admin.register(PurchaseOrderItem)
class PurchaseOrderItemAdmin(admin.ModelAdmin):
    list_display = ['item_name', 'purchase_order', 'quantity', 'unit', 'total_price', 'received_quantity']
    search_fields = ['item_name', 'description']
