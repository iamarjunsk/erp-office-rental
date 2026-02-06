<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold">Leases</h1>
        <p class="text-muted-foreground">Manage lease agreements</p>
      </div>
      <button class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
        <Icon name="lucide:plus" class="w-4 h-4" />
        New Lease
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="grid gap-4 md:grid-cols-4">
      <div class="bg-card border border-border rounded-lg p-4">
        <p class="text-sm text-muted-foreground">Active Leases</p>
        <p class="text-2xl font-bold">28</p>
        <p class="text-xs text-green-500">+3 this month</p>
      </div>
      <div class="bg-card border border-border rounded-lg p-4">
        <p class="text-sm text-muted-foreground">Expiring Soon</p>
        <p class="text-2xl font-bold">5</p>
        <p class="text-xs text-amber-500">Within 30 days</p>
      </div>
      <div class="bg-card border border-border rounded-lg p-4">
        <p class="text-sm text-muted-foreground">Monthly Rent</p>
        <p class="text-2xl font-bold">₹12,50,000</p>
        <p class="text-xs text-green-500">+5% from last month</p>
      </div>
      <div class="bg-card border border-border rounded-lg p-4">
        <p class="text-sm text-muted-foreground">Security Deposits</p>
        <p class="text-2xl font-bold">₹45,00,000</p>
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
              <td class="px-4 py-3 text-sm font-medium">{{ lease.leaseNumber }}</td>
              <td class="px-4 py-3 text-sm">{{ lease.company?.name }}</td>
              <td class="px-4 py-3 text-sm">{{ lease.space?.code }}</td>
              <td class="px-4 py-3 text-sm capitalize">{{ lease.type.replace('_', ' ') }}</td>
              <td class="px-4 py-3 text-sm">{{ formatDate(lease.startDate) }}</td>
              <td class="px-4 py-3 text-sm">{{ formatDate(lease.endDate) }}</td>
              <td class="px-4 py-3 text-sm">{{ formatCurrency(lease.rentAmount) }}</td>
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
                  <button class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">
                    <Icon name="lucide:eye" class="w-4 h-4" />
                  </button>
                  <button class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">
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
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

// Mock data for leases
const leases = ref([
  {
    id: 1,
    leaseNumber: 'LSE-2024-001',
    company: { name: 'Tech Solutions Pvt Ltd' },
    space: { code: 'FL-01-101' },
    type: 'lease',
    startDate: '2024-01-01',
    endDate: '2026-12-31',
    rentAmount: 50000,
    status: 'active',
  },
  {
    id: 2,
    leaseNumber: 'LSE-2024-002',
    company: { name: 'Innovate Labs' },
    space: { code: 'FL-02-201' },
    type: 'license',
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    rentAmount: 150000,
    status: 'active',
  },
  {
    id: 3,
    leaseNumber: 'LSE-2024-003',
    company: { name: 'Digital Marketing Co' },
    space: { code: 'FL-01-102' },
    type: 'coworking_membership',
    startDate: '2024-06-01',
    endDate: '2025-05-31',
    rentAmount: 20000,
    status: 'active',
  },
])

const searchQuery = ref('')
const statusFilter = ref('')

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
</script>