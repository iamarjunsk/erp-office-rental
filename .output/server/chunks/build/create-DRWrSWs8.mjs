import { _ as __nuxt_component_0 } from './nuxt-link-CrgyHNyr.mjs';
import { u as useAuth, a as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const creating = ref(false);
    const form = ref({
      name: "",
      legal_name: "",
      type: "pvt_ltd",
      industry: "",
      gstin: "",
      pan: "",
      cin: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      email: "",
      phone: "",
      website: "",
      credit_score: 0,
      notes: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
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
      _push(`<div><h1 class="text-3xl font-bold">Add Company</h1><p class="text-muted-foreground">Register a new tenant company</p></div></div><form class="max-w-4xl space-y-8"><div class="space-y-4"><h2 class="text-xl font-semibold">Basic Information</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Company Name *</label><input${ssrRenderAttr("value", unref(form).name)} type="text" placeholder="TechCorp Solutions" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Legal Name</label><input${ssrRenderAttr("value", unref(form).legal_name)} type="text" placeholder="TechCorp Solutions Pvt Ltd" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Company Type *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value="pvt_ltd"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "pvt_ltd") : ssrLooseEqual(unref(form).type, "pvt_ltd")) ? " selected" : ""}>Private Limited</option><option value="llp"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "llp") : ssrLooseEqual(unref(form).type, "llp")) ? " selected" : ""}>LLP</option><option value="partnership"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "partnership") : ssrLooseEqual(unref(form).type, "partnership")) ? " selected" : ""}>Partnership</option><option value="proprietorship"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "proprietorship") : ssrLooseEqual(unref(form).type, "proprietorship")) ? " selected" : ""}>Proprietorship</option><option value="public_ltd"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "public_ltd") : ssrLooseEqual(unref(form).type, "public_ltd")) ? " selected" : ""}>Public Limited</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Industry</label><input${ssrRenderAttr("value", unref(form).industry)} type="text" placeholder="Information Technology" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Registration Details</h2><div class="grid md:grid-cols-3 gap-4"><div class="space-y-2"><label class="text-sm font-medium">GSTIN</label><input${ssrRenderAttr("value", unref(form).gstin)} type="text" placeholder="27AABCU9603R1ZX" maxlength="15" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">PAN</label><input${ssrRenderAttr("value", unref(form).pan)} type="text" placeholder="AABCU9603R" maxlength="10" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">CIN</label><input${ssrRenderAttr("value", unref(form).cin)} type="text" placeholder="U72200MH2000PTC123456" maxlength="21" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Location</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2 md:col-span-2"><label class="text-sm font-medium">Address</label><input${ssrRenderAttr("value", unref(form).address)} type="text" placeholder="Full address" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">City</label><input${ssrRenderAttr("value", unref(form).city)} type="text" placeholder="Mumbai" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">State</label><input${ssrRenderAttr("value", unref(form).state)} type="text" placeholder="Maharashtra" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">PIN Code</label><input${ssrRenderAttr("value", unref(form).pincode)} type="text" placeholder="400001" maxlength="6" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Contact Information</h2><div class="grid md:grid-cols-3 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Email</label><input${ssrRenderAttr("value", unref(form).email)} type="email" placeholder="contact@company.com" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Phone</label><input${ssrRenderAttr("value", unref(form).phone)} type="text" placeholder="+91 98765 43210" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Website</label><input${ssrRenderAttr("value", unref(form).website)} type="url" placeholder="https://www.company.com" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Additional Details</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Credit Score (0-100)</label><input${ssrRenderAttr("value", unref(form).credit_score)} type="number" min="0" max="100" placeholder="75" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2 md:col-span-2"><label class="text-sm font-medium">Notes</label><textarea rows="3" placeholder="Additional notes about the company..." class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">${ssrInterpolate(unref(form).notes)}</textarea></div></div></div><div class="flex items-center gap-4 pt-4"><button type="button" class="px-4 py-2 border border-border rounded-lg hover:bg-muted"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(creating)) ? " disabled" : ""} class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(unref(creating) ? "Creating..." : "Create Company")}</button></div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/companies/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=create-DRWrSWs8.mjs.map
