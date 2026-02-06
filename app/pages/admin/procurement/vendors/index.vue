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
      <button class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
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
        <div class="text-2xl font-bold">{{ stats.serviceProviders }}</div>
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
              <Icon :name="vendor.type === 'service_provider' ? 'lucide:briefcase' : 'lucide:building-2'" class="w-6 h-6 text-primary" />
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
            {{ vendor.totalOrders }} orders • ₹{{ (vendor.totalValue / 100000).toFixed(1) }}L
          </div>
        </div>
      </div>
    </div>

    <!-- Vendor Detail Modal -->
    <div 
      v-if="selectedVendor"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="selectedVendor = null"
    >
      <div class="bg-card rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <div class="p-6 border-b border-border flex items-start justify-between">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon :name="selectedVendor.type === 'service_provider' ? 'lucide:briefcase' : 'lucide:building-2'" class="w-7 h-7 text-primary" />
            </div>
            <div>
              <div class="text-xl font-bold">{{ selectedVendor.name }}</div>
              <div class="text-sm text-muted-foreground">{{ selectedVendor.code }} • {{ selectedVendor.type === 'service_provider' ? 'Service Provider' : 'Supplier' }}</div>
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
                <div class="font-mono">{{ selectedVendor.gstNumber }}</div>
              </div>
              <div>
                <div class="text-muted-foreground">PAN Number</div>
                <div class="font-mono">{{ selectedVendor.panNumber }}</div>
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
                <div class="text-2xl font-bold">{{ selectedVendor.totalOrders }}</div>
                <div class="text-xs text-muted-foreground">Total Orders</div>
              </div>
              <div class="bg-muted/50 p-4 rounded-lg text-center">
                <div class="text-2xl font-bold">₹{{ (selectedVendor.totalValue / 100000).toFixed(1) }}L</div>
                <div class="text-xs text-muted-foreground">Total Value</div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 border-t border-border flex justify-end gap-3">
          <button class="px-4 py-2 border border-border rounded-lg hover:bg-muted">
            Edit Vendor
          </button>
          <button class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            Create PO
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

const { data } = await useFetch('/api/procurement/vendors')

const search = ref('')
const categoryFilter = ref('')
const typeFilter = ref('')
const selectedVendor = ref<any>(null)

const vendors = computed(() => data.value?.data || [])
const stats = computed(() => data.value?.stats || {})

const filteredVendors = computed(() => {
  return vendors.value.filter((v: any) => {
    const matchesSearch = !search.value || 
      v.name.toLowerCase().includes(search.value.toLowerCase()) ||
      v.code.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory = !categoryFilter.value || v.category === categoryFilter.value
    const matchesType = !typeFilter.value || v.type === typeFilter.value
    return matchesSearch && matchesCategory && matchesType
  })
})
</script>
