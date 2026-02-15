from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from django.utils import timezone
from django.urls import reverse
from apps.properties.models import Property
from apps.spaces.models import Space
from apps.companies.models import Company
from .models import Booking
import datetime

User = get_user_model()

class BookingTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='test@example.com', password='password', first_name='Test', last_name='User')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.prop = Property.objects.create(
            name='Test Prop', code='TP01',
            address='123 St', city='City', state='State', pincode='12345', total_area=1000
        )
        self.space = Space.objects.create(
            property=self.prop, name='Space 1', code='S01', floor=1, area=100, base_rent=1000
        )

    def test_create_booking(self):
        response = self.client.post('/api/bookings/', {
            'title': 'Meeting',
            'space': self.space.id,
            'start_time': '2026-02-05T10:00:00Z',
            'end_time': '2026-02-05T12:00:00Z',
            'description': 'Test meeting'
        }, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Booking.objects.count(), 1)
        self.assertEqual(Booking.objects.first().user, self.user)

    def test_list_bookings(self):
        Booking.objects.create(
            title='Meeting 1',
            space=self.space,
            user=self.user,
            start_time=timezone.now(),
            end_time=timezone.now() + timezone.timedelta(hours=2)
        )
        response = self.client.get('/api/bookings/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

class BookingPerformanceTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='perfuser@example.com',
            password='password123',
            first_name='Perf',
            last_name='User'
        )
        self.client.force_authenticate(user=self.user)

        # Create companies
        self.companies = []
        for i in range(5):
            self.companies.append(Company.objects.create(
                name=f'Company {i}',
                email=f'company{i}@example.com'
            ))

        # Create properties
        self.properties = []
        for i in range(5):
            self.properties.append(Property.objects.create(
                code=f'PROP-{i}',
                name=f'Property {i}',
                manager=self.user,
                total_area=1000,
                address='123 Main St',
                city='City',
                state='State',
                pincode='12345'
            ))

        # Create spaces
        self.spaces = []
        for i in range(5):
            self.spaces.append(Space.objects.create(
                code=f'SPACE-{i}',
                name=f'Space {i}',
                property=self.properties[i],
                floor=1,
                area=100,
                base_rent=1000
            ))

        # Create bookings
        for i in range(5):
            Booking.objects.create(
                title=f'Booking {i}',
                space=self.spaces[i],
                company=self.companies[i],
                user=self.user,
                start_time=timezone.now(),
                end_time=timezone.now() + datetime.timedelta(hours=1),
                description='Test'
            )

        self.url = reverse('booking-list')

    def test_booking_list_queries(self):
        # Initial warmup
        self.client.get(self.url)

        # We expect a low number of queries if optimized.
        # If N+1 exists for spaces and companies, queries will be high.

        with self.assertNumQueries(1):
             response = self.client.get(self.url)
             self.assertEqual(response.status_code, status.HTTP_200_OK)
