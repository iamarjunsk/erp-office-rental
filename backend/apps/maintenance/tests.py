from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from apps.maintenance.models import MaintenanceRequest, MaintenanceCategory
from apps.properties.models import Property

User = get_user_model()

class MaintenanceStatsTest(APITestCase):
    def setUp(self):
        # Create user
        self.user = User.objects.create_user(
            email='test@example.com',
            password='password123',
            first_name='Test',
            last_name='User'
        )
        self.client.force_authenticate(user=self.user)

        # Create property
        self.property = Property.objects.create(
            name='Test Property',
            code='TP001',
            type='residential',
            address='123 Test St',
            city='Test City',
            state='TS',
            pincode='12345',
            total_area=1000,
            status='active',
            manager=self.user
        )

        # Create category
        self.category = MaintenanceCategory.objects.create(name='General')

        # Create requests
        # Open (2)
        MaintenanceRequest.objects.create(
            ticket_number='MR-1', title='Open 1', description='Test',
            property=self.property, category=self.category, reported_by=self.user, status='open', priority='medium'
        )
        MaintenanceRequest.objects.create(
            ticket_number='MR-2', title='Open 2', description='Test',
            property=self.property, category=self.category, reported_by=self.user, status='open', priority='urgent'
        )

        # In Progress (1)
        MaintenanceRequest.objects.create(
            ticket_number='MR-3', title='IP 1', description='Test',
            property=self.property, category=self.category, reported_by=self.user, status='in_progress', priority='high'
        )

        # Completed (1)
        MaintenanceRequest.objects.create(
            ticket_number='MR-4', title='Comp 1', description='Test',
            property=self.property, category=self.category, reported_by=self.user, status='completed', priority='low'
        )

        # Overdue (1) - status open, date past
        MaintenanceRequest.objects.create(
            ticket_number='MR-5', title='Overdue 1', description='Test',
            property=self.property, category=self.category, reported_by=self.user, status='open', priority='medium',
            scheduled_date=timezone.now().date() - timedelta(days=1)
        )

        self.url = '/api/maintenance/requests/stats/' # using explicit path to avoid reverse issues for now

    def test_stats_query_count(self):
        """
        Ensure that getting stats uses a single aggregation query.
        """
        # We expect 1 query for the stats aggregation.
        # Authentication might add a query, but force_authenticate usually handles it.
        # Let's see.
        with self.assertNumQueries(1):
             response = self.client.get(self.url)
             self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_stats_correctness(self):
        """
        Ensure that the stats returned are correct.
        """
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        data = response.data
        self.assertEqual(data['total'], 5)
        self.assertEqual(data['open'], 3) # 2 open + 1 overdue (which is open)
        self.assertEqual(data['inProgress'], 1)
        self.assertEqual(data['completed'], 1)
        self.assertEqual(data['urgent'], 1)
        self.assertEqual(data['highPriority'], 1)
        self.assertEqual(data['overdue'], 1)
