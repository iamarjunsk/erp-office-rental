from django.contrib import admin
from .models import MaintenanceCategory, MaintenanceRequest, MaintenanceTask, MaintenanceComment

class MaintenanceTaskInline(admin.TabularInline):
    model = MaintenanceTask
    extra = 1
    fields = ['description', 'status', 'assigned_to', 'due_date']

class MaintenanceCommentInline(admin.TabularInline):
    model = MaintenanceComment
    extra = 0
    fields = ['comment', 'author', 'is_internal', 'created_at']
    readonly_fields = ['created_at']

@admin.register(MaintenanceCategory)
class MaintenanceCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'color_preview', 'description']
    search_fields = ['name']
    
    def color_preview(self, obj):
        return f'<span style="background-color: {obj.color}; padding: 5px 10px; border-radius: 3px;">&nbsp;</span> {obj.color}'
    color_preview.allow_tags = True
    color_preview.short_description = 'Color'

@admin.register(MaintenanceRequest)
class MaintenanceRequestAdmin(admin.ModelAdmin):
    list_display = ['ticket_number', 'title', 'property', 'priority', 'status', 'scheduled_date', 'created_at']
    list_filter = ['status', 'priority', 'type', 'category', 'created_at']
    search_fields = ['ticket_number', 'title', 'description']
    date_hierarchy = 'created_at'
    inlines = [MaintenanceTaskInline, MaintenanceCommentInline]
    readonly_fields = ['ticket_number', 'reported_date', 'created_at', 'updated_at']
    fieldsets = (
        ('Request Info', {
            'fields': ('ticket_number', 'title', 'description', 'type', 'priority', 'status')
        }),
        ('Location', {
            'fields': ('property', 'space', 'specific_location')
        }),
        ('Category', {
            'fields': ('category',)
        }),
        ('Assignment', {
            'fields': ('reported_by', 'assigned_to', 'vendor_name', 'vendor_contact')
        }),
        ('Dates', {
            'fields': ('reported_date', 'scheduled_date', 'started_date', 'completed_date')
        }),
        ('Costs', {
            'fields': ('estimated_cost', 'actual_cost')
        }),
        ('Resolution', {
            'fields': ('resolution_notes',)
        }),
    )

@admin.register(MaintenanceTask)
class MaintenanceTaskAdmin(admin.ModelAdmin):
    list_display = ['description', 'request', 'status', 'assigned_to', 'due_date']
    list_filter = ['status', 'due_date']
    search_fields = ['description', 'request__ticket_number']

@admin.register(MaintenanceComment)
class MaintenanceCommentAdmin(admin.ModelAdmin):
    list_display = ['request', 'author', 'comment_preview', 'is_internal', 'created_at']
    list_filter = ['is_internal', 'created_at']
    search_fields = ['comment', 'request__ticket_number']
    readonly_fields = ['created_at']
    
    def comment_preview(self, obj):
        return obj.comment[:50] + '...' if len(obj.comment) > 50 else obj.comment
    comment_preview.short_description = 'Comment'
