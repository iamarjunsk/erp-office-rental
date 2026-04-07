## 2024-05-18 - [Django ORM Multi-Count Optimization]
**Learning:** Performing multiple independent `.count()` calls on the same model is inefficient, causing multiple database roundtrips.
**Action:** Always combine multiple counting aggregations or conditional counts on the same model into a single `.aggregate()` call using `Count('pk', filter=Q(...))` to minimize database overhead and improve response times.
