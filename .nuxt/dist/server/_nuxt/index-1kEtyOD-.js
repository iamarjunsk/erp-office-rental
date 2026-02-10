import { _ as __nuxt_component_0 } from "./nuxt-link-CrgyHNyr.js";
import { u as useAuth, a as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, withCtx, createVNode, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
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
const API_BASE = "http://localhost:8000/api/spaces";
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
    const typeFilter = ref("");
    const { data, pending: loading, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      () => {
        const params = new URLSearchParams();
        if (searchQuery.value) params.append("search", searchQuery.value);
        if (statusFilter.value) params.append("status", statusFilter.value);
        if (typeFilter.value) params.append("type", typeFilter.value);
        return `${API_BASE}/?${params.toString()}`;
      },
      {
        headers: authHeaders(),
        watch: [statusFilter, typeFilter]
      },
      "$EAGPtoPLBq"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const spaces = computed(() => data.value || []);
    watch(searchQuery, debounce(() => {
      refresh();
    }, 500));
    const formatCurrency = (value) => {
      if (!value) return "-";
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-3xl font-bold">Spaces</h1><p class="text-muted-foreground">Manage office spaces and meeting rooms</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/spaces/create",
        class: "flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:plus",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` Add Space `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:plus",
                class: "w-4 h-4"
              }),
              createTextVNode(" Add Space ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-col sm:flex-row gap-4"><div class="relative flex-1">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:search",
        class: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Search spaces..." class="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><select class="px-4 py-2 bg-card border border-border rounded-lg"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "") : ssrLooseEqual(unref(statusFilter), "")) ? " selected" : ""}>All Status</option><option value="available"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "available") : ssrLooseEqual(unref(statusFilter), "available")) ? " selected" : ""}>Available</option><option value="occupied"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "occupied") : ssrLooseEqual(unref(statusFilter), "occupied")) ? " selected" : ""}>Occupied</option><option value="maintenance"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "maintenance") : ssrLooseEqual(unref(statusFilter), "maintenance")) ? " selected" : ""}>Maintenance</option><option value="reserved"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "reserved") : ssrLooseEqual(unref(statusFilter), "reserved")) ? " selected" : ""}>Reserved</option></select><select class="px-4 py-2 bg-card border border-border rounded-lg"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(typeFilter)) ? ssrLooseContain(unref(typeFilter), "") : ssrLooseEqual(unref(typeFilter), "")) ? " selected" : ""}>All Types</option><option value="private_office"${ssrIncludeBooleanAttr(Array.isArray(unref(typeFilter)) ? ssrLooseContain(unref(typeFilter), "private_office") : ssrLooseEqual(unref(typeFilter), "private_office")) ? " selected" : ""}>Private Office</option><option value="open_desk"${ssrIncludeBooleanAttr(Array.isArray(unref(typeFilter)) ? ssrLooseContain(unref(typeFilter), "open_desk") : ssrLooseEqual(unref(typeFilter), "open_desk")) ? " selected" : ""}>Open Desk</option><option value="meeting_room"${ssrIncludeBooleanAttr(Array.isArray(unref(typeFilter)) ? ssrLooseContain(unref(typeFilter), "meeting_room") : ssrLooseEqual(unref(typeFilter), "meeting_room")) ? " selected" : ""}>Meeting Room</option><option value="virtual_office"${ssrIncludeBooleanAttr(Array.isArray(unref(typeFilter)) ? ssrLooseContain(unref(typeFilter), "virtual_office") : ssrLooseEqual(unref(typeFilter), "virtual_office")) ? " selected" : ""}>Virtual Office</option><option value="hot_desk"${ssrIncludeBooleanAttr(Array.isArray(unref(typeFilter)) ? ssrLooseContain(unref(typeFilter), "hot_desk") : ssrLooseEqual(unref(typeFilter), "hot_desk")) ? " selected" : ""}>Hot Desk</option></select></div><div class="bg-card border border-border rounded-lg overflow-hidden"><div class="overflow-x-auto"><table class="w-full"><thead class="bg-muted"><tr><th class="px-4 py-3 text-left text-sm font-medium">Code</th><th class="px-4 py-3 text-left text-sm font-medium">Property</th><th class="px-4 py-3 text-left text-sm font-medium">Type</th><th class="px-4 py-3 text-left text-sm font-medium">Floor</th><th class="px-4 py-3 text-left text-sm font-medium">Area</th><th class="px-4 py-3 text-left text-sm font-medium">Capacity</th><th class="px-4 py-3 text-left text-sm font-medium">Base Rent</th><th class="px-4 py-3 text-left text-sm font-medium">Status</th><th class="px-4 py-3 text-left text-sm font-medium">Actions</th></tr></thead><tbody class="divide-y divide-border"><!--[-->`);
      ssrRenderList(unref(spaces), (space) => {
        _push(`<tr class="hover:bg-muted/50"><td class="px-4 py-3 text-sm font-medium">${ssrInterpolate(space.code)}</td><td class="px-4 py-3 text-sm">${ssrInterpolate(space.property_details?.name)}</td><td class="px-4 py-3 text-sm capitalize">${ssrInterpolate(space.type.replace("_", " "))}</td><td class="px-4 py-3 text-sm">${ssrInterpolate(space.floor)}</td><td class="px-4 py-3 text-sm">${ssrInterpolate(Number(space.area).toLocaleString())} sqft</td><td class="px-4 py-3 text-sm">${ssrInterpolate(space.capacity || "-")}</td><td class="px-4 py-3 text-sm">${ssrInterpolate(formatCurrency(space.base_rent))}</td><td class="px-4 py-3 text-sm"><span class="${ssrRenderClass([{
          "bg-green-100 text-green-700": space.current_status === "available",
          "bg-blue-100 text-blue-700": space.current_status === "occupied",
          "bg-amber-100 text-amber-700": space.current_status === "maintenance",
          "bg-purple-100 text-purple-700": space.current_status === "reserved"
        }, "px-2 py-1 rounded-full text-xs font-medium"])}">${ssrInterpolate(space.current_status)}</span></td><td class="px-4 py-3 text-sm"><div class="flex items-center gap-2"><button class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:eye",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button><button class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:pencil",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button></div></td></tr>`);
      });
      _push(`<!--]-->`);
      if (unref(spaces).length === 0) {
        _push(`<tr><td colspan="9" class="px-4 py-8 text-center text-muted-foreground"> No spaces found </td></tr>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/spaces/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-1kEtyOD-.js.map
