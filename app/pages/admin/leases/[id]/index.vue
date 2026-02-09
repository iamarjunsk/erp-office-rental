<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/leases" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div class="flex-1">
        <h1 class="text-3xl font-bold">{{ lease?.lease_number }}</h1>
        <div class="flex items-center gap-2 text-muted-foreground mt-1">
          <span 
            class="px-2 py-0.5 rounded-full text-xs font-medium uppercase"
            :class="{
              'bg-green-100 text-green-700': lease?.status === 'active',
              'bg-gray-100 text-gray-700': lease?.status === 'draft',
              'bg-red-100 text-red-700': lease?.status === 'expired',
              'bg-amber-100 text-amber-700': lease?.status === 'terminated',
            }"
          >
            {{ lease?.status }}
          </span>
          <span class="mx-2">•</span>
          <span class="capitalize">{{ lease?.type?.replace('_', ' ') }}</span>
        </div>
      </div>
      <NuxtLink 
        :to="`/admin/leases/${route.params.id}/edit`"
        class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
      >
        <Icon name="lucide:pencil" class="w-4 h-4" />
        Edit Lease
      </NuxtLink>
    </div>

    <!-- Content Grid -->
    <div class="grid md:grid-cols-3 gap-6">
      <!-- Main Info -->
      <div class="md:col-span-2 space-y-6">
        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Parties</h2>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <p class="text-sm text-muted-foreground">Company</p>
              <p class="font-medium">{{ lease?.company_details?.name }}</p>
              <p class="text-sm text-muted-foreground">{{ lease?.company_details?.type }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Space</p>
              <p class="font-medium">{{ lease?.space_details?.code }}</p>
              <p class="text-sm text-muted-foreground">{{ lease?.space_details?.name }}</p>
            </div>
          </div>
        </div>

        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Lease Period</h2>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <p class="text-sm text-muted-foreground">Start Date</p>
              <p class="font-medium">{{ formatDate(lease?.start_date) }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">End Date</p>
              <p class="font-medium">{{ formatDate(lease?.end_date) }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Duration</p>
              <p class="font-medium">{{ calculateDuration(lease?.start_date, lease?.end_date) }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Notice Period</p>
              <p class="font-medium">{{ lease?.notice_period_days }} days</p>
            </div>
          </div>
        </div>

        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Financial Terms</h2>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <p class="text-sm text-muted-foreground">Monthly Rent</p>
              <p class="font-medium text-lg">{{ formatCurrency(lease?.rent_amount) }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Security Deposit</p>
              <p class="font-medium text-lg">{{ formatCurrency(lease?.security_deposit) }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Annual Escalation</p>
              <p class="font-medium">{{ lease?.rent_escalation_percent }}%</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Annual Rent</p>
              <p class="font-medium">{{ formatCurrency((lease?.rent_amount || 0) * 12) }}</p>
            </div>
          </div>
        </div>

        <div v-if="lease?.notes" class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Notes</h2>
          <p class="text-muted-foreground">{{ lease.notes }}</p>
        </div>
      </div>

      <!-- Sidebar Info -->
      <div class="space-y-6">
        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Documents</h2>
          <div v-if="lease?.document_url" class="space-y-3">
            <a 
              :href="lease.document_url" 
              target="_blank"
              class="flex items-center gap-3 text-primary hover:underline"
            >
              <Icon name="lucide:file-text" class="w-4 h-4" />
              <span>View Lease Agreement</span>
              <Icon name="lucide:external-link" class="w-3 h-3" />
            </a>
          </div>
          <div v-else class="text-muted-foreground text-sm">
            No documents attached
          </div>
        </div>

        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Timeline</h2>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Created</span>
              <span>{{ formatDateTime(lease?.created_at) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Last Updated</span>
              <span>{{ formatDateTime(lease?.updated_at) }}</span>
            </div>
          </div>
        </div>

        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Quick Stats</h2>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <div 
                class="w-3 h-3 rounded-full"
                :class="{
                  'bg-green-500': isActive,
                  'bg-gray-500': lease?.status === 'draft',
                  'bg-red-500': lease?.status === 'expired',
                  'bg-amber-500': lease?.status === 'terminated',
                }"
              />
              <span>{{ isActive ? 'Active' : lease?.status }}</span>
            </div>
            <div v-if="daysUntilExpiry !== null" class="text-sm">
              <span class="text-muted-foreground">Expires in: </span>
              <span :class="{ 'text-amber-500': daysUntilExpiry <= 30, 'text-red-500': daysUntilExpiry <= 7 }">
                {{ daysUntilExpiry }} days
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { authHeaders } = useAuth()
const API_BASE = 'http://localhost:8000/api/leases'

const route = useRoute()
const { data: lease } = await useFetch(`${API_BASE}/${route.params.id}/`, {
  headers: authHeaders()
})

const isActive = computed(() => lease.value?.status === 'active')

const daysUntilExpiry = computed(() => {
  if (!lease.value?.end_date || lease.value?.status !== 'active') return null
  const endDate = new Date(lease.value.end_date)
  const today = new Date()
  const diffTime = endDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
})

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

const calculateDuration = (start: string, end: string) => {
  if (!start || !end) return 'N/A'
  const startDate = new Date(start)
  const endDate = new Date(end)
  const diffMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                     (endDate.getMonth() - startDate.getMonth())
  const years = Math.floor(diffMonths / 12)
  const months = diffMonths % 12
  
  if (years > 0 && months > 0) return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`
  if (years > 0) return `${years} year${years > 1 ? 's' : ''}`
  return `${months} month${months > 1 ? 's' : ''}`
}
</script>
