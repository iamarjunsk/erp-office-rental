import { _ as __nuxt_component_0 } from './nuxt-link-CrgyHNyr.mjs';
import { u as useAuth, c as useToast, a as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, ref, computed, mergeProps, withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useFetch } from './fetch-DzFior15.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import 'radix-vue';
import '@vue/shared';
import 'perfect-debounce';

const API_BASE = "http://localhost:8000/api/procurement";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { authHeaders } = useAuth();
    useToast();
    const { data: vendorsData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/vendors/`,
      {
        headers: authHeaders()
      },
      "$GXKg-ROV0_"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: statsData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/vendors/stats/`,
      {
        headers: authHeaders()
      },
      "$gzx9JEqoYU"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const search = ref("");
    const categoryFilter = ref("");
    const typeFilter = ref("");
    const selectedVendor = ref(null);
    const showAddModal = ref(false);
    const saving = ref(false);
    const vendors = computed(() => {
      var _a;
      return ((_a = vendorsData.value) == null ? void 0 : _a.results) || vendorsData.value || [];
    });
    const stats = computed(() => statsData.value || {
      total: 0,
      active: 0,
      inactive: 0,
      suppliers: 0,
      serviceProviders: 0
    });
    const filteredVendors = computed(() => {
      return vendors.value.filter((v) => {
        var _a, _b;
        const matchesSearch = !search.value || ((_a = v.name) == null ? void 0 : _a.toLowerCase().includes(search.value.toLowerCase())) || ((_b = v.code) == null ? void 0 : _b.toLowerCase().includes(search.value.toLowerCase()));
        const matchesCategory = !categoryFilter.value || v.category === categoryFilter.value;
        const matchesType = !typeFilter.value || v.vendor_type === typeFilter.value;
        return matchesSearch && matchesCategory && matchesType;
      });
    });
    const vendorForm = ref({
      name: "",
      code: "",
      vendor_type: "supplier",
      category: "",
      contact_name: "",
      contact_email: "",
      contact_phone: "",
      contact_designation: "",
      address_street: "",
      address_city: "",
      address_state: "",
      address_pincode: "",
      address_country: "India",
      gst_number: "",
      pan_number: "",
      status: "active"
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/procurement",
        class: "p-2 hover:bg-muted rounded-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-left",
              class: "w-5 h-5"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:arrow-left",
                class: "w-5 h-5"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div><h1 class="text-3xl font-bold">Vendor Directory</h1><p class="text-muted-foreground">Manage supplier relationships</p></div></div><button class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:plus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Add Vendor </button></div><div class="flex flex-wrap gap-4"><div class="flex-1 min-w-[250px]"><input${ssrRenderAttr("value", unref(search))} type="text" placeholder="Search vendors..." class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><select class="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(categoryFilter)) ? ssrLooseContain(unref(categoryFilter), "") : ssrLooseEqual(unref(categoryFilter), "")) ? " selected" : ""}>All Categories</option><option value="cleaning_supplies"${ssrIncludeBooleanAttr(Array.isArray(unref(categoryFilter)) ? ssrLooseContain(unref(categoryFilter), "cleaning_supplies") : ssrLooseEqual(unref(categoryFilter), "cleaning_supplies")) ? " selected" : ""}>Cleaning Supplies</option><option value="it_hardware"${ssrIncludeBooleanAttr(Array.isArray(unref(categoryFilter)) ? ssrLooseContain(unref(categoryFilter), "it_hardware") : ssrLooseEqual(unref(categoryFilter), "it_hardware")) ? " selected" : ""}>IT Hardware</option><option value="furniture"${ssrIncludeBooleanAttr(Array.isArray(unref(categoryFilter)) ? ssrLooseContain(unref(categoryFilter), "furniture") : ssrLooseEqual(unref(categoryFilter), "furniture")) ? " selected" : ""}>Furniture</option><option value="office_supplies"${ssrIncludeBooleanAttr(Array.isArray(unref(categoryFilter)) ? ssrLooseContain(unref(categoryFilter), "office_supplies") : ssrLooseEqual(unref(categoryFilter), "office_supplies")) ? " selected" : ""}>Office Supplies</option><option value="security"${ssrIncludeBooleanAttr(Array.isArray(unref(categoryFilter)) ? ssrLooseContain(unref(categoryFilter), "security") : ssrLooseEqual(unref(categoryFilter), "security")) ? " selected" : ""}>Security</option></select><select class="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(typeFilter)) ? ssrLooseContain(unref(typeFilter), "") : ssrLooseEqual(unref(typeFilter), "")) ? " selected" : ""}>All Types</option><option value="supplier"${ssrIncludeBooleanAttr(Array.isArray(unref(typeFilter)) ? ssrLooseContain(unref(typeFilter), "supplier") : ssrLooseEqual(unref(typeFilter), "supplier")) ? " selected" : ""}>Suppliers</option><option value="service_provider"${ssrIncludeBooleanAttr(Array.isArray(unref(typeFilter)) ? ssrLooseContain(unref(typeFilter), "service_provider") : ssrLooseEqual(unref(typeFilter), "service_provider")) ? " selected" : ""}>Service Providers</option></select></div><div class="grid md:grid-cols-4 gap-4"><div class="bg-card border border-border rounded-xl p-4"><div class="text-2xl font-bold">${ssrInterpolate(unref(stats).total)}</div><div class="text-sm text-muted-foreground">Total Vendors</div></div><div class="bg-card border border-border rounded-xl p-4"><div class="text-2xl font-bold text-green-600">${ssrInterpolate(unref(stats).active)}</div><div class="text-sm text-muted-foreground">Active</div></div><div class="bg-card border border-border rounded-xl p-4"><div class="text-2xl font-bold">${ssrInterpolate(unref(stats).suppliers)}</div><div class="text-sm text-muted-foreground">Suppliers</div></div><div class="bg-card border border-border rounded-xl p-4"><div class="text-2xl font-bold">${ssrInterpolate(unref(stats).serviceProviders || unref(stats).service_providers)}</div><div class="text-sm text-muted-foreground">Service Providers</div></div></div><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      ssrRenderList(unref(filteredVendors), (vendor) => {
        var _a2, _b2, _c2, _d2;
        _push(`<div class="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"><div class="flex items-start justify-between mb-4"><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: vendor.vendor_type === "service_provider" ? "lucide:briefcase" : "lucide:building-2",
          class: "w-6 h-6 text-primary"
        }, null, _parent));
        _push(`</div><div><div class="font-semibold">${ssrInterpolate(vendor.name)}</div><div class="text-xs text-muted-foreground">${ssrInterpolate(vendor.code)}</div></div></div><span class="${ssrRenderClass([vendor.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700", "px-2 py-0.5 text-xs rounded-full font-medium capitalize"])}">${ssrInterpolate(vendor.status)}</span></div><div class="space-y-2 text-sm mb-4"><div class="flex items-center gap-2 text-muted-foreground">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:tag",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span class="capitalize">${ssrInterpolate((_a2 = vendor.category) == null ? void 0 : _a2.replace("_", " "))}</span></div><div class="flex items-center gap-2 text-muted-foreground">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:map-pin",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span>${ssrInterpolate((_b2 = vendor.address) == null ? void 0 : _b2.city)}, ${ssrInterpolate((_c2 = vendor.address) == null ? void 0 : _c2.state)}</span></div><div class="flex items-center gap-2 text-muted-foreground">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:user",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span>${ssrInterpolate((_d2 = vendor.contact) == null ? void 0 : _d2.name)}</span></div></div><div class="flex items-center justify-between pt-4 border-t border-border"><div class="flex items-center gap-1">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:star",
          class: "w-4 h-4 text-amber-500"
        }, null, _parent));
        _push(`<span class="font-medium">${ssrInterpolate(vendor.rating)}</span></div><div class="text-sm text-muted-foreground">${ssrInterpolate(vendor.total_orders)} orders \u2022 \u20B9${ssrInterpolate((vendor.total_value / 1e5).toFixed(1))}L </div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(selectedVendor)) {
        _push(`<div class="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20 pb-4 overflow-y-auto"><div class="bg-card rounded-xl w-full max-w-2xl m-4 shadow-2xl"><div class="p-6 border-b border-border flex items-start justify-between"><div class="flex items-center gap-4"><div class="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: unref(selectedVendor).vendor_type === "service_provider" ? "lucide:briefcase" : "lucide:building-2",
          class: "w-7 h-7 text-primary"
        }, null, _parent));
        _push(`</div><div><div class="text-xl font-bold">${ssrInterpolate(unref(selectedVendor).name)}</div><div class="text-sm text-muted-foreground">${ssrInterpolate(unref(selectedVendor).code)} \u2022 ${ssrInterpolate(unref(selectedVendor).vendor_type === "service_provider" ? "Service Provider" : "Supplier")}</div></div></div><button class="p-2 hover:bg-muted rounded-full">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:x",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div><div class="p-6 space-y-6"><div><h4 class="font-semibold mb-3">Contact Information</h4><div class="grid md:grid-cols-2 gap-4 text-sm"><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:user",
          class: "w-4 h-4 text-muted-foreground"
        }, null, _parent));
        _push(`<span>${ssrInterpolate((_a = unref(selectedVendor).contact) == null ? void 0 : _a.name)} (${ssrInterpolate((_b = unref(selectedVendor).contact) == null ? void 0 : _b.designation)})</span></div><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:mail",
          class: "w-4 h-4 text-muted-foreground"
        }, null, _parent));
        _push(`<a${ssrRenderAttr("href", `mailto:${(_c = unref(selectedVendor).contact) == null ? void 0 : _c.email}`)} class="text-primary hover:underline">${ssrInterpolate((_d = unref(selectedVendor).contact) == null ? void 0 : _d.email)}</a></div><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:phone",
          class: "w-4 h-4 text-muted-foreground"
        }, null, _parent));
        _push(`<span>${ssrInterpolate((_e = unref(selectedVendor).contact) == null ? void 0 : _e.phone)}</span></div></div></div><div><h4 class="font-semibold mb-3">Address</h4><div class="text-sm text-muted-foreground">${ssrInterpolate((_f = unref(selectedVendor).address) == null ? void 0 : _f.street)}<br> ${ssrInterpolate((_g = unref(selectedVendor).address) == null ? void 0 : _g.city)}, ${ssrInterpolate((_h = unref(selectedVendor).address) == null ? void 0 : _h.state)} ${ssrInterpolate((_i = unref(selectedVendor).address) == null ? void 0 : _i.pincode)}<br> ${ssrInterpolate((_j = unref(selectedVendor).address) == null ? void 0 : _j.country)}</div></div><div><h4 class="font-semibold mb-3">Tax Information</h4><div class="grid md:grid-cols-2 gap-4 text-sm"><div><div class="text-muted-foreground">GST Number</div><div class="font-mono">${ssrInterpolate(unref(selectedVendor).gst_number)}</div></div><div><div class="text-muted-foreground">PAN Number</div><div class="font-mono">${ssrInterpolate(unref(selectedVendor).pan_number)}</div></div></div></div><div><h4 class="font-semibold mb-3">Performance</h4><div class="grid grid-cols-3 gap-4"><div class="bg-muted/50 p-4 rounded-lg text-center"><div class="flex items-center justify-center gap-1 mb-1">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:star",
          class: "w-5 h-5 text-amber-500"
        }, null, _parent));
        _push(`<span class="text-2xl font-bold">${ssrInterpolate(unref(selectedVendor).rating)}</span></div><div class="text-xs text-muted-foreground">Rating</div></div><div class="bg-muted/50 p-4 rounded-lg text-center"><div class="text-2xl font-bold">${ssrInterpolate(unref(selectedVendor).total_orders)}</div><div class="text-xs text-muted-foreground">Total Orders</div></div><div class="bg-muted/50 p-4 rounded-lg text-center"><div class="text-2xl font-bold">\u20B9${ssrInterpolate((unref(selectedVendor).total_value / 1e5).toFixed(1))}L</div><div class="text-xs text-muted-foreground">Total Value</div></div></div></div></div><div class="p-6 border-t border-border flex justify-end gap-3 bg-card"><button class="px-4 py-2 border border-border rounded-lg hover:bg-muted"> Edit Vendor </button><button class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"> Create PO </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showAddModal)) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"><div class="bg-card rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4"><div class="p-6 border-b border-border flex items-center justify-between"><h3 class="text-lg font-semibold">Add New Vendor</h3><button class="p-2 hover:bg-muted rounded-full">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:x",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div><form class="p-6 space-y-6"><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Vendor Name *</label><input${ssrRenderAttr("value", unref(vendorForm).name)} type="text" required class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Vendor Code *</label><input${ssrRenderAttr("value", unref(vendorForm).code)} type="text" required placeholder="e.g., VND-006" class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Type *</label><select required class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"><option value="supplier"${ssrIncludeBooleanAttr(Array.isArray(unref(vendorForm).vendor_type) ? ssrLooseContain(unref(vendorForm).vendor_type, "supplier") : ssrLooseEqual(unref(vendorForm).vendor_type, "supplier")) ? " selected" : ""}>Supplier</option><option value="service_provider"${ssrIncludeBooleanAttr(Array.isArray(unref(vendorForm).vendor_type) ? ssrLooseContain(unref(vendorForm).vendor_type, "service_provider") : ssrLooseEqual(unref(vendorForm).vendor_type, "service_provider")) ? " selected" : ""}>Service Provider</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Category *</label><select required class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"><option value="cleaning_supplies"${ssrIncludeBooleanAttr(Array.isArray(unref(vendorForm).category) ? ssrLooseContain(unref(vendorForm).category, "cleaning_supplies") : ssrLooseEqual(unref(vendorForm).category, "cleaning_supplies")) ? " selected" : ""}>Cleaning Supplies</option><option value="it_hardware"${ssrIncludeBooleanAttr(Array.isArray(unref(vendorForm).category) ? ssrLooseContain(unref(vendorForm).category, "it_hardware") : ssrLooseEqual(unref(vendorForm).category, "it_hardware")) ? " selected" : ""}>IT Hardware</option><option value="furniture"${ssrIncludeBooleanAttr(Array.isArray(unref(vendorForm).category) ? ssrLooseContain(unref(vendorForm).category, "furniture") : ssrLooseEqual(unref(vendorForm).category, "furniture")) ? " selected" : ""}>Furniture</option><option value="office_supplies"${ssrIncludeBooleanAttr(Array.isArray(unref(vendorForm).category) ? ssrLooseContain(unref(vendorForm).category, "office_supplies") : ssrLooseEqual(unref(vendorForm).category, "office_supplies")) ? " selected" : ""}>Office Supplies</option><option value="security"${ssrIncludeBooleanAttr(Array.isArray(unref(vendorForm).category) ? ssrLooseContain(unref(vendorForm).category, "security") : ssrLooseEqual(unref(vendorForm).category, "security")) ? " selected" : ""}>Security</option><option value="maintenance"${ssrIncludeBooleanAttr(Array.isArray(unref(vendorForm).category) ? ssrLooseContain(unref(vendorForm).category, "maintenance") : ssrLooseEqual(unref(vendorForm).category, "maintenance")) ? " selected" : ""}>Maintenance</option><option value="other"${ssrIncludeBooleanAttr(Array.isArray(unref(vendorForm).category) ? ssrLooseContain(unref(vendorForm).category, "other") : ssrLooseEqual(unref(vendorForm).category, "other")) ? " selected" : ""}>Other</option></select></div></div><div class="space-y-4"><h4 class="font-medium">Contact Information</h4><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Contact Name *</label><input${ssrRenderAttr("value", unref(vendorForm).contact_name)} type="text" required class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Contact Email *</label><input${ssrRenderAttr("value", unref(vendorForm).contact_email)} type="email" required class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Contact Phone *</label><input${ssrRenderAttr("value", unref(vendorForm).contact_phone)} type="tel" required class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Designation</label><input${ssrRenderAttr("value", unref(vendorForm).contact_designation)} type="text" class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div></div><div class="space-y-4"><h4 class="font-medium">Address</h4><div class="space-y-2"><label class="text-sm font-medium">Street</label><input${ssrRenderAttr("value", unref(vendorForm).address_street)} type="text" class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="grid md:grid-cols-3 gap-4"><div class="space-y-2"><label class="text-sm font-medium">City</label><input${ssrRenderAttr("value", unref(vendorForm).address_city)} type="text" class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">State</label><input${ssrRenderAttr("value", unref(vendorForm).address_state)} type="text" class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Pincode</label><input${ssrRenderAttr("value", unref(vendorForm).address_pincode)} type="text" class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div></div><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">GST Number</label><input${ssrRenderAttr("value", unref(vendorForm).gst_number)} type="text" class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">PAN Number</label><input${ssrRenderAttr("value", unref(vendorForm).pan_number)} type="text" class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div></form><div class="p-6 border-t border-border flex justify-end gap-3"><button class="px-4 py-2 border border-border rounded-lg hover:bg-muted"> Cancel </button><button${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(unref(saving) ? "Creating..." : "Create Vendor")}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/procurement/vendors/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BVhzqelI.mjs.map
