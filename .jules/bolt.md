## 2025-02-05 - Implicit Pagination and Query Counts
**Learning:** `BookingViewSet` (and likely other viewsets) in this project does not have pagination enabled by default, resulting in a single query for list views. This makes `assertNumQueries(1)` a valid expectation when `select_related` is used correctly.
**Action:** When optimizing list views, check if pagination is enabled. If not, expect 1 query. If enabled, expect 2 (count + list). Always verify with `assertNumQueries` before assuming.
