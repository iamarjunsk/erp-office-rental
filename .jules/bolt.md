## 2024-05-15 - Django ORM Aggregation Optimization
**Learning:** Multiple separate `count()` calls on the same model in Django result in individual database queries (N queries). This is particularly noticeable in statistics or dashboard endpoints.
**Action:** Always combine multiple `count()` or `sum()` queries on the same model into a single `.aggregate()` call using conditional counting (e.g., `Count('pk', filter=Q(...))`). This reduces the database roundtrips to 1 and improves execution time significantly.
