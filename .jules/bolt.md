## 2024-03-29 - Fixed N+1 queries in Booking API
**Learning:** Adding select_related to `BookingViewSet` reduced queries from 21 down to 1 when fetching 10 bookings.
**Action:** Always check serializers for nested models and add `select_related` or `prefetch_related` to the ViewSet queryset to avoid N+1 problems.
