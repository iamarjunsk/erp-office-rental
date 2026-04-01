from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from django.db.models import Count, Q
from .models import MaintenanceCategory, MaintenanceRequest, MaintenanceTask, MaintenanceComment
from .serializers import (
    MaintenanceCategorySerializer,
    MaintenanceRequestSerializer,
    MaintenanceRequestCreateSerializer,
    MaintenanceTaskSerializer,
    MaintenanceCommentSerializer
)

class MaintenanceCategoryViewSet(viewsets.ModelViewSet):
    """API endpoint for maintenance categories"""
    queryset = MaintenanceCategory.objects.all().order_by('name')
    serializer_class = MaintenanceCategorySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']


class MaintenanceRequestViewSet(viewsets.ModelViewSet):
    """API endpoint for maintenance requests"""
    queryset = MaintenanceRequest.objects.all().select_related(
        'property', 'space', 'category', 'reported_by', 'assigned_to'
    ).prefetch_related('tasks', 'comments').order_by('-created_at')
    serializer_class = MaintenanceRequestSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'priority', 'type', 'category', 'property']
    search_fields = ['ticket_number', 'title', 'description']
    ordering_fields = ['priority', 'created_at', 'scheduled_date']

    def get_serializer_class(self):
        if self.action == 'create':
            return MaintenanceRequestCreateSerializer
        return MaintenanceRequestSerializer

    def perform_create(self, serializer):
        # Generate ticket number
        import uuid
        ticket_number = f"MR-{timezone.now().strftime('%Y%m%d')}-{str(uuid.uuid4())[:6].upper()}"
        serializer.save(
            ticket_number=ticket_number,
            reported_by=self.request.user
        )

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
        
        # Filter overdue (scheduled date passed but not completed)
        overdue = self.request.query_params.get('overdue')
        if overdue == 'true':
            queryset = queryset.filter(
                scheduled_date__lt=timezone.now().date(),
                status__in=['open', 'assigned', 'in_progress']
            )
        
        # Filter by date range
        date_from = self.request.query_params.get('date_from')
        date_to = self.request.query_params.get('date_to')
        if date_from:
            queryset = queryset.filter(reported_date__date__gte=date_from)
        if date_to:
            queryset = queryset.filter(reported_date__date__lte=date_to)
        
        return queryset

    @action(detail=True, methods=['post'])
    def assign(self, request, pk=None):
        """Assign request to a user"""
        request_obj = self.get_object()
        user_id = request.data.get('assigned_to')
        
        if user_id:
            from apps.users.models import User
            try:
                user = User.objects.get(id=user_id)
                request_obj.assigned_to = user
                request_obj.status = 'assigned'
                request_obj.save()
                return Response({'status': 'Request assigned successfully'})
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=400)
        
        return Response({'error': 'assigned_to is required'}, status=400)

    @action(detail=True, methods=['post'])
    def start_work(self, request, pk=None):
        """Mark request as in progress"""
        request_obj = self.get_object()
        request_obj.status = 'in_progress'
        request_obj.started_date = timezone.now()
        request_obj.save()
        return Response({'status': 'Work started'})

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """Complete the request"""
        request_obj = self.get_object()
        actual_cost = request.data.get('actual_cost')
        resolution_notes = request.data.get('resolution_notes')
        
        request_obj.status = 'completed'
        request_obj.completed_date = timezone.now()
        if actual_cost:
            request_obj.actual_cost = actual_cost
        if resolution_notes:
            request_obj.resolution_notes = resolution_notes
        request_obj.save()
        
        return Response({'status': 'Request completed'})

    @action(detail=True, methods=['post'])
    def add_comment(self, request, pk=None):
        """Add a comment to the request"""
        request_obj = self.get_object()
        comment_text = request.data.get('comment')
        is_internal = request.data.get('is_internal', False)
        
        if comment_text:
            comment = MaintenanceComment.objects.create(
                request=request_obj,
                author=request.user,
                comment=comment_text,
                is_internal=is_internal
            )
            serializer = MaintenanceCommentSerializer(comment)
            return Response(serializer.data)
        
        return Response({'error': 'comment is required'}, status=400)

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get maintenance statistics"""
        # Bolt Performance Optimization:
        # Reduced 7 separate COUNT queries to 1 using aggregate() with conditional Count.
        # This significantly improves API latency by avoiding multiple database roundtrips.
        stats = MaintenanceRequest.objects.aggregate(
            total=Count('pk'),
            open_count=Count('pk', filter=Q(status='open')),
            in_progress=Count('pk', filter=Q(status='in_progress')),
            completed=Count('pk', filter=Q(status='completed')),
            urgent=Count('pk', filter=Q(priority='urgent', status__in=['open', 'assigned', 'in_progress'])),
            high=Count('pk', filter=Q(priority='high', status__in=['open', 'assigned', 'in_progress'])),
            overdue=Count('pk', filter=Q(
                scheduled_date__lt=timezone.now().date(),
                status__in=['open', 'assigned', 'in_progress']
            ))
        )
        
        return Response({
            'total': stats['total'],
            'open': stats['open_count'],
            'inProgress': stats['in_progress'],
            'completed': stats['completed'],
            'urgent': stats['urgent'],
            'highPriority': stats['high'],
            'overdue': stats['overdue']
        })


class MaintenanceTaskViewSet(viewsets.ModelViewSet):
    """API endpoint for maintenance tasks"""
    queryset = MaintenanceTask.objects.all().select_related('request', 'assigned_to')
    serializer_class = MaintenanceTaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'request', 'assigned_to']

    def perform_create(self, serializer):
        serializer.save()
