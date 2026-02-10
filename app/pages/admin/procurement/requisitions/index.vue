<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/procurement" class="p-2 hover:bg-muted rounded-full">
          <Icon name="lucide:arrow-left" class="w-5 h-5" />
        </NuxtLink>
        <div>
          <h1 class="text-3xl font-bold">Purchase Requisitions</h1>
          <p class="text-muted-foreground">Create and manage procurement requests</p>
        </div>
      </div>
      <NuxtLink
        to="/admin/procurement/requisitions/create"
        class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
      >
        <Icon name="lucide:plus" class="w-4 h-4" />
        New Requisition
      </NuxtLink>
    </div>

    <div class="flex flex-wrap gap-4">
      <div class="flex-1 min-w-[250px]">
        <input
          v-model="search"
          type="text"
          placeholder="Search by PR number or title..."
          class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <select
        v-model="statusFilter"
        class="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">All Status</option>
        <option value="draft">Draft</option>
        <option value="pending_approval">Pending Approval</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
        <option value="converted_to_po">Converted to PO</option>
      </select>
      <select
        v-model="priorityFilter"
        class="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>
    </div>

    <div class="grid grid-cols-5 gap-4">
      <div
        v-for="stat in statusStats"
        :key="stat.key"
        class="p-4 bg-card border border-border rounded-lg cursor-pointer hover:shadow-sm transition-shadow"
        :class="statusFilter === stat.key ? 'ring-2 ring-primary' : ''"
        @click="statusFilter = statusFilter === stat.key ? '' : stat.key"
      >
        <div class="text-2xl font-bold" :class="stat.color">{{ stat.count }}</div>
        <div class="text-sm text-muted-foreground">{{ stat.label }}</div>
      </div>
    </div>

    <div v-if="pending" class="flex items-center justify-center py-12">
      <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin text-muted-foreground" />
    </div>

    <div v-else-if="error" class="text-center py-12 bg-card border border-border rounded-xl">
      <Icon name="lucide:alert-circle" class="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 class="text-lg font-semibold mb-2">Failed to load requisitions</h3>
      <p class="text-muted-foreground mb-4">Please check your connection and try again</p>
      <button
        @click="refresh"
        class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
      >
        Retry
      </button>
    </div>

    <div v-else-if="filteredRequisitions.length === 0" class="text-center py-12 bg-card border border-border rounded-xl">
      <Icon name="lucide:file-text" class="w-12 h-12 text-muted-foreground mx-auto mb-4" />
      <h3 class="text-lg font-semibold mb-2">No requisitions found</h3>
      <p v-if="search || statusFilter || priorityFilter" class="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
      <p v-else class="text-muted-foreground mb-4">Create your first requisition to get started</p>
      <NuxtLink
        v-if="!search && !statusFilter && !priorityFilter"
        to="/admin/procurement/requisitions/create"
        class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
      >
        <Icon name="lucide:plus" class="w-4 h-4" />
        Create Requisition
      </NuxtLink>
      <button
        v-else
        @click="search = ''; statusFilter = ''; priorityFilter = ''"
        class="px-4 py-2 border border-border rounded-lg hover:bg-muted"
      >
        Clear Filters
      </button>
    </div>

    <div v-else class="bg-card border border-border rounded-xl overflow-hidden">
      <table class="w-full">
        <thead class="bg-muted/50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">PR Number</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Requested By</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Priority</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border">
          <tr
            v-for="pr in filteredRequisitions"
            :key="pr.id"
            class="hover:bg-muted/30 transition-colors"
          >
            <td class="px-6 py-4">
              <NuxtLink
                :to="`/admin/procurement/requisitions/${pr.id}`"
                class="font-medium text-primary hover:underline"
              >
                {{ pr.pr_number }}
              </NuxtLink>
            </td>
            <td class="px-6 py-4">
              <div class="font-medium">{{ pr.title }}</div>
              <div class="text-xs text-muted-foreground">{{ pr.category }}</div>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span class="text-xs font-medium text-primary">{{ pr.requested_by?.first_name?.[0] }}{{ pr.requested_by?.last_name?.[0] }}</span>
                </div>
                <div>
                  <div class="text-sm font-medium">{{ pr.requested_by?.first_name }} {{ pr.requested_by?.last_name }}</div>
                  <div class="text-xs text-muted-foreground">{{ pr.department }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 font-medium">₹{{ Number(pr.total_estimated_amount).toLocaleString() }}</td>
            <td class="px-6 py-4">
              <span
                class="px-2 py-1 text-xs rounded-full font-medium"
                :class="getPriorityClass(pr.priority)"
              >
                {{ pr.priority }}
              </span>
            </td>
            <td class="px-6 py-4">
              <span
                class="px-2 py-1 text-xs rounded-full font-medium"
                :class="getStatusClass(pr.status)"
              >
                {{ formatStatus(pr.status) }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <NuxtLink
                  :to="`/admin/procurement/requisitions/${pr.id}`"
                  class="p-2 hover:bg-muted rounded-lg"
                  title="View"
                >
                  <Icon name="lucide:eye" class="w-4 h-4" />
                </NuxtLink>
                <NuxtLink
                  v-if="pr.status === 'draft'"
                  :to="`/admin/procurement/requisitions/${pr.id}/edit`"
                  class="p-2 hover:bg-muted rounded-lg"
                  title="Edit"
                >
                  <Icon name="lucide:pencil" class="w-4 h-4" />
                </NuxtLink>
                <NuxtLink
                  v-if="pr.status === 'approved'"
                  :to="`/admin/procurement/purchase-orders/create?prId=${pr.id}`"
                  class="p-2 hover:bg-green-100 rounded-lg text-green-600"
                  title="Convert to PO"
                >
                  <Icon name="lucide:arrow-right-circle" class="w-4 h-4" />
                </NuxtLink>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { authHeaders } = useAuth()
const { error: showError } = useToast()
const API_BASE = 'http://localhost:8000/api/procurement'

const search = ref('')
const statusFilter = ref('')
const priorityFilter = ref('')

const { data, error, pending, refresh } = await useFetch(() => {
  const params = new URLSearchParams()
  if (search.value) params.append('search', search.value)
  if (statusFilter.value) params.append('status', statusFilter.value)
  if (priorityFilter.value) params.append('priority', priorityFilter.value)
  return `${API_BASE}/requisitions/?${params.toString()}`
}, {
  headers: authHeaders(),
  watch: [search, statusFilter, priorityFilter]
})

const requisitions = computed(() => {
  const results = data.value?.results || data.value || []
  return Array.isArray(results) ? results : []
})
const stats = computed(() => data.value?.stats || {})

const statusStats = computed(() => [
  { key: 'draft', label: 'Draft', count: stats.value.draft || 0, color: 'text-gray-600' },
  { key: 'pending_approval', label: 'Pending', count: stats.value.pending_approval || 0, color: 'text-amber-600' },
  { key: 'approved', label: 'Approved', count: stats.value.approved || 0, color: 'text-green-600' },
  { key: 'rejected', label: 'Rejected', count: stats.value.rejected || 0, color: 'text-red-600' },
  { key: 'converted_to_po', label: 'Converted', count: stats.value.converted_to_po || 0, color: 'text-blue-600' },
])

const filteredRequisitions = computed(() => {
  return requisitions.value.filter((pr: any) => {
    const matchesSearch = !search.value ||
      pr.pr_number?.toLowerCase().includes(search.value.toLowerCase()) ||
      pr.title?.toLowerCase().includes(search.value.toLowerCase())
    const matchesStatus = !statusFilter.value || pr.status === statusFilter.value
    const matchesPriority = !priorityFilter.value || pr.priority === priorityFilter.value
    return matchesSearch && matchesStatus && matchesPriority
  })
})

const getPriorityClass = (priority: string) => {
  const classes: Record<string, string> = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-amber-100 text-amber-700',
    urgent: 'bg-red-100 text-red-700',
  }
  return classes[priority] || 'bg-gray-100 text-gray-700'
}

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    pending_approval: 'bg-amber-100 text-amber-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    converted_to_po: 'bg-blue-100 text-blue-700',
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const formatStatus = (status: string) => status?.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
</script>
