from rest_framework.test import APITestCase
from django.test.utils import CaptureQueriesContext
from django.db import connection
from apps.users.models import User
from apps.properties.models import Property
from .models import MaintenanceRequest, MaintenanceTask, MaintenanceComment, MaintenanceCategory

class MaintenanceRequestQueryCountTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(email='test@example.com', first_name='Test', last_name='User')
        self.prop = Property.objects.create(name='test prop', code='TP', total_area=100)
        self.cat = MaintenanceCategory.objects.create(name='test cat')
        self.client.force_authenticate(user=self.user)

        # create requests
        for i in range(5):
            req = MaintenanceRequest.objects.create(
                ticket_number=f'T-{i}', title=f'req {i}',
                property=self.prop, category=self.cat, reported_by=self.user
            )
            # add tasks and comments
            for j in range(3):
                MaintenanceTask.objects.create(
                    request=req, description=f'task {j}', assigned_to=self.user
                )
                MaintenanceComment.objects.create(
                    request=req, comment=f'comment {j}', author=self.user
                )

    def test_list_maintenance_requests_queries(self):
        # The query should not be proportional to the number of tasks or comments (N+1 check)
        # 1 query for requests
        # 1 query for prefetched tasks
        # 1 query for prefetched comments

        # We test with assertNumQueries
        with self.assertNumQueries(3):
            response = self.client.get('/api/maintenance/requests/')
        self.assertEqual(response.status_code, 200)
