import { _ as __nuxt_component_0 } from "./nuxt-link-CrgyHNyr.js";
import { u as useAuth, a as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, ref, withAsyncContext, computed, mergeProps, withCtx, createVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
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
const API_BASE = "http://localhost:8000/api";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { authHeaders } = useAuth();
    const creating = ref(false);
    const form = ref({
      title: "",
      description: "",
      property: "",
      space: "",
      category: "",
      specific_location: "",
      priority: "medium",
      type: "reactive",
      scheduled_date: "",
      estimated_cost: null
    });
    const { data: properties } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/properties/`,
      {
        headers: authHeaders()
      },
      "$JJWhCrkIrJ"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: spaces } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/spaces/`,
      {
        headers: authHeaders()
      },
      "$wRTFU-UQ6m"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/maintenance/categories/`,
      {
        headers: authHeaders()
      },
      "$_B9qOz4iS7"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const filteredSpaces = computed(() => {
      if (!form.value.property) return [];
      return (spaces.value || []).filter((space) => {
        return space.property === parseInt(form.value.property) || space.property_details?.id === parseInt(form.value.property);
      });
    });
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
      _push(`<div><h1 class="text-3xl font-bold">Create Maintenance Request</h1><p class="text-muted-foreground">Report a new maintenance issue</p></div></div><form class="max-w-4xl space-y-8"><div class="space-y-4"><h2 class="text-xl font-semibold">Request Information</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2 md:col-span-2"><label class="text-sm font-medium">Title *</label><input${ssrRenderAttr("value", unref(form).title)} type="text" placeholder="Brief description of the issue" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2 md:col-span-2"><label class="text-sm font-medium">Description *</label><textarea rows="4" placeholder="Detailed description of the maintenance issue..." class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required>${ssrInterpolate(unref(form).description)}</textarea></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Location &amp; Category</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Property *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).property) ? ssrLooseContain(unref(form).property, "") : ssrLooseEqual(unref(form).property, "")) ? " selected" : ""}>Select Property</option><!--[-->`);
      ssrRenderList(unref(properties), (prop) => {
        _push(`<option${ssrRenderAttr("value", prop.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).property) ? ssrLooseContain(unref(form).property, prop.id) : ssrLooseEqual(unref(form).property, prop.id)) ? " selected" : ""}>${ssrInterpolate(prop.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="space-y-2"><label class="text-sm font-medium">Space (Optional)</label><select${ssrIncludeBooleanAttr(!unref(form).property) ? " disabled" : ""} class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).space) ? ssrLooseContain(unref(form).space, "") : ssrLooseEqual(unref(form).space, "")) ? " selected" : ""}>${ssrInterpolate(unref(form).property ? "Select Space" : "Select property first")}</option><!--[-->`);
      ssrRenderList(unref(filteredSpaces), (space) => {
        _push(`<option${ssrRenderAttr("value", space.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).space) ? ssrLooseContain(unref(form).space, space.id) : ssrLooseEqual(unref(form).space, space.id)) ? " selected" : ""}>${ssrInterpolate(space.code)} - ${ssrInterpolate(space.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="space-y-2"><label class="text-sm font-medium">Category</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "") : ssrLooseEqual(unref(form).category, "")) ? " selected" : ""}>Select Category</option><!--[-->`);
      ssrRenderList(unref(categories), (cat) => {
        _push(`<option${ssrRenderAttr("value", cat.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, cat.id) : ssrLooseEqual(unref(form).category, cat.id)) ? " selected" : ""}>${ssrInterpolate(cat.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="space-y-2"><label class="text-sm font-medium">Specific Location</label><input${ssrRenderAttr("value", unref(form).specific_location)} type="text" placeholder="e.g., 3rd Floor, Room 302" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Priority &amp; Type</h2><div class="grid md:grid-cols-3 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Priority *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value="low"${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "low") : ssrLooseEqual(unref(form).priority, "low")) ? " selected" : ""}>Low</option><option value="medium"${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "medium") : ssrLooseEqual(unref(form).priority, "medium")) ? " selected" : ""}>Medium</option><option value="high"${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "high") : ssrLooseEqual(unref(form).priority, "high")) ? " selected" : ""}>High</option><option value="urgent"${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "urgent") : ssrLooseEqual(unref(form).priority, "urgent")) ? " selected" : ""}>Urgent</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Type *</label><select class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value="reactive"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "reactive") : ssrLooseEqual(unref(form).type, "reactive")) ? " selected" : ""}>Reactive</option><option value="preventive"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "preventive") : ssrLooseEqual(unref(form).type, "preventive")) ? " selected" : ""}>Preventive</option><option value="inspection"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "inspection") : ssrLooseEqual(unref(form).type, "inspection")) ? " selected" : ""}>Inspection</option><option value="emergency"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "emergency") : ssrLooseEqual(unref(form).type, "emergency")) ? " selected" : ""}>Emergency</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Scheduled Date</label><input${ssrRenderAttr("value", unref(form).scheduled_date)} type="date" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div></div><div class="space-y-4"><h2 class="text-xl font-semibold">Cost Estimate</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Estimated Cost (Rs.)</label><input${ssrRenderAttr("value", unref(form).estimated_cost)} type="number" step="0.01" min="0" placeholder="0.00" class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div></div></div><div class="flex items-center gap-4 pt-4"><button type="button" class="px-4 py-2 border border-border rounded-lg hover:bg-muted"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(creating)) ? " disabled" : ""} class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">${ssrInterpolate(unref(creating) ? "Creating..." : "Create Request")}</button></div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/maintenance/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=create-C63FDbGm.js.map
