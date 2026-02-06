<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold">Billing & Invoices</h1>
        <p class="text-muted-foreground">Manage invoices and payments</p>
      </div>
      <div class="flex gap-2">
        <button class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted">
          <Icon name="lucide:download" class="w-4 h-4" />
          Export
        </button>
        <button class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
          <Icon name="lucide:plus" class="w-4 h-4" />
          Create Invoice
        </button>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid gap-4 md:grid-cols-4">
      <div class="bg-card border border-border rounded-lg p-4">
        <p class="text-sm text-muted-foreground">Total Invoiced</p>
        <p class="text-2xl font-bold">₹24,50,000</p>
        <p class="text-xs text-green-500">+12% from last month</p>
      </div>
      <div class="bg-card border border-border rounded-lg p-4">
        <p class="text-sm text-muted-foreground">Total Paid</p>
        <p class="text-2xl font-bold">₹21,80,000</p>
        <p class="text-xs text-green-500">+8% from last month</p>
      </div>
      <div class="bg-card border border-border rounded-lg p-4">
        <p class="text-sm text-muted-foreground">Outstanding</p>
        <p class="text-2xl font-bold">₹2,70,000</p>
        <p class="text-xs text-red-500">5 invoices overdue</p>
      </div>
      <div class="bg-card border border-border rounded-lg p-4">
        <p class="text-sm text-muted-foreground">This Month</p>
        <p class="text-2xl font-bold">₹4,25,000</p>
        <p class="text-xs text-muted-foreground">12 invoices generated</p>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search invoices..."
          class="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <select v-model="statusFilter" class="px-4 py-2 bg-card border border-border rounded-lg">
        <option value="">All Status</option>
        <option value="draft">Draft</option>
        <option value="sent">Sent</option>
        <option value="paid">Paid</option>
        <option value="overdue">Overdue</option>
        <option value="partial">Partial</option>
      </select>
    </div>

    <div class="bg-card border border-border rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-muted">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-medium">Invoice #</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Company</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Period</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Due Date</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Amount</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Status</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="invoice in invoices" :key="invoice.id" class="hover:bg-muted/50">
              <td class="px-4 py-3 text-sm font-medium">{{ invoice.invoiceNumber }}</td>
              <td class="px-4 py-3 text-sm">{{ invoice.company?.name }}</td>
              <td class="px-4 py-3 text-sm">
                {{ formatDate(invoice.periodStart) }} - {{ formatDate(invoice.periodEnd) }}
              </td>
              <td class="px-4 py-3 text-sm">{{ formatDate(invoice.dueDate) }}</td>
              <td class="px-4 py-3 text-sm font-medium">{{ formatCurrency(invoice.totalAmount) }}</td>
              <td class="px-4 py-3 text-sm">
                <span 
                  class="px-2 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-gray-100 text-gray-700': invoice.status === 'draft',
                    'bg-blue-100 text-blue-700': invoice.status === 'sent',
                    'bg-green-100 text-green-700': invoice.status === 'paid',
                    'bg-red-100 text-red-700': invoice.status === 'overdue',
                    'bg-amber-100 text-amber-700': invoice.status === 'partial',
                  }"
                >
                  {{ invoice.status }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm">
                <div class="flex items-center gap-2">
                  <button class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">
                    <Icon name="lucide:eye" class="w-4 h-4" />
                  </button>
                  <button class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">
                    <Icon name="lucide:download" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="invoices.length === 0">
              <td colspan="7" class="px-4 py-8 text-center text-muted-foreground">
                No invoices found
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

const { data } = await useFetch('/api/invoices')
const invoices = computed(() => data.value?.data || [])

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