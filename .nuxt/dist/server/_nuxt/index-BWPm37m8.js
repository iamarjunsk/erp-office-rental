import { _ as __nuxt_component_0 } from "./nuxt-link-CrgyHNyr.js";
import { u as useAuth, b as useRoute, a as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, withAsyncContext, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
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
    const { authHeaders } = useAuth();
    const route = useRoute();
    const { data: company } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/${route.params.id}/`,
      {
        headers: authHeaders()
      },
      "$eyF9we-ipX"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/companies",
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
      _push(`<div class="flex-1"><h1 class="text-3xl font-bold">${ssrInterpolate(unref(company)?.name)}</h1><div class="flex items-center gap-2 text-muted-foreground mt-1"><span class="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary uppercase">${ssrInterpolate(unref(company)?.type.replace("_", " "))}</span><span class="mx-2">•</span><span>${ssrInterpolate(unref(company)?.industry || "No industry specified")}</span></div></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/admin/companies/${unref(route).params.id}/edit`,
        class: "flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:pencil",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` Edit Company `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:pencil",
                class: "w-4 h-4"
              }),
              createTextVNode(" Edit Company ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid md:grid-cols-3 gap-6"><div class="md:col-span-2 space-y-6"><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Company Details</h2><div class="grid grid-cols-2 gap-6"><div><p class="text-sm text-muted-foreground">Legal Name</p><p class="font-medium">${ssrInterpolate(unref(company)?.legal_name || unref(company)?.name)}</p></div><div><p class="text-sm text-muted-foreground">Status</p><span class="${ssrRenderClass([{
        "bg-green-100 text-green-700": unref(company)?.status === "active",
        "bg-red-100 text-red-700": unref(company)?.status === "inactive",
        "bg-gray-100 text-gray-700": unref(company)?.status === "blacklisted"
      }, "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1"])}">${ssrInterpolate(unref(company)?.status)}</span></div><div><p class="text-sm text-muted-foreground">GSTIN</p><p class="font-medium font-mono">${ssrInterpolate(unref(company)?.gstin || "N/A")}</p></div><div><p class="text-sm text-muted-foreground">PAN</p><p class="font-medium font-mono">${ssrInterpolate(unref(company)?.pan || "N/A")}</p></div><div><p class="text-sm text-muted-foreground">CIN</p><p class="font-medium font-mono">${ssrInterpolate(unref(company)?.cin || "N/A")}</p></div></div></div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Location</h2><div class="space-y-4"><div><p class="text-sm text-muted-foreground">Address</p><p class="font-medium">${ssrInterpolate(unref(company)?.address || "N/A")}</p></div><div class="grid grid-cols-3 gap-4"><div><p class="text-sm text-muted-foreground">City</p><p class="font-medium">${ssrInterpolate(unref(company)?.city || "N/A")}</p></div><div><p class="text-sm text-muted-foreground">State</p><p class="font-medium">${ssrInterpolate(unref(company)?.state || "N/A")}</p></div><div><p class="text-sm text-muted-foreground">PIN Code</p><p class="font-medium">${ssrInterpolate(unref(company)?.pincode || "N/A")}</p></div></div></div></div>`);
      if (unref(company)?.notes) {
        _push(`<div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Notes</h2><p class="text-muted-foreground">${ssrInterpolate(unref(company).notes)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-6"><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Contact</h2><div class="space-y-3">`);
      if (unref(company)?.email) {
        _push(`<div class="flex items-center gap-3">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:mail",
          class: "w-4 h-4 text-muted-foreground"
        }, null, _parent));
        _push(`<a${ssrRenderAttr("href", `mailto:${unref(company).email}`)} class="text-primary hover:underline">${ssrInterpolate(unref(company).email)}</a></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(company)?.phone) {
        _push(`<div class="flex items-center gap-3">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:phone",
          class: "w-4 h-4 text-muted-foreground"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(company).phone)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(company)?.website) {
        _push(`<div class="flex items-center gap-3">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:globe",
          class: "w-4 h-4 text-muted-foreground"
        }, null, _parent));
        _push(`<a${ssrRenderAttr("href", unref(company).website)} target="_blank" class="text-primary hover:underline">${ssrInterpolate(unref(company).website)}</a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Credit Score</h2><div class="flex items-center gap-3"><div class="flex-1 h-3 bg-muted rounded-full overflow-hidden"><div class="${ssrRenderClass([{
        "bg-red-500": (unref(company)?.credit_score || 0) < 50,
        "bg-amber-500": (unref(company)?.credit_score || 0) >= 50 && (unref(company)?.credit_score || 0) < 75,
        "bg-green-500": (unref(company)?.credit_score || 0) >= 75
      }, "h-full rounded-full transition-all"])}" style="${ssrRenderStyle({ width: `${unref(company)?.credit_score || 0}%` })}"></div></div><span class="text-lg font-bold">${ssrInterpolate(unref(company)?.credit_score || 0)}</span></div><p class="text-xs text-muted-foreground">${ssrInterpolate((unref(company)?.credit_score || 0) >= 75 ? "Excellent" : (unref(company)?.credit_score || 0) >= 50 ? "Good" : "Poor")}</p></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/companies/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-BWPm37m8.js.map
