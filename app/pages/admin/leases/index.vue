<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold">Leases</h1>
        <p class="text-muted-foreground">Manage lease agreements</p>
      </div>
      <NuxtLink to="/admin/leases/create" class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
        <Icon name="lucide:plus" class="w-4 h-4" />
        New Lease
      </NuxtLink>
    </div>

    <!-- Summary Cards -->
    <div class="grid gap-4 md:grid-cols-4">
      <div class="bg-card border border-border rounded-lg p-4">
        <p class="text-sm text-muted-foreground">Active Leases</p>
        <p class="text-2xl font-bold">{{ stats.active }}</p>
        <p class="text-xs text-green-500">Currently active</p>
      </div>
      <div class="bg-card border border-border rounded-lg p-4">
        <p class="text-sm text-muted-foreground">Expiring Soon</p>
        <p class="text-2xl font-bold">{{ stats.expiring }}</p>
        <p class="text-xs text-amber-500">Within 30 days</p>
      </div>
      <div class="bg-card border border-border rounded-lg p-4">
        <p class="text-sm text-muted-foreground">Monthly Rent</p>
        <p class="text-2xl font-bold">{{ formatCurrency(stats.monthlyRent) }}</p>
        <p class="text-xs text-muted-foreground">Total monthly</p>
      </div>
      <div class="bg-card border border-border rounded-lg p-4">
        <p class="text-sm text-muted-foreground">Security Deposits</p>
        <p class="text-2xl font-bold">{{ formatCurrency(stats.securityDeposits) }}</p>
        <p class="text-xs text-muted-foreground">Held in escrow</p>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search leases..."
          class="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <select v-model="statusFilter" class="px-4 py-2 bg-card border border-border rounded-lg">
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="draft">Draft</option>
        <option value="expired">Expired</option>
        <option value="terminated">Terminated</option>
      </select>
    </div>

    <div class="bg-card border border-border rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-muted">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-medium">Lease #</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Company</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Space</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Type</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Start Date</th>
              <th class="px-4 py-3 text-left text-sm font-medium">End Date</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Rent</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Status</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="lease in leases" :key="lease.id" class="hover:bg-muted/50">
              <td class="px-4 py-3 text-sm font-medium">{{ lease.lease_number }}</td>
              <td class="px-4 py-3 text-sm">{{ lease.company_details?.name }}</td>
              <td class="px-4 py-3 text-sm">{{ lease.space_details?.code }}</td>
              <td class="px-4 py-3 text-sm capitalize">{{ lease.type.replace('_', ' ') }}</td>
              <td class="px-4 py-3 text-sm">{{ formatDate(lease.start_date) }}</td>
              <td class="px-4 py-3 text-sm">{{ formatDate(lease.end_date) }}</td>
              <td class="px-4 py-3 text-sm">{{ formatCurrency(lease.rent_amount) }}</td>
              <td class="px-4 py-3 text-sm">
                <span 
                  class="px-2 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-700': lease.status === 'active',
                    'bg-gray-100 text-gray-700': lease.status === 'draft',
                    'bg-red-100 text-red-700': lease.status === 'expired',
                    'bg-amber-100 text-amber-700': lease.status === 'terminated',
                  }"
                >
                  {{ lease.status }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm">
                <div class="flex items-center gap-2">
                  <button 
                    @click="viewLease(lease)"
                    class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted"
                  >
                    <Icon name="lucide:eye" class="w-4 h-4" />
                  </button>
                  <button 
                    @click="editLease(lease)"
                    class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted"
                  >
                    <Icon name="lucide:pencil" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="leases.length === 0">
              <td colspan="9" class="px-4 py-8 text-center text-muted-foreground">
                No leases found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
const API_BASE = 'http://localhost:8000/api/leases'

const searchQuery = ref('')
const statusFilter = ref('')

// Fetch leases with filters
const { data, pending: loading, refresh } = await useFetch(() => {
  const params = new URLSearchParams()
  if (searchQuery.value) params.append('search', searchQuery.value)
  if (statusFilter.value) params.append('status', statusFilter.value)
  return `${API_BASE}/?${params.toString()}`
}, {
  headers: authHeaders(),
  watch: [statusFilter]
})

const leases = computed(() => data.value || [])

// Calculate stats
const stats = computed(() => {
  const allLeases = leases.value
  const active = allLeases.filter((l: any) => l.status === 'active').length
  
  const today = new Date()
  const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
  const expiring = allLeases.filter((l: any) => {
    const endDate = new Date(l.end_date)
    return l.status === 'active' && endDate <= thirtyDaysFromNow && endDate >= today
  }).length
  
  const monthlyRent = allLeases
    .filter((l: any) => l.status === 'active')
    .reduce((sum: number, l: any) => sum + Number(l.rent_amount), 0)
  
  const securityDeposits = allLeases
    .filter((l: any) => l.status === 'active')
    .reduce((sum: number, l: any) => sum + Number(l.security_deposit), 0)
  
  return { active, expiring, monthlyRent, securityDeposits }
})

// Update search with debounce
watch(searchQuery, debounce(() => {
  refresh()
}, 500))

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const viewLease = (lease: any) => {
  navigateTo(`/admin/leases/${lease.id}`)
}

const editLease = (lease: any) => {
  navigateTo(`/admin/leases/${lease.id}/edit`)
}
</script>
