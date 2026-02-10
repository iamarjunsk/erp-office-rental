import { _ as __nuxt_component_0 } from "./nuxt-link-CrgyHNyr.js";
import { u as useAuth, a as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, withCtx, createVNode, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/hookable/dist/index.mjs";
import { u as useFetch } from "./fetch-DzFior15.js";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/ufo/dist/index.mjs";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/unctx/dist/index.mjs";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/defu/dist/defu.mjs";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/klona/dist/index.mjs";
import "@iconify/vue/dist/offline";
import "@iconify/vue";
import "radix-vue";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/ohash/dist/index.mjs";
import "@vue/shared";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/perfect-debounce/dist/index.mjs";
const API_BASE = "http://localhost:8000/api/leases";
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
    const searchQuery = ref("");
    const statusFilter = ref("");
    const { data, pending: loading, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      () => {
        const params = new URLSearchParams();
        if (searchQuery.value) params.append("search", searchQuery.value);
        if (statusFilter.value) params.append("status", statusFilter.value);
        return `${API_BASE}/?${params.toString()}`;
      },
      {
        headers: authHeaders(),
        watch: [statusFilter]
      },
      "$lHxaFVI1Fi"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const leases = computed(() => data.value || []);
    const stats = computed(() => {
      const allLeases = leases.value;
      const active = allLeases.filter((l) => l.status === "active").length;
      const today = /* @__PURE__ */ new Date();
      const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1e3);
      const expiring = allLeases.filter((l) => {
        const endDate = new Date(l.end_date);
        return l.status === "active" && endDate <= thirtyDaysFromNow && endDate >= today;
      }).length;
      const monthlyRent = allLeases.filter((l) => l.status === "active").reduce((sum, l) => sum + Number(l.rent_amount), 0);
      const securityDeposits = allLeases.filter((l) => l.status === "active").reduce((sum, l) => sum + Number(l.security_deposit), 0);
      return { active, expiring, monthlyRent, securityDeposits };
    });
    watch(searchQuery, debounce(() => {
      refresh();
    }, 500));
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(value);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-3xl font-bold">Leases</h1><p class="text-muted-foreground">Manage lease agreements</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/leases/create",
        class: "flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:plus",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` New Lease `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:plus",
                class: "w-4 h-4"
              }),
              createTextVNode(" New Lease ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid gap-4 md:grid-cols-4"><div class="bg-card border border-border rounded-lg p-4"><p class="text-sm text-muted-foreground">Active Leases</p><p class="text-2xl font-bold">${ssrInterpolate(unref(stats).active)}</p><p class="text-xs text-green-500">Currently active</p></div><div class="bg-card border border-border rounded-lg p-4"><p class="text-sm text-muted-foreground">Expiring Soon</p><p class="text-2xl font-bold">${ssrInterpolate(unref(stats).expiring)}</p><p class="text-xs text-amber-500">Within 30 days</p></div><div class="bg-card border border-border rounded-lg p-4"><p class="text-sm text-muted-foreground">Monthly Rent</p><p class="text-2xl font-bold">${ssrInterpolate(formatCurrency(unref(stats).monthlyRent))}</p><p class="text-xs text-muted-foreground">Total monthly</p></div><div class="bg-card border border-border rounded-lg p-4"><p class="text-sm text-muted-foreground">Security Deposits</p><p class="text-2xl font-bold">${ssrInterpolate(formatCurrency(unref(stats).securityDeposits))}</p><p class="text-xs text-muted-foreground">Held in escrow</p></div></div><div class="flex flex-col sm:flex-row gap-4"><div class="relative flex-1">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:search",
        class: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Search leases..." class="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><select class="px-4 py-2 bg-card border border-border rounded-lg"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "") : ssrLooseEqual(unref(statusFilter), "")) ? " selected" : ""}>All Status</option><option value="active"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "active") : ssrLooseEqual(unref(statusFilter), "active")) ? " selected" : ""}>Active</option><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "draft") : ssrLooseEqual(unref(statusFilter), "draft")) ? " selected" : ""}>Draft</option><option value="expired"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "expired") : ssrLooseEqual(unref(statusFilter), "expired")) ? " selected" : ""}>Expired</option><option value="terminated"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "terminated") : ssrLooseEqual(unref(statusFilter), "terminated")) ? " selected" : ""}>Terminated</option></select></div><div class="bg-card border border-border rounded-lg overflow-hidden"><div class="overflow-x-auto"><table class="w-full"><thead class="bg-muted"><tr><th class="px-4 py-3 text-left text-sm font-medium">Lease #</th><th class="px-4 py-3 text-left text-sm font-medium">Company</th><th class="px-4 py-3 text-left text-sm font-medium">Space</th><th class="px-4 py-3 text-left text-sm font-medium">Type</th><th class="px-4 py-3 text-left text-sm font-medium">Start Date</th><th class="px-4 py-3 text-left text-sm font-medium">End Date</th><th class="px-4 py-3 text-left text-sm font-medium">Rent</th><th class="px-4 py-3 text-left text-sm font-medium">Status</th><th class="px-4 py-3 text-left text-sm font-medium">Actions</th></tr></thead><tbody class="divide-y divide-border"><!--[-->`);
      ssrRenderList(unref(leases), (lease) => {
        _push(`<tr class="hover:bg-muted/50"><td class="px-4 py-3 text-sm font-medium">${ssrInterpolate(lease.lease_number)}</td><td class="px-4 py-3 text-sm">${ssrInterpolate(lease.company_details?.name)}</td><td class="px-4 py-3 text-sm">${ssrInterpolate(lease.space_details?.code)}</td><td class="px-4 py-3 text-sm capitalize">${ssrInterpolate(lease.type.replace("_", " "))}</td><td class="px-4 py-3 text-sm">${ssrInterpolate(formatDate(lease.start_date))}</td><td class="px-4 py-3 text-sm">${ssrInterpolate(formatDate(lease.end_date))}</td><td class="px-4 py-3 text-sm">${ssrInterpolate(formatCurrency(lease.rent_amount))}</td><td class="px-4 py-3 text-sm"><span class="${ssrRenderClass([{
          "bg-green-100 text-green-700": lease.status === "active",
          "bg-gray-100 text-gray-700": lease.status === "draft",
          "bg-red-100 text-red-700": lease.status === "expired",
          "bg-amber-100 text-amber-700": lease.status === "terminated"
        }, "px-2 py-1 rounded-full text-xs font-medium"])}">${ssrInterpolate(lease.status)}</span></td><td class="px-4 py-3 text-sm"><div class="flex items-center gap-2"><button class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:eye",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button><button class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:pencil",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button></div></td></tr>`);
      });
      _push(`<!--]-->`);
      if (unref(leases).length === 0) {
        _push(`<tr><td colspan="9" class="px-4 py-8 text-center text-muted-foreground"> No leases found </td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/leases/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-Ck-1O1vS.js.map
