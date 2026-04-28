<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold">Billing & Invoices</h1>
        <p class="text-muted-foreground">Manage invoices and payments</p>
      </div>
      <div class="flex gap-2">
        <button 
          @click="exportInvoices"
          class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted"
        >
          <Icon name="lucide:download" class="w-4 h-4" />
          Export
        </button>
        <NuxtLink 
          to="/admin/billing/create"
          class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          <Icon name="lucide:plus" class="w-4 h-4" />
          Create Invoice
        </NuxtLink>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid gap-4 md:grid-cols-4">
      <div class="bg-card border border-border rounded-lg p-4">
        <p class="text-sm text-muted-foreground">Total Invoiced</p>
        <p class="text-2xl font-bold">{{ formatCurrency(stats.totalInvoiced) }}</p>
        <p class="text-xs text-muted-foreground">All time</p>
      </div>
      <div class="bg-card border border-border rounded-lg p-4">
        <p class="text-sm text-muted-foreground">Total Paid</p>
        <p class="text-2xl font-bold">{{ formatCurrency(stats.totalPaid) }}</p>
        <p class="text-xs text-green-500">{{ formatCurrency(stats.totalPaid / stats.totalInvoiced * 100) }}% collection</p>
      </div>
      <div class="bg-card border border-border rounded-lg p-4">
        <p class="text-sm text-muted-foreground">Outstanding</p>
        <p class="text-2xl font-bold">{{ formatCurrency(stats.outstanding) }}</p>
        <p class="text-xs" :class="stats.overdueCount > 0 ? 'text-red-500' : 'text-muted-foreground'">
          {{ stats.overdueCount }} overdue
        </p>
      </div>
      <div class="bg-card border border-border rounded-lg p-4">
        <p class="text-sm text-muted-foreground">This Month</p>
        <p class="text-2xl font-bold">{{ formatCurrency(stats.thisMonth) }}</p>
        <p class="text-xs text-muted-foreground">{{ stats.thisMonthCount }} invoices</p>
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
        <option value="cancelled">Cancelled</option>
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
              <th class="px-4 py-3 text-left text-sm font-medium">Balance</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Status</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="invoice in invoices" :key="invoice.id" class="hover:bg-muted/50">
              <td class="px-4 py-3 text-sm font-medium">{{ invoice.invoice_number }}</td>
              <td class="px-4 py-3 text-sm">{{ invoice.company_details?.name }}</td>
              <td class="px-4 py-3 text-sm">
                {{ formatDate(invoice.period_start) }} - {{ formatDate(invoice.period_end) }}
              </td>
              <td class="px-4 py-3 text-sm" :class="{ 'text-red-500': isOverdue(invoice) }">
                {{ formatDate(invoice.due_date) }}
              </td>
              <td class="px-4 py-3 text-sm font-medium">{{ formatCurrency(invoice.total_amount) }}</td>
              <td class="px-4 py-3 text-sm">{{ formatCurrency(invoice.balance_due) }}</td>
              <td class="px-4 py-3 text-sm">
                <span 
                  class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-gray-100 text-gray-700': invoice.status === 'draft',
                    'bg-blue-100 text-blue-700': invoice.status === 'sent',
                    'bg-green-100 text-green-700': invoice.status === 'paid',
                    'bg-red-100 text-red-700': invoice.status === 'overdue',
                    'bg-amber-100 text-amber-700': invoice.status === 'partial',
                    'bg-slate-100 text-slate-700': invoice.status === 'cancelled',
                  }"
                >
                  {{ invoice.status }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm">
                <div class="flex items-center gap-2">
                  <button 
                    @click="viewInvoice(invoice)"
                    class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-all duration-200 hover:scale-110 group"
                    title="View"
                  >
                    <Icon name="lucide:eye" class="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                  </button>
                  <button 
                    @click="downloadInvoice(invoice)"
                    :disabled="downloadingId === invoice.id"
                    class="p-2 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 group"
                    title="Download PDF"
                  >
                    <Icon 
                      :name="downloadingId === invoice.id ? 'lucide:loader-2' : 'lucide:download'" 
                      class="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" 
                      :class="{ 'animate-spin': downloadingId === invoice.id }" 
                    />
                  </button>
                  <button 
                    @click="recordPayment(invoice)"
                    v-if="invoice.balance_due > 0"
                    class="p-2 text-green-600 hover:text-green-700 rounded-lg hover:bg-green-50 transition-all duration-200 hover:scale-110 group"
                    title="Record Payment"
                  >
                    <Icon name="lucide:banknote" class="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="invoices.length === 0">
              <td colspan="8" class="px-4 py-8 text-center text-muted-foreground">
                No invoices found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Record Payment Modal -->
    <div v-if="showPaymentModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-background rounded-lg p-6 w-full max-w-md mx-4">
        <h2 class="text-xl font-bold mb-4">Record Payment</h2>
        <form @submit.prevent="submitPayment" class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Invoice</label>
            <p class="text-lg font-semibold">{{ selectedInvoice?.invoice_number }}</p>
            <p class="text-sm text-muted-foreground">Balance Due: {{ formatCurrency(selectedInvoice?.balance_due) }}</p>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Amount *</label>
            <input
              v-model.number="paymentForm.amount"
              type="number"
              step="0.01"
              :max="selectedInvoice?.balance_due"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Payment Date *</label>
            <input
              v-model="paymentForm.payment_date"
              type="date"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Payment Method *</label>
            <select
              v-model="paymentForm.payment_method"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="upi">UPI</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="netbanking">Net Banking</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Transaction ID</label>
            <input
              v-model="paymentForm.transaction_id"
              type="text"
              placeholder="Optional reference number"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Notes</label>
            <textarea
              v-model="paymentForm.notes"
              rows="2"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="flex items-center gap-4 pt-4">
            <button 
              type="button"
              @click="showPaymentModal = false"
              class="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="submittingPayment"
              class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {{ submittingPayment ? 'Recording...' : 'Record Payment' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { toast } = useToast()
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
const API_BASE = 'http://localhost:8000/api/billing'

const searchQuery = ref('')
const statusFilter = ref('')
const showPaymentModal = ref(false)
const selectedInvoice = ref<any>(null)
const submittingPayment = ref(false)
const downloadingId = ref<number | null>(null)

const paymentForm = ref({
  amount: 0,
  payment_date: new Date().toISOString().split('T')[0],
  payment_method: 'bank_transfer',
  transaction_id: '',
  notes: '',
  status: 'completed'
})

// Fetch invoices
const { data, pending: loading, refresh } = await useFetch(() => {
  const params = new URLSearchParams()
  if (searchQuery.value) params.append('search', searchQuery.value)
  if (statusFilter.value) params.append('status', statusFilter.value)
  return `${API_BASE}/invoices/?${params.toString()}`
}, {
  headers: authHeaders(),
  watch: [statusFilter]
})

const invoices = computed(() => data.value || [])

// Calculate stats
const stats = computed(() => {
  const allInvoices = invoices.value
  const totalInvoiced = allInvoices.reduce((sum: number, inv: any) => sum + Number(inv.total_amount), 0)
  const totalPaid = allInvoices.reduce((sum: number, inv: any) => sum + Number(inv.amount_paid), 0)
  const outstanding = allInvoices.reduce((sum: number, inv: any) => sum + Number(inv.balance_due), 0)
  
  const today = new Date()
  const overdueCount = allInvoices.filter((inv: any) => {
    const dueDate = new Date(inv.due_date)
    return inv.balance_due > 0 && dueDate < today
  }).length
  
  const thisMonthInvoices = allInvoices.filter((inv: any) => {
    const invDate = new Date(inv.invoice_date)
    return invDate.getMonth() === today.getMonth() && invDate.getFullYear() === today.getFullYear()
  })
  const thisMonth = thisMonthInvoices.reduce((sum: number, inv: any) => sum + Number(inv.total_amount), 0)
  
  return {
    totalInvoiced,
    totalPaid,
    outstanding,
    overdueCount,
    thisMonth,
    thisMonthCount: thisMonthInvoices.length
  }
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
  }).format(value || 0)
}

const formatDate = (date: string | Date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const isOverdue = (invoice: any) => {
  if (invoice.balance_due <= 0) return false
  const dueDate = new Date(invoice.due_date)
  return dueDate < new Date()
}

const viewInvoice = (invoice: any) => {
  navigateTo(`/admin/billing/${invoice.id}`)
}

const downloadInvoice = async (invoice: any) => {
  downloadingId.value = invoice.id
  try {
    const response = await $fetch(`${API_BASE}/invoices/${invoice.id}/download/`, {
      headers: authHeaders(),
      responseType: 'blob'
    })
    
    // Create blob link to download
    const url = window.URL.createObjectURL(new Blob([response]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${invoice.invoice_number || 'invoice'}.pdf`)
    document.body.appendChild(link)
    link.click()
    
    // Cleanup
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (e: any) {
    toast({ title: 'Error', description: String('Failed to download invoice: ' + (e.message || 'Unknown error')), variant: 'destructive' })
  } finally {
    downloadingId.value = null
  }
}

const recordPayment = (invoice: any) => {
  selectedInvoice.value = invoice
  paymentForm.value.amount = invoice.balance_due
  paymentForm.value.payment_date = new Date().toISOString().split('T')[0]
  showPaymentModal.value = true
}

const submitPayment = async () => {
  submittingPayment.value = true
  try {
    await $fetch(`${API_BASE}/payments/`, {
      method: 'POST',
      headers: authHeaders(),
      body: {
        ...paymentForm.value,
        invoice: selectedInvoice.value.id
      }
    })
    
    showPaymentModal.value = false
    await refresh()
    
    // Reset form
    paymentForm.value = {
      amount: 0,
      payment_date: new Date().toISOString().split('T')[0],
      payment_method: 'bank_transfer',
      transaction_id: '',
      notes: '',
      status: 'completed'
    }
  } catch (e: any) {
    toast({ title: 'Error', description: String('Failed to record payment: ' + (e.data?.detail || 'Unknown error')), variant: 'destructive' })
  } finally {
    submittingPayment.value = false
  }
}

const exportInvoices = () => {
  toast({ title: 'Info', description: 'Export functionality coming soon!', variant: 'default' })
}
</script>
