from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.http import HttpResponse
from .models import Invoice, Payment
from .serializers import InvoiceSerializer, PaymentSerializer
from .pdf_generator import generate_invoice_pdf

class InvoiceViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing invoices
    """
    queryset = Invoice.objects.all().select_related('company', 'lease').prefetch_related('items', 'payments').order_by('-created_at')
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'type', 'company', 'lease']
    search_fields = ['invoice_number', 'company__name', 'notes']
    ordering_fields = ['invoice_date', 'due_date', 'total_amount', 'created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by company name search
        company = self.request.query_params.get('company_name')
        if company:
            queryset = queryset.filter(company__name__icontains=company)
        
        # Filter by date range
        date_from = self.request.query_params.get('date_from')
        date_to = self.request.query_params.get('date_to')
        if date_from:
            queryset = queryset.filter(invoice_date__gte=date_from)
        if date_to:
            queryset = queryset.filter(invoice_date__lte=date_to)
        
        # Filter overdue invoices
        overdue = self.request.query_params.get('overdue')
        if overdue == 'true':
            from django.utils import timezone
            queryset = queryset.filter(due_date__lt=timezone.now().date(), balance_due__gt=0)
        
        return queryset

    @action(detail=True, methods=['get'])
    def download(self, request, pk=None):
        """Generate and download invoice PDF"""
        invoice = self.get_object()
        
        # Generate PDF
        pdf_buffer = generate_invoice_pdf(invoice)
        
        # Create response
        response = HttpResponse(pdf_buffer.getvalue(), content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{invoice.invoice_number}.pdf"'
        
        return response


class PaymentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing payments
    """
    queryset = Payment.objects.all().select_related('invoice').order_by('-payment_date')
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['status', 'payment_method', 'invoice']
    search_fields = ['transaction_id', 'reference_number', 'notes']
