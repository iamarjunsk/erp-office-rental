<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/billing" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div class="flex-1">
        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-bold">{{ invoice?.invoice_number }}</h1>
          <span 
            class="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
            :class="{
              'bg-gray-100 text-gray-700': invoice?.status === 'draft',
              'bg-blue-100 text-blue-700': invoice?.status === 'sent',
              'bg-green-100 text-green-700': invoice?.status === 'paid',
              'bg-red-100 text-red-700': invoice?.status === 'overdue',
              'bg-amber-100 text-amber-700': invoice?.status === 'partial',
              'bg-slate-100 text-slate-700': invoice?.status === 'cancelled',
            }"
          >
            {{ invoice?.status }}
          </span>
        </div>
        <p class="text-muted-foreground mt-1 capitalize">{{ invoice?.type?.replace('_', ' ') }}</p>
      </div>
      <div class="flex gap-2">
        <button 
          @click="downloadInvoice"
          :disabled="downloading"
          class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted hover:scale-105 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none group"
        >
          <Icon 
            :name="downloading ? 'lucide:loader-2' : 'lucide:download'" 
            class="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" 
            :class="{ 'animate-spin': downloading }" 
          />
          <span class="group-hover:font-medium transition-all">{{ downloading ? 'Downloading...' : 'Download' }}</span>
        </button>
        <button 
          v-if="invoice?.balance_due > 0"
          @click="showPaymentModal = true"
          class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:scale-105 hover:shadow-md transition-all duration-200 group"
        >
          <Icon name="lucide:banknote" class="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
          <span class="group-hover:font-medium transition-all">Record Payment</span>
        </button>
        <NuxtLink 
          :to="`/admin/billing/${route.params.id}/edit`"
          class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted hover:scale-105 transition-all duration-200 group"
        >
          <Icon name="lucide:pencil" class="w-4 h-4 transition-transform duration-200 group-hover:rotate-12" />
          <span class="group-hover:font-medium transition-all">Edit</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="grid md:grid-cols-3 gap-6">
      <!-- Main Invoice -->
      <div class="md:col-span-2 space-y-6">
        <!-- Invoice Details -->
        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-lg font-semibold">Invoice Details</h2>
              <p class="text-sm text-muted-foreground">{{ invoice?.company_details?.name }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-muted-foreground">Invoice Date</p>
              <p class="font-medium">{{ formatDate(invoice?.invoice_date) }}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div>
              <p class="text-sm text-muted-foreground">Billing Period</p>
              <p class="font-medium">{{ formatDate(invoice?.period_start) }} - {{ formatDate(invoice?.period_end) }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Due Date</p>
              <p class="font-medium" :class="{ 'text-red-500': isOverdue }">{{ formatDate(invoice?.due_date) }}</p>
            </div>
            <div v-if="invoice?.lease_details">
              <p class="text-sm text-muted-foreground">Related Lease</p>
              <p class="font-medium">{{ invoice.lease_details.lease_number }}</p>
            </div>
          </div>
        </div>

        <!-- Invoice Items -->
        <div class="bg-card border border-border rounded-lg overflow-hidden">
          <table class="w-full">
            <thead class="bg-muted">
              <tr>
                <th class="px-4 py-3 text-left text-sm font-medium">Description</th>
                <th class="px-4 py-3 text-right text-sm font-medium">Quantity</th>
                <th class="px-4 py-3 text-right text-sm font-medium">Unit Price</th>
                <th class="px-4 py-3 text-right text-sm font-medium">Total</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-for="item in invoice?.items" :key="item.id">
                <td class="px-4 py-3 text-sm">{{ item.description }}</td>
                <td class="px-4 py-3 text-sm text-right">{{ item.quantity }}</td>
                <td class="px-4 py-3 text-sm text-right">{{ formatCurrency(item.unit_price) }}</td>
                <td class="px-4 py-3 text-sm text-right font-medium">{{ formatCurrency(item.line_total) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Totals -->
        <div class="bg-card border border-border rounded-lg p-6">
          <div class="space-y-2 max-w-sm ml-auto">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Subtotal</span>
              <span>{{ formatCurrency(invoice?.subtotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">GST ({{ invoice?.gst_rate }}%)</span>
              <span>{{ formatCurrency(invoice?.tax_amount) }}</span>
            </div>
            <div v-if="invoice?.discount_amount > 0" class="flex justify-between">
              <span class="text-muted-foreground">Discount</span>
              <span class="text-green-600">-{{ formatCurrency(invoice?.discount_amount) }}</span>
            </div>
            <div class="flex justify-between pt-2 border-t border-border">
              <span class="font-semibold">Total</span>
              <span class="text-xl font-bold">{{ formatCurrency(invoice?.total_amount) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Amount Paid</span>
              <span class="text-green-600">{{ formatCurrency(invoice?.amount_paid) }}</span>
            </div>
            <div class="flex justify-between pt-2 border-t border-border">
              <span class="font-semibold">Balance Due</span>
              <span class="text-xl font-bold" :class="{ 'text-red-500': invoice?.balance_due > 0 }">{{ formatCurrency(invoice?.balance_due) }}</span>
            </div>
          </div>
        </div>

        <!-- Terms & Notes -->
        <div v-if="invoice?.terms || invoice?.notes" class="bg-card border border-border rounded-lg p-6 space-y-4">
          <div v-if="invoice?.terms">
            <h3 class="font-semibold mb-2">Terms & Conditions</h3>
            <p class="text-muted-foreground whitespace-pre-line">{{ invoice.terms }}</p>
          </div>
          <div v-if="invoice?.notes">
            <h3 class="font-semibold mb-2">Notes</h3>
            <p class="text-muted-foreground whitespace-pre-line">{{ invoice.notes }}</p>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Payment Status -->
        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Payment Status</h2>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Status</span>
              <span 
                class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                :class="{
                  'bg-gray-100 text-gray-700': invoice?.status === 'draft',
                  'bg-blue-100 text-blue-700': invoice?.status === 'sent',
                  'bg-green-100 text-green-700': invoice?.status === 'paid',
                  'bg-red-100 text-red-700': invoice?.status === 'overdue',
                  'bg-amber-100 text-amber-700': invoice?.status === 'partial',
                  'bg-slate-100 text-slate-700': invoice?.status === 'cancelled',
                }"
              >
                {{ invoice?.status }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Total Amount</span>
              <span class="font-medium">{{ formatCurrency(invoice?.total_amount) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Paid</span>
              <span class="font-medium text-green-600">{{ formatCurrency(invoice?.amount_paid) }}</span>
            </div>
            <div class="flex justify-between pt-2 border-t border-border">
              <span class="text-muted-foreground">Balance</span>
              <span class="font-bold" :class="{ 'text-red-500': invoice?.balance_due > 0 }">{{ formatCurrency(invoice?.balance_due) }}</span>
            </div>
          </div>

          <!-- Progress Bar -->
          <div v-if="invoice?.total_amount > 0" class="space-y-2">
            <div class="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                class="h-full bg-green-500 rounded-full transition-all"
                :style="{ width: `${Math.min((invoice?.amount_paid / invoice?.total_amount) * 100, 100)}%` }"
              />
            </div>
            <p class="text-xs text-muted-foreground text-center">
              {{ ((invoice?.amount_paid / invoice?.total_amount) * 100).toFixed(1) }}% Paid
            </p>
          </div>
        </div>

        <!-- Payment History -->
        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Payment History</h2>
          <div v-if="invoice?.payments?.length > 0" class="space-y-3">
            <div v-for="payment in invoice.payments" :key="payment.id" class="p-3 border border-border rounded-lg">
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-medium">{{ formatCurrency(payment.amount) }}</p>
                  <p class="text-sm text-muted-foreground capitalize">{{ payment.payment_method.replace('_', ' ') }}</p>
                </div>
                <span 
                  class="px-2 py-0.5 rounded-full text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-700': payment.status === 'completed',
                    'bg-amber-100 text-amber-700': payment.status === 'pending',
                    'bg-red-100 text-red-700': payment.status === 'failed',
                  }"
                >
                  {{ payment.status }}
                </span>
              </div>
              <p class="text-xs text-muted-foreground mt-1">{{ formatDate(payment.payment_date) }}</p>
              <p v-if="payment.transaction_id" class="text-xs font-mono mt-1">Ref: {{ payment.transaction_id }}</p>
            </div>
          </div>
          <div v-else class="text-muted-foreground text-sm">
            No payments recorded yet
          </div>
        </div>

        <!-- Timeline -->
        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Timeline</h2>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Created</span>
              <span>{{ formatDateTime(invoice?.created_at) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Last Updated</span>
              <span>{{ formatDateTime(invoice?.updated_at) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Record Payment Modal -->
    <div v-if="showPaymentModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-background rounded-lg p-6 w-full max-w-md mx-4">
        <h2 class="text-xl font-bold mb-4">Record Payment</h2>
        <form @submit.prevent="submitPayment" class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Amount *</label>
            <input
              v-model.number="paymentForm.amount"
              type="number"
              step="0.01"
              :max="invoice?.balance_due"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <p class="text-xs text-muted-foreground">Balance Due: {{ formatCurrency(invoice?.balance_due) }}</p>
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
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { authHeaders } = useAuth()
const API_BASE = 'http://localhost:8000/api/billing'

const route = useRoute()
const showPaymentModal = ref(false)
const submittingPayment = ref(false)

const { data: invoice, refresh } = await useFetch(`${API_BASE}/invoices/${route.params.id}/`, {
  headers: authHeaders()
})

const paymentForm = ref({
  amount: 0,
  payment_date: new Date().toISOString().split('T')[0],
  payment_method: 'bank_transfer',
  transaction_id: '',
  notes: '',
  status: 'completed'
})

const isOverdue = computed(() => {
  if (invoice.value?.balance_due <= 0) return false
  const dueDate = new Date(invoice.value?.due_date)
  return dueDate < new Date()
})

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
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

const formatDateTime = (date: string | Date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const submitPayment = async () => {
  submittingPayment.value = true
  try {
    await $fetch(`${API_BASE}/payments/`, {
      method: 'POST',
      headers: authHeaders(),
      body: {
        ...paymentForm.value,
        invoice: invoice.value.id
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
    toast({ title: 'Error', description: 'Failed to record payment: ' + (e.data?.detail || 'Unknown error'), variant: 'destructive' })
  } finally {
    submittingPayment.value = false
  }
}

const downloading = ref(false)

const downloadInvoice = async () => {
  downloading.value = true
  try {
    const response = await $fetch(`${API_BASE}/invoices/${route.params.id}/download/`, {
      headers: authHeaders(),
      responseType: 'blob'
    })
    
    // Create blob link to download
    const url = window.URL.createObjectURL(new Blob([response]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${invoice.value?.invoice_number || 'invoice'}.pdf`)
    document.body.appendChild(link)
    link.click()
    
    // Cleanup
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (e: any) {
    toast({ title: 'Error', description: 'Failed to download invoice: ' + (e.message || 'Unknown error'), variant: 'destructive' })
  } finally {
    downloading.value = false
  }
}
</script>
