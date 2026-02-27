from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.test.utils import CaptureQueriesContext
from django.db import connection
from .models import MaintenanceRequest, MaintenanceTask, MaintenanceComment, MaintenanceCategory
from apps.properties.models import Property

User = get_user_model()

class MaintenanceRequestPerformanceTests(APITestCase):
    def setUp(self):
        # Create users
        self.user = User.objects.create_user(email='test@example.com', password='password', first_name='Test', last_name='User')
        self.staff_user = User.objects.create_user(email='staff@example.com', password='password', first_name='Staff', last_name='User')
        self.client.force_authenticate(user=self.user)

        # Create property and category
        self.property = Property.objects.create(
            name='Test Property',
            code='TP001',
            city='Test City',
            state='Test State',
            total_area=1000,
            floors=2,
            build_year=2020
        )
        self.category = MaintenanceCategory.objects.create(name='General')

        # Create maintenance requests with tasks and comments
        for i in range(5):
            request = MaintenanceRequest.objects.create(
                ticket_number=f'REQ-{i}',
                title=f'Request {i}',
                description='Test description',
                property=self.property,
                category=self.category,
                reported_by=self.user,
                assigned_to=self.staff_user,
                status='open'
            )

            # Create tasks for each request
            for j in range(3):
                MaintenanceTask.objects.create(
                    request=request,
                    description=f'Task {j}',
                    assigned_to=self.staff_user
                )

            # Create comments for each request
            for k in range(3):
                MaintenanceComment.objects.create(
                    request=request,
                    comment=f'Comment {k}',
                    author=self.user
                )

    def test_list_requests_query_count(self):
        url = reverse('maintenancerequest-list')

        # Warm up
        self.client.get(url)

        with CaptureQueriesContext(connection) as ctx:
            response = self.client.get(url)
            self.assertEqual(response.status_code, 200)

        print(f"\nQueries count: {len(ctx)}")

        # We expect high query count initially due to N+1 problems
        # 1 (count) + 1 (list) + 5 (tasks prefetch) + 5 (comments prefetch)
        # + 5*3 (task assigned_to) + 5*3 (comment author) = ~42 queries
        # Current implementation already has some prefetching so let's see
