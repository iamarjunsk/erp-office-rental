import { _ as __nuxt_component_0 } from "./nuxt-link-CrgyHNyr.js";
import { u as useAuth, b as useRoute, a as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, withAsyncContext, computed, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
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
const API_BASE = "http://localhost:8000/api/leases";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { authHeaders } = useAuth();
    const route = useRoute();
    const { data: lease } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/${route.params.id}/`,
      {
        headers: authHeaders()
      },
      "$ntkL9FtGGA"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const isActive = computed(() => lease.value?.status === "active");
    const daysUntilExpiry = computed(() => {
      if (!lease.value?.end_date || lease.value?.status !== "active") return null;
      const endDate = new Date(lease.value.end_date);
      const today = /* @__PURE__ */ new Date();
      const diffTime = endDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      return diffDays;
    });
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
    const calculateDuration = (start, end) => {
      if (!start || !end) return "N/A";
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
      const years = Math.floor(diffMonths / 12);
      const months = diffMonths % 12;
      if (years > 0 && months > 0) return `${years} year${years > 1 ? "s" : ""} ${months} month${months > 1 ? "s" : ""}`;
      if (years > 0) return `${years} year${years > 1 ? "s" : ""}`;
      return `${months} month${months > 1 ? "s" : ""}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/leases",
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
      _push(`<div class="flex-1"><h1 class="text-3xl font-bold">${ssrInterpolate(unref(lease)?.lease_number)}</h1><div class="flex items-center gap-2 text-muted-foreground mt-1"><span class="${ssrRenderClass([{
        "bg-green-100 text-green-700": unref(lease)?.status === "active",
        "bg-gray-100 text-gray-700": unref(lease)?.status === "draft",
        "bg-red-100 text-red-700": unref(lease)?.status === "expired",
        "bg-amber-100 text-amber-700": unref(lease)?.status === "terminated"
      }, "px-2 py-0.5 rounded-full text-xs font-medium uppercase"])}">${ssrInterpolate(unref(lease)?.status)}</span><span class="mx-2">•</span><span class="capitalize">${ssrInterpolate(unref(lease)?.type?.replace("_", " "))}</span></div></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/admin/leases/${unref(route).params.id}/edit`,
        class: "flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:pencil",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` Edit Lease `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:pencil",
                class: "w-4 h-4"
              }),
              createTextVNode(" Edit Lease ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid md:grid-cols-3 gap-6"><div class="md:col-span-2 space-y-6"><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Parties</h2><div class="grid grid-cols-2 gap-6"><div><p class="text-sm text-muted-foreground">Company</p><p class="font-medium">${ssrInterpolate(unref(lease)?.company_details?.name)}</p><p class="text-sm text-muted-foreground">${ssrInterpolate(unref(lease)?.company_details?.type)}</p></div><div><p class="text-sm text-muted-foreground">Space</p><p class="font-medium">${ssrInterpolate(unref(lease)?.space_details?.code)}</p><p class="text-sm text-muted-foreground">${ssrInterpolate(unref(lease)?.space_details?.name)}</p></div></div></div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Lease Period</h2><div class="grid grid-cols-2 gap-6"><div><p class="text-sm text-muted-foreground">Start Date</p><p class="font-medium">${ssrInterpolate(formatDate(unref(lease)?.start_date))}</p></div><div><p class="text-sm text-muted-foreground">End Date</p><p class="font-medium">${ssrInterpolate(formatDate(unref(lease)?.end_date))}</p></div><div><p class="text-sm text-muted-foreground">Duration</p><p class="font-medium">${ssrInterpolate(calculateDuration(unref(lease)?.start_date, unref(lease)?.end_date))}</p></div><div><p class="text-sm text-muted-foreground">Notice Period</p><p class="font-medium">${ssrInterpolate(unref(lease)?.notice_period_days)} days</p></div></div></div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Financial Terms</h2><div class="grid grid-cols-2 gap-6"><div><p class="text-sm text-muted-foreground">Monthly Rent</p><p class="font-medium text-lg">${ssrInterpolate(formatCurrency(unref(lease)?.rent_amount))}</p></div><div><p class="text-sm text-muted-foreground">Security Deposit</p><p class="font-medium text-lg">${ssrInterpolate(formatCurrency(unref(lease)?.security_deposit))}</p></div><div><p class="text-sm text-muted-foreground">Annual Escalation</p><p class="font-medium">${ssrInterpolate(unref(lease)?.rent_escalation_percent)}%</p></div><div><p class="text-sm text-muted-foreground">Annual Rent</p><p class="font-medium">${ssrInterpolate(formatCurrency((unref(lease)?.rent_amount || 0) * 12))}</p></div></div></div>`);
      if (unref(lease)?.notes) {
        _push(`<div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Notes</h2><p class="text-muted-foreground">${ssrInterpolate(unref(lease).notes)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-6"><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Documents</h2>`);
      if (unref(lease)?.document_url) {
        _push(`<div class="space-y-3"><a${ssrRenderAttr("href", unref(lease).document_url)} target="_blank" class="flex items-center gap-3 text-primary hover:underline">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:file-text",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span>View Lease Agreement</span>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:external-link",
          class: "w-3 h-3"
        }, null, _parent));
        _push(`</a></div>`);
      } else {
        _push(`<div class="text-muted-foreground text-sm"> No documents attached </div>`);
      }
      _push(`</div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Timeline</h2><div class="space-y-3 text-sm"><div class="flex justify-between"><span class="text-muted-foreground">Created</span><span>${ssrInterpolate(formatDateTime(unref(lease)?.created_at))}</span></div><div class="flex justify-between"><span class="text-muted-foreground">Last Updated</span><span>${ssrInterpolate(formatDateTime(unref(lease)?.updated_at))}</span></div></div></div><div class="bg-card border border-border rounded-lg p-6 space-y-4"><h2 class="text-lg font-semibold">Quick Stats</h2><div class="space-y-3"><div class="flex items-center gap-3"><div class="${ssrRenderClass([{
        "bg-green-500": unref(isActive),
        "bg-gray-500": unref(lease)?.status === "draft",
        "bg-red-500": unref(lease)?.status === "expired",
        "bg-amber-500": unref(lease)?.status === "terminated"
      }, "w-3 h-3 rounded-full"])}"></div><span>${ssrInterpolate(unref(isActive) ? "Active" : unref(lease)?.status)}</span></div>`);
      if (unref(daysUntilExpiry) !== null) {
        _push(`<div class="text-sm"><span class="text-muted-foreground">Expires in: </span><span class="${ssrRenderClass({ "text-amber-500": unref(daysUntilExpiry) <= 30, "text-red-500": unref(daysUntilExpiry) <= 7 })}">${ssrInterpolate(unref(daysUntilExpiry))} days </span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/leases/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-toXNCziI.js.map
