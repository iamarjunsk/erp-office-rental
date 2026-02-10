import { _ as __nuxt_component_0 } from './nuxt-link-CrgyHNyr.mjs';
import { u as useAuth, b as useRoute, a as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
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

const API_BASE = "http://localhost:8000/api/spaces";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { authHeaders } = useAuth();
    const route = useRoute();
    const { data: space } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/${route.params.id}/`,
      {
        headers: authHeaders()
      },
      "$OTE_ohY_3v"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const formatCurrency = (value) => {
      if (!value) return "-";
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v;
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
      _push(`<div class="flex-1"><h1 class="text-3xl font-bold">${ssrInterpolate((_a = unref(space)) == null ? void 0 : _a.name)}</h1><div class="flex items-center gap-2 text-muted-foreground mt-1">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:building",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span>${ssrInterpolate((_c = (_b = unref(space)) == null ? void 0 : _b.property_details) == null ? void 0 : _c.name)}</span><span class="mx-2">\u2022</span><span class="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">${ssrInterpolate((_d = unref(space)) == null ? void 0 : _d.type.replace("_", " "))}</span></div></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/admin/spaces/${unref(route).params.id}/edit`,
        class: "flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:pencil",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` Edit Space `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:pencil",
                class: "w-4 h-4"
              }),
              createTextVNode(" Edit Space ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid md:grid-cols-3 gap-6"><div class="md:col-span-2 space-y-6"><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Space Details</h2><div class="grid grid-cols-2 gap-6"><div><p class="text-sm text-muted-foreground">Space Code</p><p class="font-medium">${ssrInterpolate((_e = unref(space)) == null ? void 0 : _e.code)}</p></div><div><p class="text-sm text-muted-foreground">Status</p><span class="${ssrRenderClass([{
        "bg-green-100 text-green-700": ((_f = unref(space)) == null ? void 0 : _f.current_status) === "available",
        "bg-blue-100 text-blue-700": ((_g = unref(space)) == null ? void 0 : _g.current_status) === "occupied",
        "bg-amber-100 text-amber-700": ((_h = unref(space)) == null ? void 0 : _h.current_status) === "maintenance",
        "bg-purple-100 text-purple-700": ((_i = unref(space)) == null ? void 0 : _i.current_status) === "reserved"
      }, "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1"])}">${ssrInterpolate((_j = unref(space)) == null ? void 0 : _j.current_status)}</span></div><div><p class="text-sm text-muted-foreground">Floor</p><p class="font-medium">${ssrInterpolate((_k = unref(space)) == null ? void 0 : _k.floor)}</p></div><div><p class="text-sm text-muted-foreground">Area</p><p class="font-medium">${ssrInterpolate(Number((_l = unref(space)) == null ? void 0 : _l.area).toLocaleString())} sqft</p></div><div><p class="text-sm text-muted-foreground">Capacity</p><p class="font-medium">${ssrInterpolate(((_m = unref(space)) == null ? void 0 : _m.capacity) || "N/A")} people</p></div></div></div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Pricing</h2><div class="grid grid-cols-2 gap-4"><div><p class="text-sm text-muted-foreground">Base Rent (Monthly)</p><p class="font-medium">${ssrInterpolate(formatCurrency((_n = unref(space)) == null ? void 0 : _n.base_rent))}</p></div><div><p class="text-sm text-muted-foreground">Price Per Day</p><p class="font-medium">${ssrInterpolate(formatCurrency((_o = unref(space)) == null ? void 0 : _o.price_per_day))}</p></div></div></div>`);
      if ((_q = (_p = unref(space)) == null ? void 0 : _p.amenities) == null ? void 0 : _q.length) {
        _push(`<div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Amenities</h2><div class="flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(unref(space).amenities, (amenity) => {
          _push(`<span class="px-3 py-1 bg-muted rounded-full text-sm">${ssrInterpolate(amenity)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_r = unref(space)) == null ? void 0 : _r.description) {
        _push(`<div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Description</h2><p class="text-muted-foreground">${ssrInterpolate(unref(space).description)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-6"><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Property</h2><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:building-2",
        class: "w-5 h-5 text-primary"
      }, null, _parent));
      _push(`</div><div><p class="font-medium">${ssrInterpolate((_t = (_s = unref(space)) == null ? void 0 : _s.property_details) == null ? void 0 : _t.name)}</p><p class="text-xs text-muted-foreground">${ssrInterpolate((_v = (_u = unref(space)) == null ? void 0 : _u.property_details) == null ? void 0 : _v.code)}</p></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/spaces/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-u9rW3pPL.mjs.map
