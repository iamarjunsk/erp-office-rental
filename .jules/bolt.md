
## 2024-03-21 - Fix N+1 Query in PurchaseRequisition List
**Learning:** The `converted_to_po` SerializerMethodField in `PurchaseRequisitionListSerializer` was triggering an N+1 query because it accessed the related `converted_to_po` object which was not included in the `select_related` list of `PurchaseRequisitionViewSet.queryset`.
**Action:** Always verify if all related fields accessed by `SerializerMethodField` are pre-fetched via `select_related` or `prefetch_related` on the ViewSet `queryset` attribute.
