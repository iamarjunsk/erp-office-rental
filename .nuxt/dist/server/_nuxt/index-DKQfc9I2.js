import { _ as __nuxt_component_0 } from "./nuxt-link-CrgyHNyr.js";
import { u as useAuth, c as useToast, a as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, ref, withAsyncContext, computed, mergeProps, withCtx, createVNode, createTextVNode, unref, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { authHeaders } = useAuth();
    const { error: showError } = useToast();
    const search = ref("");
    const statusFilter = ref("");
    const priorityFilter = ref("");
    const { data, error, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      () => {
        const params = new URLSearchParams();
        if (search.value) params.append("search", search.value);
        if (statusFilter.value) params.append("status", statusFilter.value);
        if (priorityFilter.value) params.append("priority", priorityFilter.value);
        return `${API_BASE}/requisitions/?${params.toString()}`;
      },
      {
        headers: authHeaders(),
        watch: [search, statusFilter, priorityFilter]
      },
      "$MzRInktYcW"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    if (error.value) {
      showError("Failed to load requisitions", "Please check your connection and try again.");
    }
    const requisitions = computed(() => data.value?.results || []);
    const stats = computed(() => data.value?.stats || {});
    const statusStats = computed(() => [
      { key: "draft", label: "Draft", count: stats.value.draft || 0, color: "text-gray-600" },
      { key: "pending_approval", label: "Pending", count: stats.value.pending_approval || 0, color: "text-amber-600" },
      { key: "approved", label: "Approved", count: stats.value.approved || 0, color: "text-green-600" },
      { key: "rejected", label: "Rejected", count: stats.value.rejected || 0, color: "text-red-600" },
      { key: "converted_to_po", label: "Converted", count: stats.value.converted_to_po || 0, color: "text-blue-600" }
    ]);
    const filteredRequisitions = computed(() => {
      return requisitions.value.filter((pr) => {
        const matchesSearch = !search.value || pr.prNumber.toLowerCase().includes(search.value.toLowerCase()) || pr.title.toLowerCase().includes(search.value.toLowerCase());
        const matchesStatus = !statusFilter.value || pr.status === statusFilter.value;
        const matchesPriority = !priorityFilter.value || pr.priority === priorityFilter.value;
        return matchesSearch && matchesStatus && matchesPriority;
      });
    });
    const getPriorityClass = (priority) => {
      const classes = {
        low: "bg-gray-100 text-gray-700",
        medium: "bg-blue-100 text-blue-700",
        high: "bg-amber-100 text-amber-700",
        urgent: "bg-red-100 text-red-700"
      };
      return classes[priority] || "bg-gray-100 text-gray-700";
    };
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
    const formatStatus = (status) => {
      return status.split("_").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
    };
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
      _push(`<div><h1 class="text-3xl font-bold">Purchase Requisitions</h1><p class="text-muted-foreground">Create and manage procurement requests</p></div></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/procurement/requisitions/create",
        class: "flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:plus",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` New Requisition `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:plus",
                class: "w-4 h-4"
              }),
              createTextVNode(" New Requisition ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-wrap gap-4"><div class="flex-1 min-w-[250px]"><input${ssrRenderAttr("value", unref(search))} type="text" placeholder="Search by PR number or title..." class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><select class="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "") : ssrLooseEqual(unref(statusFilter), "")) ? " selected" : ""}>All Status</option><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "draft") : ssrLooseEqual(unref(statusFilter), "draft")) ? " selected" : ""}>Draft</option><option value="pending_approval"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "pending_approval") : ssrLooseEqual(unref(statusFilter), "pending_approval")) ? " selected" : ""}>Pending Approval</option><option value="approved"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "approved") : ssrLooseEqual(unref(statusFilter), "approved")) ? " selected" : ""}>Approved</option><option value="rejected"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "rejected") : ssrLooseEqual(unref(statusFilter), "rejected")) ? " selected" : ""}>Rejected</option><option value="converted_to_po"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "converted_to_po") : ssrLooseEqual(unref(statusFilter), "converted_to_po")) ? " selected" : ""}>Converted to PO</option></select><select class="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(priorityFilter)) ? ssrLooseContain(unref(priorityFilter), "") : ssrLooseEqual(unref(priorityFilter), "")) ? " selected" : ""}>All Priorities</option><option value="low"${ssrIncludeBooleanAttr(Array.isArray(unref(priorityFilter)) ? ssrLooseContain(unref(priorityFilter), "low") : ssrLooseEqual(unref(priorityFilter), "low")) ? " selected" : ""}>Low</option><option value="medium"${ssrIncludeBooleanAttr(Array.isArray(unref(priorityFilter)) ? ssrLooseContain(unref(priorityFilter), "medium") : ssrLooseEqual(unref(priorityFilter), "medium")) ? " selected" : ""}>Medium</option><option value="high"${ssrIncludeBooleanAttr(Array.isArray(unref(priorityFilter)) ? ssrLooseContain(unref(priorityFilter), "high") : ssrLooseEqual(unref(priorityFilter), "high")) ? " selected" : ""}>High</option><option value="urgent"${ssrIncludeBooleanAttr(Array.isArray(unref(priorityFilter)) ? ssrLooseContain(unref(priorityFilter), "urgent") : ssrLooseEqual(unref(priorityFilter), "urgent")) ? " selected" : ""}>Urgent</option></select></div><div class="grid grid-cols-5 gap-4"><!--[-->`);
      ssrRenderList(unref(statusStats), (stat) => {
        _push(`<div class="${ssrRenderClass([unref(statusFilter) === stat.key ? "ring-2 ring-primary" : "", "p-4 bg-card border border-border rounded-lg cursor-pointer hover:shadow-sm transition-shadow"])}"><div class="${ssrRenderClass([stat.color, "text-2xl font-bold"])}">${ssrInterpolate(stat.count)}</div><div class="text-sm text-muted-foreground">${ssrInterpolate(stat.label)}</div></div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(pending)) {
        _push(`<div class="flex items-center justify-center py-12">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:loader-2",
          class: "w-8 h-8 animate-spin text-muted-foreground"
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center py-12">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:alert-circle",
          class: "w-12 h-12 text-red-500 mx-auto mb-4"
        }, null, _parent));
        _push(`<h3 class="text-lg font-semibold mb-2">Failed to load requisitions</h3><p class="text-muted-foreground mb-4">Please check your connection and try again</p><button class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"> Retry </button></div>`);
      } else {
        _push(`<div class="bg-card border border-border rounded-xl overflow-hidden"><table class="w-full"><thead class="bg-muted/50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">PR Number</th><th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</th><th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Requested By</th><th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th><th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Priority</th><th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th><th class="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th></tr></thead><tbody class="divide-y divide-border"><!--[-->`);
        ssrRenderList(unref(filteredRequisitions), (pr) => {
          _push(`<tr class="hover:bg-muted/30 transition-colors"><td class="px-6 py-4">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/admin/procurement/requisitions/${pr.id}`,
            class: "font-medium text-primary hover:underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(pr.prNumber)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(pr.prNumber), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td><td class="px-6 py-4"><div class="font-medium">${ssrInterpolate(pr.title)}</div><div class="text-xs text-muted-foreground">${ssrInterpolate(pr.category)}</div></td><td class="px-6 py-4"><div class="flex items-center gap-2"><div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><span class="text-xs font-medium text-primary">${ssrInterpolate(pr.requestedBy.firstName[0])}${ssrInterpolate(pr.requestedBy.lastName[0])}</span></div><div><div class="text-sm font-medium">${ssrInterpolate(pr.requestedBy.firstName)} ${ssrInterpolate(pr.requestedBy.lastName)}</div><div class="text-xs text-muted-foreground">${ssrInterpolate(pr.department)}</div></div></div></td><td class="px-6 py-4 font-medium">₹${ssrInterpolate(pr.totalEstimatedAmount.toLocaleString())}</td><td class="px-6 py-4"><span class="${ssrRenderClass([getPriorityClass(pr.priority), "px-2 py-1 text-xs rounded-full font-medium"])}">${ssrInterpolate(pr.priority)}</span></td><td class="px-6 py-4"><span class="${ssrRenderClass([getStatusClass(pr.status), "px-2 py-1 text-xs rounded-full font-medium"])}">${ssrInterpolate(formatStatus(pr.status))}</span></td><td class="px-6 py-4 text-right"><div class="flex items-center justify-end gap-2">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/admin/procurement/requisitions/${pr.id}`,
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
          if (pr.status === "draft") {
            _push(`<button class="p-2 hover:bg-muted rounded-lg" title="Edit">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "lucide:pencil",
              class: "w-4 h-4"
            }, null, _parent));
            _push(`</button>`);
          } else {
            _push(`<!---->`);
          }
          if (pr.status === "approved") {
            _push(`<button class="p-2 hover:bg-green-100 rounded-lg text-green-600" title="Convert to PO">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-right-circle",
              class: "w-4 h-4"
            }, null, _parent));
            _push(`</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
        if (unref(requisitions).length === 0 && !unref(search) && !unref(statusFilter) && !unref(priorityFilter)) {
          _push(`<div class="text-center py-12">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:file-text",
            class: "w-12 h-12 text-muted-foreground mx-auto mb-4"
          }, null, _parent));
          _push(`<h3 class="text-lg font-semibold mb-2">No requisitions found</h3><p class="text-muted-foreground mb-4">Create your first requisition to get started</p>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/admin/procurement/requisitions/create",
            class: "inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "lucide:plus",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(` Create Requisition `);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "lucide:plus",
                    class: "w-4 h-4"
                  }),
                  createTextVNode(" Create Requisition ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else if (unref(filteredRequisitions).length === 0) {
          _push(`<div class="text-center py-12">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:search-x",
            class: "w-12 h-12 text-muted-foreground mx-auto mb-4"
          }, null, _parent));
          _push(`<h3 class="text-lg font-semibold mb-2">No matching requisitions</h3><p class="text-muted-foreground mb-4">Try adjusting your filters or search terms</p><button class="px-4 py-2 border border-border rounded-lg hover:bg-muted"> Clear Filters </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/procurement/requisitions/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DKQfc9I2.js.map
