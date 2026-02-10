import { _ as __nuxt_component_0 } from './nuxt-link-CrgyHNyr.mjs';
import { u as useAuth, b as useRoute, a as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, withAsyncContext, mergeProps, withCtx, createVNode, unref, useSSRContext } from 'vue';
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

const API_BASE = "http://localhost:8000/api/maintenance";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { authHeaders } = useAuth();
    const route = useRoute();
    const updating = ref(false);
    const showAssignModal = ref(false);
    const showCompleteModal = ref(false);
    const assigning = ref(false);
    const completing = ref(false);
    const addingComment = ref(false);
    const newComment = ref("");
    const isInternalComment = ref(false);
    const { data: request, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/requests/${route.params.id}/`,
      {
        headers: authHeaders()
      },
      "$tQ0fDo-Q_y"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: users } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `http://localhost:8000/api/users/`,
      {
        headers: authHeaders()
      },
      "$F91O-cMIaW"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const assignForm = ref({
      assigned_to: ""
    });
    const completeForm = ref({
      actual_cost: null,
      resolution_notes: ""
    });
    const formatCurrency = (value) => {
      if (!value) return "N/A";
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2
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
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/maintenance",
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
      _push(`<div class="flex-1"><div class="flex items-center gap-3"><h1 class="text-3xl font-bold">${ssrInterpolate((_a = unref(request)) == null ? void 0 : _a.ticket_number)}</h1><span class="${ssrRenderClass([{
        "bg-blue-100 text-blue-700": ((_b = unref(request)) == null ? void 0 : _b.status) === "open",
        "bg-purple-100 text-purple-700": ((_c = unref(request)) == null ? void 0 : _c.status) === "assigned",
        "bg-amber-100 text-amber-700": ((_d = unref(request)) == null ? void 0 : _d.status) === "in_progress",
        "bg-yellow-100 text-yellow-700": ((_e = unref(request)) == null ? void 0 : _e.status) === "on_hold",
        "bg-green-100 text-green-700": ((_f = unref(request)) == null ? void 0 : _f.status) === "completed",
        "bg-gray-100 text-gray-700": ((_g = unref(request)) == null ? void 0 : _g.status) === "cancelled"
      }, "px-2 py-0.5 rounded-full text-xs font-medium capitalize"])}">${ssrInterpolate((_i = (_h = unref(request)) == null ? void 0 : _h.status) == null ? void 0 : _i.replace("_", " "))}</span><span class="${ssrRenderClass([{
        "bg-gray-100 text-gray-700": ((_j = unref(request)) == null ? void 0 : _j.priority) === "low",
        "bg-blue-100 text-blue-700": ((_k = unref(request)) == null ? void 0 : _k.priority) === "medium",
        "bg-amber-100 text-amber-700": ((_l = unref(request)) == null ? void 0 : _l.priority) === "high",
        "bg-red-100 text-red-700": ((_m = unref(request)) == null ? void 0 : _m.priority) === "urgent"
      }, "px-2 py-0.5 rounded-full text-xs font-medium capitalize"])}">${ssrInterpolate((_n = unref(request)) == null ? void 0 : _n.priority)}</span></div><p class="text-muted-foreground mt-1">${ssrInterpolate((_o = unref(request)) == null ? void 0 : _o.title)}</p></div><div class="flex gap-2">`);
      if (((_p = unref(request)) == null ? void 0 : _p.status) === "open") {
        _push(`<button class="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 hover:scale-105 group">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:user-plus",
          class: "w-4 h-4 transition-transform group-hover:scale-110"
        }, null, _parent));
        _push(`<span class="group-hover:font-medium">Assign</span></button>`);
      } else {
        _push(`<!---->`);
      }
      if (((_q = unref(request)) == null ? void 0 : _q.status) === "assigned") {
        _push(`<button${ssrIncludeBooleanAttr(unref(updating)) ? " disabled" : ""} class="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-200 hover:scale-105 group disabled:opacity-50">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: unref(updating) ? "lucide:loader-2" : "lucide:play",
          class: ["w-4 h-4 transition-transform group-hover:scale-110", { "animate-spin": unref(updating) }]
        }, null, _parent));
        _push(`<span class="group-hover:font-medium">${ssrInterpolate(unref(updating) ? "Starting..." : "Start Work")}</span></button>`);
      } else {
        _push(`<!---->`);
      }
      if (["assigned", "in_progress", "on_hold"].includes((_r = unref(request)) == null ? void 0 : _r.status)) {
        _push(`<button class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 hover:scale-105 group">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:check-circle",
          class: "w-4 h-4 transition-transform group-hover:scale-110"
        }, null, _parent));
        _push(`<span class="group-hover:font-medium">Complete</span></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/admin/maintenance/${unref(route).params.id}/edit`,
        class: "flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-all duration-200 hover:scale-105 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:pencil",
              class: "w-4 h-4 transition-transform group-hover:rotate-12"
            }, null, _parent2, _scopeId));
            _push2(`<span class="group-hover:font-medium"${_scopeId}>Edit</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:pencil",
                class: "w-4 h-4 transition-transform group-hover:rotate-12"
              }),
              createVNode("span", { class: "group-hover:font-medium" }, "Edit")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid md:grid-cols-3 gap-6"><div class="md:col-span-2 space-y-6"><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Description</h2><p class="text-muted-foreground whitespace-pre-line">${ssrInterpolate((_s = unref(request)) == null ? void 0 : _s.description)}</p></div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Location</h2><div class="grid grid-cols-2 gap-4"><div><p class="text-sm text-muted-foreground">Property</p><p class="font-medium">${ssrInterpolate((_u = (_t = unref(request)) == null ? void 0 : _t.property_details) == null ? void 0 : _u.name)}</p></div>`);
      if ((_v = unref(request)) == null ? void 0 : _v.space_details) {
        _push(`<div><p class="text-sm text-muted-foreground">Space</p><p class="font-medium">${ssrInterpolate((_x = (_w = unref(request)) == null ? void 0 : _w.space_details) == null ? void 0 : _x.code)} - ${ssrInterpolate((_z = (_y = unref(request)) == null ? void 0 : _y.space_details) == null ? void 0 : _z.name)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_A = unref(request)) == null ? void 0 : _A.specific_location) {
        _push(`<div><p class="text-sm text-muted-foreground">Specific Location</p><p class="font-medium">${ssrInterpolate((_B = unref(request)) == null ? void 0 : _B.specific_location)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><p class="text-sm text-muted-foreground">Category</p><p class="font-medium">${ssrInterpolate(((_D = (_C = unref(request)) == null ? void 0 : _C.category_details) == null ? void 0 : _D.name) || "Uncategorized")}</p></div></div></div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold">Tasks</h2><button class="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:plus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Add Task </button></div>`);
      if (((_F = (_E = unref(request)) == null ? void 0 : _E.tasks) == null ? void 0 : _F.length) > 0) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(request).tasks, (task) => {
          var _a2, _b2;
          _push(`<div class="flex items-center justify-between p-3 border border-border rounded-lg"><div><p class="font-medium">${ssrInterpolate(task.description)}</p><p class="text-sm text-muted-foreground">${ssrInterpolate((_a2 = task.assigned_to_details) == null ? void 0 : _a2.first_name)} ${ssrInterpolate((_b2 = task.assigned_to_details) == null ? void 0 : _b2.last_name)}</p></div><span class="${ssrRenderClass([{
            "bg-gray-100 text-gray-700": task.status === "pending",
            "bg-amber-100 text-amber-700": task.status === "in_progress",
            "bg-green-100 text-green-700": task.status === "completed"
          }, "px-2 py-1 rounded-full text-xs font-medium capitalize"])}">${ssrInterpolate(task.status.replace("_", " "))}</span></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-muted-foreground text-sm"> No tasks added yet </div>`);
      }
      _push(`</div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Comments</h2>`);
      if (((_H = (_G = unref(request)) == null ? void 0 : _G.comments) == null ? void 0 : _H.length) > 0) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(request).comments, (comment) => {
          var _a2, _b2;
          _push(`<div class="p-3 border border-border rounded-lg"><div class="flex items-center justify-between mb-2"><span class="font-medium">${ssrInterpolate((_a2 = comment.author_details) == null ? void 0 : _a2.first_name)} ${ssrInterpolate((_b2 = comment.author_details) == null ? void 0 : _b2.last_name)}</span><span class="text-xs text-muted-foreground">${ssrInterpolate(formatDateTime(comment.created_at))}</span></div><p class="text-sm">${ssrInterpolate(comment.comment)}</p>`);
          if (comment.is_internal) {
            _push(`<span class="text-xs text-amber-600 mt-1 block">Internal note</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-muted-foreground text-sm"> No comments yet </div>`);
      }
      _push(`<div class="space-y-3 pt-4 border-t border-border"><textarea rows="3" placeholder="Add a comment..." class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">${ssrInterpolate(unref(newComment))}</textarea><div class="flex items-center justify-between"><label class="flex items-center gap-2 text-sm"><input${ssrIncludeBooleanAttr(Array.isArray(unref(isInternalComment)) ? ssrLooseContain(unref(isInternalComment), null) : unref(isInternalComment)) ? " checked" : ""} type="checkbox" class="rounded"><span>Internal note</span></label><button${ssrIncludeBooleanAttr(!unref(newComment) || unref(addingComment)) ? " disabled" : ""} class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(unref(addingComment) ? "Adding..." : "Add Comment")}</button></div></div></div></div><div class="space-y-6"><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Assignment</h2><div class="space-y-3"><div><p class="text-sm text-muted-foreground">Reported By</p><p class="font-medium">${ssrInterpolate((_J = (_I = unref(request)) == null ? void 0 : _I.reported_by_details) == null ? void 0 : _J.first_name)} ${ssrInterpolate((_L = (_K = unref(request)) == null ? void 0 : _K.reported_by_details) == null ? void 0 : _L.last_name)}</p></div><div><p class="text-sm text-muted-foreground">Assigned To</p>`);
      if ((_M = unref(request)) == null ? void 0 : _M.assigned_to_details) {
        _push(`<p class="font-medium">${ssrInterpolate((_O = (_N = unref(request)) == null ? void 0 : _N.assigned_to_details) == null ? void 0 : _O.first_name)} ${ssrInterpolate((_Q = (_P = unref(request)) == null ? void 0 : _P.assigned_to_details) == null ? void 0 : _Q.last_name)}</p>`);
      } else {
        _push(`<p class="text-muted-foreground">Unassigned</p>`);
      }
      _push(`</div>`);
      if ((_R = unref(request)) == null ? void 0 : _R.vendor_name) {
        _push(`<div><p class="text-sm text-muted-foreground">Vendor</p><p class="font-medium">${ssrInterpolate((_S = unref(request)) == null ? void 0 : _S.vendor_name)}</p>`);
        if ((_T = unref(request)) == null ? void 0 : _T.vendor_contact) {
          _push(`<p class="text-sm text-muted-foreground">${ssrInterpolate((_U = unref(request)) == null ? void 0 : _U.vendor_contact)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Timeline</h2><div class="space-y-3 text-sm"><div class="flex justify-between"><span class="text-muted-foreground">Reported</span><span>${ssrInterpolate(formatDateTime((_V = unref(request)) == null ? void 0 : _V.reported_date))}</span></div>`);
      if ((_W = unref(request)) == null ? void 0 : _W.scheduled_date) {
        _push(`<div class="flex justify-between"><span class="text-muted-foreground">Scheduled</span><span>${ssrInterpolate(formatDate((_X = unref(request)) == null ? void 0 : _X.scheduled_date))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_Y = unref(request)) == null ? void 0 : _Y.started_date) {
        _push(`<div class="flex justify-between"><span class="text-muted-foreground">Started</span><span>${ssrInterpolate(formatDateTime((_Z = unref(request)) == null ? void 0 : _Z.started_date))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((__ = unref(request)) == null ? void 0 : __.completed_date) {
        _push(`<div class="flex justify-between"><span class="text-muted-foreground">Completed</span><span>${ssrInterpolate(formatDateTime((_$ = unref(request)) == null ? void 0 : _$.completed_date))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Costs</h2><div class="space-y-3 text-sm"><div class="flex justify-between"><span class="text-muted-foreground">Estimated</span><span>${ssrInterpolate(formatCurrency((_aa = unref(request)) == null ? void 0 : _aa.estimated_cost))}</span></div>`);
      if ((_ba = unref(request)) == null ? void 0 : _ba.actual_cost) {
        _push(`<div class="flex justify-between"><span class="text-muted-foreground">Actual</span><span>${ssrInterpolate(formatCurrency((_ca = unref(request)) == null ? void 0 : _ca.actual_cost))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if ((_da = unref(request)) == null ? void 0 : _da.resolution_notes) {
        _push(`<div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Resolution</h2><p class="text-sm text-muted-foreground whitespace-pre-line">${ssrInterpolate((_ea = unref(request)) == null ? void 0 : _ea.resolution_notes)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (unref(showAssignModal)) {
        _push(`<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div class="bg-background rounded-lg p-6 w-full max-w-md mx-4"><h2 class="text-xl font-bold mb-4">Assign Request</h2><form class="space-y-4"><div class="space-y-2"><label class="text-sm font-medium">Assign To *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assignForm).assigned_to) ? ssrLooseContain(unref(assignForm).assigned_to, "") : ssrLooseEqual(unref(assignForm).assigned_to, "")) ? " selected" : ""}>Select User</option><!--[-->`);
        ssrRenderList(unref(users), (user) => {
          _push(`<option${ssrRenderAttr("value", user.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(assignForm).assigned_to) ? ssrLooseContain(unref(assignForm).assigned_to, user.id) : ssrLooseEqual(unref(assignForm).assigned_to, user.id)) ? " selected" : ""}>${ssrInterpolate(user.first_name)} ${ssrInterpolate(user.last_name)} (${ssrInterpolate(user.email)}) </option>`);
        });
        _push(`<!--]--></select></div><div class="flex items-center gap-4 pt-4"><button type="button" class="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(assigning)) ? " disabled" : ""} class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(unref(assigning) ? "Assigning..." : "Assign")}</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(showCompleteModal)) {
        _push(`<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div class="bg-background rounded-lg p-6 w-full max-w-md mx-4"><h2 class="text-xl font-bold mb-4">Complete Request</h2><form class="space-y-4"><div class="space-y-2"><label class="text-sm font-medium">Actual Cost (Rs.)</label><input${ssrRenderAttr("value", unref(completeForm).actual_cost)} type="number" step="0.01" min="0" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="space-y-2"><label class="text-sm font-medium">Resolution Notes</label><textarea rows="3" placeholder="Describe what was done..." class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">${ssrInterpolate(unref(completeForm).resolution_notes)}</textarea></div><div class="flex items-center gap-4 pt-4"><button type="button" class="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(completing)) ? " disabled" : ""} class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">${ssrInterpolate(unref(completing) ? "Completing..." : "Complete")}</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/maintenance/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-eeDkbt9Z.mjs.map
