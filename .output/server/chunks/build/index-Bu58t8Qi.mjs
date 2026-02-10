import { u as useAuth, a as __nuxt_component_0 } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-CrgyHNyr.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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
    const { data: prData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/requisitions/`,
      {
        headers: authHeaders()
      },
      "$_VEyIFWQ7g"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: poData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/purchase-orders/`,
      {
        headers: authHeaders()
      },
      "$Mx2kOz7LRa"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: vendorData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/vendors/`,
      {
        headers: authHeaders()
      },
      "$k82c-INyNh"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const prStats = computed(() => {
      var _a;
      return ((_a = prData.value) == null ? void 0 : _a.stats) || { total: 0, pending_approval: 0 };
    });
    const poStats = computed(() => {
      var _a;
      return ((_a = poData.value) == null ? void 0 : _a.stats) || { total: 0, sent: 0, totalValue: 0 };
    });
    const vendorStats = computed(() => {
      var _a;
      return ((_a = vendorData.value) == null ? void 0 : _a.stats) || { active: 0 };
    });
    const pendingRequisitions = computed(
      () => {
        var _a;
        return (((_a = prData.value) == null ? void 0 : _a.results) || []).filter((pr) => pr.status === "pending_approval").slice(0, 3);
      }
    );
    const recentPOs = computed(() => {
      var _a;
      return (((_a = poData.value) == null ? void 0 : _a.results) || []).slice(0, 4);
    });
    const getStatusIcon = (status) => {
      const icons = {
        draft: "lucide:file-edit",
        sent: "lucide:send",
        acknowledged: "lucide:check",
        partially_received: "lucide:package",
        received: "lucide:package-check"
      };
      return icons[status] || "lucide:file";
    };
    const getStatusBgColor = (status) => {
      const colors = {
        draft: "bg-gray-100",
        sent: "bg-blue-100",
        acknowledged: "bg-cyan-100",
        partially_received: "bg-amber-100",
        received: "bg-green-100"
      };
      return colors[status] || "bg-gray-100";
    };
    const getStatusTextColor = (status) => {
      const colors = {
        draft: "text-gray-600",
        sent: "text-blue-600",
        acknowledged: "text-cyan-600",
        partially_received: "text-amber-600",
        received: "text-green-600"
      };
      return colors[status] || "text-gray-600";
    };
    const getStatusBadgeClass = (status) => {
      const classes = {
        draft: "bg-gray-100 text-gray-700",
        sent: "bg-blue-100 text-blue-700",
        acknowledged: "bg-cyan-100 text-cyan-700",
        partially_received: "bg-amber-100 text-amber-700",
        received: "bg-green-100 text-green-700"
      };
      return classes[status] || "bg-gray-100 text-gray-700";
    };
    const formatStatus = (status) => {
      return status.split("_").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold">Procurement</h1><p class="text-muted-foreground">Manage purchase requisitions, orders, and vendors</p></div></div><div class="grid gap-4 md:grid-cols-4"><div class="p-6 bg-card border border-border rounded-xl"><div class="flex items-center justify-between mb-4"><div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:file-text",
        class: "w-5 h-5 text-blue-600"
      }, null, _parent));
      _push(`</div><span class="text-xs text-amber-600 font-medium">${ssrInterpolate(unref(prStats).pending_approval)} pending</span></div><div class="text-2xl font-bold">${ssrInterpolate(unref(prStats).total)}</div><p class="text-sm text-muted-foreground">Purchase Requisitions</p></div><div class="p-6 bg-card border border-border rounded-xl"><div class="flex items-center justify-between mb-4"><div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:shopping-cart",
        class: "w-5 h-5 text-green-600"
      }, null, _parent));
      _push(`</div><span class="text-xs text-blue-600 font-medium">${ssrInterpolate(unref(poStats).sent)} in transit</span></div><div class="text-2xl font-bold">${ssrInterpolate(unref(poStats).total)}</div><p class="text-sm text-muted-foreground">Purchase Orders</p></div><div class="p-6 bg-card border border-border rounded-xl"><div class="flex items-center justify-between mb-4"><div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:users",
        class: "w-5 h-5 text-purple-600"
      }, null, _parent));
      _push(`</div></div><div class="text-2xl font-bold">${ssrInterpolate(unref(vendorStats).active)}</div><p class="text-sm text-muted-foreground">Active Vendors</p></div><div class="p-6 bg-card border border-border rounded-xl"><div class="flex items-center justify-between mb-4"><div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:indian-rupee",
        class: "w-5 h-5 text-amber-600"
      }, null, _parent));
      _push(`</div></div><div class="text-2xl font-bold">\u20B9${ssrInterpolate((unref(poStats).totalValue / 1e5).toFixed(1))}L</div><p class="text-sm text-muted-foreground">Total PO Value</p></div></div><div class="grid gap-4 md:grid-cols-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/procurement/requisitions",
        class: "p-6 bg-card border border-border rounded-xl hover:shadow-md transition-shadow group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between mb-4"${_scopeId}><div class="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:file-plus",
              class: "w-6 h-6 text-blue-600"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-right",
              class: "w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors"
            }, null, _parent2, _scopeId));
            _push2(`</div><h3 class="font-semibold mb-1"${_scopeId}>Purchase Requisitions</h3><p class="text-sm text-muted-foreground"${_scopeId}>Create and manage procurement requests</p>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                createVNode("div", { class: "w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors" }, [
                  createVNode(_component_Icon, {
                    name: "lucide:file-plus",
                    class: "w-6 h-6 text-blue-600"
                  })
                ]),
                createVNode(_component_Icon, {
                  name: "lucide:arrow-right",
                  class: "w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors"
                })
              ]),
              createVNode("h3", { class: "font-semibold mb-1" }, "Purchase Requisitions"),
              createVNode("p", { class: "text-sm text-muted-foreground" }, "Create and manage procurement requests")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/procurement/purchase-orders",
        class: "p-6 bg-card border border-border rounded-xl hover:shadow-md transition-shadow group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between mb-4"${_scopeId}><div class="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:shopping-cart",
              class: "w-6 h-6 text-green-600"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-right",
              class: "w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors"
            }, null, _parent2, _scopeId));
            _push2(`</div><h3 class="font-semibold mb-1"${_scopeId}>Purchase Orders</h3><p class="text-sm text-muted-foreground"${_scopeId}>Track orders and deliveries</p>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                createVNode("div", { class: "w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors" }, [
                  createVNode(_component_Icon, {
                    name: "lucide:shopping-cart",
                    class: "w-6 h-6 text-green-600"
                  })
                ]),
                createVNode(_component_Icon, {
                  name: "lucide:arrow-right",
                  class: "w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors"
                })
              ]),
              createVNode("h3", { class: "font-semibold mb-1" }, "Purchase Orders"),
              createVNode("p", { class: "text-sm text-muted-foreground" }, "Track orders and deliveries")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/procurement/vendors",
        class: "p-6 bg-card border border-border rounded-xl hover:shadow-md transition-shadow group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between mb-4"${_scopeId}><div class="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:building",
              class: "w-6 h-6 text-purple-600"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-right",
              class: "w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors"
            }, null, _parent2, _scopeId));
            _push2(`</div><h3 class="font-semibold mb-1"${_scopeId}>Vendor Directory</h3><p class="text-sm text-muted-foreground"${_scopeId}>Manage supplier relationships</p>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                createVNode("div", { class: "w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors" }, [
                  createVNode(_component_Icon, {
                    name: "lucide:building",
                    class: "w-6 h-6 text-purple-600"
                  })
                ]),
                createVNode(_component_Icon, {
                  name: "lucide:arrow-right",
                  class: "w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors"
                })
              ]),
              createVNode("h3", { class: "font-semibold mb-1" }, "Vendor Directory"),
              createVNode("p", { class: "text-sm text-muted-foreground" }, "Manage supplier relationships")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid gap-6 lg:grid-cols-2"><div class="bg-card border border-border rounded-xl"><div class="p-4 border-b border-border flex items-center justify-between"><h3 class="font-semibold">Pending Approvals</h3>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/procurement/requisitions?status=pending_approval",
        class: "text-sm text-primary hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View all`);
          } else {
            return [
              createTextVNode("View all")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="p-4 space-y-3"><!--[-->`);
      ssrRenderList(unref(pendingRequisitions), (pr) => {
        _push(`<div class="flex items-center justify-between p-3 bg-muted/50 rounded-lg"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:clock",
          class: "w-4 h-4 text-amber-600"
        }, null, _parent));
        _push(`</div><div><p class="font-medium text-sm">${ssrInterpolate(pr.title)}</p><p class="text-xs text-muted-foreground">${ssrInterpolate(pr.prNumber)} \u2022 \u20B9${ssrInterpolate(pr.totalEstimatedAmount.toLocaleString())}</p></div></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/admin/procurement/requisitions/${pr.id}`,
          class: "px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Review `);
            } else {
              return [
                createTextVNode(" Review ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      if (unref(pendingRequisitions).length === 0) {
        _push(`<div class="text-center py-4 text-muted-foreground text-sm"> No pending approvals </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="bg-card border border-border rounded-xl"><div class="p-4 border-b border-border flex items-center justify-between"><h3 class="font-semibold">Recent Purchase Orders</h3>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/procurement/purchase-orders",
        class: "text-sm text-primary hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View all`);
          } else {
            return [
              createTextVNode("View all")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="p-4 space-y-3"><!--[-->`);
      ssrRenderList(unref(recentPOs), (po) => {
        _push(`<div class="flex items-center justify-between p-3 bg-muted/50 rounded-lg"><div class="flex items-center gap-3"><div class="${ssrRenderClass([getStatusBgColor(po.status), "w-8 h-8 rounded-full flex items-center justify-center"])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: getStatusIcon(po.status),
          class: ["w-4 h-4", getStatusTextColor(po.status)]
        }, null, _parent));
        _push(`</div><div><p class="font-medium text-sm">${ssrInterpolate(po.title)}</p><p class="text-xs text-muted-foreground">${ssrInterpolate(po.poNumber)} \u2022 ${ssrInterpolate(po.vendor.name)}</p></div></div><span class="${ssrRenderClass([getStatusBadgeClass(po.status), "px-2 py-1 text-xs rounded-full font-medium"])}">${ssrInterpolate(formatStatus(po.status))}</span></div>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/procurement/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Bu58t8Qi.mjs.map
