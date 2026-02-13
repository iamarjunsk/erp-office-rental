## 2026-02-13 - Missing Global Pagination
**Learning:** The Django REST Framework setup lacks a global `DEFAULT_PAGINATION_CLASS`, causing endpoints like `PropertyViewSet` to return all records by default. This is a critical scalability issue.
**Action:** Always check `REST_FRAMEWORK` settings in `settings.py` for pagination configuration before optimizing individual views. Consider proposing a global pagination strategy.
