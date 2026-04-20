<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold">Properties</h1>
        <p class="text-muted-foreground">Manage your office properties</p>
      </div>
      <NuxtLink 
        to="/admin/properties/create"
        class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        <Plus class="w-4 h-4" />
        Add Property
      </NuxtLink>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search properties..."
          class="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <select 
        v-model="statusFilter"
        class="px-4 py-2 bg-card border border-border rounded-lg"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="under_renovation">Under Renovation</option>
      </select>
    </div>

    <!-- Properties Table -->
    <div class="bg-card border border-border rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-muted">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-medium">Code</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Name</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Type</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Location</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Area (sqft)</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Status</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Manager</th>
              <th class="px-4 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr 
              v-for="property in properties" 
              :key="property.id"
              class="hover:bg-muted/50"
            >
              <td class="px-4 py-3 text-sm font-medium">{{ property.code }}</td>
              <td class="px-4 py-3 text-sm">{{ property.name }}</td>
              <td class="px-4 py-3 text-sm">
                <span class="capitalize">{{ property.type.replace('_', ' ') }}</span>
              </td>
              <td class="px-4 py-3 text-sm">{{ property.city }}, {{ property.state }}</td>
              <td class="px-4 py-3 text-sm">{{ property.total_area?.toLocaleString() }}</td>
              <td class="px-4 py-3 text-sm">
                <span 
                  class="px-2 py-1 rounded-full text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400': property.status === 'active',
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400': property.status === 'inactive',
                    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400': property.status === 'under_renovation',
                  }"
                >
                  {{ property.status.replace('_', ' ') }}
                </span>
              </td>
              <td class="px-4 py-3 text-sm">
                {{ property.manager_details ? `${property.manager_details.first_name} ${property.manager_details.last_name}` : 'Unassigned' }}
              </td>
              <td class="px-4 py-3 text-sm">
                <div class="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger as-child>
                        <Button
                          variant="ghost"
                          size="icon"
                          class="text-muted-foreground hover:text-foreground"
                          aria-label="View property details"
                          @click="viewProperty(property)"
                        >
                          <Eye class="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>View property details</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger as-child>
                        <Button
                          variant="ghost"
                          size="icon"
                          class="text-muted-foreground hover:text-foreground"
                          aria-label="Edit property"
                          @click="editProperty(property)"
                        >
                          <Pencil class="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit property</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </td>
            </tr>
            <tr v-if="properties.length === 0">
              <td colspan="8" class="px-4 py-8 text-center text-muted-foreground">
                No properties found
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between px-4 py-3 border-t border-border">
        <p class="text-sm text-muted-foreground">
          Showing {{ pagination.start }} to {{ pagination.end }} of {{ pagination.total }} properties
        </p>
        <div class="flex items-center gap-2">
          <button 
            @click="page--"
            :disabled="page === 1"
            class="px-3 py-1 border border-border rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span class="text-sm">Page {{ page }} of {{ pagination.totalPages }}</span>
          <button 
            @click="page++"
            :disabled="page >= pagination.totalPages"
            class="px-3 py-1 border border-border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Eye, Pencil, Plus, Search } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'

// Simple debounce implementation since lodash-es is not available
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

const { getAccessToken, authHeaders } = useAuth()
const config = useRuntimeConfig()
// Use hardcoded localhost for now matching verification success
const API_BASE = 'http://localhost:8000/api/properties'

const page = ref(1)
const searchQuery = ref('')
const statusFilter = ref('')
const limit = 10

// Fetch with simplified URL structure matching DRF
const { data, pending: loading, refresh } = await useFetch(() => {
  const params = new URLSearchParams()
  if (page.value > 1) params.append('page', page.value.toString())
  if (searchQuery.value) params.append('search', searchQuery.value)
  if (statusFilter.value) params.append('status', statusFilter.value)
  return `${API_BASE}/?${params.toString()}`
}, {
  headers: authHeaders(),
  watch: [page, statusFilter] // Search handled by debounce separately
})

// Update search with debounce
 watch(searchQuery, debounce(() => {
  page.value = 1
  refresh()
}, 500))

// Handle DRF pagination structure - API returns plain array
const properties = computed(() => {
  const results = data.value?.results || data.value || []
  return Array.isArray(results) ? results : []
})
const totalCount = computed(() => {
  const count = data.value?.count || data.value?.length || 0
  return Array.isArray(data.value) ? data.value.length : count
})

const pagination = computed(() => ({
  start: (page.value - 1) * limit + 1,
  end: Math.min(page.value * limit, totalCount.value),
  total: totalCount.value,
  totalPages: Math.ceil(totalCount.value / limit)
}))

const viewProperty = (property: any) => {
  navigateTo(`/admin/properties/${property.id}`)
}

const editProperty = (property: any) => {
  navigateTo(`/admin/properties/${property.id}/edit`)
}
</script>