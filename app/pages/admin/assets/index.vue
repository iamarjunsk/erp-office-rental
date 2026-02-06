<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">Asset Register</h1>
        <p class="text-muted-foreground">Track and manage all facility assets</p>
      </div>
      <div class="flex gap-2">
        <button class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted">
          <Icon name="lucide:download" class="w-4 h-4" />
          Export
        </button>
        <NuxtLink 
          to="/admin/assets/create"
          class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          <Icon name="lucide:plus" class="w-4 h-4" />
          Add Asset
        </NuxtLink>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
      <div class="bg-card border border-border rounded-xl p-4">
        <div class="text-2xl font-bold">{{ stats.total }}</div>
        <div class="text-sm text-muted-foreground">Total Assets</div>
      </div>
      <div 
        class="bg-card border border-border rounded-xl p-4 cursor-pointer hover:shadow-sm"
        :class="statusFilter === 'in_use' ? 'ring-2 ring-primary' : ''"
        @click="toggleStatusFilter('in_use')"
      >
        <div class="text-2xl font-bold text-green-600">{{ stats.in_use }}</div>
        <div class="text-sm text-muted-foreground">In Use</div>
      </div>
      <div 
        class="bg-card border border-border rounded-xl p-4 cursor-pointer hover:shadow-sm"
        :class="statusFilter === 'available' ? 'ring-2 ring-primary' : ''"
        @click="toggleStatusFilter('available')"
      >
        <div class="text-2xl font-bold text-blue-600">{{ stats.available }}</div>
        <div class="text-sm text-muted-foreground">Available</div>
      </div>
      <div 
        class="bg-card border border-border rounded-xl p-4 cursor-pointer hover:shadow-sm"
        :class="statusFilter === 'under_maintenance' ? 'ring-2 ring-primary' : ''"
        @click="toggleStatusFilter('under_maintenance')"
      >
        <div class="text-2xl font-bold text-amber-600">{{ stats.under_maintenance }}</div>
        <div class="text-sm text-muted-foreground">Maintenance</div>
      </div>
      <div class="bg-card border border-border rounded-xl p-4">
        <div class="text-2xl font-bold">₹{{ (stats.totalValue / 100000).toFixed(1) }}L</div>
        <div class="text-sm text-muted-foreground">Total Value</div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-4">
      <div class="flex-1 min-w-[250px]">
        <input 
          v-model="search"
          type="text"
          placeholder="Search by asset number, name, or serial..."
          class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <select 
        v-model="categoryFilter"
        class="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
      </select>
      <select 
        v-model="propertyFilter"
        class="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">All Properties</option>
        <option v-for="prop in properties" :key="prop.id" :value="prop.name">{{ prop.name }}</option>
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
            v-for="asset in filteredAssets" 
            :key="asset.id"
            class="hover:bg-muted/30 transition-colors"
          >
            <td class="px-4 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon :name="getCategoryIcon(asset.category?.code)" class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <NuxtLink 
                    :to="`/admin/assets/${asset.id}`"
                    class="font-medium text-primary hover:underline"
                  >
                    {{ asset.name }}
                  </NuxtLink>
                  <div class="text-xs text-muted-foreground">{{ asset.assetNumber }}</div>
                </div>
              </div>
            </td>
            <td class="px-4 py-4">
              <div class="text-sm">{{ asset.category?.name }}</div>
              <div class="text-xs text-muted-foreground">{{ asset.subcategory }}</div>
            </td>
            <td class="px-4 py-4">
              <div class="text-sm">{{ asset.property?.name }}</div>
              <div class="text-xs text-muted-foreground">{{ asset.location }}</div>
            </td>
            <td class="px-4 py-4">
              <div v-if="asset.assignedTo" class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                  {{ asset.assignedTo.firstName?.[0] }}{{ asset.assignedTo.lastName?.[0] }}
                </div>
                <div>
                  <div class="text-sm">{{ asset.assignedTo.firstName }} {{ asset.assignedTo.lastName }}</div>
                  <div class="text-xs text-muted-foreground">{{ asset.assignedTo.department }}</div>
                </div>
              </div>
              <span v-else class="text-sm text-muted-foreground">Unassigned</span>
            </td>
            <td class="px-4 py-4">
              <div class="text-sm font-medium">₹{{ asset.currentValue?.toLocaleString() }}</div>
              <div class="text-xs text-muted-foreground">Cost: ₹{{ asset.purchasePrice?.toLocaleString() }}</div>
            </td>
            <td class="px-4 py-4">
              <span 
                class="px-2 py-1 text-xs rounded-full font-medium"
                :class="getStatusClass(asset.status)"
              >
                {{ formatStatus(asset.status) }}
              </span>
            </td>
            <td class="px-4 py-4 text-right">
              <div class="flex items-center justify-end gap-1">
                <NuxtLink 
                  :to="`/admin/assets/${asset.id}`"
                  class="p-2 hover:bg-muted rounded-lg"
                  title="View Details"
                >
                  <Icon name="lucide:eye" class="w-4 h-4" />
                </NuxtLink>
                <button 
                  class="p-2 hover:bg-muted rounded-lg"
                  title="QR Code"
                >
                  <Icon name="lucide:qr-code" class="w-4 h-4" />
                </button>
                <button 
                  class="p-2 hover:bg-muted rounded-lg"
                  title="Transfer"
                >
                  <Icon name="lucide:arrow-right-left" class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Category Summary -->
    <div class="grid md:grid-cols-4 gap-4">
      <div 
        v-for="cat in stats.byCategory" 
        :key="cat.name"
        class="bg-card border border-border rounded-xl p-4 cursor-pointer hover:shadow-sm"
        :class="categoryFilter === cat.name ? 'ring-2 ring-primary' : ''"
        @click="categoryFilter = categoryFilter === cat.name ? '' : cat.name"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Icon :name="getCategoryIconByName(cat.name)" class="w-5 h-5 text-muted-foreground" />
            <span class="font-medium">{{ cat.name }}</span>
          </div>
          <span class="text-lg font-bold">{{ cat.count }}</span>
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

const { data } = await useFetch('/api/assets')
const { data: categoryData } = await useFetch('/api/assets/categories')
const { data: propertyData } = await useFetch('/api/properties')

const search = ref('')
const statusFilter = ref('')
const categoryFilter = ref('')
const propertyFilter = ref('')

const assets = computed(() => data.value?.data || [])
const stats = computed(() => data.value?.stats || { total: 0, in_use: 0, available: 0, under_maintenance: 0, totalValue: 0, byCategory: [] })
const categories = computed(() => categoryData.value?.data || [])
const properties = computed(() => propertyData.value?.data || [])

const toggleStatusFilter = (status: string) => {
  statusFilter.value = statusFilter.value === status ? '' : status
}

const filteredAssets = computed(() => {
  return assets.value.filter((asset: any) => {
    const matchesSearch = !search.value || 
      asset.assetNumber?.toLowerCase().includes(search.value.toLowerCase()) ||
      asset.name?.toLowerCase().includes(search.value.toLowerCase()) ||
      asset.serialNumber?.toLowerCase().includes(search.value.toLowerCase())
    const matchesStatus = !statusFilter.value || asset.status === statusFilter.value
    const matchesCategory = !categoryFilter.value || asset.category?.name === categoryFilter.value
    const matchesProperty = !propertyFilter.value || asset.property?.name === propertyFilter.value
    return matchesSearch && matchesStatus && matchesCategory && matchesProperty
  })
})

const getCategoryIcon = (code: string) => {
  const icons: Record<string, string> = {
    IT: 'lucide:laptop',
    FUR: 'lucide:armchair',
    HVAC: 'lucide:wind',
    SEC: 'lucide:shield',
    ELE: 'lucide:zap',
    VEH: 'lucide:car',
  }
  return icons[code] || 'lucide:package'
}

const getCategoryIconByName = (name: string) => {
  const icons: Record<string, string> = {
    'IT Equipment': 'lucide:laptop',
    'Furniture': 'lucide:armchair',
    'HVAC': 'lucide:wind',
    'Security': 'lucide:shield',
  }
  return icons[name] || 'lucide:package'
}

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    in_use: 'bg-green-100 text-green-700',
    available: 'bg-blue-100 text-blue-700',
    under_maintenance: 'bg-amber-100 text-amber-700',
    disposed: 'bg-gray-100 text-gray-700',
    lost: 'bg-red-100 text-red-700',
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const formatStatus = (status: string) => status?.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
</script>
