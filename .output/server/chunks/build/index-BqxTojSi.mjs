import { _ as __nuxt_component_0 } from './nuxt-link-CrgyHNyr.mjs';
import { u as useAuth, c as useToast, b as useRoute, a as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, withAsyncContext, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from 'vue/server-renderer';
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

const API_BASE = "http://localhost:8000/api/assets";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { authHeaders } = useAuth();
    useToast();
    const route = useRoute();
    const showAssignModal = ref(false);
    const showMaintenanceModal = ref(false);
    const assigning = ref(false);
    const returning = ref(false);
    const addingMaintenance = ref(false);
    const { data: asset, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/assets/${route.params.id}/`,
      {
        headers: authHeaders()
      },
      "$CCgOLwhjyD"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: users } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `http://localhost:8000/api/users/`,
      {
        headers: authHeaders()
      },
      "$_QvmWyf2hK"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const assignForm = ref({
      assigned_to: "",
      notes: ""
    });
    const maintenanceForm = ref({
      maintenance_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      description: "",
      cost: null,
      vendor_name: "",
      next_maintenance_date: ""
    });
    const formatCurrency = (value) => {
      if (!value) return "N/A";
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(value);
    };
    const formatDate = (date) => {
      if (!date) return "N/A";
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    };
    const getStatusClass = (status) => {
      const classes = {
        active: "bg-green-100 text-green-700",
        in_maintenance: "bg-amber-100 text-amber-700",
        damaged: "bg-red-100 text-red-700",
        disposed: "bg-gray-100 text-gray-700",
        lost: "bg-red-100 text-red-700"
      };
      return classes[status] || "bg-gray-100 text-gray-700";
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/assets",
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
      _push(`<div class="flex-1"><div class="flex items-center gap-3"><h1 class="text-3xl font-bold">${ssrInterpolate((_a = unref(asset)) == null ? void 0 : _a.name)}</h1><span class="${ssrRenderClass([getStatusClass((_b = unref(asset)) == null ? void 0 : _b.status), "px-2 py-0.5 rounded-full text-xs font-medium capitalize"])}">${ssrInterpolate((_d = (_c = unref(asset)) == null ? void 0 : _c.status) == null ? void 0 : _d.replace("_", " "))}</span></div><p class="text-muted-foreground mt-1">${ssrInterpolate((_e = unref(asset)) == null ? void 0 : _e.asset_code)}</p></div><div class="flex gap-2">`);
      if ((_f = unref(asset)) == null ? void 0 : _f.assigned_to) {
        _push(`<button${ssrIncludeBooleanAttr(unref(returning)) ? " disabled" : ""} class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: unref(returning) ? "lucide:loader-2" : "lucide:rotate-ccw",
          class: ["w-4 h-4", { "animate-spin": unref(returning) }]
        }, null, _parent));
        _push(` ${ssrInterpolate(unref(returning) ? "Returning..." : "Return")}</button>`);
      } else {
        _push(`<button class="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:user-plus",
          class: "w-4 h-4"
        }, null, _parent));
        _push(` Assign </button>`);
      }
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/admin/assets/${unref(route).params.id}/edit`,
        class: "flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:pencil",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` Edit `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:pencil",
                class: "w-4 h-4"
              }),
              createTextVNode(" Edit ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid md:grid-cols-3 gap-6"><div class="md:col-span-2 space-y-6"><div class="bg-card border border-border rounded-lg p-6"><h2 class="text-lg font-semibold mb-4">Description</h2><p class="text-muted-foreground">${ssrInterpolate(((_g = unref(asset)) == null ? void 0 : _g.description) || "No description provided")}</p></div><div class="bg-card border border-border rounded-lg p-6"><h2 class="text-lg font-semibold mb-4">Specifications</h2><div class="grid grid-cols-2 gap-4"><div><p class="text-sm text-muted-foreground">Manufacturer</p><p class="font-medium">${ssrInterpolate(((_h = unref(asset)) == null ? void 0 : _h.manufacturer) || "N/A")}</p></div><div><p class="text-sm text-muted-foreground">Model Number</p><p class="font-medium">${ssrInterpolate(((_i = unref(asset)) == null ? void 0 : _i.model_number) || "N/A")}</p></div><div><p class="text-sm text-muted-foreground">Serial Number</p><p class="font-medium">${ssrInterpolate(((_j = unref(asset)) == null ? void 0 : _j.serial_number) || "N/A")}</p></div><div><p class="text-sm text-muted-foreground">Condition</p><p class="font-medium capitalize">${ssrInterpolate((_k = unref(asset)) == null ? void 0 : _k.condition)}</p></div></div></div><div class="bg-card border border-border rounded-lg p-6"><div class="flex items-center justify-between mb-4"><h2 class="text-lg font-semibold">Maintenance History</h2><button class="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:plus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Add Record </button></div>`);
      if (((_m = (_l = unref(asset)) == null ? void 0 : _l.maintenance_history) == null ? void 0 : _m.length) > 0) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(asset).maintenance_history, (record) => {
          _push(`<div class="p-3 border border-border rounded-lg"><div class="flex justify-between items-start"><div><p class="font-medium">${ssrInterpolate(record.description)}</p><p class="text-sm text-muted-foreground">${ssrInterpolate(formatDate(record.maintenance_date))}</p></div><p class="font-medium">${ssrInterpolate(formatCurrency(record.cost))}</p></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-muted-foreground text-sm"> No maintenance records yet </div>`);
      }
      _push(`</div></div><div class="space-y-6"><div class="bg-card border border-border rounded-lg p-6"><h2 class="text-lg font-semibold mb-4">Location</h2><div class="space-y-3"><div><p class="text-sm text-muted-foreground">Property</p><p class="font-medium">${ssrInterpolate((_o = (_n = unref(asset)) == null ? void 0 : _n.property_details) == null ? void 0 : _o.name)}</p></div>`);
      if ((_p = unref(asset)) == null ? void 0 : _p.space_details) {
        _push(`<div><p class="text-sm text-muted-foreground">Space</p><p class="font-medium">${ssrInterpolate((_r = (_q = unref(asset)) == null ? void 0 : _q.space_details) == null ? void 0 : _r.code)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="bg-card border border-border rounded-lg p-6"><h2 class="text-lg font-semibold mb-4">Assignment</h2>`);
      if ((_s = unref(asset)) == null ? void 0 : _s.assigned_to_details) {
        _push(`<div><p class="text-sm text-muted-foreground">Assigned To</p><p class="font-medium">${ssrInterpolate(unref(asset).assigned_to_details.first_name)} ${ssrInterpolate(unref(asset).assigned_to_details.last_name)}</p></div>`);
      } else {
        _push(`<div><p class="text-muted-foreground">Not currently assigned</p></div>`);
      }
      _push(`</div><div class="bg-card border border-border rounded-lg p-6"><h2 class="text-lg font-semibold mb-4">Purchase Information</h2><div class="space-y-3 text-sm"><div class="flex justify-between"><span class="text-muted-foreground">Purchase Price</span><span class="font-medium">${ssrInterpolate(formatCurrency((_t = unref(asset)) == null ? void 0 : _t.purchase_price))}</span></div><div class="flex justify-between"><span class="text-muted-foreground">Purchase Date</span><span>${ssrInterpolate(formatDate((_u = unref(asset)) == null ? void 0 : _u.purchase_date))}</span></div></div></div></div></div>`);
      if (unref(showAssignModal)) {
        _push(`<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div class="bg-background rounded-lg p-6 w-full max-w-md mx-4"><h2 class="text-xl font-bold mb-4">Assign Asset</h2><form class="space-y-4"><div class="space-y-2"><label class="text-sm font-medium">Assign To *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assignForm).assigned_to) ? ssrLooseContain(unref(assignForm).assigned_to, "") : ssrLooseEqual(unref(assignForm).assigned_to, "")) ? " selected" : ""}>Select User</option><!--[-->`);
        ssrRenderList(unref(users), (user) => {
          _push(`<option${ssrRenderAttr("value", user.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(assignForm).assigned_to) ? ssrLooseContain(unref(assignForm).assigned_to, user.id) : ssrLooseEqual(unref(assignForm).assigned_to, user.id)) ? " selected" : ""}>${ssrInterpolate(user.first_name)} ${ssrInterpolate(user.last_name)}</option>`);
        });
        _push(`<!--]--></select></div><div class="flex items-center gap-4 pt-4"><button type="button" class="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(assigning)) ? " disabled" : ""} class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(unref(assigning) ? "Assigning..." : "Assign")}</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showMaintenanceModal)) {
        _push(`<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div class="bg-background rounded-lg p-6 w-full max-w-md mx-4"><h2 class="text-xl font-bold mb-4">Add Maintenance Record</h2><form class="space-y-4"><div class="space-y-2"><label class="text-sm font-medium">Date *</label><input${ssrRenderAttr("value", unref(maintenanceForm).maintenance_date)} type="date" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Description *</label><textarea rows="3" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>${ssrInterpolate(unref(maintenanceForm).description)}</textarea></div><div class="space-y-2"><label class="text-sm font-medium">Cost (Rs.)</label><input${ssrRenderAttr("value", unref(maintenanceForm).cost)} type="number" step="0.01" min="0" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="flex items-center gap-4 pt-4"><button type="button" class="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(addingMaintenance)) ? " disabled" : ""} class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(unref(addingMaintenance) ? "Adding..." : "Add")}</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/assets/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BqxTojSi.mjs.map
