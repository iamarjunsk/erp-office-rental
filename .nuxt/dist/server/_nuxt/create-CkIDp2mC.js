import { _ as __nuxt_component_0 } from "./nuxt-link-CrgyHNyr.js";
import { u as useAuth, a as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, withCtx, createVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
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
const API_BASE = "http://localhost:8000/api";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { authHeaders } = useAuth();
    const creating = ref(false);
    const form = ref({
      invoice_number: "",
      company: "",
      lease: "",
      type: "rent",
      period_start: "",
      period_end: "",
      invoice_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      due_date: "",
      gst_rate: 18,
      discount_amount: 0,
      status: "draft",
      notes: "",
      terms: "Payment due within 30 days. Late payments subject to 2% monthly interest.",
      items: [
        { description: "", quantity: 1, unit_price: 0 }
      ]
    });
    const { data: companies } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/companies/`,
      {
        headers: authHeaders()
      },
      "$ANitT38mPd"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: leases } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/leases/`,
      {
        headers: authHeaders()
      },
      "$XDs_dNghrX"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const filteredLeases = computed(() => {
      if (!form.value.company) return leases.value || [];
      return (leases.value || []).filter((lease) => lease.company === parseInt(form.value.company));
    });
    watch(() => form.value.lease, (newLeaseId) => {
      if (newLeaseId) {
        const selectedLease = (leases.value || []).find((l) => l.id === parseInt(newLeaseId));
        if (selectedLease && selectedLease.rent_amount) {
          form.value.items[0] = {
            description: `Rent for ${selectedLease.lease_number}`,
            quantity: 1,
            unit_price: selectedLease.rent_amount
          };
          if (!form.value.company) {
            form.value.company = selectedLease.company;
          }
        }
      }
    });
    const subtotal = computed(() => {
      return form.value.items.reduce((sum, item) => {
        return sum + item.quantity * item.unit_price;
      }, 0);
    });
    const taxAmount = computed(() => {
      return subtotal.value * (form.value.gst_rate / 100);
    });
    const total = computed(() => {
      return subtotal.value + taxAmount.value - form.value.discount_amount;
    });
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2
      }).format(value || 0);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/billing",
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
      _push(`<div><h1 class="text-3xl font-bold">Create Invoice</h1><p class="text-muted-foreground">Generate a new invoice</p></div></div><form class="max-w-5xl space-y-8"><div class="space-y-4"><h2 class="text-xl font-semibold">Invoice Information</h2><div class="grid md:grid-cols-3 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Invoice Number *</label><input${ssrRenderAttr("value", unref(form).invoice_number)} type="text" placeholder="INV-2024-001" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Invoice Type *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value="rent"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "rent") : ssrLooseEqual(unref(form).type, "rent")) ? " selected" : ""}>Rent</option><option value="utility"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "utility") : ssrLooseEqual(unref(form).type, "utility")) ? " selected" : ""}>Utility</option><option value="maintenance"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "maintenance") : ssrLooseEqual(unref(form).type, "maintenance")) ? " selected" : ""}>Maintenance</option><option value="service"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "service") : ssrLooseEqual(unref(form).type, "service")) ? " selected" : ""}>Service</option><option value="deposit"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "deposit") : ssrLooseEqual(unref(form).type, "deposit")) ? " selected" : ""}>Security Deposit</option><option value="other"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "other") : ssrLooseEqual(unref(form).type, "other")) ? " selected" : ""}>Other</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Company *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).company) ? ssrLooseContain(unref(form).company, "") : ssrLooseEqual(unref(form).company, "")) ? " selected" : ""}>Select Company</option><!--[-->`);
      ssrRenderList(unref(companies), (company) => {
        _push(`<option${ssrRenderAttr("value", company.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).company) ? ssrLooseContain(unref(form).company, company.id) : ssrLooseEqual(unref(form).company, company.id)) ? " selected" : ""}>${ssrInterpolate(company.name)}</option>`);
      });
      _push(`<!--]--></select></div></div><div class="grid md:grid-cols-3 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Lease (Optional)</label><select${ssrIncludeBooleanAttr(!unref(form).company) ? " disabled" : ""} class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).lease) ? ssrLooseContain(unref(form).lease, "") : ssrLooseEqual(unref(form).lease, "")) ? " selected" : ""}>${ssrInterpolate(unref(form).company ? "Select Lease" : "Select company first")}</option><!--[-->`);
      ssrRenderList(unref(filteredLeases), (lease) => {
        _push(`<option${ssrRenderAttr("value", lease.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).lease) ? ssrLooseContain(unref(form).lease, lease.id) : ssrLooseEqual(unref(form).lease, lease.id)) ? " selected" : ""}>${ssrInterpolate(lease.lease_number)} - ${ssrInterpolate(formatCurrency(lease.rent_amount))}/month </option>`);
      });
      _push(`<!--]--></select>`);
      if (unref(form).lease) {
        _push(`<p class="text-xs text-green-600"> Rent amount auto-filled from lease </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-2"><label class="text-sm font-medium">Invoice Date *</label><input${ssrRenderAttr("value", unref(form).invoice_date)} type="date" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Due Date *</label><input${ssrRenderAttr("value", unref(form).due_date)} type="date" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Billing Period</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Period Start *</label><input${ssrRenderAttr("value", unref(form).period_start)} type="date" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Period End *</label><input${ssrRenderAttr("value", unref(form).period_end)} type="date" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div></div></div><div class="space-y-4"><div class="flex items-center justify-between"><h2 class="text-xl font-semibold">Invoice Items</h2><button type="button" class="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:plus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Add Item </button></div><div class="space-y-3"><!--[-->`);
      ssrRenderList(unref(form).items, (item, index) => {
        _push(`<div class="grid md:grid-cols-12 gap-3 items-start p-4 border border-border rounded-lg"><div class="md:col-span-5 space-y-2"><label class="text-sm font-medium">Description</label><input${ssrRenderAttr("value", item.description)} type="text" placeholder="Item description" class="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="md:col-span-2 space-y-2"><label class="text-sm font-medium">Quantity</label><input${ssrRenderAttr("value", item.quantity)} type="number" step="0.01" min="0.01" class="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="md:col-span-3 space-y-2"><label class="text-sm font-medium">Unit Price</label><input${ssrRenderAttr("value", item.unit_price)} type="number" step="0.01" min="0" class="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="md:col-span-2 space-y-2"><label class="text-sm font-medium">Total</label><div class="flex items-center gap-2"><p class="font-medium py-2">${ssrInterpolate(formatCurrency(item.quantity * item.unit_price))}</p>`);
        if (unref(form).items.length > 1) {
          _push(`<button type="button" class="p-2 text-red-500 hover:bg-red-50 rounded-lg">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:trash-2",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div><div class="bg-muted/50 rounded-lg p-4 space-y-2"><div class="flex justify-between"><span class="text-muted-foreground">Subtotal</span><span class="font-medium">${ssrInterpolate(formatCurrency(unref(subtotal)))}</span></div><div class="flex justify-between"><span class="text-muted-foreground">GST (${ssrInterpolate(unref(form).gst_rate)}%)</span><span class="font-medium">${ssrInterpolate(formatCurrency(unref(taxAmount)))}</span></div>`);
      if (unref(form).discount_amount > 0) {
        _push(`<div class="flex justify-between"><span class="text-muted-foreground">Discount</span><span class="font-medium text-green-600">-${ssrInterpolate(formatCurrency(unref(form).discount_amount))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex justify-between pt-2 border-t border-border"><span class="font-semibold">Total</span><span class="text-xl font-bold">${ssrInterpolate(formatCurrency(unref(total)))}</span></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Additional Settings</h2><div class="grid md:grid-cols-3 gap-4"><div class="space-y-2"><label class="text-sm font-medium">GST Rate (%)</label><input${ssrRenderAttr("value", unref(form).gst_rate)} type="number" step="0.01" min="0" max="100" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Discount Amount</label><input${ssrRenderAttr("value", unref(form).discount_amount)} type="number" step="0.01" min="0" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Terms &amp; Conditions</label><textarea rows="3" placeholder="Payment terms, late fees, etc." class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">${ssrInterpolate(unref(form).terms)}</textarea></div><div class="space-y-2"><label class="text-sm font-medium">Notes</label><textarea rows="3" placeholder="Additional notes..." class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">${ssrInterpolate(unref(form).notes)}</textarea></div></div></div><div class="flex items-center gap-4 pt-4"><button type="button" class="px-4 py-2 border border-border rounded-lg hover:bg-muted"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(creating)) ? " disabled" : ""} class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(unref(creating) ? "Creating..." : "Create Invoice")}</button></div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/billing/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=create-CkIDp2mC.js.map
