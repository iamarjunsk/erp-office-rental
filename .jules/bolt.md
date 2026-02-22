## 2024-05-22 - DRF Nested N+1 Performance
**Learning:** When using nested serializers (e.g., embedding tasks in a request), `prefetch_related` on the parent relationship only fetches the immediate children. It does not automatically `select_related` foreign keys on those children (e.g., `assigned_to` on a task), leading to N+1 queries.
**Action:** Use `Prefetch('relationship', queryset=Model.objects.select_related('nested_fk'))` inside `prefetch_related` to optimize nested relationships.
