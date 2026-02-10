import { u as useAuth, c as useToast, a as __nuxt_component_0 } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-CrgyHNyr.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { onClickOutside } from '@vueuse/core';
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

const API_BASE = "http://localhost:8000/api/assets";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const debounce = (fn, delay) => {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
      };
    };
    const { authHeaders } = useAuth();
    useToast();
    const searchQuery = ref("");
    const statusFilter = ref("");
    const categoryFilter = ref("");
    const conditionFilter = ref("");
    const showExportMenu = ref(false);
    ref(false);
    const { data: statsData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/assets/stats/`,
      {
        headers: authHeaders()
      },
      "$Er1o5SgaNZ"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const stats = computed(() => statsData.value || {
      total: 0,
      active: 0,
      inMaintenance: 0,
      disposed: 0,
      totalValue: 0,
      underWarranty: 0,
      warrantyExpired: 0,
      maintenanceDue: 0
    });
    const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/categories/`,
      {
        headers: authHeaders()
      },
      "$k7__GuwLxP"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      () => {
        const params = new URLSearchParams();
        if (searchQuery.value) params.append("search", searchQuery.value);
        if (statusFilter.value) params.append("status", statusFilter.value);
        if (categoryFilter.value) params.append("category", categoryFilter.value);
        if (conditionFilter.value) params.append("condition", conditionFilter.value);
        return `${API_BASE}/assets/?${params.toString()}`;
      },
      {
        headers: authHeaders(),
        watch: [statusFilter, categoryFilter, conditionFilter]
      },
      "$vLuu7gTdcM"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const assets = computed(() => data.value || []);
    watch(searchQuery, debounce(() => {
      refresh();
    }, 500));
    const formatCurrency = (value) => {
      if (!value) return "N/A";
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(value);
    };
    const formatDate = (date) => {
      if (!date) return "N/A";
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    };
    const getStatusClass = (status) => {
      const classes = {
        active: "bg-green-100 text-green-700",
        in_maintenance: "bg-amber-100 text-amber-700",
        damaged: "bg-red-100 text-red-700",
        disposed: "bg-gray-100 text-gray-700",
        lost: "bg-red-100 text-red-700"
      };
      return classes[status] || "bg-gray-100 text-gray-700";
    };
    const closeExportMenu = () => {
      showExportMenu.value = false;
    };
    onClickOutside(ref(null), closeExportMenu);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold">Asset Register</h1><p class="text-muted-foreground">Track and manage all facility assets</p></div><div class="flex gap-2"><div class="relative"><button class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-all duration-200 hover:scale-105 group">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:download",
        class: "w-4 h-4 transition-transform group-hover:-translate-y-0.5"
      }, null, _parent));
      _push(`<span class="group-hover:font-medium">Export</span>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:chevron-down",
        class: "w-4 h-4 ml-1"
      }, null, _parent));
      _push(`</button>`);
      if (unref(showExportMenu)) {
        _push(`<div class="absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-lg py-1 z-10"><button class="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:file-text",
          class: "w-4 h-4"
        }, null, _parent));
        _push(` Export CSV </button><button class="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:file-spreadsheet",
          class: "w-4 h-4"
        }, null, _parent));
        _push(` Export Excel </button><button class="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:file",
          class: "w-4 h-4"
        }, null, _parent));
        _push(` Export PDF </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/assets/create",
        class: "flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 hover:shadow-md group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:plus",
              class: "w-4 h-4 transition-transform group-hover:scale-110"
            }, null, _parent2, _scopeId));
            _push2(`<span class="group-hover:font-medium"${_scopeId}>Add Asset</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:plus",
                class: "w-4 h-4 transition-transform group-hover:scale-110"
              }),
              createVNode("span", { class: "group-hover:font-medium" }, "Add Asset")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid grid-cols-2 md:grid-cols-4 gap-4"><div class="bg-card border border-border rounded-xl p-4"><div class="text-2xl font-bold">${ssrInterpolate(unref(stats).total)}</div><div class="text-sm text-muted-foreground">Total Assets</div></div><div class="bg-card border border-border rounded-xl p-4"><div class="text-2xl font-bold text-green-600">${ssrInterpolate(unref(stats).active)}</div><div class="text-sm text-muted-foreground">Active</div></div><div class="bg-card border border-border rounded-xl p-4"><div class="text-2xl font-bold text-amber-600">${ssrInterpolate(unref(stats).inMaintenance)}</div><div class="text-sm text-muted-foreground">In Maintenance</div></div><div class="bg-card border border-border rounded-xl p-4"><div class="text-2xl font-bold">${ssrInterpolate(formatCurrency(unref(stats).totalValue))}</div><div class="text-sm text-muted-foreground">Total Value</div></div></div><div class="flex flex-wrap gap-4"><div class="flex-1 min-w-[250px] relative">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:search",
        class: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Search by asset code, name, or serial..." class="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><select class="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "") : ssrLooseEqual(unref(statusFilter), "")) ? " selected" : ""}>All Status</option><option value="active"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "active") : ssrLooseEqual(unref(statusFilter), "active")) ? " selected" : ""}>Active</option><option value="in_maintenance"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "in_maintenance") : ssrLooseEqual(unref(statusFilter), "in_maintenance")) ? " selected" : ""}>In Maintenance</option><option value="damaged"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "damaged") : ssrLooseEqual(unref(statusFilter), "damaged")) ? " selected" : ""}>Damaged</option><option value="disposed"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "disposed") : ssrLooseEqual(unref(statusFilter), "disposed")) ? " selected" : ""}>Disposed</option><option value="lost"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "lost") : ssrLooseEqual(unref(statusFilter), "lost")) ? " selected" : ""}>Lost</option></select><select class="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(categoryFilter)) ? ssrLooseContain(unref(categoryFilter), "") : ssrLooseEqual(unref(categoryFilter), "")) ? " selected" : ""}>All Categories</option><!--[-->`);
      ssrRenderList(unref(categories), (cat) => {
        _push(`<option${ssrRenderAttr("value", cat.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(categoryFilter)) ? ssrLooseContain(unref(categoryFilter), cat.id) : ssrLooseEqual(unref(categoryFilter), cat.id)) ? " selected" : ""}>${ssrInterpolate(cat.name)}</option>`);
      });
      _push(`<!--]--></select><select class="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(conditionFilter)) ? ssrLooseContain(unref(conditionFilter), "") : ssrLooseEqual(unref(conditionFilter), "")) ? " selected" : ""}>All Conditions</option><option value="excellent"${ssrIncludeBooleanAttr(Array.isArray(unref(conditionFilter)) ? ssrLooseContain(unref(conditionFilter), "excellent") : ssrLooseEqual(unref(conditionFilter), "excellent")) ? " selected" : ""}>Excellent</option><option value="good"${ssrIncludeBooleanAttr(Array.isArray(unref(conditionFilter)) ? ssrLooseContain(unref(conditionFilter), "good") : ssrLooseEqual(unref(conditionFilter), "good")) ? " selected" : ""}>Good</option><option value="fair"${ssrIncludeBooleanAttr(Array.isArray(unref(conditionFilter)) ? ssrLooseContain(unref(conditionFilter), "fair") : ssrLooseEqual(unref(conditionFilter), "fair")) ? " selected" : ""}>Fair</option><option value="poor"${ssrIncludeBooleanAttr(Array.isArray(unref(conditionFilter)) ? ssrLooseContain(unref(conditionFilter), "poor") : ssrLooseEqual(unref(conditionFilter), "poor")) ? " selected" : ""}>Poor</option></select></div><div class="bg-card border border-border rounded-xl overflow-hidden"><table class="w-full"><thead class="bg-muted/50"><tr><th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Asset</th><th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th><th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Location</th><th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Assigned To</th><th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Value</th><th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th><th class="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th></tr></thead><tbody class="divide-y divide-border"><!--[-->`);
      ssrRenderList(unref(assets), (asset) => {
        var _a, _b, _c, _d, _e;
        _push(`<tr class="hover:bg-muted/30 transition-colors"><td class="px-4 py-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:package",
          class: "w-5 h-5 text-primary"
        }, null, _parent));
        _push(`</div><div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/admin/assets/${asset.id}`,
          class: "font-medium text-primary hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(asset.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(asset.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="text-xs text-muted-foreground">${ssrInterpolate(asset.asset_code)}</div></div></div></td><td class="px-4 py-4"><div class="text-sm">${ssrInterpolate(((_a = asset.category_details) == null ? void 0 : _a.name) || "Uncategorized")}</div></td><td class="px-4 py-4"><div class="text-sm">${ssrInterpolate((_b = asset.property_details) == null ? void 0 : _b.name)}</div><div class="text-xs text-muted-foreground">${ssrInterpolate((_c = asset.space_details) == null ? void 0 : _c.code)}</div></td><td class="px-4 py-4">`);
        if (asset.assigned_to_details) {
          _push(`<div class="flex items-center gap-2"><div class="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">${ssrInterpolate((_d = asset.assigned_to_details.first_name) == null ? void 0 : _d[0])}${ssrInterpolate((_e = asset.assigned_to_details.last_name) == null ? void 0 : _e[0])}</div><div><div class="text-sm">${ssrInterpolate(asset.assigned_to_details.first_name)} ${ssrInterpolate(asset.assigned_to_details.last_name)}</div></div></div>`);
        } else {
          _push(`<span class="text-sm text-muted-foreground">Unassigned</span>`);
        }
        _push(`</td><td class="px-4 py-4"><div class="text-sm font-medium">${ssrInterpolate(formatCurrency(asset.purchase_price))}</div>`);
        if (asset.purchase_date) {
          _push(`<div class="text-xs text-muted-foreground">${ssrInterpolate(formatDate(asset.purchase_date))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</td><td class="px-4 py-4"><span class="${ssrRenderClass([getStatusClass(asset.status), "px-2 py-1 text-xs rounded-full font-medium capitalize"])}">${ssrInterpolate(asset.status.replace("_", " "))}</span></td><td class="px-4 py-4 text-right"><div class="flex items-center justify-end gap-1">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/admin/assets/${asset.id}`,
          class: "p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-all duration-200 hover:scale-110 group",
          title: "View Details"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:eye",
                class: "w-4 h-4 transition-transform group-hover:scale-110"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "lucide:eye",
                  class: "w-4 h-4 transition-transform group-hover:scale-110"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/admin/assets/${asset.id}/edit`,
          class: "p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-all duration-200 hover:scale-110 group",
          title: "Edit"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:pencil",
                class: "w-4 h-4 transition-transform group-hover:rotate-12"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "lucide:pencil",
                  class: "w-4 h-4 transition-transform group-hover:rotate-12"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></td></tr>`);
      });
      _push(`<!--]-->`);
      if (unref(assets).length === 0) {
        _push(`<tr><td colspan="7" class="px-4 py-8 text-center text-muted-foreground"> No assets found </td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/assets/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-ByYsy8AQ.mjs.map
