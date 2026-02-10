import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { hasInjectionContext, inject, computed, getCurrentInstance, defineComponent, watch, ref, withAsyncContext, mergeProps, unref, createVNode, resolveDynamicComponent, toRef, isRef, createElementBlock, shallowRef, provide, cloneVNode, h, defineAsyncComponent, shallowReactive, Suspense, Fragment, useSSRContext, createApp, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, renderList, onErrorCaptured, onServerPrefetch, reactive, effectScope, nextTick, getCurrentScope, isReadonly, isShallow, isReactive, toRaw, markRaw } from 'vue';
import { c as createError$1, n as klona, o as hasProtocol, p as isScriptProtocol, l as joinURL, w as withQuery, q as defuFn, r as sanitizeStatusCode, t as getContext, $ as $fetch$1, v as createHooks, x as defu, y as executeAsync } from '../nitro/nitro.mjs';
import { b as baseURL } from '../routes/renderer.mjs';
import { useRoute as useRoute$1, RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderVNode, ssrRenderSlot, ssrInterpolate, ssrRenderList, ssrRenderSuspense } from 'vue/server-renderer';
import { Icon as Icon$1 } from '@iconify/vue/dist/offline';
import { addAPIProvider, loadIcon } from '@iconify/vue';
import { ToastRoot, ToastTitle, ToastDescription, ToastClose, ToastAction, ToastProvider, ToastViewport } from 'radix-vue';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const appLayoutTransition = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "value": null, "errorValue": null, "deep": true };
const fetchDefaults = {};
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.21.0";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    const unresolvedPluginsForThisPlugin = plugin2.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin2.parallel && !nuxtApp.payload.error) {
          throw e;
        }
        error ||= e;
      });
      if (plugin2.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = /* @__PURE__ */ Symbol("layout-meta");
const PageRouteSymbol = /* @__PURE__ */ Symbol("route");
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext["~renderResponse"] = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return options?.replace ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const error2 = /* @__PURE__ */ useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  if (typeof error !== "string" && error.statusText) {
    error.message ??= error.statusText;
  }
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
const matcher = (m, p) => {
  return [];
};
const _routeRulesMatcher = (path) => defu({}, ...matcher().map((r) => r.data).reverse());
const routeRulesMatcher$1 = _routeRulesMatcher;
function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  try {
    return routeRulesMatcher$1(path);
  } catch (e) {
    console.error("[nuxt] Error matching route rules.", e);
    return {};
  }
}
const __nuxt_page_meta$I = {
  middleware: [
    function(to, from) {
      return navigateTo("/admin");
    }
  ]
};
const __nuxt_page_meta$H = {
  layout: "blank"
};
const __nuxt_page_meta$G = {
  layout: "blank"
};
const __nuxt_page_meta$F = {
  layout: "admin"
};
const __nuxt_page_meta$E = {
  layout: "admin"
};
const __nuxt_page_meta$D = {
  layout: "admin"
};
const __nuxt_page_meta$C = {
  layout: "admin"
};
const __nuxt_page_meta$B = {
  layout: "admin"
};
const __nuxt_page_meta$A = {
  layout: "admin"
};
const __nuxt_page_meta$z = {
  layout: "admin"
};
const __nuxt_page_meta$y = {
  layout: "admin"
};
const __nuxt_page_meta$x = {
  layout: "admin"
};
const __nuxt_page_meta$w = {
  layout: "admin"
};
const __nuxt_page_meta$v = {
  layout: "admin"
};
const __nuxt_page_meta$u = {
  layout: "admin"
};
const __nuxt_page_meta$t = {
  layout: "admin"
};
const __nuxt_page_meta$s = {
  layout: "admin"
};
const __nuxt_page_meta$r = {
  layout: "admin"
};
const __nuxt_page_meta$q = {
  layout: "admin"
};
const __nuxt_page_meta$p = {
  layout: "admin"
};
const __nuxt_page_meta$o = {
  layout: "admin"
};
const __nuxt_page_meta$n = {
  layout: "admin"
};
const __nuxt_page_meta$m = {
  layout: "admin"
};
const __nuxt_page_meta$l = {
  layout: "admin"
};
const __nuxt_page_meta$k = {
  layout: "admin"
};
const __nuxt_page_meta$j = {
  layout: "admin"
};
const __nuxt_page_meta$i = {
  layout: "admin"
};
const __nuxt_page_meta$h = {
  layout: "admin"
};
const __nuxt_page_meta$g = {
  layout: "admin"
};
const __nuxt_page_meta$f = {
  layout: "admin"
};
const __nuxt_page_meta$e = {
  layout: "admin"
};
const __nuxt_page_meta$d = {
  layout: "admin"
};
const __nuxt_page_meta$c = {
  layout: "admin"
};
const __nuxt_page_meta$b = {
  layout: "admin"
};
const __nuxt_page_meta$a = {
  layout: "admin"
};
const __nuxt_page_meta$9 = {
  layout: "admin"
};
const __nuxt_page_meta$8 = {
  layout: "admin"
};
const __nuxt_page_meta$7 = {
  layout: "admin"
};
const __nuxt_page_meta$6 = {
  layout: "admin"
};
const __nuxt_page_meta$5 = {
  layout: "admin"
};
const __nuxt_page_meta$4 = {
  layout: "admin"
};
const __nuxt_page_meta$3 = {
  layout: "admin"
};
const __nuxt_page_meta$2 = {
  layout: "admin"
};
const __nuxt_page_meta$1 = {
  layout: "admin"
};
const __nuxt_page_meta = {
  layout: "admin"
};
const _routes = [
  {
    name: "index",
    path: "/",
    meta: __nuxt_page_meta$I || {},
    component: () => import('./index-CPCF0w8H.mjs')
  },
  {
    name: "login",
    path: "/login",
    meta: __nuxt_page_meta$H || {},
    component: () => import('./login-B2FODS8J.mjs')
  },
  {
    name: "register",
    path: "/register",
    meta: __nuxt_page_meta$G || {},
    component: () => import('./register-CWln6CYw.mjs')
  },
  {
    name: "admin",
    path: "/admin",
    meta: { ...__nuxt_page_meta$F || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-DLXN5L3H.mjs')
  },
  {
    name: "admin-users-id",
    path: "/admin/users/:id()",
    meta: { ...__nuxt_page_meta$E || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./_id_-BfctObNh.mjs')
  },
  {
    name: "admin-users",
    path: "/admin/users",
    meta: { ...__nuxt_page_meta$D || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-Bo8xripF.mjs')
  },
  {
    name: "admin-assets",
    path: "/admin/assets",
    meta: { ...__nuxt_page_meta$C || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-ByYsy8AQ.mjs')
  },
  {
    name: "admin-leases",
    path: "/admin/leases",
    meta: { ...__nuxt_page_meta$B || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-Ck-1O1vS.mjs')
  },
  {
    name: "admin-spaces",
    path: "/admin/spaces",
    meta: { ...__nuxt_page_meta$A || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-1kEtyOD-.mjs')
  },
  {
    name: "admin-assets-create",
    path: "/admin/assets/create",
    meta: { ...__nuxt_page_meta$z || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./create-Cn75-BV0.mjs')
  },
  {
    name: "admin-billing",
    path: "/admin/billing",
    meta: { ...__nuxt_page_meta$y || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-CzjHRmiz.mjs')
  },
  {
    name: "admin-leases-create",
    path: "/admin/leases/create",
    meta: { ...__nuxt_page_meta$x || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./create-hjYaQTVc.mjs')
  },
  {
    name: "admin-reports",
    path: "/admin/reports",
    meta: { ...__nuxt_page_meta$w || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-Du46SLdR.mjs')
  },
  {
    name: "admin-spaces-create",
    path: "/admin/spaces/create",
    meta: { ...__nuxt_page_meta$v || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./create-Dyl1OPaT.mjs')
  },
  {
    name: "admin-billing-create",
    path: "/admin/billing/create",
    meta: { ...__nuxt_page_meta$u || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./create-CkIDp2mC.mjs')
  },
  {
    name: "admin-bookings",
    path: "/admin/bookings",
    meta: { ...__nuxt_page_meta$t || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-BDphEXHS.mjs')
  },
  {
    name: "admin-companies",
    path: "/admin/companies",
    meta: { ...__nuxt_page_meta$s || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-DHPONLD1.mjs')
  },
  {
    name: "admin-assets-id-edit",
    path: "/admin/assets/:id()/edit",
    meta: { ...__nuxt_page_meta$r || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./edit-NeQCKc92.mjs')
  },
  {
    name: "admin-companies-create",
    path: "/admin/companies/create",
    meta: { ...__nuxt_page_meta$q || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./create-DRWrSWs8.mjs')
  },
  {
    name: "admin-leases-id-edit",
    path: "/admin/leases/:id()/edit",
    meta: { ...__nuxt_page_meta$p || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./edit-XWTKT51E.mjs')
  },
  {
    name: "admin-properties",
    path: "/admin/properties",
    meta: { ...__nuxt_page_meta$o || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-CXDe97MX.mjs')
  },
  {
    name: "admin-spaces-id-edit",
    path: "/admin/spaces/:id()/edit",
    meta: { ...__nuxt_page_meta$n || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./edit-DW9VW5wW.mjs')
  },
  {
    name: "admin-assets-id",
    path: "/admin/assets/:id()",
    meta: { ...__nuxt_page_meta$m || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-BqxTojSi.mjs')
  },
  {
    name: "admin-billing-id-edit",
    path: "/admin/billing/:id()/edit",
    meta: { ...__nuxt_page_meta$l || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./edit-bbrszIZ1.mjs')
  },
  {
    name: "admin-leases-id",
    path: "/admin/leases/:id()",
    meta: { ...__nuxt_page_meta$k || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-toXNCziI.mjs')
  },
  {
    name: "admin-maintenance",
    path: "/admin/maintenance",
    meta: { ...__nuxt_page_meta$j || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-Ba47qisv.mjs')
  },
  {
    name: "admin-procurement",
    path: "/admin/procurement",
    meta: { ...__nuxt_page_meta$i || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-Bu58t8Qi.mjs')
  },
  {
    name: "admin-properties-create",
    path: "/admin/properties/create",
    meta: { ...__nuxt_page_meta$h || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./create-C1bMH7AU.mjs')
  },
  {
    name: "admin-spaces-id",
    path: "/admin/spaces/:id()",
    meta: { ...__nuxt_page_meta$g || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-u9rW3pPL.mjs')
  },
  {
    name: "admin-billing-id",
    path: "/admin/billing/:id()",
    meta: { ...__nuxt_page_meta$f || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-Bt6F8hjx.mjs')
  },
  {
    name: "admin-maintenance-create",
    path: "/admin/maintenance/create",
    meta: { ...__nuxt_page_meta$e || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./create-C63FDbGm.mjs')
  },
  {
    name: "admin-companies-id-edit",
    path: "/admin/companies/:id()/edit",
    meta: { ...__nuxt_page_meta$d || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./edit-DQHDl4Mq.mjs')
  },
  {
    name: "admin-companies-id",
    path: "/admin/companies/:id()",
    meta: { ...__nuxt_page_meta$c || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-BWPm37m8.mjs')
  },
  {
    name: "admin-properties-id-edit",
    path: "/admin/properties/:id()/edit",
    meta: { ...__nuxt_page_meta$b || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./edit-CwcGN9wn.mjs')
  },
  {
    name: "admin-maintenance-id-edit",
    path: "/admin/maintenance/:id()/edit",
    meta: { ...__nuxt_page_meta$a || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./edit-BG-kP5nK.mjs')
  },
  {
    name: "admin-properties-id",
    path: "/admin/properties/:id()",
    meta: { ...__nuxt_page_meta$9 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-B1exqo1g.mjs')
  },
  {
    name: "admin-maintenance-id",
    path: "/admin/maintenance/:id()",
    meta: { ...__nuxt_page_meta$8 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-eeDkbt9Z.mjs')
  },
  {
    name: "admin-procurement-vendors",
    path: "/admin/procurement/vendors",
    meta: { ...__nuxt_page_meta$7 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-BVhzqelI.mjs')
  },
  {
    name: "admin-procurement-requisitions",
    path: "/admin/procurement/requisitions",
    meta: { ...__nuxt_page_meta$6 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-DKQfc9I2.mjs')
  },
  {
    name: "admin-procurement-requisitions-create",
    path: "/admin/procurement/requisitions/create",
    meta: { ...__nuxt_page_meta$5 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./create-BCuNqv2Q.mjs')
  },
  {
    name: "admin-procurement-purchase-orders-id",
    path: "/admin/procurement/purchase-orders/:id()",
    meta: { ...__nuxt_page_meta$4 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./_id_-Bbw0tvI0.mjs')
  },
  {
    name: "admin-procurement-purchase-orders",
    path: "/admin/procurement/purchase-orders",
    meta: { ...__nuxt_page_meta$3 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-DhulWdLc.mjs')
  },
  {
    name: "admin-procurement-purchase-orders-create",
    path: "/admin/procurement/purchase-orders/create",
    meta: { ...__nuxt_page_meta$2 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./create--Xo47GB6.mjs')
  },
  {
    name: "admin-procurement-requisitions-id-edit",
    path: "/admin/procurement/requisitions/:id()/edit",
    meta: { ...__nuxt_page_meta$1 || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./edit-Bp2MhJ8M.mjs')
  },
  {
    name: "admin-procurement-requisitions-id",
    path: "/admin/procurement/requisitions/:id()",
    meta: { ...__nuxt_page_meta || {}, ...{ "middleware": ["auth"] } },
    component: () => import('./index-BJI9SL9W.mjs')
  }
];
const _wrapInTransition = (props, children) => {
  return { default: () => children.default?.() };
};
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
    if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior: hashScrollBehaviour };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    const hookToWait = nuxtApp._runningTransition ? "page:transition:finish" : "page:loading:end";
    return new Promise((resolve) => {
      if (from === START_LOCATION) {
        resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
        return;
      }
      nuxtApp.hooks.hookOnce(hookToWait, () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
  if (savedPosition) {
    return savedPosition;
  }
  const isPageNavigation = isChangingPage(to, from);
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: isPageNavigation ? defaultHashScrollBehaviour : "instant"
    };
  }
  return {
    left: 0,
    top: 0
  };
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    status: result && (result.status || result.statusCode) || 404,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    statusText: result && (result.statusText || result.statusMessage) || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {
  auth: () => import('./auth-BU4G5EiH.mjs')
};
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = routerOptions.history?.(routerBase) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    router.afterEach((to, from) => {
      if (to.matched.at(-1)?.components?.default === from.matched.at(-1)?.components?.default) {
        syncCurrentRoute();
      }
    });
    const route = { sync: syncCurrentRoute };
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    if (!nuxtApp.ssrContext?.islandContext) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if (failure?.type === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if (nuxtApp.ssrContext?.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!nuxtApp.ssrContext?.islandContext) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        const routeRules = getRouteRules({ path: to.path });
        if (routeRules.appMiddleware) {
          for (const key in routeRules.appMiddleware) {
            if (routeRules.appMiddleware[key]) {
              middlewareEntries.add(key);
            } else {
              middlewareEntries.delete(key);
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await namedMiddleware[entry2]?.().then((r) => r.default || r) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            if (false) ;
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  status: 404,
                  statusText: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach((to) => {
      if (to.matched.length === 0) {
        return nuxtApp.runWithContext(() => showError(createError({
          status: 404,
          fatal: false,
          statusText: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const piniaSymbol = (
  /* istanbul ignore next */
  /* @__PURE__ */ Symbol()
);
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && true) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const inlineConfig = {
  "nuxt": {}
};
const __appConfig = /* @__PURE__ */ defuFn(inlineConfig);
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  nuxtApp._appConfig ||= klona(__appConfig);
  return nuxtApp._appConfig;
}
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "pinia",
  setup(nuxtApp) {
    const pinia = createPinia();
    nuxtApp.vueApp.use(pinia);
    {
      nuxtApp.payload.pinia = pinia.state.value;
    }
    return {
      provide: {
        pinia
      }
    };
  }
});
const LazyIcon = defineAsyncComponent(() => Promise.resolve().then(() => Icon).then((r) => r["default"] || r.default || r));
const LazyIconCSS = defineAsyncComponent(() => import('./IconCSS-DUtwOjQD.mjs').then((r) => r["default"] || r.default || r));
const lazyGlobalComponents = [
  ["Icon", LazyIcon],
  ["IconCSS", LazyIconCSS]
];
const components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const [name, component] of lazyGlobalComponents) {
      nuxtApp.vueApp.component(name, component);
      nuxtApp.vueApp.component("Lazy" + name, component);
    }
  }
});
const plugins = [
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  plugin$1,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  plugin,
  components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4
];
const layouts = {
  admin: defineAsyncComponent(() => import('./admin-DpkdtdYT.mjs').then((m) => m.default || m)),
  blank: defineAsyncComponent(() => import('./blank-C83AmV6e.mjs').then((m) => m.default || m))
};
const routeRulesMatcher = _routeRulesMatcher;
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  setup(props, context) {
    return () => h(layouts[props.name], props.layoutProps, context.slots);
  }
});
const nuxtLayoutProps = {
  name: {
    type: [String, Boolean, Object],
    default: null
  },
  fallback: {
    type: [String, Object],
    default: null
  }
};
const __nuxt_component_0$1 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: nuxtLayoutProps,
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const shouldUseEagerRoute = !injectedRoute || injectedRoute === useRoute();
    const route = shouldUseEagerRoute ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route?.meta.layout ?? routeRulesMatcher(route?.path).appLayout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = shallowRef();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    let lastLayout;
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route?.meta.layoutTransition ?? appLayoutTransition;
      const previouslyRenderedLayout = lastLayout;
      lastLayout = layout.value;
      return _wrapInTransition(hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, route.meta.layoutProps ?? {}, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              isRenderingNewLayout: (name) => {
                return name !== previouslyRenderedLayout && name === layout.value;
              },
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    },
    isRenderingNewLayout: {
      type: Function,
      required: true
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        // When name=false, always return true so NuxtPage doesn't skip rendering
        isCurrent: (route) => name === false || name === (route.meta.layout ?? routeRulesMatcher(route.path).appLayout ?? "default")
      });
    }
    const injectedRoute = inject(PageRouteSymbol);
    const isNotWithinNuxtPage = injectedRoute && injectedRoute === useRoute();
    if (isNotWithinNuxtPage) {
      const vueRouterRoute = useRoute$1();
      const reactiveChildRoute = {};
      for (const _key in vueRouterRoute) {
        const key = _key;
        Object.defineProperty(reactiveChildRoute, key, {
          enumerable: true,
          get: () => {
            return props.isRenderingNewLayout(props.name) ? vueRouterRoute[key] : injectedRoute[key];
          }
        });
      }
      provide(PageRouteSymbol, shallowReactive(reactiveChildRoute));
    }
    return () => {
      if (!name || typeof name === "string" && !(name in layouts)) {
        return context.slots.default?.();
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const iconCollections = ["fluent-emoji-high-contrast", "streamline-ultimate-color", "streamline-freehand-color", "streamline-kameleon-color", "streamline-stickies-color", "material-symbols-light", "streamline-plump-color", "streamline-sharp-color", "streamline-cyber-color", "streamline-flex-color", "cryptocurrency-color", "streamline-ultimate", "streamline-freehand", "material-icon-theme", "icon-park-outline", "icon-park-twotone", "fluent-emoji-flat", "emojione-monotone", "streamline-emojis", "heroicons-outline", "simple-line-icons", "material-symbols", "streamline-plump", "streamline-sharp", "streamline-cyber", "streamline-pixel", "streamline-block", "qlementine-icons", "streamline-color", "streamline-logos", "flat-color-icons", "icon-park-solid", "pepicons-pencil", "streamline-flex", "heroicons-solid", "pepicons-print", "cryptocurrency", "pixelarticons", "bitcoin-icons", "system-uicons", "sidekickicons", "devicon-plain", "entypo-social", "token-branded", "grommet-icons", "meteor-icons", "svg-spinners", "pepicons-pop", "dinkie-icons", "fluent-color", "vscode-icons", "simple-icons", "circle-flags", "medical-icon", "icomoon-free", "fluent-emoji", "majesticons", "humbleicons", "rivet-icons", "glyphs-poly", "radix-icons", "fa7-regular", "skill-icons", "emojione-v1", "academicons", "healthicons", "fa6-regular", "fluent-mdl2", "lucide-lab", "akar-icons", "lets-icons", "ant-design", "gravity-ui", "teenyicons", "streamline", "file-icons", "catppuccin", "fa7-brands", "game-icons", "foundation", "fa6-brands", "fa-regular", "mono-icons", "mdi-light", "iconamoon", "eos-icons", "gridicons", "duo-icons", "hugeicons", "lineicons", "wordpress", "zondicons", "heroicons", "fa7-solid", "icon-park", "arcticons", "meteocons", "dashicons", "fa6-solid", "fa-brands", "websymbol", "fontelico", "mingcute", "flowbite", "proicons", "guidance", "famicons", "roentgen", "bytesize", "marketeq", "nonicons", "brandico", "openmoji", "emojione", "flagpack", "fa-solid", "fontisto", "si-glyph", "pepicons", "line-md", "iconoir", "tdesign", "formkit", "clarity", "octicon", "pajamas", "codicon", "devicon", "twemoji", "noto-v1", "fxemoji", "raphael", "flat-ui", "topcoat", "feather", "tabler", "mynaui", "lucide", "circum", "carbon", "lsicon", "nimbus", "fluent", "glyphs", "memory", "garden", "temaki", "entypo", "icons8", "subway", "vaadin", "solar", "basil", "pixel", "typcn", "prime", "cuida", "stash", "charm", "quill", "codex", "picon", "logos", "token", "covid", "weui", "mage", "ooui", "maki", "unjs", "noto", "flag", "iwwa", "gala", "zmdi", "bpmn", "mdi", "uil", "bxs", "uim", "uit", "uis", "jam", "ion", "cil", "uiw", "oui", "nrk", "cib", "bxl", "cbi", "cif", "gis", "map", "geo", "fad", "eva", "wpf", "whh", "ic", "ri", "si", "bx", "gg", "ci", "fe", "mi", "ep", "bi", "ph", "ix", "ei", "f7", "wi", "la", "fa", "oi", "et", "el", "ls", "vs", "il", "ps"];
function resolveIconName(name = "") {
  let prefix;
  let provider = "";
  if (name[0] === "@" && name.includes(":")) {
    provider = name.split(":")[0].slice(1);
    name = name.split(":").slice(1).join(":");
  }
  if (name.startsWith("i-")) {
    name = name.replace(/^i-/, "");
    for (const collectionName of iconCollections) {
      if (name.startsWith(collectionName)) {
        prefix = collectionName;
        name = name.slice(collectionName.length + 1);
        break;
      }
    }
  } else if (name.includes(":")) {
    const [_prefix, _name] = name.split(":");
    prefix = _prefix;
    name = _name;
  }
  return {
    provider,
    prefix: prefix || "",
    name: name || ""
  };
}
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Icon",
  __ssrInlineRender: true,
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: ""
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const nuxtApp = useNuxtApp();
    const appConfig = useAppConfig();
    const props = __props;
    watch(() => appConfig.nuxtIcon?.iconifyApiOptions, () => {
      if (!appConfig.nuxtIcon?.iconifyApiOptions?.url) return;
      try {
        new URL(appConfig.nuxtIcon.iconifyApiOptions.url);
      } catch (e) {
        console.warn("Nuxt Icon: Invalid custom Iconify API URL");
        return;
      }
      if (appConfig.nuxtIcon?.iconifyApiOptions?.publicApiFallback) {
        addAPIProvider("custom", {
          resources: [appConfig.nuxtIcon?.iconifyApiOptions.url],
          index: 0
        });
        return;
      }
      addAPIProvider("", {
        resources: [appConfig.nuxtIcon?.iconifyApiOptions.url]
      });
    }, { immediate: true });
    const state = useState("icons", () => ({}));
    const isFetching = ref(false);
    const iconName = computed(() => {
      if (appConfig.nuxtIcon?.aliases?.[props.name]) {
        return appConfig.nuxtIcon.aliases[props.name];
      }
      return props.name;
    });
    const resolvedIcon = computed(() => resolveIconName(iconName.value));
    const iconKey = computed(() => [resolvedIcon.value.provider, resolvedIcon.value.prefix, resolvedIcon.value.name].filter(Boolean).join(":"));
    const icon = computed(() => state.value?.[iconKey.value]);
    const component = computed(() => nuxtApp.vueApp?.component(iconName.value));
    const sSize = computed(() => {
      if (!props.size && typeof appConfig.nuxtIcon?.size === "boolean" && !appConfig.nuxtIcon?.size) {
        return void 0;
      }
      const size = props.size || appConfig.nuxtIcon?.size || "1em";
      if (String(Number(size)) === size) {
        return `${size}px`;
      }
      return size;
    });
    const className = computed(() => appConfig?.nuxtIcon?.class ?? "icon");
    async function loadIconComponent() {
      if (component.value) {
        return;
      }
      if (!state.value?.[iconKey.value]) {
        isFetching.value = true;
        state.value[iconKey.value] = await loadIcon(resolvedIcon.value).catch(() => void 0);
        isFetching.value = false;
      }
    }
    watch(iconName, loadIconComponent);
    !component.value && ([__temp, __restore] = withAsyncContext(() => loadIconComponent()), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      if (isFetching.value) {
        _push(`<span${ssrRenderAttrs(mergeProps({
          class: className.value,
          style: { width: sSize.value, height: sSize.value }
        }, _attrs))} data-v-4847b53f></span>`);
      } else if (icon.value) {
        _push(ssrRenderComponent(unref(Icon$1), mergeProps({
          icon: icon.value,
          class: className.value,
          width: sSize.value,
          height: sSize.value
        }, _attrs), null, _parent));
      } else if (component.value) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(component.value), mergeProps({
          class: className.value,
          width: sSize.value,
          height: sSize.value
        }, _attrs), null), _parent);
      } else {
        _push(`<span${ssrRenderAttrs(mergeProps({
          class: className.value,
          style: { fontSize: sSize.value, lineHeight: sSize.value, width: sSize.value, height: sSize.value }
        }, _attrs))} data-v-4847b53f>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          _push(`${ssrInterpolate(__props.name)}`);
        }, _push, _parent);
        _push(`</span>`);
      }
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt-icon/dist/runtime/Icon.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-4847b53f"]]);
const Icon = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __nuxt_component_0
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "toast",
  __ssrInlineRender: true,
  props: {
    toast: {}
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const toastClasses = computed(() => {
      switch (props.toast.variant) {
        case "success":
          return "border-green-200 bg-green-50 text-green-900";
        case "warning":
          return "border-yellow-200 bg-yellow-50 text-yellow-900";
        case "danger":
        case "destructive":
          return "border-red-200 bg-red-50 text-red-900";
        default:
          return "border-slate-200 bg-white text-slate-900";
      }
    });
    const icon = computed(() => {
      switch (props.toast.variant) {
        case "success":
          return "lucide:check-circle";
        case "warning":
          return "lucide:alert-triangle";
        case "danger":
        case "destructive":
          return "lucide:alert-circle";
        default:
          return "lucide:bell";
      }
    });
    const iconClass = computed(() => {
      switch (props.toast.variant) {
        case "success":
          return "text-green-500";
        case "warning":
          return "text-yellow-500";
        case "danger":
        case "destructive":
          return "text-red-500";
        default:
          return "text-slate-500";
      }
    });
    const handleOpenChange = (open) => {
      if (!open) {
        emit("close", props.toast.id);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(ssrRenderComponent(unref(ToastRoot), mergeProps({
        class: ["bg-white border rounded-md p-3 shadow-lg flex items-start gap-3 w-[360px] focus:outline-none", toastClasses.value],
        open: __props.toast.open,
        duration: __props.toast.duration,
        "onUpdate:open": handleOpenChange
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-start gap-3 flex-1 min-w-0"${_scopeId}>`);
            if (icon.value) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: icon.value,
                class: ["h-5 w-5 flex-shrink-0 mt-0.5", iconClass.value]
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid gap-1 min-w-0 flex-1"${_scopeId}>`);
            if (__props.toast.title) {
              _push2(ssrRenderComponent(unref(ToastTitle), { class: "text-sm font-semibold break-words" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.toast.title)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.toast.title), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.toast.description) {
              _push2(ssrRenderComponent(unref(ToastDescription), { class: "text-sm opacity-90 break-words" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.toast.description)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.toast.description), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (!__props.toast.action) {
              _push2(ssrRenderComponent(unref(ToastClose), {
                class: ["ml-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100", iconClass.value]
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "lucide:x",
                      class: "h-4 w-4"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Icon, {
                        name: "lucide:x",
                        class: "h-4 w-4"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.toast.action) {
              _push2(ssrRenderComponent(unref(ToastAction), {
                class: "ml-2 inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none",
                "alt-text": __props.toast.action.label,
                onClick: __props.toast.action.onClick
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(__props.toast.action.label)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(__props.toast.action.label), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "flex items-start gap-3 flex-1 min-w-0" }, [
                icon.value ? (openBlock(), createBlock(_component_Icon, {
                  key: 0,
                  name: icon.value,
                  class: ["h-5 w-5 flex-shrink-0 mt-0.5", iconClass.value]
                }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                createVNode("div", { class: "grid gap-1 min-w-0 flex-1" }, [
                  __props.toast.title ? (openBlock(), createBlock(unref(ToastTitle), {
                    key: 0,
                    class: "text-sm font-semibold break-words"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.toast.title), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  __props.toast.description ? (openBlock(), createBlock(unref(ToastDescription), {
                    key: 1,
                    class: "text-sm opacity-90 break-words"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(__props.toast.description), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ])
              ]),
              !__props.toast.action ? (openBlock(), createBlock(unref(ToastClose), {
                key: 0,
                class: ["ml-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100", iconClass.value]
              }, {
                default: withCtx(() => [
                  createVNode(_component_Icon, {
                    name: "lucide:x",
                    class: "h-4 w-4"
                  })
                ]),
                _: 1
              }, 8, ["class"])) : createCommentVNode("", true),
              __props.toast.action ? (openBlock(), createBlock(unref(ToastAction), {
                key: 1,
                class: "ml-2 inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none",
                "alt-text": __props.toast.action.label,
                onClick: __props.toast.action.onClick
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.toast.action.label), 1)
                ]),
                _: 1
              }, 8, ["alt-text", "onClick"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/toast.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const toasts = ref([]);
const toastCount = ref(0);
function useToast() {
  const toast = (options) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = {
      id,
      open: true,
      variant: "default",
      duration: 5e3,
      ...options
    };
    toasts.value = [...toasts.value, newToast];
    toastCount.value++;
    return id;
  };
  const dismiss = (id) => {
    const toast2 = toasts.value.find((t) => t.id === id);
    if (toast2) {
      toast2.open = false;
    }
  };
  const remove = (id) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };
  const toRefs = computed(() => toasts.value);
  const success = (title, description) => {
    return toast({ title, description, variant: "success" });
  };
  const error = (title, description) => {
    return toast({ title, description, variant: "danger" });
  };
  const warning = (title, description) => {
    return toast({ title, description, variant: "warning" });
  };
  const info = (title, description) => {
    return toast({ title, description, variant: "default" });
  };
  return {
    toasts: toRefs,
    toast,
    dismiss,
    remove,
    success,
    error,
    warning,
    info
  };
}
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "toast-provider",
  __ssrInlineRender: true,
  setup(__props) {
    const { toasts: toasts2, dismiss } = useToast();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiToast = _sfc_main$4;
      _push(ssrRenderComponent(unref(ToastProvider), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ToastViewport), { class: "fixed bottom-0 right-0 flex flex-col gap-2 p-4 w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" }, null, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(unref(toasts2), (toast) => {
              _push2(ssrRenderComponent(_component_UiToast, {
                key: toast.id,
                toast,
                onClose: ($event) => unref(dismiss)(toast.id)
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              createVNode(unref(ToastViewport), { class: "fixed bottom-0 right-0 flex flex-col gap-2 p-4 w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" }),
              (openBlock(true), createBlock(Fragment, null, renderList(unref(toasts2), (toast) => {
                return openBlock(), createBlock(_component_UiToast, {
                  key: toast.id,
                  toast,
                  onClose: ($event) => unref(dismiss)(toast.id)
                }, null, 8, ["toast", "onClose"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/toast-provider.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const API_BASE = "http://localhost:8000/api/users";
const useAuth = () => {
  const accessToken = useState("access_token", () => null);
  const refreshToken = useState("refresh_token", () => null);
  const user = useState("auth_user", () => null);
  const isAuthenticated = computed(() => !!accessToken.value && !!user.value);
  const isLoading = useState("auth_loading", () => false);
  const error = useState("auth_error", () => null);
  const isInitialized = useState("auth_initialized", () => false);
  const getAccessToken = () => accessToken.value;
  const getRefreshToken = () => refreshToken.value;
  const saveTokens = (tokens) => {
    accessToken.value = tokens.access;
    refreshToken.value = tokens.refresh;
  };
  const clearTokens = () => {
    accessToken.value = null;
    refreshToken.value = null;
    user.value = null;
  };
  const authHeaders = () => {
    const token = getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };
  const refreshAccessToken = async () => {
    const currentRefresh = getRefreshToken();
    if (!currentRefresh) {
      clearTokens();
      return false;
    }
    try {
      const response = await $fetch(
        `${API_BASE}/token/refresh/`,
        {
          method: "POST",
          body: { refresh: currentRefresh }
        }
      );
      if (response.access) {
        accessToken.value = response.access;
        if (false) ;
        return true;
      }
      return false;
    } catch (e) {
      console.error("Token refresh failed:", e);
      if (e.statusCode === 401) {
        clearTokens();
      }
      return false;
    }
  };
  const login = async (credentials) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await $fetch(
        `${API_BASE}/login/`,
        {
          method: "POST",
          body: credentials
        }
      );
      user.value = response.user;
      saveTokens(response.tokens);
      return { success: true };
    } catch (e) {
      error.value = e.data?.error || e.data?.detail || "Login failed";
      console.error("Login error:", e);
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  };
  const register = async (data) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await $fetch(
        `${API_BASE}/register/`,
        {
          method: "POST",
          body: data
        }
      );
      user.value = response.user;
      saveTokens(response.tokens);
      return { success: true };
    } catch (e) {
      error.value = e.data?.email?.[0] || e.data?.password?.[0] || e.data?.detail || "Registration failed";
      console.error("Register error:", e);
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  };
  const logout = () => {
    clearTokens();
    navigateTo("/login");
  };
  const fetchProfile = async () => {
    const token = getAccessToken();
    if (!token) {
      return null;
    }
    try {
      const response = await $fetch(`${API_BASE}/me/`, {
        headers: authHeaders()
      });
      user.value = response;
      return response;
    } catch (e) {
      if (e.statusCode === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          try {
            const response = await $fetch(`${API_BASE}/me/`, {
              headers: authHeaders()
            });
            user.value = response;
            return response;
          } catch (retryError) {
            console.error("Retry fetch profile failed:", retryError);
          }
        }
        return null;
      }
      console.error("Fetch profile error:", e);
      return null;
    }
  };
  const initAuth = async () => {
    const token = getAccessToken();
    if (!token) {
      isInitialized.value = true;
      return false;
    }
    const profile = await fetchProfile();
    isInitialized.value = true;
    return !!profile;
  };
  const setupTokenRefresh = () => {
  };
  return {
    user,
    isAuthenticated,
    isLoading,
    isInitialized,
    error,
    login,
    register,
    logout,
    fetchProfile,
    initAuth,
    refreshAccessToken,
    getAccessToken,
    authHeaders,
    setupTokenRefresh
  };
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0$1;
      const _component_NuxtPage = __nuxt_component_1;
      const _component_UiToastProvider = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_NuxtLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtPage)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiToastProvider, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    const status = Number(_error.statusCode || 500);
    const is404 = status === 404;
    const statusText = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-vEAv6eNp.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-x8qhdI-_.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ status: unref(status), statusText: unref(statusText), statusCode: unref(status), statusMessage: unref(statusText), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = /* @__PURE__ */ useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry_default = ((ssrContext) => entry(ssrContext));

export { _export_sfc as _, __nuxt_component_0 as a, useRoute as b, useToast as c, useRouter as d, entry_default as default, useNuxtApp as e, useRuntimeConfig as f, nuxtLinkDefaults as g, asyncDataDefaults as h, createError as i, fetchDefaults as j, defineNuxtRouteMiddleware as k, useAppConfig as l, resolveIconName as m, navigateTo as n, resolveRouteObject as r, tryUseNuxtApp as t, useAuth as u };
//# sourceMappingURL=server.mjs.map
