from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from apps.maintenance.models import MaintenanceRequest, MaintenanceCategory, MaintenanceTask, MaintenanceComment
from apps.properties.models import Property

User = get_user_model()

class MaintenanceRequestPerformanceTests(APITestCase):
    def setUp(self):
        # Create users
        self.user = User.objects.create_user(
            email='user@example.com',
            password='password123',
            first_name='Test',
            last_name='User'
        )
        self.manager = User.objects.create_user(
            email='manager@example.com',
            password='password123',
            first_name='Manager',
            last_name='User'
        )
        self.client.force_authenticate(user=self.user)

        # Create property
        self.property = Property.objects.create(
            code='PROP-001',
            name='Test Property',
            manager=self.manager,
            type='commercial',
            address='123 Main St',
            city='New York',
            state='NY',
            pincode='10001',
            total_area=1000,
            status='active'
        )

        # Create category
        self.category = MaintenanceCategory.objects.create(
            name='Plumbing',
            description='Plumbing issues',
            color='#3b82f6'
        )

        # Create requests with tasks and comments
        for i in range(5):
            request = MaintenanceRequest.objects.create(
                ticket_number=f'MR-{i}',
                title=f'Request {i}',
                description=f'Description {i}',
                property=self.property,
                category=self.category,
                reported_by=self.user,
                assigned_to=self.manager,
                priority='medium',
                status='open'
            )

            # Create tasks
            for j in range(3):
                MaintenanceTask.objects.create(
                    request=request,
                    description=f'Task {j}',
                    assigned_to=self.manager,
                    status='pending'
                )

            # Create comments
            for k in range(3):
                MaintenanceComment.objects.create(
                    request=request,
                    author=self.manager,
                    comment=f'Comment {k}',
                    is_internal=False
                )

        self.url = reverse('maintenancerequest-list')

    def test_maintenance_request_list_performance(self):
        """
        Ensure that listing maintenance requests does not result in N+1 queries.
        """
        # 1 query for count (maybe)
        # 1 query for requests
        # 1 query for tasks
        # 1 query for comments
        # Total should be around 3 queries.
        # If N+1 exists (unoptimized), it will be > 30.
        with self.assertNumQueries(3):
             response = self.client.get(self.url)
             self.assertEqual(response.status_code, status.HTTP_200_OK)
