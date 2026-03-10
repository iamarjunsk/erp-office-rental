from django.test import TestCase
from django.utils import timezone
from datetime import timedelta
from rest_framework.test import APIClient
from apps.users.models import User
from apps.properties.models import Property
from apps.maintenance.models import MaintenanceRequest, MaintenanceCategory
from django.test.utils import CaptureQueriesContext
from django.db import connection

class MaintenanceStatsOptimizationTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(email='test@example.com', password='password123', first_name='Test', last_name='User')
        self.client.force_authenticate(user=self.user)

        self.prop = Property.objects.create(code='P1', total_area=100)
        self.cat = MaintenanceCategory.objects.create(name='Test Category')

        # Create some test data
        today = timezone.now().date()
        MaintenanceRequest.objects.create(
            title='T1', ticket_number='1', reported_by=self.user,
            property=self.prop, category=self.cat, status='open',
            priority='urgent', scheduled_date=today - timedelta(days=1)
        )
        MaintenanceRequest.objects.create(
            title='T2', ticket_number='2', reported_by=self.user,
            property=self.prop, category=self.cat, status='in_progress',
            priority='high'
        )
        MaintenanceRequest.objects.create(
            title='T3', ticket_number='3', reported_by=self.user,
            property=self.prop, category=self.cat, status='completed'
        )

    def test_stats_query_count(self):
        # The stats endpoint should execute exactly 1 query to get all counts
        with CaptureQueriesContext(connection) as ctx:
            response = self.client.get('/api/maintenance/requests/stats/')

        self.assertEqual(response.status_code, 200)

        # 1 query for the stats aggregate
        # NOTE: Authentication/user lookup might add queries depending on the test setup and middleware,
        # but the core view logic should be 1 query. In some setups, DRF might do an extra query for the user.
        # Let's check the number of queries that actually hit the maintenance_maintenancerequest table

        maintenance_queries = [
            q for q in ctx.captured_queries
            if 'maintenance_maintenancerequest' in q['sql'] and 'COUNT' in q['sql']
        ]

        self.assertEqual(len(maintenance_queries), 1, "Stats should use exactly 1 aggregate query for counts")

        # Verify correctness of the optimized response
        data = response.data
        self.assertEqual(data['total'], 3)
        self.assertEqual(data['open'], 1)
        self.assertEqual(data['inProgress'], 1)
        self.assertEqual(data['completed'], 1)
        self.assertEqual(data['urgent'], 1)
        self.assertEqual(data['highPriority'], 1)
        self.assertEqual(data['overdue'], 1)
