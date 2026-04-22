## 2024-04-22 - Combine Django ORM Aggregations
**Learning:** Found multiple redundant ORM aggregation and `.count()` queries in the dashboard view. Django allows executing multiple conditional aggregates using `Count('pk', filter=Q(...))` or `Sum('field', filter=Q(...))` in a single `.aggregate()` call, preventing multiple DB roundtrips.
**Action:** Always combine related aggregates and counts on the same model into a single `aggregate()` query instead of running them separately to cut down on DB hits.
