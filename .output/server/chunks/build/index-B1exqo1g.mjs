import { _ as __nuxt_component_0 } from './nuxt-link-CrgyHNyr.mjs';
import { u as useAuth, b as useRoute, a as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
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

const API_BASE = "http://localhost:8000/api/properties";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { authHeaders } = useAuth();
    const route = useRoute();
    const { data: property } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/${route.params.id}/`,
      {
        headers: authHeaders()
      },
      "$5WKbKOroJA"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
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
      _push(`<div class="flex-1"><h1 class="text-3xl font-bold">${ssrInterpolate((_a = unref(property)) == null ? void 0 : _a.name)}</h1><div class="flex items-center gap-2 text-muted-foreground mt-1">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:map-pin",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span>${ssrInterpolate((_b = unref(property)) == null ? void 0 : _b.city)}, ${ssrInterpolate((_c = unref(property)) == null ? void 0 : _c.state)}</span><span class="mx-2">\u2022</span><span class="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">${ssrInterpolate((_d = unref(property)) == null ? void 0 : _d.type.replace("_", " "))}</span></div></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/admin/properties/${unref(route).params.id}/edit`,
        class: "flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:pencil",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` Edit Property `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:pencil",
                class: "w-4 h-4"
              }),
              createTextVNode(" Edit Property ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid md:grid-cols-3 gap-6"><div class="md:col-span-2 space-y-6"><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Property Details</h2><div class="grid grid-cols-2 gap-6"><div><p class="text-sm text-muted-foreground">Property Code</p><p class="font-medium">${ssrInterpolate((_e = unref(property)) == null ? void 0 : _e.code)}</p></div><div><p class="text-sm text-muted-foreground">Status</p><span class="${ssrRenderClass([{
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400": ((_f = unref(property)) == null ? void 0 : _f.status) === "active",
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400": ((_g = unref(property)) == null ? void 0 : _g.status) === "inactive",
        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400": ((_h = unref(property)) == null ? void 0 : _h.status) === "under_renovation"
      }, "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1"])}">${ssrInterpolate((_i = unref(property)) == null ? void 0 : _i.status.replace("_", " "))}</span></div><div><p class="text-sm text-muted-foreground">Total Area</p><p class="font-medium">${ssrInterpolate((_k = (_j = unref(property)) == null ? void 0 : _j.total_area) == null ? void 0 : _k.toLocaleString())} sqft</p></div><div><p class="text-sm text-muted-foreground">Floors</p><p class="font-medium">${ssrInterpolate(((_l = unref(property)) == null ? void 0 : _l.floors) || "N/A")}</p></div><div><p class="text-sm text-muted-foreground">Build Year</p><p class="font-medium">${ssrInterpolate(((_m = unref(property)) == null ? void 0 : _m.build_year) || "N/A")}</p></div></div></div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Location</h2><div class="space-y-4"><div><p class="text-sm text-muted-foreground">Address</p><p class="font-medium">${ssrInterpolate((_n = unref(property)) == null ? void 0 : _n.address)}</p></div><div class="grid grid-cols-2 gap-4"><div><p class="text-sm text-muted-foreground">City</p><p class="font-medium">${ssrInterpolate((_o = unref(property)) == null ? void 0 : _o.city)}</p></div><div><p class="text-sm text-muted-foreground">State</p><p class="font-medium">${ssrInterpolate((_p = unref(property)) == null ? void 0 : _p.state)}</p></div><div><p class="text-sm text-muted-foreground">PIN Code</p><p class="font-medium">${ssrInterpolate((_q = unref(property)) == null ? void 0 : _q.pincode)}</p></div></div></div></div></div><div class="space-y-6"><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Management</h2><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:user",
        class: "w-5 h-5 text-primary"
      }, null, _parent));
      _push(`</div><div><p class="font-medium">${ssrInterpolate(((_r = unref(property)) == null ? void 0 : _r.manager_details) ? `${unref(property).manager_details.first_name} ${unref(property).manager_details.last_name}` : "Unassigned")}</p><p class="text-xs text-muted-foreground">Property Manager</p></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/properties/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B1exqo1g.mjs.map
