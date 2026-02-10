import { _ as __nuxt_component_0 } from './nuxt-link-CrgyHNyr.mjs';
import { b as useRoute, u as useAuth, a as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, unref, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
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
    const route = useRoute();
    const { authHeaders } = useAuth();
    const { data: pr, refresh: refreshPR } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/requisitions/${route.params.id}/`,
      {
        headers: authHeaders()
      },
      "$MwJtaisT0Q"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const getStatusClass = (status) => {
      const classes = {
        draft: "bg-gray-100 text-gray-700",
        pending_approval: "bg-amber-100 text-amber-700",
        approved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
        converted_to_po: "bg-blue-100 text-blue-700"
      };
      return classes[status] || "bg-gray-100 text-gray-700";
    };
    const getPriorityClass = (priority) => {
      const classes = {
        low: "bg-gray-100 text-gray-700",
        medium: "bg-blue-100 text-blue-700",
        high: "bg-amber-100 text-amber-700",
        urgent: "bg-red-100 text-red-700"
      };
      return classes[priority] || "bg-gray-100 text-gray-700";
    };
    const formatStatus = (status) => status == null ? void 0 : status.split("_").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
    const formatDate = (date) => date ? new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "-";
    const formatDateTime = (date) => date ? new Date(date).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "-";
    const getHistoryIcon = (action) => {
      const icons = {
        "Created": "lucide:plus",
        "Submitted for Approval": "lucide:send",
        "Submitted": "lucide:send",
        "Approved": "lucide:check",
        "Rejected": "lucide:x"
      };
      return icons[action] || "lucide:circle";
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      if (unref(pr)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-start justify-between"><div class="flex items-center gap-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/procurement/requisitions",
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
        _push(`<div><div class="flex items-center gap-3"><h1 class="text-3xl font-bold">${ssrInterpolate(unref(pr).prNumber)}</h1><span class="${ssrRenderClass([getStatusClass(unref(pr).status), "px-3 py-1 text-sm rounded-full font-medium"])}">${ssrInterpolate(formatStatus(unref(pr).status))}</span></div><p class="text-muted-foreground">${ssrInterpolate(unref(pr).title)}</p></div></div><div class="flex gap-2">`);
        if (unref(pr).status === "draft") {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/admin/procurement/requisitions/${unref(route).params.id}/edit`,
            class: "flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "lucide:edit",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(` Edit `);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "lucide:edit",
                    class: "w-4 h-4"
                  }),
                  createTextVNode(" Edit ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(pr).status === "draft") {
          _push(`<button class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:send",
            class: "w-4 h-4"
          }, null, _parent));
          _push(` Submit for Approval </button>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(pr).status === "pending_approval") {
          _push(`<button class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:check",
            class: "w-4 h-4"
          }, null, _parent));
          _push(` Approve </button>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(pr).status === "pending_approval") {
          _push(`<button class="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:x",
            class: "w-4 h-4"
          }, null, _parent));
          _push(` Reject </button>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(pr).status === "approved") {
          _push(`<button class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:arrow-right-circle",
            class: "w-4 h-4"
          }, null, _parent));
          _push(` Convert to PO </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="grid lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="grid md:grid-cols-3 gap-4"><div class="bg-card border border-border rounded-xl p-4"><div class="text-sm text-muted-foreground">Total Amount</div><div class="text-2xl font-bold">\u20B9${ssrInterpolate((_a = unref(pr).totalEstimatedAmount) == null ? void 0 : _a.toLocaleString())}</div></div><div class="bg-card border border-border rounded-xl p-4"><div class="text-sm text-muted-foreground">Items</div><div class="text-2xl font-bold">${ssrInterpolate(((_b = unref(pr).items) == null ? void 0 : _b.length) || 0)}</div></div><div class="bg-card border border-border rounded-xl p-4"><div class="text-sm text-muted-foreground">Required By</div><div class="text-2xl font-bold">${ssrInterpolate(formatDate(unref(pr).required_date))}</div></div></div><div class="bg-card border border-border rounded-xl overflow-hidden"><div class="p-4 border-b border-border"><h3 class="font-semibold">Line Items</h3></div><table class="w-full"><thead class="bg-muted/50"><tr><th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Item</th><th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Qty</th><th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Unit Price</th><th class="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Total</th></tr></thead><tbody class="divide-y divide-border"><!--[-->`);
        ssrRenderList(unref(pr).items, (item) => {
          var _a2, _b2;
          _push(`<tr><td class="px-4 py-3"><div class="font-medium">${ssrInterpolate(item.item_name)}</div><div class="text-xs text-muted-foreground">${ssrInterpolate(item.description)}</div></td><td class="px-4 py-3">${ssrInterpolate(item.quantity)} ${ssrInterpolate(item.unit)}</td><td class="px-4 py-3">\u20B9${ssrInterpolate((_a2 = item.estimated_unit_price) == null ? void 0 : _a2.toLocaleString())}</td><td class="px-4 py-3 text-right font-medium">\u20B9${ssrInterpolate((_b2 = item.total_estimated_price) == null ? void 0 : _b2.toLocaleString())}</td></tr>`);
        });
        _push(`<!--]--></tbody><tfoot class="bg-muted/30"><tr><td colspan="3" class="px-4 py-3 text-right font-medium">Total Estimated</td><td class="px-4 py-3 text-right text-lg font-bold">\u20B9${ssrInterpolate((_c = unref(pr).totalEstimatedAmount) == null ? void 0 : _c.toLocaleString())}</td></tr></tfoot></table></div><div class="bg-card border border-border rounded-xl p-6"><h3 class="font-semibold mb-3">Description</h3><p class="text-muted-foreground">${ssrInterpolate(unref(pr).description || "No description provided.")}</p></div><div class="bg-card border border-border rounded-xl p-6"><h3 class="font-semibold mb-4">Activity History</h3><div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(pr).history, (event, index) => {
          _push(`<div class="flex gap-4"><div class="flex flex-col items-center"><div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: getHistoryIcon(event.action),
            class: "w-4 h-4 text-primary"
          }, null, _parent));
          _push(`</div>`);
          if (index < unref(pr).history.length - 1) {
            _push(`<div class="w-px h-full bg-border mt-2"></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex-1 pb-4"><div class="font-medium">${ssrInterpolate(event.action)}</div><div class="text-sm text-muted-foreground">by ${ssrInterpolate(event.user)} \u2022 ${ssrInterpolate(formatDateTime(event.timestamp))}</div>`);
          if (event.notes) {
            _push(`<div class="mt-1 text-sm bg-muted/50 p-2 rounded">${ssrInterpolate(event.notes)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div></div><div class="space-y-6"><div class="bg-card border border-border rounded-xl p-6"><h3 class="font-semibold mb-4">Requester</h3><div class="flex items-center gap-3 mb-4"><div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"><span class="font-medium text-primary">${ssrInterpolate((_e = (_d = unref(pr).requestedBy) == null ? void 0 : _d.firstName) == null ? void 0 : _e[0])}${ssrInterpolate((_g = (_f = unref(pr).requestedBy) == null ? void 0 : _f.lastName) == null ? void 0 : _g[0])}</span></div><div><div class="font-medium">${ssrInterpolate((_h = unref(pr).requestedBy) == null ? void 0 : _h.firstName)} ${ssrInterpolate((_i = unref(pr).requestedBy) == null ? void 0 : _i.lastName)}</div><div class="text-sm text-muted-foreground">${ssrInterpolate((_j = unref(pr).requestedBy) == null ? void 0 : _j.email)}</div></div></div><div class="space-y-2 text-sm"><div class="flex justify-between"><span class="text-muted-foreground">Department</span><span>${ssrInterpolate(unref(pr).department)}</span></div><div class="flex justify-between"><span class="text-muted-foreground">Requested</span><span>${ssrInterpolate(formatDate(unref(pr).created_at))}</span></div></div></div><div class="bg-card border border-border rounded-xl p-6"><h3 class="font-semibold mb-4">Details</h3><div class="space-y-3 text-sm"><div class="flex justify-between"><span class="text-muted-foreground">Category</span><span class="capitalize">${ssrInterpolate((_k = unref(pr).category) == null ? void 0 : _k.replace("_", " "))}</span></div><div class="flex justify-between"><span class="text-muted-foreground">Priority</span><span class="${ssrRenderClass([getPriorityClass(unref(pr).priority), "px-2 py-0.5 rounded-full text-xs font-medium capitalize"])}">${ssrInterpolate(unref(pr).priority)}</span></div><div class="flex justify-between"><span class="text-muted-foreground">Property</span><span>${ssrInterpolate((_l = unref(pr).property) == null ? void 0 : _l.name)}</span></div></div></div>`);
        if (unref(pr).approvedBy || unref(pr).approvedAt) {
          _push(`<div class="bg-card border border-border rounded-xl p-6"><h3 class="font-semibold mb-4">Approval</h3><div class="flex items-center gap-3 mb-3"><div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:check",
            class: "w-5 h-5 text-green-600"
          }, null, _parent));
          _push(`</div><div><div class="font-medium">${ssrInterpolate((_m = unref(pr).approvedBy) == null ? void 0 : _m.firstName)} ${ssrInterpolate((_n = unref(pr).approvedBy) == null ? void 0 : _n.lastName)}</div><div class="text-xs text-muted-foreground">${ssrInterpolate(formatDateTime(unref(pr).approvedAt))}</div></div></div>`);
          if (unref(pr).rejection_reason) {
            _push(`<div class="text-sm bg-muted/50 p-3 rounded-lg">${ssrInterpolate(unref(pr).rejection_reason)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/procurement/requisitions/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BJI9SL9W.mjs.map
