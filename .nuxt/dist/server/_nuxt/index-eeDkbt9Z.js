import { _ as __nuxt_component_0 } from "./nuxt-link-CrgyHNyr.js";
import { u as useAuth, b as useRoute, a as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, ref, withAsyncContext, mergeProps, withCtx, createVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from "vue/server-renderer";
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
      _push(`<div class="flex-1"><div class="flex items-center gap-3"><h1 class="text-3xl font-bold">${ssrInterpolate(unref(request)?.ticket_number)}</h1><span class="${ssrRenderClass([{
        "bg-blue-100 text-blue-700": unref(request)?.status === "open",
        "bg-purple-100 text-purple-700": unref(request)?.status === "assigned",
        "bg-amber-100 text-amber-700": unref(request)?.status === "in_progress",
        "bg-yellow-100 text-yellow-700": unref(request)?.status === "on_hold",
        "bg-green-100 text-green-700": unref(request)?.status === "completed",
        "bg-gray-100 text-gray-700": unref(request)?.status === "cancelled"
      }, "px-2 py-0.5 rounded-full text-xs font-medium capitalize"])}">${ssrInterpolate(unref(request)?.status?.replace("_", " "))}</span><span class="${ssrRenderClass([{
        "bg-gray-100 text-gray-700": unref(request)?.priority === "low",
        "bg-blue-100 text-blue-700": unref(request)?.priority === "medium",
        "bg-amber-100 text-amber-700": unref(request)?.priority === "high",
        "bg-red-100 text-red-700": unref(request)?.priority === "urgent"
      }, "px-2 py-0.5 rounded-full text-xs font-medium capitalize"])}">${ssrInterpolate(unref(request)?.priority)}</span></div><p class="text-muted-foreground mt-1">${ssrInterpolate(unref(request)?.title)}</p></div><div class="flex gap-2">`);
      if (unref(request)?.status === "open") {
        _push(`<button class="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 hover:scale-105 group">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:user-plus",
          class: "w-4 h-4 transition-transform group-hover:scale-110"
        }, null, _parent));
        _push(`<span class="group-hover:font-medium">Assign</span></button>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(request)?.status === "assigned") {
        _push(`<button${ssrIncludeBooleanAttr(unref(updating)) ? " disabled" : ""} class="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-200 hover:scale-105 group disabled:opacity-50">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: unref(updating) ? "lucide:loader-2" : "lucide:play",
          class: ["w-4 h-4 transition-transform group-hover:scale-110", { "animate-spin": unref(updating) }]
        }, null, _parent));
        _push(`<span class="group-hover:font-medium">${ssrInterpolate(unref(updating) ? "Starting..." : "Start Work")}</span></button>`);
      } else {
        _push(`<!---->`);
      }
      if (["assigned", "in_progress", "on_hold"].includes(unref(request)?.status)) {
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
      _push(`</div></div><div class="grid md:grid-cols-3 gap-6"><div class="md:col-span-2 space-y-6"><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Description</h2><p class="text-muted-foreground whitespace-pre-line">${ssrInterpolate(unref(request)?.description)}</p></div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Location</h2><div class="grid grid-cols-2 gap-4"><div><p class="text-sm text-muted-foreground">Property</p><p class="font-medium">${ssrInterpolate(unref(request)?.property_details?.name)}</p></div>`);
      if (unref(request)?.space_details) {
        _push(`<div><p class="text-sm text-muted-foreground">Space</p><p class="font-medium">${ssrInterpolate(unref(request)?.space_details?.code)} - ${ssrInterpolate(unref(request)?.space_details?.name)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(request)?.specific_location) {
        _push(`<div><p class="text-sm text-muted-foreground">Specific Location</p><p class="font-medium">${ssrInterpolate(unref(request)?.specific_location)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><p class="text-sm text-muted-foreground">Category</p><p class="font-medium">${ssrInterpolate(unref(request)?.category_details?.name || "Uncategorized")}</p></div></div></div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold">Tasks</h2><button class="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:plus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Add Task </button></div>`);
      if (unref(request)?.tasks?.length > 0) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(request).tasks, (task) => {
          _push(`<div class="flex items-center justify-between p-3 border border-border rounded-lg"><div><p class="font-medium">${ssrInterpolate(task.description)}</p><p class="text-sm text-muted-foreground">${ssrInterpolate(task.assigned_to_details?.first_name)} ${ssrInterpolate(task.assigned_to_details?.last_name)}</p></div><span class="${ssrRenderClass([{
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
      if (unref(request)?.comments?.length > 0) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(request).comments, (comment) => {
          _push(`<div class="p-3 border border-border rounded-lg"><div class="flex items-center justify-between mb-2"><span class="font-medium">${ssrInterpolate(comment.author_details?.first_name)} ${ssrInterpolate(comment.author_details?.last_name)}</span><span class="text-xs text-muted-foreground">${ssrInterpolate(formatDateTime(comment.created_at))}</span></div><p class="text-sm">${ssrInterpolate(comment.comment)}</p>`);
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
      _push(`<div class="space-y-3 pt-4 border-t border-border"><textarea rows="3" placeholder="Add a comment..." class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">${ssrInterpolate(unref(newComment))}</textarea><div class="flex items-center justify-between"><label class="flex items-center gap-2 text-sm"><input${ssrIncludeBooleanAttr(Array.isArray(unref(isInternalComment)) ? ssrLooseContain(unref(isInternalComment), null) : unref(isInternalComment)) ? " checked" : ""} type="checkbox" class="rounded"><span>Internal note</span></label><button${ssrIncludeBooleanAttr(!unref(newComment) || unref(addingComment)) ? " disabled" : ""} class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(unref(addingComment) ? "Adding..." : "Add Comment")}</button></div></div></div></div><div class="space-y-6"><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Assignment</h2><div class="space-y-3"><div><p class="text-sm text-muted-foreground">Reported By</p><p class="font-medium">${ssrInterpolate(unref(request)?.reported_by_details?.first_name)} ${ssrInterpolate(unref(request)?.reported_by_details?.last_name)}</p></div><div><p class="text-sm text-muted-foreground">Assigned To</p>`);
      if (unref(request)?.assigned_to_details) {
        _push(`<p class="font-medium">${ssrInterpolate(unref(request)?.assigned_to_details?.first_name)} ${ssrInterpolate(unref(request)?.assigned_to_details?.last_name)}</p>`);
      } else {
        _push(`<p class="text-muted-foreground">Unassigned</p>`);
      }
      _push(`</div>`);
      if (unref(request)?.vendor_name) {
        _push(`<div><p class="text-sm text-muted-foreground">Vendor</p><p class="font-medium">${ssrInterpolate(unref(request)?.vendor_name)}</p>`);
        if (unref(request)?.vendor_contact) {
          _push(`<p class="text-sm text-muted-foreground">${ssrInterpolate(unref(request)?.vendor_contact)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Timeline</h2><div class="space-y-3 text-sm"><div class="flex justify-between"><span class="text-muted-foreground">Reported</span><span>${ssrInterpolate(formatDateTime(unref(request)?.reported_date))}</span></div>`);
      if (unref(request)?.scheduled_date) {
        _push(`<div class="flex justify-between"><span class="text-muted-foreground">Scheduled</span><span>${ssrInterpolate(formatDate(unref(request)?.scheduled_date))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(request)?.started_date) {
        _push(`<div class="flex justify-between"><span class="text-muted-foreground">Started</span><span>${ssrInterpolate(formatDateTime(unref(request)?.started_date))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(request)?.completed_date) {
        _push(`<div class="flex justify-between"><span class="text-muted-foreground">Completed</span><span>${ssrInterpolate(formatDateTime(unref(request)?.completed_date))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Costs</h2><div class="space-y-3 text-sm"><div class="flex justify-between"><span class="text-muted-foreground">Estimated</span><span>${ssrInterpolate(formatCurrency(unref(request)?.estimated_cost))}</span></div>`);
      if (unref(request)?.actual_cost) {
        _push(`<div class="flex justify-between"><span class="text-muted-foreground">Actual</span><span>${ssrInterpolate(formatCurrency(unref(request)?.actual_cost))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (unref(request)?.resolution_notes) {
        _push(`<div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Resolution</h2><p class="text-sm text-muted-foreground whitespace-pre-line">${ssrInterpolate(unref(request)?.resolution_notes)}</p></div>`);
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
export {
  _sfc_main as default
};
//# sourceMappingURL=index-eeDkbt9Z.js.map
