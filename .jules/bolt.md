## 2026-02-23 - [Nested Serializer N+1]
**Learning:** `prefetch_related` alone is insufficient when nested serializers access related fields (like `assigned_to` on a task). Each serialized object triggers a new query for that field.
**Action:** Use `Prefetch` object with `queryset=Model.objects.select_related('field')` inside `prefetch_related` to eager load nested relationships in a single query per relationship level.
