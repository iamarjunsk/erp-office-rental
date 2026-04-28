<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/spaces" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-3xl font-bold">Add Space</h1>
        <p class="text-muted-foreground">Register a new office space or room</p>
      </div>
    </div>

    <form @submit.prevent="createSpace" class="max-w-4xl space-y-8">
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Information</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Space Code *</label>
            <input
              v-model="newSpace.code"
              type="text"
              placeholder="SP-001"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Space Name *</label>
            <input
              v-model="newSpace.name"
              type="text"
              placeholder="Conference Room A"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Property *</label>
            <select
              v-model="newSpace.property"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select Property</option>
              <option v-for="prop in properties" :key="prop.id" :value="prop.id">
                {{ prop.name }} ({{ prop.code }})
              </option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Type *</label>
            <select
              v-model="newSpace.type"
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
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Location & Specifications</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Floor *</label>
            <input
              v-model.number="newSpace.floor"
              type="number"
              placeholder="1"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Area (sqft) *</label>
            <input
              v-model.number="newSpace.area"
              type="number"
              placeholder="500"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Capacity (people)</label>
            <input
              v-model.number="newSpace.capacity"
              type="number"
              placeholder="10"
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
              v-model.number="newSpace.base_rent"
              type="number"
              placeholder="25000"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Price Per Day</label>
            <input
              v-model.number="newSpace.price_per_day"
              type="number"
              placeholder="1500"
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
              placeholder="WiFi, AC, Projector, Whiteboard"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Description</label>
            <textarea
              v-model="newSpace.description"
              rows="3"
              placeholder="Space description..."
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
          {{ creating ? 'Creating...' : 'Create Space' }}
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
const API_BASE = 'http://localhost:8000/api/spaces'
const PROPERTIES_API = 'http://localhost:8000/api/properties'

const creating = ref(false)
const amenitiesInput = ref('')

const newSpace = ref({
  code: '',
  name: '',
  property: '',
  type: 'private_office',
  floor: 1,
  area: 0,
  capacity: null as number | null,
  base_rent: 0,
  price_per_day: null as number | null,
  description: '',
})

// Fetch properties for dropdown
const { data: properties } = await useFetch(() => `${PROPERTIES_API}/`, {
  headers: authHeaders()
})

const createSpace = async () => {
  creating.value = true
  try {
    const payload = {
      code: newSpace.value.code,
      name: newSpace.value.name,
      property: newSpace.value.property,
      type: newSpace.value.type,
      floor: newSpace.value.floor,
      area: newSpace.value.area,
      capacity: newSpace.value.capacity,
      base_rent: newSpace.value.base_rent,
      price_per_day: newSpace.value.price_per_day,
      current_status: 'available',
      description: newSpace.value.description,
      amenities: amenitiesInput.value.split(',').map(a => a.trim()).filter(a => a)
    }

    await $fetch(`${API_BASE}/`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })
    
    navigateTo('/admin/spaces')
  } catch (e: any) {
    if (e.data) {
      const errors = Object.entries(e.data)
        .map(([key, msgs]) => `${key}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
        .join('\n')
      toast({ title: 'Error', description: String(`Failed to create space:\n${errors}`), variant: 'destructive' })
    } else {
      toast({ title: 'Error', description: String('Failed to create space'), variant: 'destructive' })
    }
  } finally {
    creating.value = false
  }
}
</script>
