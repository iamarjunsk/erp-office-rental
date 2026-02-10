import { _ as __nuxt_component_0 } from "./nuxt-link-CrgyHNyr.js";
import { u as useAuth, b as useRoute, a as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, ref, withAsyncContext, watchEffect, mergeProps, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
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
const API_BASE = "http://localhost:8000/api/spaces";
const PROPERTIES_API = "http://localhost:8000/api/properties";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "edit",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { authHeaders } = useAuth();
    const route = useRoute();
    const saving = ref(false);
    const amenitiesInput = ref("");
    const { data: space, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/${route.params.id}/`,
      {
        headers: authHeaders()
      },
      "$-w-ZhVrhE4"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: properties } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${PROPERTIES_API}/`,
      {
        headers: authHeaders()
      },
      "$a8Ap4VeRf-"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const formData = ref(null);
    watchEffect(() => {
      if (space.value) {
        formData.value = {
          code: space.value.code,
          name: space.value.name,
          property: space.value.property,
          type: space.value.type,
          floor: space.value.floor,
          area: Number(space.value.area),
          capacity: space.value.capacity,
          base_rent: Number(space.value.base_rent),
          price_per_day: space.value.price_per_day ? Number(space.value.price_per_day) : null,
          current_status: space.value.current_status,
          description: space.value.description || ""
        };
        amenitiesInput.value = space.value.amenities?.join(", ") || "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/admin/spaces/${unref(route).params.id}`,
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
      _push(`<div><h1 class="text-3xl font-bold">Edit Space</h1><p class="text-muted-foreground">Update info for ${ssrInterpolate(unref(space)?.name)}</p></div></div>`);
      if (unref(formData)) {
        _push(`<form class="max-w-4xl space-y-8"><div class="space-y-4"><h2 class="text-xl font-semibold">Basic Information</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Space Code *</label><input${ssrRenderAttr("value", unref(formData).code)} type="text" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Space Name *</label><input${ssrRenderAttr("value", unref(formData).name)} type="text" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Property *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><!--[-->`);
        ssrRenderList(unref(properties), (prop) => {
          _push(`<option${ssrRenderAttr("value", prop.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(formData).property) ? ssrLooseContain(unref(formData).property, prop.id) : ssrLooseEqual(unref(formData).property, prop.id)) ? " selected" : ""}>${ssrInterpolate(prop.name)} (${ssrInterpolate(prop.code)}) </option>`);
        });
        _push(`<!--]--></select></div><div class="space-y-2"><label class="text-sm font-medium">Type *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value="private_office"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).type) ? ssrLooseContain(unref(formData).type, "private_office") : ssrLooseEqual(unref(formData).type, "private_office")) ? " selected" : ""}>Private Office</option><option value="open_desk"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).type) ? ssrLooseContain(unref(formData).type, "open_desk") : ssrLooseEqual(unref(formData).type, "open_desk")) ? " selected" : ""}>Open Desk</option><option value="meeting_room"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).type) ? ssrLooseContain(unref(formData).type, "meeting_room") : ssrLooseEqual(unref(formData).type, "meeting_room")) ? " selected" : ""}>Meeting Room</option><option value="virtual_office"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).type) ? ssrLooseContain(unref(formData).type, "virtual_office") : ssrLooseEqual(unref(formData).type, "virtual_office")) ? " selected" : ""}>Virtual Office</option><option value="hot_desk"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).type) ? ssrLooseContain(unref(formData).type, "hot_desk") : ssrLooseEqual(unref(formData).type, "hot_desk")) ? " selected" : ""}>Hot Desk</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Status *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value="available"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).current_status) ? ssrLooseContain(unref(formData).current_status, "available") : ssrLooseEqual(unref(formData).current_status, "available")) ? " selected" : ""}>Available</option><option value="occupied"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).current_status) ? ssrLooseContain(unref(formData).current_status, "occupied") : ssrLooseEqual(unref(formData).current_status, "occupied")) ? " selected" : ""}>Occupied</option><option value="maintenance"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).current_status) ? ssrLooseContain(unref(formData).current_status, "maintenance") : ssrLooseEqual(unref(formData).current_status, "maintenance")) ? " selected" : ""}>Maintenance</option><option value="reserved"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).current_status) ? ssrLooseContain(unref(formData).current_status, "reserved") : ssrLooseEqual(unref(formData).current_status, "reserved")) ? " selected" : ""}>Reserved</option></select></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Location &amp; Specifications</h2><div class="grid md:grid-cols-3 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Floor *</label><input${ssrRenderAttr("value", unref(formData).floor)} type="number" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Area (sqft) *</label><input${ssrRenderAttr("value", unref(formData).area)} type="number" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Capacity (people)</label><input${ssrRenderAttr("value", unref(formData).capacity)} type="number" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Pricing</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Base Rent (Monthly) *</label><input${ssrRenderAttr("value", unref(formData).base_rent)} type="number" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Price Per Day</label><input${ssrRenderAttr("value", unref(formData).price_per_day)} type="number" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Additional Details</h2><div class="space-y-4"><div class="space-y-2"><label class="text-sm font-medium">Amenities (comma-separated)</label><input${ssrRenderAttr("value", unref(amenitiesInput))} type="text" placeholder="WiFi, AC, Projector" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Description</label><textarea rows="3" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">${ssrInterpolate(unref(formData).description)}</textarea></div></div></div><div class="flex items-center gap-4 pt-4"><button type="button" class="px-4 py-2 border border-border rounded-lg hover:bg-muted"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(unref(saving) ? "Saving..." : "Save Changes")}</button></div></form>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/spaces/[id]/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=edit-DW9VW5wW.js.map
