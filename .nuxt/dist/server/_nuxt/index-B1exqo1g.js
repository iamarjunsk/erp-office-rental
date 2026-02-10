import { _ as __nuxt_component_0 } from "./nuxt-link-CrgyHNyr.js";
import { u as useAuth, b as useRoute, a as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, withAsyncContext, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
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
const API_BASE = "http://localhost:8000/api/properties";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { authHeaders } = useAuth();
    const route = useRoute();
    const { data: property } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/${route.params.id}/`,
      {
        headers: authHeaders()
      },
      "$5WKbKOroJA"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/properties",
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
      _push(`<div class="flex-1"><h1 class="text-3xl font-bold">${ssrInterpolate(unref(property)?.name)}</h1><div class="flex items-center gap-2 text-muted-foreground mt-1">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:map-pin",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(property)?.city)}, ${ssrInterpolate(unref(property)?.state)}</span><span class="mx-2">•</span><span class="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">${ssrInterpolate(unref(property)?.type.replace("_", " "))}</span></div></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/admin/properties/${unref(route).params.id}/edit`,
        class: "flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:pencil",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` Edit Property `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:pencil",
                class: "w-4 h-4"
              }),
              createTextVNode(" Edit Property ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid md:grid-cols-3 gap-6"><div class="md:col-span-2 space-y-6"><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Property Details</h2><div class="grid grid-cols-2 gap-6"><div><p class="text-sm text-muted-foreground">Property Code</p><p class="font-medium">${ssrInterpolate(unref(property)?.code)}</p></div><div><p class="text-sm text-muted-foreground">Status</p><span class="${ssrRenderClass([{
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400": unref(property)?.status === "active",
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400": unref(property)?.status === "inactive",
        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400": unref(property)?.status === "under_renovation"
      }, "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1"])}">${ssrInterpolate(unref(property)?.status.replace("_", " "))}</span></div><div><p class="text-sm text-muted-foreground">Total Area</p><p class="font-medium">${ssrInterpolate(unref(property)?.total_area?.toLocaleString())} sqft</p></div><div><p class="text-sm text-muted-foreground">Floors</p><p class="font-medium">${ssrInterpolate(unref(property)?.floors || "N/A")}</p></div><div><p class="text-sm text-muted-foreground">Build Year</p><p class="font-medium">${ssrInterpolate(unref(property)?.build_year || "N/A")}</p></div></div></div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Location</h2><div class="space-y-4"><div><p class="text-sm text-muted-foreground">Address</p><p class="font-medium">${ssrInterpolate(unref(property)?.address)}</p></div><div class="grid grid-cols-2 gap-4"><div><p class="text-sm text-muted-foreground">City</p><p class="font-medium">${ssrInterpolate(unref(property)?.city)}</p></div><div><p class="text-sm text-muted-foreground">State</p><p class="font-medium">${ssrInterpolate(unref(property)?.state)}</p></div><div><p class="text-sm text-muted-foreground">PIN Code</p><p class="font-medium">${ssrInterpolate(unref(property)?.pincode)}</p></div></div></div></div></div><div class="space-y-6"><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Management</h2><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:user",
        class: "w-5 h-5 text-primary"
      }, null, _parent));
      _push(`</div><div><p class="font-medium">${ssrInterpolate(unref(property)?.manager_details ? `${unref(property).manager_details.first_name} ${unref(property).manager_details.last_name}` : "Unassigned")}</p><p class="text-xs text-muted-foreground">Property Manager</p></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/properties/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-B1exqo1g.js.map
