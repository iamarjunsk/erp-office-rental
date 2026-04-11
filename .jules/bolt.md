## 2025-02-12 - Optimizing Django ORM aggregations
**Learning:** Multiple sums or conditional counts on the same model should be combined into a single `.aggregate()` call using `Count('pk', filter=Q(...))` to reduce database roundtrips and improve performance from N queries to 1.
**Action:** Always refactor sequential `Model.objects.filter(...).count()` or `.aggregate()` calls into a single `aggregate()` statement using multiple fields.
