<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold">Spaces</h1>
        <p class="text-muted-foreground">Manage office spaces and meeting rooms</p>
      </div>
      <NuxtLink 
        to="/admin/spaces/create"
        class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
      >
        <Icon name="lucide:plus" class="w-4 h-4" />
        Add Space
      </NuxtLink>
    </div>

    <div class="flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search spaces..."
          class="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <select v-model="statusFilter" class="px-4 py-2 bg-card border border-border rounded-lg">
        <option value="">All Status</option>
        <option value="available">Available</option>
        <option value="occupied">Occupied</option>
        <option value="maintenance">Maintenance</option>
        <option value="reserved">Reserved</option>
      </select>
      <select v-model="typeFilter" class="px-4 py-2 bg-card border border-border rounded-lg">
        <option value="">All Types</option>
        <option value="private_office">Private Office</option>
        <option value="open_desk">Open Desk</option>
        <option value="meeting_room">Meeting Room</option>
        <option value="virtual_office">Virtual Office</option>
        <option value="hot_desk">Hot Desk</option>
      </select>
    </div>

    <div class="bg-card border border-border rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-muted">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-medium">Code</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Property</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Type</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Floor</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Area</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Capacity</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Base Rent</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Status</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="space in spaces" :key="space.id" class="hover:bg-muted/50">
              <td class="px-4 py-3 text-sm font-medium">{{ space.code }}</td>
              <td class="px-4 py-3 text-sm">{{ space.property_details?.name }}</td>
              <td class="px-4 py-3 text-sm capitalize">{{ space.type.replace('_', ' ') }}</td>
              <td class="px-4 py-3 text-sm">{{ space.floor }}</td>
              <td class="px-4 py-3 text-sm">{{ Number(space.area).toLocaleString() }} sqft</td>
              <td class="px-4 py-3 text-sm">{{ space.capacity || '-' }}</td>
              <td class="px-4 py-3 text-sm">{{ formatCurrency(space.base_rent) }}</td>
              <td class="px-4 py-3 text-sm">
                <span 
                  class="px-2 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-700': space.current_status === 'available',
                    'bg-blue-100 text-blue-700': space.current_status === 'occupied',
                    'bg-amber-100 text-amber-700': space.current_status === 'maintenance',
                    'bg-purple-100 text-purple-700': space.current_status === 'reserved',
                  }"
                >
                  {{ space.current_status }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm">
                <div class="flex items-center gap-2">
                  <button 
                    @click="viewSpace(space)"
                    class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted"
                  >
                    <Icon name="lucide:eye" class="w-4 h-4" />
                  </button>
                  <button 
                    @click="editSpace(space)"
                    class="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted"
                  >
                    <Icon name="lucide:pencil" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="spaces.length === 0">
              <td colspan="9" class="px-4 py-8 text-center text-muted-foreground">
                No spaces found
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
const API_BASE = 'http://localhost:8000/api/spaces'

const searchQuery = ref('')
const statusFilter = ref('')
const typeFilter = ref('')

// Fetch spaces with filters
const { data, pending: loading, refresh } = await useFetch(() => {
  const params = new URLSearchParams()
  if (searchQuery.value) params.append('search', searchQuery.value)
  if (statusFilter.value) params.append('status', statusFilter.value)
  if (typeFilter.value) params.append('type', typeFilter.value)
  return `${API_BASE}/?${params.toString()}`
}, {
  headers: authHeaders(),
  watch: [statusFilter, typeFilter]
})

const spaces = computed(() => data.value || [])

// Update search with debounce
watch(searchQuery, debounce(() => {
  refresh()
}, 500))

const formatCurrency = (value: number | null) => {
  if (!value) return '-'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

const viewSpace = (space: any) => {
  navigateTo(`/admin/spaces/${space.id}`)
}

const editSpace = (space: any) => {
  navigateTo(`/admin/spaces/${space.id}/edit`)
}
</script>
