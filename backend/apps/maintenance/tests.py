from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from apps.maintenance.models import MaintenanceRequest, MaintenanceCategory, MaintenanceTask, MaintenanceComment
from apps.properties.models import Property
from apps.spaces.models import Space
from django.utils import timezone

User = get_user_model()

class MaintenancePerformanceTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='user@example.com',
            password='password123',
            first_name='Test',
            last_name='User'
        )
        self.client.force_authenticate(user=self.user)

        self.property = Property.objects.create(
            code='PROP-1',
            name='Test Property',
            total_area=1000
        )
        self.space = Space.objects.create(
            code='SPACE-1',
            name='Test Space',
            property=self.property,
            floor=1,
            area=100,
            base_rent=1000
        )
        self.category = MaintenanceCategory.objects.create(name='General')

        for i in range(5):
            request = MaintenanceRequest.objects.create(
                ticket_number=f'MR-{i}',
                title=f'Request {i}',
                description='Fix it',
                property=self.property,
                space=self.space,
                category=self.category,
                reported_by=self.user,
                assigned_to=self.user
            )
            # Create tasks with assigned users
            MaintenanceTask.objects.create(
                request=request,
                description='Task 1',
                assigned_to=self.user
            )
            # Create comments with authors
            MaintenanceComment.objects.create(
                request=request,
                comment='Comment 1',
                author=self.user
            )

        self.url = reverse('maintenancerequest-list')

    def test_maintenance_request_list_queries(self):
        """
        Ensure that listing maintenance requests does not result in N+1 queries.
        """
        # Current implementation:
        # 1 query for requests
        # 1 query for tasks (prefetch)
        # 1 query for comments (prefetch)
        # N queries for task assigned_to (N=5 tasks * 1 user = 5 queries?)
        # N queries for comment author (N=5 comments * 1 user = 5 queries?)
        # Total expected without optimization: 1 + 1 + 1 + 5 + 5 = 13 queries.

        # With optimization:
        # 1 query for requests
        # 1 query for tasks (with assigned_to joined)
        # 1 query for comments (with author joined)
        # Total expected: 3 queries.

        # I will first assert a higher number to confirm it fails or just verify the count.
        with self.assertNumQueries(3):
            response = self.client.get(self.url)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
