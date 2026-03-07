from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.test.utils import CaptureQueriesContext
from django.db import connection
from .models import PurchaseRequisition, PurchaseOrder, Vendor
from apps.users.models import User
from apps.properties.models import Property
from django.utils import timezone

class PurchaseRequisitionPerformanceTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='test@example.com', password='password', first_name='Test', last_name='User')
        self.client.force_authenticate(user=self.user)

        self.property = Property.objects.create(name='Test Property', code='TP1', total_area=1000)
        self.vendor = Vendor.objects.create(name='Test Vendor')

        for i in range(25):
            po = PurchaseOrder.objects.create(
                po_number=f'PO-00{i}',
                title=f'Test PO {i}',
                vendor=self.vendor,
                prepared_by=self.user,
                total_amount=100,
                delivery_date=timezone.now().date(),
                delivery_location='Test'
            )
            pr = PurchaseRequisition.objects.create(
                pr_number=f'PR-00{i}',
                title=f'Test PR {i}',
                requested_by=self.user,
                property_ref=self.property,
                approved_by=self.user,
                converted_to_po=po,
                status='converted_to_po',
                total_estimated_amount=100,
                required_date=timezone.now().date()
            )

    def test_list_performance(self):
        url = reverse('purchaserequisition-list')
        with CaptureQueriesContext(connection) as ctx:
            response = self.client.get(url)
            self.assertEqual(response.status_code, status.HTTP_200_OK)

        # 1 query for the count, 1 for the data. Even with 25 items, it should not exceed 5 queries.
        self.assertLessEqual(len(ctx.captured_queries), 5, f"Too many queries! Captured {len(ctx.captured_queries)}")
