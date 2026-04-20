## 2024-04-20 - Maintenance Stats Optimization
**Learning:** Found an N+1 style bottleneck where 7 independent `.count()` calls were being executed to calculate stats for `MaintenanceRequestViewSet.stats()`. Each count executes a separate SQL query against the database.
**Action:** Instead of chaining `.count()`, always combine multiple aggregate/count operations into a single `.aggregate(Count('pk', filter=Q(...)))` call. This performs conditional counting entirely on the database side and reduces round-trips from N down to 1.
