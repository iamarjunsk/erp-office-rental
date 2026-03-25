<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink :to="`/admin/assets/${route.params.id}`" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-3xl font-bold">Edit Asset</h1>
        <p class="text-muted-foreground">{{ asset?.asset_code }}</p>
      </div>
    </div>

    <form @submit.prevent="updateAsset" class="max-w-4xl space-y-8" v-if="form">
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Information</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium">Asset Name *</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
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
            <label class="text-sm font-medium">Condition</label>
            <select
              v-model="form.condition"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Status</label>
            <select
              v-model="form.status"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="active">Active</option>
              <option value="in_maintenance">In Maintenance</option>
              <option value="damaged">Damaged</option>
              <option value="disposed">Disposed</option>
              <option value="lost">Lost</option>
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
              <option v-for="prop in properties" :key="prop.id" :value="prop.id">
                {{ prop.name }}
              </option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Space</label>
            <select
              v-model="form.space"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">No Space</option>
              <option v-for="space in filteredSpaces" :key="space.id" :value="space.id">
                {{ space.code }} - {{ space.name }}
              </option>
            </select>
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
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Notes</h2>
        <div class="space-y-2">
          <textarea
            v-model="form.notes"
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
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { authHeaders } = useAuth()
const { success, error } = useToast()
const API_BASE = 'http://localhost:8000/api'

const route = useRoute()
const saving = ref(false)

const { data: asset, refresh } = await useFetch(`${API_BASE}/assets/assets/${route.params.id}/`, {
  headers: authHeaders()
})

const { data: categories } = await useFetch(`${API_BASE}/assets/categories/`, {
  headers: authHeaders()
})

const { data: properties } = await useFetch(`${API_BASE}/properties/`, {
  headers: authHeaders()
})

const { data: spaces } = await useFetch(`${API_BASE}/spaces/`, {
  headers: authHeaders()
})

const form = ref(null)

watchEffect(() => {
  if (asset.value) {
    form.value = { ...asset.value }
  }
})

const filteredSpaces = computed(() => {
  if (!form.value?.property) return []
  return (spaces.value || []).filter((space: any) => {
    return space.property === form.value.property || 
           space.property_details?.id === form.value.property
  })
})

const updateAsset = async () => {
  saving.value = true
  try {
    await $fetch(`${API_BASE}/assets/assets/${route.params.id}/`, {
      method: 'PUT',
      headers: authHeaders(),
      body: form.value
    })
    
    await refresh()
    success('Asset updated successfully')
    navigateTo(`/admin/assets/${route.params.id}`)
  } catch (e: any) {
    console.error('Update asset error:', e)
    let errorMessage = 'Failed to update asset'
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
    error('Failed to update asset', errorMessage)
  } finally {
    saving.value = false
  }
}
</script>
