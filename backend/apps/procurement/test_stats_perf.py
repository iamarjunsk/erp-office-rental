from django.test import TestCase
from django.utils import timezone
from .models import Vendor, PurchaseRequisition, PurchaseOrder
from rest_framework.test import APIClient
from django.urls import reverse
from django.test.utils import CaptureQueriesContext
from django.db import connection

class StatsPerformanceTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Create some test data
        for i in range(10):
            Vendor.objects.create(
                name=f"Vendor {i}",
                code=f"V{i}",
                status='active' if i % 2 == 0 else 'inactive',
                vendor_type='supplier' if i % 3 == 0 else 'service_provider'
            )

    def test_vendor_stats_performance(self):
        # Trigger query execution once to load models
        self.client.get('/api/procurement/vendors/stats/')

        with CaptureQueriesContext(connection) as ctx:
            response = self.client.get('/api/procurement/vendors/stats/')

        self.assertLessEqual(len(ctx), 2)
        self.assertEqual(response.status_code, 200)


    def test_pr_stats_performance(self):
        from django.contrib.auth import get_user_model
        User = get_user_model()
        user = User.objects.create_user(email='test@example.com', password='password')

        for i in range(10):
            PurchaseRequisition.objects.create(
                pr_number=f"PR{i}",
                title=f"PR {i}",
                requested_by=user,
                required_date=timezone.now().date(),
                status='draft' if i % 2 == 0 else 'approved',
                total_estimated_amount=100.0 * (i + 1)
            )

        self.client.get('/api/procurement/requisitions/stats/')

        with CaptureQueriesContext(connection) as ctx:
            response = self.client.get('/api/procurement/requisitions/stats/')

        self.assertLessEqual(len(ctx), 2)
        self.assertEqual(response.status_code, 200)


    def test_po_stats_performance(self):
        from django.contrib.auth import get_user_model
        User = get_user_model()
        user = User.objects.create_user(email='test2@example.com', password='password')

        for i in range(10):
            PurchaseOrder.objects.create(
                po_number=f"PO{i}",
                title=f"PO {i}",
                prepared_by=user,
                vendor=Vendor.objects.first(),
                delivery_date=timezone.now().date(),
                status='draft' if i % 2 == 0 else 'sent',
                total_amount=100.0 * (i + 1)
            )

        self.client.get('/api/procurement/purchase-orders/stats/')

        with CaptureQueriesContext(connection) as ctx:
            response = self.client.get('/api/procurement/purchase-orders/stats/')

        self.assertLessEqual(len(ctx), 2)
        self.assertEqual(response.status_code, 200)
