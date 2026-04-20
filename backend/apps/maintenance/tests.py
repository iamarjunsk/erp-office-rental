from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from apps.properties.models import Property
from apps.maintenance.models import MaintenanceRequest, MaintenanceCategory

User = get_user_model()

class MaintenanceStatsTests(APITestCase):
    def setUp(self):
        # Create user
        self.user = User.objects.create_user(
            email='testuser@example.com',
            password='testpassword',
            first_name='Test',
            last_name='User'
        )
        self.client.force_authenticate(user=self.user)

        # Create Property
        self.property = Property.objects.create(
            name='Test Property',
            code='TP-01',
            type='commercial',
            address='123 Test St',
            city='Test City',
            state='TS',
            pincode='12345',
            total_area=1000,
            status='active'
        )

        # Create Category
        self.category = MaintenanceCategory.objects.create(
            name='General'
        )

        # Create Requests

        # 1. Open request
        MaintenanceRequest.objects.create(
            ticket_number='MR-001',
            title='Open Request',
            description='Test',
            property=self.property,
            category=self.category,
            status='open',
            priority='medium',
            reported_by=self.user
        )

        # 2. In Progress request
        MaintenanceRequest.objects.create(
            ticket_number='MR-002',
            title='In Progress Request',
            description='Test',
            property=self.property,
            category=self.category,
            status='in_progress',
            priority='medium',
            reported_by=self.user
        )

        # 3. Completed request
        MaintenanceRequest.objects.create(
            ticket_number='MR-003',
            title='Completed Request',
            description='Test',
            property=self.property,
            category=self.category,
            status='completed',
            priority='medium',
            reported_by=self.user
        )

        # 4. Urgent request (Open)
        MaintenanceRequest.objects.create(
            ticket_number='MR-004',
            title='Urgent Request',
            description='Test',
            property=self.property,
            category=self.category,
            status='open',
            priority='urgent',
            reported_by=self.user
        )

        # 5. High Priority request (In Progress)
        MaintenanceRequest.objects.create(
            ticket_number='MR-005',
            title='High Priority Request',
            description='Test',
            property=self.property,
            category=self.category,
            status='in_progress',
            priority='high',
            reported_by=self.user
        )

        # 6. Overdue request (Open, scheduled in past)
        MaintenanceRequest.objects.create(
            ticket_number='MR-006',
            title='Overdue Request',
            description='Test',
            property=self.property,
            category=self.category,
            status='open',
            priority='medium',
            scheduled_date=timezone.now().date() - timedelta(days=1),
            reported_by=self.user
        )

        # 7. Completed Overdue request (Should NOT be counted as overdue)
        MaintenanceRequest.objects.create(
            ticket_number='MR-007',
            title='Completed Overdue Request',
            description='Test',
            property=self.property,
            category=self.category,
            status='completed',
            priority='medium',
            scheduled_date=timezone.now().date() - timedelta(days=1),
            reported_by=self.user
        )

        self.url = '/api/maintenance/requests/stats/'

    def test_maintenance_stats(self):
        """
        Ensure stats are calculated correctly.
        """
        # Baseline: 7 queries expected currently
        # 1. Total count
        # 2. Open count
        # 3. In Progress count
        # 4. Completed count
        # 5. Urgent count
        # 6. High count
        # 7. Overdue count
        # Optimized to 1 query
        with self.assertNumQueries(1):
            response = self.client.get(self.url)
            self.assertEqual(response.status_code, status.HTTP_200_OK)

            data = response.data
            self.assertEqual(data['total'], 7)
            self.assertEqual(data['open'], 3) # MR-001, MR-004, MR-006
            self.assertEqual(data['inProgress'], 2) # MR-002, MR-005
            self.assertEqual(data['completed'], 2) # MR-003, MR-007
            self.assertEqual(data['urgent'], 1) # MR-004
            self.assertEqual(data['highPriority'], 1) # MR-005
            self.assertEqual(data['overdue'], 1) # MR-006 (MR-007 is completed so not overdue)
