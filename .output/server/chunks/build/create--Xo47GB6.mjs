import { _ as __nuxt_component_0 } from './nuxt-link-CrgyHNyr.mjs';
import { b as useRoute, u as useAuth, a as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, computed, withAsyncContext, ref, mergeProps, withCtx, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
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

const API_BASE = "http://localhost:8000/api/procurement";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const fromPR = computed(() => !!route.query.prId);
    const { authHeaders } = useAuth();
    const { data: vendorData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/vendors/`,
      {
        headers: authHeaders()
      },
      "$ZnWUv4wNdK"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { data: propertyData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/properties",
      "$uiSpbTqBUk"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const prData = ref(null);
    if (fromPR.value) {
      const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(
        `${API_BASE}/requisitions/${route.query.prId}/`,
        {
          headers: authHeaders()
        },
        "$ddPzVz3cvy"
        /* nuxt-injected */
      )), __temp = await __temp, __restore(), __temp);
      prData.value = data.value;
      if (prData.value) {
        setTimeout(() => {
          var _a;
          form.value.title = `PO for ${prData.value.title}`;
          form.value.propertyId = prData.value.propertyId;
          form.value.items = ((_a = prData.value.items) == null ? void 0 : _a.map((item) => ({
            itemName: item.item_name,
            quantity: item.quantity,
            unit: item.unit || "pcs",
            unitPrice: item.estimated_unit_price || 0
          }))) || form.value.items;
        }, 0);
      }
    }
    const fromVendor = computed(() => !!route.query.vendorId);
    if (fromVendor.value) {
      setTimeout(() => {
        form.value.vendorId = route.query.vendorId;
      }, 100);
    }
    const vendors = computed(() => {
      var _a;
      return ((_a = vendorData.value) == null ? void 0 : _a.results) || vendorData.value || [];
    });
    const properties = computed(() => {
      var _a;
      return ((_a = propertyData.value) == null ? void 0 : _a.data) || [];
    });
    const saving = ref(false);
    const form = ref({
      title: "",
      vendorId: "",
      propertyId: "",
      expectedDeliveryDate: "",
      paymentTerms: "net_30",
      deliveryTerms: "door_delivery",
      specialInstructions: "",
      taxRate: 18,
      shippingCost: 0,
      items: [
        { itemName: "", quantity: 1, unit: "pcs", unitPrice: 0 }
      ]
    });
    const subtotal = computed(
      () => form.value.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
    );
    const taxAmount = computed(
      () => Math.round(subtotal.value * (form.value.taxRate / 100))
    );
    const totalAmount = computed(
      () => subtotal.value + taxAmount.value + form.value.shippingCost
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/procurement/purchase-orders",
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
      _push(`<div><h1 class="text-3xl font-bold">Create Purchase Order</h1><p class="text-muted-foreground">`);
      if (unref(fromPR)) {
        _push(`<span>Convert PR ${ssrInterpolate((_a = unref(prData)) == null ? void 0 : _a.prNumber)} to Purchase Order</span>`);
      } else {
        _push(`<span>Create a new purchase order</span>`);
      }
      _push(`</p></div></div><form class="space-y-6"><div class="grid lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-card border border-border rounded-xl p-6 space-y-4"><h2 class="text-lg font-semibold">Order Information</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Order Title *</label><input${ssrRenderAttr("value", unref(form).title)} type="text" placeholder="e.g., Office Supplies Order - Feb 2024" class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Vendor *</label><select class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).vendorId) ? ssrLooseContain(unref(form).vendorId, "") : ssrLooseEqual(unref(form).vendorId, "")) ? " selected" : ""}>Select vendor</option><!--[-->`);
      ssrRenderList(unref(vendors), (vendor) => {
        _push(`<option${ssrRenderAttr("value", vendor.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).vendorId) ? ssrLooseContain(unref(form).vendorId, vendor.id) : ssrLooseEqual(unref(form).vendorId, vendor.id)) ? " selected" : ""}>${ssrInterpolate(vendor.name)} (${ssrInterpolate(vendor.code)}) </option>`);
      });
      _push(`<!--]--></select></div></div><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Expected Delivery Date *</label><input${ssrRenderAttr("value", unref(form).expectedDeliveryDate)} type="date" class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required></div><div class="space-y-2"><label class="text-sm font-medium">Delivery Location *</label><select class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).propertyId) ? ssrLooseContain(unref(form).propertyId, "") : ssrLooseEqual(unref(form).propertyId, "")) ? " selected" : ""}>Select property</option><!--[-->`);
      ssrRenderList(unref(properties), (prop) => {
        _push(`<option${ssrRenderAttr("value", prop.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).propertyId) ? ssrLooseContain(unref(form).propertyId, prop.id) : ssrLooseEqual(unref(form).propertyId, prop.id)) ? " selected" : ""}>${ssrInterpolate(prop.name)}</option>`);
      });
      _push(`<!--]--></select></div></div></div><div class="bg-card border border-border rounded-xl p-6 space-y-4"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold">Order Items</h2><button type="button" class="flex items-center gap-2 text-sm text-primary hover:underline">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:plus-circle",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Add Item </button></div><div class="space-y-4"><!--[-->`);
      ssrRenderList(unref(form).items, (item, index) => {
        _push(`<div class="p-4 bg-muted/50 rounded-lg space-y-3"><div class="flex items-center justify-between"><span class="text-sm font-medium">Item ${ssrInterpolate(index + 1)}</span>`);
        if (unref(form).items.length > 1) {
          _push(`<button type="button" class="p-1 text-red-500 hover:bg-red-50 rounded">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:trash-2",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="grid md:grid-cols-5 gap-3"><div class="md:col-span-2 space-y-1"><label class="text-xs text-muted-foreground">Item Name *</label><input${ssrRenderAttr("value", item.itemName)} type="text" placeholder="Item name" class="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg" required></div><div class="space-y-1"><label class="text-xs text-muted-foreground">Quantity *</label><input${ssrRenderAttr("value", item.quantity)} type="number" min="1" class="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg" required></div><div class="space-y-1"><label class="text-xs text-muted-foreground">Unit</label><select class="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg"><option value="pcs"${ssrIncludeBooleanAttr(Array.isArray(item.unit) ? ssrLooseContain(item.unit, "pcs") : ssrLooseEqual(item.unit, "pcs")) ? " selected" : ""}>Pieces</option><option value="kg"${ssrIncludeBooleanAttr(Array.isArray(item.unit) ? ssrLooseContain(item.unit, "kg") : ssrLooseEqual(item.unit, "kg")) ? " selected" : ""}>Kilograms</option><option value="ltr"${ssrIncludeBooleanAttr(Array.isArray(item.unit) ? ssrLooseContain(item.unit, "ltr") : ssrLooseEqual(item.unit, "ltr")) ? " selected" : ""}>Liters</option><option value="box"${ssrIncludeBooleanAttr(Array.isArray(item.unit) ? ssrLooseContain(item.unit, "box") : ssrLooseEqual(item.unit, "box")) ? " selected" : ""}>Boxes</option><option value="pack"${ssrIncludeBooleanAttr(Array.isArray(item.unit) ? ssrLooseContain(item.unit, "pack") : ssrLooseEqual(item.unit, "pack")) ? " selected" : ""}>Packs</option></select></div><div class="space-y-1"><label class="text-xs text-muted-foreground">Unit Price (\u20B9) *</label><input${ssrRenderAttr("value", item.unitPrice)} type="number" min="0" placeholder="0" class="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg" required></div></div><div class="flex justify-between items-center pt-2 border-t border-border"><span class="text-sm text-muted-foreground">Item Total</span><span class="font-medium">\u20B9${ssrInterpolate((item.quantity * item.unitPrice).toLocaleString())}</span></div></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-card border border-border rounded-xl p-6 space-y-4"><h2 class="text-lg font-semibold">Terms &amp; Conditions</h2><div class="grid md:grid-cols-2 gap-4"><div class="space-y-2"><label class="text-sm font-medium">Payment Terms</label><select class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"><option value="net_30"${ssrIncludeBooleanAttr(Array.isArray(unref(form).paymentTerms) ? ssrLooseContain(unref(form).paymentTerms, "net_30") : ssrLooseEqual(unref(form).paymentTerms, "net_30")) ? " selected" : ""}>Net 30 Days</option><option value="net_15"${ssrIncludeBooleanAttr(Array.isArray(unref(form).paymentTerms) ? ssrLooseContain(unref(form).paymentTerms, "net_15") : ssrLooseEqual(unref(form).paymentTerms, "net_15")) ? " selected" : ""}>Net 15 Days</option><option value="net_45"${ssrIncludeBooleanAttr(Array.isArray(unref(form).paymentTerms) ? ssrLooseContain(unref(form).paymentTerms, "net_45") : ssrLooseEqual(unref(form).paymentTerms, "net_45")) ? " selected" : ""}>Net 45 Days</option><option value="cod"${ssrIncludeBooleanAttr(Array.isArray(unref(form).paymentTerms) ? ssrLooseContain(unref(form).paymentTerms, "cod") : ssrLooseEqual(unref(form).paymentTerms, "cod")) ? " selected" : ""}>Cash on Delivery</option><option value="advance"${ssrIncludeBooleanAttr(Array.isArray(unref(form).paymentTerms) ? ssrLooseContain(unref(form).paymentTerms, "advance") : ssrLooseEqual(unref(form).paymentTerms, "advance")) ? " selected" : ""}>Advance Payment</option></select></div><div class="space-y-2"><label class="text-sm font-medium">Delivery Terms</label><select class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"><option value="door_delivery"${ssrIncludeBooleanAttr(Array.isArray(unref(form).deliveryTerms) ? ssrLooseContain(unref(form).deliveryTerms, "door_delivery") : ssrLooseEqual(unref(form).deliveryTerms, "door_delivery")) ? " selected" : ""}>Door Delivery</option><option value="ex_works"${ssrIncludeBooleanAttr(Array.isArray(unref(form).deliveryTerms) ? ssrLooseContain(unref(form).deliveryTerms, "ex_works") : ssrLooseEqual(unref(form).deliveryTerms, "ex_works")) ? " selected" : ""}>Ex Works</option><option value="fob"${ssrIncludeBooleanAttr(Array.isArray(unref(form).deliveryTerms) ? ssrLooseContain(unref(form).deliveryTerms, "fob") : ssrLooseEqual(unref(form).deliveryTerms, "fob")) ? " selected" : ""}>FOB</option></select></div></div><div class="space-y-2"><label class="text-sm font-medium">Special Instructions</label><textarea rows="3" placeholder="Any special delivery or handling instructions..." class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none">${ssrInterpolate(unref(form).specialInstructions)}</textarea></div></div></div><div class="space-y-6"><div class="bg-card border border-border rounded-xl p-6 space-y-4 sticky top-6"><h3 class="font-semibold">Order Summary</h3><dl class="space-y-3 text-sm"><div class="flex justify-between"><dt class="text-muted-foreground">Subtotal</dt><dd>\u20B9${ssrInterpolate(unref(subtotal).toLocaleString())}</dd></div><div class="flex justify-between items-center"><dt class="text-muted-foreground">Tax Rate (%)</dt><dd><input${ssrRenderAttr("value", unref(form).taxRate)} type="number" min="0" max="100" class="w-16 px-2 py-1 text-right bg-background border border-border rounded"></dd></div><div class="flex justify-between"><dt class="text-muted-foreground">Tax Amount</dt><dd>\u20B9${ssrInterpolate(unref(taxAmount).toLocaleString())}</dd></div><div class="flex justify-between items-center"><dt class="text-muted-foreground">Shipping (\u20B9)</dt><dd><input${ssrRenderAttr("value", unref(form).shippingCost)} type="number" min="0" class="w-20 px-2 py-1 text-right bg-background border border-border rounded"></dd></div><div class="flex justify-between pt-3 border-t border-border text-base font-semibold"><dt>Total Amount</dt><dd class="text-primary">\u20B9${ssrInterpolate(unref(totalAmount).toLocaleString())}</dd></div></dl><div class="pt-4 space-y-2"><button type="submit" class="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""}>${ssrInterpolate(unref(saving) ? "Creating..." : "Create & Send to Vendor")}</button><button type="button" class="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""}> Save as Draft </button></div></div>`);
      if (unref(fromPR) && unref(prData)) {
        _push(`<div class="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-3"><div class="flex items-center gap-2 text-blue-700">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:file-text",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`<span class="font-semibold">From Purchase Requisition</span></div><dl class="text-sm space-y-2"><div class="flex justify-between"><dt class="text-blue-600">PR Number</dt><dd class="font-medium">${ssrInterpolate(unref(prData).prNumber)}</dd></div><div class="flex justify-between"><dt class="text-blue-600">Title</dt><dd>${ssrInterpolate(unref(prData).title)}</dd></div><div class="flex justify-between"><dt class="text-blue-600">Estimated Amount</dt><dd class="font-medium">\u20B9${ssrInterpolate((_b = unref(prData).totalEstimatedAmount) == null ? void 0 : _b.toLocaleString())}</dd></div></dl></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/procurement/purchase-orders/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=create--Xo47GB6.mjs.map
