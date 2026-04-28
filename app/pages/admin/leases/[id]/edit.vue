<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink :to="`/admin/leases/${route.params.id}`" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-3xl font-bold">Edit Lease</h1>
        <p class="text-muted-foreground">Update lease information</p>
      </div>
    </div>

    <form @submit.prevent="updateLease" class="max-w-4xl space-y-8" v-if="form">
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Information</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Lease Number *</label>
            <input
              v-model="form.lease_number"
              type="text"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Lease Type *</label>
            <select
              v-model="form.type"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="lease">Lease</option>
              <option value="license">License</option>
              <option value="coworking_membership">Co-working Membership</option>
            </select>
          </div>
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
            <label class="text-sm font-medium">Space *</label>
            <select
              v-model="form.space"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option v-for="space in spaces" :key="space.id" :value="space.id">
                {{ space.code }} - {{ space.name }}
              </option>
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
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="terminated">Terminated</option>
            </select>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Lease Dates</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Start Date *</label>
            <input
              v-model="form.start_date"
              type="date"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">End Date *</label>
            <input
              v-model="form.end_date"
              type="date"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Financial Terms</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Monthly Rent (INR) *</label>
            <input
              v-model.number="form.rent_amount"
              type="number"
              min="0"
              step="0.01"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Security Deposit (INR)</label>
            <input
              v-model.number="form.security_deposit"
              type="number"
              min="0"
              step="0.01"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Annual Rent Escalation (%)</label>
            <input
              v-model.number="form.rent_escalation_percent"
              type="number"
              min="0"
              max="100"
              step="0.01"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Notice Period (Days)</label>
            <input
              v-model.number="form.notice_period_days"
              type="number"
              min="0"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Additional Information</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Document URL</label>
            <input
              v-model="form.document_url"
              type="url"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2 md:col-span-2">
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
const { toast } = useToast()
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { authHeaders } = useAuth()
const API_BASE = 'http://localhost:8000/api'

const route = useRoute()
const saving = ref(false)

const { data: lease, refresh } = await useFetch(`${API_BASE}/leases/${route.params.id}/`, {
  headers: authHeaders()
})

const { data: companies } = await useFetch(`${API_BASE}/companies/`, {
  headers: authHeaders()
})

const { data: spaces } = await useFetch(`${API_BASE}/spaces/`, {
  headers: authHeaders()
})

const form = ref(null)

watchEffect(() => {
  if (lease.value) {
    form.value = { ...lease.value }
  }
})

const updateLease = async () => {
  saving.value = true
  try {
    await $fetch(`${API_BASE}/leases/${route.params.id}/`, {
      method: 'PUT',
      headers: authHeaders(),
      body: form.value
    })
    
    await refresh()
    navigateTo(`/admin/leases/${route.params.id}`)
  } catch (e: any) {
    if (e.data) {
      const errors = Object.entries(e.data)
        .map(([key, msgs]) => `${key}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
        .join('\n')
      toast({ title: 'Error', description: String(`Failed to update lease:\n${errors}`), variant: 'destructive' })
    } else {
      toast({ title: 'Error', description: String('Failed to update lease'), variant: 'destructive' })
    }
  } finally {
    saving.value = false
  }
}
</script>
