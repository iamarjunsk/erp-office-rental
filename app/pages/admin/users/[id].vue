<template>
    <div class="space-y-6">
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-sm text-muted-foreground">
            <NuxtLink to="/admin/users" class="hover:text-foreground">Users</NuxtLink>
            <Icon name="lucide:chevron-right" class="w-4 h-4" />
            <span class="text-foreground">{{ user?.full_name }}</span>
        </nav>

        <!-- Header -->
        <div class="flex items-start justify-between">
            <div class="flex items-center gap-4">
                <div class="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <span class="text-2xl font-bold text-primary">
                        {{ user?.first_name?.charAt(0) }}{{ user?.last_name?.charAt(0) }}
                    </span>
                </div>
                <div>
                    <h1 class="text-3xl font-bold">{{ user?.full_name }}</h1>
                    <p class="text-muted-foreground">{{ user?.email }}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <span :class="getRoleClass(user?.role)" class="px-2 py-1 text-xs rounded-full">
                            {{ formatRole(user?.role) }}
                        </span>
                        <span :class="user?.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                            class="px-2 py-1 text-xs rounded-full">
                            {{ user?.is_active ? 'Active' : 'Inactive' }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="flex gap-2">
                <button @click="showEditModal = true"
                    class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted">
                    <Icon name="lucide:edit" class="w-4 h-4" />
                    Edit
                </button>
                <button v-if="user?.is_active" @click="deactivateUser"
                    class="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    <Icon name="lucide:user-x" class="w-4 h-4" />
                    Deactivate
                </button>
                <button v-else @click="activateUser"
                    class="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    <Icon name="lucide:user-check" class="w-4 h-4" />
                    Activate
                </button>
            </div>
        </div>

        <!-- Content Grid -->
        <div class="grid lg:grid-cols-3 gap-6">
            <!-- User Details -->
            <div class="lg:col-span-2 space-y-6">
                <div class="bg-card border border-border rounded-xl p-6">
                    <h2 class="text-lg font-semibold mb-4">Profile Information</h2>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label class="text-sm text-muted-foreground">First Name</label>
                            <p class="font-medium">{{ user?.first_name }}</p>
                        </div>
                        <div>
                            <label class="text-sm text-muted-foreground">Last Name</label>
                            <p class="font-medium">{{ user?.last_name }}</p>
                        </div>
                        <div>
                            <label class="text-sm text-muted-foreground">Email</label>
                            <p class="font-medium">{{ user?.email }}</p>
                        </div>
                        <div>
                            <label class="text-sm text-muted-foreground">Phone</label>
                            <p class="font-medium">{{ user?.phone || 'Not provided' }}</p>
                        </div>
                        <div>
                            <label class="text-sm text-muted-foreground">Department</label>
                            <p class="font-medium">{{ user?.department || 'Not assigned' }}</p>
                        </div>
                        <div>
                            <label class="text-sm text-muted-foreground">Role</label>
                            <p class="font-medium">{{ formatRole(user?.role) }}</p>
                        </div>
                    </div>
                </div>

                <!-- Activity -->
                <div class="bg-card border border-border rounded-xl p-6">
                    <h2 class="text-lg font-semibold mb-4">Recent Activity</h2>
                    <div class="space-y-4">
                        <div class="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <Icon name="lucide:log-in" class="w-5 h-5 text-green-500 mt-0.5" />
                            <div>
                                <p class="font-medium">Logged in</p>
                                <p class="text-sm text-muted-foreground">Today at 09:30 AM</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <Icon name="lucide:file-edit" class="w-5 h-5 text-blue-500 mt-0.5" />
                            <div>
                                <p class="font-medium">Updated purchase order #PO-2024-001</p>
                                <p class="text-sm text-muted-foreground">Yesterday at 03:45 PM</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <Icon name="lucide:check-circle" class="w-5 h-5 text-purple-500 mt-0.5" />
                            <div>
                                <p class="font-medium">Approved requisition #PR-2024-015</p>
                                <p class="text-sm text-muted-foreground">2 days ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">
                <div class="bg-card border border-border rounded-xl p-6">
                    <h2 class="text-lg font-semibold mb-4">Account Stats</h2>
                    <div class="space-y-4">
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">Member since</span>
                            <span class="font-medium">{{ formatDate(user?.created_at) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">Last updated</span>
                            <span class="font-medium">{{ formatDate(user?.updated_at) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">Tasks completed</span>
                            <span class="font-medium">24</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">Approvals made</span>
                            <span class="font-medium">12</span>
                        </div>
                    </div>
                </div>

                <div class="bg-card border border-border rounded-xl p-6">
                    <h2 class="text-lg font-semibold mb-4">Quick Actions</h2>
                    <div class="space-y-2">
                        <button class="w-full py-2 px-3 text-left hover:bg-muted rounded-lg flex items-center gap-2">
                            <Icon name="lucide:key" class="w-4 h-4" />
                            Reset Password
                        </button>
                        <button class="w-full py-2 px-3 text-left hover:bg-muted rounded-lg flex items-center gap-2">
                            <Icon name="lucide:mail" class="w-4 h-4" />
                            Send Email
                        </button>
                        <button
                            class="w-full py-2 px-3 text-left hover:bg-muted rounded-lg flex items-center gap-2 text-red-500">
                            <Icon name="lucide:trash" class="w-4 h-4" />
                            Delete User
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Modal -->
        <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            @click.self="showEditModal = false">
            <div class="bg-card rounded-xl w-full max-w-lg m-4">
                <div class="p-6 border-b border-border flex items-center justify-between">
                    <h3 class="text-lg font-semibold">Edit User</h3>
                    <button @click="showEditModal = false" class="p-2 hover:bg-muted rounded-full">
                        <Icon name="lucide:x" class="w-5 h-5" />
                    </button>
                </div>
                <form @submit.prevent="saveUser" class="p-6 space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm font-medium">First Name</label>
                            <input v-model="editForm.first_name" type="text"
                                class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
                        </div>
                        <div>
                            <label class="text-sm font-medium">Last Name</label>
                            <input v-model="editForm.last_name" type="text"
                                class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
                        </div>
                    </div>
                    <div>
                        <label class="text-sm font-medium">Phone</label>
                        <input v-model="editForm.phone" type="text"
                            class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
                    </div>
                    <div>
                        <label class="text-sm font-medium">Department</label>
                        <input v-model="editForm.department" type="text"
                            class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
                    </div>
                    <div class="flex justify-end gap-3 pt-4">
                        <button type="button" @click="showEditModal = false"
                            class="px-4 py-2 border border-border rounded-lg hover:bg-muted">Cancel</button>
                        <button type="submit"
                            class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">Save
                            Changes</button>
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

const route = useRoute()
const { authHeaders } = useAuth()
const { toast } = useToast()

// Fetch user from Django API
const { data: userData, pending: loading, refresh } = await useFetch<any>(`${API_BASE}/${route.params.id}/`, {
    headers: authHeaders(),
})

const user = computed(() => {
    const u = userData.value
    if (!u) return null
    return {
        ...u,
        full_name: `${u.first_name} ${u.last_name}`,
    }
})

const showEditModal = ref(false)
const editForm = ref({
    first_name: '',
    last_name: '',
    phone: '',
    department: '',
})
const isSubmitting = ref(false)

// Sync edit form when user loads
watchEffect(() => {
    if (user.value) {
        editForm.value = {
            first_name: user.value.first_name,
            last_name: user.value.last_name,
            phone: user.value.phone || '',
            department: user.value.department || '',
        }
    }
})

const getRoleClass = (role: string | undefined) => {
    const classes: Record<string, string> = {
        super_admin: 'bg-purple-100 text-purple-700',
        admin: 'bg-blue-100 text-blue-700',
        manager: 'bg-amber-100 text-amber-700',
        staff: 'bg-gray-100 text-gray-700',
    }
    return classes[role || ''] || 'bg-gray-100 text-gray-700'
}

const formatRole = (role: string | undefined) => role?.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') || ''
const formatDate = (date: string | undefined) => date ? new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'

const saveUser = async () => {
    isSubmitting.value = true
    try {
        await $fetch(`${API_BASE}/${route.params.id}/`, {
            method: 'PATCH',
            headers: authHeaders(),
            body: editForm.value,
        })
        showEditModal.value = false
        await refresh()
        toast({
            title: 'Success',
            description: 'User updated successfully',
            variant: 'default',
        })
    } catch (e: any) {
        toast({
            title: 'Error',
            description: e.data?.detail || 'Failed to update user',
            variant: 'destructive',
        })
    } finally {
        isSubmitting.value = false
    }
}

const deactivateUser = async () => {
    try {
        await $fetch(`${API_BASE}/${route.params.id}/`, {
            method: 'PATCH',
            headers: authHeaders(),
            body: { is_active: false },
        })
        await refresh()
        toast({
            title: 'Success',
            description: 'User deactivated successfully',
            variant: 'default',
        })
    } catch (e: any) {
        toast({
            title: 'Error',
            description: e.data?.detail || 'Failed to deactivate user',
            variant: 'destructive',
        })
    }
}

const activateUser = async () => {
    try {
        await $fetch(`${API_BASE}/${route.params.id}/`, {
            method: 'PATCH',
            headers: authHeaders(),
            body: { is_active: true },
        })
        await refresh()
        toast({
            title: 'Success',
            description: 'User activated successfully',
            variant: 'default',
        })
    } catch (e: any) {
        toast({
            title: 'Error',
            description: e.data?.detail || 'Failed to activate user',
            variant: 'destructive',
        })
    }
}
</script>
