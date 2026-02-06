<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">Procurement</h1>
        <p class="text-muted-foreground">Manage purchase requisitions, orders, and vendors</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-4">
      <div class="p-6 bg-card border border-border rounded-xl">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Icon name="lucide:file-text" class="w-5 h-5 text-blue-600" />
          </div>
          <span class="text-xs text-amber-600 font-medium">{{ prStats.pending_approval }} pending</span>
        </div>
        <div class="text-2xl font-bold">{{ prStats.total }}</div>
        <p class="text-sm text-muted-foreground">Purchase Requisitions</p>
      </div>

      <div class="p-6 bg-card border border-border rounded-xl">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <Icon name="lucide:shopping-cart" class="w-5 h-5 text-green-600" />
          </div>
          <span class="text-xs text-blue-600 font-medium">{{ poStats.sent }} in transit</span>
        </div>
        <div class="text-2xl font-bold">{{ poStats.total }}</div>
        <p class="text-sm text-muted-foreground">Purchase Orders</p>
      </div>

      <div class="p-6 bg-card border border-border rounded-xl">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <Icon name="lucide:users" class="w-5 h-5 text-purple-600" />
          </div>
        </div>
        <div class="text-2xl font-bold">{{ vendorStats.active }}</div>
        <p class="text-sm text-muted-foreground">Active Vendors</p>
      </div>

      <div class="p-6 bg-card border border-border rounded-xl">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
            <Icon name="lucide:indian-rupee" class="w-5 h-5 text-amber-600" />
          </div>
        </div>
        <div class="text-2xl font-bold">₹{{ (poStats.totalValue / 100000).toFixed(1) }}L</div>
        <p class="text-sm text-muted-foreground">Total PO Value</p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid gap-4 md:grid-cols-3">
      <NuxtLink 
        to="/admin/procurement/requisitions" 
        class="p-6 bg-card border border-border rounded-xl hover:shadow-md transition-shadow group"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <Icon name="lucide:file-plus" class="w-6 h-6 text-blue-600" />
          </div>
          <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
        <h3 class="font-semibold mb-1">Purchase Requisitions</h3>
        <p class="text-sm text-muted-foreground">Create and manage procurement requests</p>
      </NuxtLink>

      <NuxtLink 
        to="/admin/procurement/purchase-orders" 
        class="p-6 bg-card border border-border rounded-xl hover:shadow-md transition-shadow group"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
            <Icon name="lucide:shopping-cart" class="w-6 h-6 text-green-600" />
          </div>
          <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
        <h3 class="font-semibold mb-1">Purchase Orders</h3>
        <p class="text-sm text-muted-foreground">Track orders and deliveries</p>
      </NuxtLink>

      <NuxtLink 
        to="/admin/procurement/vendors" 
        class="p-6 bg-card border border-border rounded-xl hover:shadow-md transition-shadow group"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
            <Icon name="lucide:building" class="w-6 h-6 text-purple-600" />
          </div>
          <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
        <h3 class="font-semibold mb-1">Vendor Directory</h3>
        <p class="text-sm text-muted-foreground">Manage supplier relationships</p>
      </NuxtLink>
    </div>

    <!-- Recent Activity -->
    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Pending Approvals -->
      <div class="bg-card border border-border rounded-xl">
        <div class="p-4 border-b border-border flex items-center justify-between">
          <h3 class="font-semibold">Pending Approvals</h3>
          <NuxtLink to="/admin/procurement/requisitions?status=pending_approval" class="text-sm text-primary hover:underline">View all</NuxtLink>
        </div>
        <div class="p-4 space-y-3">
          <div 
            v-for="pr in pendingRequisitions" 
            :key="pr.id"
            class="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <Icon name="lucide:clock" class="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p class="font-medium text-sm">{{ pr.title }}</p>
                <p class="text-xs text-muted-foreground">{{ pr.prNumber }} • ₹{{ pr.totalEstimatedAmount.toLocaleString() }}</p>
              </div>
            </div>
            <NuxtLink 
              :to="`/admin/procurement/requisitions/${pr.id}`"
              class="px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90"
            >
              Review
            </NuxtLink>
          </div>
          <div v-if="pendingRequisitions.length === 0" class="text-center py-4 text-muted-foreground text-sm">
            No pending approvals
          </div>
        </div>
      </div>

      <!-- Recent POs -->
      <div class="bg-card border border-border rounded-xl">
        <div class="p-4 border-b border-border flex items-center justify-between">
          <h3 class="font-semibold">Recent Purchase Orders</h3>
          <NuxtLink to="/admin/procurement/purchase-orders" class="text-sm text-primary hover:underline">View all</NuxtLink>
        </div>
        <div class="p-4 space-y-3">
          <div 
            v-for="po in recentPOs" 
            :key="po.id"
            class="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
          >
            <div class="flex items-center gap-3">
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center"
                :class="getStatusBgColor(po.status)"
              >
                <Icon :name="getStatusIcon(po.status)" class="w-4 h-4" :class="getStatusTextColor(po.status)" />
              </div>
              <div>
                <p class="font-medium text-sm">{{ po.title }}</p>
                <p class="text-xs text-muted-foreground">{{ po.poNumber }} • {{ po.vendor.name }}</p>
              </div>
            </div>
            <span 
              class="px-2 py-1 text-xs rounded-full font-medium"
              :class="getStatusBadgeClass(po.status)"
            >
              {{ formatStatus(po.status) }}
            </span>
          </div>
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

const { data: prData } = await useFetch('/api/procurement/requisitions')
const { data: poData } = await useFetch('/api/procurement/purchase-orders')
const { data: vendorData } = await useFetch('/api/procurement/vendors')

const prStats = computed(() => prData.value?.stats || { total: 0, pending_approval: 0 })
const poStats = computed(() => poData.value?.stats || { total: 0, sent: 0, totalValue: 0 })
const vendorStats = computed(() => vendorData.value?.stats || { active: 0 })

const pendingRequisitions = computed(() => 
  (prData.value?.data || []).filter((pr: any) => pr.status === 'pending_approval').slice(0, 3)
)
const recentPOs = computed(() => (poData.value?.data || []).slice(0, 4))

const getStatusIcon = (status: string) => {
  const icons: Record<string, string> = {
    draft: 'lucide:file-edit',
    sent: 'lucide:send',
    acknowledged: 'lucide:check',
    partially_received: 'lucide:package',
    received: 'lucide:package-check',
  }
  return icons[status] || 'lucide:file'
}

const getStatusBgColor = (status: string) => {
  const colors: Record<string, string> = {
    draft: 'bg-gray-100',
    sent: 'bg-blue-100',
    acknowledged: 'bg-cyan-100',
    partially_received: 'bg-amber-100',
    received: 'bg-green-100',
  }
  return colors[status] || 'bg-gray-100'
}

const getStatusTextColor = (status: string) => {
  const colors: Record<string, string> = {
    draft: 'text-gray-600',
    sent: 'text-blue-600',
    acknowledged: 'text-cyan-600',
    partially_received: 'text-amber-600',
    received: 'text-green-600',
  }
  return colors[status] || 'text-gray-600'
}

const getStatusBadgeClass = (status: string) => {
  const classes: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    sent: 'bg-blue-100 text-blue-700',
    acknowledged: 'bg-cyan-100 text-cyan-700',
    partially_received: 'bg-amber-100 text-amber-700',
    received: 'bg-green-100 text-green-700',
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const formatStatus = (status: string) => {
  return status.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
}
</script>
