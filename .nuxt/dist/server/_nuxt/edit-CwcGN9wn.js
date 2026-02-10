import { _ as __nuxt_component_0 } from "./nuxt-link-CrgyHNyr.js";
import { u as useAuth, b as useRoute, a as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, ref, withAsyncContext, watchEffect, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
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
  __name: "edit",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { authHeaders } = useAuth();
    const route = useRoute();
    const saving = ref(false);
    const { data: property, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/${route.params.id}/`,
      {
        headers: authHeaders()
      },
      "$kzEEDOGbQP"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const formData = ref(null);
    watchEffect(() => {
      if (property.value) {
        formData.value = {
          code: property.value.code,
          name: property.value.name,
          type: property.value.type,
          address: property.value.address,
          city: property.value.city,
          state: property.value.state,
          pincode: property.value.pincode,
          totalArea: property.value.total_area,
          // Map snake_case to camelCase for form
          buildYear: property.value.build_year,
          floors: property.value.floors,
          status: property.value.status
        };
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/admin/properties/${unref(route).params.id}`,
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
      _push(`<div><h1 class="text-3xl font-bold">Edit Property</h1><p class="text-muted-foreground">Update info for ${ssrInterpolate(unref(property)?.name)}</p></div></div>`);
      if (unref(formData)) {
        _push(`<form class="max-w-4xl space-y-8"><div class="space-y-4"><h2 class="text-xl font-semibold">Basic Information</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Property Code *</label><input${ssrRenderAttr("value", unref(formData).code)} type="text" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Property Name *</label><input${ssrRenderAttr("value", unref(formData).name)} type="text" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Type *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value="commercial"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).type) ? ssrLooseContain(unref(formData).type, "commercial") : ssrLooseEqual(unref(formData).type, "commercial")) ? " selected" : ""}>Commercial Office</option><option value="coworking"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).type) ? ssrLooseContain(unref(formData).type, "coworking") : ssrLooseEqual(unref(formData).type, "coworking")) ? " selected" : ""}>Co-working Space</option><option value="mixed_use"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).type) ? ssrLooseContain(unref(formData).type, "mixed_use") : ssrLooseEqual(unref(formData).type, "mixed_use")) ? " selected" : ""}>Mixed Use</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Status *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value="active"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).status) ? ssrLooseContain(unref(formData).status, "active") : ssrLooseEqual(unref(formData).status, "active")) ? " selected" : ""}>Active</option><option value="inactive"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).status) ? ssrLooseContain(unref(formData).status, "inactive") : ssrLooseEqual(unref(formData).status, "inactive")) ? " selected" : ""}>Inactive</option><option value="under_renovation"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).status) ? ssrLooseContain(unref(formData).status, "under_renovation") : ssrLooseEqual(unref(formData).status, "under_renovation")) ? " selected" : ""}>Under Renovation</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Total Area (sqft) *</label><input${ssrRenderAttr("value", unref(formData).totalArea)} type="number" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Location Details</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2 md:col-span-2"><label class="text-sm font-medium">Address *</label><input${ssrRenderAttr("value", unref(formData).address)} type="text" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">City *</label><input${ssrRenderAttr("value", unref(formData).city)} type="text" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">State *</label><input${ssrRenderAttr("value", unref(formData).state)} type="text" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">PIN Code *</label><input${ssrRenderAttr("value", unref(formData).pincode)} type="text" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Additional Details</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Build Year</label><input${ssrRenderAttr("value", unref(formData).buildYear)} type="number" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Floors</label><input${ssrRenderAttr("value", unref(formData).floors)} type="number" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div></div><div class="flex items-center gap-4 pt-4"><button type="button" class="px-4 py-2 border border-border rounded-lg hover:bg-muted"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(unref(saving) ? "Saving..." : "Save Changes")}</button></div></form>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/properties/[id]/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=edit-CwcGN9wn.js.map
