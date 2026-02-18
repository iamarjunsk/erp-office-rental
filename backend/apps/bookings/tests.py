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
        self.company = Company.objects.create(name='Test Company', type='tenant')

    def test_create_booking(self):
        response = self.client.post('/api/bookings/', {
            'title': 'Meeting',
            'space': self.space.id,
            'company': self.company.id,
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
            company=self.company,
            user=self.user,
            start_time=timezone.now(),
            end_time=timezone.now() + timezone.timedelta(hours=2)
        )
        response = self.client.get('/api/bookings/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_list_bookings_performance(self):
        # Create multiple bookings
        for i in range(5):
             Booking.objects.create(
                title=f'Meeting {i}',
                space=self.space,
                company=self.company,
                user=self.user,
                start_time=timezone.now(),
                end_time=timezone.now() + timezone.timedelta(hours=2)
            )

        # Check query count
        # Expecting around 2 queries with proper optimization (1 for auth user, 1 for bookings list)
        # Without optimization, it will be 1 + 5 (space) + 5 (company) + 1 (auth) = 12 queries.
        # But wait, SpaceSerializer also might query Property?
        # BookingSerializer has:
        # space_details = BookingSpaceSerializer(source='space', read_only=True)
        # BookingSpaceSerializer has fields = ['id', 'name', 'code', 'type']. It does not reference property. So no extra query there.

        # So expected queries without optimization: 1 (auth) + 1 (list) + 5 (space) + 5 (company) = 12.
        # With optimization: 1 (auth) + 1 (list) = 2.

        with self.assertNumQueries(1):
            response = self.client.get('/api/bookings/')
            self.assertEqual(response.status_code, 200)
            self.assertEqual(len(response.data), 5)
