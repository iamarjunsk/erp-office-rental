<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/companies" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-3xl font-bold">Add Company</h1>
        <p class="text-muted-foreground">Register a new tenant company</p>
      </div>
    </div>

    <form @submit.prevent="createCompany" class="max-w-4xl space-y-8">
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Information</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Company Name *</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="TechCorp Solutions"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Legal Name</label>
            <input
              v-model="form.legal_name"
              type="text"
              placeholder="TechCorp Solutions Pvt Ltd"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Company Type *</label>
            <select
              v-model="form.type"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="pvt_ltd">Private Limited</option>
              <option value="llp">LLP</option>
              <option value="partnership">Partnership</option>
              <option value="proprietorship">Proprietorship</option>
              <option value="public_ltd">Public Limited</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Industry</label>
            <input
              v-model="form.industry"
              type="text"
              placeholder="Information Technology"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Registration Details</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">GSTIN</label>
            <input
              v-model="form.gstin"
              type="text"
              placeholder="27AABCU9603R1ZX"
              maxlength="15"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">PAN</label>
            <input
              v-model="form.pan"
              type="text"
              placeholder="AABCU9603R"
              maxlength="10"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">CIN</label>
            <input
              v-model="form.cin"
              type="text"
              placeholder="U72200MH2000PTC123456"
              maxlength="21"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Location</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium">Address</label>
            <input
              v-model="form.address"
              type="text"
              placeholder="Full address"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">City</label>
            <input
              v-model="form.city"
              type="text"
              placeholder="Mumbai"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">State</label>
            <input
              v-model="form.state"
              type="text"
              placeholder="Maharashtra"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">PIN Code</label>
            <input
              v-model="form.pincode"
              type="text"
              placeholder="400001"
              maxlength="6"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Contact Information</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Email</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="contact@company.com"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Phone</label>
            <input
              v-model="form.phone"
              type="text"
              placeholder="+91 98765 43210"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Website</label>
            <input
              v-model="form.website"
              type="url"
              placeholder="https://www.company.com"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Additional Details</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Credit Score (0-100)</label>
            <input
              v-model.number="form.credit_score"
              type="number"
              min="0"
              max="100"
              placeholder="75"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium">Notes</label>
            <textarea
              v-model="form.notes"
              rows="3"
              placeholder="Additional notes about the company..."
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
          {{ creating ? 'Creating...' : 'Create Company' }}
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
const API_BASE = 'http://localhost:8000/api/companies'

const creating = ref(false)

const form = ref({
  name: '',
  legal_name: '',
  type: 'pvt_ltd',
  industry: '',
  gstin: '',
  pan: '',
  cin: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  email: '',
  phone: '',
  website: '',
  credit_score: 0,
  notes: '',
})

const createCompany = async () => {
  creating.value = true
  try {
    const payload = {
      ...form.value,
      status: 'active'
    }

    await $fetch(`${API_BASE}/`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })
    
    navigateTo('/admin/companies')
  } catch (e: any) {
    if (e.data) {
      const errors = Object.entries(e.data)
        .map(([key, msgs]) => `${key}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
        .join(', ')
      toast({ title: 'Error', description: `Failed to create company: ${errors}`, variant: 'destructive' })
    } else {
      toast({ title: 'Error', description: 'Failed to create company', variant: 'destructive' })
    }
  } finally {
    creating.value = false
  }
}
</script>
