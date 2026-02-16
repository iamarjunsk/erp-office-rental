## 2024-05-22 - Nested Prefetch N+1

**Learning:** Django's `prefetch_related` alone doesn't optimize nested foreign keys accessed in serializers (e.g. `task.assigned_to` inside `tasks` list). This causes N+1 queries for each item in the prefetched list.

**Action:** Use `Prefetch` object with `queryset=Model.objects.select_related(...)` to force a join in the prefetch query.
