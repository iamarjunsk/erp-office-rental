from rest_framework import serializers
from .models import Lease
from apps.companies.models import Company
from apps.spaces.models import Space

class CompanyBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'type']

class SpaceBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Space
        fields = ['id', 'code', 'name', 'property']

class LeaseSerializer(serializers.ModelSerializer):
    company_details = CompanyBriefSerializer(source='company', read_only=True)
    space_details = SpaceBriefSerializer(source='space', read_only=True)

    class Meta:
        model = Lease
        fields = [
            'id', 'lease_number', 'company', 'company_details',
            'space', 'space_details', 'type', 'start_date', 'end_date',
            'rent_amount', 'security_deposit', 'rent_escalation_percent',
            'notice_period_days', 'status', 'document_url', 'notes',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']
