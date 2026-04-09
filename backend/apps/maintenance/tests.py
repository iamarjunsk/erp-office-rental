from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from rest_framework.test import APIClient
from apps.properties.models import Property
from apps.spaces.models import Space
from apps.maintenance.models import MaintenanceCategory, MaintenanceRequest

User = get_user_model()

class MaintenanceRequestStatsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        # The custom User model requires an 'email'
        self.user = User.objects.create_user(email='testuser@example.com', password='testpassword')
        self.client.force_authenticate(user=self.user)

        # Setup required models
        self.property = Property.objects.create(
            name='Test Property',
            code='PROP1',
            total_area=1000.00
        )
        self.space = Space.objects.create(
            property=self.property,
            name='Test Space',
            floor='1',
            area=500.00,
            base_rent=1000.00
        )
        self.category = MaintenanceCategory.objects.create(name='Plumbing')

        # Set up dates
        today = timezone.now().date()
        yesterday = today - timedelta(days=1)
        tomorrow = today + timedelta(days=1)

        # Create test maintenance requests

        # 1. Open
        MaintenanceRequest.objects.create(
            ticket_number='MR-001',
            title='Leaky Faucet',
            description='Leaky faucet in breakroom',
            property=self.property,
            space=self.space,
            category=self.category,
            reported_by=self.user,
            status='open',
            priority='low',
            scheduled_date=tomorrow
        )

        # 2. In Progress & Urgent
        MaintenanceRequest.objects.create(
            ticket_number='MR-002',
            title='Burst Pipe',
            description='Burst pipe in main lobby',
            property=self.property,
            space=self.space,
            category=self.category,
            reported_by=self.user,
            status='in_progress',
            priority='urgent',
            scheduled_date=today
        )

        # 3. Open & High Priority & Overdue
        MaintenanceRequest.objects.create(
            ticket_number='MR-003',
            title='Broken AC',
            description='AC unit broken in server room',
            property=self.property,
            space=self.space,
            category=self.category,
            reported_by=self.user,
            status='open',
            priority='high',
            scheduled_date=yesterday
        )

        # 4. Completed
        MaintenanceRequest.objects.create(
            ticket_number='MR-004',
            title='Flickering Light',
            description='Flickering light in office 101',
            property=self.property,
            space=self.space,
            category=self.category,
            reported_by=self.user,
            status='completed',
            priority='low',
            scheduled_date=yesterday,
            completed_date=timezone.now()
        )

    def test_stats_performance_and_correctness(self):
        """
        Test that the stats endpoint returns the correct statistics
        and executes efficiently in a single query.
        """
        url = reverse('maintenancerequest-stats')

        # Performance test - assert exactly 1 query
        # There might be 1 query for user auth/session if not careful,
        # but with force_authenticate it usually just hits the endpoint.
        # But to be safe, we capture queries and assert

        with self.assertNumQueries(1):
            response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

        data = response.json()

        self.assertEqual(data['total'], 4)
        self.assertEqual(data['open'], 2)
        self.assertEqual(data['inProgress'], 1)
        self.assertEqual(data['completed'], 1)
        self.assertEqual(data['urgent'], 1)
        self.assertEqual(data['highPriority'], 1)
        self.assertEqual(data['overdue'], 1)
