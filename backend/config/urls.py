"""
URL configuration for ERP backend.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('apps.users.urls')),
    path('api/properties/', include('apps.properties.urls')),
    path('api/spaces/', include('apps.spaces.urls')),
    path('api/companies/', include('apps.companies.urls')),
    path('api/leases/', include('apps.leases.urls')),
    path('api/billing/', include('apps.billing.urls')),
    path('api/maintenance/', include('apps.maintenance.urls')),
    path('api/assets/', include('apps.assets.urls')),
    path('api/procurement/', include('apps.procurement.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
