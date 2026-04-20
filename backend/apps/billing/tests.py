from django.test import TestCase
from django.utils import timezone
from apps.companies.models import Company
from apps.leases.models import Lease
from apps.properties.models import Property
from apps.spaces.models import Space
from apps.billing.models import Invoice, InvoiceItem, Payment
import datetime
from decimal import Decimal

class InvoicePerformanceTest(TestCase):
    def setUp(self):
        # Create prerequisites
        self.property = Property.objects.create(
            code="PROP001", name="Test Property", type="commercial",
            address="123 Test St", city="Test City", state="TS", pincode="123456",
            total_area=10000
        )
        self.space = Space.objects.create(
            code="SPACE001", name="Test Space", property=self.property,
            type="private_office", floor=1, area=1000, base_rent=50000
        )
        self.company = Company.objects.create(
            name="Test Company", industry="IT",
            gstin="GSTIN123", pan="PAN123"
        )
        self.lease = Lease.objects.create(
            lease_number="LEASE001", company=self.company, space=self.space,
            start_date=timezone.now().date(), end_date=timezone.now().date() + datetime.timedelta(days=365),
            rent_amount=50000
        )
        self.invoice = Invoice.objects.create(
            invoice_number="INV001", company=self.company, lease=self.lease,
            period_start=timezone.now().date(), period_end=timezone.now().date() + datetime.timedelta(days=30),
            invoice_date=timezone.now().date(), due_date=timezone.now().date() + datetime.timedelta(days=15)
        )
        self.invoice.refresh_from_db()

    def test_calculate_totals_correctness(self):
        # Create 50 invoice items
        items = []
        for i in range(50):
            items.append(InvoiceItem(
                invoice=self.invoice,
                description=f"Item {i}",
                quantity=1,
                unit_price=100,
                line_total=100
            ))
        InvoiceItem.objects.bulk_create(items)

        # calculate_totals should run in constant queries (1 fetch aggregation, 1 update)
        # However, assertNumQueries counts 2.
        with self.assertNumQueries(2):
             self.invoice.calculate_totals()

        # Verify correctness
        self.invoice.refresh_from_db()
        self.assertEqual(self.invoice.subtotal, 5000) # 50 * 100

    def test_payment_save_correctness(self):
        # Create 50 payments
        for i in range(50):
            Payment.objects.create(
                invoice=self.invoice,
                amount=100,
                payment_date=timezone.now().date(),
                payment_method='cash'
            )

        p = Payment(
            invoice=self.invoice,
            amount=100,
            payment_date=timezone.now().date(),
            payment_method='cash'
        )
        # save should run in constant queries (1 insert, 1 aggregation, 1 update) -> 3
        with self.assertNumQueries(3):
            p.save()

        self.invoice.refresh_from_db()
        # 50 existing + 1 new = 51 * 100 = 5100
        self.assertEqual(self.invoice.amount_paid, 5100)
