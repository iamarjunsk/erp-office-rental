import { _ as __nuxt_component_0 } from './nuxt-link-CrgyHNyr.mjs';
import { u as useAuth, a as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, withAsyncContext, watch, computed, mergeProps, withCtx, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
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

const API_BASE = "http://localhost:8000/api/properties";
const limit = 10;
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
    const page = ref(1);
    const searchQuery = ref("");
    const statusFilter = ref("");
    const { data, pending: loading, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      () => {
        const params = new URLSearchParams();
        if (page.value > 1) params.append("page", page.value.toString());
        if (searchQuery.value) params.append("search", searchQuery.value);
        if (statusFilter.value) params.append("status", statusFilter.value);
        return `${API_BASE}/?${params.toString()}`;
      },
      {
        headers: authHeaders(),
        watch: [page, statusFilter]
        // Search handled by debounce separately
      },
      "$4MVpnIzLiQ"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    watch(searchQuery, debounce(() => {
      page.value = 1;
      refresh();
    }, 500));
    const properties = computed(() => {
      var _a;
      return ((_a = data.value) == null ? void 0 : _a.results) || [];
    });
    const totalCount = computed(() => {
      var _a;
      return ((_a = data.value) == null ? void 0 : _a.count) || 0;
    });
    const pagination = computed(() => ({
      start: (page.value - 1) * limit + 1,
      end: Math.min(page.value * limit, totalCount.value),
      total: totalCount.value,
      totalPages: Math.ceil(totalCount.value / limit)
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-3xl font-bold">Properties</h1><p class="text-muted-foreground">Manage your office properties</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/properties/create",
        class: "flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:plus",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` Add Property `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:plus",
                class: "w-4 h-4"
              }),
              createTextVNode(" Add Property ")
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
      _push(`<input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Search properties..." class="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><select class="px-4 py-2 bg-card border border-border rounded-lg"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "") : ssrLooseEqual(unref(statusFilter), "")) ? " selected" : ""}>All Status</option><option value="active"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "active") : ssrLooseEqual(unref(statusFilter), "active")) ? " selected" : ""}>Active</option><option value="inactive"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "inactive") : ssrLooseEqual(unref(statusFilter), "inactive")) ? " selected" : ""}>Inactive</option><option value="under_renovation"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "under_renovation") : ssrLooseEqual(unref(statusFilter), "under_renovation")) ? " selected" : ""}>Under Renovation</option></select></div><div class="bg-card border border-border rounded-lg overflow-hidden"><div class="overflow-x-auto"><table class="w-full"><thead class="bg-muted"><tr><th class="px-4 py-3 text-left text-sm font-medium">Code</th><th class="px-4 py-3 text-left text-sm font-medium">Name</th><th class="px-4 py-3 text-left text-sm font-medium">Type</th><th class="px-4 py-3 text-left text-sm font-medium">Location</th><th class="px-4 py-3 text-left text-sm font-medium">Area (sqft)</th><th class="px-4 py-3 text-left text-sm font-medium">Status</th><th class="px-4 py-3 text-left text-sm font-medium">Manager</th><th class="px-4 py-3 text-left text-sm font-medium">Actions</th></tr></thead><tbody class="divide-y divide-border"><!--[-->`);
      ssrRenderList(unref(properties), (property) => {
        var _a;
        _push(`<tr class="hover:bg-muted/50"><td class="px-4 py-3 text-sm font-medium">${ssrInterpolate(property.code)}</td><td class="px-4 py-3 text-sm">${ssrInterpolate(property.name)}</td><td class="px-4 py-3 text-sm"><span class="capitalize">${ssrInterpolate(property.type.replace("_", " "))}</span></td><td class="px-4 py-3 text-sm">${ssrInterpolate(property.city)}, ${ssrInterpolate(property.state)}</td><td class="px-4 py-3 text-sm">${ssrInterpolate((_a = property.total_area) == null ? void 0 : _a.toLocaleString())}</td><td class="px-4 py-3 text-sm"><span class="${ssrRenderClass([{
          "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400": property.status === "active",
          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400": property.status === "inactive",
          "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400": property.status === "under_renovation"
        }, "px-2 py-1 rounded-full text-xs font-medium"])}">${ssrInterpolate(property.status.replace("_", " "))}</span></td><td class="px-4 py-3 text-sm">${ssrInterpolate(property.manager_details ? `${property.manager_details.first_name} ${property.manager_details.last_name}` : "Unassigned")}</td><td class="px-4 py-3 text-sm"><div class="flex items-center gap-2"><button class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">`);
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
      if (unref(properties).length === 0) {
        _push(`<tr><td colspan="8" class="px-4 py-8 text-center text-muted-foreground"> No properties found </td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div><div class="flex items-center justify-between px-4 py-3 border-t border-border"><p class="text-sm text-muted-foreground"> Showing ${ssrInterpolate(unref(pagination).start)} to ${ssrInterpolate(unref(pagination).end)} of ${ssrInterpolate(unref(pagination).total)} properties </p><div class="flex items-center gap-2"><button${ssrIncludeBooleanAttr(unref(page) === 1) ? " disabled" : ""} class="px-3 py-1 border border-border rounded-lg disabled:opacity-50"> Previous </button><span class="text-sm">Page ${ssrInterpolate(unref(page))} of ${ssrInterpolate(unref(pagination).totalPages)}</span><button${ssrIncludeBooleanAttr(unref(page) >= unref(pagination).totalPages) ? " disabled" : ""} class="px-3 py-1 border border-border rounded-lg disabled:opacity-50"> Next </button></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/properties/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CXDe97MX.mjs.map
