import { _ as __nuxt_component_0 } from "./nuxt-link-CrgyHNyr.js";
import { a as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/hookable/dist/index.mjs";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div><h1 class="text-3xl font-bold">Dashboard</h1><p class="text-muted-foreground">Overview of your property performance</p></div><div class="space-y-4"><h2 class="text-lg font-semibold">Quick Overview</h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"><div class="p-6 bg-card border border-border rounded-xl"><div class="flex flex-col items-center justify-center text-center space-y-2"><span class="text-4xl font-bold text-blue-600">87%</span><span class="text-sm text-muted-foreground">Avg Occupancy</span></div></div><div class="p-6 bg-card border border-border rounded-xl"><div class="flex flex-col items-center justify-center text-center space-y-2"><span class="text-4xl font-bold text-green-600">98%</span><span class="text-sm text-muted-foreground">Collection Rate</span></div></div><div class="p-6 bg-card border border-border rounded-xl"><div class="flex flex-col items-center justify-center text-center space-y-2"><span class="text-4xl font-bold text-amber-600">24h</span><span class="text-sm text-muted-foreground">Avg Resolution</span></div></div><div class="p-6 bg-card border border-border rounded-xl"><div class="flex flex-col items-center justify-center text-center space-y-2"><span class="text-4xl font-bold text-purple-600">4.8</span><span class="text-sm text-muted-foreground">Tenant Satisfaction</span></div></div></div></div><div class="space-y-4"><h2 class="text-lg font-semibold">Reports</h2><p class="text-sm text-muted-foreground">Generate and view business reports</p><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/reports/occupancy",
        class: "block p-6 bg-card border border-border rounded-xl hover:shadow-md transition-shadow"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-start justify-between mb-4"${_scopeId}><div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:pie-chart",
              class: "w-6 h-6 text-blue-600 dark:text-blue-300"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-right",
              class: "w-5 h-5 text-muted-foreground"
            }, null, _parent2, _scopeId));
            _push2(`</div><h3 class="font-semibold mb-1"${_scopeId}>Occupancy Report</h3><p class="text-sm text-muted-foreground"${_scopeId}>Space utilization and occupancy trends</p>`);
          } else {
            return [
              createVNode("div", { class: "flex items-start justify-between mb-4" }, [
                createVNode("div", { class: "p-2 bg-blue-100 dark:bg-blue-900 rounded-lg" }, [
                  createVNode(_component_Icon, {
                    name: "lucide:pie-chart",
                    class: "w-6 h-6 text-blue-600 dark:text-blue-300"
                  })
                ]),
                createVNode(_component_Icon, {
                  name: "lucide:arrow-right",
                  class: "w-5 h-5 text-muted-foreground"
                })
              ]),
              createVNode("h3", { class: "font-semibold mb-1" }, "Occupancy Report"),
              createVNode("p", { class: "text-sm text-muted-foreground" }, "Space utilization and occupancy trends")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/reports/revenue",
        class: "block p-6 bg-card border border-border rounded-xl hover:shadow-md transition-shadow"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-start justify-between mb-4"${_scopeId}><div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:indian-rupee",
              class: "w-6 h-6 text-green-600 dark:text-green-300"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-right",
              class: "w-5 h-5 text-muted-foreground"
            }, null, _parent2, _scopeId));
            _push2(`</div><h3 class="font-semibold mb-1"${_scopeId}>Revenue Report</h3><p class="text-sm text-muted-foreground"${_scopeId}>Monthly revenue and collection analysis</p>`);
          } else {
            return [
              createVNode("div", { class: "flex items-start justify-between mb-4" }, [
                createVNode("div", { class: "p-2 bg-green-100 dark:bg-green-900 rounded-lg" }, [
                  createVNode(_component_Icon, {
                    name: "lucide:indian-rupee",
                    class: "w-6 h-6 text-green-600 dark:text-green-300"
                  })
                ]),
                createVNode(_component_Icon, {
                  name: "lucide:arrow-right",
                  class: "w-5 h-5 text-muted-foreground"
                })
              ]),
              createVNode("h3", { class: "font-semibold mb-1" }, "Revenue Report"),
              createVNode("p", { class: "text-sm text-muted-foreground" }, "Monthly revenue and collection analysis")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/reports/leases",
        class: "block p-6 bg-card border border-border rounded-xl hover:shadow-md transition-shadow"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-start justify-between mb-4"${_scopeId}><div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:file-text",
              class: "w-6 h-6 text-purple-600 dark:text-purple-300"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-right",
              class: "w-5 h-5 text-muted-foreground"
            }, null, _parent2, _scopeId));
            _push2(`</div><h3 class="font-semibold mb-1"${_scopeId}>Lease Report</h3><p class="text-sm text-muted-foreground"${_scopeId}>Active leases and expiring contracts</p>`);
          } else {
            return [
              createVNode("div", { class: "flex items-start justify-between mb-4" }, [
                createVNode("div", { class: "p-2 bg-purple-100 dark:bg-purple-900 rounded-lg" }, [
                  createVNode(_component_Icon, {
                    name: "lucide:file-text",
                    class: "w-6 h-6 text-purple-600 dark:text-purple-300"
                  })
                ]),
                createVNode(_component_Icon, {
                  name: "lucide:arrow-right",
                  class: "w-5 h-5 text-muted-foreground"
                })
              ]),
              createVNode("h3", { class: "font-semibold mb-1" }, "Lease Report"),
              createVNode("p", { class: "text-sm text-muted-foreground" }, "Active leases and expiring contracts")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/reports/maintenance",
        class: "block p-6 bg-card border border-border rounded-xl hover:shadow-md transition-shadow"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-start justify-between mb-4"${_scopeId}><div class="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:wrench",
              class: "w-6 h-6 text-amber-600 dark:text-amber-300"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-right",
              class: "w-5 h-5 text-muted-foreground"
            }, null, _parent2, _scopeId));
            _push2(`</div><h3 class="font-semibold mb-1"${_scopeId}>Maintenance Report</h3><p class="text-sm text-muted-foreground"${_scopeId}>Ticket trends and resolution times</p>`);
          } else {
            return [
              createVNode("div", { class: "flex items-start justify-between mb-4" }, [
                createVNode("div", { class: "p-2 bg-amber-100 dark:bg-amber-900 rounded-lg" }, [
                  createVNode(_component_Icon, {
                    name: "lucide:wrench",
                    class: "w-6 h-6 text-amber-600 dark:text-amber-300"
                  })
                ]),
                createVNode(_component_Icon, {
                  name: "lucide:arrow-right",
                  class: "w-5 h-5 text-muted-foreground"
                })
              ]),
              createVNode("h3", { class: "font-semibold mb-1" }, "Maintenance Report"),
              createVNode("p", { class: "text-sm text-muted-foreground" }, "Ticket trends and resolution times")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/reports/outstanding",
        class: "block p-6 bg-card border border-border rounded-xl hover:shadow-md transition-shadow"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-start justify-between mb-4"${_scopeId}><div class="p-2 bg-red-100 dark:bg-red-900 rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:credit-card",
              class: "w-6 h-6 text-red-600 dark:text-red-300"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-right",
              class: "w-5 h-5 text-muted-foreground"
            }, null, _parent2, _scopeId));
            _push2(`</div><h3 class="font-semibold mb-1"${_scopeId}>Outstanding Dues</h3><p class="text-sm text-muted-foreground"${_scopeId}>Overdue invoices and payment status</p>`);
          } else {
            return [
              createVNode("div", { class: "flex items-start justify-between mb-4" }, [
                createVNode("div", { class: "p-2 bg-red-100 dark:bg-red-900 rounded-lg" }, [
                  createVNode(_component_Icon, {
                    name: "lucide:credit-card",
                    class: "w-6 h-6 text-red-600 dark:text-red-300"
                  })
                ]),
                createVNode(_component_Icon, {
                  name: "lucide:arrow-right",
                  class: "w-5 h-5 text-muted-foreground"
                })
              ]),
              createVNode("h3", { class: "font-semibold mb-1" }, "Outstanding Dues"),
              createVNode("p", { class: "text-sm text-muted-foreground" }, "Overdue invoices and payment status")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/reports/tenants",
        class: "block p-6 bg-card border border-border rounded-xl hover:shadow-md transition-shadow"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-start justify-between mb-4"${_scopeId}><div class="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:users",
              class: "w-6 h-6 text-cyan-600 dark:text-cyan-300"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-right",
              class: "w-5 h-5 text-muted-foreground"
            }, null, _parent2, _scopeId));
            _push2(`</div><h3 class="font-semibold mb-1"${_scopeId}>Tenant Report</h3><p class="text-sm text-muted-foreground"${_scopeId}>Company onboarding and activity</p>`);
          } else {
            return [
              createVNode("div", { class: "flex items-start justify-between mb-4" }, [
                createVNode("div", { class: "p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg" }, [
                  createVNode(_component_Icon, {
                    name: "lucide:users",
                    class: "w-6 h-6 text-cyan-600 dark:text-cyan-300"
                  })
                ]),
                createVNode(_component_Icon, {
                  name: "lucide:arrow-right",
                  class: "w-5 h-5 text-muted-foreground"
                })
              ]),
              createVNode("h3", { class: "font-semibold mb-1" }, "Tenant Report"),
              createVNode("p", { class: "text-sm text-muted-foreground" }, "Company onboarding and activity")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DLXN5L3H.js.map
