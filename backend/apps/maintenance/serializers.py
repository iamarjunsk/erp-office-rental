from rest_framework import serializers
from .models import MaintenanceCategory, MaintenanceRequest, MaintenanceTask, MaintenanceComment
from apps.properties.models import Property
from apps.spaces.models import Space
from apps.users.models import User

class UserBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email']

class PropertyBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ['id', 'name', 'code']

class SpaceBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Space
        fields = ['id', 'code', 'name']

class MaintenanceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceCategory
        fields = ['id', 'name', 'description', 'color']

class MaintenanceTaskSerializer(serializers.ModelSerializer):
    assigned_to_details = UserBriefSerializer(source='assigned_to', read_only=True)
    
    class Meta:
        model = MaintenanceTask
        fields = [
            'id', 'description', 'status', 'assigned_to', 'assigned_to_details',
            'estimated_hours', 'actual_hours', 'due_date', 'completed_date',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

class MaintenanceCommentSerializer(serializers.ModelSerializer):
    author_details = UserBriefSerializer(source='author', read_only=True)
    
    class Meta:
        model = MaintenanceComment
        fields = ['id', 'comment', 'is_internal', 'author', 'author_details', 'created_at']
        read_only_fields = ['created_at', 'author']

class MaintenanceRequestSerializer(serializers.ModelSerializer):
    property_details = PropertyBriefSerializer(source='property', read_only=True)
    space_details = SpaceBriefSerializer(source='space', read_only=True)
    category_details = MaintenanceCategorySerializer(source='category', read_only=True)
    reported_by_details = UserBriefSerializer(source='reported_by', read_only=True)
    assigned_to_details = UserBriefSerializer(source='assigned_to', read_only=True)
    tasks = MaintenanceTaskSerializer(many=True, read_only=True)
    comments = MaintenanceCommentSerializer(many=True, read_only=True)
    
    class Meta:
        model = MaintenanceRequest
        fields = [
            'id', 'ticket_number', 'title', 'description', 'type', 'priority', 'status',
            'property', 'property_details', 'space', 'space_details', 'specific_location',
            'category', 'category_details', 'reported_by', 'reported_by_details',
            'assigned_to', 'assigned_to_details', 'vendor_name', 'vendor_contact',
            'reported_date', 'scheduled_date', 'started_date', 'completed_date',
            'estimated_cost', 'actual_cost', 'resolution_notes',
            'tasks', 'comments', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'ticket_number', 'reported_date', 'reported_by', 
            'created_at', 'updated_at'
        ]

class MaintenanceRequestCreateSerializer(serializers.ModelSerializer):
    """Simplified serializer for creating maintenance requests"""
    
    class Meta:
        model = MaintenanceRequest
        fields = [
            'title', 'description', 'property', 'space', 'specific_location',
            'category', 'type', 'priority', 'scheduled_date', 'estimated_cost'
        ]
