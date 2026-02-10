import { u as useAuth, a as __nuxt_component_0 } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-CrgyHNyr.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderDynamicModel, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const { isLoading, error } = useAuth();
    const isAuthChecking = ref(true);
    const form = ref({
      email: "",
      password: ""
    });
    const showPassword = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" }, _attrs))}><div class="w-full max-w-md mx-4"><div class="text-center mb-8"><div class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:building-2",
        class: "w-8 h-8 text-primary"
      }, null, _parent));
      _push(`</div><h1 class="text-3xl font-bold text-white">OfficeERP</h1><p class="text-slate-400 mt-2">Sign in to your account</p></div>`);
      if (unref(isAuthChecking)) {
        _push(`<div class="bg-card border border-border rounded-2xl p-8 shadow-2xl text-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:loader-2",
          class: "w-8 h-8 animate-spin mx-auto text-primary mb-4"
        }, null, _parent));
        _push(`<p class="text-muted-foreground">Checking authentication...</p></div>`);
      } else {
        _push(`<div class="bg-card border border-border rounded-2xl p-8 shadow-2xl"><form class="space-y-5"><div><label class="block text-sm font-medium mb-2">Email</label><div class="relative">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:mail",
          class: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
        }, null, _parent));
        _push(`<input${ssrRenderAttr("value", unref(form).email)} type="email" placeholder="you@example.com" class="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all" required></div></div><div><label class="block text-sm font-medium mb-2">Password</label><div class="relative">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:lock",
          class: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
        }, null, _parent));
        _push(`<input${ssrRenderDynamicModel(unref(showPassword) ? "text" : "password", unref(form).password, null)}${ssrRenderAttr("type", unref(showPassword) ? "text" : "password")} placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" class="w-full pl-12 pr-12 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all" required><button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: unref(showPassword) ? "lucide:eye-off" : "lucide:eye",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div></div>`);
        if (unref(error)) {
          _push(`<div class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">${ssrInterpolate(unref(error))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} class="w-full py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">`);
        if (unref(isLoading)) {
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:loader-2",
            class: "w-5 h-5 animate-spin"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<span>${ssrInterpolate(unref(isLoading) ? "Signing in..." : "Sign in")}</span></button></form><div class="flex items-center my-6"><div class="flex-1 border-t border-border"></div><span class="px-4 text-sm text-muted-foreground">or</span><div class="flex-1 border-t border-border"></div></div><div class="space-y-2"><p class="text-sm text-muted-foreground text-center mb-3">Quick login for demo:</p><button class="w-full py-2.5 border border-border rounded-lg hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:shield",
          class: "w-4 h-4"
        }, null, _parent));
        _push(` Login as Admin </button><button class="w-full py-2.5 border border-border rounded-lg hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:user",
          class: "w-4 h-4"
        }, null, _parent));
        _push(` Login as Manager </button></div><p class="text-center mt-6 text-sm text-muted-foreground"> Don&#39;t have an account? `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/register",
          class: "text-primary hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Sign up`);
            } else {
              return [
                createTextVNode("Sign up")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p></div>`);
      }
      _push(`<p class="text-center mt-6 text-sm text-slate-500"> \xA9 2024 OfficeERP. All rights reserved. </p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-B2FODS8J.mjs.map
