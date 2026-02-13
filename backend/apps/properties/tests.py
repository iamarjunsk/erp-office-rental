from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from apps.properties.models import Property

User = get_user_model()

class PropertyPerformanceTests(APITestCase):
    def setUp(self):
        # Create a user to be the manager
        self.manager = User.objects.create_user(
            email='manager@example.com',
            password='password123',
            first_name='Test',
            last_name='Manager'
        )

        # Create properties
        for i in range(5):
            Property.objects.create(
                code=f'PROP-{i}',
                name=f'Property {i}',
                manager=self.manager,
                type='commercial',
                address='123 Main St',
                city='New York',
                state='NY',
                pincode='10001',
                total_area=1000,
                status='active'
            )

        self.url = reverse('property-list')

    def test_property_list_queries(self):
        """
        Ensure that listing properties does not result in N+1 queries.
        Optimized implementation avoids N+1 queries.
        """
        # We expect 2 queries (1 count + 1 data) due to pagination
        with self.assertNumQueries(2):
             response = self.client.get(self.url)
             self.assertEqual(response.status_code, status.HTTP_200_OK)


class PropertyPaginationTests(APITestCase):
    def setUp(self):
        # Create a user to be the manager
        self.manager = User.objects.create_user(
            email='manager-pg@example.com',
            password='password123',
            first_name='Test',
            last_name='Manager'
        )

        # Create properties
        for i in range(15):  # Create enough properties to trigger pagination
            Property.objects.create(
                code=f'PROP-PG-{i}',
                name=f'Property {i}',
                manager=self.manager,
                type='commercial',
                address='123 Main St',
                city='New York',
                state='NY',
                pincode='10001',
                total_area=1000,
                status='active'
            )

        self.url = reverse('property-list')

    def test_pagination_is_enabled(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verify that response is a dictionary (paginated) and not a list
        self.assertIsInstance(response.data, dict, "Response data should be a dictionary for paginated results")

        # Verify pagination keys exist
        self.assertIn('count', response.data)
        self.assertIn('next', response.data)
        self.assertIn('previous', response.data)
        self.assertIn('results', response.data)

        # Verify correct number of items on first page
        # Assuming page_size will be set to 10
        self.assertEqual(len(response.data['results']), 10, "Should return 10 items per page")

        # Verify total count
        self.assertEqual(response.data['count'], 15, "Total count should be 15")

        # Verify next page link is present
        self.assertIsNotNone(response.data['next'])
        self.assertIsNone(response.data['previous'])
