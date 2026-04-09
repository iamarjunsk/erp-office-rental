## 2024-05-19 - ⚡ Bolt: Optimize API stats endpoint with aggregate Q
**Learning:** Using Django ORM's `aggregate` combined with `Count('id', filter=Q(...))` is a powerful pattern to condense multiple `.count()` queries and a `.aggregate(total=Sum(...))` query into a single database query.
**Action:** Always look out for dictionary constructions hitting the database multiple times in views like `stats`. Convert them to a single `aggregate` call.
