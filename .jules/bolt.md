## 2024-05-01 - Optimizing Django aggregate queries
**Learning:** Found multiple instances where the application was running 6-8 separate `.count()` queries to gather dashboard statistics in viewsets (`MaintenanceRequestViewSet`, `AssetViewSet`, `PurchaseRequisitionViewSet`, etc). This hits the database repeatedly for the same table.
**Action:** Replace multiple `.count()` and `.aggregate()` calls on a model with a single `.aggregate()` call using conditional `Count()` with `Q()` objects to combine all statistics gathering into a single SQL query.
