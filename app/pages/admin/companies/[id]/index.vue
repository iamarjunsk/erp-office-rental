<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/companies" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div class="flex-1">
        <h1 class="text-3xl font-bold">{{ company?.name }}</h1>
        <div class="flex items-center gap-2 text-muted-foreground mt-1">
          <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary uppercase">
            {{ company?.type.replace('_', ' ') }}
          </span>
          <span class="mx-2">•</span>
          <span>{{ company?.industry || 'No industry specified' }}</span>
        </div>
      </div>
      <NuxtLink 
        :to="`/admin/companies/${route.params.id}/edit`"
        class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
      >
        <Icon name="lucide:pencil" class="w-4 h-4" />
        Edit Company
      </NuxtLink>
    </div>

    <!-- Content Grid -->
    <div class="grid md:grid-cols-3 gap-6">
      <!-- Main Info -->
      <div class="md:col-span-2 space-y-6">
        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Company Details</h2>
          <div class="grid grid-cols-2 gap-6">
            <div>
              <p class="text-sm text-muted-foreground">Legal Name</p>
              <p class="font-medium">{{ company?.legal_name || company?.name }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Status</p>
              <span 
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1"
                :class="{
                  'bg-green-100 text-green-700': company?.status === 'active',
                  'bg-red-100 text-red-700': company?.status === 'inactive',
                  'bg-gray-100 text-gray-700': company?.status === 'blacklisted',
                }"
              >
                {{ company?.status }}
              </span>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">GSTIN</p>
              <p class="font-medium font-mono">{{ company?.gstin || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">PAN</p>
              <p class="font-medium font-mono">{{ company?.pan || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">CIN</p>
              <p class="font-medium font-mono">{{ company?.cin || 'N/A' }}</p>
            </div>
          </div>
        </div>

        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Location</h2>
          <div class="space-y-4">
            <div>
              <p class="text-sm text-muted-foreground">Address</p>
              <p class="font-medium">{{ company?.address || 'N/A' }}</p>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div>
                <p class="text-sm text-muted-foreground">City</p>
                <p class="font-medium">{{ company?.city || 'N/A' }}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">State</p>
                <p class="font-medium">{{ company?.state || 'N/A' }}</p>
              </div>
              <div>
                <p class="text-sm text-muted-foreground">PIN Code</p>
                <p class="font-medium">{{ company?.pincode || 'N/A' }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="company?.notes" class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Notes</h2>
          <p class="text-muted-foreground">{{ company.notes }}</p>
        </div>
      </div>

      <!-- Sidebar Info -->
      <div class="space-y-6">
        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Contact</h2>
          <div class="space-y-3">
            <div v-if="company?.email" class="flex items-center gap-3">
              <Icon name="lucide:mail" class="w-4 h-4 text-muted-foreground" />
              <a :href="`mailto:${company.email}`" class="text-primary hover:underline">{{ company.email }}</a>
            </div>
            <div v-if="company?.phone" class="flex items-center gap-3">
              <Icon name="lucide:phone" class="w-4 h-4 text-muted-foreground" />
              <span>{{ company.phone }}</span>
            </div>
            <div v-if="company?.website" class="flex items-center gap-3">
              <Icon name="lucide:globe" class="w-4 h-4 text-muted-foreground" />
              <a :href="company.website" target="_blank" class="text-primary hover:underline">{{ company.website }}</a>
            </div>
          </div>
        </div>

        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Credit Score</h2>
          <div class="flex items-center gap-3">
            <div class="flex-1 h-3 bg-muted rounded-full overflow-hidden">
              <div 
                class="h-full rounded-full transition-all"
                :class="{
                  'bg-red-500': (company?.credit_score || 0) < 50,
                  'bg-amber-500': (company?.credit_score || 0) >= 50 && (company?.credit_score || 0) < 75,
                  'bg-green-500': (company?.credit_score || 0) >= 75,
                }"
                :style="{ width: `${company?.credit_score || 0}%` }"
              />
            </div>
            <span class="text-lg font-bold">{{ company?.credit_score || 0 }}</span>
          </div>
          <p class="text-xs text-muted-foreground">
            {{ (company?.credit_score || 0) >= 75 ? 'Excellent' : (company?.credit_score || 0) >= 50 ? 'Good' : 'Poor' }}
          </p>
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
const API_BASE = 'http://localhost:8000/api/companies'

const route = useRoute()
const { data: company } = await useFetch(`${API_BASE}/${route.params.id}/`, {
  headers: authHeaders()
})
</script>
