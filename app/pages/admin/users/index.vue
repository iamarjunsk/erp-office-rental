<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">Users</h1>
        <p class="text-muted-foreground">Manage system users and permissions</p>
      </div>
      <button @click="showAddModal = true"
        class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
        <Icon name="lucide:plus" class="w-4 h-4" />
        Add User
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid md:grid-cols-4 gap-4">
      <div class="bg-card border border-border rounded-xl p-6">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-blue-500/10 rounded-lg">
            <Icon name="lucide:users" class="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p class="text-2xl font-bold">{{ users.length }}</p>
            <p class="text-sm text-muted-foreground">Total Users</p>
          </div>
        </div>
      </div>
      <div class="bg-card border border-border rounded-xl p-6">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-green-500/10 rounded-lg">
            <Icon name="lucide:user-check" class="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p class="text-2xl font-bold">{{ activeCount }}</p>
            <p class="text-sm text-muted-foreground">Active</p>
          </div>
        </div>
      </div>
      <div class="bg-card border border-border rounded-xl p-6">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-purple-500/10 rounded-lg">
            <Icon name="lucide:shield" class="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <p class="text-2xl font-bold">{{ adminCount }}</p>
            <p class="text-sm text-muted-foreground">Admins</p>
          </div>
        </div>
      </div>
      <div class="bg-card border border-border rounded-xl p-6">
        <div class="flex items-center gap-3">
          <div class="p-3 bg-amber-500/10 rounded-lg">
            <Icon name="lucide:briefcase" class="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <p class="text-2xl font-bold">{{ managerCount }}</p>
            <p class="text-sm text-muted-foreground">Managers</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex gap-4">
      <div class="relative flex-1 max-w-sm">
        <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input v-model="searchQuery" type="text" placeholder="Search users..."
          class="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg" />
      </div>
      <select v-model="roleFilter" class="px-4 py-2 bg-background border border-border rounded-lg">
        <option value="">All Roles</option>
        <option value="super_admin">Super Admin</option>
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="staff">Staff</option>
      </select>
    </div>

    <!-- Users Table -->
    <div class="bg-card border border-border rounded-xl overflow-hidden">
      <table class="w-full">
        <thead class="bg-muted/50 border-b border-border">
          <tr>
            <th class="px-6 py-4 text-left text-sm font-medium">User</th>
            <th class="px-6 py-4 text-left text-sm font-medium">Role</th>
            <th class="px-6 py-4 text-left text-sm font-medium">Department</th>
            <th class="px-6 py-4 text-left text-sm font-medium">Status</th>
            <th class="px-6 py-4 text-left text-sm font-medium">Joined</th>
            <th class="px-6 py-4 text-right text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border">
          <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-muted/50">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span class="text-sm font-medium text-primary">
                    {{ user.first_name?.charAt(0) }}{{ user.last_name?.charAt(0) }}
                  </span>
                </div>
                <div>
                  <p class="font-medium">{{ user.full_name }}</p>
                  <p class="text-sm text-muted-foreground">{{ user.email }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <span :class="getRoleClass(user.role)" class="px-2 py-1 text-xs rounded-full">
                {{ formatRole(user.role) }}
              </span>
            </td>
            <td class="px-6 py-4 text-muted-foreground">
              {{ user.department || '-' }}
            </td>
            <td class="px-6 py-4">
              <span :class="user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                class="px-2 py-1 text-xs rounded-full">
                {{ user.is_active ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="px-6 py-4 text-muted-foreground">
              {{ formatDate(user.created_at) }}
            </td>
            <td class="px-6 py-4 text-right">
              <NuxtLink :to="`/admin/users/${user.id}`" class="p-2 hover:bg-muted rounded-lg inline-block">
                <Icon name="lucide:eye" class="w-4 h-4" />
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="filteredUsers.length === 0" class="p-12 text-center">
        <Icon name="lucide:users" class="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 class="text-lg font-medium mb-2">No users found</h3>
        <p class="text-muted-foreground">Try adjusting your search or filters</p>
      </div>
    </div>

    <!-- Add User Modal -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="showAddModal = false">
      <div class="bg-card rounded-xl w-full max-w-lg m-4">
        <div class="p-6 border-b border-border flex items-center justify-between">
          <h3 class="text-lg font-semibold">Add New User</h3>
          <button @click="showAddModal = false" class="p-2 hover:bg-muted rounded-full">
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>
        <form @submit.prevent="addUser" class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium">First Name *</label>
              <input v-model="newUser.first_name" type="text" required
                class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
            </div>
            <div>
              <label class="text-sm font-medium">Last Name *</label>
              <input v-model="newUser.last_name" type="text" required
                class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
            </div>
          </div>
          <div>
            <label class="text-sm font-medium">Email *</label>
            <input v-model="newUser.email" type="email" required
              class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
          </div>
          <div>
            <label class="text-sm font-medium">Role *</label>
            <select v-model="newUser.role" required
              class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg">
              <option value="staff">Staff</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium">Department</label>
            <input v-model="newUser.department" type="text"
              class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
          </div>
          <div>
            <label class="text-sm font-medium">Password *</label>
            <div class="relative mt-1">
              <input v-model="newUser.password" :type="showAddModalPassword ? 'text' : 'password'" required
                class="w-full px-4 py-2 bg-background border border-border rounded-lg pr-10" />
              <button type="button" @click="showAddModalPassword = !showAddModalPassword" aria-label="Toggle password visibility"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <Icon :name="showAddModalPassword ? 'lucide:eye-off' : 'lucide:eye'" class="w-4 h-4" />
              </button>
            </div>
          </div>
          <div class="flex justify-end gap-3 pt-4">
            <button type="button" @click="showAddModal = false"
              class="px-4 py-2 border border-border rounded-lg hover:bg-muted">Cancel</button>
            <button type="submit"
              class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">Add User</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const API_BASE = 'http://localhost:8000/api/users'

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { getAccessToken, authHeaders } = useAuth()
const { toast } = useToast()

// Fetch users from Django API
const { data: usersData, pending: loading, refresh } = await useFetch<any[]>(`${API_BASE}/`, {
  headers: authHeaders(),
  default: () => [],
})

const users = computed(() => usersData.value || [])

const searchQuery = ref('')
const roleFilter = ref('')
const showAddModal = ref(false)
const showAddModalPassword = ref(false)
const isSubmitting = ref(false)

const newUser = ref({
  first_name: '',
  last_name: '',
  email: '',
  role: 'staff',
  department: '',
  password: '',
  password_confirm: '',
})

const filteredUsers = computed(() => {
  return users.value.filter((user: any) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase()
    const matchesSearch = fullName.includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesRole = !roleFilter.value || user.role === roleFilter.value
    return matchesSearch && matchesRole
  })
})

const activeCount = computed(() => users.value.filter((u: any) => u.is_active).length)
const adminCount = computed(() => users.value.filter((u: any) => ['super_admin', 'admin'].includes(u.role)).length)
const managerCount = computed(() => users.value.filter((u: any) => u.role === 'manager').length)

const getRoleClass = (role: string) => {
  const classes: Record<string, string> = {
    super_admin: 'bg-purple-100 text-purple-700',
    admin: 'bg-blue-100 text-blue-700',
    manager: 'bg-amber-100 text-amber-700',
    staff: 'bg-gray-100 text-gray-700',
  }
  return classes[role] || 'bg-gray-100 text-gray-700'
}

const formatRole = (role: string) => role?.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
const formatDate = (date: string) => date ? new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'

const addUser = async () => {
  isSubmitting.value = true
  try {
    newUser.value.password_confirm = newUser.value.password
    await $fetch(`${API_BASE}/register/`, {
      method: 'POST',
      body: newUser.value,
    })
    showAddModal.value = false
    newUser.value = { first_name: '', last_name: '', email: '', role: 'staff', department: '', password: '', password_confirm: '' }
    await refresh()
    toast({
      title: 'Success',
      description: 'User added successfully',
      variant: 'default',
    })
  } catch (e: any) {
    toast({
      title: 'Error',
      description: e.data?.email?.[0] || e.data?.password?.[0] || 'Failed to add user',
      variant: 'destructive',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>