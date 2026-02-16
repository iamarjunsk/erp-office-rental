from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from apps.properties.models import Property
from apps.spaces.models import Space
from apps.maintenance.models import MaintenanceRequest, MaintenanceCategory, MaintenanceTask, MaintenanceComment

User = get_user_model()

class MaintenanceRequestPerformanceTests(APITestCase):
    def setUp(self):
        # Create users
        self.user = User.objects.create_user(email='user@example.com', password='password', first_name='User', last_name='Test')
        self.manager = User.objects.create_user(email='manager@example.com', password='password', first_name='Manager', last_name='Test')
        self.staff = User.objects.create_user(email='staff@example.com', password='password', first_name='Staff', last_name='Test')

        # Create property and space
        self.property = Property.objects.create(
            code='PROP-001',
            name='Test Property',
            address='Address',
            city='City',
            state='State',
            pincode='12345',
            total_area=1000,
            status='active'
        )
        self.space = Space.objects.create(
            code='SPACE-001',
            name='Test Space',
            property=self.property,
            floor=1,
            area=100,
            base_rent=1000,
            type='private_office'
        )

        # Create category
        self.category = MaintenanceCategory.objects.create(name='General')

        # Create request
        self.request = MaintenanceRequest.objects.create(
            ticket_number='MR-001',
            title='Test Request',
            description='Test Description',
            property=self.property,
            space=self.space,
            category=self.category,
            reported_by=self.user,
            assigned_to=self.manager,
            status='open',
            priority='medium',
            type='reactive'
        )

        # Create tasks
        for i in range(5):
            MaintenanceTask.objects.create(
                request=self.request,
                description=f'Task {i}',
                assigned_to=self.staff
            )

        # Create comments
        for i in range(5):
            MaintenanceComment.objects.create(
                request=self.request,
                author=self.user,
                comment=f'Comment {i}'
            )

        self.client.force_authenticate(user=self.user)
        self.url = reverse('maintenancerequest-list')

    def test_maintenance_request_list_queries(self):
        """
        Ensure that listing maintenance requests does not result in N+1 queries.
        We expect a constant number of queries regardless of the number of tasks/comments.
        """
        # First request to warm up caches (if any) and ensure test isolation
        self.client.get(self.url)

        # We expect:
        # 1. Count query (pagination)
        # 2. Main query for MaintenanceRequest
        # 3. Prefetch for tasks
        # 4. Prefetch for comments
        # 5. Prefetch for tasks -> assigned_to (this is the N+1 source if not optimized)
        # 6. Prefetch for comments -> author (this is the N+1 source if not optimized)

        # Without optimization:
        # 1 (count) + 1 (main) + 1 (tasks prefetch) + 1 (comments prefetch) + 5 (tasks assigned_to) + 5 (comments author) = 14 queries?
        # Actually prefetch_related executes one query per related model.
        # But since we are accessing related fields inside serializer, if prefetch didn't include them,
        # Django will fetch them one by one.

        # Currently: prefetch_related('tasks', 'comments')
        # This fetches tasks. Then task serializer accesses task.assigned_to.
        # Since tasks query didn't select related assigned_to, it does lazy loading.
        # So for 5 tasks, it does 5 queries.
        # Same for comments.

        # Total expected without optimization:
        # 1 (count)
        # 1 (requests)
        # 1 (tasks prefetch)
        # 1 (comments prefetch)
        # 5 (tasks assigned_to)
        # 5 (comments author)
        # Total = 14

        # With optimization:
        # 1 (requests)
        # 1 (tasks with assigned_to)
        # 1 (comments with author)
        # Total = 3

        # We set assertNumQueries to check current behavior.

        with self.assertNumQueries(3):
             response = self.client.get(self.url)
             self.assertEqual(response.status_code, status.HTTP_200_OK)
