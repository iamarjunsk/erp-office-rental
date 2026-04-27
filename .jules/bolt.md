## 2026-04-27 - Combined 7 count queries into a single database aggregate query
**Learning:** When calculating multiple statistics on a model, avoid chained `.count()` queries. Instead, use a single `.aggregate()` query with `Count` and `Q` objects. This reduces database roundtrips and optimizes performance significantly.
**Action:** Next time, look for multiple  queries in views and consolidate them into a single `.aggregate()` call using `Count` and `Q`.
## 2024-05-14 - Combined count queries in stats method
**Learning:** Found an N+1 style bottleneck where a view method executed 7 separate `.count()` queries sequentially against the database to generate simple aggregated stats.
**Action:** Replaced sequential counts with a single `.aggregate()` call using `Count` and `Q` objects. This combined the execution into one query and completely removed the 6 extra database roundtrips.
