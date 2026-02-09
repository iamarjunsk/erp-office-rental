from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MaintenanceCategoryViewSet, MaintenanceRequestViewSet, MaintenanceTaskViewSet

router = DefaultRouter()
router.register(r'categories', MaintenanceCategoryViewSet)
router.register(r'requests', MaintenanceRequestViewSet)
router.register(r'tasks', MaintenanceTaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
