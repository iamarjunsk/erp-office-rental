## 2024-05-23 - Django Stats Optimization
**Learning:** Multiple `count()` queries in Django stats endpoints can be significantly optimized using a single `aggregate()` query with conditional `Count(filter=Q(...))` objects.
**Action:** When implementing stats endpoints with multiple conditions, use `aggregate` to perform a single database query instead of iterating and counting.
