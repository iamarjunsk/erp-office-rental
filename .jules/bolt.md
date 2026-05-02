## 2024-05-24 - Initial Bolt Journal Setup
**Learning:** Initialized Bolt journal.
**Action:** Ready to track performance critical learnings.
## 2024-05-24 - Asset Stats Database Queries Optimization
**Learning:** Discovered that multiple `.count()` queries and an `.aggregate()` on the same model in a Django view result in numerous separate database calls (8 queries in `AssetViewSet.stats()`). Combining them into a single `.aggregate()` with conditional logic (`Count` and `Sum` with `filter=Q()`) executes in just 1 query.
**Action:** For dashboard stats and analytics endpoints, use conditional aggregation instead of individual count queries to minimize database roundtrips.
