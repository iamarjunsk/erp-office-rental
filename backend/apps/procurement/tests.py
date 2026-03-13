from django.test import TestCase
from django.utils import timezone
from apps.users.models import User
from apps.properties.models import Property
from .models import PurchaseRequisition, PurchaseOrder, Vendor
from .serializers import PurchaseRequisitionListSerializer
from django.test.utils import CaptureQueriesContext
from django.db import connection

class PurchaseRequisitionPerformanceTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='test@example.com',
            password='password123',
            first_name='Test',
            last_name='User'
        )
        self.prop = Property.objects.create(
            name='Test Property',
            code='P001',
            total_area=1000
        )
        self.vendor = Vendor.objects.create(
            name='Test Vendor',
            code='V001'
        )

        for i in range(5):
            pr = PurchaseRequisition.objects.create(
                pr_number=f'PR-{i}',
                title=f'Test PR {i}',
                requested_by=self.user,
                property_ref=self.prop,
                required_date=timezone.now().date()
            )
            po = PurchaseOrder.objects.create(
                po_number=f'PO-{i}',
                pr=pr,
                title=f'Test PO {i}',
                prepared_by=self.user,
                vendor=self.vendor,
                total_amount=100,
                delivery_date=timezone.now().date()
            )
            pr.converted_to_po = po
            pr.save()

    def test_pr_list_nplus1_queries(self):
        """
        Test that accessing the PurchaseRequisition list view uses an optimized
        number of queries (specifically addressing the N+1 query issue for converted_to_po).
        """
        qs = PurchaseRequisition.objects.all().select_related(
            'requested_by', 'property_ref', 'approved_by', 'converted_to_po'
        ).prefetch_related('items')

        with CaptureQueriesContext(connection) as ctx:
            serializer = PurchaseRequisitionListSerializer(qs, many=True)
            _ = serializer.data

        # It should take 2 queries: one for PRs (including related) and one for items
        self.assertLessEqual(len(ctx.captured_queries), 2)
