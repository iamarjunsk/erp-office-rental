from rest_framework import serializers
from .models import Space
from apps.properties.models import Property

class PropertyBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ['id', 'name', 'code']

class SpaceSerializer(serializers.ModelSerializer):
    property_details = PropertyBriefSerializer(source='property', read_only=True)

    class Meta:
        model = Space
        fields = [
            'id', 'code', 'name', 'property', 'property_details',
            'type', 'floor', 'area', 'capacity',
            'base_rent', 'price_per_day', 'amenities',
            'current_status', 'description',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
