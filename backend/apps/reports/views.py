import csv
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.db.models import Sum, Count, Q
from django.utils import timezone
from datetime import timedelta

from apps.spaces.models import Space
from apps.billing.models import Invoice, Payment
from apps.leases.models import Lease
from apps.maintenance.models import MaintenanceRequest
from apps.companies.models import Company

class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_stats(self):
        today = timezone.now().date()
        month_start = today.replace(day=1)

        # Occupancy
        total_spaces = Space.objects.count()
        occupied_spaces = Space.objects.filter(current_status='occupied').count()
        occupancy_rate = (occupied_spaces / total_spaces * 100) if total_spaces > 0 else 0

        # Revenue
        total_revenue = Invoice.objects.filter(status='paid').aggregate(Sum('total_amount'))['total_amount__sum'] or 0
        monthly_revenue = Payment.objects.filter(
            payment_date__gte=month_start
        ).aggregate(Sum('amount'))['amount__sum'] or 0

        # Outstanding & Collection Rate
        # Optimized: Combined multiple aggregations into a single query to reduce database roundtrips
        invoice_aggregates = Invoice.objects.aggregate(
            outstanding_dues=Sum('balance_due'),
            total_invoiced=Sum('total_amount'),
            total_paid=Sum('amount_paid')
        )

        outstanding_dues = invoice_aggregates['outstanding_dues'] or 0
        total_invoiced = invoice_aggregates['total_invoiced'] or 0
        total_paid = invoice_aggregates['total_paid'] or 0

        collection_rate = (total_paid / total_invoiced * 100) if total_invoiced > 0 else 0

        # Maintenance
        total_tickets = MaintenanceRequest.objects.count()
        completed_tickets = MaintenanceRequest.objects.filter(status='completed').count()

        # Leases
        active_leases = Lease.objects.filter(status='active').count()
        expiring_leases = Lease.objects.filter(
            status='active',
            end_date__lte=today + timedelta(days=30)
        ).count()

        return {
            'occupancy_rate': round(occupancy_rate, 1),
            'collection_rate': round(collection_rate, 1),
            'avg_resolution_time': '24h',
            'tenant_satisfaction': 4.8,

            'total_revenue': total_revenue,
            'outstanding_dues': outstanding_dues,

            'active_leases': active_leases,
            'expiring_leases': expiring_leases,

            'total_tickets': total_tickets,
            'completed_tickets': completed_tickets,

            'total_tenants': Company.objects.filter(status='active').count()
        }

    def get(self, request):
        return Response(self.get_stats())


class ExportReportView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        stats_view = DashboardStatsView()
        stats = stats_view.get_stats()

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="dashboard_report_{timezone.now().date()}.csv"'

        writer = csv.writer(response)
        writer.writerow(['Metric', 'Value'])
        writer.writerow(['Occupancy Rate (%)', stats['occupancy_rate']])
        writer.writerow(['Collection Rate (%)', stats['collection_rate']])
        writer.writerow(['Avg Resolution Time', stats['avg_resolution_time']])
        writer.writerow(['Tenant Satisfaction', stats['tenant_satisfaction']])
        writer.writerow(['Total Revenue (INR)', stats['total_revenue']])
        writer.writerow(['Outstanding Dues (INR)', stats['outstanding_dues']])
        writer.writerow(['Active Leases', stats['active_leases']])
        writer.writerow(['Expiring Leases (30 days)', stats['expiring_leases']])
        writer.writerow(['Total Maintenance Tickets', stats['total_tickets']])
        writer.writerow(['Completed Maintenance Tickets', stats['completed_tickets']])
        writer.writerow(['Total Active Tenants', stats['total_tenants']])

        return response
