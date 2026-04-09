
## 2024-04-09 - Optimize Multiple Count Queries in Django Viewsets
**Learning:** Performing multiple independent `.count()` queries on the same table with different conditions causes an N+1 query pattern that severely degrades database performance, as each query forces a full roundtrip.
**Action:** When gathering summary statistics on a single Django model, always replace multiple `.count()` calls with a single `.aggregate()` call that combines `Count` and conditional `filter=Q(...)` statements to fetch all metrics in a single database roundtrip.
