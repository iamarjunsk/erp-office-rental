from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import MaintenanceCategory, MaintenanceRequest
from apps.users.models import User
from apps.properties.models import Property
from apps.spaces.models import Space
from django.utils import timezone

class MaintenanceRequestStatsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='testuser@example.com',
            password='testpassword123',
            first_name='Test',
            last_name='User'
        )
        self.client.force_authenticate(user=self.user)

        # Create related objects required for MaintenanceRequest
        self.property = Property.objects.create(
            name="Test Property",
            code="PROP-001",
            total_area=1000
        )
        self.space = Space.objects.create(
            property=self.property,
            name="Test Space",
            floor=1,
            area=500,
            base_rent=1000.00
        )
        self.category = MaintenanceCategory.objects.create(
            name="General Maintenance",
            description="General maintenance tasks"
        )

        # Create some test requests
        import uuid
        MaintenanceRequest.objects.create(
            ticket_number=f"MR-TEST-{uuid.uuid4()}",
            property=self.property,
            space=self.space,
            category=self.category,
            reported_by=self.user,
            title="Test Open Request",
            status="open",
            priority="urgent",
            scheduled_date=timezone.now().date()
        )
        MaintenanceRequest.objects.create(
            ticket_number=f"MR-TEST-{uuid.uuid4()}",
            property=self.property,
            space=self.space,
            category=self.category,
            reported_by=self.user,
            title="Test In Progress Request",
            status="in_progress",
            priority="high",
            scheduled_date=timezone.now().date()
        )

    def test_stats_performance_regression(self):
        """
        Ensure that the /api/maintenance/requests/stats/ endpoint
        uses exactly 1 database query (plus any minimal Django routing setup)
        rather than issuing a separate COUNT query for every statistic.
        """
        url = '/api/maintenance/requests/stats/'

        # Run once to cache any routing/auth mechanisms if necessary
        self.client.get(url)

        with self.assertNumQueries(1):
            response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total'], 2)
        self.assertEqual(response.data['open'], 1)
        self.assertEqual(response.data['inProgress'], 1)
        self.assertEqual(response.data['completed'], 0)
        self.assertEqual(response.data['urgent'], 1)
        self.assertEqual(response.data['highPriority'], 1)
        self.assertEqual(response.data['overdue'], 0)
