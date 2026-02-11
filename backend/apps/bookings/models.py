from django.db import models
from django.conf import settings
from apps.spaces.models import Space
from apps.companies.models import Company

class Booking(models.Model):
    title = models.CharField(max_length=255)
    space = models.ForeignKey(Space, on_delete=models.CASCADE, related_name='bookings')
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True, related_name='bookings')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings')

    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-start_time']

    def __str__(self):
        return f"{self.title} - {self.space.name} ({self.start_time.date()})"
