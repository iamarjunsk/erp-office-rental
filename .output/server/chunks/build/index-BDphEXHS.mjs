import { a as __nuxt_component_0 } from './server.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const calendarDates = Array.from({ length: 28 }, (_, i) => i + 1);
    const hasBooking = (date) => [5, 12, 15, 18, 22, 25].includes(date);
    const getBookingCount = (date) => {
      const counts = { 5: 2, 12: 1, 15: 3, 18: 1, 22: 2, 25: 1 };
      return counts[date] || 0;
    };
    const recentBookings = [
      { id: 1, space: "Meeting Room FL-01-102", company: "Tech Solutions", purpose: "Team Meeting", date: "Feb 5, 2026", time: "10:00 AM - 12:00 PM" },
      { id: 2, space: "Conference Hall A", company: "Innovate Labs", purpose: "Client Presentation", date: "Feb 5, 2026", time: "2:00 PM - 4:00 PM" },
      { id: 3, space: "Hot Desk Zone", company: "Freelancer", purpose: "Daily Work", date: "Feb 6, 2026", time: "9:00 AM - 6:00 PM" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-3xl font-bold">Bookings</h1><p class="text-muted-foreground">Manage space bookings and reservations</p></div><button class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:plus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` New Booking </button></div><div class="bg-card border border-border rounded-lg p-6"><div class="flex items-center justify-between mb-6"><h3 class="text-lg font-semibold">Booking Calendar</h3><div class="flex items-center gap-2"><button class="p-2 border border-border rounded-lg hover:bg-muted">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:chevron-left",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button><span class="px-4 py-2 border border-border rounded-lg">February 2026</span><button class="p-2 border border-border rounded-lg hover:bg-muted">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:chevron-right",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button></div></div><div class="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden"><!--[-->`);
      ssrRenderList(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], (day) => {
        _push(`<div class="bg-muted p-3 text-center text-sm font-medium">${ssrInterpolate(day)}</div>`);
      });
      _push(`<!--]--><!--[-->`);
      ssrRenderList(unref(calendarDates), (date) => {
        _push(`<div class="bg-card p-3 min-h-24 hover:bg-muted/50"><span class="text-sm">${ssrInterpolate(date)}</span>`);
        if (hasBooking(date)) {
          _push(`<div class="mt-1"><span class="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">${ssrInterpolate(getBookingCount(date))} bookings </span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><div class="bg-card border border-border rounded-lg"><div class="p-6 border-b border-border"><h3 class="text-lg font-semibold">Recent Bookings</h3></div><div class="divide-y divide-border"><!--[-->`);
      ssrRenderList(recentBookings, (booking) => {
        _push(`<div class="p-4 flex items-center justify-between hover:bg-muted/50"><div class="flex items-center gap-4"><div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:calendar",
          class: "w-5 h-5 text-primary"
        }, null, _parent));
        _push(`</div><div><p class="font-medium">${ssrInterpolate(booking.space)}</p><p class="text-sm text-muted-foreground">${ssrInterpolate(booking.company)} \u2022 ${ssrInterpolate(booking.purpose)}</p></div></div><div class="text-right"><p class="font-medium">${ssrInterpolate(booking.date)}</p><p class="text-sm text-muted-foreground">${ssrInterpolate(booking.time)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/bookings/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BDphEXHS.mjs.map
