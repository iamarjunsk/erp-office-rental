## 2024-05-24 - Django ORM Aggregation Optimization
**Learning:** Consolidating multiple conditional `.count()` queries and `.aggregate()` calls into a single `aggregate()` call using `Count('pk', filter=Q(...))` reduces database roundtrips significantly, optimizing viewset stats methods from N queries to 1.
**Action:** Always check `stats` or dashboard-like endpoints in Django ViewSets for repetitive query execution and replace them with single aggregated queries when possible.
