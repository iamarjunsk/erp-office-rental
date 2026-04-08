
## 2024-03-28 - Optimize Django ViewSet Stats Queries
**Learning:** Multiple `.count()` calls in a DRF action sequentially block I/O and result in N separate queries to the database. Using `.aggregate()` with `Count` and `Q` allows us to combine them into a single roundtrip, even with complex conditional filtering logic.
**Action:** When computing summary metrics on a single model with varying conditional filters, always refactor multiple `Model.objects.filter(...).count()` statements into a single `Model.objects.aggregate(my_count=Count('pk', filter=Q(...)))`.
