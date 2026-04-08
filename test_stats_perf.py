import os
import sys
import django
import time

# Ensure 'backend' directory is in PYTHONPATH so 'apps' can be imported
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), 'backend')))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.db import connection
from django.db.models import Count, Q
from django.utils import timezone
from apps.maintenance.models import MaintenanceRequest

def old_way():
    total = MaintenanceRequest.objects.count()
    open_count = MaintenanceRequest.objects.filter(status='open').count()
    in_progress = MaintenanceRequest.objects.filter(status='in_progress').count()
    completed = MaintenanceRequest.objects.filter(status='completed').count()

    urgent = MaintenanceRequest.objects.filter(priority='urgent', status__in=['open', 'assigned', 'in_progress']).count()
    high = MaintenanceRequest.objects.filter(priority='high', status__in=['open', 'assigned', 'in_progress']).count()

    overdue = MaintenanceRequest.objects.filter(
        scheduled_date__lt=timezone.now().date(),
        status__in=['open', 'assigned', 'in_progress']
    ).count()
    return total, open_count, in_progress, completed, urgent, high, overdue

def new_way():
    stats = MaintenanceRequest.objects.aggregate(
        total=Count('pk'),
        open_count=Count('pk', filter=Q(status='open')),
        in_progress=Count('pk', filter=Q(status='in_progress')),
        completed=Count('pk', filter=Q(status='completed')),
        urgent=Count('pk', filter=Q(priority='urgent', status__in=['open', 'assigned', 'in_progress'])),
        high=Count('pk', filter=Q(priority='high', status__in=['open', 'assigned', 'in_progress'])),
        overdue=Count('pk', filter=Q(scheduled_date__lt=timezone.now().date(), status__in=['open', 'assigned', 'in_progress']))
    )
    return stats

# Test old way
queries_before = len(connection.queries)
start = time.time()
old_res = old_way()
end = time.time()
queries_after = len(connection.queries)
print(f"Old Way: {queries_after - queries_before} queries, time: {end - start:.5f}s, res: {old_res}")

# Test new way
queries_before = len(connection.queries)
start = time.time()
new_res = new_way()
end = time.time()
queries_after = len(connection.queries)
print(f"New Way: {queries_after - queries_before} queries, time: {end - start:.5f}s, res: {new_res}")
