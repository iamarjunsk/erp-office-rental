## 2024-04-14 - Optimize DRF ViewSet stats via Conditional Aggregation
**Learning:** Found multiple instances where Django ViewSet `stats()` endpoints were executing 5-7 separate `.count()` and `.aggregate()` queries. This causes unnecessary database roundtrips.
**Action:** Use a single `.aggregate()` query by combining `Count('pk', filter=Q(...))` and `Sum(...)` into one call to bring the query count down to 1. Ensure `import Count, Q, Sum` is included, and handle `Sum` returning `None` if the queryset is empty.
