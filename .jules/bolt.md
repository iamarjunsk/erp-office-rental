## 2025-02-05 - Hidden N+1 in DRF Serializers
**Learning:** DRF `ModelSerializer` fields using `source='foreign_key_field'` (like `space_details = BookingSpaceSerializer(source='space')`) implicitly access the related object, triggering an immediate database query for each row if `select_related` is missing. This is often less visible than explicit loop queries.
**Action:** When auditing DRF ViewSets, strictly map every `source='field'` in the serializer to a corresponding `select_related('field')` in the queryset.
