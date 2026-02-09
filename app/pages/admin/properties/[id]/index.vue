<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/properties" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div class="flex-1">
        <h1 class="text-3xl font-bold">{{ property?.name }}</h1>
        <div class="flex items-center gap-2 text-muted-foreground mt-1">
          <Icon name="lucide:map-pin" class="w-4 h-4" />
          <span>{{ property?.city }}, {{ property?.state }}</span>
          <span class="mx-2">•</span>
          <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
            {{ property?.type.replace('_', ' ') }}
          </span>
        </div>
      </div>
      <NuxtLink 
        :to="`/admin/properties/${route.params.id}/edit`"
        class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
      >
        <Icon name="lucide:pencil" class="w-4 h-4" />
        Edit Property
      </NuxtLink>
    </div>

    <!-- Content Grid -->
    <div class="grid md:grid-cols-3 gap-6">
      <!-- Main Info -->
      <div class="md:col-span-2 space-y-6">
        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Property Details</h2>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <p class="text-sm text-muted-foreground">Property Code</p>
              <p class="font-medium">{{ property?.code }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Status</p>
              <span 
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1"
                :class="{
                  'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400': property?.status === 'active',
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400': property?.status === 'inactive',
                  'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400': property?.status === 'under_renovation',
                }"
              >
                {{ property?.status.replace('_', ' ') }}
              </span>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Total Area</p>
              <p class="font-medium">{{ property?.total_area?.toLocaleString() }} sqft</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Floors</p>
              <p class="font-medium">{{ property?.floors || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Build Year</p>
              <p class="font-medium">{{ property?.build_year || 'N/A' }}</p>
            </div>
          </div>
        </div>

        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Location</h2>
          <div class="space-y-4">
            <div>
              <p class="text-sm text-muted-foreground">Address</p>
              <p class="font-medium">{{ property?.address }}</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-muted-foreground">City</p>
                <p class="font-medium">{{ property?.city }}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">State</p>
                <p class="font-medium">{{ property?.state }}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">PIN Code</p>
                <p class="font-medium">{{ property?.pincode }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar Info -->
      <div class="space-y-6">
        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Management</h2>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="lucide:user" class="w-5 h-5 text-primary" />
            </div>
            <div>
              <p class="font-medium">
                {{ property?.manager_details ? `${property.manager_details.first_name} ${property.manager_details.last_name}` : 'Unassigned' }}
              </p>
              <p class="text-xs text-muted-foreground">Property Manager</p>
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
// Use hardcoded localhost for now matching verification success
const API_BASE = 'http://localhost:8000/api/properties'

const route = useRoute()
const { data: property } = await useFetch(`${API_BASE}/${route.params.id}/`, {
  headers: authHeaders()
})
</script>
