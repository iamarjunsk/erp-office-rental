<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">Asset Register</h1>
        <p class="text-muted-foreground">Track and manage all facility assets</p>
      </div>
      <div class="flex gap-2">
        <button 
          @click="exportAssets"
          class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-all duration-200 hover:scale-105 group"
        >
          <Icon name="lucide:download" class="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          <span class="group-hover:font-medium">Export</span>
        </button>
        <NuxtLink 
          to="/admin/assets/create"
          class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 hover:shadow-md group"
        >
          <Icon name="lucide:plus" class="w-4 h-4 transition-transform group-hover:scale-110" />
          <span class="group-hover:font-medium">Add Asset</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-card border border-border rounded-xl p-4">
        <div class="text-2xl font-bold">{{ stats.total }}</div>
        <div class="text-sm text-muted-foreground">Total Assets</div>
      </div>
      <div class="bg-card border border-border rounded-xl p-4">
        <div class="text-2xl font-bold text-green-600">{{ stats.active }}</div>
        <div class="text-sm text-muted-foreground">Active</div>
      </div>
      <div class="bg-card border border-border rounded-xl p-4">
        <div class="text-2xl font-bold text-amber-600">{{ stats.inMaintenance }}</div>
        <div class="text-sm text-muted-foreground">In Maintenance</div>
      </div>
      <div class="bg-card border border-border rounded-xl p-4">
        <div class="text-2xl font-bold">{{ formatCurrency(stats.totalValue) }}</div>
        <div class="text-sm text-muted-foreground">Total Value</div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-4">
      <div class="flex-1 min-w-[250px] relative">
        <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="Search by asset code, name, or serial..."
          class="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <select 
        v-model="statusFilter"
        class="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="in_maintenance">In Maintenance</option>
        <option value="damaged">Damaged</option>
        <option value="disposed">Disposed</option>
        <option value="lost">Lost</option>
      </select>
      <select 
        v-model="categoryFilter"
        class="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>
      <select 
        v-model="conditionFilter"
        class="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">All Conditions</option>
        <option value="excellent">Excellent</option>
        <option value="good">Good</option>
        <option value="fair">Fair</option>
        <option value="poor">Poor</option>
      </select>
    </div>

    <!-- Table -->
    <div class="bg-card border border-border rounded-xl overflow-hidden">
      <table class="w-full">
        <thead class="bg-muted/50">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Asset</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Location</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Assigned To</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Value</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
            <th class="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border">
          <tr 
            v-for="asset in assets" 
            :key="asset.id"
            class="hover:bg-muted/30 transition-colors"
          >
            <td class="px-4 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="lucide:package" class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <NuxtLink 
                    :to="`/admin/assets/${asset.id}`"
                    class="font-medium text-primary hover:underline"
                  >
                    {{ asset.name }}
                  </NuxtLink>
                  <div class="text-xs text-muted-foreground">{{ asset.asset_code }}</div>
                </div>
              </div>
            </td>
            <td class="px-4 py-4">
              <div class="text-sm">{{ asset.category_details?.name || 'Uncategorized' }}</div>
            </td>
            <td class="px-4 py-4">
              <div class="text-sm">{{ asset.property_details?.name }}</div>
              <div class="text-xs text-muted-foreground">{{ asset.space_details?.code }}</div>
            </td>
            <td class="px-4 py-4">
              <div v-if="asset.assigned_to_details" class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                  {{ asset.assigned_to_details.first_name?.[0] }}{{ asset.assigned_to_details.last_name?.[0] }}
                </div>
                <div>
                  <div class="text-sm">{{ asset.assigned_to_details.first_name }} {{ asset.assigned_to_details.last_name }}</div>
                </div>
              </div>
              <span v-else class="text-sm text-muted-foreground">Unassigned</span>
            </td>
            <td class="px-4 py-4">
              <div class="text-sm font-medium">{{ formatCurrency(asset.purchase_price) }}</div>
              <div class="text-xs text-muted-foreground" v-if="asset.purchase_date">{{ formatDate(asset.purchase_date) }}</div>
            </td>
            <td class="px-4 py-4">
              <span 
                class="px-2 py-1 text-xs rounded-full font-medium capitalize"
                :class="getStatusClass(asset.status)"
              >
                {{ asset.status.replace('_', ' ') }}
              </span>
            </td>
            <td class="px-4 py-4 text-right">
              <div class="flex items-center justify-end gap-1">
                <NuxtLink 
                  :to="`/admin/assets/${asset.id}`"
                  class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-all duration-200 hover:scale-110 group"
                  title="View Details"
                >
                  <Icon name="lucide:eye" class="w-4 h-4 transition-transform group-hover:scale-110" />
                </NuxtLink>
                <NuxtLink 
                  :to="`/admin/assets/${asset.id}/edit`"
                  class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-all duration-200 hover:scale-110 group"
                  title="Edit"
                >
                  <Icon name="lucide:pencil" class="w-4 h-4 transition-transform group-hover:rotate-12" />
                </NuxtLink>
              </div>
            </td>
          </tr>
          <tr v-if="assets.length === 0">
            <td colspan="7" class="px-4 py-8 text-center text-muted-foreground">
              No assets found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const debounce = (fn: Function, delay: number) => {
  let timeoutId: any
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { authHeaders } = useAuth()
const { info } = useToast()
const API_BASE = 'http://localhost:8000/api/assets'

const searchQuery = ref('')
const statusFilter = ref('')
const categoryFilter = ref('')
const conditionFilter = ref('')

// Fetch stats
const { data: statsData } = await useFetch(`${API_BASE}/assets/stats/`, {
  headers: authHeaders()
})

const stats = computed(() => statsData.value || {
  total: 0,
  active: 0,
  inMaintenance: 0,
  disposed: 0,
  totalValue: 0,
  underWarranty: 0,
  warrantyExpired: 0,
  maintenanceDue: 0
})

// Fetch categories
const { data: categories } = await useFetch(`${API_BASE}/categories/`, {
  headers: authHeaders()
})

// Fetch assets
const { data, refresh } = await useFetch(() => {
  const params = new URLSearchParams()
  if (searchQuery.value) params.append('search', searchQuery.value)
  if (statusFilter.value) params.append('status', statusFilter.value)
  if (categoryFilter.value) params.append('category', categoryFilter.value)
  if (conditionFilter.value) params.append('condition', conditionFilter.value)
  return `${API_BASE}/assets/?${params.toString()}`
}, {
  headers: authHeaders(),
  watch: [statusFilter, categoryFilter, conditionFilter]
})

const assets = computed(() => data.value || [])

// Update search with debounce
watch(searchQuery, debounce(() => {
  refresh()
}, 500))

const formatCurrency = (value: number) => {
  if (!value) return 'N/A'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

const formatDate = (date: string | Date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    in_maintenance: 'bg-amber-100 text-amber-700',
    damaged: 'bg-red-100 text-red-700',
    disposed: 'bg-gray-100 text-gray-700',
    lost: 'bg-red-100 text-red-700',
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const exportAssets = () => {
  info('Export functionality coming soon!')
}
</script>
