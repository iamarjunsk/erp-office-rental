<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/assets" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-3xl font-bold">Add Asset</h1>
        <p class="text-muted-foreground">Register a new facility asset</p>
      </div>
    </div>

    <form @submit.prevent="createAsset" class="max-w-4xl space-y-8">
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Information</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium">Asset Name *</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="e.g., Dell Laptop Latitude 5520"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Detailed description of the asset..."
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Category *</label>
            <select
              v-model="form.category"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select Category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Condition *</label>
            <select
              v-model="form.condition"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Location</h2>
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
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Specifications</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Manufacturer</label>
            <input
              v-model="form.manufacturer"
              type="text"
              placeholder="e.g., Dell"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Model Number</label>
            <input
              v-model="form.model_number"
              type="text"
              placeholder="e.g., Latitude 5520"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Serial Number</label>
            <input
              v-model="form.serial_number"
              type="text"
              placeholder="Asset serial number"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium">Specifications</label>
            <textarea
              v-model="form.specifications"
              rows="3"
              placeholder="Technical specifications..."
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Purchase Information</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Purchase Date</label>
            <input
              v-model="form.purchase_date"
              type="date"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Purchase Price (Rs.)</label>
            <input
              v-model.number="form.purchase_price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Vendor</label>
            <input
              v-model="form.vendor"
              type="text"
              placeholder="Vendor name"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Warranty Expiry</label>
            <input
              v-model="form.warranty_expiry"
              type="date"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Useful Life (Years)</label>
            <input
              v-model.number="form.useful_life_years"
              type="number"
              min="0"
              placeholder="5"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Depreciation Rate (%)</label>
            <input
              v-model.number="form.depreciation_rate"
              type="number"
              step="0.01"
              min="0"
              max="100"
              placeholder="20"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Additional Information</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Photo URL</label>
            <input
              v-model="form.photo_url"
              type="url"
              placeholder="https://..."
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Document URL</label>
            <input
              v-model="form.document_url"
              type="url"
              placeholder="https://..."
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium">Notes</label>
            <textarea
              v-model="form.notes"
              rows="3"
              placeholder="Additional notes..."
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
          {{ creating ? 'Creating...' : 'Create Asset' }}
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
const { success, error } = useToast()
const API_BASE = 'http://localhost:8000/api'

const creating = ref(false)

const form = ref({
  name: '',
  description: '',
  category: '',
  condition: 'good',
  property: '',
  space: '',
  manufacturer: '',
  model_number: '',
  serial_number: '',
  specifications: '',
  purchase_date: '',
  purchase_price: null,
  vendor: '',
  warranty_expiry: '',
  useful_life_years: null,
  depreciation_rate: null,
  photo_url: '',
  document_url: '',
  notes: ''
})

// Fetch categories, properties, and spaces
const { data: categories } = await useFetch(`${API_BASE}/assets/categories/`, {
  headers: authHeaders()
})

const { data: properties } = await useFetch(`${API_BASE}/properties/`, {
  headers: authHeaders()
})

const { data: spaces } = await useFetch(`${API_BASE}/spaces/`, {
  headers: authHeaders()
})

// Filter spaces by selected property
const filteredSpaces = computed(() => {
  if (!form.value.property) return []
  return (spaces.value || []).filter((space: any) => {
    return space.property === parseInt(form.value.property) || 
           space.property_details?.id === parseInt(form.value.property)
  })
})

const createAsset = async () => {
  creating.value = true
  try {
    await $fetch(`${API_BASE}/assets/assets/`, {
      method: 'POST',
      headers: authHeaders(),
      body: form.value
    })
    
    success('Asset created successfully')
    navigateTo('/admin/assets')
  } catch (e: any) {
    console.error('Create asset error:', e)
    let errorMessage = 'Failed to create asset'
    if (e.data && typeof e.data === 'object') {
      const errors = Object.entries(e.data)
        .map(([key, msgs]) => `${key}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
        .join(', ')
      errorMessage = errors
    } else if (e.data) {
      errorMessage = String(e.data)
    } else if (e.message) {
      errorMessage = e.message
    }
    error('Failed to create asset', errorMessage)
  } finally {
    creating.value = false
  }
}
</script>
