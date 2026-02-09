<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold">Companies</h1>
        <p class="text-muted-foreground">Manage tenant companies</p>
      </div>
      <NuxtLink to="/admin/companies/create" class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
        <Icon name="lucide:plus" class="w-4 h-4" />
        Add Company
      </NuxtLink>
    </div>

    <div class="flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search companies..."
          class="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <select v-model="statusFilter" class="px-4 py-2 bg-card border border-border rounded-lg">
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="blacklisted">Blacklisted</option>
      </select>
    </div>

    <div class="bg-card border border-border rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-muted">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-medium">Company Name</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Type</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Industry</th>
              <th class="px-4 py-3 text-left text-sm font-medium">GSTIN</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Location</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Credit Score</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Status</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="company in companies" :key="company.id" class="hover:bg-muted/50">
              <td class="px-4 py-3 text-sm">
                <div>
                  <p class="font-medium">{{ company.name }}</p>
                  <p class="text-xs text-muted-foreground">{{ company.legal_name }}</p>
                </div>
              </td>
              <td class="px-4 py-3 text-sm uppercase">{{ company.type.replace('_', ' ') }}</td>
              <td class="px-4 py-3 text-sm">{{ company.industry || '-' }}</td>
              <td class="px-4 py-3 text-sm font-mono">{{ company.gstin || '-' }}</td>
              <td class="px-4 py-3 text-sm">{{ company.city }}, {{ company.state }}</td>
              <td class="px-4 py-3 text-sm">
                <div class="flex items-center gap-2">
                  <div class="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      class="h-full rounded-full"
                      :class="{
                        'bg-red-500': (company.credit_score || 0) < 50,
                        'bg-amber-500': (company.credit_score || 0) >= 50 && (company.credit_score || 0) < 75,
                        'bg-green-500': (company.credit_score || 0) >= 75,
                      }"
                      :style="{ width: `${company.credit_score || 0}%` }"
                    />
                  </div>
                  <span class="text-xs">{{ company.credit_score || 0 }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-sm">
                <span 
                  class="px-2 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-700': company.status === 'active',
                    'bg-red-100 text-red-700': company.status === 'inactive',
                    'bg-gray-100 text-gray-700': company.status === 'blacklisted',
                  }"
                >
                  {{ company.status }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm">
                <div class="flex items-center gap-2">
                  <button 
                    @click="viewCompany(company)"
                    class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted"
                  >
                    <Icon name="lucide:eye" class="w-4 h-4" />
                  </button>
                  <button 
                    @click="editCompany(company)"
                    class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted"
                  >
                    <Icon name="lucide:pencil" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="companies.length === 0">
              <td colspan="8" class="px-4 py-8 text-center text-muted-foreground">
                No companies found
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
const API_BASE = 'http://localhost:8000/api/companies'

const searchQuery = ref('')
const statusFilter = ref('')

// Fetch companies with filters
const { data, pending: loading, refresh } = await useFetch(() => {
  const params = new URLSearchParams()
  if (searchQuery.value) params.append('search', searchQuery.value)
  if (statusFilter.value) params.append('status', statusFilter.value)
  return `${API_BASE}/?${params.toString()}`
}, {
  headers: authHeaders(),
  watch: [statusFilter]
})

const companies = computed(() => data.value || [])

// Update search with debounce
watch(searchQuery, debounce(() => {
  refresh()
}, 500))

const viewCompany = (company: any) => {
  navigateTo(`/admin/companies/${company.id}`)
}

const editCompany = (company: any) => {
  navigateTo(`/admin/companies/${company.id}/edit`)
}
</script>
