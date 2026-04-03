from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import date, timedelta
from .models import Asset, AssetCategory, AssetMaintenance, AssetAssignmentHistory
from .serializers import (
    AssetSerializer,
    AssetCreateSerializer,
    AssetCategorySerializer,
    AssetMaintenanceSerializer,
    AssetAssignmentHistorySerializer
)

class AssetCategoryViewSet(viewsets.ModelViewSet):
    """API endpoint for asset categories"""
    queryset = AssetCategory.objects.all().order_by('name')
    serializer_class = AssetCategorySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']


class AssetViewSet(viewsets.ModelViewSet):
    """API endpoint for assets"""
    queryset = Asset.objects.all().select_related(
        'category', 'property', 'space', 'assigned_to'
    ).prefetch_related('maintenance_history', 'assignment_history').order_by('-created_at')
    serializer_class = AssetSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'condition', 'category', 'property', 'space', 'assigned_to']
    search_fields = ['asset_code', 'name', 'serial_number', 'manufacturer']
    ordering_fields = ['purchase_date', 'purchase_price', 'created_at']

    def get_serializer_class(self):
        if self.action == 'create':
            return AssetCreateSerializer
        return AssetSerializer

    def perform_create(self, serializer):
        # Generate asset code
        import uuid
        category_prefix = 'AST'
        if serializer.validated_data.get('category'):
            category_prefix = serializer.validated_data['category'].name[:3].upper()
        
        asset_code = f"{category_prefix}-{date.today().strftime('%Y%m%d')}-{str(uuid.uuid4())[:6].upper()}"
        serializer.save(asset_code=asset_code)

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by warranty status
        warranty = self.request.query_params.get('warranty')
        if warranty == 'active':
            queryset = queryset.filter(warranty_expiry__gte=date.today())
        elif warranty == 'expired':
            queryset = queryset.filter(warranty_expiry__lt=date.today())
        
        # Filter by maintenance due
        maintenance_due = self.request.query_params.get('maintenance_due')
        if maintenance_due == 'true':
            queryset = queryset.filter(
                next_maintenance_date__lte=date.today(),
                status='active'
            )
        
        # Filter by purchase date range
        date_from = self.request.query_params.get('date_from')
        date_to = self.request.query_params.get('date_to')
        if date_from:
            queryset = queryset.filter(purchase_date__gte=date_from)
        if date_to:
            queryset = queryset.filter(purchase_date__lte=date_to)
        
        return queryset

    @action(detail=True, methods=['post'])
    def assign(self, request, pk=None):
        """Assign asset to a user"""
        asset = self.get_object()
        user_id = request.data.get('assigned_to')
        notes = request.data.get('notes', '')
        
        if user_id:
            from apps.users.models import User
            try:
                user = User.objects.get(id=user_id)
                
                # Create assignment history record
                if asset.assigned_to:
                    # Close previous assignment
                    previous_assignment = AssetAssignmentHistory.objects.filter(
                        asset=asset,
                        assigned_to=asset.assigned_to,
                        returned_date__isnull=True
                    ).first()
                    if previous_assignment:
                        previous_assignment.returned_date = date.today()
                        previous_assignment.save()
                
                # Create new assignment history
                AssetAssignmentHistory.objects.create(
                    asset=asset,
                    assigned_to=user,
                    assigned_date=date.today(),
                    assigned_by=request.user,
                    notes=notes
                )
                
                # Update asset
                asset.assigned_to = user
                asset.assignment_date = date.today()
                asset.save()
                
                return Response({'status': 'Asset assigned successfully'})
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=400)
        
        return Response({'error': 'assigned_to is required'}, status=400)

    @action(detail=True, methods=['post'])
    def return_asset(self, request, pk=None):
        """Return assigned asset"""
        asset = self.get_object()
        
        if asset.assigned_to:
            # Close current assignment
            current_assignment = AssetAssignmentHistory.objects.filter(
                asset=asset,
                assigned_to=asset.assigned_to,
                returned_date__isnull=True
            ).first()
            
            if current_assignment:
                current_assignment.returned_date = date.today()
                current_assignment.save()
            
            # Clear assignment
            asset.assigned_to = None
            asset.assignment_date = None
            asset.save()
            
            return Response({'status': 'Asset returned successfully'})
        
        return Response({'error': 'Asset is not assigned'}, status=400)

    @action(detail=True, methods=['post'])
    def add_maintenance(self, request, pk=None):
        """Add maintenance record"""
        asset = self.get_object()
        
        serializer = AssetMaintenanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(asset=asset)
            return Response(serializer.data, status=201)
        
        return Response(serializer.errors, status=400)

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get asset statistics"""
        # Optimize by running a single aggregate query instead of multiple count() queries
        from django.db.models import Sum, Count, Q
        today = date.today()
        
        stats = Asset.objects.aggregate(
            total=Count('pk'),
            active=Count('pk', filter=Q(status='active')),
            in_maintenance=Count('pk', filter=Q(status='in_maintenance')),
            disposed=Count('pk', filter=Q(status='disposed')),
            total_value=Sum('purchase_price', filter=Q(status='active')),
            under_warranty=Count('pk', filter=Q(warranty_expiry__gte=today)),
            warranty_expired=Count('pk', filter=Q(warranty_expiry__lt=today)),
            maintenance_due=Count('pk', filter=Q(next_maintenance_date__lte=today, status='active'))
        )
        
        return Response({
            'total': stats['total'],
            'active': stats['active'],
            'inMaintenance': stats['in_maintenance'],
            'disposed': stats['disposed'],
            'totalValue': stats['total_value'] or 0,
            'underWarranty': stats['under_warranty'],
            'warrantyExpired': stats['warranty_expired'],
            'maintenanceDue': stats['maintenance_due']
        })


class AssetMaintenanceViewSet(viewsets.ModelViewSet):
    """API endpoint for asset maintenance records"""
    queryset = AssetMaintenance.objects.all().select_related('asset', 'performed_by')
    serializer_class = AssetMaintenanceSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['asset', 'performed_by']
