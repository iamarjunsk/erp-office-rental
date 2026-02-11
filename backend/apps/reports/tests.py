from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from django.utils import timezone
from datetime import timedelta
from apps.properties.models import Property
from apps.spaces.models import Space
from apps.companies.models import Company
from apps.leases.models import Lease
from apps.billing.models import Invoice, Payment
from apps.maintenance.models import MaintenanceRequest, MaintenanceCategory

User = get_user_model()

class ReportsTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='test@example.com', password='password', first_name='Test', last_name='User')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.prop = Property.objects.create(
            name='Test Prop', code='TP01',
            address='123 St', city='City', state='State', pincode='12345', total_area=1000
        )
        self.space = Space.objects.create(
            property=self.prop, name='Space 1', code='S01', floor=1, area=100, base_rent=1000,
            current_status='occupied'
        )

        self.company = Company.objects.create(name='Test Company', status='active')

        today = timezone.now().date()
        self.lease = Lease.objects.create(
            lease_number='L001',
            company=self.company,
            space=self.space,
            start_date=today - timedelta(days=30),
            end_date=today + timedelta(days=365),
            rent_amount=1000,
            status='active'
        )

        # Create Invoice
        self.invoice = Invoice.objects.create(
            invoice_number='INV001',
            company=self.company,
            lease=self.lease,
            period_start=today - timedelta(days=30),
            period_end=today,
            invoice_date=today - timedelta(days=5),
            due_date=today + timedelta(days=5),
            total_amount=1180, # 1000 + 18% GST
            balance_due=0,
            status='paid'
        )

        # Create Payment
        Payment.objects.create(
            invoice=self.invoice,
            amount=1180,
            payment_date=today,
            payment_method='bank_transfer',
            status='completed'
        )

        # Create Maintenance Request
        cat = MaintenanceCategory.objects.create(name='Plumbing')
        MaintenanceRequest.objects.create(
            ticket_number='M001',
            title='Leaky tap',
            description='Fix it',
            property=self.prop,
            category=cat,
            status='completed'
        )

    def test_dashboard_stats(self):
        response = self.client.get('/api/reports/dashboard/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('total_revenue', response.data)
        self.assertIn('occupancy_rate', response.data)
        self.assertEqual(response.data['occupancy_rate'], 100.0) # 1 space, occupied
        self.assertEqual(response.data['total_tickets'], 1)
        self.assertEqual(response.data['completed_tickets'], 1)
        # Check revenue (Decimal to float might be needed or string comparison)
        self.assertEqual(float(response.data['total_revenue']), 1180.0)

    def test_export_reports(self):
        response = self.client.get('/api/reports/export/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['Content-Type'], 'text/csv')
        content = response.content.decode('utf-8')
        self.assertIn('Occupancy Rate (%),100.0', content)
        self.assertIn('Total Revenue (INR),1180', content)
