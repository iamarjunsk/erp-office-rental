<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink :to="`/admin/spaces/${route.params.id}`" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-3xl font-bold">Edit Space</h1>
        <p class="text-muted-foreground">Update info for {{ space?.name }}</p>
      </div>
    </div>

    <form @submit.prevent="updateSpace" class="max-w-4xl space-y-8" v-if="formData">
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Information</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Space Code *</label>
            <input
              v-model="formData.code"
              type="text"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Space Name *</label>
            <input
              v-model="formData.name"
              type="text"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Property *</label>
            <select
              v-model="formData.property"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option v-for="prop in properties" :key="prop.id" :value="prop.id">
                {{ prop.name }} ({{ prop.code }})
              </option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Type *</label>
            <select
              v-model="formData.type"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="private_office">Private Office</option>
              <option value="open_desk">Open Desk</option>
              <option value="meeting_room">Meeting Room</option>
              <option value="virtual_office">Virtual Office</option>
              <option value="hot_desk">Hot Desk</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Status *</label>
            <select
              v-model="formData.current_status"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
              <option value="reserved">Reserved</option>
            </select>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Location & Specifications</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Floor *</label>
            <input
              v-model.number="formData.floor"
              type="number"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Area (sqft) *</label>
            <input
              v-model.number="formData.area"
              type="number"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Capacity (people)</label>
            <input
              v-model.number="formData.capacity"
              type="number"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Pricing</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Base Rent (Monthly) *</label>
            <input
              v-model.number="formData.base_rent"
              type="number"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Price Per Day</label>
            <input
              v-model.number="formData.price_per_day"
              type="number"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Additional Details</h2>
        <div class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Amenities (comma-separated)</label>
            <input
              v-model="amenitiesInput"
              type="text"
              placeholder="WiFi, AC, Projector"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Description</label>
            <textarea
              v-model="formData.description"
              rows="3"
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
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { authHeaders } = useAuth()
const { toast } = useToast()
const API_BASE = 'http://localhost:8000/api/spaces'
const PROPERTIES_API = 'http://localhost:8000/api/properties'

const route = useRoute()
const saving = ref(false)
const amenitiesInput = ref('')

// Fetch space and properties
const { data: space, refresh } = await useFetch(`${API_BASE}/${route.params.id}/`, {
  headers: authHeaders()
})

const { data: properties } = await useFetch(`${PROPERTIES_API}/`, {
  headers: authHeaders()
})

const formData = ref(null)

// Initialize form data when space is loaded
watchEffect(() => {
  if (space.value) {
    formData.value = {
      code: space.value.code,
      name: space.value.name,
      property: space.value.property,
      type: space.value.type,
      floor: space.value.floor,
      area: Number(space.value.area),
      capacity: space.value.capacity,
      base_rent: Number(space.value.base_rent),
      price_per_day: space.value.price_per_day ? Number(space.value.price_per_day) : null,
      current_status: space.value.current_status,
      description: space.value.description || '',
    }
    amenitiesInput.value = space.value.amenities?.join(', ') || ''
  }
})

const updateSpace = async () => {
  saving.value = true
  try {
    const payload = {
      code: formData.value.code,
      name: formData.value.name,
      property: formData.value.property,
      type: formData.value.type,
      floor: formData.value.floor,
      area: formData.value.area,
      capacity: formData.value.capacity,
      base_rent: formData.value.base_rent,
      price_per_day: formData.value.price_per_day,
      current_status: formData.value.current_status,
      description: formData.value.description,
      amenities: amenitiesInput.value.split(',').map(a => a.trim()).filter(a => a)
    }

    await $fetch(`${API_BASE}/${route.params.id}/`, {
      method: 'PUT',
      headers: authHeaders(),
      body: payload
    })
    
    await refresh()
    navigateTo(`/admin/spaces/${route.params.id}`)
  } catch (e: any) {
    if (e.data) {
      const errors = Object.entries(e.data)
        .map(([key, msgs]) => `${key}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
        .join('\n')
      toast({ title: 'Error', description: `Failed to update space:\n${errors}`, variant: 'destructive' })
    } else {
      toast({ title: 'Error', description: 'Failed to update space', variant: 'destructive' })
    }
  } finally {
    saving.value = false
  }
}
</script>
