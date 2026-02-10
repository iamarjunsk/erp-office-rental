import { _ as __nuxt_component_0 } from './nuxt-link-CrgyHNyr.mjs';
import { u as useAuth, c as useToast, a as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
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

const API_BASE = "http://localhost:8000/api";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { authHeaders } = useAuth();
    useToast();
    const creating = ref(false);
    const form = ref({
      name: "",
      description: "",
      category: "",
      condition: "good",
      property: "",
      space: "",
      manufacturer: "",
      model_number: "",
      serial_number: "",
      specifications: "",
      purchase_date: "",
      purchase_price: null,
      vendor: "",
      warranty_expiry: "",
      useful_life_years: null,
      depreciation_rate: null,
      photo_url: "",
      document_url: "",
      notes: ""
    });
    const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/assets/categories/`,
      {
        headers: authHeaders()
      },
      "$lcqYiBAf7v"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: properties } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/properties/`,
      {
        headers: authHeaders()
      },
      "$XPJ2IHuY_Z"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: spaces } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/spaces/`,
      {
        headers: authHeaders()
      },
      "$Y1liyekxFV"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const filteredSpaces = computed(() => {
      if (!form.value.property) return [];
      return (spaces.value || []).filter((space) => {
        var _a;
        return space.property === parseInt(form.value.property) || ((_a = space.property_details) == null ? void 0 : _a.id) === parseInt(form.value.property);
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/assets",
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
      _push(`<div><h1 class="text-3xl font-bold">Add Asset</h1><p class="text-muted-foreground">Register a new facility asset</p></div></div><form class="max-w-4xl space-y-8"><div class="space-y-4"><h2 class="text-xl font-semibold">Basic Information</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2 md:col-span-2"><label class="text-sm font-medium">Asset Name *</label><input${ssrRenderAttr("value", unref(form).name)} type="text" placeholder="e.g., Dell Laptop Latitude 5520" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2 md:col-span-2"><label class="text-sm font-medium">Description</label><textarea rows="3" placeholder="Detailed description of the asset..." class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">${ssrInterpolate(unref(form).description)}</textarea></div><div class="space-y-2"><label class="text-sm font-medium">Category *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "") : ssrLooseEqual(unref(form).category, "")) ? " selected" : ""}>Select Category</option><!--[-->`);
      ssrRenderList(unref(categories), (cat) => {
        _push(`<option${ssrRenderAttr("value", cat.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, cat.id) : ssrLooseEqual(unref(form).category, cat.id)) ? " selected" : ""}>${ssrInterpolate(cat.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="space-y-2"><label class="text-sm font-medium">Condition *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value="excellent"${ssrIncludeBooleanAttr(Array.isArray(unref(form).condition) ? ssrLooseContain(unref(form).condition, "excellent") : ssrLooseEqual(unref(form).condition, "excellent")) ? " selected" : ""}>Excellent</option><option value="good"${ssrIncludeBooleanAttr(Array.isArray(unref(form).condition) ? ssrLooseContain(unref(form).condition, "good") : ssrLooseEqual(unref(form).condition, "good")) ? " selected" : ""}>Good</option><option value="fair"${ssrIncludeBooleanAttr(Array.isArray(unref(form).condition) ? ssrLooseContain(unref(form).condition, "fair") : ssrLooseEqual(unref(form).condition, "fair")) ? " selected" : ""}>Fair</option><option value="poor"${ssrIncludeBooleanAttr(Array.isArray(unref(form).condition) ? ssrLooseContain(unref(form).condition, "poor") : ssrLooseEqual(unref(form).condition, "poor")) ? " selected" : ""}>Poor</option></select></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Location</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Property *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).property) ? ssrLooseContain(unref(form).property, "") : ssrLooseEqual(unref(form).property, "")) ? " selected" : ""}>Select Property</option><!--[-->`);
      ssrRenderList(unref(properties), (prop) => {
        _push(`<option${ssrRenderAttr("value", prop.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).property) ? ssrLooseContain(unref(form).property, prop.id) : ssrLooseEqual(unref(form).property, prop.id)) ? " selected" : ""}>${ssrInterpolate(prop.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="space-y-2"><label class="text-sm font-medium">Space (Optional)</label><select${ssrIncludeBooleanAttr(!unref(form).property) ? " disabled" : ""} class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).space) ? ssrLooseContain(unref(form).space, "") : ssrLooseEqual(unref(form).space, "")) ? " selected" : ""}>${ssrInterpolate(unref(form).property ? "Select Space" : "Select property first")}</option><!--[-->`);
      ssrRenderList(unref(filteredSpaces), (space) => {
        _push(`<option${ssrRenderAttr("value", space.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).space) ? ssrLooseContain(unref(form).space, space.id) : ssrLooseEqual(unref(form).space, space.id)) ? " selected" : ""}>${ssrInterpolate(space.code)} - ${ssrInterpolate(space.name)}</option>`);
      });
      _push(`<!--]--></select></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Specifications</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Manufacturer</label><input${ssrRenderAttr("value", unref(form).manufacturer)} type="text" placeholder="e.g., Dell" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Model Number</label><input${ssrRenderAttr("value", unref(form).model_number)} type="text" placeholder="e.g., Latitude 5520" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Serial Number</label><input${ssrRenderAttr("value", unref(form).serial_number)} type="text" placeholder="Asset serial number" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2 md:col-span-2"><label class="text-sm font-medium">Specifications</label><textarea rows="3" placeholder="Technical specifications..." class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">${ssrInterpolate(unref(form).specifications)}</textarea></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Purchase Information</h2><div class="grid md:grid-cols-3 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Purchase Date</label><input${ssrRenderAttr("value", unref(form).purchase_date)} type="date" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Purchase Price (Rs.)</label><input${ssrRenderAttr("value", unref(form).purchase_price)} type="number" step="0.01" min="0" placeholder="0.00" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Vendor</label><input${ssrRenderAttr("value", unref(form).vendor)} type="text" placeholder="Vendor name" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Warranty Expiry</label><input${ssrRenderAttr("value", unref(form).warranty_expiry)} type="date" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Useful Life (Years)</label><input${ssrRenderAttr("value", unref(form).useful_life_years)} type="number" min="0" placeholder="5" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Depreciation Rate (%)</label><input${ssrRenderAttr("value", unref(form).depreciation_rate)} type="number" step="0.01" min="0" max="100" placeholder="20" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Additional Information</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Photo URL</label><input${ssrRenderAttr("value", unref(form).photo_url)} type="url" placeholder="https://..." class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Document URL</label><input${ssrRenderAttr("value", unref(form).document_url)} type="url" placeholder="https://..." class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2 md:col-span-2"><label class="text-sm font-medium">Notes</label><textarea rows="3" placeholder="Additional notes..." class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">${ssrInterpolate(unref(form).notes)}</textarea></div></div></div><div class="flex items-center gap-4 pt-4"><button type="button" class="px-4 py-2 border border-border rounded-lg hover:bg-muted"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(creating)) ? " disabled" : ""} class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(unref(creating) ? "Creating..." : "Create Asset")}</button></div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/assets/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=create-Cn75-BV0.mjs.map
