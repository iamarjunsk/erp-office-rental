from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.test.utils import CaptureQueriesContext
from django.db import connection
from .models import MaintenanceRequest, MaintenanceTask, MaintenanceComment, MaintenanceCategory
from apps.users.models import User
from apps.properties.models import Property
from django.db.models import Prefetch

class MaintenanceRequestPerformanceTest(APITestCase):
    def setUp(self):
        # Create users
        self.user1 = User.objects.create_user(email='user1@example.com', password='password123', first_name='Test', last_name='User1')
        self.user2 = User.objects.create_user(email='user2@example.com', password='password123', first_name='Test', last_name='User2')

        # Create property
        self.property = Property.objects.create(name='Test Property', code='TP01', total_area=1000)

        # Create category
        self.category = MaintenanceCategory.objects.create(name='Test Category')

        # Create multiple requests
        for i in range(5):
            req = MaintenanceRequest.objects.create(
                ticket_number=f'TICKET-{i}',
                title=f'Test Request {i}',
                description='Testing',
                property=self.property,
                category=self.category,
                reported_by=self.user1
            )
            # Add tasks
            for j in range(3):
                MaintenanceTask.objects.create(
                    request=req,
                    description=f'Task {j}',
                    assigned_to=self.user2
                )
            # Add comments
            for k in range(3):
                MaintenanceComment.objects.create(
                    request=req,
                    author=self.user1,
                    comment=f'Comment {k}'
                )

        # Authenticate
        self.client.force_authenticate(user=self.user1)

    def test_list_queries(self):
        url = reverse('maintenancerequest-list')

        # Let's inspect the queries
        with CaptureQueriesContext(connection) as ctx:
            response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Expected max 5 queries (1 for requests, 1 for tasks, 1 for comments) + session/auth queries
        self.assertLessEqual(len(ctx), 5)
