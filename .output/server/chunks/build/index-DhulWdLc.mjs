import { _ as __nuxt_component_0 } from './nuxt-link-CrgyHNyr.mjs';
import { u as useAuth, a as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, ref, computed, mergeProps, withCtx, createVNode, createTextVNode, unref, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
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

const API_BASE = "http://localhost:8000/api/procurement";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { authHeaders } = useAuth();
    const { data: ordersData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/purchase-orders/`,
      {
        headers: authHeaders()
      },
      "$mexnnGip-m"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: statsData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/purchase-orders/stats/`,
      {
        headers: authHeaders()
      },
      "$DZNLAyG8dx"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const statusFilter = ref("");
    const orders = computed(() => {
      var _a;
      return ((_a = ordersData.value) == null ? void 0 : _a.results) || ordersData.value || [];
    });
    const stats = computed(() => statsData.value || {});
    const statusStats = computed(() => [
      { key: "draft", label: "Draft", count: stats.value.draft || 0, color: "text-gray-600" },
      { key: "sent", label: "Sent", count: stats.value.sent || 0, color: "text-blue-600" },
      { key: "acknowledged", label: "Acknowledged", count: stats.value.acknowledged || 0, color: "text-cyan-600" },
      { key: "partially_received", label: "Partial", count: stats.value.partially_received || 0, color: "text-amber-600" },
      { key: "received", label: "Received", count: stats.value.received || 0, color: "text-green-600" }
    ]);
    const filteredOrders = computed(() => {
      if (!statusFilter.value) return orders.value;
      return orders.value.filter((po) => po.status === statusFilter.value);
    });
    const getStatusClass = (status) => {
      const classes = {
        draft: "bg-gray-100 text-gray-700",
        sent: "bg-blue-100 text-blue-700",
        acknowledged: "bg-cyan-100 text-cyan-700",
        partially_received: "bg-amber-100 text-amber-700",
        received: "bg-green-100 text-green-700",
        closed: "bg-purple-100 text-purple-700"
      };
      return classes[status] || "bg-gray-100 text-gray-700";
    };
    const formatStatus = (status) => status == null ? void 0 : status.split("_").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
    const formatDate = (date) => date ? new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "-";
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/procurement",
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
      _push(`<div><h1 class="text-3xl font-bold">Purchase Orders</h1><p class="text-muted-foreground">Track orders and deliveries</p></div></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/procurement/purchase-orders/create",
        class: "flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:plus",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` New PO `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:plus",
                class: "w-4 h-4"
              }),
              createTextVNode(" New PO ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-5 gap-4"><!--[-->`);
      ssrRenderList(unref(statusStats), (stat) => {
        _push(`<div class="${ssrRenderClass([unref(statusFilter) === stat.key ? "ring-2 ring-primary" : "", "p-4 bg-card border border-border rounded-lg cursor-pointer hover:shadow-sm transition-shadow"])}"><div class="${ssrRenderClass([stat.color, "text-2xl font-bold"])}">${ssrInterpolate(stat.count)}</div><div class="text-sm text-muted-foreground">${ssrInterpolate(stat.label)}</div></div>`);
      });
      _push(`<!--]--></div><div class="bg-card border border-border rounded-xl overflow-hidden"><table class="w-full"><thead class="bg-muted/50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">PO Number</th><th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</th><th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Vendor</th><th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th><th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Delivery</th><th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th><th class="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th></tr></thead><tbody class="divide-y divide-border"><!--[-->`);
      ssrRenderList(unref(filteredOrders), (po) => {
        var _a, _b, _c, _d, _e;
        _push(`<tr class="hover:bg-muted/30 transition-colors"><td class="px-6 py-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/admin/procurement/purchase-orders/${po.id}`,
          class: "font-medium text-primary hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(po.poNumber)}`);
            } else {
              return [
                createTextVNode(toDisplayString(po.poNumber), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        if (po.pr) {
          _push(`<div class="text-xs text-muted-foreground">${ssrInterpolate(po.pr.prNumber)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</td><td class="px-6 py-4"><div class="font-medium">${ssrInterpolate(po.title)}</div><div class="text-xs text-muted-foreground">${ssrInterpolate((_a = po.items) == null ? void 0 : _a.length)} items</div></td><td class="px-6 py-4"><div class="font-medium">${ssrInterpolate((_b = po.vendor) == null ? void 0 : _b.name)}</div><div class="text-xs text-muted-foreground">${ssrInterpolate((_c = po.vendor) == null ? void 0 : _c.contact)}</div></td><td class="px-6 py-4 font-medium">\u20B9${ssrInterpolate((_d = po.totalAmount) == null ? void 0 : _d.toLocaleString())}</td><td class="px-6 py-4"><div class="text-sm">${ssrInterpolate(formatDate(po.deliveryDate))}</div><div class="text-xs text-muted-foreground">${ssrInterpolate((_e = po.deliveryLocation) == null ? void 0 : _e.split(",")[0])}</div></td><td class="px-6 py-4"><span class="${ssrRenderClass([getStatusClass(po.status), "px-2 py-1 text-xs rounded-full font-medium"])}">${ssrInterpolate(formatStatus(po.status))}</span></td><td class="px-6 py-4 text-right"><div class="flex items-center justify-end gap-2">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/admin/procurement/purchase-orders/${po.id}`,
          class: "p-2 hover:bg-muted rounded-lg",
          title: "View"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:eye",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "lucide:eye",
                  class: "w-4 h-4"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        if (["sent", "acknowledged", "partially_received"].includes(po.status)) {
          _push(`<button class="p-2 hover:bg-green-100 rounded-lg text-green-600" title="Record Receipt">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:package-check",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="p-2 hover:bg-muted rounded-lg" title="Download PDF">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:download",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/procurement/purchase-orders/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DhulWdLc.mjs.map
