<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold">Maintenance & Tickets</h1>
        <p class="text-muted-foreground">Manage maintenance requests and tickets</p>
      </div>
      <button class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
        <Icon name="lucide:plus" class="w-4 h-4" />
        Create Ticket
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="grid gap-4 md:grid-cols-4">
      <div class="bg-card border border-border rounded-lg p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <Icon name="lucide:inbox" class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold">24</p>
            <p class="text-sm text-muted-foreground">Open Tickets</p>
          </div>
        </div>
      </div>
      <div class="bg-card border border-border rounded-lg p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
            <Icon name="lucide:clock" class="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p class="text-2xl font-bold">8</p>
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
            <p class="text-2xl font-bold">3</p>
            <p class="text-sm text-muted-foreground">Critical</p>
          </div>
        </div>
      </div>
      <div class="bg-card border border-border rounded-lg p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <Icon name="lucide:check-circle" class="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p class="text-2xl font-bold">156</p>
            <p class="text-sm text-muted-foreground">Resolved This Month</p>
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
        <option value="resolved">Resolved</option>
        <option value="closed">Closed</option>
      </select>
      <select v-model="priorityFilter" class="px-4 py-2 bg-card border border-border rounded-lg">
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
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
              <th class="px-4 py-3 text-left text-sm font-medium">Type</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Priority</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Status</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Created</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="ticket in tickets" :key="ticket.id" class="hover:bg-muted/50">
              <td class="px-4 py-3 text-sm font-medium">{{ ticket.ticketNumber }}</td>
              <td class="px-4 py-3 text-sm">{{ ticket.title }}</td>
              <td class="px-4 py-3 text-sm">{{ ticket.property?.name }}</td>
              <td class="px-4 py-3 text-sm capitalize">{{ ticket.type }}</td>
              <td class="px-4 py-3 text-sm">
                <span 
                  class="px-2 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-gray-100 text-gray-700': ticket.priority === 'low',
                    'bg-blue-100 text-blue-700': ticket.priority === 'medium',
                    'bg-amber-100 text-amber-700': ticket.priority === 'high',
                    'bg-red-100 text-red-700': ticket.priority === 'critical',
                  }"
                >
                  {{ ticket.priority }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm">
                <span 
                  class="px-2 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-blue-100 text-blue-700': ticket.status === 'open',
                    'bg-purple-100 text-purple-700': ticket.status === 'assigned',
                    'bg-amber-100 text-amber-700': ticket.status === 'in_progress',
                    'bg-green-100 text-green-700': ticket.status === 'resolved',
                    'bg-gray-100 text-gray-700': ticket.status === 'closed',
                  }"
                >
                  {{ ticket.status.replace('_', ' ') }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm">{{ formatDate(ticket.createdAt) }}</td>
              <td class="px-4 py-3 text-sm">
                <div class="flex items-center gap-2">
                  <button class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">
                    <Icon name="lucide:eye" class="w-4 h-4" />
                  </button>
                  <button class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">
                    <Icon name="lucide:pencil" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="tickets.length === 0">
              <td colspan="8" class="px-4 py-8 text-center text-muted-foreground">
                No tickets found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { data } = await useFetch('/api/tickets')
const tickets = computed(() => data.value?.data || [])

const searchQuery = ref('')
const statusFilter = ref('')
const priorityFilter = ref('')

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
</script>