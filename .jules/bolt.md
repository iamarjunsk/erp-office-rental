## 2024-05-24 - Single Aggregate for Multiple Stats
**Learning:** ViewSet actions calculating multiple related statistics with separate `.count()` and `.aggregate()` calls on the same model lead to N separate database queries. This is particularly prevalent in DRF analytics/dashboard endpoints.
**Action:** Combine these multiple operations into a single `.aggregate()` call using conditional `Count` objects with `Q` filters (e.g., `Count('id', filter=Q(status='active'))`) to reduce queries to exactly 1 per stats endpoint.
