from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from django.utils import timezone
from apps.properties.models import Property
from apps.spaces.models import Space
from .models import Booking

User = get_user_model()

class BookingTests(APITestCase):
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

    def test_n_plus_one_queries(self):
        from apps.companies.models import Company
        from django.test.utils import CaptureQueriesContext
        from django.db import connection

        company1 = Company.objects.create(name='Company 1')
        company2 = Company.objects.create(name='Company 2')
        space2 = Space.objects.create(property=self.prop, name='Space 2', code='S02', floor=1, area=100, base_rent=1000)

        # Create multiple bookings
        for i in range(5):
            Booking.objects.create(
                title=f'Meeting {i}',
                space=self.space if i % 2 == 0 else space2,
                company=company1 if i % 2 == 0 else company2,
                user=self.user,
                start_time=timezone.now(),
                end_time=timezone.now() + timezone.timedelta(hours=1)
            )

        with CaptureQueriesContext(connection) as ctx:
            response = self.client.get('/api/bookings/')
            self.assertEqual(response.status_code, 200)

        # 1 query for the bookings (+ space and company data via select_related)
        # Should be well below 5 queries
        self.assertLessEqual(len(ctx), 4)
