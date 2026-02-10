import { u as useAuth, a as __nuxt_component_0 } from "../server.mjs";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-CrgyHNyr.js";
import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, withCtx, createVNode, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/hookable/dist/index.mjs";
import { u as useFetch } from "./fetch-DzFior15.js";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/unctx/dist/index.mjs";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/defu/dist/defu.mjs";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/ufo/dist/index.mjs";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/klona/dist/index.mjs";
import "@iconify/vue/dist/offline";
import "@iconify/vue";
import "radix-vue";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/ohash/dist/index.mjs";
import "@vue/shared";
import "/Users/arjunsk/Desktop/personal/Kimi_Agent_Nuxt ERP 需求补全/erp-office-rental/node_modules/perfect-debounce/dist/index.mjs";
const API_BASE = "http://localhost:8000/api/billing";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const debounce = (fn, delay) => {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
      };
    };
    const { authHeaders } = useAuth();
    const searchQuery = ref("");
    const statusFilter = ref("");
    const showPaymentModal = ref(false);
    const selectedInvoice = ref(null);
    const submittingPayment = ref(false);
    const downloadingId = ref(null);
    const paymentForm = ref({
      amount: 0,
      payment_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      payment_method: "bank_transfer",
      transaction_id: "",
      notes: "",
      status: "completed"
    });
    const { data, pending: loading, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      () => {
        const params = new URLSearchParams();
        if (searchQuery.value) params.append("search", searchQuery.value);
        if (statusFilter.value) params.append("status", statusFilter.value);
        return `${API_BASE}/invoices/?${params.toString()}`;
      },
      {
        headers: authHeaders(),
        watch: [statusFilter]
      },
      "$6eFuPHAiS3"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const invoices = computed(() => data.value || []);
    const stats = computed(() => {
      const allInvoices = invoices.value;
      const totalInvoiced = allInvoices.reduce((sum, inv) => sum + Number(inv.total_amount), 0);
      const totalPaid = allInvoices.reduce((sum, inv) => sum + Number(inv.amount_paid), 0);
      const outstanding = allInvoices.reduce((sum, inv) => sum + Number(inv.balance_due), 0);
      const today = /* @__PURE__ */ new Date();
      const overdueCount = allInvoices.filter((inv) => {
        const dueDate = new Date(inv.due_date);
        return inv.balance_due > 0 && dueDate < today;
      }).length;
      const thisMonthInvoices = allInvoices.filter((inv) => {
        const invDate = new Date(inv.invoice_date);
        return invDate.getMonth() === today.getMonth() && invDate.getFullYear() === today.getFullYear();
      });
      const thisMonth = thisMonthInvoices.reduce((sum, inv) => sum + Number(inv.total_amount), 0);
      return {
        totalInvoiced,
        totalPaid,
        outstanding,
        overdueCount,
        thisMonth,
        thisMonthCount: thisMonthInvoices.length
      };
    });
    watch(searchQuery, debounce(() => {
      refresh();
    }, 500));
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
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
    const isOverdue = (invoice) => {
      if (invoice.balance_due <= 0) return false;
      const dueDate = new Date(invoice.due_date);
      return dueDate < /* @__PURE__ */ new Date();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-3xl font-bold">Billing &amp; Invoices</h1><p class="text-muted-foreground">Manage invoices and payments</p></div><div class="flex gap-2"><button class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:download",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Export </button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/billing/create",
        class: "flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:plus",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` Create Invoice `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:plus",
                class: "w-4 h-4"
              }),
              createTextVNode(" Create Invoice ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid gap-4 md:grid-cols-4"><div class="bg-card border border-border rounded-lg p-4"><p class="text-sm text-muted-foreground">Total Invoiced</p><p class="text-2xl font-bold">${ssrInterpolate(formatCurrency(unref(stats).totalInvoiced))}</p><p class="text-xs text-muted-foreground">All time</p></div><div class="bg-card border border-border rounded-lg p-4"><p class="text-sm text-muted-foreground">Total Paid</p><p class="text-2xl font-bold">${ssrInterpolate(formatCurrency(unref(stats).totalPaid))}</p><p class="text-xs text-green-500">${ssrInterpolate(formatCurrency(unref(stats).totalPaid / unref(stats).totalInvoiced * 100))}% collection</p></div><div class="bg-card border border-border rounded-lg p-4"><p class="text-sm text-muted-foreground">Outstanding</p><p class="text-2xl font-bold">${ssrInterpolate(formatCurrency(unref(stats).outstanding))}</p><p class="${ssrRenderClass([unref(stats).overdueCount > 0 ? "text-red-500" : "text-muted-foreground", "text-xs"])}">${ssrInterpolate(unref(stats).overdueCount)} overdue </p></div><div class="bg-card border border-border rounded-lg p-4"><p class="text-sm text-muted-foreground">This Month</p><p class="text-2xl font-bold">${ssrInterpolate(formatCurrency(unref(stats).thisMonth))}</p><p class="text-xs text-muted-foreground">${ssrInterpolate(unref(stats).thisMonthCount)} invoices</p></div></div><div class="flex flex-col sm:flex-row gap-4"><div class="relative flex-1">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:search",
        class: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Search invoices..." class="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><select class="px-4 py-2 bg-card border border-border rounded-lg"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "") : ssrLooseEqual(unref(statusFilter), "")) ? " selected" : ""}>All Status</option><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "draft") : ssrLooseEqual(unref(statusFilter), "draft")) ? " selected" : ""}>Draft</option><option value="sent"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "sent") : ssrLooseEqual(unref(statusFilter), "sent")) ? " selected" : ""}>Sent</option><option value="paid"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "paid") : ssrLooseEqual(unref(statusFilter), "paid")) ? " selected" : ""}>Paid</option><option value="overdue"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "overdue") : ssrLooseEqual(unref(statusFilter), "overdue")) ? " selected" : ""}>Overdue</option><option value="partial"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "partial") : ssrLooseEqual(unref(statusFilter), "partial")) ? " selected" : ""}>Partial</option><option value="cancelled"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "cancelled") : ssrLooseEqual(unref(statusFilter), "cancelled")) ? " selected" : ""}>Cancelled</option></select></div><div class="bg-card border border-border rounded-lg overflow-hidden"><div class="overflow-x-auto"><table class="w-full"><thead class="bg-muted"><tr><th class="px-4 py-3 text-left text-sm font-medium">Invoice #</th><th class="px-4 py-3 text-left text-sm font-medium">Company</th><th class="px-4 py-3 text-left text-sm font-medium">Period</th><th class="px-4 py-3 text-left text-sm font-medium">Due Date</th><th class="px-4 py-3 text-left text-sm font-medium">Amount</th><th class="px-4 py-3 text-left text-sm font-medium">Balance</th><th class="px-4 py-3 text-left text-sm font-medium">Status</th><th class="px-4 py-3 text-left text-sm font-medium">Actions</th></tr></thead><tbody class="divide-y divide-border"><!--[-->`);
      ssrRenderList(unref(invoices), (invoice) => {
        _push(`<tr class="hover:bg-muted/50"><td class="px-4 py-3 text-sm font-medium">${ssrInterpolate(invoice.invoice_number)}</td><td class="px-4 py-3 text-sm">${ssrInterpolate(invoice.company_details?.name)}</td><td class="px-4 py-3 text-sm">${ssrInterpolate(formatDate(invoice.period_start))} - ${ssrInterpolate(formatDate(invoice.period_end))}</td><td class="${ssrRenderClass([{ "text-red-500": isOverdue(invoice) }, "px-4 py-3 text-sm"])}">${ssrInterpolate(formatDate(invoice.due_date))}</td><td class="px-4 py-3 text-sm font-medium">${ssrInterpolate(formatCurrency(invoice.total_amount))}</td><td class="px-4 py-3 text-sm">${ssrInterpolate(formatCurrency(invoice.balance_due))}</td><td class="px-4 py-3 text-sm"><span class="${ssrRenderClass([{
          "bg-gray-100 text-gray-700": invoice.status === "draft",
          "bg-blue-100 text-blue-700": invoice.status === "sent",
          "bg-green-100 text-green-700": invoice.status === "paid",
          "bg-red-100 text-red-700": invoice.status === "overdue",
          "bg-amber-100 text-amber-700": invoice.status === "partial",
          "bg-slate-100 text-slate-700": invoice.status === "cancelled"
        }, "px-2 py-1 rounded-full text-xs font-medium capitalize"])}">${ssrInterpolate(invoice.status)}</span></td><td class="px-4 py-3 text-sm"><div class="flex items-center gap-2"><button class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-all duration-200 hover:scale-110 group" title="View">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:eye",
          class: "w-4 h-4 transition-transform duration-200 group-hover:scale-110"
        }, null, _parent));
        _push(`</button><button${ssrIncludeBooleanAttr(unref(downloadingId) === invoice.id) ? " disabled" : ""} class="p-2 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 group" title="Download PDF">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: unref(downloadingId) === invoice.id ? "lucide:loader-2" : "lucide:download",
          class: ["w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5", { "animate-spin": unref(downloadingId) === invoice.id }]
        }, null, _parent));
        _push(`</button>`);
        if (invoice.balance_due > 0) {
          _push(`<button class="p-2 text-green-600 hover:text-green-700 rounded-lg hover:bg-green-50 transition-all duration-200 hover:scale-110 group" title="Record Payment">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:banknote",
            class: "w-4 h-4 transition-transform duration-200 group-hover:scale-110"
          }, null, _parent));
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></td></tr>`);
      });
      _push(`<!--]-->`);
      if (unref(invoices).length === 0) {
        _push(`<tr><td colspan="8" class="px-4 py-8 text-center text-muted-foreground"> No invoices found </td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div></div>`);
      if (unref(showPaymentModal)) {
        _push(`<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div class="bg-background rounded-lg p-6 w-full max-w-md mx-4"><h2 class="text-xl font-bold mb-4">Record Payment</h2><form class="space-y-4"><div class="space-y-2"><label class="text-sm font-medium">Invoice</label><p class="text-lg font-semibold">${ssrInterpolate(unref(selectedInvoice)?.invoice_number)}</p><p class="text-sm text-muted-foreground">Balance Due: ${ssrInterpolate(formatCurrency(unref(selectedInvoice)?.balance_due))}</p></div><div class="space-y-2"><label class="text-sm font-medium">Amount *</label><input${ssrRenderAttr("value", unref(paymentForm).amount)} type="number" step="0.01"${ssrRenderAttr("max", unref(selectedInvoice)?.balance_due)} class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Payment Date *</label><input${ssrRenderAttr("value", unref(paymentForm).payment_date)} type="date" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Payment Method *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value="cash"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "cash") : ssrLooseEqual(unref(paymentForm).payment_method, "cash")) ? " selected" : ""}>Cash</option><option value="cheque"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "cheque") : ssrLooseEqual(unref(paymentForm).payment_method, "cheque")) ? " selected" : ""}>Cheque</option><option value="bank_transfer"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "bank_transfer") : ssrLooseEqual(unref(paymentForm).payment_method, "bank_transfer")) ? " selected" : ""}>Bank Transfer</option><option value="upi"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "upi") : ssrLooseEqual(unref(paymentForm).payment_method, "upi")) ? " selected" : ""}>UPI</option><option value="credit_card"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "credit_card") : ssrLooseEqual(unref(paymentForm).payment_method, "credit_card")) ? " selected" : ""}>Credit Card</option><option value="debit_card"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "debit_card") : ssrLooseEqual(unref(paymentForm).payment_method, "debit_card")) ? " selected" : ""}>Debit Card</option><option value="netbanking"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "netbanking") : ssrLooseEqual(unref(paymentForm).payment_method, "netbanking")) ? " selected" : ""}>Net Banking</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Transaction ID</label><input${ssrRenderAttr("value", unref(paymentForm).transaction_id)} type="text" placeholder="Optional reference number" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Notes</label><textarea rows="2" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">${ssrInterpolate(unref(paymentForm).notes)}</textarea></div><div class="flex items-center gap-4 pt-4"><button type="button" class="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(submittingPayment)) ? " disabled" : ""} class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(unref(submittingPayment) ? "Recording..." : "Record Payment")}</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/billing/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-CzjHRmiz.js.map
