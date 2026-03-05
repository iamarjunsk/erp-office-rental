<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink :to="`/admin/properties/${route.params.id}`" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-3xl font-bold">Edit Property</h1>
        <p class="text-muted-foreground">Update info for {{ property?.name }}</p>
      </div>
    </div>

    <form @submit.prevent="updateProperty" class="max-w-4xl space-y-8" v-if="formData">
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Information</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Property Code *</label>
            <input
              v-model="formData.code"
              type="text"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Property Name *</label>
            <input
              v-model="formData.name"
              type="text"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Type *</label>
            <select
              v-model="formData.type"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="commercial">Commercial Office</option>
              <option value="coworking">Co-working Space</option>
              <option value="mixed_use">Mixed Use</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Status *</label>
            <select
              v-model="formData.status"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="under_renovation">Under Renovation</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Total Area (sqft) *</label>
            <input
              v-model.number="formData.totalArea"
              type="number"
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
              v-model="formData.address"
              type="text"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">City *</label>
            <input
              v-model="formData.city"
              type="text"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">State *</label>
            <input
              v-model="formData.state"
              type="text"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">PIN Code *</label>
            <input
              v-model="formData.pincode"
              type="text"
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
              v-model.number="formData.buildYear"
              type="number"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Floors</label>
            <input
              v-model.number="formData.floors"
              type="number"
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
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { authHeaders } = useAuth()
// Use hardcoded localhost for now matching verification success
const API_BASE = 'http://localhost:8000/api/properties'

const route = useRoute()
const saving = ref(false)
const { data: property, refresh } = await useFetch(`${API_BASE}/${route.params.id}/`, {
  headers: authHeaders()
})

const formData = ref(null)

// Initialize form data when property is loaded
watchEffect(() => {
  if (property.value) {
    formData.value = {
      code: property.value.code,
      name: property.value.name,
      type: property.value.type,
      address: property.value.address,
      city: property.value.city,
      state: property.value.state,
      pincode: property.value.pincode,
      totalArea: property.value.total_area, // Map snake_case to camelCase for form
      buildYear: property.value.build_year,
      floors: property.value.floors,
      status: property.value.status
    }
  }
})

const updateProperty = async () => {
  saving.value = true
  try {
    // Map camelCase to snake_case for backend
    const payload = {
      code: formData.value.code,
      name: formData.value.name,
      type: formData.value.type,
      address: formData.value.address,
      city: formData.value.city,
      state: formData.value.state,
      pincode: formData.value.pincode,
      total_area: formData.value.totalArea,
      build_year: formData.value.buildYear,
      floors: formData.value.floors,
      status: formData.value.status
    }

    await $fetch(`${API_BASE}/${route.params.id}/`, {
      method: 'PUT',
      headers: authHeaders(),
      body: payload
    })
    
    // Refresh data to show latest
    await refresh()
    navigateTo(`/admin/properties/${route.params.id}`)
  } catch (e: any) {
    if (e.data) {
       // Format validation errors to readable string
      const errors = Object.entries(e.data)
        .map(([key, msgs]) => `${key}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
        .join('\n')
      toast.error('Failed to update property', {
        description: errors
      })
    } else {
      toast.error('Failed to update property')
    }
  } finally {
    saving.value = false
  }
}
</script>
