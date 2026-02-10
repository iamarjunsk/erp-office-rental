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
    const { data: invoice, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/billing/invoices/${route.params.id}/`,
      {
        headers: authHeaders()
      },
      "$E658gEp7jS"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: companies } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/companies/`,
      {
        headers: authHeaders()
      },
      "$3ndnBg7gLy"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const form = ref(null);
    watchEffect(() => {
      if (invoice.value) {
        form.value = { ...invoice.value };
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/admin/billing/${unref(route).params.id}`,
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
      _push(`<div><h1 class="text-3xl font-bold">Edit Invoice</h1><p class="text-muted-foreground">Update invoice information</p></div></div>`);
      if (unref(form)) {
        _push(`<form class="max-w-5xl space-y-8"><div class="space-y-4"><h2 class="text-xl font-semibold">Invoice Information</h2><div class="grid md:grid-cols-3 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Invoice Number *</label><input${ssrRenderAttr("value", unref(form).invoice_number)} type="text" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Invoice Type *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value="rent"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "rent") : ssrLooseEqual(unref(form).type, "rent")) ? " selected" : ""}>Rent</option><option value="utility"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "utility") : ssrLooseEqual(unref(form).type, "utility")) ? " selected" : ""}>Utility</option><option value="maintenance"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "maintenance") : ssrLooseEqual(unref(form).type, "maintenance")) ? " selected" : ""}>Maintenance</option><option value="service"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "service") : ssrLooseEqual(unref(form).type, "service")) ? " selected" : ""}>Service</option><option value="deposit"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "deposit") : ssrLooseEqual(unref(form).type, "deposit")) ? " selected" : ""}>Security Deposit</option><option value="other"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "other") : ssrLooseEqual(unref(form).type, "other")) ? " selected" : ""}>Other</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Status *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "draft") : ssrLooseEqual(unref(form).status, "draft")) ? " selected" : ""}>Draft</option><option value="sent"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "sent") : ssrLooseEqual(unref(form).status, "sent")) ? " selected" : ""}>Sent</option><option value="paid"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "paid") : ssrLooseEqual(unref(form).status, "paid")) ? " selected" : ""}>Paid</option><option value="overdue"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "overdue") : ssrLooseEqual(unref(form).status, "overdue")) ? " selected" : ""}>Overdue</option><option value="partial"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "partial") : ssrLooseEqual(unref(form).status, "partial")) ? " selected" : ""}>Partial</option><option value="cancelled"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "cancelled") : ssrLooseEqual(unref(form).status, "cancelled")) ? " selected" : ""}>Cancelled</option></select></div></div><div class="grid md:grid-cols-3 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Company *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><!--[-->`);
        ssrRenderList(unref(companies), (company) => {
          _push(`<option${ssrRenderAttr("value", company.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).company) ? ssrLooseContain(unref(form).company, company.id) : ssrLooseEqual(unref(form).company, company.id)) ? " selected" : ""}>${ssrInterpolate(company.name)}</option>`);
        });
        _push(`<!--]--></select></div><div class="space-y-2"><label class="text-sm font-medium">Invoice Date *</label><input${ssrRenderAttr("value", unref(form).invoice_date)} type="date" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Due Date *</label><input${ssrRenderAttr("value", unref(form).due_date)} type="date" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Billing Period</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Period Start *</label><input${ssrRenderAttr("value", unref(form).period_start)} type="date" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Period End *</label><input${ssrRenderAttr("value", unref(form).period_end)} type="date" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Additional Settings</h2><div class="grid md:grid-cols-3 gap-4"><div class="space-y-2"><label class="text-sm font-medium">GST Rate (%)</label><input${ssrRenderAttr("value", unref(form).gst_rate)} type="number" step="0.01" min="0" max="100" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Discount Amount</label><input${ssrRenderAttr("value", unref(form).discount_amount)} type="number" step="0.01" min="0" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Terms &amp; Conditions</label><textarea rows="3" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">${ssrInterpolate(unref(form).terms)}</textarea></div><div class="space-y-2"><label class="text-sm font-medium">Notes</label><textarea rows="3" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">${ssrInterpolate(unref(form).notes)}</textarea></div></div></div><div class="flex items-center gap-4 pt-4"><button type="button" class="px-4 py-2 border border-border rounded-lg hover:bg-muted"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(unref(saving) ? "Saving..." : "Save Changes")}</button></div></form>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/billing/[id]/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=edit-bbrszIZ1.mjs.map
