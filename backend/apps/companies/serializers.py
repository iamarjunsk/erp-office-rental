from rest_framework import serializers
from .models import Company

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = [
            'id', 'name', 'legal_name', 'type',
            'gstin', 'pan', 'cin', 'industry',
            'address', 'city', 'state', 'pincode',
            'email', 'phone', 'website',
            'credit_score', 'status', 'notes',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
