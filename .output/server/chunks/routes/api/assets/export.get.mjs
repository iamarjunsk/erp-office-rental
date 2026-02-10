import { d as defineEventHandler, a as getQuery, b as getHeader, c as createError, s as setResponseHeader } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const export_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const format = query.export_format || "csv";
  const authToken = getHeader(event, "authorization");
  try {
    const backendUrl = process.env.API_URL || "http://localhost:8000/api";
    const params = new URLSearchParams();
    if (query.search) params.append("search", String(query.search));
    if (query.status) params.append("status", String(query.status));
    if (query.category) params.append("category", String(query.category));
    if (query.condition) params.append("condition", String(query.condition));
    params.append("limit", "100");
    const response = await fetch(`${backendUrl}/assets/assets/?${params.toString()}`, {
      headers: {
        "Authorization": authToken || "",
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }
    const assets = await response.json();
    if (format === "csv") {
      return generateCSV(assets, event);
    } else {
      return generateCSV(assets, event);
    }
  } catch (error) {
    console.error("Export error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to export assets",
      data: { detail: error.message }
    });
  }
});
function generateCSV(assets, event) {
  const headers = ["Asset Code", "Name", "Category", "Status", "Condition", "Property", "Space", "Purchase Price", "Purchase Date", "Assigned To"];
  const rows = assets.map((asset) => {
    var _a, _b, _c;
    return [
      asset.asset_code || "",
      asset.name || "",
      ((_a = asset.category_details) == null ? void 0 : _a.name) || "",
      asset.status || "",
      asset.condition || "",
      ((_b = asset.property_details) == null ? void 0 : _b.name) || "",
      ((_c = asset.space_details) == null ? void 0 : _c.code) || "",
      asset.purchase_price || 0,
      asset.purchase_date || "",
      asset.assigned_to_details ? `${asset.assigned_to_details.first_name} ${asset.assigned_to_details.last_name}` : ""
    ];
  });
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
  ].join("\n");
  setResponseHeader(event, "Content-Type", "text/csv");
  setResponseHeader(event, "Content-Disposition", `attachment; filename="assets_export_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv"`);
  return csvContent;
}

export { export_get as default };
//# sourceMappingURL=export.get.mjs.map
