from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from apps.users.models import User
from apps.properties.models import Property
from apps.spaces.models import Space
from apps.maintenance.models import MaintenanceCategory, MaintenanceRequest, MaintenanceTask, MaintenanceComment

class MaintenancePerformanceTest(TestCase):
    """
    Performance tests for Maintenance app to ensure efficient database querying.
    """
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(email='test@example.com', password='password', first_name='Test', last_name='User')
        self.client.force_authenticate(user=self.user)

        self.property = Property.objects.create(code='P1', name='Prop 1', total_area=1000)
        self.space = Space.objects.create(code='S1', name='Space 1', property=self.property, floor=1, area=100, base_rent=1000)
        self.category = MaintenanceCategory.objects.create(name='Plumbing')

        # Create a request with tasks and comments
        self.request = MaintenanceRequest.objects.create(
            ticket_number='MR-001',
            title='Leak',
            description='Fix leak',
            property=self.property,
            space=self.space,
            category=self.category,
            reported_by=self.user
        )

        # Create 5 tasks with assigned users
        for i in range(5):
            user = User.objects.create_user(email=f'task{i}@example.com', password='password', first_name=f'Task{i}', last_name='User')
            MaintenanceTask.objects.create(
                request=self.request,
                description=f'Task {i}',
                assigned_to=user
            )

        # Create 5 comments with authors
        for i in range(5):
            user = User.objects.create_user(email=f'comment{i}@example.com', password='password', first_name=f'Comment{i}', last_name='User')
            MaintenanceComment.objects.create(
                request=self.request,
                author=user,
                comment=f'Comment {i}'
            )

    def test_maintenance_request_list_queries(self):
        """
        Verify that listing maintenance requests does not trigger N+1 queries
        for related tasks and comments users.
        Expected queries:
        1. MaintenanceRequest list
        2. MaintenanceTask list (prefetch)
        3. MaintenanceComment list (prefetch)
        Total: 3
        """
        url = reverse('maintenancerequest-list')

        with self.assertNumQueries(3):
             response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
