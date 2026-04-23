## 2024-04-23 - Combining multiple count() queries into a single aggregate

**Learning:** When retrieving stats using multiple `count()` queries on the same model with different filters, Django executes multiple separate database queries (resulting in 7 queries in `MaintenanceRequest.stats`), which adds latency due to database roundtrips.

**Action:** Optimize multiple counts into a single `.aggregate()` call using `Count('pk', filter=Q(...))`, which reduces the query count to 1.
