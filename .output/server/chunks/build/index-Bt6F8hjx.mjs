import { _ as __nuxt_component_0 } from './nuxt-link-CrgyHNyr.mjs';
import { u as useAuth, b as useRoute, a as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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

const API_BASE = "http://localhost:8000/api/billing";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { authHeaders } = useAuth();
    const route = useRoute();
    const showPaymentModal = ref(false);
    const submittingPayment = ref(false);
    const { data: invoice, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/invoices/${route.params.id}/`,
      {
        headers: authHeaders()
      },
      "$7eqGun_Gvs"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const paymentForm = ref({
      amount: 0,
      payment_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      payment_method: "bank_transfer",
      transaction_id: "",
      notes: "",
      status: "completed"
    });
    const isOverdue = computed(() => {
      var _a, _b;
      if (((_a = invoice.value) == null ? void 0 : _a.balance_due) <= 0) return false;
      const dueDate = new Date((_b = invoice.value) == null ? void 0 : _b.due_date);
      return dueDate < /* @__PURE__ */ new Date();
    });
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2
      }).format(value || 0);
    };
    const formatDate = (date) => {
      if (!date) return "N/A";
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    };
    const formatDateTime = (date) => {
      if (!date) return "N/A";
      return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const downloading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$;
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
      _push(`<div class="flex-1"><div class="flex items-center gap-3"><h1 class="text-3xl font-bold">${ssrInterpolate((_a = unref(invoice)) == null ? void 0 : _a.invoice_number)}</h1><span class="${ssrRenderClass([{
        "bg-gray-100 text-gray-700": ((_b = unref(invoice)) == null ? void 0 : _b.status) === "draft",
        "bg-blue-100 text-blue-700": ((_c = unref(invoice)) == null ? void 0 : _c.status) === "sent",
        "bg-green-100 text-green-700": ((_d = unref(invoice)) == null ? void 0 : _d.status) === "paid",
        "bg-red-100 text-red-700": ((_e = unref(invoice)) == null ? void 0 : _e.status) === "overdue",
        "bg-amber-100 text-amber-700": ((_f = unref(invoice)) == null ? void 0 : _f.status) === "partial",
        "bg-slate-100 text-slate-700": ((_g = unref(invoice)) == null ? void 0 : _g.status) === "cancelled"
      }, "px-2 py-0.5 rounded-full text-xs font-medium capitalize"])}">${ssrInterpolate((_h = unref(invoice)) == null ? void 0 : _h.status)}</span></div><p class="text-muted-foreground mt-1 capitalize">${ssrInterpolate((_j = (_i = unref(invoice)) == null ? void 0 : _i.type) == null ? void 0 : _j.replace("_", " "))}</p></div><div class="flex gap-2"><button${ssrIncludeBooleanAttr(unref(downloading)) ? " disabled" : ""} class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted hover:scale-105 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none group">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: unref(downloading) ? "lucide:loader-2" : "lucide:download",
        class: ["w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5", { "animate-spin": unref(downloading) }]
      }, null, _parent));
      _push(`<span class="group-hover:font-medium transition-all">${ssrInterpolate(unref(downloading) ? "Downloading..." : "Download")}</span></button>`);
      if (((_k = unref(invoice)) == null ? void 0 : _k.balance_due) > 0) {
        _push(`<button class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:scale-105 hover:shadow-md transition-all duration-200 group">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:banknote",
          class: "w-4 h-4 transition-transform duration-200 group-hover:scale-110"
        }, null, _parent));
        _push(`<span class="group-hover:font-medium transition-all">Record Payment</span></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/admin/billing/${unref(route).params.id}/edit`,
        class: "flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted hover:scale-105 transition-all duration-200 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:pencil",
              class: "w-4 h-4 transition-transform duration-200 group-hover:rotate-12"
            }, null, _parent2, _scopeId));
            _push2(`<span class="group-hover:font-medium transition-all"${_scopeId}>Edit</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:pencil",
                class: "w-4 h-4 transition-transform duration-200 group-hover:rotate-12"
              }),
              createVNode("span", { class: "group-hover:font-medium transition-all" }, "Edit")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid md:grid-cols-3 gap-6"><div class="md:col-span-2 space-y-6"><div class="bg-card border border-border rounded-lg p-6 space-y-4"><div class="flex justify-between items-start"><div><h2 class="text-lg font-semibold">Invoice Details</h2><p class="text-sm text-muted-foreground">${ssrInterpolate((_m = (_l = unref(invoice)) == null ? void 0 : _l.company_details) == null ? void 0 : _m.name)}</p></div><div class="text-right"><p class="text-sm text-muted-foreground">Invoice Date</p><p class="font-medium">${ssrInterpolate(formatDate((_n = unref(invoice)) == null ? void 0 : _n.invoice_date))}</p></div></div><div class="grid grid-cols-2 gap-4 pt-4 border-t border-border"><div><p class="text-sm text-muted-foreground">Billing Period</p><p class="font-medium">${ssrInterpolate(formatDate((_o = unref(invoice)) == null ? void 0 : _o.period_start))} - ${ssrInterpolate(formatDate((_p = unref(invoice)) == null ? void 0 : _p.period_end))}</p></div><div><p class="text-sm text-muted-foreground">Due Date</p><p class="${ssrRenderClass([{ "text-red-500": unref(isOverdue) }, "font-medium"])}">${ssrInterpolate(formatDate((_q = unref(invoice)) == null ? void 0 : _q.due_date))}</p></div>`);
      if ((_r = unref(invoice)) == null ? void 0 : _r.lease_details) {
        _push(`<div><p class="text-sm text-muted-foreground">Related Lease</p><p class="font-medium">${ssrInterpolate(unref(invoice).lease_details.lease_number)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="bg-card border border-border rounded-lg overflow-hidden"><table class="w-full"><thead class="bg-muted"><tr><th class="px-4 py-3 text-left text-sm font-medium">Description</th><th class="px-4 py-3 text-right text-sm font-medium">Quantity</th><th class="px-4 py-3 text-right text-sm font-medium">Unit Price</th><th class="px-4 py-3 text-right text-sm font-medium">Total</th></tr></thead><tbody class="divide-y divide-border"><!--[-->`);
      ssrRenderList((_s = unref(invoice)) == null ? void 0 : _s.items, (item) => {
        _push(`<tr><td class="px-4 py-3 text-sm">${ssrInterpolate(item.description)}</td><td class="px-4 py-3 text-sm text-right">${ssrInterpolate(item.quantity)}</td><td class="px-4 py-3 text-sm text-right">${ssrInterpolate(formatCurrency(item.unit_price))}</td><td class="px-4 py-3 text-sm text-right font-medium">${ssrInterpolate(formatCurrency(item.line_total))}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="bg-card border border-border rounded-lg p-6"><div class="space-y-2 max-w-sm ml-auto"><div class="flex justify-between"><span class="text-muted-foreground">Subtotal</span><span>${ssrInterpolate(formatCurrency((_t = unref(invoice)) == null ? void 0 : _t.subtotal))}</span></div><div class="flex justify-between"><span class="text-muted-foreground">GST (${ssrInterpolate((_u = unref(invoice)) == null ? void 0 : _u.gst_rate)}%)</span><span>${ssrInterpolate(formatCurrency((_v = unref(invoice)) == null ? void 0 : _v.tax_amount))}</span></div>`);
      if (((_w = unref(invoice)) == null ? void 0 : _w.discount_amount) > 0) {
        _push(`<div class="flex justify-between"><span class="text-muted-foreground">Discount</span><span class="text-green-600">-${ssrInterpolate(formatCurrency((_x = unref(invoice)) == null ? void 0 : _x.discount_amount))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex justify-between pt-2 border-t border-border"><span class="font-semibold">Total</span><span class="text-xl font-bold">${ssrInterpolate(formatCurrency((_y = unref(invoice)) == null ? void 0 : _y.total_amount))}</span></div><div class="flex justify-between"><span class="text-muted-foreground">Amount Paid</span><span class="text-green-600">${ssrInterpolate(formatCurrency((_z = unref(invoice)) == null ? void 0 : _z.amount_paid))}</span></div><div class="flex justify-between pt-2 border-t border-border"><span class="font-semibold">Balance Due</span><span class="${ssrRenderClass([{ "text-red-500": ((_A = unref(invoice)) == null ? void 0 : _A.balance_due) > 0 }, "text-xl font-bold"])}">${ssrInterpolate(formatCurrency((_B = unref(invoice)) == null ? void 0 : _B.balance_due))}</span></div></div></div>`);
      if (((_C = unref(invoice)) == null ? void 0 : _C.terms) || ((_D = unref(invoice)) == null ? void 0 : _D.notes)) {
        _push(`<div class="bg-card border border-border rounded-lg p-6 space-y-4">`);
        if ((_E = unref(invoice)) == null ? void 0 : _E.terms) {
          _push(`<div><h3 class="font-semibold mb-2">Terms &amp; Conditions</h3><p class="text-muted-foreground whitespace-pre-line">${ssrInterpolate(unref(invoice).terms)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_F = unref(invoice)) == null ? void 0 : _F.notes) {
          _push(`<div><h3 class="font-semibold mb-2">Notes</h3><p class="text-muted-foreground whitespace-pre-line">${ssrInterpolate(unref(invoice).notes)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-6"><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Payment Status</h2><div class="space-y-3"><div class="flex justify-between"><span class="text-muted-foreground">Status</span><span class="${ssrRenderClass([{
        "bg-gray-100 text-gray-700": ((_G = unref(invoice)) == null ? void 0 : _G.status) === "draft",
        "bg-blue-100 text-blue-700": ((_H = unref(invoice)) == null ? void 0 : _H.status) === "sent",
        "bg-green-100 text-green-700": ((_I = unref(invoice)) == null ? void 0 : _I.status) === "paid",
        "bg-red-100 text-red-700": ((_J = unref(invoice)) == null ? void 0 : _J.status) === "overdue",
        "bg-amber-100 text-amber-700": ((_K = unref(invoice)) == null ? void 0 : _K.status) === "partial",
        "bg-slate-100 text-slate-700": ((_L = unref(invoice)) == null ? void 0 : _L.status) === "cancelled"
      }, "px-2 py-1 rounded-full text-xs font-medium capitalize"])}">${ssrInterpolate((_M = unref(invoice)) == null ? void 0 : _M.status)}</span></div><div class="flex justify-between"><span class="text-muted-foreground">Total Amount</span><span class="font-medium">${ssrInterpolate(formatCurrency((_N = unref(invoice)) == null ? void 0 : _N.total_amount))}</span></div><div class="flex justify-between"><span class="text-muted-foreground">Paid</span><span class="font-medium text-green-600">${ssrInterpolate(formatCurrency((_O = unref(invoice)) == null ? void 0 : _O.amount_paid))}</span></div><div class="flex justify-between pt-2 border-t border-border"><span class="text-muted-foreground">Balance</span><span class="${ssrRenderClass([{ "text-red-500": ((_P = unref(invoice)) == null ? void 0 : _P.balance_due) > 0 }, "font-bold"])}">${ssrInterpolate(formatCurrency((_Q = unref(invoice)) == null ? void 0 : _Q.balance_due))}</span></div></div>`);
      if (((_R = unref(invoice)) == null ? void 0 : _R.total_amount) > 0) {
        _push(`<div class="space-y-2"><div class="h-2 bg-muted rounded-full overflow-hidden"><div class="h-full bg-green-500 rounded-full transition-all" style="${ssrRenderStyle({ width: `${Math.min(((_S = unref(invoice)) == null ? void 0 : _S.amount_paid) / ((_T = unref(invoice)) == null ? void 0 : _T.total_amount) * 100, 100)}%` })}"></div></div><p class="text-xs text-muted-foreground text-center">${ssrInterpolate((((_U = unref(invoice)) == null ? void 0 : _U.amount_paid) / ((_V = unref(invoice)) == null ? void 0 : _V.total_amount) * 100).toFixed(1))}% Paid </p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Payment History</h2>`);
      if (((_X = (_W = unref(invoice)) == null ? void 0 : _W.payments) == null ? void 0 : _X.length) > 0) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(invoice).payments, (payment) => {
          _push(`<div class="p-3 border border-border rounded-lg"><div class="flex justify-between items-start"><div><p class="font-medium">${ssrInterpolate(formatCurrency(payment.amount))}</p><p class="text-sm text-muted-foreground capitalize">${ssrInterpolate(payment.payment_method.replace("_", " "))}</p></div><span class="${ssrRenderClass([{
            "bg-green-100 text-green-700": payment.status === "completed",
            "bg-amber-100 text-amber-700": payment.status === "pending",
            "bg-red-100 text-red-700": payment.status === "failed"
          }, "px-2 py-0.5 rounded-full text-xs font-medium"])}">${ssrInterpolate(payment.status)}</span></div><p class="text-xs text-muted-foreground mt-1">${ssrInterpolate(formatDate(payment.payment_date))}</p>`);
          if (payment.transaction_id) {
            _push(`<p class="text-xs font-mono mt-1">Ref: ${ssrInterpolate(payment.transaction_id)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-muted-foreground text-sm"> No payments recorded yet </div>`);
      }
      _push(`</div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Timeline</h2><div class="space-y-3 text-sm"><div class="flex justify-between"><span class="text-muted-foreground">Created</span><span>${ssrInterpolate(formatDateTime((_Y = unref(invoice)) == null ? void 0 : _Y.created_at))}</span></div><div class="flex justify-between"><span class="text-muted-foreground">Last Updated</span><span>${ssrInterpolate(formatDateTime((_Z = unref(invoice)) == null ? void 0 : _Z.updated_at))}</span></div></div></div></div></div>`);
      if (unref(showPaymentModal)) {
        _push(`<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div class="bg-background rounded-lg p-6 w-full max-w-md mx-4"><h2 class="text-xl font-bold mb-4">Record Payment</h2><form class="space-y-4"><div class="space-y-2"><label class="text-sm font-medium">Amount *</label><input${ssrRenderAttr("value", unref(paymentForm).amount)} type="number" step="0.01"${ssrRenderAttr("max", (__ = unref(invoice)) == null ? void 0 : __.balance_due)} class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><p class="text-xs text-muted-foreground">Balance Due: ${ssrInterpolate(formatCurrency((_$ = unref(invoice)) == null ? void 0 : _$.balance_due))}</p></div><div class="space-y-2"><label class="text-sm font-medium">Payment Date *</label><input${ssrRenderAttr("value", unref(paymentForm).payment_date)} type="date" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Payment Method *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value="cash"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "cash") : ssrLooseEqual(unref(paymentForm).payment_method, "cash")) ? " selected" : ""}>Cash</option><option value="cheque"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "cheque") : ssrLooseEqual(unref(paymentForm).payment_method, "cheque")) ? " selected" : ""}>Cheque</option><option value="bank_transfer"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "bank_transfer") : ssrLooseEqual(unref(paymentForm).payment_method, "bank_transfer")) ? " selected" : ""}>Bank Transfer</option><option value="upi"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "upi") : ssrLooseEqual(unref(paymentForm).payment_method, "upi")) ? " selected" : ""}>UPI</option><option value="credit_card"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "credit_card") : ssrLooseEqual(unref(paymentForm).payment_method, "credit_card")) ? " selected" : ""}>Credit Card</option><option value="debit_card"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "debit_card") : ssrLooseEqual(unref(paymentForm).payment_method, "debit_card")) ? " selected" : ""}>Debit Card</option><option value="netbanking"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "netbanking") : ssrLooseEqual(unref(paymentForm).payment_method, "netbanking")) ? " selected" : ""}>Net Banking</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Transaction ID</label><input${ssrRenderAttr("value", unref(paymentForm).transaction_id)} type="text" placeholder="Optional reference number" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Notes</label><textarea rows="2" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">${ssrInterpolate(unref(paymentForm).notes)}</textarea></div><div class="flex items-center gap-4 pt-4"><button type="button" class="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(submittingPayment)) ? " disabled" : ""} class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(unref(submittingPayment) ? "Recording..." : "Record Payment")}</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/billing/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Bt6F8hjx.mjs.map
