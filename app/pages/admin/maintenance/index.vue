<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold">Maintenance & Tickets</h1>
        <p class="text-muted-foreground">Manage maintenance requests and tickets</p>
      </div>
      <NuxtLink 
        to="/admin/maintenance/create"
        class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
      >
        <Icon name="lucide:plus" class="w-4 h-4" />
        Create Ticket
      </NuxtLink>
    </div>

    <!-- Summary Cards -->
    <div class="grid gap-4 md:grid-cols-4">
      <div class="bg-card border border-border rounded-lg p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <Icon name="lucide:inbox" class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold">{{ stats.open }}</p>
            <p class="text-sm text-muted-foreground">Open</p>
          </div>
        </div>
      </div>
      <div class="bg-card border border-border rounded-lg p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
            <Icon name="lucide:clock" class="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p class="text-2xl font-bold">{{ stats.inProgress }}</p>
            <p class="text-sm text-muted-foreground">In Progress</p>
          </div>
        </div>
      </div>
      <div class="bg-card border border-border rounded-lg p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
            <Icon name="lucide:alert-circle" class="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p class="text-2xl font-bold">{{ stats.urgent + stats.highPriority }}</p>
            <p class="text-sm text-muted-foreground">High Priority</p>
          </div>
        </div>
      </div>
      <div class="bg-card border border-border rounded-lg p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <Icon name="lucide:check-circle" class="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p class="text-2xl font-bold">{{ stats.completed }}</p>
            <p class="text-sm text-muted-foreground">Completed</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search tickets..."
          class="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <select v-model="statusFilter" class="px-4 py-2 bg-card border border-border rounded-lg">
        <option value="">All Status</option>
        <option value="open">Open</option>
        <option value="assigned">Assigned</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <select v-model="priorityFilter" class="px-4 py-2 bg-card border border-border rounded-lg">
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>
    </div>

    <div class="bg-card border border-border rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-muted">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-medium">Ticket #</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Title</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Property</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Category</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Priority</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Status</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Created</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="ticket in requests" :key="ticket.id" class="hover:bg-muted/50">
              <td class="px-4 py-3 text-sm font-medium">{{ ticket.ticket_number }}</td>
              <td class="px-4 py-3 text-sm">{{ ticket.title }}</td>
              <td class="px-4 py-3 text-sm">{{ ticket.property_details?.name }}</td>
              <td class="px-4 py-3 text-sm">{{ ticket.category_details?.name }}</td>
              <td class="px-4 py-3 text-sm">
                <span 
                  class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-gray-100 text-gray-700': ticket.priority === 'low',
                    'bg-blue-100 text-blue-700': ticket.priority === 'medium',
                    'bg-amber-100 text-amber-700': ticket.priority === 'high',
                    'bg-red-100 text-red-700': ticket.priority === 'urgent',
                  }"
                >
                  {{ ticket.priority }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm">
                <span 
                  class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  :class="{
                    'bg-blue-100 text-blue-700': ticket.status === 'open',
                    'bg-purple-100 text-purple-700': ticket.status === 'assigned',
                    'bg-amber-100 text-amber-700': ticket.status === 'in_progress',
                    'bg-yellow-100 text-yellow-700': ticket.status === 'on_hold',
                    'bg-green-100 text-green-700': ticket.status === 'completed',
                    'bg-gray-100 text-gray-700': ticket.status === 'cancelled',
                  }"
                >
                  {{ ticket.status.replace('_', ' ') }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm">{{ formatDate(ticket.created_at) }}</td>
              <td class="px-4 py-3 text-sm">
                <div class="flex items-center gap-2">
                  <button 
                    @click="viewRequest(ticket)"
                    class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-all duration-200 hover:scale-110 group"
                    title="View"
                  >
                    <Icon name="lucide:eye" class="w-4 h-4 transition-transform group-hover:scale-110" />
                  </button>
                  <button 
                    @click="editRequest(ticket)"
                    class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-all duration-200 hover:scale-110 group"
                    title="Edit"
                  >
                    <Icon name="lucide:pencil" class="w-4 h-4 transition-transform group-hover:rotate-12" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="requests.length === 0">
              <td colspan="8" class="px-4 py-8 text-center text-muted-foreground">
                No maintenance requests found
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
const API_BASE = 'http://localhost:8000/api/maintenance'

const searchQuery = ref('')
const statusFilter = ref('')
const priorityFilter = ref('')

// Fetch stats
const { data: statsData } = await useFetch(`${API_BASE}/requests/stats/`, {
  headers: authHeaders()
})

const stats = computed(() => statsData.value || {
  total: 0,
  open: 0,
  inProgress: 0,
  completed: 0,
  urgent: 0,
  highPriority: 0,
  overdue: 0
})

// Fetch requests
const { data, refresh } = await useFetch(() => {
  const params = new URLSearchParams()
  if (searchQuery.value) params.append('search', searchQuery.value)
  if (statusFilter.value) params.append('status', statusFilter.value)
  if (priorityFilter.value) params.append('priority', priorityFilter.value)
  return `${API_BASE}/requests/?${params.toString()}`
}, {
  headers: authHeaders(),
  watch: [statusFilter, priorityFilter]
})

const requests = computed(() => data.value || [])

// Update search with debounce
watch(searchQuery, debounce(() => {
  refresh()
}, 500))

const formatDate = (date: string | Date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const viewRequest = (ticket: any) => {
  navigateTo(`/admin/maintenance/${ticket.id}`)
}

const editRequest = (ticket: any) => {
  navigateTo(`/admin/maintenance/${ticket.id}/edit`)
}
</script>
