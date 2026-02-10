import { _ as __nuxt_component_0 } from "./nuxt-link-CrgyHNyr.js";
import { u as useAuth, a as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, withCtx, createVNode, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
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
const API_BASE = "http://localhost:8000/api/companies";
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
      "$tYZrucGEyy"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const companies = computed(() => data.value || []);
    watch(searchQuery, debounce(() => {
      refresh();
    }, 500));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-3xl font-bold">Companies</h1><p class="text-muted-foreground">Manage tenant companies</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/companies/create",
        class: "flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:plus",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` Add Company `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:plus",
                class: "w-4 h-4"
              }),
              createTextVNode(" Add Company ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-col sm:flex-row gap-4"><div class="relative flex-1">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:search",
        class: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Search companies..." class="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><select class="px-4 py-2 bg-card border border-border rounded-lg"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "") : ssrLooseEqual(unref(statusFilter), "")) ? " selected" : ""}>All Status</option><option value="active"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "active") : ssrLooseEqual(unref(statusFilter), "active")) ? " selected" : ""}>Active</option><option value="inactive"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "inactive") : ssrLooseEqual(unref(statusFilter), "inactive")) ? " selected" : ""}>Inactive</option><option value="blacklisted"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "blacklisted") : ssrLooseEqual(unref(statusFilter), "blacklisted")) ? " selected" : ""}>Blacklisted</option></select></div><div class="bg-card border border-border rounded-lg overflow-hidden"><div class="overflow-x-auto"><table class="w-full"><thead class="bg-muted"><tr><th class="px-4 py-3 text-left text-sm font-medium">Company Name</th><th class="px-4 py-3 text-left text-sm font-medium">Type</th><th class="px-4 py-3 text-left text-sm font-medium">Industry</th><th class="px-4 py-3 text-left text-sm font-medium">GSTIN</th><th class="px-4 py-3 text-left text-sm font-medium">Location</th><th class="px-4 py-3 text-left text-sm font-medium">Credit Score</th><th class="px-4 py-3 text-left text-sm font-medium">Status</th><th class="px-4 py-3 text-left text-sm font-medium">Actions</th></tr></thead><tbody class="divide-y divide-border"><!--[-->`);
      ssrRenderList(unref(companies), (company) => {
        _push(`<tr class="hover:bg-muted/50"><td class="px-4 py-3 text-sm"><div><p class="font-medium">${ssrInterpolate(company.name)}</p><p class="text-xs text-muted-foreground">${ssrInterpolate(company.legal_name)}</p></div></td><td class="px-4 py-3 text-sm uppercase">${ssrInterpolate(company.type.replace("_", " "))}</td><td class="px-4 py-3 text-sm">${ssrInterpolate(company.industry || "-")}</td><td class="px-4 py-3 text-sm font-mono">${ssrInterpolate(company.gstin || "-")}</td><td class="px-4 py-3 text-sm">${ssrInterpolate(company.city)}, ${ssrInterpolate(company.state)}</td><td class="px-4 py-3 text-sm"><div class="flex items-center gap-2"><div class="w-16 h-2 bg-muted rounded-full overflow-hidden"><div class="${ssrRenderClass([{
          "bg-red-500": (company.credit_score || 0) < 50,
          "bg-amber-500": (company.credit_score || 0) >= 50 && (company.credit_score || 0) < 75,
          "bg-green-500": (company.credit_score || 0) >= 75
        }, "h-full rounded-full"])}" style="${ssrRenderStyle({ width: `${company.credit_score || 0}%` })}"></div></div><span class="text-xs">${ssrInterpolate(company.credit_score || 0)}</span></div></td><td class="px-4 py-3 text-sm"><span class="${ssrRenderClass([{
          "bg-green-100 text-green-700": company.status === "active",
          "bg-red-100 text-red-700": company.status === "inactive",
          "bg-gray-100 text-gray-700": company.status === "blacklisted"
        }, "px-2 py-1 rounded-full text-xs font-medium"])}">${ssrInterpolate(company.status)}</span></td><td class="px-4 py-3 text-sm"><div class="flex items-center gap-2"><button class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">`);
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
      if (unref(companies).length === 0) {
        _push(`<tr><td colspan="8" class="px-4 py-8 text-center text-muted-foreground"> No companies found </td></tr>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/companies/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DHPONLD1.js.map
