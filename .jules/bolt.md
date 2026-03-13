## 2024-05-19 - Fix N+1 Query in Purchase Requisition View
**Learning:** Adding a `SerializerMethodField` to a DRF serializer (`converted_to_po`) that accesses related model data without pre-fetching causes an N+1 query issue in the `ViewSet` list response.
**Action:** When adding foreign key relationships accessed by `SerializerMethodField` in a serializer, always remember to add the relation to `select_related` in the ViewSet `queryset` (e.g. `PurchaseRequisitionViewSet`). Validated using `CaptureQueriesContext` in tests.
