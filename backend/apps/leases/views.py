from rest_framework import viewsets, permissions, filters
from .models import Lease
from .serializers import LeaseSerializer

class LeaseViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows leases to be viewed or edited.
    """
    queryset = Lease.objects.all().select_related('company', 'space').order_by('-created_at')
    serializer_class = LeaseSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['lease_number', 'company__name', 'space__code']
    ordering_fields = ['start_date', 'end_date', 'rent_amount', 'created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by status
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)
        
        # Filter by company
        company = self.request.query_params.get('company')
        if company:
            queryset = queryset.filter(company_id=company)
        
        # Filter by space
        space = self.request.query_params.get('space')
        if space:
            queryset = queryset.filter(space_id=space)
        
        return queryset
