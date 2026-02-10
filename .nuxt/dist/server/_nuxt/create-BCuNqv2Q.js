import { _ as __nuxt_component_0 } from "./nuxt-link-CrgyHNyr.js";
import { u as useAuth, a as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, withAsyncContext, computed, ref, mergeProps, withCtx, createVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useAuth();
    const { data: propertyData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/properties",
      "$UTar5Jtr6X"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const properties = computed(() => propertyData.value?.data || []);
    const saving = ref(false);
    const form = ref({
      title: "",
      category: "",
      priority: "medium",
      propertyId: "",
      requiredDate: "",
      description: "",
      items: [
        { itemName: "", quantity: 1, unit: "pcs", estimatedUnitPrice: 0, totalEstimatedPrice: 0 }
      ]
    });
    const totalAmount = computed(
      () => form.value.items.reduce((sum, item) => sum + (item.totalEstimatedPrice || 0), 0)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-4">`);
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
      _push(`<div><h1 class="text-3xl font-bold">New Purchase Requisition</h1><p class="text-muted-foreground">Create a new procurement request</p></div></div><form class="space-y-8"><div class="bg-card border border-border rounded-xl p-6 space-y-4"><h2 class="text-lg font-semibold">Basic Information</h2><div class="grid md:grid-cols-3 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Requisition Title *</label><input${ssrRenderAttr("value", unref(form).title)} type="text" placeholder="e.g., Office Furniture Q1" class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Category *</label><select class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "") : ssrLooseEqual(unref(form).category, "")) ? " selected" : ""}>Select category</option><option value="office_supplies"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "office_supplies") : ssrLooseEqual(unref(form).category, "office_supplies")) ? " selected" : ""}>Office Supplies</option><option value="equipment"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "equipment") : ssrLooseEqual(unref(form).category, "equipment")) ? " selected" : ""}>Equipment</option><option value="furniture"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "furniture") : ssrLooseEqual(unref(form).category, "furniture")) ? " selected" : ""}>Furniture</option><option value="it_hardware"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "it_hardware") : ssrLooseEqual(unref(form).category, "it_hardware")) ? " selected" : ""}>IT Hardware</option><option value="services"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "services") : ssrLooseEqual(unref(form).category, "services")) ? " selected" : ""}>Services</option><option value="maintenance"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "maintenance") : ssrLooseEqual(unref(form).category, "maintenance")) ? " selected" : ""}>Maintenance</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Priority *</label><select class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value="low"${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "low") : ssrLooseEqual(unref(form).priority, "low")) ? " selected" : ""}>Low</option><option value="medium"${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "medium") : ssrLooseEqual(unref(form).priority, "medium")) ? " selected" : ""}>Medium</option><option value="high"${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "high") : ssrLooseEqual(unref(form).priority, "high")) ? " selected" : ""}>High</option><option value="urgent"${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "urgent") : ssrLooseEqual(unref(form).priority, "urgent")) ? " selected" : ""}>Urgent</option></select></div></div><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Delivery Property *</label><select class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).propertyId) ? ssrLooseContain(unref(form).propertyId, "") : ssrLooseEqual(unref(form).propertyId, "")) ? " selected" : ""}>Select property</option><!--[-->`);
      ssrRenderList(unref(properties), (prop) => {
        _push(`<option${ssrRenderAttr("value", prop.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).propertyId) ? ssrLooseContain(unref(form).propertyId, prop.id) : ssrLooseEqual(unref(form).propertyId, prop.id)) ? " selected" : ""}>${ssrInterpolate(prop.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="space-y-2"><label class="text-sm font-medium">Required Date *</label><input${ssrRenderAttr("value", unref(form).requiredDate)} type="date" class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div></div><div class="space-y-2"><label class="text-sm font-medium">Description</label><textarea rows="3" placeholder="Detailed description of procurement need..." class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none">${ssrInterpolate(unref(form).description)}</textarea></div></div><div class="bg-card border border-border rounded-xl p-6 space-y-4"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold">Line Items</h2><button type="button" class="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:plus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Add Item </button></div><div class="space-y-4"><!--[-->`);
      ssrRenderList(unref(form).items, (item, index) => {
        _push(`<div class="grid md:grid-cols-6 gap-4 p-4 bg-muted/50 rounded-lg items-end"><div class="md:col-span-2 space-y-2"><label class="text-sm font-medium">Item Name *</label><input${ssrRenderAttr("value", item.itemName)} type="text" placeholder="Item name" class="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Qty *</label><input${ssrRenderAttr("value", item.quantity)} type="number" min="1" class="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Unit *</label><select class="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value="pcs"${ssrIncludeBooleanAttr(Array.isArray(item.unit) ? ssrLooseContain(item.unit, "pcs") : ssrLooseEqual(item.unit, "pcs")) ? " selected" : ""}>Pieces</option><option value="kg"${ssrIncludeBooleanAttr(Array.isArray(item.unit) ? ssrLooseContain(item.unit, "kg") : ssrLooseEqual(item.unit, "kg")) ? " selected" : ""}>Kilograms</option><option value="ltr"${ssrIncludeBooleanAttr(Array.isArray(item.unit) ? ssrLooseContain(item.unit, "ltr") : ssrLooseEqual(item.unit, "ltr")) ? " selected" : ""}>Liters</option><option value="box"${ssrIncludeBooleanAttr(Array.isArray(item.unit) ? ssrLooseContain(item.unit, "box") : ssrLooseEqual(item.unit, "box")) ? " selected" : ""}>Boxes</option><option value="hours"${ssrIncludeBooleanAttr(Array.isArray(item.unit) ? ssrLooseContain(item.unit, "hours") : ssrLooseEqual(item.unit, "hours")) ? " selected" : ""}>Hours</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Est. Price (₹)</label><input${ssrRenderAttr("value", item.estimatedUnitPrice)} type="number" min="0" class="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></div><div class="flex items-center gap-2"><div class="flex-1"><label class="text-sm font-medium">Total</label><div class="text-lg font-bold">₹${ssrInterpolate((item.totalEstimatedPrice || 0).toLocaleString())}</div></div><button type="button" class="p-2 text-red-500 hover:bg-red-50 rounded-lg"${ssrIncludeBooleanAttr(unref(form).items.length === 1) ? " disabled" : ""}>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:trash-2",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button></div></div>`);
      });
      _push(`<!--]--></div><div class="flex justify-end pt-4 border-t border-border"><div class="text-right"><div class="text-sm text-muted-foreground">Total Estimated Amount</div><div class="text-2xl font-bold">₹${ssrInterpolate(unref(totalAmount).toLocaleString())}</div></div></div></div><div class="flex items-center justify-end gap-4"><button type="button" class="px-4 py-2 border border-border rounded-lg hover:bg-muted"> Cancel </button><button type="button" class="px-4 py-2 border border-border rounded-lg hover:bg-muted"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""}> Save as Draft </button><button type="submit" class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""}>${ssrInterpolate(unref(saving) ? "Submitting..." : "Submit for Approval")}</button></div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/procurement/requisitions/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=create-BCuNqv2Q.js.map
