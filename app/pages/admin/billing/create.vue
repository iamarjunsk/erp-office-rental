<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/billing" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-3xl font-bold">Create Invoice</h1>
        <p class="text-muted-foreground">Generate a new invoice</p>
      </div>
    </div>

    <form @submit.prevent="createInvoice" class="max-w-5xl space-y-8">
      <!-- Basic Information -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Invoice Information</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Invoice Number *</label>
            <input
              v-model="form.invoice_number"
              type="text"
              placeholder="INV-2024-001"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Invoice Type *</label>
            <select
              v-model="form.type"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="rent">Rent</option>
              <option value="utility">Utility</option>
              <option value="maintenance">Maintenance</option>
              <option value="service">Service</option>
              <option value="deposit">Security Deposit</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Company *</label>
            <select
              v-model="form.company"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select Company</option>
              <option v-for="company in companies" :key="company.id" :value="company.id">
                {{ company.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Lease (Optional)</label>
            <select
              v-model="form.lease"
              :disabled="!form.company"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="">{{ form.company ? 'Select Lease' : 'Select company first' }}</option>
              <option v-for="lease in filteredLeases" :key="lease.id" :value="lease.id">
                {{ lease.lease_number }} - {{ formatCurrency(lease.rent_amount) }}/month
              </option>
            </select>
            <p v-if="form.lease" class="text-xs text-green-600">
              Rent amount auto-filled from lease
            </p>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Invoice Date *</label>
            <input
              v-model="form.invoice_date"
              type="date"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Due Date *</label>
            <input
              v-model="form.due_date"
              type="date"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>
      </div>

      <!-- Billing Period -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Billing Period</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Period Start *</label>
            <input
              v-model="form.period_start"
              type="date"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Period End *</label>
            <input
              v-model="form.period_end"
              type="date"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>
      </div>

      <!-- Invoice Items -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">Invoice Items</h2>
          <button 
            type="button"
            @click="addItem"
            class="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted"
          >
            <Icon name="lucide:plus" class="w-4 h-4" />
            Add Item
          </button>
        </div>

        <div class="space-y-3">
          <div v-for="(item, index) in form.items" :key="index" class="grid md:grid-cols-12 gap-3 items-start p-4 border border-border rounded-lg">
            <div class="md:col-span-5 space-y-2">
              <label class="text-sm font-medium">Description</label>
              <input
                v-model="item.description"
                type="text"
                placeholder="Item description"
                class="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div class="md:col-span-2 space-y-2">
              <label class="text-sm font-medium">Quantity</label>
              <input
                v-model.number="item.quantity"
                type="number"
                step="0.01"
                min="0.01"
                class="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div class="md:col-span-3 space-y-2">
              <label class="text-sm font-medium">Unit Price</label>
              <input
                v-model.number="item.unit_price"
                type="number"
                step="0.01"
                min="0"
                class="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div class="md:col-span-2 space-y-2">
              <label class="text-sm font-medium">Total</label>
              <div class="flex items-center gap-2">
                <p class="font-medium py-2">{{ formatCurrency(item.quantity * item.unit_price) }}</p>
                <button 
                  v-if="form.items.length > 1"
                  type="button"
                  @click="removeItem(index)"
                  class="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Icon name="lucide:trash-2" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Totals -->
        <div class="bg-muted/50 rounded-lg p-4 space-y-2">
          <div class="flex justify-between">
            <span class="text-muted-foreground">Subtotal</span>
            <span class="font-medium">{{ formatCurrency(subtotal) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-muted-foreground">GST ({{ form.gst_rate }}%)</span>
            <span class="font-medium">{{ formatCurrency(taxAmount) }}</span>
          </div>
          <div class="flex justify-between" v-if="form.discount_amount > 0">
            <span class="text-muted-foreground">Discount</span>
            <span class="font-medium text-green-600">-{{ formatCurrency(form.discount_amount) }}</span>
          </div>
          <div class="flex justify-between pt-2 border-t border-border">
            <span class="font-semibold">Total</span>
            <span class="text-xl font-bold">{{ formatCurrency(total) }}</span>
          </div>
        </div>
      </div>

      <!-- Additional Settings -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Additional Settings</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">GST Rate (%)</label>
            <input
              v-model.number="form.gst_rate"
              type="number"
              step="0.01"
              min="0"
              max="100"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Discount Amount</label>
            <input
              v-model.number="form.discount_amount"
              type="number"
              step="0.01"
              min="0"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Terms & Conditions</label>
            <textarea
              v-model="form.terms"
              rows="3"
              placeholder="Payment terms, late fees, etc."
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Notes</label>
            <textarea
              v-model="form.notes"
              rows="3"
              placeholder="Additional notes..."
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4 pt-4">
        <button 
          type="button"
          @click="$router.back()"
          class="px-4 py-2 border border-border rounded-lg hover:bg-muted"
        >
          Cancel
        </button>
        <button 
          type="submit"
          :disabled="creating"
          class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {{ creating ? 'Creating...' : 'Create Invoice' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { authHeaders } = useAuth()
const API_BASE = 'http://localhost:8000/api'

const creating = ref(false)

const form = ref({
  invoice_number: '',
  company: '',
  lease: '',
  type: 'rent',
  period_start: '',
  period_end: '',
  invoice_date: new Date().toISOString().split('T')[0],
  due_date: '',
  gst_rate: 18.00,
  discount_amount: 0,
  status: 'draft',
  notes: '',
  terms: 'Payment due within 30 days. Late payments subject to 2% monthly interest.',
  items: [
    { description: '', quantity: 1, unit_price: 0 }
  ]
})

// Fetch companies and leases for dropdowns
const { data: companies } = await useFetch(`${API_BASE}/companies/`, {
  headers: authHeaders()
})

const { data: leases } = await useFetch(`${API_BASE}/leases/`, {
  headers: authHeaders()
})

// Filter leases by selected company
const filteredLeases = computed(() => {
  if (!form.value.company) return leases.value || []
  return (leases.value || []).filter((lease: any) => lease.company === parseInt(form.value.company))
})

// Auto-fill rent amount when lease is selected
watch(() => form.value.lease, (newLeaseId) => {
  if (newLeaseId) {
    const selectedLease = (leases.value || []).find((l: any) => l.id === parseInt(newLeaseId))
    if (selectedLease && selectedLease.rent_amount) {
      // Update first item with rent details
      form.value.items[0] = {
        description: `Rent for ${selectedLease.lease_number}`,
        quantity: 1,
        unit_price: selectedLease.rent_amount
      }
      // Auto-fill company if not already set
      if (!form.value.company) {
        form.value.company = selectedLease.company
      }
    }
  }
})

// Calculate totals
const subtotal = computed(() => {
  return form.value.items.reduce((sum: number, item: any) => {
    return sum + (item.quantity * item.unit_price)
  }, 0)
})

const taxAmount = computed(() => {
  return subtotal.value * (form.value.gst_rate / 100)
})

const total = computed(() => {
  return subtotal.value + taxAmount.value - form.value.discount_amount
})

const addItem = () => {
  form.value.items.push({ description: '', quantity: 1, unit_price: 0 })
}

const removeItem = (index: number) => {
  form.value.items.splice(index, 1)
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value || 0)
}

const createInvoice = async () => {
  creating.value = true
  try {
    await $fetch(`${API_BASE}/billing/invoices/`, {
      method: 'POST',
      headers: authHeaders(),
      body: form.value
    })
    
    navigateTo('/admin/billing')
  } catch (e: any) {
    if (e.data) {
      const errors = Object.entries(e.data)
        .map(([key, msgs]) => `${key}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
        .join('\n')
      alert(`Failed to create invoice:\n${errors}`)
    } else {
      alert('Failed to create invoice')
    }
  } finally {
    creating.value = false
  }
}
</script>
