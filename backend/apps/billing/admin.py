from django.contrib import admin
from .models import Invoice, InvoiceItem, Payment

class InvoiceItemInline(admin.TabularInline):
    model = InvoiceItem
    extra = 1

class PaymentInline(admin.TabularInline):
    model = Payment
    extra = 0
    readonly_fields = ['created_at']

@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ['invoice_number', 'company', 'total_amount', 'status', 'due_date', 'balance_due']
    list_filter = ['status', 'type', 'invoice_date']
    search_fields = ['invoice_number', 'company__name', 'notes']
    date_hierarchy = 'invoice_date'
    inlines = [InvoiceItemInline, PaymentInline]
    readonly_fields = ['created_at', 'updated_at', 'subtotal', 'tax_amount', 'total_amount', 'amount_paid', 'balance_due']

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['id', 'invoice', 'amount', 'payment_date', 'payment_method', 'status']
    list_filter = ['status', 'payment_method', 'payment_date']
    search_fields = ['transaction_id', 'reference_number', 'notes']
    date_hierarchy = 'payment_date'
