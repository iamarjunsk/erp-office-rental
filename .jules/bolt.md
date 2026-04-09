## 2026-03-12 - Consolidated Multiple count() Queries using Django Aggregate
**Learning:** In Django ViewSets, executing multiple `.count()` queries sequentially (e.g., to fetch summary statistics) results in N+1 style performance issues (N database hits).
**Action:** Always combine them into a single query using `.aggregate()` paired with `Count('id', filter=Q(...))` to calculate both totals and conditional counts in one database roundtrip. This drastically reduces database load.
