from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .views import VendorViewSet, PurchaseRequisitionViewSet, PurchaseOrderViewSet

router = DefaultRouter()
router.register(r'vendors', VendorViewSet)
router.register(r'requisitions', PurchaseRequisitionViewSet)
router.register(r'purchase-orders', PurchaseOrderViewSet)

@api_view(['GET'])
def category_choices(request):
    """Return category choices for requisitions"""
    from .models import PurchaseRequisition
    categories = [{'value': value, 'label': label} for value, label in PurchaseRequisition.CATEGORY_CHOICES]
    return Response({'results': categories})

urlpatterns = [
    path('', include(router.urls)),
    path('categories/', category_choices, name='category-choices'),
]
