<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/procurement" class="p-2 hover:bg-muted rounded-full">
          <Icon name="lucide:arrow-left" class="w-5 h-5" />
        </NuxtLink>
        <div>
          <h1 class="text-3xl font-bold">Vendor Directory</h1>
          <p class="text-muted-foreground">Manage supplier relationships</p>
        </div>
      </div>
      <button @click="showAddModal = true" class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
        <Icon name="lucide:plus" class="w-4 h-4" />
        Add Vendor
      </button>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-4">
      <div class="flex-1 min-w-[250px]">
        <input 
          v-model="search"
          type="text"
          placeholder="Search vendors..."
          class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <select 
        v-model="categoryFilter"
        class="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">All Categories</option>
        <option value="cleaning_supplies">Cleaning Supplies</option>
        <option value="it_hardware">IT Hardware</option>
        <option value="furniture">Furniture</option>
        <option value="office_supplies">Office Supplies</option>
        <option value="security">Security</option>
      </select>
      <select
        v-model="typeFilter"
        class="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">All Types</option>
        <option value="supplier">Suppliers</option>
        <option value="service_provider">Service Providers</option>
      </select>
    </div>

    <!-- Stats -->
    <div class="grid md:grid-cols-4 gap-4">
      <div class="bg-card border border-border rounded-xl p-4">
        <div class="text-2xl font-bold">{{ stats.total }}</div>
        <div class="text-sm text-muted-foreground">Total Vendors</div>
      </div>
      <div class="bg-card border border-border rounded-xl p-4">
        <div class="text-2xl font-bold text-green-600">{{ stats.active }}</div>
        <div class="text-sm text-muted-foreground">Active</div>
      </div>
      <div class="bg-card border border-border rounded-xl p-4">
        <div class="text-2xl font-bold">{{ stats.suppliers }}</div>
        <div class="text-sm text-muted-foreground">Suppliers</div>
      </div>
      <div class="bg-card border border-border rounded-xl p-4">
      <div class="text-2xl font-bold">{{ stats.serviceProviders || stats.service_providers }}</div>
      <div class="text-sm text-muted-foreground">Service Providers</div>
      </div>
    </div>

    <!-- Vendors Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="vendor in filteredVendors" 
        :key="vendor.id"
        class="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
        @click="selectedVendor = vendor"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon :name="vendor.vendor_type === 'service_provider' ? 'lucide:briefcase' : 'lucide:building-2'" class="w-6 h-6 text-primary" />
            </div>
            <div>
              <div class="font-semibold">{{ vendor.name }}</div>
              <div class="text-xs text-muted-foreground">{{ vendor.code }}</div>
            </div>
          </div>
          <span 
            class="px-2 py-0.5 text-xs rounded-full font-medium capitalize"
            :class="vendor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'"
          >
            {{ vendor.status }}
          </span>
        </div>

        <div class="space-y-2 text-sm mb-4">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="lucide:tag" class="w-4 h-4" />
            <span class="capitalize">{{ vendor.category?.replace('_', ' ') }}</span>
          </div>
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="lucide:map-pin" class="w-4 h-4" />
            <span>{{ vendor.address?.city }}, {{ vendor.address?.state }}</span>
          </div>
          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="lucide:user" class="w-4 h-4" />
            <span>{{ vendor.contact?.name }}</span>
          </div>
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-border">
          <div class="flex items-center gap-1">
            <Icon name="lucide:star" class="w-4 h-4 text-amber-500" />
            <span class="font-medium">{{ vendor.rating }}</span>
          </div>
          <div class="text-sm text-muted-foreground">
            {{ vendor.total_orders }} orders • ₹{{ (vendor.total_value / 100000).toFixed(1) }}L
          </div>
        </div>
      </div>
    </div>

    <!-- Vendor Detail Modal -->
    <div
      v-if="selectedVendor"
      class="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20 pb-4 overflow-y-auto"
      @click.self="selectedVendor = null"
    >
      <div class="bg-card rounded-xl w-full max-w-2xl m-4 shadow-2xl">
        <div class="p-6 border-b border-border flex items-start justify-between">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon :name="selectedVendor.vendor_type === 'service_provider' ? 'lucide:briefcase' : 'lucide:building-2'" class="w-7 h-7 text-primary" />
            </div>
            <div>
              <div class="text-xl font-bold">{{ selectedVendor.name }}</div>
              <div class="text-sm text-muted-foreground">{{ selectedVendor.code }} • {{ selectedVendor.vendor_type === 'service_provider' ? 'Service Provider' : 'Supplier' }}</div>
            </div>
          </div>
          <button @click="selectedVendor = null" class="p-2 hover:bg-muted rounded-full">
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6 space-y-6">
          <!-- Contact -->
          <div>
            <h4 class="font-semibold mb-3">Contact Information</h4>
            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div class="flex items-center gap-2">
                <Icon name="lucide:user" class="w-4 h-4 text-muted-foreground" />
                <span>{{ selectedVendor.contact?.name }} ({{ selectedVendor.contact?.designation }})</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="lucide:mail" class="w-4 h-4 text-muted-foreground" />
                <a :href="`mailto:${selectedVendor.contact?.email}`" class="text-primary hover:underline">{{ selectedVendor.contact?.email }}</a>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="lucide:phone" class="w-4 h-4 text-muted-foreground" />
                <span>{{ selectedVendor.contact?.phone }}</span>
              </div>
            </div>
          </div>

          <!-- Address -->
          <div>
            <h4 class="font-semibold mb-3">Address</h4>
            <div class="text-sm text-muted-foreground">
              {{ selectedVendor.address?.street }}<br>
              {{ selectedVendor.address?.city }}, {{ selectedVendor.address?.state }} {{ selectedVendor.address?.pincode }}<br>
              {{ selectedVendor.address?.country }}
            </div>
          </div>

          <!-- Tax Info -->
          <div>
            <h4 class="font-semibold mb-3">Tax Information</h4>
            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <div class="text-muted-foreground">GST Number</div>
                <div class="font-mono">{{ selectedVendor.gst_number }}</div>
              </div>
              <div>
                <div class="text-muted-foreground">PAN Number</div>
                <div class="font-mono">{{ selectedVendor.pan_number }}</div>
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div>
            <h4 class="font-semibold mb-3">Performance</h4>
            <div class="grid grid-cols-3 gap-4">
              <div class="bg-muted/50 p-4 rounded-lg text-center">
                <div class="flex items-center justify-center gap-1 mb-1">
                  <Icon name="lucide:star" class="w-5 h-5 text-amber-500" />
                  <span class="text-2xl font-bold">{{ selectedVendor.rating }}</span>
                </div>
                <div class="text-xs text-muted-foreground">Rating</div>
              </div>
              <div class="bg-muted/50 p-4 rounded-lg text-center">
              <div class="text-2xl font-bold">{{ selectedVendor.total_orders }}</div>
              <div class="text-xs text-muted-foreground">Total Orders</div>
            </div>
            <div class="bg-muted/50 p-4 rounded-lg text-center">
              <div class="text-2xl font-bold">₹{{ (selectedVendor.total_value / 100000).toFixed(1) }}L</div>
                <div class="text-xs text-muted-foreground">Total Value</div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 border-t border-border flex justify-end gap-3 bg-card">
          <button class="px-4 py-2 border border-border rounded-lg hover:bg-muted">
            Edit Vendor
          </button>
          <button
            @click="navigateTo(`/admin/procurement/purchase-orders/create?vendorId=${selectedVendor.id}`)"
            class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Create PO
          </button>
        </div>
      </div>
    </div>

    <!-- Add Vendor Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="showAddModal = false"
    >
      <div class="bg-card rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <div class="p-6 border-b border-border flex items-center justify-between">
          <h3 class="text-lg font-semibold">Add New Vendor</h3>
          <button @click="showAddModal = false" class="p-2 hover:bg-muted rounded-full">
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>
        <form @submit.prevent="submitVendor" class="p-6 space-y-6">
          <!-- Basic Info -->
          <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium">Vendor Name *</label>
              <input
                v-model="vendorForm.name"
                type="text"
                required
                class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Vendor Code *</label>
              <input
                v-model="vendorForm.code"
                type="text"
                required
                placeholder="e.g., VND-006"
                class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Type *</label>
              <select
                v-model="vendorForm.vendor_type"
                required
                class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="supplier">Supplier</option>
                <option value="service_provider">Service Provider</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Category *</label>
              <select
                v-model="vendorForm.category"
                required
                class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="cleaning_supplies">Cleaning Supplies</option>
                <option value="it_hardware">IT Hardware</option>
                <option value="furniture">Furniture</option>
                <option value="office_supplies">Office Supplies</option>
                <option value="security">Security</option>
                <option value="maintenance">Maintenance</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="space-y-4">
            <h4 class="font-medium">Contact Information</h4>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-sm font-medium">Contact Name *</label>
                <input
                  v-model="vendorForm.contact_name"
                  type="text"
                  required
                  class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium">Contact Email *</label>
                <input
                  v-model="vendorForm.contact_email"
                  type="email"
                  required
                  class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium">Contact Phone *</label>
                <input
                  v-model="vendorForm.contact_phone"
                  type="tel"
                  required
                  class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium">Designation</label>
                <input
                  v-model="vendorForm.contact_designation"
                  type="text"
                  class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <!-- Address -->
          <div class="space-y-4">
            <h4 class="font-medium">Address</h4>
            <div class="space-y-2">
              <label class="text-sm font-medium">Street</label>
              <input
                v-model="vendorForm.address_street"
                type="text"
                class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div class="grid md:grid-cols-3 gap-4">
              <div class="space-y-2">
                <label class="text-sm font-medium">City</label>
                <input
                  v-model="vendorForm.address_city"
                  type="text"
                  class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium">State</label>
                <input
                  v-model="vendorForm.address_state"
                  type="text"
                  class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium">Pincode</label>
                <input
                  v-model="vendorForm.address_pincode"
                  type="text"
                  class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <!-- Tax Info -->
          <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium">GST Number</label>
              <input
                v-model="vendorForm.gst_number"
                type="text"
                class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">PAN Number</label>
              <input
                v-model="vendorForm.pan_number"
                type="text"
                class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </form>
        <div class="p-6 border-t border-border flex justify-end gap-3">
          <button @click="showAddModal = false" class="px-4 py-2 border border-border rounded-lg hover:bg-muted">
            Cancel
          </button>
          <button
            @click="submitVendor"
            :disabled="saving"
            class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
          >
            {{ saving ? 'Creating...' : 'Create Vendor' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { authHeaders } = useAuth()
const { success: showSuccess, error: showError } = useToast()
const API_BASE = 'http://localhost:8000/api/procurement'

const { data: vendorsData } = await useFetch(`${API_BASE}/vendors/`, {
  headers: authHeaders(),
})
const { data: statsData } = await useFetch(`${API_BASE}/vendors/stats/`, {
  headers: authHeaders(),
})

const search = ref('')
const categoryFilter = ref('')
const typeFilter = ref('')
const selectedVendor = ref<any>(null)
const showAddModal = ref(false)
const saving = ref(false)

const vendors = computed(() => vendorsData.value?.results || vendorsData.value || [])
const stats = computed(() => statsData.value || {
  total: 0,
  active: 0,
  inactive: 0,
  suppliers: 0,
  serviceProviders: 0,
})

const filteredVendors = computed(() => {
  return vendors.value.filter((v: any) => {
    const matchesSearch = !search.value ||
      v.name?.toLowerCase().includes(search.value.toLowerCase()) ||
      v.code?.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory = !categoryFilter.value || v.category === categoryFilter.value
    const matchesType = !typeFilter.value || v.vendor_type === typeFilter.value
    return matchesSearch && matchesCategory && matchesType
  })
})

const vendorForm = ref({
  name: '',
  code: '',
  vendor_type: 'supplier',
  category: '',
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  contact_designation: '',
  address_street: '',
  address_city: '',
  address_state: '',
  address_pincode: '',
  address_country: 'India',
  gst_number: '',
  pan_number: '',
  status: 'active'
})

const submitVendor = async () => {
  saving.value = true
  try {
    const { data, error } = await useFetch(`${API_BASE}/vendors/`, {
      method: 'POST',
      headers: authHeaders(),
      body: vendorForm.value
    })

    if (error.value) {
      console.error('Error creating vendor:', error.value)
      showError('Failed to create vendor', 'Please check the form and try again.')
      return
    }

    // Refresh the vendors list
    const { data: refreshedData } = await useFetch(`${API_BASE}/vendors/`, {
      headers: authHeaders(),
    })
    if (refreshedData.value) {
      vendorsData.value = refreshedData.value
    }

    // Reset form and close modal
    vendorForm.value = {
      name: '',
      code: '',
      vendor_type: 'supplier',
      category: '',
      contact_name: '',
      contact_email: '',
      contact_phone: '',
      contact_designation: '',
      address_street: '',
      address_city: '',
      address_state: '',
      address_pincode: '',
      address_country: 'India',
      gst_number: '',
      pan_number: '',
      status: 'active'
    }
    showAddModal.value = false
    showSuccess('Vendor created successfully')
  } catch (err) {
    console.error('Error creating vendor:', err)
    showError('An error occurred', 'Failed to create the vendor.')
  } finally {
    saving.value = false
  }
}
</script>
