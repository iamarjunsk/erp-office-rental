## 2024-03-18 - Single Query Statistics Endpoint via Conditional Aggregation
**Learning:** Instead of running multiple `count()` queries to calculate statistics for different states (like `status='open'`, `status='completed'`), Django's `aggregate` combined with `Count` and `filter=Q(...)` allows computing multiple statistics in a single database roundtrip.
**Action:** When computing multi-metric dashboards or stats, combine `.aggregate()` and `filter=Q(...)` to reduce queries from N to 1.
