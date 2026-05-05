## 2025-05-05 - Combine Multiple ORM count() calls into single aggregate()
**Learning:** Performing multiple conditional `.count()` calls on a queryset inside ViewSet `stats` actions results in multiple separate database queries (N+1 query problem).
**Action:** Use `.aggregate()` with conditional `Count('id', filter=Q(status='...'))` to compute all conditional counts and sums in a single database query, drastically reducing query load.
