from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from django.utils import timezone
from apps.properties.models import Property
from apps.spaces.models import Space
from apps.companies.models import Company
from .models import Booking

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

class BookingPerformanceTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='perf@example.com', password='password', first_name='Perf', last_name='User')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.prop = Property.objects.create(
            name='Test Prop', code='TP01',
            address='123 St', city='City', state='State', pincode='12345', total_area=1000
        )
        self.space1 = Space.objects.create(
            property=self.prop, name='Space 1', code='S01', floor=1, area=100, base_rent=1000
        )
        self.space2 = Space.objects.create(
            property=self.prop, name='Space 2', code='S02', floor=2, area=200, base_rent=2000
        )
        self.company1 = Company.objects.create(name='Company 1')
        self.company2 = Company.objects.create(name='Company 2')

        Booking.objects.create(
            title='Meeting 1', space=self.space1, company=self.company1, user=self.user,
            start_time=timezone.now(), end_time=timezone.now() + timezone.timedelta(hours=1)
        )
        Booking.objects.create(
            title='Meeting 2', space=self.space2, company=self.company2, user=self.user,
            start_time=timezone.now(), end_time=timezone.now() + timezone.timedelta(hours=1)
        )

    def test_list_bookings_queries(self):
        # We expect 1 query to fetch the bookings with their spaces and companies
        with self.assertNumQueries(1):
            response = self.client.get('/api/bookings/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
