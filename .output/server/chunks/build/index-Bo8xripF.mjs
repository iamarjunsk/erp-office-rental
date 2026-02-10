import { u as useAuth, a as __nuxt_component_0 } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-CrgyHNyr.mjs';
import { defineComponent, withAsyncContext, computed, ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { authHeaders } = useAuth();
    const { data: usersData, pending: loading, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `${API_BASE}/`,
      {
        headers: authHeaders(),
        default: () => []
      },
      "$cubcczJn1-"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const users = computed(() => usersData.value || []);
    const searchQuery = ref("");
    const roleFilter = ref("");
    const showAddModal = ref(false);
    ref(false);
    const newUser = ref({
      first_name: "",
      last_name: "",
      email: "",
      role: "staff",
      department: "",
      password: "",
      password_confirm: ""
    });
    const filteredUsers = computed(() => {
      return users.value.filter((user) => {
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        const matchesSearch = fullName.includes(searchQuery.value.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesRole = !roleFilter.value || user.role === roleFilter.value;
        return matchesSearch && matchesRole;
      });
    });
    const activeCount = computed(() => users.value.filter((u) => u.is_active).length);
    const adminCount = computed(() => users.value.filter((u) => ["super_admin", "admin"].includes(u.role)).length);
    const managerCount = computed(() => users.value.filter((u) => u.role === "manager").length);
    const getRoleClass = (role) => {
      const classes = {
        super_admin: "bg-purple-100 text-purple-700",
        admin: "bg-blue-100 text-blue-700",
        manager: "bg-amber-100 text-amber-700",
        staff: "bg-gray-100 text-gray-700"
      };
      return classes[role] || "bg-gray-100 text-gray-700";
    };
    const formatRole = (role) => role == null ? void 0 : role.split("_").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
    const formatDate = (date) => date ? new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "-";
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold">Users</h1><p class="text-muted-foreground">Manage system users and permissions</p></div><button class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:plus",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Add User </button></div><div class="grid md:grid-cols-4 gap-4"><div class="bg-card border border-border rounded-xl p-6"><div class="flex items-center gap-3"><div class="p-3 bg-blue-500/10 rounded-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:users",
        class: "w-6 h-6 text-blue-500"
      }, null, _parent));
      _push(`</div><div><p class="text-2xl font-bold">${ssrInterpolate(unref(users).length)}</p><p class="text-sm text-muted-foreground">Total Users</p></div></div></div><div class="bg-card border border-border rounded-xl p-6"><div class="flex items-center gap-3"><div class="p-3 bg-green-500/10 rounded-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:user-check",
        class: "w-6 h-6 text-green-500"
      }, null, _parent));
      _push(`</div><div><p class="text-2xl font-bold">${ssrInterpolate(unref(activeCount))}</p><p class="text-sm text-muted-foreground">Active</p></div></div></div><div class="bg-card border border-border rounded-xl p-6"><div class="flex items-center gap-3"><div class="p-3 bg-purple-500/10 rounded-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:shield",
        class: "w-6 h-6 text-purple-500"
      }, null, _parent));
      _push(`</div><div><p class="text-2xl font-bold">${ssrInterpolate(unref(adminCount))}</p><p class="text-sm text-muted-foreground">Admins</p></div></div></div><div class="bg-card border border-border rounded-xl p-6"><div class="flex items-center gap-3"><div class="p-3 bg-amber-500/10 rounded-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:briefcase",
        class: "w-6 h-6 text-amber-500"
      }, null, _parent));
      _push(`</div><div><p class="text-2xl font-bold">${ssrInterpolate(unref(managerCount))}</p><p class="text-sm text-muted-foreground">Managers</p></div></div></div></div><div class="flex gap-4"><div class="relative flex-1 max-w-sm">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:search",
        class: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Search users..." class="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg"></div><select class="px-4 py-2 bg-background border border-border rounded-lg"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(roleFilter)) ? ssrLooseContain(unref(roleFilter), "") : ssrLooseEqual(unref(roleFilter), "")) ? " selected" : ""}>All Roles</option><option value="super_admin"${ssrIncludeBooleanAttr(Array.isArray(unref(roleFilter)) ? ssrLooseContain(unref(roleFilter), "super_admin") : ssrLooseEqual(unref(roleFilter), "super_admin")) ? " selected" : ""}>Super Admin</option><option value="admin"${ssrIncludeBooleanAttr(Array.isArray(unref(roleFilter)) ? ssrLooseContain(unref(roleFilter), "admin") : ssrLooseEqual(unref(roleFilter), "admin")) ? " selected" : ""}>Admin</option><option value="manager"${ssrIncludeBooleanAttr(Array.isArray(unref(roleFilter)) ? ssrLooseContain(unref(roleFilter), "manager") : ssrLooseEqual(unref(roleFilter), "manager")) ? " selected" : ""}>Manager</option><option value="staff"${ssrIncludeBooleanAttr(Array.isArray(unref(roleFilter)) ? ssrLooseContain(unref(roleFilter), "staff") : ssrLooseEqual(unref(roleFilter), "staff")) ? " selected" : ""}>Staff</option></select></div><div class="bg-card border border-border rounded-xl overflow-hidden"><table class="w-full"><thead class="bg-muted/50 border-b border-border"><tr><th class="px-6 py-4 text-left text-sm font-medium">User</th><th class="px-6 py-4 text-left text-sm font-medium">Role</th><th class="px-6 py-4 text-left text-sm font-medium">Department</th><th class="px-6 py-4 text-left text-sm font-medium">Status</th><th class="px-6 py-4 text-left text-sm font-medium">Joined</th><th class="px-6 py-4 text-right text-sm font-medium">Actions</th></tr></thead><tbody class="divide-y divide-border"><!--[-->`);
      ssrRenderList(unref(filteredUsers), (user) => {
        var _a, _b;
        _push(`<tr class="hover:bg-muted/50"><td class="px-6 py-4"><div class="flex items-center gap-3"><div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center"><span class="text-sm font-medium text-primary">${ssrInterpolate((_a = user.first_name) == null ? void 0 : _a.charAt(0))}${ssrInterpolate((_b = user.last_name) == null ? void 0 : _b.charAt(0))}</span></div><div><p class="font-medium">${ssrInterpolate(user.full_name)}</p><p class="text-sm text-muted-foreground">${ssrInterpolate(user.email)}</p></div></div></td><td class="px-6 py-4"><span class="${ssrRenderClass([getRoleClass(user.role), "px-2 py-1 text-xs rounded-full"])}">${ssrInterpolate(formatRole(user.role))}</span></td><td class="px-6 py-4 text-muted-foreground">${ssrInterpolate(user.department || "-")}</td><td class="px-6 py-4"><span class="${ssrRenderClass([user.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700", "px-2 py-1 text-xs rounded-full"])}">${ssrInterpolate(user.is_active ? "Active" : "Inactive")}</span></td><td class="px-6 py-4 text-muted-foreground">${ssrInterpolate(formatDate(user.created_at))}</td><td class="px-6 py-4 text-right">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/admin/users/${user.id}`,
          class: "p-2 hover:bg-muted rounded-lg inline-block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "lucide:eye",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "lucide:eye",
                  class: "w-4 h-4"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</td></tr>`);
      });
      _push(`<!--]--></tbody></table>`);
      if (unref(filteredUsers).length === 0) {
        _push(`<div class="p-12 text-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:users",
          class: "w-12 h-12 mx-auto mb-4 text-muted-foreground"
        }, null, _parent));
        _push(`<h3 class="text-lg font-medium mb-2">No users found</h3><p class="text-muted-foreground">Try adjusting your search or filters</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(showAddModal)) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"><div class="bg-card rounded-xl w-full max-w-lg m-4"><div class="p-6 border-b border-border flex items-center justify-between"><h3 class="text-lg font-semibold">Add New User</h3><button class="p-2 hover:bg-muted rounded-full">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:x",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div><form class="p-6 space-y-4"><div class="grid grid-cols-2 gap-4"><div><label class="text-sm font-medium">First Name *</label><input${ssrRenderAttr("value", unref(newUser).first_name)} type="text" required class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg"></div><div><label class="text-sm font-medium">Last Name *</label><input${ssrRenderAttr("value", unref(newUser).last_name)} type="text" required class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg"></div></div><div><label class="text-sm font-medium">Email *</label><input${ssrRenderAttr("value", unref(newUser).email)} type="email" required class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg"></div><div><label class="text-sm font-medium">Role *</label><select required class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg"><option value="staff"${ssrIncludeBooleanAttr(Array.isArray(unref(newUser).role) ? ssrLooseContain(unref(newUser).role, "staff") : ssrLooseEqual(unref(newUser).role, "staff")) ? " selected" : ""}>Staff</option><option value="manager"${ssrIncludeBooleanAttr(Array.isArray(unref(newUser).role) ? ssrLooseContain(unref(newUser).role, "manager") : ssrLooseEqual(unref(newUser).role, "manager")) ? " selected" : ""}>Manager</option><option value="admin"${ssrIncludeBooleanAttr(Array.isArray(unref(newUser).role) ? ssrLooseContain(unref(newUser).role, "admin") : ssrLooseEqual(unref(newUser).role, "admin")) ? " selected" : ""}>Admin</option></select></div><div><label class="text-sm font-medium">Department</label><input${ssrRenderAttr("value", unref(newUser).department)} type="text" class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg"></div><div><label class="text-sm font-medium">Password *</label><input${ssrRenderAttr("value", unref(newUser).password)} type="password" required class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg"></div><div class="flex justify-end gap-3 pt-4"><button type="button" class="px-4 py-2 border border-border rounded-lg hover:bg-muted">Cancel</button><button type="submit" class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">Add User</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Bo8xripF.mjs.map
