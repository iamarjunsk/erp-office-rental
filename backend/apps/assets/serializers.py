from rest_framework import serializers
from .models import Asset, AssetCategory, AssetMaintenance, AssetAssignmentHistory
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

class AssetCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetCategory
        fields = ['id', 'name', 'description', 'default_useful_life_years', 'default_depreciation_rate']

class AssetMaintenanceSerializer(serializers.ModelSerializer):
    performed_by_details = UserBriefSerializer(source='performed_by', read_only=True)
    
    class Meta:
        model = AssetMaintenance
        fields = [
            'id', 'maintenance_date', 'description', 'cost',
            'performed_by', 'performed_by_details', 'vendor_name',
            'next_maintenance_date', 'created_at'
        ]
        read_only_fields = ['created_at']

class AssetAssignmentHistorySerializer(serializers.ModelSerializer):
    assigned_to_details = UserBriefSerializer(source='assigned_to', read_only=True)
    assigned_by_details = UserBriefSerializer(source='assigned_by', read_only=True)
    
    class Meta:
        model = AssetAssignmentHistory
        fields = [
            'id', 'assigned_to', 'assigned_to_details', 'assigned_date',
            'returned_date', 'assigned_by', 'assigned_by_details', 'notes'
        ]

class AssetSerializer(serializers.ModelSerializer):
    category_details = AssetCategorySerializer(source='category', read_only=True)
    property_details = PropertyBriefSerializer(source='property', read_only=True)
    space_details = SpaceBriefSerializer(source='space', read_only=True)
    assigned_to_details = UserBriefSerializer(source='assigned_to', read_only=True)
    maintenance_history = AssetMaintenanceSerializer(many=True, read_only=True)
    assignment_history = AssetAssignmentHistorySerializer(many=True, read_only=True)
    
    # Calculated fields
    current_value = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    age_years = serializers.FloatField(read_only=True)
    is_under_warranty = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Asset
        fields = [
            'id', 'asset_code', 'name', 'description',
            'category', 'category_details', 'property', 'property_details',
            'space', 'space_details', 'manufacturer', 'model_number', 'serial_number',
            'specifications', 'purchase_date', 'purchase_price', 'vendor', 'warranty_expiry',
            'useful_life_years', 'depreciation_rate', 'status', 'condition',
            'assigned_to', 'assigned_to_details', 'assignment_date',
            'last_maintenance_date', 'next_maintenance_date',
            'photo_url', 'document_url', 'notes',
            'current_value', 'age_years', 'is_under_warranty',
            'maintenance_history', 'assignment_history',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['asset_code', 'created_at', 'updated_at']

class AssetCreateSerializer(serializers.ModelSerializer):
    """Simplified serializer for creating assets"""
    
    class Meta:
        model = Asset
        fields = [
            'name', 'description', 'category', 'property', 'space',
            'manufacturer', 'model_number', 'serial_number', 'specifications',
            'purchase_date', 'purchase_price', 'vendor', 'warranty_expiry',
            'useful_life_years', 'depreciation_rate', 'condition',
            'photo_url', 'document_url', 'notes'
        ]
