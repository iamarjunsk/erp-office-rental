## 2024-05-22 - Nested Serializers N+1 Optimization
**Learning:** `prefetch_related('tasks')` fetches tasks but not their related fields (like `assigned_to`). When the serializer accesses `assigned_to`, it triggers N+1 queries even if tasks are prefetched.
**Action:** Use `Prefetch` object with `queryset=Model.objects.select_related(...)` to optimize nested relationships in `prefetch_related`.
