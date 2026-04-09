## 2025-03-26 - [Optimize Maintenance Request Stats]
**Learning:** In Django DRF viewsets, performing multiple `.count()` queries sequentially for different conditions on the same model triggers separate roundtrips to the database. In `MaintenanceRequestViewSet.stats()`, this resulted in 7 separate SQL queries.
**Action:** Use Django's `aggregate` combined with `Count` and `Q` objects (e.g., `Count('id', filter=Q(...))`) to fetch all related dashboard counts in a single database roundtrip.
