import { _ as __nuxt_component_0 } from './nuxt-link-CrgyHNyr.mjs';
import { u as useAuth, b as useRoute, a as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, withAsyncContext, watchEffect, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
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

const API_BASE = "http://localhost:8000/api";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "edit",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { authHeaders } = useAuth();
    const route = useRoute();
    const saving = ref(false);
    const { data: lease, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/leases/${route.params.id}/`,
      {
        headers: authHeaders()
      },
      "$SCoaJIwzl_"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: companies } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/companies/`,
      {
        headers: authHeaders()
      },
      "$KvdawZe-YF"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: spaces } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/spaces/`,
      {
        headers: authHeaders()
      },
      "$_Mr2K2yX7D"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const form = ref(null);
    watchEffect(() => {
      if (lease.value) {
        form.value = { ...lease.value };
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/admin/leases/${unref(route).params.id}`,
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
      _push(`<div><h1 class="text-3xl font-bold">Edit Lease</h1><p class="text-muted-foreground">Update lease information</p></div></div>`);
      if (unref(form)) {
        _push(`<form class="max-w-4xl space-y-8"><div class="space-y-4"><h2 class="text-xl font-semibold">Basic Information</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Lease Number *</label><input${ssrRenderAttr("value", unref(form).lease_number)} type="text" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Lease Type *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value="lease"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "lease") : ssrLooseEqual(unref(form).type, "lease")) ? " selected" : ""}>Lease</option><option value="license"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "license") : ssrLooseEqual(unref(form).type, "license")) ? " selected" : ""}>License</option><option value="coworking_membership"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "coworking_membership") : ssrLooseEqual(unref(form).type, "coworking_membership")) ? " selected" : ""}>Co-working Membership</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Company *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><!--[-->`);
        ssrRenderList(unref(companies), (company) => {
          _push(`<option${ssrRenderAttr("value", company.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).company) ? ssrLooseContain(unref(form).company, company.id) : ssrLooseEqual(unref(form).company, company.id)) ? " selected" : ""}>${ssrInterpolate(company.name)}</option>`);
        });
        _push(`<!--]--></select></div><div class="space-y-2"><label class="text-sm font-medium">Space *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><!--[-->`);
        ssrRenderList(unref(spaces), (space) => {
          _push(`<option${ssrRenderAttr("value", space.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).space) ? ssrLooseContain(unref(form).space, space.id) : ssrLooseEqual(unref(form).space, space.id)) ? " selected" : ""}>${ssrInterpolate(space.code)} - ${ssrInterpolate(space.name)}</option>`);
        });
        _push(`<!--]--></select></div><div class="space-y-2"><label class="text-sm font-medium">Status *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "draft") : ssrLooseEqual(unref(form).status, "draft")) ? " selected" : ""}>Draft</option><option value="active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "active") : ssrLooseEqual(unref(form).status, "active")) ? " selected" : ""}>Active</option><option value="expired"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "expired") : ssrLooseEqual(unref(form).status, "expired")) ? " selected" : ""}>Expired</option><option value="terminated"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "terminated") : ssrLooseEqual(unref(form).status, "terminated")) ? " selected" : ""}>Terminated</option></select></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Lease Dates</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Start Date *</label><input${ssrRenderAttr("value", unref(form).start_date)} type="date" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">End Date *</label><input${ssrRenderAttr("value", unref(form).end_date)} type="date" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Financial Terms</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Monthly Rent (INR) *</label><input${ssrRenderAttr("value", unref(form).rent_amount)} type="number" min="0" step="0.01" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Security Deposit (INR)</label><input${ssrRenderAttr("value", unref(form).security_deposit)} type="number" min="0" step="0.01" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Annual Rent Escalation (%)</label><input${ssrRenderAttr("value", unref(form).rent_escalation_percent)} type="number" min="0" max="100" step="0.01" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Notice Period (Days)</label><input${ssrRenderAttr("value", unref(form).notice_period_days)} type="number" min="0" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Additional Information</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Document URL</label><input${ssrRenderAttr("value", unref(form).document_url)} type="url" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2 md:col-span-2"><label class="text-sm font-medium">Notes</label><textarea rows="3" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">${ssrInterpolate(unref(form).notes)}</textarea></div></div></div><div class="flex items-center gap-4 pt-4"><button type="button" class="px-4 py-2 border border-border rounded-lg hover:bg-muted"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(unref(saving) ? "Saving..." : "Save Changes")}</button></div></form>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/leases/[id]/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=edit-XWTKT51E.mjs.map
