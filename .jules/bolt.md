## 2024-05-23 - Django Aggregation for Multiple Counts
**Learning:** Sequential `filter().count()` calls for statistics endpoints are extremely inefficient, causing N queries. Django's `aggregate` with `Count(filter=Q(...))` allows fetching all counts in a single database query.
**Action:** Always refactor multiple count queries into a single `aggregate` call using conditional expressions.
