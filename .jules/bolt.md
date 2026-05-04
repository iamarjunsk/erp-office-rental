## 2025-02-27 - Django ORM Aggregation for Statistics
**Learning:** Using multiple `.count()` queries to gather related statistics on the same model leads to redundant database calls (e.g., 7 separate queries).
**Action:** Used `.aggregate()` with `Count` and `Q` objects to calculate all conditional statistics in a single database query.
