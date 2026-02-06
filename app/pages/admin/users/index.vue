<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold">Users</h1>
        <p class="text-muted-foreground">Manage system users and permissions</p>
      </div>
      <button class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
        <Icon name="lucide:plus" class="w-4 h-4" />
        Add User
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="grid gap-4 md:grid-cols-4">
      <div class="bg-card border border-border rounded-lg p-4">
        <p class="text-sm text-muted-foreground">Total Users</p>
        <p class="text-2xl font-bold">45</p>
      </div>
      <div class="bg-card border border-border rounded-lg p-4">
        <p class="text-sm text-muted-foreground">Active Users</p>
        <p class="text-2xl font-bold">42</p>
      </div>
      <div class="bg-card border border-border rounded-lg p-4">
        <p class="text-sm text-muted-foreground">Admin Users</p>
        <p class="text-2xl font-bold">8</p>
      </div>
      <div class="bg-card border border-border rounded-lg p-4">
        <p class="text-sm text-muted-foreground">Tenant Users</p>
        <p class="text-2xl font-bold">34</p>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search users..."
          class="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <select v-model="roleFilter" class="px-4 py-2 bg-card border border-border rounded-lg">
        <option value="">All Roles</option>
        <option value="super_admin">Super Admin</option>
        <option value="admin">Admin</option>
        <option value="property_manager">Property Manager</option>
        <option value="leasing_manager">Leasing Manager</option>
        <option value="finance_manager">Finance Manager</option>
        <option value="tenant_admin">Tenant Admin</option>
        <option value="tenant_member">Tenant Member</option>
      </select>
      <select v-model="statusFilter" class="px-4 py-2 bg-card border border-border rounded-lg">
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="suspended">Suspended</option>
      </select>
    </div>

    <div class="bg-card border border-border rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-muted">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-medium">User</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Email</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Role</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Status</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Last Login</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="user in users" :key="user.id" class="hover:bg-muted/50">
              <td class="px-4 py-3 text-sm">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="lucide:user" class="w-4 h-4 text-primary" />
                  </div>
                  <span class="font-medium">{{ user.firstName }} {{ user.lastName }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-sm">{{ user.email }}</td>
              <td class="px-4 py-3 text-sm">
                <span class="px-2 py-1 bg-muted rounded text-xs capitalize">
                  {{ user.role.replace('_', ' ') }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm">
                <span 
                  class="px-2 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-700': user.status === 'active',
                    'bg-red-100 text-red-700': user.status === 'inactive',
                    'bg-amber-100 text-amber-700': user.status === 'suspended',
                  }"
                >
                  {{ user.status }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm">{{ user.lastLoginAt || 'Never' }}</td>
              <td class="px-4 py-3 text-sm">
                <div class="flex items-center gap-2">
                  <button class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">
                    <Icon name="lucide:eye" class="w-4 h-4" />
                  </button>
                  <button class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">
                    <Icon name="lucide:pencil" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="users.length === 0">
              <td colspan="6" class="px-4 py-8 text-center text-muted-foreground">
                No users found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const users = ref([
  { id: 1, firstName: 'Super', lastName: 'Admin', email: 'admin@officeerp.com', role: 'super_admin', status: 'active', lastLoginAt: '2026-02-05 10:30 AM' },
  { id: 2, firstName: 'Property', lastName: 'Manager', email: 'manager@officeerp.com', role: 'property_manager', status: 'active', lastLoginAt: '2026-02-05 09:15 AM' },
  { id: 3, firstName: 'John', lastName: 'Doe', email: 'john@techsolutions.com', role: 'tenant_admin', status: 'active', lastLoginAt: '2026-02-04 04:20 PM' },
  { id: 4, firstName: 'Jane', lastName: 'Smith', email: 'jane@innovatelabs.com', role: 'tenant_member', status: 'active', lastLoginAt: '2026-02-03 11:45 AM' },
  { id: 5, firstName: 'Finance', lastName: 'Manager', email: 'finance@officeerp.com', role: 'finance_manager', status: 'active', lastLoginAt: '2026-02-05 08:00 AM' },
])

const searchQuery = ref('')
const roleFilter = ref('')
const statusFilter = ref('')
</script>