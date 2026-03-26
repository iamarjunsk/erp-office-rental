<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/maintenance" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div class="flex-1">
        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-bold">{{ request?.ticket_number }}</h1>
          <span 
            class="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
            :class="{
              'bg-blue-100 text-blue-700': request?.status === 'open',
              'bg-purple-100 text-purple-700': request?.status === 'assigned',
              'bg-amber-100 text-amber-700': request?.status === 'in_progress',
              'bg-yellow-100 text-yellow-700': request?.status === 'on_hold',
              'bg-green-100 text-green-700': request?.status === 'completed',
              'bg-gray-100 text-gray-700': request?.status === 'cancelled',
            }"
          >
            {{ request?.status?.replace('_', ' ') }}
          </span>
          <span 
            class="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
            :class="{
              'bg-gray-100 text-gray-700': request?.priority === 'low',
              'bg-blue-100 text-blue-700': request?.priority === 'medium',
              'bg-amber-100 text-amber-700': request?.priority === 'high',
              'bg-red-100 text-red-700': request?.priority === 'urgent',
            }"
          >
            {{ request?.priority }}
          </span>
        </div>
        <p class="text-muted-foreground mt-1">{{ request?.title }}</p>
      </div>
      <div class="flex gap-2">
        <button 
          v-if="request?.status === 'open'"
          @click="showAssignModal = true"
          class="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 hover:scale-105 group"
        >
          <Icon name="lucide:user-plus" class="w-4 h-4 transition-transform group-hover:scale-110" />
          <span class="group-hover:font-medium">Assign</span>
        </button>
        <button 
          v-if="request?.status === 'assigned'"
          @click="startWork"
          :disabled="updating"
          class="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-200 hover:scale-105 group disabled:opacity-50"
        >
          <Icon :name="updating ? 'lucide:loader-2' : 'lucide:play'" class="w-4 h-4 transition-transform group-hover:scale-110" :class="{ 'animate-spin': updating }" />
          <span class="group-hover:font-medium">{{ updating ? 'Starting...' : 'Start Work' }}</span>
        </button>
        <button 
          v-if="['assigned', 'in_progress', 'on_hold'].includes(request?.status)"
          @click="showCompleteModal = true"
          class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 hover:scale-105 group"
        >
          <Icon name="lucide:check-circle" class="w-4 h-4 transition-transform group-hover:scale-110" />
          <span class="group-hover:font-medium">Complete</span>
        </button>
        <NuxtLink 
          :to="`/admin/maintenance/${route.params.id}/edit`"
          class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-all duration-200 hover:scale-105 group"
        >
          <Icon name="lucide:pencil" class="w-4 h-4 transition-transform group-hover:rotate-12" />
          <span class="group-hover:font-medium">Edit</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="grid md:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="md:col-span-2 space-y-6">
        <!-- Description -->
        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Description</h2>
          <p class="text-muted-foreground whitespace-pre-line">{{ request?.description }}</p>
        </div>

        <!-- Location Details -->
        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Location</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-muted-foreground">Property</p>
              <p class="font-medium">{{ request?.property_details?.name }}</p>
            </div>
            <div v-if="request?.space_details">
              <p class="text-sm text-muted-foreground">Space</p>
              <p class="font-medium">{{ request?.space_details?.code }} - {{ request?.space_details?.name }}</p>
            </div>
            <div v-if="request?.specific_location">
              <p class="text-sm text-muted-foreground">Specific Location</p>
              <p class="font-medium">{{ request?.specific_location }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Category</p>
              <p class="font-medium">{{ request?.category_details?.name || 'Uncategorized' }}</p>
            </div>
          </div>
        </div>

        <!-- Tasks -->
        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">Tasks</h2>
            <button class="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted">
              <Icon name="lucide:plus" class="w-4 h-4" />
              Add Task
            </button>
          </div>
          <div v-if="request?.tasks?.length > 0" class="space-y-3">
            <div v-for="task in request.tasks" :key="task.id" class="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p class="font-medium">{{ task.description }}</p>
                <p class="text-sm text-muted-foreground">
                  {{ task.assigned_to_details?.first_name }} {{ task.assigned_to_details?.last_name }}
                </p>
              </div>
              <span 
                class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                :class="{
                  'bg-gray-100 text-gray-700': task.status === 'pending',
                  'bg-amber-100 text-amber-700': task.status === 'in_progress',
                  'bg-green-100 text-green-700': task.status === 'completed',
                }"
              >
                {{ task.status.replace('_', ' ') }}
              </span>
            </div>
          </div>
          <div v-else class="text-muted-foreground text-sm">
            No tasks added yet
          </div>
        </div>

        <!-- Comments -->
        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Comments</h2>
          <div v-if="request?.comments?.length > 0" class="space-y-3">
            <div v-for="comment in request.comments" :key="comment.id" class="p-3 border border-border rounded-lg">
              <div class="flex items-center justify-between mb-2">
                <span class="font-medium">{{ comment.author_details?.first_name }} {{ comment.author_details?.last_name }}</span>
                <span class="text-xs text-muted-foreground">{{ formatDateTime(comment.created_at) }}</span>
              </div>
              <p class="text-sm">{{ comment.comment }}</p>
              <span v-if="comment.is_internal" class="text-xs text-amber-600 mt-1 block">Internal note</span>
            </div>
          </div>
          <div v-else class="text-muted-foreground text-sm">
            No comments yet
          </div>
          
          <!-- Add Comment -->
          <div class="space-y-3 pt-4 border-t border-border">
            <textarea
              v-model="newComment"
              rows="3"
              placeholder="Add a comment..."
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 text-sm">
                <input v-model="isInternalComment" type="checkbox" class="rounded" />
                <span>Internal note</span>
              </label>
              <button 
                @click="addComment"
                :disabled="!newComment || addingComment"
                class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
              >
                {{ addingComment ? 'Adding...' : 'Add Comment' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Assignment -->
        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Assignment</h2>
          <div class="space-y-3">
            <div>
              <p class="text-sm text-muted-foreground">Reported By</p>
              <p class="font-medium">{{ request?.reported_by_details?.first_name }} {{ request?.reported_by_details?.last_name }}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Assigned To</p>
              <p class="font-medium" v-if="request?.assigned_to_details">
                {{ request?.assigned_to_details?.first_name }} {{ request?.assigned_to_details?.last_name }}
              </p>
              <p class="text-muted-foreground" v-else>Unassigned</p>
            </div>
            <div v-if="request?.vendor_name">
              <p class="text-sm text-muted-foreground">Vendor</p>
              <p class="font-medium">{{ request?.vendor_name }}</p>
              <p class="text-sm text-muted-foreground" v-if="request?.vendor_contact">{{ request?.vendor_contact }}</p>
            </div>
          </div>
        </div>

        <!-- Dates -->
        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Timeline</h2>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Reported</span>
              <span>{{ formatDateTime(request?.reported_date) }}</span>
            </div>
            <div class="flex justify-between" v-if="request?.scheduled_date">
              <span class="text-muted-foreground">Scheduled</span>
              <span>{{ formatDate(request?.scheduled_date) }}</span>
            </div>
            <div class="flex justify-between" v-if="request?.started_date">
              <span class="text-muted-foreground">Started</span>
              <span>{{ formatDateTime(request?.started_date) }}</span>
            </div>
            <div class="flex justify-between" v-if="request?.completed_date">
              <span class="text-muted-foreground">Completed</span>
              <span>{{ formatDateTime(request?.completed_date) }}</span>
            </div>
          </div>
        </div>

        <!-- Costs -->
        <div class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Costs</h2>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Estimated</span>
              <span>{{ formatCurrency(request?.estimated_cost) }}</span>
            </div>
            <div class="flex justify-between" v-if="request?.actual_cost">
              <span class="text-muted-foreground">Actual</span>
              <span>{{ formatCurrency(request?.actual_cost) }}</span>
            </div>
          </div>
        </div>

        <!-- Resolution -->
        <div v-if="request?.resolution_notes" class="bg-card border border-border rounded-lg p-6 space-y-4">
          <h2 class="text-lg font-semibold">Resolution</h2>
          <p class="text-sm text-muted-foreground whitespace-pre-line">{{ request?.resolution_notes }}</p>
        </div>
      </div>
    </div>

    <!-- Assign Modal -->
    <div v-if="showAssignModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-background rounded-lg p-6 w-full max-w-md mx-4">
        <h2 class="text-xl font-bold mb-4">Assign Request</h2>
        <form @submit.prevent="assignRequest" class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Assign To *</label>
            <select
              v-model="assignForm.assigned_to"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select User</option>
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.first_name }} {{ user.last_name }} ({{ user.email }})
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

    <!-- Complete Modal -->
    <div v-if="showCompleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-background rounded-lg p-6 w-full max-w-md mx-4">
        <h2 class="text-xl font-bold mb-4">Complete Request</h2>
        <form @submit.prevent="completeRequest" class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Actual Cost (Rs.)</label>
            <input
              v-model.number="completeForm.actual_cost"
              type="number"
              step="0.01"
              min="0"
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Resolution Notes</label>
            <textarea
              v-model="completeForm.resolution_notes"
              rows="3"
              placeholder="Describe what was done..."
              class="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div class="flex items-center gap-4 pt-4">
            <button 
              type="button"
              @click="showCompleteModal = false"
              class="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="completing"
              class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {{ completing ? 'Completing...' : 'Complete' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { toast } = useToast()
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { authHeaders } = useAuth()
const API_BASE = 'http://localhost:8000/api/maintenance'

const route = useRoute()
const updating = ref(false)
const showAssignModal = ref(false)
const showCompleteModal = ref(false)
const assigning = ref(false)
const completing = ref(false)
const addingComment = ref(false)
const newComment = ref('')
const isInternalComment = ref(false)

const { data: request, refresh } = await useFetch(`${API_BASE}/requests/${route.params.id}/`, {
  headers: authHeaders()
})

const { data: users } = await useFetch(`http://localhost:8000/api/users/`, {
  headers: authHeaders()
})

const assignForm = ref({
  assigned_to: ''
})

const completeForm = ref({
  actual_cost: null,
  resolution_notes: ''
})

const formatCurrency = (value: number) => {
  if (!value) return 'N/A'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
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

const assignRequest = async () => {
  assigning.value = true
  try {
    await $fetch(`${API_BASE}/requests/${route.params.id}/assign/`, {
      method: 'POST',
      headers: authHeaders(),
      body: assignForm.value
    })
    
    showAssignModal.value = false
    await refresh()
  } catch (e: any) {
    toast({ title: 'Error', description: 'Failed to assign request: ' + (e.data?.error || 'Unknown error'), variant: 'destructive' })
  } finally {
    assigning.value = false
  }
}

const startWork = async () => {
  updating.value = true
  try {
    await $fetch(`${API_BASE}/requests/${route.params.id}/start_work/`, {
      method: 'POST',
      headers: authHeaders()
    })
    
    await refresh()
  } catch (e: any) {
    toast({ title: 'Error', description: 'Failed to start work: ' + (e.data?.error || 'Unknown error'), variant: 'destructive' })
  } finally {
    updating.value = false
  }
}

const completeRequest = async () => {
  completing.value = true
  try {
    await $fetch(`${API_BASE}/requests/${route.params.id}/complete/`, {
      method: 'POST',
      headers: authHeaders(),
      body: completeForm.value
    })
    
    showCompleteModal.value = false
    await refresh()
  } catch (e: any) {
    toast({ title: 'Error', description: 'Failed to complete request: ' + (e.data?.error || 'Unknown error'), variant: 'destructive' })
  } finally {
    completing.value = false
  }
}

const addComment = async () => {
  if (!newComment.value) return
  
  addingComment.value = true
  try {
    await $fetch(`${API_BASE}/requests/${route.params.id}/add_comment/`, {
      method: 'POST',
      headers: authHeaders(),
      body: {
        comment: newComment.value,
        is_internal: isInternalComment.value
      }
    })
    
    newComment.value = ''
    isInternalComment.value = false
    await refresh()
  } catch (e: any) {
    toast({ title: 'Error', description: 'Failed to add comment: ' + (e.data?.error || 'Unknown error'), variant: 'destructive' })
  } finally {
    addingComment.value = false
  }
}
</script>
