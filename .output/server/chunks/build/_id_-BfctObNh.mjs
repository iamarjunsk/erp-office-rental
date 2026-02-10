import { _ as __nuxt_component_0 } from './nuxt-link-CrgyHNyr.mjs';
import { b as useRoute, u as useAuth, a as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, computed, ref, watchEffect, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
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

const API_BASE = "http://localhost:8000/api/users";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { authHeaders } = useAuth();
    const { data: userData, pending: loading, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/${route.params.id}/`,
      {
        headers: authHeaders()
      },
      "$Ax8dPQz5w0"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const user = computed(() => {
      const u = userData.value;
      if (!u) return null;
      return {
        ...u,
        full_name: `${u.first_name} ${u.last_name}`
      };
    });
    const showEditModal = ref(false);
    const editForm = ref({
      first_name: "",
      last_name: "",
      phone: "",
      department: ""
    });
    ref(false);
    watchEffect(() => {
      if (user.value) {
        editForm.value = {
          first_name: user.value.first_name,
          last_name: user.value.last_name,
          phone: user.value.phone || "",
          department: user.value.department || ""
        };
      }
    });
    const getRoleClass = (role) => {
      const classes = {
        super_admin: "bg-purple-100 text-purple-700",
        admin: "bg-blue-100 text-blue-700",
        manager: "bg-amber-100 text-amber-700",
        staff: "bg-gray-100 text-gray-700"
      };
      return classes[role || ""] || "bg-gray-100 text-gray-700";
    };
    const formatRole = (role) => (role == null ? void 0 : role.split("_").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ")) || "";
    const formatDate = (date) => date ? new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "-";
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><nav class="flex items-center gap-2 text-sm text-muted-foreground">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/users",
        class: "hover:text-foreground"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Users`);
          } else {
            return [
              createTextVNode("Users")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:chevron-right",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span class="text-foreground">${ssrInterpolate((_a = unref(user)) == null ? void 0 : _a.full_name)}</span></nav><div class="flex items-start justify-between"><div class="flex items-center gap-4"><div class="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center"><span class="text-2xl font-bold text-primary">${ssrInterpolate((_c = (_b = unref(user)) == null ? void 0 : _b.first_name) == null ? void 0 : _c.charAt(0))}${ssrInterpolate((_e = (_d = unref(user)) == null ? void 0 : _d.last_name) == null ? void 0 : _e.charAt(0))}</span></div><div><h1 class="text-3xl font-bold">${ssrInterpolate((_f = unref(user)) == null ? void 0 : _f.full_name)}</h1><p class="text-muted-foreground">${ssrInterpolate((_g = unref(user)) == null ? void 0 : _g.email)}</p><div class="flex items-center gap-2 mt-2"><span class="${ssrRenderClass([getRoleClass((_h = unref(user)) == null ? void 0 : _h.role), "px-2 py-1 text-xs rounded-full"])}">${ssrInterpolate(formatRole((_i = unref(user)) == null ? void 0 : _i.role))}</span><span class="${ssrRenderClass([((_j = unref(user)) == null ? void 0 : _j.is_active) ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700", "px-2 py-1 text-xs rounded-full"])}">${ssrInterpolate(((_k = unref(user)) == null ? void 0 : _k.is_active) ? "Active" : "Inactive")}</span></div></div></div><div class="flex gap-2"><button class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:edit",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Edit </button>`);
      if ((_l = unref(user)) == null ? void 0 : _l.is_active) {
        _push(`<button class="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:user-x",
          class: "w-4 h-4"
        }, null, _parent));
        _push(` Deactivate </button>`);
      } else {
        _push(`<button class="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:user-check",
          class: "w-4 h-4"
        }, null, _parent));
        _push(` Activate </button>`);
      }
      _push(`</div></div><div class="grid lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-card border border-border rounded-xl p-6"><h2 class="text-lg font-semibold mb-4">Profile Information</h2><div class="grid md:grid-cols-2 gap-6"><div><label class="text-sm text-muted-foreground">First Name</label><p class="font-medium">${ssrInterpolate((_m = unref(user)) == null ? void 0 : _m.first_name)}</p></div><div><label class="text-sm text-muted-foreground">Last Name</label><p class="font-medium">${ssrInterpolate((_n = unref(user)) == null ? void 0 : _n.last_name)}</p></div><div><label class="text-sm text-muted-foreground">Email</label><p class="font-medium">${ssrInterpolate((_o = unref(user)) == null ? void 0 : _o.email)}</p></div><div><label class="text-sm text-muted-foreground">Phone</label><p class="font-medium">${ssrInterpolate(((_p = unref(user)) == null ? void 0 : _p.phone) || "Not provided")}</p></div><div><label class="text-sm text-muted-foreground">Department</label><p class="font-medium">${ssrInterpolate(((_q = unref(user)) == null ? void 0 : _q.department) || "Not assigned")}</p></div><div><label class="text-sm text-muted-foreground">Role</label><p class="font-medium">${ssrInterpolate(formatRole((_r = unref(user)) == null ? void 0 : _r.role))}</p></div></div></div><div class="bg-card border border-border rounded-xl p-6"><h2 class="text-lg font-semibold mb-4">Recent Activity</h2><div class="space-y-4"><div class="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:log-in",
        class: "w-5 h-5 text-green-500 mt-0.5"
      }, null, _parent));
      _push(`<div><p class="font-medium">Logged in</p><p class="text-sm text-muted-foreground">Today at 09:30 AM</p></div></div><div class="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:file-edit",
        class: "w-5 h-5 text-blue-500 mt-0.5"
      }, null, _parent));
      _push(`<div><p class="font-medium">Updated purchase order #PO-2024-001</p><p class="text-sm text-muted-foreground">Yesterday at 03:45 PM</p></div></div><div class="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:check-circle",
        class: "w-5 h-5 text-purple-500 mt-0.5"
      }, null, _parent));
      _push(`<div><p class="font-medium">Approved requisition #PR-2024-015</p><p class="text-sm text-muted-foreground">2 days ago</p></div></div></div></div></div><div class="space-y-6"><div class="bg-card border border-border rounded-xl p-6"><h2 class="text-lg font-semibold mb-4">Account Stats</h2><div class="space-y-4"><div class="flex justify-between"><span class="text-muted-foreground">Member since</span><span class="font-medium">${ssrInterpolate(formatDate((_s = unref(user)) == null ? void 0 : _s.created_at))}</span></div><div class="flex justify-between"><span class="text-muted-foreground">Last updated</span><span class="font-medium">${ssrInterpolate(formatDate((_t = unref(user)) == null ? void 0 : _t.updated_at))}</span></div><div class="flex justify-between"><span class="text-muted-foreground">Tasks completed</span><span class="font-medium">24</span></div><div class="flex justify-between"><span class="text-muted-foreground">Approvals made</span><span class="font-medium">12</span></div></div></div><div class="bg-card border border-border rounded-xl p-6"><h2 class="text-lg font-semibold mb-4">Quick Actions</h2><div class="space-y-2"><button class="w-full py-2 px-3 text-left hover:bg-muted rounded-lg flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:key",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Reset Password </button><button class="w-full py-2 px-3 text-left hover:bg-muted rounded-lg flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:mail",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Send Email </button><button class="w-full py-2 px-3 text-left hover:bg-muted rounded-lg flex items-center gap-2 text-red-500">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:trash",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Delete User </button></div></div></div></div>`);
      if (unref(showEditModal)) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"><div class="bg-card rounded-xl w-full max-w-lg m-4"><div class="p-6 border-b border-border flex items-center justify-between"><h3 class="text-lg font-semibold">Edit User</h3><button class="p-2 hover:bg-muted rounded-full">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:x",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div><form class="p-6 space-y-4"><div class="grid grid-cols-2 gap-4"><div><label class="text-sm font-medium">First Name</label><input${ssrRenderAttr("value", unref(editForm).first_name)} type="text" class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg"></div><div><label class="text-sm font-medium">Last Name</label><input${ssrRenderAttr("value", unref(editForm).last_name)} type="text" class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg"></div></div><div><label class="text-sm font-medium">Phone</label><input${ssrRenderAttr("value", unref(editForm).phone)} type="text" class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg"></div><div><label class="text-sm font-medium">Department</label><input${ssrRenderAttr("value", unref(editForm).department)} type="text" class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg"></div><div class="flex justify-end gap-3 pt-4"><button type="button" class="px-4 py-2 border border-border rounded-lg hover:bg-muted">Cancel</button><button type="submit" class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">Save Changes</button></div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BfctObNh.mjs.map
