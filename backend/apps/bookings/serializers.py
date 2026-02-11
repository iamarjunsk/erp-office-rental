from rest_framework import serializers
from .models import Booking
from apps.spaces.models import Space
from apps.companies.models import Company

class BookingSpaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Space
        fields = ['id', 'name', 'code', 'type']

class BookingCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name']

class BookingSerializer(serializers.ModelSerializer):
    space_details = BookingSpaceSerializer(source='space', read_only=True)
    company_details = BookingCompanySerializer(source='company', read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'title', 'space', 'space_details', 'company', 'company_details', 'start_time', 'end_time', 'description', 'created_at']
        read_only_fields = ['user', 'created_at', 'updated_at']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['user'] = request.user
        return super().create(validated_data)
