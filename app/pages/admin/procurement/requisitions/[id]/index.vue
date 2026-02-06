<template>
  <div class="space-y-6" v-if="pr">
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/procurement/requisitions" class="p-2 hover:bg-muted rounded-full">
          <Icon name="lucide:arrow-left" class="w-5 h-5" />
        </NuxtLink>
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-3xl font-bold">{{ pr.prNumber }}</h1>
            <span class="px-3 py-1 text-sm rounded-full font-medium" :class="getStatusClass(pr.status)">
              {{ formatStatus(pr.status) }}
            </span>
          </div>
          <p class="text-muted-foreground">{{ pr.title }}</p>
        </div>
      </div>
      <div class="flex gap-2">
        <NuxtLink v-if="pr.status === 'draft'" :to="`/admin/procurement/requisitions/${route.params.id}/edit`"
          class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted">
          <Icon name="lucide:edit" class="w-4 h-4" />
          Edit
        </NuxtLink>
        <button v-if="pr.status === 'draft'" @click="submitForApproval"
          class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
          <Icon name="lucide:send" class="w-4 h-4" />
          Submit for Approval
        </button>
        <button v-if="pr.status === 'pending_approval'" @click="approveRequisition"
          class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <Icon name="lucide:check" class="w-4 h-4" />
          Approve
        </button>
        <button v-if="pr.status === 'pending_approval'" @click="rejectRequisition"
          class="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
          <Icon name="lucide:x" class="w-4 h-4" />
          Reject
        </button>
        <button v-if="pr.status === 'approved'" @click="convertToPO"
          class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
          <Icon name="lucide:arrow-right-circle" class="w-4 h-4" />
          Convert to PO
        </button>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Summary Cards -->
        <div class="grid md:grid-cols-3 gap-4">
          <div class="bg-card border border-border rounded-xl p-4">
            <div class="text-sm text-muted-foreground">Total Amount</div>
            <div class="text-2xl font-bold">₹{{ pr.totalEstimatedAmount?.toLocaleString() }}</div>
          </div>
          <div class="bg-card border border-border rounded-xl p-4">
            <div class="text-sm text-muted-foreground">Items</div>
            <div class="text-2xl font-bold">{{ pr.items?.length || 0 }}</div>
          </div>
          <div class="bg-card border border-border rounded-xl p-4">
            <div class="text-sm text-muted-foreground">Required By</div>
            <div class="text-2xl font-bold">{{ formatDate(pr.requiredDate) }}</div>
          </div>
        </div>

        <!-- Line Items -->
        <div class="bg-card border border-border rounded-xl overflow-hidden">
          <div class="p-4 border-b border-border">
            <h3 class="font-semibold">Line Items</h3>
          </div>
          <table class="w-full">
            <thead class="bg-muted/50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Item</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Qty</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Unit Price</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Total</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-for="item in pr.items" :key="item.id">
                <td class="px-4 py-3">
                  <div class="font-medium">{{ item.itemName }}</div>
                  <div class="text-xs text-muted-foreground">{{ item.description }}</div>
                </td>
                <td class="px-4 py-3">{{ item.quantity }} {{ item.unit }}</td>
                <td class="px-4 py-3">₹{{ item.estimatedUnitPrice?.toLocaleString() }}</td>
                <td class="px-4 py-3 text-right font-medium">₹{{ item.totalEstimatedPrice?.toLocaleString() }}</td>
              </tr>
            </tbody>
            <tfoot class="bg-muted/30">
              <tr>
                <td colspan="3" class="px-4 py-3 text-right font-medium">Total Estimated</td>
                <td class="px-4 py-3 text-right text-lg font-bold">₹{{ pr.totalEstimatedAmount?.toLocaleString() }}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Description -->
        <div class="bg-card border border-border rounded-xl p-6">
          <h3 class="font-semibold mb-3">Description</h3>
          <p class="text-muted-foreground">{{ pr.description || 'No description provided.' }}</p>
        </div>

        <!-- History -->
        <div class="bg-card border border-border rounded-xl p-6">
          <h3 class="font-semibold mb-4">Activity History</h3>
          <div class="space-y-4">
            <div v-for="(event, index) in pr.history" :key="index" class="flex gap-4">
              <div class="flex flex-col items-center">
                <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon :name="getHistoryIcon(event.action)" class="w-4 h-4 text-primary" />
                </div>
                <div v-if="index < pr.history.length - 1" class="w-px h-full bg-border mt-2"></div>
              </div>
              <div class="flex-1 pb-4">
                <div class="font-medium">{{ event.action }}</div>
                <div class="text-sm text-muted-foreground">by {{ event.user }} • {{ formatDateTime(event.timestamp) }}
                </div>
                <div v-if="event.notes" class="mt-1 text-sm bg-muted/50 p-2 rounded">{{ event.notes }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Requester Info -->
        <div class="bg-card border border-border rounded-xl p-6">
          <h3 class="font-semibold mb-4">Requester</h3>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span class="font-medium text-primary">{{ pr.requestedBy?.firstName?.[0] }}{{
                pr.requestedBy?.lastName?.[0] }}</span>
            </div>
            <div>
              <div class="font-medium">{{ pr.requestedBy?.firstName }} {{ pr.requestedBy?.lastName }}</div>
              <div class="text-sm text-muted-foreground">{{ pr.requestedBy?.email }}</div>
            </div>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Department</span>
              <span>{{ pr.department }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Requested</span>
              <span>{{ formatDate(pr.requestedAt) }}</span>
            </div>
          </div>
        </div>

        <!-- Details -->
        <div class="bg-card border border-border rounded-xl p-6">
          <h3 class="font-semibold mb-4">Details</h3>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Category</span>
              <span class="capitalize">{{ pr.category?.replace('_', ' ') }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Priority</span>
              <span class="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                :class="getPriorityClass(pr.priority)">
                {{ pr.priority }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Property</span>
              <span>{{ pr.property?.name }}</span>
            </div>
          </div>
        </div>

        <!-- Approver -->
        <div v-if="pr.approver || pr.approverId" class="bg-card border border-border rounded-xl p-6">
          <h3 class="font-semibold mb-4">Approval</h3>
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Icon name="lucide:check" class="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div class="font-medium">{{ pr.approver?.firstName }} {{ pr.approver?.lastName }}</div>
              <div class="text-xs text-muted-foreground">{{ formatDateTime(pr.approvedAt) }}</div>
            </div>
          </div>
          <div v-if="pr.approvalNotes" class="text-sm bg-muted/50 p-3 rounded-lg">
            {{ pr.approvalNotes }}
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

const route = useRoute()
const { data: pr } = await useFetch(`/api/procurement/requisitions/${route.params.id}`)

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

const getPriorityClass = (priority: string) => {
  const classes: Record<string, string> = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-amber-100 text-amber-700',
    urgent: 'bg-red-100 text-red-700',
  }
  return classes[priority] || 'bg-gray-100 text-gray-700'
}

const formatStatus = (status: string) => status?.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
const formatDate = (date: string) => date ? new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'
const formatDateTime = (date: string) => date ? new Date(date).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'

const getHistoryIcon = (action: string) => {
  const icons: Record<string, string> = {
    'Created': 'lucide:plus',
    'Submitted for Approval': 'lucide:send',
    'Submitted': 'lucide:send',
    'Approved': 'lucide:check',
    'Rejected': 'lucide:x',
  }
  return icons[action] || 'lucide:circle'
}

const approveRequisition = () => {
  console.log('Approving requisition...')
  alert('Requisition approved! (Mock)')
}

const rejectRequisition = () => {
  console.log('Rejecting requisition...')
  alert('Requisition rejected! (Mock)')
}

const convertToPO = () => {
  navigateTo(`/admin/procurement/purchase-orders/create?prId=${route.params.id}`)
}

const submitForApproval = () => {
  console.log('Submitting for approval...')
  alert('Requisition submitted for approval! (Mock)')
}
</script>
