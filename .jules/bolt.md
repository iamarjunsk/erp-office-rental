## 2024-05-01 - Maintenance Request Stats Optimization
**Learning:** Multiple `.count()` calls on the same model can be very inefficient, causing N queries.
**Action:** Next time, use a single `.aggregate()` with conditional `Count` and `Q` filters to do it all in one query.
