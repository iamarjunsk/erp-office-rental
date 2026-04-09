from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.utils import timezone
from .models import MaintenanceRequest, MaintenanceCategory
from apps.users.models import User
from apps.properties.models import Property

class MaintenanceStatsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(email='test@example.com', password='password123')
        self.client.force_authenticate(user=self.user)

        # Create related data
        self.property = Property.objects.create(name="Test Prop", total_area=1000, code="T1")
        self.category = MaintenanceCategory.objects.create(name="Plumbing")

        # Create some requests
        MaintenanceRequest.objects.create(
            title="Open Request",
            status="open",
            priority="low",
            reported_by=self.user,
            property=self.property,
            category=self.category,
            ticket_number="TK-1"
        )
        MaintenanceRequest.objects.create(
            title="Urgent Request",
            status="in_progress",
            priority="urgent",
            reported_by=self.user,
            property=self.property,
            category=self.category,
            ticket_number="TK-2"
        )

    def test_stats_performance(self):
        from django.db import connection
        from django.test.utils import CaptureQueriesContext

        url = reverse('maintenancerequest-stats')

        # Initial call to populate auth cache, etc
        self.client.get(url)

        with CaptureQueriesContext(connection) as ctx:
            response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print(f"Stats endpoint used {len(ctx)} queries")
        # Ensure it actually uses fewer queries than the 7 previous ones
        self.assertTrue(len(ctx) < 5)
