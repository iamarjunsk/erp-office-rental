from rest_framework import viewsets, permissions, filters
from rest_framework.pagination import PageNumberPagination
from .models import Property
from .serializers import PropertySerializer

class PropertyPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class PropertyViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows properties to be viewed or edited.
    """
    # Optimized to avoid N+1 queries when fetching manager details
    queryset = Property.objects.select_related('manager').all().order_by('-created_at')
    serializer_class = PropertySerializer
    pagination_class = PropertyPagination
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'code', 'city', 'state']
    ordering_fields = ['name', 'created_at', 'total_area']

    def get_queryset(self):
        queryset = super().get_queryset()
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)
        return queryset
