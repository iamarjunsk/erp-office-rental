<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/spaces" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div class="flex-1">
        <h1 class="text-3xl font-bold">{{ space?.name }}</h1>
        <div class="flex items-center gap-2 text-muted-foreground mt-1">
          <Icon name="lucide:building" class="w-4 h-4" />
          <span>{{ space?.property_details?.name }}</span>
          <span class="mx-2">•</span>
          <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
            {{ space?.type.replace('_', ' ') }}
          </span>
        </div>
      </div>
      <NuxtLink 
        :to="`/admin/spaces/${route.params.id}/edit`"
        class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
      >
        <Icon name="lucide:pencil" class="w-4 h-4" />
        Edit Space
      </NuxtLink>
    </div>

    <!-- Content Grid -->
    <div class="grid md:grid-cols-3 gap-6">
      <!-- Main Info -->
      <div class="md:col-span-2 space-y-6">
        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Space Details</h2>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <p class="text-sm text-muted-foreground">Space Code</p>
              <p class="font-medium">{{ space?.code }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Status</p>
              <span 
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1"
                :class="{
                  'bg-green-100 text-green-700': space?.current_status === 'available',
                  'bg-blue-100 text-blue-700': space?.current_status === 'occupied',
                  'bg-amber-100 text-amber-700': space?.current_status === 'maintenance',
                  'bg-purple-100 text-purple-700': space?.current_status === 'reserved',
                }"
              >
                {{ space?.current_status }}
              </span>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Floor</p>
              <p class="font-medium">{{ space?.floor }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Area</p>
              <p class="font-medium">{{ Number(space?.area).toLocaleString() }} sqft</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Capacity</p>
              <p class="font-medium">{{ space?.capacity || 'N/A' }} people</p>
            </div>
          </div>
        </div>

        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Pricing</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-muted-foreground">Base Rent (Monthly)</p>
              <p class="font-medium">{{ formatCurrency(space?.base_rent) }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Price Per Day</p>
              <p class="font-medium">{{ formatCurrency(space?.price_per_day) }}</p>
            </div>
          </div>
        </div>

        <div v-if="space?.amenities?.length" class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Amenities</h2>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="amenity in space.amenities" 
              :key="amenity"
              class="px-3 py-1 bg-muted rounded-full text-sm"
            >
              {{ amenity }}
            </span>
          </div>
        </div>

        <div v-if="space?.description" class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Description</h2>
          <p class="text-muted-foreground">{{ space.description }}</p>
        </div>
      </div>

      <!-- Sidebar Info -->
      <div class="space-y-6">
        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Property</h2>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="lucide:building-2" class="w-5 h-5 text-primary" />
            </div>
            <div>
              <p class="font-medium">{{ space?.property_details?.name }}</p>
              <p class="text-xs text-muted-foreground">{{ space?.property_details?.code }}</p>
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
const API_BASE = 'http://localhost:8000/api/spaces'

const route = useRoute()
const { data: space } = await useFetch(`${API_BASE}/${route.params.id}/`, {
  headers: authHeaders()
})

const formatCurrency = (value: number | null) => {
  if (!value) return '-'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}
</script>
