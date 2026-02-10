import { _ as __nuxt_component_0 } from './nuxt-link-CrgyHNyr.mjs';
import { u as useAuth, b as useRoute, a as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
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

const API_BASE = "http://localhost:8000/api/companies";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { authHeaders } = useAuth();
    const route = useRoute();
    const { data: company } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/${route.params.id}/`,
      {
        headers: authHeaders()
      },
      "$eyF9we-ipX"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/companies",
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
      _push(`<div class="flex-1"><h1 class="text-3xl font-bold">${ssrInterpolate((_a = unref(company)) == null ? void 0 : _a.name)}</h1><div class="flex items-center gap-2 text-muted-foreground mt-1"><span class="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary uppercase">${ssrInterpolate((_b = unref(company)) == null ? void 0 : _b.type.replace("_", " "))}</span><span class="mx-2">\u2022</span><span>${ssrInterpolate(((_c = unref(company)) == null ? void 0 : _c.industry) || "No industry specified")}</span></div></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/admin/companies/${unref(route).params.id}/edit`,
        class: "flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:pencil",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` Edit Company `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:pencil",
                class: "w-4 h-4"
              }),
              createTextVNode(" Edit Company ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid md:grid-cols-3 gap-6"><div class="md:col-span-2 space-y-6"><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Company Details</h2><div class="grid grid-cols-2 gap-6"><div><p class="text-sm text-muted-foreground">Legal Name</p><p class="font-medium">${ssrInterpolate(((_d = unref(company)) == null ? void 0 : _d.legal_name) || ((_e = unref(company)) == null ? void 0 : _e.name))}</p></div><div><p class="text-sm text-muted-foreground">Status</p><span class="${ssrRenderClass([{
        "bg-green-100 text-green-700": ((_f = unref(company)) == null ? void 0 : _f.status) === "active",
        "bg-red-100 text-red-700": ((_g = unref(company)) == null ? void 0 : _g.status) === "inactive",
        "bg-gray-100 text-gray-700": ((_h = unref(company)) == null ? void 0 : _h.status) === "blacklisted"
      }, "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1"])}">${ssrInterpolate((_i = unref(company)) == null ? void 0 : _i.status)}</span></div><div><p class="text-sm text-muted-foreground">GSTIN</p><p class="font-medium font-mono">${ssrInterpolate(((_j = unref(company)) == null ? void 0 : _j.gstin) || "N/A")}</p></div><div><p class="text-sm text-muted-foreground">PAN</p><p class="font-medium font-mono">${ssrInterpolate(((_k = unref(company)) == null ? void 0 : _k.pan) || "N/A")}</p></div><div><p class="text-sm text-muted-foreground">CIN</p><p class="font-medium font-mono">${ssrInterpolate(((_l = unref(company)) == null ? void 0 : _l.cin) || "N/A")}</p></div></div></div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Location</h2><div class="space-y-4"><div><p class="text-sm text-muted-foreground">Address</p><p class="font-medium">${ssrInterpolate(((_m = unref(company)) == null ? void 0 : _m.address) || "N/A")}</p></div><div class="grid grid-cols-3 gap-4"><div><p class="text-sm text-muted-foreground">City</p><p class="font-medium">${ssrInterpolate(((_n = unref(company)) == null ? void 0 : _n.city) || "N/A")}</p></div><div><p class="text-sm text-muted-foreground">State</p><p class="font-medium">${ssrInterpolate(((_o = unref(company)) == null ? void 0 : _o.state) || "N/A")}</p></div><div><p class="text-sm text-muted-foreground">PIN Code</p><p class="font-medium">${ssrInterpolate(((_p = unref(company)) == null ? void 0 : _p.pincode) || "N/A")}</p></div></div></div></div>`);
      if ((_q = unref(company)) == null ? void 0 : _q.notes) {
        _push(`<div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Notes</h2><p class="text-muted-foreground">${ssrInterpolate(unref(company).notes)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-6"><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Contact</h2><div class="space-y-3">`);
      if ((_r = unref(company)) == null ? void 0 : _r.email) {
        _push(`<div class="flex items-center gap-3">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:mail",
          class: "w-4 h-4 text-muted-foreground"
        }, null, _parent));
        _push(`<a${ssrRenderAttr("href", `mailto:${unref(company).email}`)} class="text-primary hover:underline">${ssrInterpolate(unref(company).email)}</a></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_s = unref(company)) == null ? void 0 : _s.phone) {
        _push(`<div class="flex items-center gap-3">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:phone",
          class: "w-4 h-4 text-muted-foreground"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(company).phone)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_t = unref(company)) == null ? void 0 : _t.website) {
        _push(`<div class="flex items-center gap-3">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:globe",
          class: "w-4 h-4 text-muted-foreground"
        }, null, _parent));
        _push(`<a${ssrRenderAttr("href", unref(company).website)} target="_blank" class="text-primary hover:underline">${ssrInterpolate(unref(company).website)}</a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Credit Score</h2><div class="flex items-center gap-3"><div class="flex-1 h-3 bg-muted rounded-full overflow-hidden"><div class="${ssrRenderClass([{
        "bg-red-500": (((_u = unref(company)) == null ? void 0 : _u.credit_score) || 0) < 50,
        "bg-amber-500": (((_v = unref(company)) == null ? void 0 : _v.credit_score) || 0) >= 50 && (((_w = unref(company)) == null ? void 0 : _w.credit_score) || 0) < 75,
        "bg-green-500": (((_x = unref(company)) == null ? void 0 : _x.credit_score) || 0) >= 75
      }, "h-full rounded-full transition-all"])}" style="${ssrRenderStyle({ width: `${((_y = unref(company)) == null ? void 0 : _y.credit_score) || 0}%` })}"></div></div><span class="text-lg font-bold">${ssrInterpolate(((_z = unref(company)) == null ? void 0 : _z.credit_score) || 0)}</span></div><p class="text-xs text-muted-foreground">${ssrInterpolate((((_A = unref(company)) == null ? void 0 : _A.credit_score) || 0) >= 75 ? "Excellent" : (((_B = unref(company)) == null ? void 0 : _B.credit_score) || 0) >= 50 ? "Good" : "Poor")}</p></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/companies/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BWPm37m8.mjs.map
