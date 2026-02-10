import { k as defineNuxtRouteMiddleware, u as useAuth } from './server.mjs';
import 'vue';
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
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import 'radix-vue';

const auth = defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path === "/login" || to.path === "/register") {
    return;
  }
  useAuth();
  {
    return;
  }
});

export { auth as default };
//# sourceMappingURL=auth-BU4G5EiH.mjs.map
