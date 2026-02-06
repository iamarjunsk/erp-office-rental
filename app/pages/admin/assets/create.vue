<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/assets" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-3xl font-bold">Add New Asset</h1>
        <p class="text-muted-foreground">Register a new asset in the system</p>
      </div>
    </div>

    <form @submit.prevent="submitAsset" class="space-y-8">
      <!-- Basic Info -->
      <div class="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 class="text-lg font-semibold">Basic Information</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Asset Name *</label>
            <input 
              v-model="form.name"
              type="text"
              placeholder="e.g., MacBook Pro 14\""
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Category *</label>
            <select 
              v-model="form.categoryId"
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Subcategory</label>
            <input 
              v-model="form.subcategory"
              type="text"
              placeholder="e.g., Laptop"
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Make/Brand *</label>
            <input 
              v-model="form.make"
              type="text"
              placeholder="e.g., Apple"
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Model *</label>
            <input 
              v-model="form.model"
              type="text"
              placeholder="e.g., MacBook Pro 14"
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Serial Number *</label>
            <input 
              v-model="form.serialNumber"
              type="text"
              placeholder="Enter serial number"
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Description</label>
          <textarea 
            v-model="form.description"
            rows="3"
            placeholder="Detailed description of the asset..."
            class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          ></textarea>
        </div>
      </div>

      <!-- Location & Assignment -->
      <div class="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 class="text-lg font-semibold">Location & Assignment</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Property *</label>
            <select 
              v-model="form.propertyId"
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select property</option>
              <option v-for="prop in properties" :key="prop.id" :value="prop.id">{{ prop.name }}</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Location *</label>
            <input 
              v-model="form.location"
              type="text"
              placeholder="e.g., Floor 3, Desk 42"
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Condition *</label>
            <select 
              v-model="form.condition"
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Initial Status</label>
            <select 
              v-model="form.status"
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="available">Available</option>
              <option value="in_use">In Use</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Assign To (Optional)</label>
            <select 
              v-model="form.assignedToId"
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Unassigned</option>
              <option value="1">John Doe - Facility</option>
              <option value="2">Jane Smith - Engineering</option>
              <option value="3">Mike Wilson - Admin</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Financial Info -->
      <div class="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 class="text-lg font-semibold">Financial Information</h2>
        <div class="grid md:grid-cols-4 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Purchase Price (₹) *</label>
            <input 
              v-model.number="form.purchasePrice"
              type="number"
              min="0"
              placeholder="e.g., 145000"
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Purchase Date *</label>
            <input 
              v-model="form.purchaseDate"
              type="date"
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Warranty Expiry</label>
            <input 
              v-model="form.warrantyExpiry"
              type="date"
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Useful Life (Years) *</label>
            <input 
              v-model.number="form.usefulLife"
              type="number"
              min="1"
              max="50"
              placeholder="e.g., 5"
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Depreciation Method *</label>
            <select 
              v-model="form.depreciationMethod"
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="straight_line">Straight Line</option>
              <option value="declining_balance">Declining Balance</option>
              <option value="none">No Depreciation</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Vendor</label>
            <select 
              v-model="form.vendorId"
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select vendor (optional)</option>
              <option v-for="vendor in vendors" :key="vendor.id" :value="vendor.id">{{ vendor.name }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-4">
        <button 
          type="button"
          @click="$router.back()"
          class="px-4 py-2 border border-border rounded-lg hover:bg-muted"
        >
          Cancel
        </button>
        <button 
          type="submit"
          class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          :disabled="saving"
        >
          {{ saving ? 'Saving...' : 'Add Asset' }}
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

const { data: categoryData } = await useFetch('/api/assets/categories')
const { data: propertyData } = await useFetch('/api/properties')
const { data: vendorData } = await useFetch('/api/procurement/vendors')

const categories = computed(() => categoryData.value?.data || [])
const properties = computed(() => propertyData.value?.data || [])
const vendors = computed(() => vendorData.value?.data || [])

const saving = ref(false)

const form = ref({
  name: '',
  categoryId: '',
  subcategory: '',
  make: '',
  model: '',
  serialNumber: '',
  description: '',
  propertyId: '',
  location: '',
  condition: 'excellent',
  status: 'available',
  assignedToId: '',
  purchasePrice: null as number | null,
  purchaseDate: '',
  warrantyExpiry: '',
  usefulLife: 5,
  depreciationMethod: 'straight_line',
  vendorId: '',
})

const submitAsset = async () => {
  saving.value = true
  try {
    console.log('Creating asset:', form.value)
    await new Promise(r => setTimeout(r, 1000))
    navigateTo('/admin/assets')
  } finally {
    saving.value = false
  }
}
</script>
