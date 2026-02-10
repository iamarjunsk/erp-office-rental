import { _ as __nuxt_component_0 } from './nuxt-link-CrgyHNyr.mjs';
import { u as useAuth, c as useToast, b as useRoute, a as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, withAsyncContext, watchEffect, computed, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
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
  __name: "edit",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { authHeaders } = useAuth();
    useToast();
    const route = useRoute();
    const saving = ref(false);
    const { data: asset, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/assets/assets/${route.params.id}/`,
      {
        headers: authHeaders()
      },
      "$_3CxAdfqZG"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/assets/categories/`,
      {
        headers: authHeaders()
      },
      "$VfFsvxozej"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: properties } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/properties/`,
      {
        headers: authHeaders()
      },
      "$WWLXaRiD15"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: spaces } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/spaces/`,
      {
        headers: authHeaders()
      },
      "$VDgpy7bgiM"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const form = ref(null);
    watchEffect(() => {
      if (asset.value) {
        form.value = { ...asset.value };
      }
    });
    const filteredSpaces = computed(() => {
      var _a;
      if (!((_a = form.value) == null ? void 0 : _a.property)) return [];
      return (spaces.value || []).filter((space) => {
        var _a2;
        return space.property === form.value.property || ((_a2 = space.property_details) == null ? void 0 : _a2.id) === form.value.property;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/admin/assets/${unref(route).params.id}`,
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
      _push(`<div><h1 class="text-3xl font-bold">Edit Asset</h1><p class="text-muted-foreground">${ssrInterpolate((_a = unref(asset)) == null ? void 0 : _a.asset_code)}</p></div></div>`);
      if (unref(form)) {
        _push(`<form class="max-w-4xl space-y-8"><div class="space-y-4"><h2 class="text-xl font-semibold">Basic Information</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2 md:col-span-2"><label class="text-sm font-medium">Asset Name *</label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2 md:col-span-2"><label class="text-sm font-medium">Description</label><textarea rows="3" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">${ssrInterpolate(unref(form).description)}</textarea></div><div class="space-y-2"><label class="text-sm font-medium">Category</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "") : ssrLooseEqual(unref(form).category, "")) ? " selected" : ""}>Select Category</option><!--[-->`);
        ssrRenderList(unref(categories), (cat) => {
          _push(`<option${ssrRenderAttr("value", cat.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, cat.id) : ssrLooseEqual(unref(form).category, cat.id)) ? " selected" : ""}>${ssrInterpolate(cat.name)}</option>`);
        });
        _push(`<!--]--></select></div><div class="space-y-2"><label class="text-sm font-medium">Condition</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"><option value="excellent"${ssrIncludeBooleanAttr(Array.isArray(unref(form).condition) ? ssrLooseContain(unref(form).condition, "excellent") : ssrLooseEqual(unref(form).condition, "excellent")) ? " selected" : ""}>Excellent</option><option value="good"${ssrIncludeBooleanAttr(Array.isArray(unref(form).condition) ? ssrLooseContain(unref(form).condition, "good") : ssrLooseEqual(unref(form).condition, "good")) ? " selected" : ""}>Good</option><option value="fair"${ssrIncludeBooleanAttr(Array.isArray(unref(form).condition) ? ssrLooseContain(unref(form).condition, "fair") : ssrLooseEqual(unref(form).condition, "fair")) ? " selected" : ""}>Fair</option><option value="poor"${ssrIncludeBooleanAttr(Array.isArray(unref(form).condition) ? ssrLooseContain(unref(form).condition, "poor") : ssrLooseEqual(unref(form).condition, "poor")) ? " selected" : ""}>Poor</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Status</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"><option value="active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "active") : ssrLooseEqual(unref(form).status, "active")) ? " selected" : ""}>Active</option><option value="in_maintenance"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "in_maintenance") : ssrLooseEqual(unref(form).status, "in_maintenance")) ? " selected" : ""}>In Maintenance</option><option value="damaged"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "damaged") : ssrLooseEqual(unref(form).status, "damaged")) ? " selected" : ""}>Damaged</option><option value="disposed"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "disposed") : ssrLooseEqual(unref(form).status, "disposed")) ? " selected" : ""}>Disposed</option><option value="lost"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "lost") : ssrLooseEqual(unref(form).status, "lost")) ? " selected" : ""}>Lost</option></select></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Location</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Property *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><!--[-->`);
        ssrRenderList(unref(properties), (prop) => {
          _push(`<option${ssrRenderAttr("value", prop.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).property) ? ssrLooseContain(unref(form).property, prop.id) : ssrLooseEqual(unref(form).property, prop.id)) ? " selected" : ""}>${ssrInterpolate(prop.name)}</option>`);
        });
        _push(`<!--]--></select></div><div class="space-y-2"><label class="text-sm font-medium">Space</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).space) ? ssrLooseContain(unref(form).space, "") : ssrLooseEqual(unref(form).space, "")) ? " selected" : ""}>No Space</option><!--[-->`);
        ssrRenderList(unref(filteredSpaces), (space) => {
          _push(`<option${ssrRenderAttr("value", space.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).space) ? ssrLooseContain(unref(form).space, space.id) : ssrLooseEqual(unref(form).space, space.id)) ? " selected" : ""}>${ssrInterpolate(space.code)} - ${ssrInterpolate(space.name)}</option>`);
        });
        _push(`<!--]--></select></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Purchase Information</h2><div class="grid md:grid-cols-3 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Purchase Date</label><input${ssrRenderAttr("value", unref(form).purchase_date)} type="date" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Purchase Price (Rs.)</label><input${ssrRenderAttr("value", unref(form).purchase_price)} type="number" step="0.01" min="0" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Warranty Expiry</label><input${ssrRenderAttr("value", unref(form).warranty_expiry)} type="date" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Notes</h2><div class="space-y-2"><textarea rows="4" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">${ssrInterpolate(unref(form).notes)}</textarea></div></div><div class="flex items-center gap-4 pt-4"><button type="button" class="px-4 py-2 border border-border rounded-lg hover:bg-muted"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(unref(saving) ? "Saving..." : "Save Changes")}</button></div></form>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/assets/[id]/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=edit-NeQCKc92.mjs.map
