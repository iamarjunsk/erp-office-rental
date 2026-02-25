## 2026-02-25 - [N+1 in Nested Prefetch]
**Learning:** `prefetch_related('related_field')` only fetches the related objects. If the serializer for those objects accesses their own foreign keys (e.g., `assigned_to` on a `Task`), it triggers N+1 queries.
**Action:** Use `Prefetch('related_field', queryset=RelatedModel.objects.select_related('nested_fk'))` to eagerly load nested relationships in a single additional query.
