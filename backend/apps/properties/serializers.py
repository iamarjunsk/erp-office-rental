from rest_framework import serializers
from .models import Property
from apps.users.serializers import UserSerializer

class PropertySerializer(serializers.ModelSerializer):
    manager_details = UserSerializer(source='manager', read_only=True)

    class Meta:
        model = Property
        fields = [
            'id', 'code', 'name', 'type', 
            'address', 'city', 'state', 'pincode', 
            'total_area', 'build_year', 'floors', 
            'status', 'manager', 'manager_details',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
