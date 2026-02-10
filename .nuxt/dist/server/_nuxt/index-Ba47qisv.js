import { _ as __nuxt_component_0 } from "./nuxt-link-CrgyHNyr.js";
import { u as useAuth, a as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, withCtx, createVNode, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
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
    const priorityFilter = ref("");
    const { data: statsData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/requests/stats/`,
      {
        headers: authHeaders()
      },
      "$sR3eX-jEbx"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const stats = computed(() => statsData.value || {
      total: 0,
      open: 0,
      inProgress: 0,
      completed: 0,
      urgent: 0,
      highPriority: 0,
      overdue: 0
    });
    const { data, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      () => {
        const params = new URLSearchParams();
        if (searchQuery.value) params.append("search", searchQuery.value);
        if (statusFilter.value) params.append("status", statusFilter.value);
        if (priorityFilter.value) params.append("priority", priorityFilter.value);
        return `${API_BASE}/requests/?${params.toString()}`;
      },
      {
        headers: authHeaders(),
        watch: [statusFilter, priorityFilter]
      },
      "$qROaVI09xY"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const requests = computed(() => data.value || []);
    watch(searchQuery, debounce(() => {
      refresh();
    }, 500));
    const formatDate = (date) => {
      if (!date) return "N/A";
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-3xl font-bold">Maintenance &amp; Tickets</h1><p class="text-muted-foreground">Manage maintenance requests and tickets</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/maintenance/create",
        class: "flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:plus",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` Create Ticket `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:plus",
                class: "w-4 h-4"
              }),
              createTextVNode(" Create Ticket ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid gap-4 md:grid-cols-4"><div class="bg-card border border-border rounded-lg p-4"><div class="flex items-center gap-3"><div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:inbox",
        class: "w-5 h-5 text-blue-600"
      }, null, _parent));
      _push(`</div><div><p class="text-2xl font-bold">${ssrInterpolate(unref(stats).open)}</p><p class="text-sm text-muted-foreground">Open</p></div></div></div><div class="bg-card border border-border rounded-lg p-4"><div class="flex items-center gap-3"><div class="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:clock",
        class: "w-5 h-5 text-amber-600"
      }, null, _parent));
      _push(`</div><div><p class="text-2xl font-bold">${ssrInterpolate(unref(stats).inProgress)}</p><p class="text-sm text-muted-foreground">In Progress</p></div></div></div><div class="bg-card border border-border rounded-lg p-4"><div class="flex items-center gap-3"><div class="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:alert-circle",
        class: "w-5 h-5 text-red-600"
      }, null, _parent));
      _push(`</div><div><p class="text-2xl font-bold">${ssrInterpolate(unref(stats).urgent + unref(stats).highPriority)}</p><p class="text-sm text-muted-foreground">High Priority</p></div></div></div><div class="bg-card border border-border rounded-lg p-4"><div class="flex items-center gap-3"><div class="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:check-circle",
        class: "w-5 h-5 text-green-600"
      }, null, _parent));
      _push(`</div><div><p class="text-2xl font-bold">${ssrInterpolate(unref(stats).completed)}</p><p class="text-sm text-muted-foreground">Completed</p></div></div></div></div><div class="flex flex-col sm:flex-row gap-4"><div class="relative flex-1">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:search",
        class: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Search tickets..." class="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><select class="px-4 py-2 bg-card border border-border rounded-lg"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "") : ssrLooseEqual(unref(statusFilter), "")) ? " selected" : ""}>All Status</option><option value="open"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "open") : ssrLooseEqual(unref(statusFilter), "open")) ? " selected" : ""}>Open</option><option value="assigned"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "assigned") : ssrLooseEqual(unref(statusFilter), "assigned")) ? " selected" : ""}>Assigned</option><option value="in_progress"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "in_progress") : ssrLooseEqual(unref(statusFilter), "in_progress")) ? " selected" : ""}>In Progress</option><option value="completed"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "completed") : ssrLooseEqual(unref(statusFilter), "completed")) ? " selected" : ""}>Completed</option><option value="cancelled"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "cancelled") : ssrLooseEqual(unref(statusFilter), "cancelled")) ? " selected" : ""}>Cancelled</option></select><select class="px-4 py-2 bg-card border border-border rounded-lg"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(priorityFilter)) ? ssrLooseContain(unref(priorityFilter), "") : ssrLooseEqual(unref(priorityFilter), "")) ? " selected" : ""}>All Priority</option><option value="low"${ssrIncludeBooleanAttr(Array.isArray(unref(priorityFilter)) ? ssrLooseContain(unref(priorityFilter), "low") : ssrLooseEqual(unref(priorityFilter), "low")) ? " selected" : ""}>Low</option><option value="medium"${ssrIncludeBooleanAttr(Array.isArray(unref(priorityFilter)) ? ssrLooseContain(unref(priorityFilter), "medium") : ssrLooseEqual(unref(priorityFilter), "medium")) ? " selected" : ""}>Medium</option><option value="high"${ssrIncludeBooleanAttr(Array.isArray(unref(priorityFilter)) ? ssrLooseContain(unref(priorityFilter), "high") : ssrLooseEqual(unref(priorityFilter), "high")) ? " selected" : ""}>High</option><option value="urgent"${ssrIncludeBooleanAttr(Array.isArray(unref(priorityFilter)) ? ssrLooseContain(unref(priorityFilter), "urgent") : ssrLooseEqual(unref(priorityFilter), "urgent")) ? " selected" : ""}>Urgent</option></select></div><div class="bg-card border border-border rounded-lg overflow-hidden"><div class="overflow-x-auto"><table class="w-full"><thead class="bg-muted"><tr><th class="px-4 py-3 text-left text-sm font-medium">Ticket #</th><th class="px-4 py-3 text-left text-sm font-medium">Title</th><th class="px-4 py-3 text-left text-sm font-medium">Property</th><th class="px-4 py-3 text-left text-sm font-medium">Category</th><th class="px-4 py-3 text-left text-sm font-medium">Priority</th><th class="px-4 py-3 text-left text-sm font-medium">Status</th><th class="px-4 py-3 text-left text-sm font-medium">Created</th><th class="px-4 py-3 text-left text-sm font-medium">Actions</th></tr></thead><tbody class="divide-y divide-border"><!--[-->`);
      ssrRenderList(unref(requests), (ticket) => {
        _push(`<tr class="hover:bg-muted/50"><td class="px-4 py-3 text-sm font-medium">${ssrInterpolate(ticket.ticket_number)}</td><td class="px-4 py-3 text-sm">${ssrInterpolate(ticket.title)}</td><td class="px-4 py-3 text-sm">${ssrInterpolate(ticket.property_details?.name)}</td><td class="px-4 py-3 text-sm">${ssrInterpolate(ticket.category_details?.name)}</td><td class="px-4 py-3 text-sm"><span class="${ssrRenderClass([{
          "bg-gray-100 text-gray-700": ticket.priority === "low",
          "bg-blue-100 text-blue-700": ticket.priority === "medium",
          "bg-amber-100 text-amber-700": ticket.priority === "high",
          "bg-red-100 text-red-700": ticket.priority === "urgent"
        }, "px-2 py-1 rounded-full text-xs font-medium capitalize"])}">${ssrInterpolate(ticket.priority)}</span></td><td class="px-4 py-3 text-sm"><span class="${ssrRenderClass([{
          "bg-blue-100 text-blue-700": ticket.status === "open",
          "bg-purple-100 text-purple-700": ticket.status === "assigned",
          "bg-amber-100 text-amber-700": ticket.status === "in_progress",
          "bg-yellow-100 text-yellow-700": ticket.status === "on_hold",
          "bg-green-100 text-green-700": ticket.status === "completed",
          "bg-gray-100 text-gray-700": ticket.status === "cancelled"
        }, "px-2 py-1 rounded-full text-xs font-medium capitalize"])}">${ssrInterpolate(ticket.status.replace("_", " "))}</span></td><td class="px-4 py-3 text-sm">${ssrInterpolate(formatDate(ticket.created_at))}</td><td class="px-4 py-3 text-sm"><div class="flex items-center gap-2"><button class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-all duration-200 hover:scale-110 group" title="View">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:eye",
          class: "w-4 h-4 transition-transform group-hover:scale-110"
        }, null, _parent));
        _push(`</button><button class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-all duration-200 hover:scale-110 group" title="Edit">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:pencil",
          class: "w-4 h-4 transition-transform group-hover:rotate-12"
        }, null, _parent));
        _push(`</button></div></td></tr>`);
      });
      _push(`<!--]-->`);
      if (unref(requests).length === 0) {
        _push(`<tr><td colspan="8" class="px-4 py-8 text-center text-muted-foreground"> No maintenance requests found </td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/maintenance/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-Ba47qisv.js.map
