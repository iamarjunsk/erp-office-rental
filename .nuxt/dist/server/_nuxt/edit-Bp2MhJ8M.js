import { _ as __nuxt_component_0 } from "./nuxt-link-CrgyHNyr.js";
import { b as useRoute, d as useRouter, u as useAuth, a as __nuxt_component_0$1 } from "../server.mjs";
import { defineComponent, withAsyncContext, ref, watchEffect, computed, unref, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
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
  __name: "edit",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useRouter();
    const { authHeaders } = useAuth();
    const { data: requisition } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/requisitions/${route.params.id}/`,
      {
        headers: authHeaders()
      },
      "$mx4PfiLROZ"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
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
    watchEffect(() => {
      if (requisition.value) {
        const r = requisition.value;
        form.value = {
          title: r.title || "",
          category: r.category || "",
          priority: r.priority || "medium",
          propertyId: r.propertyId?.toString() || r.property?.id?.toString() || "",
          requiredDate: r.required_date || "",
          description: r.description || "",
          items: r.items?.map((item) => ({
            itemName: item.item_name,
            quantity: item.quantity,
            unit: item.unit,
            estimatedUnitPrice: item.estimated_unit_price,
            totalEstimatedPrice: item.total_estimated_price
          })) || [{ itemName: "", quantity: 1, unit: "pcs", estimatedUnitPrice: 0, totalEstimatedPrice: 0 }]
        };
      }
    });
    const totalAmount = computed(() => {
      return form.value.items.reduce((sum, item) => sum + (item.totalEstimatedPrice || 0), 0);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      if (unref(requisition)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/admin/procurement/requisitions/${unref(route).params.id}`,
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
        _push(`<div><h1 class="text-3xl font-bold">Edit Requisition</h1><p class="text-muted-foreground">${ssrInterpolate(unref(requisition).prNumber)} - ${ssrInterpolate(unref(requisition).title)}</p></div></div><form class="grid lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-card border border-border rounded-xl p-6 space-y-4"><h3 class="font-semibold">Basic Information</h3><div class="grid md:grid-cols-2 gap-4"><div class="md:col-span-2 space-y-2"><label class="text-sm font-medium">Title *</label><input${ssrRenderAttr("value", unref(form).title)} type="text" class="w-full px-4 py-2 bg-background border border-border rounded-lg" required></div><div class="space-y-2"><label class="text-sm font-medium">Category *</label><select class="w-full px-4 py-2 bg-background border border-border rounded-lg" required><option value="furniture"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "furniture") : ssrLooseEqual(unref(form).category, "furniture")) ? " selected" : ""}>Furniture</option><option value="it_hardware"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "it_hardware") : ssrLooseEqual(unref(form).category, "it_hardware")) ? " selected" : ""}>IT Hardware</option><option value="office_supplies"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "office_supplies") : ssrLooseEqual(unref(form).category, "office_supplies")) ? " selected" : ""}>Office Supplies</option><option value="cleaning_supplies"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "cleaning_supplies") : ssrLooseEqual(unref(form).category, "cleaning_supplies")) ? " selected" : ""}>Cleaning Supplies</option><option value="maintenance"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "maintenance") : ssrLooseEqual(unref(form).category, "maintenance")) ? " selected" : ""}>Maintenance</option><option value="other"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "other") : ssrLooseEqual(unref(form).category, "other")) ? " selected" : ""}>Other</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Priority *</label><select class="w-full px-4 py-2 bg-background border border-border rounded-lg" required><option value="low"${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "low") : ssrLooseEqual(unref(form).priority, "low")) ? " selected" : ""}>Low</option><option value="medium"${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "medium") : ssrLooseEqual(unref(form).priority, "medium")) ? " selected" : ""}>Medium</option><option value="high"${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "high") : ssrLooseEqual(unref(form).priority, "high")) ? " selected" : ""}>High</option><option value="urgent"${ssrIncludeBooleanAttr(Array.isArray(unref(form).priority) ? ssrLooseContain(unref(form).priority, "urgent") : ssrLooseEqual(unref(form).priority, "urgent")) ? " selected" : ""}>Urgent</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Delivery Location *</label><select class="w-full px-4 py-2 bg-background border border-border rounded-lg" required><option value="1"${ssrIncludeBooleanAttr(Array.isArray(unref(form).propertyId) ? ssrLooseContain(unref(form).propertyId, "1") : ssrLooseEqual(unref(form).propertyId, "1")) ? " selected" : ""}>Innovation Hub</option><option value="2"${ssrIncludeBooleanAttr(Array.isArray(unref(form).propertyId) ? ssrLooseContain(unref(form).propertyId, "2") : ssrLooseEqual(unref(form).propertyId, "2")) ? " selected" : ""}>Tech Park Tower</option><option value="3"${ssrIncludeBooleanAttr(Array.isArray(unref(form).propertyId) ? ssrLooseContain(unref(form).propertyId, "3") : ssrLooseEqual(unref(form).propertyId, "3")) ? " selected" : ""}>Business Plaza</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Required By Date</label><input${ssrRenderAttr("value", unref(form).requiredDate)} type="date" class="w-full px-4 py-2 bg-background border border-border rounded-lg"></div><div class="md:col-span-2 space-y-2"><label class="text-sm font-medium">Description / Justification</label><textarea rows="3" class="w-full px-4 py-2 bg-background border border-border rounded-lg resize-none">${ssrInterpolate(unref(form).description)}</textarea></div></div></div><div class="bg-card border border-border rounded-xl p-6 space-y-4"><div class="flex items-center justify-between"><h3 class="font-semibold">Line Items</h3><button type="button" class="flex items-center gap-2 text-sm text-primary hover:underline">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:plus",
          class: "w-4 h-4"
        }, null, _parent));
        _push(` Add Item </button></div><!--[-->`);
        ssrRenderList(unref(form).items, (item, index) => {
          _push(`<div class="p-4 bg-muted/30 rounded-lg space-y-4"><div class="flex items-center justify-between"><span class="text-sm font-medium">Item ${ssrInterpolate(index + 1)}</span>`);
          if (unref(form).items.length > 1) {
            _push(`<button type="button" class="text-red-500 hover:text-red-700">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "lucide:trash-2",
              class: "w-4 h-4"
            }, null, _parent));
            _push(`</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="grid md:grid-cols-4 gap-4"><div class="md:col-span-2 space-y-2"><label class="text-xs text-muted-foreground">Item Name *</label><input${ssrRenderAttr("value", item.itemName)} type="text" class="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm" required></div><div class="space-y-2"><label class="text-xs text-muted-foreground">Quantity *</label><input${ssrRenderAttr("value", item.quantity)} type="number" min="1" class="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm" required></div><div class="space-y-2"><label class="text-xs text-muted-foreground">Unit</label><select class="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"><option value="pcs"${ssrIncludeBooleanAttr(Array.isArray(item.unit) ? ssrLooseContain(item.unit, "pcs") : ssrLooseEqual(item.unit, "pcs")) ? " selected" : ""}>Pieces</option><option value="sets"${ssrIncludeBooleanAttr(Array.isArray(item.unit) ? ssrLooseContain(item.unit, "sets") : ssrLooseEqual(item.unit, "sets")) ? " selected" : ""}>Sets</option><option value="boxes"${ssrIncludeBooleanAttr(Array.isArray(item.unit) ? ssrLooseContain(item.unit, "boxes") : ssrLooseEqual(item.unit, "boxes")) ? " selected" : ""}>Boxes</option><option value="kg"${ssrIncludeBooleanAttr(Array.isArray(item.unit) ? ssrLooseContain(item.unit, "kg") : ssrLooseEqual(item.unit, "kg")) ? " selected" : ""}>Kilograms</option><option value="liters"${ssrIncludeBooleanAttr(Array.isArray(item.unit) ? ssrLooseContain(item.unit, "liters") : ssrLooseEqual(item.unit, "liters")) ? " selected" : ""}>Liters</option></select></div><div class="space-y-2"><label class="text-xs text-muted-foreground">Est. Unit Price (₹)</label><input${ssrRenderAttr("value", item.estimatedUnitPrice)} type="number" min="0" class="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"></div><div class="md:col-span-3 text-right text-sm text-muted-foreground"> Item Total: <span class="font-medium text-foreground">₹${ssrInterpolate(item.totalEstimatedPrice?.toLocaleString() || 0)}</span></div></div></div>`);
        });
        _push(`<!--]--></div></div><div class="space-y-6"><div class="bg-card border border-border rounded-xl p-6 space-y-4 sticky top-6"><h3 class="font-semibold">Summary</h3><div class="space-y-3 text-sm"><div class="flex justify-between"><span class="text-muted-foreground">Items</span><span class="font-medium">${ssrInterpolate(unref(form).items.length)}</span></div><div class="flex justify-between border-t border-border pt-3"><span class="text-muted-foreground">Total Estimated Amount</span><span class="text-lg font-bold text-primary">₹${ssrInterpolate(unref(totalAmount).toLocaleString())}</span></div></div><div class="pt-4 border-t border-border space-y-3"><button type="submit" class="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"> Update Requisition </button>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/admin/procurement/requisitions/${unref(route).params.id}`,
          class: "block w-full py-3 text-center border border-border rounded-lg hover:bg-muted"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Cancel `);
            } else {
              return [
                createTextVNode(" Cancel ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></form></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/procurement/requisitions/[id]/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=edit-Bp2MhJ8M.js.map
