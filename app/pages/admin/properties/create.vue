<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/properties" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-3xl font-bold">Add Property</h1>
        <p class="text-muted-foreground">Register a new office property</p>
      </div>
    </div>

    <form @submit.prevent="createProperty" class="max-w-4xl space-y-8">
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Information</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Property Code *</label>
            <input
              v-model="newProperty.code"
              type="text"
              placeholder="PROP-001"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Property Name *</label>
            <input
              v-model="newProperty.name"
              type="text"
              placeholder="Cyber Towers"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Type *</label>
            <select
              v-model="newProperty.type"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="commercial">Commercial Office</option>
              <option value="coworking">Co-working Space</option>
              <option value="mixed_use">Mixed Use</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Total Area (sqft) *</label>
            <input
              v-model.number="newProperty.totalArea"
              type="number"
              placeholder="50000"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Location Details</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium">Address *</label>
            <input
              v-model="newProperty.address"
              type="text"
              placeholder="Full address"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">City *</label>
            <input
              v-model="newProperty.city"
              type="text"
              placeholder="Hyderabad"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">State *</label>
            <input
              v-model="newProperty.state"
              type="text"
              placeholder="Telangana"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">PIN Code *</label>
            <input
              v-model="newProperty.pincode"
              type="text"
              placeholder="500081"
              maxlength="6"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Additional Details</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Build Year</label>
            <input
              v-model.number="newProperty.buildYear"
              type="number"
              placeholder="2018"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Floors</label>
            <input
              v-model.number="newProperty.floors"
              type="number"
              placeholder="10"
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
          {{ creating ? 'Creating...' : 'Create Property' }}
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
// Use hardcoded localhost for now matching verification success
const API_BASE = 'http://localhost:8000/api/properties'

const creating = ref(false)

const newProperty = ref({
  code: '',
  name: '',
  type: 'commercial',
  address: '',
  city: '',
  state: '',
  pincode: '',
  totalArea: 0,
  buildYear: undefined,
  floors: undefined,
})

const createProperty = async () => {
  creating.value = true
  try {
    // Map camelCase to snake_case for backend
    const payload = {
      code: newProperty.value.code,
      name: newProperty.value.name,
      type: newProperty.value.type,
      address: newProperty.value.address,
      city: newProperty.value.city,
      state: newProperty.value.state,
      pincode: newProperty.value.pincode,
      total_area: newProperty.value.totalArea,
      build_year: newProperty.value.buildYear,
      floors: newProperty.value.floors,
      status: 'active' // Default status
    }

    await $fetch(`${API_BASE}/`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })
    
    navigateTo('/admin/properties')
  } catch (e: any) {
    if (e.data) {
      // Format validation errors to readable string
      const errors = Object.entries(e.data)
        .map(([key, msgs]) => `${key}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
        .join('\n')
      toast({ title: 'Error', description: `Failed to create property:\n${errors}`, variant: 'destructive' })
    } else {
      toast({ title: 'Error', description: 'Failed to create property', variant: 'destructive' })
    }
  } finally {
    creating.value = false
  }
}
</script>
