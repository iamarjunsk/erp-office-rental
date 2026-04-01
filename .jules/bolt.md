
## 2024-05-28 - Optimizing Multiple Counts on a Single Model
**Learning:** Performing multiple `.count()` queries on the same Django model for different filters results in separate database queries for each call (e.g., 7 `.count()` calls result in 7 SQL `SELECT COUNT(...)` queries).
**Action:** Always combine multiple counting operations on the same model into a single `.aggregate()` call using conditional `Count` functions with `filter=Q(...)`. This reduces database roundtrips and significantly improves API latency.
