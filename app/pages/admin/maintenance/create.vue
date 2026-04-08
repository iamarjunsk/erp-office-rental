<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/maintenance" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-3xl font-bold">Create Maintenance Request</h1>
        <p class="text-muted-foreground">Report a new maintenance issue</p>
      </div>
    </div>

    <form @submit.prevent="createRequest" class="max-w-4xl space-y-8">
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Request Information</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium">Title *</label>
            <input
              v-model="form.title"
              type="text"
              placeholder="Brief description of the issue"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium">Description *</label>
            <textarea
              v-model="form.description"
              rows="4"
              placeholder="Detailed description of the maintenance issue..."
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Location & Category</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Property *</label>
            <select
              v-model="form.property"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select Property</option>
              <option v-for="prop in properties" :key="prop.id" :value="prop.id">
                {{ prop.name }}
              </option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Space (Optional)</label>
            <select
              v-model="form.space"
              :disabled="!form.property"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="">{{ form.property ? 'Select Space' : 'Select property first' }}</option>
              <option v-for="space in filteredSpaces" :key="space.id" :value="space.id">
                {{ space.code }} - {{ space.name }}
              </option>
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
            <label class="text-sm font-medium">Specific Location</label>
            <input
              v-model="form.specific_location"
              type="text"
              placeholder="e.g., 3rd Floor, Room 302"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Priority & Type</h2>
        <div class="grid md:grid-cols-3 gap-4">
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
            <label class="text-sm font-medium">Scheduled Date</label>
            <input
              v-model="form.scheduled_date"
              type="date"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Cost Estimate</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Estimated Cost (Rs.)</label>
            <input
              v-model.number="form.estimated_cost"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
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
          :disabled="creating"
          class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {{ creating ? 'Creating...' : 'Create Request' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { authHeaders } = useAuth()
const API_BASE = 'http://localhost:8000/api'
const { toast } = useToast()

const creating = ref(false)

const form = ref({
  title: '',
  description: '',
  property: '',
  space: '',
  category: '',
  specific_location: '',
  priority: 'medium',
  type: 'reactive',
  scheduled_date: '',
  estimated_cost: null
})

// Fetch properties, spaces, and categories
const { data: properties } = await useFetch(`${API_BASE}/properties/`, {
  headers: authHeaders()
})

const { data: spaces } = await useFetch(`${API_BASE}/spaces/`, {
  headers: authHeaders()
})

const { data: categories } = await useFetch(`${API_BASE}/maintenance/categories/`, {
  headers: authHeaders()
})

// Filter spaces by selected property
const filteredSpaces = computed(() => {
  if (!form.value.property) return []
  return (spaces.value || []).filter((space: any) => {
    // Access the property from space_details or check if space has property field
    return space.property === parseInt(form.value.property) || 
           space.property_details?.id === parseInt(form.value.property)
  })
})

const createRequest = async () => {
  creating.value = true
  try {
    await $fetch(`${API_BASE}/maintenance/requests/`, {
      method: 'POST',
      headers: authHeaders(),
      body: form.value
    })
    
    navigateTo('/admin/maintenance')
  } catch (e: any) {
    if (e.data) {
      const errors = Object.entries(e.data)
        .map(([key, msgs]) => `${key}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
        .join(', ')
      toast({
        title: 'Error',
        description: `Failed to create request: ${errors}`,
        variant: 'destructive'
      })
    } else {
      toast({
        title: 'Error',
        description: 'Failed to create maintenance request',
        variant: 'destructive'
      })
    }
  } finally {
    creating.value = false
  }
}
</script>
