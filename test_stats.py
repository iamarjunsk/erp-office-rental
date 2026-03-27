import os
import django
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.maintenance.models import MaintenanceRequest
from django.db import connection

# Original
def original_stats():
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

    return {
        'total': total,
        'open': open_count,
        'inProgress': in_progress,
        'completed': completed,
        'urgent': urgent,
        'highPriority': high,
        'overdue': overdue
    }

# Optimized
def optimized_stats():
    from django.db.models import Count, Q
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
    return {
        'total': stats['total'],
        'open': stats['open_count'],
        'inProgress': stats['in_progress'],
        'completed': stats['completed'],
        'urgent': stats['urgent'],
        'highPriority': stats['high'],
        'overdue': stats['overdue']
    }

import time
from django.db import reset_queries

reset_queries()
start = time.time()
res1 = original_stats()
t1 = time.time() - start
q1 = len(connection.queries)

reset_queries()
start = time.time()
res2 = optimized_stats()
t2 = time.time() - start
q2 = len(connection.queries)

print("Original:", res1)
print(f"Original Time: {t1:.4f}s, Queries: {q1}")

print("Optimized:", res2)
print(f"Optimized Time: {t2:.4f}s, Queries: {q2}")

assert res1 == res2, "Results do not match!"
