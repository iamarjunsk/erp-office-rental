import { u as useAuth, a as __nuxt_component_0 } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-CrgyHNyr.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const { isLoading, error } = useAuth();
    const form = ref({
      email: "",
      password: "",
      password_confirm: "",
      first_name: "",
      last_name: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" }, _attrs))}><div class="w-full max-w-md mx-4"><div class="text-center mb-8"><div class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:building-2",
        class: "w-8 h-8 text-primary"
      }, null, _parent));
      _push(`</div><h1 class="text-3xl font-bold text-white">Create Account</h1><p class="text-slate-400 mt-2">Join OfficeERP today</p></div><div class="bg-card border border-border rounded-2xl p-8 shadow-2xl"><form class="space-y-4"><div class="grid grid-cols-2 gap-4"><div><label class="block text-sm font-medium mb-2">First Name</label><input${ssrRenderAttr("value", unref(form).first_name)} type="text" placeholder="John" class="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" required></div><div><label class="block text-sm font-medium mb-2">Last Name</label><input${ssrRenderAttr("value", unref(form).last_name)} type="text" placeholder="Doe" class="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" required></div></div><div><label class="block text-sm font-medium mb-2">Email</label><input${ssrRenderAttr("value", unref(form).email)} type="email" placeholder="you@example.com" class="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" required></div><div><label class="block text-sm font-medium mb-2">Password</label><input${ssrRenderAttr("value", unref(form).password)} type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" class="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" required></div><div><label class="block text-sm font-medium mb-2">Confirm Password</label><input${ssrRenderAttr("value", unref(form).password_confirm)} type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" class="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" required></div>`);
      if (unref(error)) {
        _push(`<div class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} class="w-full py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">`);
      if (unref(isLoading)) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:loader-2",
          class: "w-5 h-5 animate-spin"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<span>${ssrInterpolate(unref(isLoading) ? "Creating account..." : "Create Account")}</span></button></form><p class="text-center mt-6 text-sm text-muted-foreground"> Already have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/login",
        class: "text-primary hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Sign in`);
          } else {
            return [
              createTextVNode("Sign in")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-CWln6CYw.mjs.map
