from rest_framework import viewsets, permissions, filters
from .models import Space
from .serializers import SpaceSerializer

class SpaceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows spaces to be viewed or edited.
    """
    queryset = Space.objects.all().select_related('property')
    serializer_class = SpaceSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['code', 'name', 'property__name', 'property__code']
    ordering_fields = ['code', 'floor', 'area', 'base_rent', 'created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by status
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(current_status=status)
        
        # Filter by type
        space_type = self.request.query_params.get('type')
        if space_type:
            queryset = queryset.filter(type=space_type)
        
        # Filter by property
        property_id = self.request.query_params.get('property')
        if property_id:
            queryset = queryset.filter(property_id=property_id)
        
        return queryset
