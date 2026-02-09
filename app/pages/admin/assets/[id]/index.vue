<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/assets" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div class="flex-1">
        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-bold">{{ asset?.name }}</h1>
          <span 
            class="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
            :class="getStatusClass(asset?.status)"
          >
            {{ asset?.status?.replace('_', ' ') }}
          </span>
        </div>
        <p class="text-muted-foreground mt-1">{{ asset?.asset_code }}</p>
      </div>
      <div class="flex gap-2">
        <button 
          v-if="asset?.assigned_to"
          @click="returnAsset"
          :disabled="returning"
          class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50"
        >
          <Icon :name="returning ? 'lucide:loader-2' : 'lucide:rotate-ccw'" class="w-4 h-4" :class="{ 'animate-spin': returning }" />
          {{ returning ? 'Returning...' : 'Return' }}
        </button>
        <button 
          v-else
          @click="showAssignModal = true"
          class="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Icon name="lucide:user-plus" class="w-4 h-4" />
          Assign
        </button>
        <NuxtLink 
          :to="`/admin/assets/${route.params.id}/edit`"
          class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted"
        >
          <Icon name="lucide:pencil" class="w-4 h-4" />
          Edit
        </NuxtLink>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="grid md:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="md:col-span-2 space-y-6">
        <!-- Description -->
        <div class="bg-card border border-border rounded-lg p-6">
          <h2 class="text-lg font-semibold mb-4">Description</h2>
          <p class="text-muted-foreground">{{ asset?.description || 'No description provided' }}</p>
        </div>

        <!-- Specifications -->
        <div class="bg-card border border-border rounded-lg p-6">
          <h2 class="text-lg font-semibold mb-4">Specifications</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-muted-foreground">Manufacturer</p>
              <p class="font-medium">{{ asset?.manufacturer || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Model Number</p>
              <p class="font-medium">{{ asset?.model_number || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Serial Number</p>
              <p class="font-medium">{{ asset?.serial_number || 'N/A' }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Condition</p>
              <p class="font-medium capitalize">{{ asset?.condition }}</p>
            </div>
          </div>
        </div>

        <!-- Maintenance History -->
        <div class="bg-card border border-border rounded-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold">Maintenance History</h2>
            <button 
              @click="showMaintenanceModal = true"
              class="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted"
            >
              <Icon name="lucide:plus" class="w-4 h-4" />
              Add Record
            </button>
          </div>
          <div v-if="asset?.maintenance_history?.length > 0" class="space-y-3">
            <div v-for="record in asset.maintenance_history" :key="record.id" class="p-3 border border-border rounded-lg">
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-medium">{{ record.description }}</p>
                  <p class="text-sm text-muted-foreground">{{ formatDate(record.maintenance_date) }}</p>
                </div>
                <p class="font-medium">{{ formatCurrency(record.cost) }}</p>
              </div>
            </div>
          </div>
          <div v-else class="text-muted-foreground text-sm">
            No maintenance records yet
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Location -->
        <div class="bg-card border border-border rounded-lg p-6">
          <h2 class="text-lg font-semibold mb-4">Location</h2>
          <div class="space-y-3">
            <div>
              <p class="text-sm text-muted-foreground">Property</p>
              <p class="font-medium">{{ asset?.property_details?.name }}</p>
            </div>
            <div v-if="asset?.space_details">
              <p class="text-sm text-muted-foreground">Space</p>
              <p class="font-medium">{{ asset?.space_details?.code }}</p>
            </div>
          </div>
        </div>

        <!-- Assignment -->
        <div class="bg-card border border-border rounded-lg p-6">
          <h2 class="text-lg font-semibold mb-4">Assignment</h2>
          <div v-if="asset?.assigned_to_details">
            <p class="text-sm text-muted-foreground">Assigned To</p>
            <p class="font-medium">{{ asset.assigned_to_details.first_name }} {{ asset.assigned_to_details.last_name }}</p>
          </div>
          <div v-else>
            <p class="text-muted-foreground">Not currently assigned</p>
          </div>
        </div>

        <!-- Purchase Info -->
        <div class="bg-card border border-border rounded-lg p-6">
          <h2 class="text-lg font-semibold mb-4">Purchase Information</h2>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Purchase Price</span>
              <span class="font-medium">{{ formatCurrency(asset?.purchase_price) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Purchase Date</span>
              <span>{{ formatDate(asset?.purchase_date) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Assign Modal -->
    <div v-if="showAssignModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-background rounded-lg p-6 w-full max-w-md mx-4">
        <h2 class="text-xl font-bold mb-4">Assign Asset</h2>
        <form @submit.prevent="assignAsset" class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Assign To *</label>
            <select
              v-model="assignForm.assigned_to"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select User</option>
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.first_name }} {{ user.last_name }}
              </option>
            </select>
          </div>
          <div class="flex items-center gap-4 pt-4">
            <button 
              type="button"
              @click="showAssignModal = false"
              class="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="assigning"
              class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {{ assigning ? 'Assigning...' : 'Assign' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Maintenance Modal -->
    <div v-if="showMaintenanceModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-background rounded-lg p-6 w-full max-w-md mx-4">
        <h2 class="text-xl font-bold mb-4">Add Maintenance Record</h2>
        <form @submit.prevent="addMaintenance" class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Date *</label>
            <input
              v-model="maintenanceForm.maintenance_date"
              type="date"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Description *</label>
            <textarea
              v-model="maintenanceForm.description"
              rows="3"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Cost (Rs.)</label>
            <input
              v-model.number="maintenanceForm.cost"
              type="number"
              step="0.01"
              min="0"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="flex items-center gap-4 pt-4">
            <button 
              type="button"
              @click="showMaintenanceModal = false"
              class="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="addingMaintenance"
              class="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {{ addingMaintenance ? 'Adding...' : 'Add' }}
            </button>
          </div>
        </form>
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
const API_BASE = 'http://localhost:8000/api/assets'

const route = useRoute()
const showAssignModal = ref(false)
const showMaintenanceModal = ref(false)
const assigning = ref(false)
const returning = ref(false)
const addingMaintenance = ref(false)

const { data: asset, refresh } = await useFetch(`${API_BASE}/assets/${route.params.id}/`, {
  headers: authHeaders()
})

const { data: users } = await useFetch(`http://localhost:8000/api/users/`, {
  headers: authHeaders()
})

const assignForm = ref({
  assigned_to: '',
  notes: ''
})

const maintenanceForm = ref({
  maintenance_date: new Date().toISOString().split('T')[0],
  description: '',
  cost: null,
  vendor_name: '',
  next_maintenance_date: ''
})

const formatCurrency = (value: number) => {
  if (!value) return 'N/A'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

const formatDate = (date: string | Date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    in_maintenance: 'bg-amber-100 text-amber-700',
    damaged: 'bg-red-100 text-red-700',
    disposed: 'bg-gray-100 text-gray-700',
    lost: 'bg-red-100 text-red-700',
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const assignAsset = async () => {
  assigning.value = true
  try {
    await $fetch(`${API_BASE}/assets/${route.params.id}/assign/`, {
      method: 'POST',
      headers: authHeaders(),
      body: assignForm.value
    })
    showAssignModal.value = false
    await refresh()
    assignForm.value = { assigned_to: '', notes: '' }
  } catch (e: any) {
    alert('Failed to assign asset')
  } finally {
    assigning.value = false
  }
}

const returnAsset = async () => {
  returning.value = true
  try {
    await $fetch(`${API_BASE}/assets/${route.params.id}/return_asset/`, {
      method: 'POST',
      headers: authHeaders()
    })
    await refresh()
  } catch (e: any) {
    alert('Failed to return asset')
  } finally {
    returning.value = false
  }
}

const addMaintenance = async () => {
  addingMaintenance.value = true
  try {
    await $fetch(`${API_BASE}/assets/${route.params.id}/add_maintenance/`, {
      method: 'POST',
      headers: authHeaders(),
      body: maintenanceForm.value
    })
    showMaintenanceModal.value = false
    await refresh()
    maintenanceForm.value = {
      maintenance_date: new Date().toISOString().split('T')[0],
      description: '',
      cost: null,
      vendor_name: '',
      next_maintenance_date: ''
    }
  } catch (e: any) {
    alert('Failed to add maintenance record')
  } finally {
    addingMaintenance.value = false
  }
}
</script>
