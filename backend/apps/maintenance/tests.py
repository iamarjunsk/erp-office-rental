from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from apps.maintenance.models import MaintenanceRequest, MaintenanceTask, MaintenanceComment, MaintenanceCategory
from apps.properties.models import Property
from apps.spaces.models import Space
from django.test.utils import CaptureQueriesContext
from django.db import connection

User = get_user_model()

class MaintenanceRequestPerformanceTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='user@example.com', password='password', first_name='Test', last_name='User')
        self.client.force_authenticate(user=self.user)

        self.property = Property.objects.create(
            code='P001', name='Test Property', type='commercial',
            address='123 Main St', city='Test City', state='Test State',
            pincode='12345', total_area=1000
        )
        self.space = Space.objects.create(
            code='S001', name='Test Space', property=self.property,
            floor=1, area=100, base_rent=1000
        )
        self.category = MaintenanceCategory.objects.create(name='Plumbing')

        # Create a request
        self.maintenance_request = MaintenanceRequest.objects.create(
            ticket_number='MR-001', title='Test Request', description='Test Description',
            property=self.property, space=self.space, category=self.category,
            reported_by=self.user
        )

        # Create tasks assigned to different users
        for i in range(5):
            u = User.objects.create_user(email=f'taskuser{i}@example.com', password='password', first_name=f'Task{i}', last_name='User')
            MaintenanceTask.objects.create(
                request=self.maintenance_request,
                description=f'Task {i}',
                assigned_to=u
            )

        # Create comments by different users
        for i in range(5):
            u = User.objects.create_user(email=f'commentuser{i}@example.com', password='password', first_name=f'Comment{i}', last_name='User')
            MaintenanceComment.objects.create(
                request=self.maintenance_request,
                author=u,
                comment=f'Comment {i}'
            )

    def test_list_maintenance_requests_queries(self):
        url = reverse('maintenancerequest-list')

        # Warm up
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        with CaptureQueriesContext(connection) as ctx:
            response = self.client.get(url)
            self.assertEqual(response.status_code, status.HTTP_200_OK)

        # With optimization, it should be around 4 or 5.
        # 1. Count (if pagination) - but here seems no pagination default
        # 2. Main List
        # 3. Prefetch Tasks
        # 4. Prefetch Comments
        # Total should be around 3-5. Definitely less than 10.
        self.assertLess(len(ctx.captured_queries), 6, f"Too many queries: {len(ctx.captured_queries)}")
