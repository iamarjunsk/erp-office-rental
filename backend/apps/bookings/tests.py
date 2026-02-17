from django.test import TestCase
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model
from django.utils import timezone
import datetime
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

class BookingPerformanceTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='perf_test@example.com', password='password', first_name='Perf', last_name='User')
        self.client.force_authenticate(user=self.user)

        self.prop = Property.objects.create(
            name='Perf Prop', code='PP01',
            address='123 Perf St', city='Perf City', state='Perf State', pincode='54321', total_area=1000
        )

        # Create multiple spaces and companies to avoid caching
        self.spaces = []
        for i in range(5):
            self.spaces.append(Space.objects.create(
                property=self.prop, name=f'Space {i}', code=f'PS0{i}', floor=1, area=100, base_rent=1000
            ))

        self.companies = []
        for i in range(5):
            self.companies.append(Company.objects.create(
                name=f'Company {i}', type='pvt_ltd'
            ))

    def test_list_bookings_query_count(self):
        # Create 5 bookings, each with a different space and company
        for i in range(5):
            Booking.objects.create(
                title=f'Meeting {i}',
                space=self.spaces[i],
                company=self.companies[i],
                user=self.user,
                start_time=timezone.now(),
                end_time=timezone.now() + datetime.timedelta(hours=2)
            )

        # With optimization, we expect 1 query (or 2 if count is triggered).
        # select_related('space', 'company') should fetch everything in the main query.

        with self.assertNumQueries(1):
             response = self.client.get('/api/bookings/')
             self.assertEqual(response.status_code, 200)
