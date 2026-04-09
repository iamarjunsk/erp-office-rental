from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Sum, Count, Q
from django.utils import timezone
from .models import Vendor, PurchaseRequisition, PurchaseOrder
from .serializers import (
    VendorSerializer,
    PurchaseRequisitionListSerializer,
    PurchaseRequisitionDetailSerializer,
    PurchaseRequisitionCreateUpdateSerializer,
    PurchaseOrderListSerializer,
    PurchaseOrderDetailSerializer,
    PurchaseOrderCreateUpdateSerializer,
)

class VendorViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing vendors
    """
    queryset = Vendor.objects.all().order_by('-created_at')
    serializer_class = VendorSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'vendor_type', 'category']
    search_fields = ['name', 'code', 'contact_name', 'contact_email', 'gst_number']
    ordering_fields = ['name', 'rating', 'total_orders', 'total_value', 'created_at']
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get vendor statistics"""
        queryset = self.get_queryset()
        
        stats = {
            'total': queryset.count(),
            'active': queryset.filter(status='active').count(),
            'inactive': queryset.filter(status='inactive').count(),
            'suppliers': queryset.filter(vendor_type='supplier').count(),
            'serviceProviders': queryset.filter(vendor_type='service_provider').count(),
        }
        
        return Response(stats)


class PurchaseRequisitionViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing purchase requisitions
    """
    # ⚡ Bolt: added `converted_to_po` to `select_related` to eliminate N+1 queries when accessing nested model during serialization
    queryset = PurchaseRequisition.objects.all().select_related(
        'requested_by', 'property_ref', 'approved_by', 'converted_to_po'
    ).prefetch_related('items').order_by('-created_at')
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'priority', 'category', 'department']
    search_fields = ['pr_number', 'title', 'description']
    ordering_fields = ['required_date', 'total_estimated_amount', 'created_at']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return PurchaseRequisitionCreateUpdateSerializer
        elif self.action == 'retrieve':
            return PurchaseRequisitionDetailSerializer
        return PurchaseRequisitionListSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by status
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)
        
        # Filter by priority
        priority = self.request.query_params.get('priority')
        if priority:
            queryset = queryset.filter(priority=priority)
        
        # Filter by search term
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(pr_number__icontains=search) |
                Q(title__icontains=search) |
                Q(description__icontains=search)
            )
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get requisition statistics"""
        from django.db.models import Count, Sum, Q

        queryset = self.get_queryset()
        
        # ⚡ Bolt Optimization: Queries: 7 -> 1
        stats = queryset.aggregate(
            total=Count('id'),
            draft=Count('id', filter=Q(status='draft')),
            pending_approval=Count('id', filter=Q(status='pending_approval')),
            approved=Count('id', filter=Q(status='approved')),
            rejected=Count('id', filter=Q(status='rejected')),
            converted_to_po=Count('id', filter=Q(status='converted_to_po')),
            totalValue=Sum('total_estimated_amount')
        )

        stats['totalValue'] = stats['totalValue'] or 0
        
        return Response(stats)
    
    @action(detail=True, methods=['post'])
    def submit(self, request, pk=None):
        """Submit PR for approval"""
        pr = self.get_object()
        
        if pr.status != 'draft':
            return Response(
                {'error': 'Only draft PRs can be submitted'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        pr.status = 'pending_approval'
        pr.save()
        
        serializer = PurchaseRequisitionDetailSerializer(pr)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """Approve PR"""
        pr = self.get_object()
        
        if pr.status not in ['draft', 'pending_approval']:
            return Response(
                {'error': 'PR cannot be approved in current status'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        pr.status = 'approved'
        pr.approved_by = request.user
        pr.approved_at = timezone.now()
        pr.save()
        
        serializer = PurchaseRequisitionDetailSerializer(pr)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        """Reject PR"""
        pr = self.get_object()
        
        if pr.status not in ['draft', 'pending_approval', 'approved']:
            return Response(
                {'error': 'PR cannot be rejected in current status'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        reason = request.data.get('reason', '')
        pr.status = 'rejected'
        pr.rejection_reason = reason
        pr.approved_by = request.user
        pr.approved_at = timezone.now()
        pr.save()
        
        serializer = PurchaseRequisitionDetailSerializer(pr)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Cancel PR"""
        pr = self.get_object()

        if pr.status == 'converted_to_po':
            return Response(
                {'error': 'Cannot cancel PR that has been converted to PO'},
                status=status.HTTP_400_BAD_REQUEST
            )

        pr.status = 'cancelled'
        pr.save()

        serializer = PurchaseRequisitionDetailSerializer(pr)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def convert_to_po(self, request, pk=None):
        """Get PR data pre-filled for PO creation"""
        pr = self.get_object()

        if pr.status not in ['approved', 'converted_to_po']:
            return Response(
                {'error': 'Only approved requisitions can be converted to PO'},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response({
            'pr_id': pr.id,
            'pr_number': pr.pr_number,
            'title': pr.title,
            'description': pr.description,
            'department': pr.department,
            'required_date': pr.required_date,
            'priority': pr.priority,
            'category': pr.category,
            'items': [
                {
                    'item_name': item.item_name,
                    'description': item.description,
                    'quantity': item.quantity,
                    'unit': item.unit,
                    'estimated_unit_price': item.estimated_unit_price,
                    'total_estimated_price': item.total_estimated_price,
                }
                for item in pr.items.all()
            ],
            'total_estimated_amount': str(pr.total_estimated_amount),
        })


class PurchaseOrderViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing purchase orders
    """
    queryset = PurchaseOrder.objects.all().select_related(
        'pr', 'vendor', 'prepared_by', 'approved_by'
    ).prefetch_related('items').order_by('-created_at')
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'vendor']
    search_fields = ['po_number', 'title', 'vendor__name']
    ordering_fields = ['delivery_date', 'total_amount', 'created_at']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return PurchaseOrderCreateUpdateSerializer
        elif self.action == 'retrieve':
            return PurchaseOrderDetailSerializer
        return PurchaseOrderListSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by status
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)
        
        # Filter by vendor
        vendor = self.request.query_params.get('vendor')
        if vendor:
            queryset = queryset.filter(vendor_id=vendor)
        
        # Filter by PR
        pr_id = self.request.query_params.get('prId')
        if pr_id:
            queryset = queryset.filter(pr_id=pr_id)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get PO statistics"""
        from django.db.models import Count, Sum, Q

        queryset = self.get_queryset()
        
        # ⚡ Bolt Optimization: Queries: 7 -> 1
        stats = queryset.aggregate(
            total=Count('id'),
            draft=Count('id', filter=Q(status='draft')),
            sent=Count('id', filter=Q(status='sent')),
            acknowledged=Count('id', filter=Q(status='acknowledged')),
            partially_received=Count('id', filter=Q(status='partially_received')),
            received=Count('id', filter=Q(status='received')),
            totalValue=Sum('total_amount')
        )

        stats['totalValue'] = stats['totalValue'] or 0
        
        return Response(stats)
    
    @action(detail=True, methods=['post'])
    def submit(self, request, pk=None):
        """Submit PO for approval"""
        po = self.get_object()
        
        if po.status != 'draft':
            return Response(
                {'error': 'Only draft POs can be submitted'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        po.status = 'pending_approval'
        po.save()
        
        serializer = PurchaseOrderDetailSerializer(po)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """Approve PO"""
        po = self.get_object()
        
        if po.status not in ['draft', 'pending_approval']:
            return Response(
                {'error': 'PO cannot be approved in current status'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        po.status = 'approved'
        po.approved_by = request.user
        po.approved_at = timezone.now()
        po.save()
        
        serializer = PurchaseOrderDetailSerializer(po)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def send(self, request, pk=None):
        """Send PO to vendor"""
        po = self.get_object()
        
        if po.status not in ['approved', 'sent']:
            return Response(
                {'error': 'PO must be approved before sending'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        po.status = 'sent'
        po.sent_at = timezone.now()
        po.save()
        
        serializer = PurchaseOrderDetailSerializer(po)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def receive(self, request, pk=None):
        """Receive PO items"""
        po = self.get_object()
        
        if po.status not in ['sent', 'acknowledged', 'partially_received']:
            return Response(
                {'error': 'PO cannot be received in current status'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get received items from request
        received_items = request.data.get('items', [])
        
        for item_data in received_items:
            item_id = item_data.get('itemId')
            received_qty = item_data.get('receivedQuantity', 0)
            
            try:
                item = po.items.get(id=item_id)
                item.received_quantity = received_qty
                item.save()
            except PurchaseOrder.items.through.model.DoesNotExist:
                continue
        
        po.update_received_status()
        
        if po.status == 'received':
            po.received_at = timezone.now()
            po.save()
        
        serializer = PurchaseOrderDetailSerializer(po)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Cancel PO"""
        po = self.get_object()
        
        if po.status in ['received', 'closed']:
            return Response(
                {'error': 'Cannot cancel received or closed POs'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        po.status = 'cancelled'
        po.save()
        
        serializer = PurchaseOrderDetailSerializer(po)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def pdf(self, request, pk=None):
        """Download PO as PDF"""
        from django.http import HttpResponse
        from .pdf_generator import generate_po_pdf
        
        po = self.get_object()
        
        pdf_content = generate_po_pdf(po)
        
        response = HttpResponse(pdf_content, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{po.po_number}.pdf"'
        return response
