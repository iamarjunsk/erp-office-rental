## 2025-02-18 - [Django ORM] Optimize Multiple Counts
**Learning:** Multiple `count()` queries on the same queryset (e.g., stats endpoints) can be consolidated into a single query using `aggregate` with `Count` and `Q` objects for conditional counting.
**Action:** Always check stats/dashboard endpoints for multiple counts and refactor to use conditional aggregation.
