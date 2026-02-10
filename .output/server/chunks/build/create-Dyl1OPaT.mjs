import { _ as __nuxt_component_0 } from './nuxt-link-CrgyHNyr.mjs';
import { u as useAuth, a as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, withAsyncContext, mergeProps, withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useFetch } from './fetch-DzFior15.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import 'radix-vue';
import '@vue/shared';
import 'perfect-debounce';

const PROPERTIES_API = "http://localhost:8000/api/properties";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { authHeaders } = useAuth();
    const creating = ref(false);
    const amenitiesInput = ref("");
    const newSpace = ref({
      code: "",
      name: "",
      property: "",
      type: "private_office",
      floor: 1,
      area: 0,
      capacity: null,
      base_rent: 0,
      price_per_day: null,
      description: ""
    });
    const { data: properties } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      () => `${PROPERTIES_API}/`,
      {
        headers: authHeaders()
      },
      "$944zlOtyJE"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/spaces",
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
      _push(`<div><h1 class="text-3xl font-bold">Add Space</h1><p class="text-muted-foreground">Register a new office space or room</p></div></div><form class="max-w-4xl space-y-8"><div class="space-y-4"><h2 class="text-xl font-semibold">Basic Information</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Space Code *</label><input${ssrRenderAttr("value", unref(newSpace).code)} type="text" placeholder="SP-001" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Space Name *</label><input${ssrRenderAttr("value", unref(newSpace).name)} type="text" placeholder="Conference Room A" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Property *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(newSpace).property) ? ssrLooseContain(unref(newSpace).property, "") : ssrLooseEqual(unref(newSpace).property, "")) ? " selected" : ""}>Select Property</option><!--[-->`);
      ssrRenderList(unref(properties), (prop) => {
        _push(`<option${ssrRenderAttr("value", prop.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(newSpace).property) ? ssrLooseContain(unref(newSpace).property, prop.id) : ssrLooseEqual(unref(newSpace).property, prop.id)) ? " selected" : ""}>${ssrInterpolate(prop.name)} (${ssrInterpolate(prop.code)}) </option>`);
      });
      _push(`<!--]--></select></div><div class="space-y-2"><label class="text-sm font-medium">Type *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value="private_office"${ssrIncludeBooleanAttr(Array.isArray(unref(newSpace).type) ? ssrLooseContain(unref(newSpace).type, "private_office") : ssrLooseEqual(unref(newSpace).type, "private_office")) ? " selected" : ""}>Private Office</option><option value="open_desk"${ssrIncludeBooleanAttr(Array.isArray(unref(newSpace).type) ? ssrLooseContain(unref(newSpace).type, "open_desk") : ssrLooseEqual(unref(newSpace).type, "open_desk")) ? " selected" : ""}>Open Desk</option><option value="meeting_room"${ssrIncludeBooleanAttr(Array.isArray(unref(newSpace).type) ? ssrLooseContain(unref(newSpace).type, "meeting_room") : ssrLooseEqual(unref(newSpace).type, "meeting_room")) ? " selected" : ""}>Meeting Room</option><option value="virtual_office"${ssrIncludeBooleanAttr(Array.isArray(unref(newSpace).type) ? ssrLooseContain(unref(newSpace).type, "virtual_office") : ssrLooseEqual(unref(newSpace).type, "virtual_office")) ? " selected" : ""}>Virtual Office</option><option value="hot_desk"${ssrIncludeBooleanAttr(Array.isArray(unref(newSpace).type) ? ssrLooseContain(unref(newSpace).type, "hot_desk") : ssrLooseEqual(unref(newSpace).type, "hot_desk")) ? " selected" : ""}>Hot Desk</option></select></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Location &amp; Specifications</h2><div class="grid md:grid-cols-3 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Floor *</label><input${ssrRenderAttr("value", unref(newSpace).floor)} type="number" placeholder="1" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Area (sqft) *</label><input${ssrRenderAttr("value", unref(newSpace).area)} type="number" placeholder="500" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Capacity (people)</label><input${ssrRenderAttr("value", unref(newSpace).capacity)} type="number" placeholder="10" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Pricing</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Base Rent (Monthly) *</label><input${ssrRenderAttr("value", unref(newSpace).base_rent)} type="number" placeholder="25000" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Price Per Day</label><input${ssrRenderAttr("value", unref(newSpace).price_per_day)} type="number" placeholder="1500" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Additional Details</h2><div class="space-y-4"><div class="space-y-2"><label class="text-sm font-medium">Amenities (comma-separated)</label><input${ssrRenderAttr("value", unref(amenitiesInput))} type="text" placeholder="WiFi, AC, Projector, Whiteboard" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Description</label><textarea rows="3" placeholder="Space description..." class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">${ssrInterpolate(unref(newSpace).description)}</textarea></div></div></div><div class="flex items-center gap-4 pt-4"><button type="button" class="px-4 py-2 border border-border rounded-lg hover:bg-muted"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(creating)) ? " disabled" : ""} class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(unref(creating) ? "Creating..." : "Create Space")}</button></div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/spaces/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=create-Dyl1OPaT.mjs.map
