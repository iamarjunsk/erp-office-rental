<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <p class="text-muted-foreground">Overview of your property performance</p>
    </div>

    <!-- Quick Overview -->
    <div class="space-y-4">
      <h2 class="text-lg font-semibold">Quick Overview</h2>
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Skeleton Loading -->
        <div v-for="i in 4" :key="i" class="p-6 bg-card border border-border rounded-xl h-32 animate-pulse bg-muted/50"></div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Stat Card 1 -->
        <div class="p-6 bg-card border border-border rounded-xl">
          <div class="flex flex-col items-center justify-center text-center space-y-2">
            <span class="text-4xl font-bold text-blue-600">{{ stats.occupancy_rate }}%</span>
            <span class="text-sm text-muted-foreground">Avg Occupancy</span>
          </div>
        </div>
        
        <!-- Stat Card 2 -->
        <div class="p-6 bg-card border border-border rounded-xl">
          <div class="flex flex-col items-center justify-center text-center space-y-2">
            <span class="text-4xl font-bold text-green-600">{{ stats.collection_rate }}%</span>
            <span class="text-sm text-muted-foreground">Collection Rate</span>
          </div>
        </div>

        <!-- Stat Card 3 -->
        <div class="p-6 bg-card border border-border rounded-xl">
          <div class="flex flex-col items-center justify-center text-center space-y-2">
            <span class="text-4xl font-bold text-amber-600">{{ stats.avg_resolution_time }}</span>
            <span class="text-sm text-muted-foreground">Avg Resolution</span>
          </div>
        </div>

        <!-- Stat Card 4 -->
        <div class="p-6 bg-card border border-border rounded-xl">
          <div class="flex flex-col items-center justify-center text-center space-y-2">
            <span class="text-4xl font-bold text-purple-600">{{ stats.tenant_satisfaction }}</span>
            <span class="text-sm text-muted-foreground">Tenant Satisfaction</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Reports Section -->
    <div class="space-y-4">
      <h2 class="text-lg font-semibold">Reports</h2>
      <p class="text-sm text-muted-foreground">Generate and view business reports</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink to="/admin/reports" class="block p-6 bg-card border border-border rounded-xl hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Icon name="lucide:pie-chart" class="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground" />
          </div>
          <h3 class="font-semibold mb-1">Occupancy Report</h3>
          <p class="text-sm text-muted-foreground">Space utilization and occupancy trends</p>
        </NuxtLink>

        <NuxtLink to="/admin/reports" class="block p-6 bg-card border border-border rounded-xl hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Icon name="lucide:indian-rupee" class="w-6 h-6 text-green-600 dark:text-green-300" />
            </div>
            <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground" />
          </div>
          <h3 class="font-semibold mb-1">Revenue Report</h3>
          <p class="text-sm text-muted-foreground">Monthly revenue and collection analysis</p>
        </NuxtLink>

        <NuxtLink to="/admin/reports" class="block p-6 bg-card border border-border rounded-xl hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Icon name="lucide:file-text" class="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground" />
          </div>
          <h3 class="font-semibold mb-1">Lease Report</h3>
          <p class="text-sm text-muted-foreground">Active leases and expiring contracts</p>
        </NuxtLink>

        <NuxtLink to="/admin/reports" class="block p-6 bg-card border border-border rounded-xl hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <div class="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg">
              <Icon name="lucide:wrench" class="w-6 h-6 text-amber-600 dark:text-amber-300" />
            </div>
            <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground" />
          </div>
          <h3 class="font-semibold mb-1">Maintenance Report</h3>
          <p class="text-sm text-muted-foreground">Ticket trends and resolution times</p>
        </NuxtLink>

        <NuxtLink to="/admin/reports" class="block p-6 bg-card border border-border rounded-xl hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <div class="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <Icon name="lucide:credit-card" class="w-6 h-6 text-red-600 dark:text-red-300" />
            </div>
            <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground" />
          </div>
          <h3 class="font-semibold mb-1">Outstanding Dues</h3>
          <p class="text-sm text-muted-foreground">Overdue invoices and payment status</p>
        </NuxtLink>

        <NuxtLink to="/admin/reports" class="block p-6 bg-card border border-border rounded-xl hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-4">
            <div class="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
              <Icon name="lucide:users" class="w-6 h-6 text-cyan-600 dark:text-cyan-300" />
            </div>
            <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground" />
          </div>
          <h3 class="font-semibold mb-1">Tenant Report</h3>
          <p class="text-sm text-muted-foreground">Company onboarding and activity</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

const { authHeaders } = useAuth()
const API_BASE = 'http://localhost:8000/api/reports'

const { data, pending, error } = await useFetch(`${API_BASE}/dashboard/`, {
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
</script>
