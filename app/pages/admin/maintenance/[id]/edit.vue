<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink :to="`/admin/maintenance/${route.params.id}`" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-3xl font-bold">Edit Maintenance Request</h1>
        <p class="text-muted-foreground">Update request information</p>
      </div>
    </div>

    <form @submit.prevent="updateRequest" class="max-w-4xl space-y-8" v-if="form">
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Request Information</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium">Title *</label>
            <input
              v-model="form.title"
              type="text"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium">Description *</label>
            <textarea
              v-model="form.description"
              rows="4"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Status & Assignment</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Status *</label>
            <select
              v-model="form.status"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="open">Open</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="on_hold">On Hold</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Priority *</label>
            <select
              v-model="form.priority"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Type *</label>
            <select
              v-model="form.type"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="reactive">Reactive</option>
              <option value="preventive">Preventive</option>
              <option value="inspection">Inspection</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Category</label>
            <select
              v-model="form.category"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Assigned To</label>
            <select
              v-model="form.assigned_to"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Unassigned</option>
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.first_name }} {{ user.last_name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Dates & Costs</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Scheduled Date</label>
            <input
              v-model="form.scheduled_date"
              type="date"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Estimated Cost (Rs.)</label>
            <input
              v-model.number="form.estimated_cost"
              type="number"
              step="0.01"
              min="0"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Actual Cost (Rs.)</label>
            <input
              v-model.number="form.actual_cost"
              type="number"
              step="0.01"
              min="0"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Vendor Information</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Vendor Name</label>
            <input
              v-model="form.vendor_name"
              type="text"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Vendor Contact</label>
            <input
              v-model="form.vendor_contact"
              type="text"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Resolution</h2>
        <div class="space-y-2">
          <label class="text-sm font-medium">Resolution Notes</label>
          <textarea
            v-model="form.resolution_notes"
            rows="4"
            class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div class="flex items-center gap-4 pt-4">
        <button 
          type="button"
          @click="$router.back()"
          class="px-4 py-2 border border-border rounded-lg hover:bg-muted"
        >
          Cancel
        </button>
        <button 
          type="submit"
          :disabled="saving"
          class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {{ saving ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const { toast } = useToast()
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { authHeaders } = useAuth()
const API_BASE = 'http://localhost:8000/api/maintenance'

const route = useRoute()
const saving = ref(false)

const { data: request, refresh } = await useFetch(`${API_BASE}/requests/${route.params.id}/`, {
  headers: authHeaders()
})

const { data: categories } = await useFetch(`${API_BASE}/categories/`, {
  headers: authHeaders()
})

const { data: users } = await useFetch(`http://localhost:8000/api/users/`, {
  headers: authHeaders()
})

const form = ref(null)

watchEffect(() => {
  if (request.value) {
    form.value = { ...request.value }
  }
})

const updateRequest = async () => {
  saving.value = true
  try {
    await $fetch(`${API_BASE}/requests/${route.params.id}/`, {
      method: 'PUT',
      headers: authHeaders(),
      body: form.value
    })
    
    await refresh()
    navigateTo(`/admin/maintenance/${route.params.id}`)
  } catch (e: any) {
    if (e.data) {
      const errors = Object.entries(e.data)
        .map(([key, msgs]) => `${key}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
        .join(', ')
      toast({ title: 'Error', description: `Failed to update request: ${errors}`, variant: 'destructive' })
    } else {
      toast({ title: 'Error', description: 'Failed to update maintenance request', variant: 'destructive' })
    }
  } finally {
    saving.value = false
  }
}
</script>
