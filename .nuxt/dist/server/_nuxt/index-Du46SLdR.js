import { a as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/hookable/dist/index.mjs";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-3xl font-bold">Reports</h1><p class="text-muted-foreground">Generate and view business reports</p></div><button class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:download",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Export All </button></div><div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"><div class="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer"><div class="flex items-start justify-between"><div><div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:bar-chart-3",
        class: "w-6 h-6 text-blue-600"
      }, null, _parent));
      _push(`</div><h3 class="text-lg font-semibold">Occupancy Report</h3><p class="text-sm text-muted-foreground mt-1">Space utilization and occupancy trends</p></div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:arrow-right",
        class: "w-5 h-5 text-muted-foreground"
      }, null, _parent));
      _push(`</div></div><div class="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer"><div class="flex items-start justify-between"><div><div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:indian-rupee",
        class: "w-6 h-6 text-green-600"
      }, null, _parent));
      _push(`</div><h3 class="text-lg font-semibold">Revenue Report</h3><p class="text-sm text-muted-foreground mt-1">Monthly revenue and collection analysis</p></div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:arrow-right",
        class: "w-5 h-5 text-muted-foreground"
      }, null, _parent));
      _push(`</div></div><div class="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer"><div class="flex items-start justify-between"><div><div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:file-text",
        class: "w-6 h-6 text-purple-600"
      }, null, _parent));
      _push(`</div><h3 class="text-lg font-semibold">Lease Report</h3><p class="text-sm text-muted-foreground mt-1">Active leases and expiring contracts</p></div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:arrow-right",
        class: "w-5 h-5 text-muted-foreground"
      }, null, _parent));
      _push(`</div></div><div class="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer"><div class="flex items-start justify-between"><div><div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:wrench",
        class: "w-6 h-6 text-amber-600"
      }, null, _parent));
      _push(`</div><h3 class="text-lg font-semibold">Maintenance Report</h3><p class="text-sm text-muted-foreground mt-1">Ticket trends and resolution times</p></div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:arrow-right",
        class: "w-5 h-5 text-muted-foreground"
      }, null, _parent));
      _push(`</div></div><div class="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer"><div class="flex items-start justify-between"><div><div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:credit-card",
        class: "w-6 h-6 text-red-600"
      }, null, _parent));
      _push(`</div><h3 class="text-lg font-semibold">Outstanding Dues</h3><p class="text-sm text-muted-foreground mt-1">Overdue invoices and payment status</p></div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:arrow-right",
        class: "w-5 h-5 text-muted-foreground"
      }, null, _parent));
      _push(`</div></div><div class="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer"><div class="flex items-start justify-between"><div><div class="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mb-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:users",
        class: "w-6 h-6 text-cyan-600"
      }, null, _parent));
      _push(`</div><h3 class="text-lg font-semibold">Tenant Report</h3><p class="text-sm text-muted-foreground mt-1">Company onboarding and activity</p></div>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:arrow-right",
        class: "w-5 h-5 text-muted-foreground"
      }, null, _parent));
      _push(`</div></div></div><div class="bg-card border border-border rounded-lg p-6"><h3 class="text-lg font-semibold mb-4">Quick Overview</h3><div class="grid gap-4 md:grid-cols-4"><div class="text-center p-4 bg-muted rounded-lg"><p class="text-3xl font-bold text-blue-600">87%</p><p class="text-sm text-muted-foreground">Avg Occupancy</p></div><div class="text-center p-4 bg-muted rounded-lg"><p class="text-3xl font-bold text-green-600">98%</p><p class="text-sm text-muted-foreground">Collection Rate</p></div><div class="text-center p-4 bg-muted rounded-lg"><p class="text-3xl font-bold text-amber-600">24h</p><p class="text-sm text-muted-foreground">Avg Resolution</p></div><div class="text-center p-4 bg-muted rounded-lg"><p class="text-3xl font-bold text-purple-600">4.8</p><p class="text-sm text-muted-foreground">Tenant Satisfaction</p></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/reports/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-Du46SLdR.js.map
