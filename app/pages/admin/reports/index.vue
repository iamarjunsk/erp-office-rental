<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold">Reports</h1>
        <p class="text-muted-foreground">Generate and view business reports</p>
      </div>
      <button
        @click="exportReports"
        class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted"
      >
        <Icon name="lucide:download" class="w-4 h-4" />
        Export All
      </button>
    </div>

    <!-- Report Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div class="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer">
        <div class="flex items-start justify-between">
          <div>
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <Icon name="lucide:bar-chart-3" class="w-6 h-6 text-blue-600" />
            </div>
            <h3 class="text-lg font-semibold">Occupancy Report</h3>
            <p class="text-sm text-muted-foreground mt-1">
              {{ stats.occupancy_rate }}% Occupancy Rate
            </p>
          </div>
          <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      <div class="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer">
        <div class="flex items-start justify-between">
          <div>
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <Icon name="lucide:indian-rupee" class="w-6 h-6 text-green-600" />
            </div>
            <h3 class="text-lg font-semibold">Revenue Report</h3>
            <p class="text-sm text-muted-foreground mt-1">
              {{ formatCurrency(stats.total_revenue) }} Total Revenue
            </p>
          </div>
          <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      <div class="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer">
        <div class="flex items-start justify-between">
          <div>
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <Icon name="lucide:file-text" class="w-6 h-6 text-purple-600" />
            </div>
            <h3 class="text-lg font-semibold">Lease Report</h3>
            <p class="text-sm text-muted-foreground mt-1">
              {{ stats.active_leases }} Active, {{ stats.expiring_leases }} Expiring Soon
            </p>
          </div>
          <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      <div class="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer">
        <div class="flex items-start justify-between">
          <div>
            <div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-4">
              <Icon name="lucide:wrench" class="w-6 h-6 text-amber-600" />
            </div>
            <h3 class="text-lg font-semibold">Maintenance Report</h3>
            <p class="text-sm text-muted-foreground mt-1">
              {{ stats.completed_tickets }} / {{ stats.total_tickets }} Tickets Resolved
            </p>
          </div>
          <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      <div class="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer">
        <div class="flex items-start justify-between">
          <div>
            <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
              <Icon name="lucide:credit-card" class="w-6 h-6 text-red-600" />
            </div>
            <h3 class="text-lg font-semibold">Outstanding Dues</h3>
            <p class="text-sm text-muted-foreground mt-1">
              {{ formatCurrency(stats.outstanding_dues) }} Pending
            </p>
          </div>
          <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      <div class="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer">
        <div class="flex items-start justify-between">
          <div>
            <div class="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mb-4">
              <Icon name="lucide:users" class="w-6 h-6 text-cyan-600" />
            </div>
            <h3 class="text-lg font-semibold">Tenant Report</h3>
            <p class="text-sm text-muted-foreground mt-1">
              {{ stats.total_tenants }} Active Tenants
            </p>
          </div>
          <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="bg-card border border-border rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-4">Quick Overview</h3>
      <div class="grid gap-4 md:grid-cols-4">
        <div class="text-center p-4 bg-muted rounded-lg">
          <p class="text-3xl font-bold text-blue-600">{{ stats.occupancy_rate }}%</p>
          <p class="text-sm text-muted-foreground">Avg Occupancy</p>
        </div>
        <div class="text-center p-4 bg-muted rounded-lg">
          <p class="text-3xl font-bold text-green-600">{{ stats.collection_rate }}%</p>
          <p class="text-sm text-muted-foreground">Collection Rate</p>
        </div>
        <div class="text-center p-4 bg-muted rounded-lg">
          <p class="text-3xl font-bold text-amber-600">{{ stats.avg_resolution_time }}</p>
          <p class="text-sm text-muted-foreground">Avg Resolution</p>
        </div>
        <div class="text-center p-4 bg-muted rounded-lg">
          <p class="text-3xl font-bold text-purple-600">{{ stats.tenant_satisfaction }}</p>
          <p class="text-sm text-muted-foreground">Tenant Satisfaction</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { toast } = useToast()
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { authHeaders } = useAuth()
const API_BASE = 'http://localhost:8000/api/reports'

const { data } = await useFetch(`${API_BASE}/dashboard/`, {
  headers: authHeaders(),
  server: false
})

const stats = computed(() => data.value || {
  occupancy_rate: 0,
  collection_rate: 0,
  avg_resolution_time: '-',
  tenant_satisfaction: 0,
  total_revenue: 0,
  outstanding_dues: 0,
  active_leases: 0,
  expiring_leases: 0,
  total_tickets: 0,
  completed_tickets: 0,
  total_tenants: 0
})

const formatCurrency = (value: number) => {
  if (value === undefined || value === null) return '₹0'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

const exportReports = async () => {
  try {
    const response = await $fetch(`${API_BASE}/export/`, {
      headers: authHeaders(),
      responseType: 'blob'
    })

    // Create blob link to download
    const url = window.URL.createObjectURL(new Blob([response]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `dashboard_report_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()

    // Cleanup
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (e: any) {
    toast({ title: 'Error', description: String('Failed to export report: ' + (e.message || 'Unknown error')), variant: 'destructive' })
  }
}
</script>
