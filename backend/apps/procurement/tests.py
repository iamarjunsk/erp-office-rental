from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from rest_framework import status
from django.utils import timezone
from .models import PurchaseRequisition, PurchaseOrder, Vendor

User = get_user_model()

class PurchaseRequisitionNPlusOneTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='test@example.com', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.vendor = Vendor.objects.create(name='Test Vendor', code='V001')

        # Create a PO to link
        po = PurchaseOrder.objects.create(po_number='PO-123', vendor=self.vendor, delivery_date=timezone.now())

        # Create multiple PRs
        for i in range(10):
            PurchaseRequisition.objects.create(
                pr_number=f'PR-10{i}',
                title=f'Test PR {i}',
                requested_by=self.user,
                converted_to_po=po,
                required_date=timezone.now()
            )

    def test_n_plus_one_queries(self):
        with self.assertNumQueries(2):
            response = self.client.get('/api/procurement/requisitions/')
        self.assertEqual(response.status_code, 200)

    def test_n_plus_one_queries_twenty(self):
        po = PurchaseOrder.objects.first()
        for i in range(10, 20):
            PurchaseRequisition.objects.create(
                pr_number=f'PR-10{i}',
                title=f'Test PR {i}',
                requested_by=self.user,
                converted_to_po=po,
                required_date=timezone.now()
            )

        with self.assertNumQueries(2):
            response = self.client.get('/api/procurement/requisitions/')
        self.assertEqual(response.status_code, 200)

class PurchaseOrderNPlusOneTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='testpo@example.com', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.vendor = Vendor.objects.create(name='Test Vendor', code='V001')

        # Create multiple POs
        for i in range(10):
            PurchaseOrder.objects.create(
                po_number=f'PO-10{i}',
                title=f'Test PO {i}',
                prepared_by=self.user,
                approved_by=self.user,
                vendor=self.vendor,
                delivery_date=timezone.now()
            )

    def test_n_plus_one_queries_po(self):
        with self.assertNumQueries(2):
            response = self.client.get('/api/procurement/purchase-orders/')
        self.assertEqual(response.status_code, 200)

    def test_n_plus_one_queries_po_twenty(self):
        for i in range(10, 20):
            PurchaseOrder.objects.create(
                po_number=f'PO-10{i}',
                title=f'Test PO {i}',
                prepared_by=self.user,
                approved_by=self.user,
                vendor=self.vendor,
                delivery_date=timezone.now()
            )

        with self.assertNumQueries(2):
            response = self.client.get('/api/procurement/purchase-orders/')
        self.assertEqual(response.status_code, 200)
