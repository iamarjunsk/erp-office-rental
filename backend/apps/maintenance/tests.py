from django.test import TestCase
from rest_framework.test import APIClient
from django.db import connection
from django.test.utils import CaptureQueriesContext
from apps.users.models import User
from .models import MaintenanceRequest
from apps.properties.models import Property
from apps.spaces.models import Space
from .models import MaintenanceCategory

class MaintenanceStatsPerformanceTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(email='test@example.com', password='password')
        self.client.force_authenticate(user=self.user)

        self.property = Property.objects.create(name='Test Property', code='P1', total_area=100)
        self.space = Space.objects.create(property=self.property, name='Test Space', floor='1', area=50, base_rent=100)
        self.category = MaintenanceCategory.objects.create(name='Test Category')

        for i in range(3):
            MaintenanceRequest.objects.create(
                title='Test Request',
                status='open',
                priority='urgent',
                property=self.property,
                space=self.space,
                category=self.category,
                reported_by=self.user,
                ticket_number=f'T{i}'
            )

    def test_stats_query_count(self):
        # The number of queries should be exactly 1 for the stats themselves.
        with CaptureQueriesContext(connection) as ctx:
            response = self.client.get('/api/maintenance/requests/stats/')
            self.assertEqual(response.status_code, 200)

        # Ensure we're doing the single aggregation query
        self.assertEqual(len(ctx), 1)

        # Verify the stats values are correct too
        data = response.json()
        self.assertEqual(data['total'], 3)
        self.assertEqual(data['open'], 3)
        self.assertEqual(data['inProgress'], 0)
        self.assertEqual(data['completed'], 0)
        self.assertEqual(data['urgent'], 3)
        self.assertEqual(data['highPriority'], 0)
