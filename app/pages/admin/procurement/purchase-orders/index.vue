<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/procurement" class="p-2 hover:bg-muted rounded-full">
          <Icon name="lucide:arrow-left" class="w-5 h-5" />
        </NuxtLink>
        <div>
          <h1 class="text-3xl font-bold">Purchase Orders</h1>
          <p class="text-muted-foreground">Track orders and deliveries</p>
        </div>
      </div>
      <NuxtLink 
        to="/admin/procurement/purchase-orders/create"
        class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
      >
        <Icon name="lucide:plus" class="w-4 h-4" />
        New PO
      </NuxtLink>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-5 gap-4">
      <div 
        v-for="stat in statusStats" 
        :key="stat.key"
        class="p-4 bg-card border border-border rounded-lg cursor-pointer hover:shadow-sm transition-shadow"
        :class="statusFilter === stat.key ? 'ring-2 ring-primary' : ''"
        @click="statusFilter = statusFilter === stat.key ? '' : stat.key"
      >
        <div class="text-2xl font-bold" :class="stat.color">{{ stat.count }}</div>
        <div class="text-sm text-muted-foreground">{{ stat.label }}</div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-card border border-border rounded-xl overflow-hidden">
      <table class="w-full">
        <thead class="bg-muted/50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">PO Number</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Vendor</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Delivery</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border">
          <tr 
            v-for="po in filteredOrders" 
            :key="po.id"
            class="hover:bg-muted/30 transition-colors"
          >
            <td class="px-6 py-4">
              <NuxtLink 
                :to="`/admin/procurement/purchase-orders/${po.id}`"
                class="font-medium text-primary hover:underline"
              >
                {{ po.poNumber }}
              </NuxtLink>
              <div v-if="po.pr" class="text-xs text-muted-foreground">{{ po.pr.prNumber }}</div>
            </td>
            <td class="px-6 py-4">
              <div class="font-medium">{{ po.title }}</div>
              <div class="text-xs text-muted-foreground">{{ po.items?.length }} items</div>
            </td>
            <td class="px-6 py-4">
              <div class="font-medium">{{ po.vendor?.name }}</div>
              <div class="text-xs text-muted-foreground">{{ po.vendor?.contact }}</div>
            </td>
            <td class="px-6 py-4 font-medium">₹{{ po.totalAmount?.toLocaleString() }}</td>
            <td class="px-6 py-4">
              <div class="text-sm">{{ formatDate(po.deliveryDate) }}</div>
              <div class="text-xs text-muted-foreground">{{ po.deliveryLocation?.split(',')[0] }}</div>
            </td>
            <td class="px-6 py-4">
              <span 
                class="px-2 py-1 text-xs rounded-full font-medium"
                :class="getStatusClass(po.status)"
              >
                {{ formatStatus(po.status) }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <NuxtLink 
                  :to="`/admin/procurement/purchase-orders/${po.id}`"
                  class="p-2 hover:bg-muted rounded-lg"
                  title="View"
                >
                  <Icon name="lucide:eye" class="w-4 h-4" />
                </NuxtLink>
                <button 
                  v-if="['sent', 'acknowledged', 'partially_received'].includes(po.status)"
                  class="p-2 hover:bg-green-100 rounded-lg text-green-600"
                  title="Record Receipt"
                  @click="recordReceipt(po.id)"
                >
                  <Icon name="lucide:package-check" class="w-4 h-4" />
                </button>
                <button 
                  class="p-2 hover:bg-muted rounded-lg"
                  title="Download PDF"
                >
                  <Icon name="lucide:download" class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { data } = await useFetch('/api/procurement/purchase-orders')

const statusFilter = ref('')
const orders = computed(() => data.value?.data || [])
const stats = computed(() => data.value?.stats || {})

const statusStats = computed(() => [
  { key: 'draft', label: 'Draft', count: stats.value.draft || 0, color: 'text-gray-600' },
  { key: 'sent', label: 'Sent', count: stats.value.sent || 0, color: 'text-blue-600' },
  { key: 'acknowledged', label: 'Acknowledged', count: stats.value.acknowledged || 0, color: 'text-cyan-600' },
  { key: 'partially_received', label: 'Partial', count: stats.value.partially_received || 0, color: 'text-amber-600' },
  { key: 'received', label: 'Received', count: stats.value.received || 0, color: 'text-green-600' },
])

const filteredOrders = computed(() => {
  if (!statusFilter.value) return orders.value
  return orders.value.filter((po: any) => po.status === statusFilter.value)
})

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    sent: 'bg-blue-100 text-blue-700',
    acknowledged: 'bg-cyan-100 text-cyan-700',
    partially_received: 'bg-amber-100 text-amber-700',
    received: 'bg-green-100 text-green-700',
    closed: 'bg-purple-100 text-purple-700',
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const formatStatus = (status: string) => status?.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
const formatDate = (date: string) => date ? new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '-'

const recordReceipt = (id: number) => {
  navigateTo(`/admin/procurement/purchase-orders/${id}/receive`)
}
</script>
