import { _ as __nuxt_component_0 } from "./nuxt-link-CrgyHNyr.js";
import { u as useAuth, a as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, ref, mergeProps, withCtx, createVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate } from "vue/server-renderer";
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
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const creating = ref(false);
    const newProperty = ref({
      code: "",
      name: "",
      type: "commercial",
      address: "",
      city: "",
      state: "",
      pincode: "",
      totalArea: 0,
      buildYear: void 0,
      floors: void 0
    });
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
      _push(`<div><h1 class="text-3xl font-bold">Add Property</h1><p class="text-muted-foreground">Register a new office property</p></div></div><form class="max-w-4xl space-y-8"><div class="space-y-4"><h2 class="text-xl font-semibold">Basic Information</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Property Code *</label><input${ssrRenderAttr("value", unref(newProperty).code)} type="text" placeholder="PROP-001" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Property Name *</label><input${ssrRenderAttr("value", unref(newProperty).name)} type="text" placeholder="Cyber Towers" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Type *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value="commercial"${ssrIncludeBooleanAttr(Array.isArray(unref(newProperty).type) ? ssrLooseContain(unref(newProperty).type, "commercial") : ssrLooseEqual(unref(newProperty).type, "commercial")) ? " selected" : ""}>Commercial Office</option><option value="coworking"${ssrIncludeBooleanAttr(Array.isArray(unref(newProperty).type) ? ssrLooseContain(unref(newProperty).type, "coworking") : ssrLooseEqual(unref(newProperty).type, "coworking")) ? " selected" : ""}>Co-working Space</option><option value="mixed_use"${ssrIncludeBooleanAttr(Array.isArray(unref(newProperty).type) ? ssrLooseContain(unref(newProperty).type, "mixed_use") : ssrLooseEqual(unref(newProperty).type, "mixed_use")) ? " selected" : ""}>Mixed Use</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Total Area (sqft) *</label><input${ssrRenderAttr("value", unref(newProperty).totalArea)} type="number" placeholder="50000" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Location Details</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2 md:col-span-2"><label class="text-sm font-medium">Address *</label><input${ssrRenderAttr("value", unref(newProperty).address)} type="text" placeholder="Full address" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">City *</label><input${ssrRenderAttr("value", unref(newProperty).city)} type="text" placeholder="Hyderabad" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">State *</label><input${ssrRenderAttr("value", unref(newProperty).state)} type="text" placeholder="Telangana" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">PIN Code *</label><input${ssrRenderAttr("value", unref(newProperty).pincode)} type="text" placeholder="500081" maxlength="6" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Additional Details</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Build Year</label><input${ssrRenderAttr("value", unref(newProperty).buildYear)} type="number" placeholder="2018" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Floors</label><input${ssrRenderAttr("value", unref(newProperty).floors)} type="number" placeholder="10" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div></div><div class="flex items-center gap-4 pt-4"><button type="button" class="px-4 py-2 border border-border rounded-lg hover:bg-muted"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(creating)) ? " disabled" : ""} class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(unref(creating) ? "Creating..." : "Create Property")}</button></div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/properties/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=create-C1bMH7AU.js.map
