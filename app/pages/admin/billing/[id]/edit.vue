<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink :to="`/admin/billing/${route.params.id}`" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-3xl font-bold">Edit Invoice</h1>
        <p class="text-muted-foreground">Update invoice information</p>
      </div>
    </div>

    <form @submit.prevent="updateInvoice" class="max-w-5xl space-y-8" v-if="form">
      <!-- Basic Information -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Invoice Information</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Invoice Number *</label>
            <input
              v-model="form.invoice_number"
              type="text"
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
            <label class="text-sm font-medium">Status *</label>
            <select
              v-model="form.status"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
              <option value="partial">Partial</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Company *</label>
            <select
              v-model="form.company"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option v-for="company in companies" :key="company.id" :value="company.id">
                {{ company.name }}
              </option>
            </select>
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
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Notes</label>
            <textarea
              v-model="form.notes"
              rows="3"
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
          :disabled="saving"
          class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {{ saving ? 'Saving...' : 'Save Changes' }}
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

const route = useRoute()
const saving = ref(false)

const { data: invoice, refresh } = await useFetch(`${API_BASE}/billing/invoices/${route.params.id}/`, {
  headers: authHeaders()
})

const { data: companies } = await useFetch(`${API_BASE}/companies/`, {
  headers: authHeaders()
})

const form = ref(null)

watchEffect(() => {
  if (invoice.value) {
    form.value = { ...invoice.value }
  }
})

const updateInvoice = async () => {
  saving.value = true
  try {
    await $fetch(`${API_BASE}/billing/invoices/${route.params.id}/`, {
      method: 'PUT',
      headers: authHeaders(),
      body: form.value
    })
    
    await refresh()
    navigateTo(`/admin/billing/${route.params.id}`)
  } catch (e: any) {
    if (e.data) {
      const errors = Object.entries(e.data)
        .map(([key, msgs]) => `${key}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
        .join('\n')
      alert(`Failed to update invoice:\n${errors}`)
    } else {
      alert('Failed to update invoice')
    }
  } finally {
    saving.value = false
  }
}
</script>
