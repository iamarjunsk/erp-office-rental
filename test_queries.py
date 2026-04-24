import os
import sys
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), 'backend')))
django.setup()

from apps.maintenance.views import MaintenanceRequestViewSet
from rest_framework.test import APIRequestFactory
from apps.users.models import User
from django.db import connection

factory = APIRequestFactory()
request = factory.get('/api/maintenance/stats/')
user = User.objects.first()
from rest_framework.test import force_authenticate
force_authenticate(request, user=user)

view = MaintenanceRequestViewSet.as_view({'get': 'stats'})

# Clear queries
connection.queries_log.clear()

response = view(request)

print("Queries:", len(connection.queries))
print(response.data)
