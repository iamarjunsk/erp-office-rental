import { _ as __nuxt_component_0 } from "./nuxt-link-CrgyHNyr.js";
import { b as useRoute, u as useAuth, a as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, withAsyncContext, ref, watch, unref, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
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
const API_BASE = "http://localhost:8000/api/procurement";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { authHeaders } = useAuth();
    const { data: po, refresh: refreshPO } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/purchase-orders/${route.params.id}/`,
      {
        headers: authHeaders()
      },
      "$NfIXe7Sifb"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const showReceiptModal = ref(false);
    const sending = ref(false);
    const getStatusClass = (status) => {
      const classes = {
        draft: "bg-gray-100 text-gray-700",
        sent: "bg-blue-100 text-blue-700",
        acknowledged: "bg-cyan-100 text-cyan-700",
        partially_received: "bg-amber-100 text-amber-700",
        received: "bg-green-100 text-green-700"
      };
      return classes[status] || "bg-gray-100 text-gray-700";
    };
    const formatStatus = (status) => status?.split("_").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
    const formatDate = (date) => date ? new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "-";
    const formatDateTime = (date) => date ? new Date(date).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "-";
    const getHistoryIcon = (action) => {
      const icons = {
        "Created": "lucide:plus",
        "Submitted for Approval": "lucide:send",
        "Approved": "lucide:check",
        "Sent to Vendor": "lucide:mail",
        "Acknowledged by Vendor": "lucide:check-check"
      };
      return icons[action] || "lucide:circle";
    };
    const receiptForm = ref({
      receiptDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      grnNumber: "",
      notes: "",
      items: []
    });
    watch(showReceiptModal, (isOpen) => {
      if (isOpen && po.value?.items) {
        receiptForm.value.items = po.value.items.map((item) => ({
          itemName: item.item_name,
          orderedQty: item.quantity,
          previouslyReceived: item.received_quantity || 0,
          receiveNow: 0
        }));
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      if (unref(po)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-start justify-between"><div class="flex items-center gap-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/procurement/purchase-orders",
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
        _push(`<div><div class="flex items-center gap-3"><h1 class="text-3xl font-bold">${ssrInterpolate(unref(po).poNumber)}</h1><span class="${ssrRenderClass([getStatusClass(unref(po).status), "px-3 py-1 text-sm rounded-full font-medium"])}">${ssrInterpolate(formatStatus(unref(po).status))}</span></div><p class="text-muted-foreground">${ssrInterpolate(unref(po).title)}</p></div></div><div class="flex gap-2"><button class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:download",
          class: "w-4 h-4"
        }, null, _parent));
        _push(` Download PDF </button>`);
        if (unref(po).status === "draft") {
          _push(`<button${ssrIncludeBooleanAttr(unref(sending)) ? " disabled" : ""} class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:send",
            class: "w-4 h-4"
          }, null, _parent));
          _push(` ${ssrInterpolate(unref(sending) ? "Sending..." : "Send to Vendor")}</button>`);
        } else {
          _push(`<!---->`);
        }
        if (["sent", "acknowledged", "partially_received"].includes(unref(po).status)) {
          _push(`<button class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:package-check",
            class: "w-4 h-4"
          }, null, _parent));
          _push(` Record Receipt </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="grid lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="grid md:grid-cols-4 gap-4"><div class="bg-card border border-border rounded-xl p-4"><div class="text-sm text-muted-foreground">Subtotal</div><div class="text-xl font-bold">₹${ssrInterpolate(unref(po).subtotal?.toLocaleString())}</div></div><div class="bg-card border border-border rounded-xl p-4"><div class="text-sm text-muted-foreground">Tax (${ssrInterpolate(unref(po).tax_rate)}%)</div><div class="text-xl font-bold">₹${ssrInterpolate(unref(po).tax_amount?.toLocaleString())}</div></div><div class="bg-card border border-border rounded-xl p-4"><div class="text-sm text-muted-foreground">Shipping</div><div class="text-xl font-bold">₹${ssrInterpolate(unref(po).shipping_cost?.toLocaleString())}</div></div><div class="bg-card border border-border rounded-xl p-4 bg-primary/5"><div class="text-sm text-muted-foreground">Total</div><div class="text-xl font-bold text-primary">₹${ssrInterpolate(unref(po).total_amount?.toLocaleString())}</div></div></div><div class="bg-card border border-border rounded-xl overflow-hidden"><div class="p-4 border-b border-border"><h3 class="font-semibold">Order Items</h3></div><table class="w-full"><thead class="bg-muted/50"><tr><th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Item</th><th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Ordered</th><th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Received</th><th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Unit Price</th><th class="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Total</th></tr></thead><tbody class="divide-y divide-border"><!--[-->`);
        ssrRenderList(unref(po).items, (item) => {
          _push(`<tr><td class="px-4 py-3"><div class="font-medium">${ssrInterpolate(item.item_name)}</div><div class="text-xs text-muted-foreground">${ssrInterpolate(item.description)}</div></td><td class="px-4 py-3">${ssrInterpolate(item.quantity)} ${ssrInterpolate(item.unit)}</td><td class="px-4 py-3"><div class="flex items-center gap-2"><span class="${ssrRenderClass(item.received_quantity === item.quantity ? "text-green-600" : item.received_quantity > 0 ? "text-amber-600" : "text-gray-500")}">${ssrInterpolate(item.received_quantity || 0)}</span>`);
          if (item.received_quantity !== item.quantity) {
            _push(`<div class="flex-1 bg-gray-200 rounded-full h-1.5 max-w-[60px]"><div class="${ssrRenderClass([item.received_quantity > 0 ? "bg-amber-500" : "bg-gray-300", "h-1.5 rounded-full"])}" style="${ssrRenderStyle({ width: `${item.received_quantity / item.quantity * 100}%` })}"></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (item.received_quantity === item.quantity) {
            _push(ssrRenderComponent(_component_Icon, {
              name: "lucide:check-circle",
              class: "w-4 h-4 text-green-600"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div></td><td class="px-4 py-3">₹${ssrInterpolate(item.unit_price?.toLocaleString())}</td><td class="px-4 py-3 text-right font-medium">₹${ssrInterpolate(item.total_price?.toLocaleString())}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div><div class="bg-card border border-border rounded-xl p-6"><h3 class="font-semibold mb-4">Delivery Information</h3><div class="grid md:grid-cols-2 gap-6"><div><div class="text-sm text-muted-foreground mb-1">Delivery Date</div><div class="font-medium">${ssrInterpolate(formatDate(unref(po).delivery_date))}</div></div><div><div class="text-sm text-muted-foreground mb-1">Delivery Location</div><div class="font-medium">${ssrInterpolate(unref(po).delivery_location)}</div></div>`);
        if (unref(po).delivery_instructions) {
          _push(`<div class="md:col-span-2"><div class="text-sm text-muted-foreground mb-1">Special Instructions</div><div class="text-sm">${ssrInterpolate(unref(po).delivery_instructions)}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="bg-card border border-border rounded-xl p-6"><h3 class="font-semibold mb-4">Activity History</h3><div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(po).history, (event, index) => {
          _push(`<div class="flex gap-4"><div class="flex flex-col items-center"><div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: getHistoryIcon(event.action),
            class: "w-4 h-4 text-primary"
          }, null, _parent));
          _push(`</div>`);
          if (index < unref(po).history.length - 1) {
            _push(`<div class="w-px h-full bg-border mt-2"></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex-1 pb-4"><div class="font-medium">${ssrInterpolate(event.action)}</div><div class="text-sm text-muted-foreground">by ${ssrInterpolate(event.user)} • ${ssrInterpolate(formatDateTime(event.timestamp))}</div>`);
          if (event.notes) {
            _push(`<div class="mt-1 text-sm bg-muted/50 p-2 rounded">${ssrInterpolate(event.notes)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div></div><div class="space-y-6"><div class="bg-card border border-border rounded-xl p-6"><h3 class="font-semibold mb-4">Vendor</h3><div class="space-y-4"><div><div class="font-medium text-lg">${ssrInterpolate(unref(po).vendor?.name)}</div><div class="text-sm text-muted-foreground">${ssrInterpolate(unref(po).vendor?.address)}</div></div><div class="space-y-2 text-sm"><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:user",
          class: "w-4 h-4 text-muted-foreground"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(po).vendor?.contact?.name)}</span></div><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:mail",
          class: "w-4 h-4 text-muted-foreground"
        }, null, _parent));
        _push(`<a${ssrRenderAttr("href", `mailto:${unref(po).vendor?.contact?.email}`)} class="text-primary hover:underline">${ssrInterpolate(unref(po).vendor?.contact?.email)}</a></div><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:phone",
          class: "w-4 h-4 text-muted-foreground"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(po).vendor?.contact?.phone)}</span></div></div><div class="pt-2 border-t border-border text-sm"><div class="text-muted-foreground">GST Number</div><div class="font-mono">${ssrInterpolate(unref(po).vendor?.gstNumber)}</div></div></div></div><div class="bg-card border border-border rounded-xl p-6"><h3 class="font-semibold mb-4">Terms</h3><div class="space-y-3 text-sm"><div><div class="text-muted-foreground">Payment Terms</div><div>${ssrInterpolate(unref(po).terms)}</div></div>`);
        if (unref(po).paymentTerms) {
          _push(`<div><div class="text-muted-foreground">Payment Schedule</div><div>${ssrInterpolate(unref(po).paymentTerms)}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (unref(po).pr) {
          _push(`<div class="bg-card border border-border rounded-xl p-6"><h3 class="font-semibold mb-4">Related Requisition</h3>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/admin/procurement/requisitions/${unref(po).prId}`,
            class: "block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="font-medium text-primary"${_scopeId}>${ssrInterpolate(unref(po).pr.pr_number)}</div><div class="text-sm text-muted-foreground"${_scopeId}>${ssrInterpolate(unref(po).pr.title)}</div>`);
              } else {
                return [
                  createVNode("div", { class: "font-medium text-primary" }, toDisplayString(unref(po).pr.pr_number), 1),
                  createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(po).pr.title), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (unref(showReceiptModal)) {
          _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"><div class="bg-card rounded-xl w-full max-w-2xl m-4 max-h-[90vh] overflow-hidden"><div class="p-6 border-b border-border flex items-center justify-between"><h3 class="text-lg font-semibold">Record Goods Receipt</h3><button class="p-2 hover:bg-muted rounded-full">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:x",
            class: "w-5 h-5"
          }, null, _parent));
          _push(`</button></div><form class="p-6 overflow-y-auto max-h-[60vh]"><div class="space-y-4"><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Receipt Date *</label><input${ssrRenderAttr("value", unref(receiptForm).receiptDate)} type="date" class="w-full px-4 py-2 bg-background border border-border rounded-lg" required></div><div class="space-y-2"><label class="text-sm font-medium">Delivery Note / GRN Number</label><input${ssrRenderAttr("value", unref(receiptForm).grnNumber)} type="text" placeholder="e.g., GRN-2024-001" class="w-full px-4 py-2 bg-background border border-border rounded-lg"></div></div><div class="border border-border rounded-lg overflow-hidden"><table class="w-full text-sm"><thead class="bg-muted/50"><tr><th class="px-3 py-2 text-left">Item</th><th class="px-3 py-2 text-center">Ordered</th><th class="px-3 py-2 text-center">Previously Received</th><th class="px-3 py-2 text-center">Receive Now</th></tr></thead><tbody class="divide-y divide-border"><!--[-->`);
          ssrRenderList(unref(receiptForm).items, (item, index) => {
            _push(`<tr><td class="px-3 py-2">${ssrInterpolate(item.itemName)}</td><td class="px-3 py-2 text-center">${ssrInterpolate(item.orderedQty)}</td><td class="px-3 py-2 text-center">${ssrInterpolate(item.previouslyReceived)}</td><td class="px-3 py-2"><input${ssrRenderAttr("value", item.receiveNow)} type="number" min="0"${ssrRenderAttr("max", item.orderedQty - item.previouslyReceived)} class="w-20 px-2 py-1 text-center bg-background border border-border rounded"></td></tr>`);
          });
          _push(`<!--]--></tbody></table></div><div class="space-y-2"><label class="text-sm font-medium">Notes</label><textarea rows="2" placeholder="Any notes about the delivery..." class="w-full px-4 py-2 bg-background border border-border rounded-lg resize-none">${ssrInterpolate(unref(receiptForm).notes)}</textarea></div></div></form><div class="p-6 border-t border-border flex justify-end gap-3"><button type="button" class="px-4 py-2 border border-border rounded-lg hover:bg-muted"> Cancel </button><button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"> Record Receipt </button></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/procurement/purchase-orders/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_id_-Bbw0tvI0.js.map
