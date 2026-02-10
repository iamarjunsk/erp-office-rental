import { u as useAuth, b as useRoute, a as __nuxt_component_0 } from "../server.mjs";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-CrgyHNyr.js";
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/hookable/dist/index.mjs";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/unctx/dist/index.mjs";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/defu/dist/defu.mjs";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/ufo/dist/index.mjs";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/klona/dist/index.mjs";
import "@iconify/vue/dist/offline";
import "@iconify/vue";
import "radix-vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const route = useRoute();
    const isActive = (href) => {
      if (href === "/admin") {
        return route.path === "/admin";
      }
      return route.path.startsWith(href);
    };
    const navigation = [
      { name: "Dashboard", href: "/admin", icon: "lucide:layout-dashboard" },
      { name: "Properties", href: "/admin/properties", icon: "lucide:building" },
      { name: "Spaces", href: "/admin/spaces", icon: "lucide:door-open" },
      { name: "Leases", href: "/admin/leases", icon: "lucide:file-text" },
      { name: "Companies", href: "/admin/companies", icon: "lucide:briefcase" },
      { name: "Procurement", href: "/admin/procurement", icon: "lucide:shopping-cart" },
      { name: "Assets", href: "/admin/assets", icon: "lucide:package" },
      { name: "Billing", href: "/admin/billing", icon: "lucide:credit-card" },
      { name: "Maintenance", href: "/admin/maintenance", icon: "lucide:wrench" },
      { name: "Bookings", href: "/admin/bookings", icon: "lucide:calendar" },
      { name: "Users", href: "/admin/users", icon: "lucide:users" },
      { name: "Reports", href: "/admin/reports", icon: "lucide:bar-chart-3" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-background text-foreground flex font-sans" }, _attrs))}><aside class="fixed left-0 top-0 h-screen w-[280px] border-r border-border bg-background flex flex-col hidden md:flex z-50"><div class="p-6 flex-shrink-0"><div class="flex items-center gap-3"><div class="bg-[#0f172a] text-white p-2 rounded-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:building-2",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</div><span class="font-bold text-xl text-[#0f172a]">OfficeERP</span></div></div><nav class="flex-1 overflow-y-auto px-4 py-2 space-y-2"><!--[-->`);
      ssrRenderList(navigation, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.name,
          to: item.href,
          class: ["flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all duration-200", isActive(item.href) ? "bg-[#0f172a] text-white shadow-lg shadow-gray-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: item.icon,
                class: ["w-5 h-5", isActive(item.href) ? "text-white" : "text-slate-400 group-hover:text-slate-600"]
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(item.name)}`);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: item.icon,
                  class: ["w-5 h-5", isActive(item.href) ? "text-white" : "text-slate-400 group-hover:text-slate-600"]
                }, null, 8, ["name", "class"]),
                createTextVNode(" " + toDisplayString(item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="p-4 border-t border-border flex-shrink-0"><div class="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group"><div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:user",
        class: "w-5 h-5 text-slate-600"
      }, null, _parent));
      _push(`</div><div class="flex-1 min-w-0"><p class="text-sm font-semibold text-slate-900 truncate">${ssrInterpolate(unref(user)?.first_name || "User")} ${ssrInterpolate(unref(user)?.last_name || "")}</p><p class="text-xs text-slate-500 truncate group-hover:text-slate-700">${ssrInterpolate(unref(user)?.email || "Not logged in")}</p></div><button title="Logout" class="p-1 hover:bg-slate-100 rounded-lg transition-colors">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:log-out",
        class: "w-5 h-5 text-slate-400 hover:text-slate-900 transition-colors"
      }, null, _parent));
      _push(`</button></div></div></aside><main class="flex-1 md:ml-[280px] min-h-screen bg-slate-50/50"><header class="h-16 border-b border-border bg-background flex items-center justify-between px-8 sticky top-0 z-10"><h1 class="text-xl font-bold text-slate-800 capitalize">${ssrInterpolate(_ctx.$route.path.split("/").pop()?.replace("-", " ") || "Dashboard")}</h1><div class="flex items-center gap-4"><button class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:bell",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`<span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span></button></div></header><div class="p-8">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=admin-DpkdtdYT.js.map
