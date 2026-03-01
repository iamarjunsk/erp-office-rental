import django
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.test.utils import CaptureQueriesContext
from django.db import connection
from .models import PurchaseRequisition, PurchaseOrder, Vendor
from apps.users.models import User

class PurchaseRequisitionPerformanceTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpassword',
            first_name='Test',
            last_name='User'
        )
        self.client.force_authenticate(user=self.user)

        self.vendor = Vendor.objects.create(name='Test Vendor', code='V001')

        # Create 15 PRs with POs to clearly see N+1
        for i in range(15):
            po = PurchaseOrder.objects.create(
                po_number=f'PO-00{i}',
                vendor=self.vendor,
                delivery_date='2023-01-01',
                prepared_by=self.user,
                approved_by=self.user
            )
            pr = PurchaseRequisition.objects.create(
                pr_number=f'PR-00{i}',
                title=f'Test PR {i}',
                requested_by=self.user,
                required_date='2023-01-01',
                converted_to_po=po,
                approved_by=self.user
            )

    def test_pr_list_n_plus_one_queries(self):
        # Using exact path instead of reverse since namespace was missing
        with CaptureQueriesContext(connection) as ctx:
            response = self.client.get('/api/procurement/requisitions/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Should be exactly 3 queries (session check + main query + prefetch items)
        self.assertLessEqual(len(ctx.captured_queries), 4, f"Too many queries ({len(ctx.captured_queries)}), N+1 likely exists.")
