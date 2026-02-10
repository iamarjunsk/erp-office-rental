<template>
  <div class="space-y-6" v-if="po">
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/procurement/purchase-orders" class="p-2 hover:bg-muted rounded-full">
          <Icon name="lucide:arrow-left" class="w-5 h-5" />
        </NuxtLink>
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-3xl font-bold">{{ po.po_number }}</h1>
            <span 
              class="px-3 py-1 text-sm rounded-full font-medium"
              :class="getStatusClass(po.status)"
            >
              {{ formatStatus(po.status) }}
            </span>
          </div>
          <p class="text-muted-foreground">{{ po.title }}</p>
        </div>
      </div>
      <div class="flex gap-2">
        <button 
          @click="downloadPDF"
          class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted"
        >
          <Icon name="lucide:download" class="w-4 h-4" />
          Download PDF
        </button>
        <button
          v-if="po.status === 'draft'"
          @click="sendToVendor"
          :disabled="sending"
          class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          <Icon name="lucide:send" class="w-4 h-4" />
          {{ sending ? 'Sending...' : 'Send to Vendor' }}
        </button>
        <button 
          v-if="['sent', 'acknowledged', 'partially_received'].includes(po.status)"
          class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          @click="showReceiptModal = true"
        >
          <Icon name="lucide:package-check" class="w-4 h-4" />
          Record Receipt
        </button>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Summary Cards -->
        <div class="grid md:grid-cols-4 gap-4">
          <div class="bg-card border border-border rounded-xl p-4">
            <div class="text-sm text-muted-foreground">Subtotal</div>
            <div class="text-xl font-bold">₹{{ formatNumber(po.subtotal) }}</div>
          </div>
          <div class="bg-card border border-border rounded-xl p-4">
          <div class="text-sm text-muted-foreground">Tax ({{ po.tax_rate }}%)</div>
          <div class="text-xl font-bold">₹{{ formatNumber(po.tax_amount) }}</div>
        </div>
        <div class="bg-card border border-border rounded-xl p-4">
          <div class="text-sm text-muted-foreground">Shipping</div>
          <div class="text-xl font-bold">₹{{ formatNumber(po.shipping_cost) }}</div>
        </div>
        <div class="bg-card border border-border rounded-xl p-4 bg-primary/5">
          <div class="text-sm text-muted-foreground">Total</div>
          <div class="text-xl font-bold text-primary">₹{{ formatNumber(po.total_amount) }}</div>
        </div>
      </div>

      <!-- Line Items -->
      <div class="bg-card border border-border rounded-xl overflow-hidden">
        <div class="p-4 border-b border-border">
          <h3 class="font-semibold">Order Items</h3>
        </div>
        <table class="w-full">
          <thead class="bg-muted/50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Item</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Ordered</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Received</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Unit Price</th>
              <th class="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Total</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="item in po.items" :key="item.id">
              <td class="px-4 py-3">
                <div class="font-medium">{{ item.item_name }}</div>
                <div class="text-xs text-muted-foreground">{{ item.description }}</div>
              </td>
              <td class="px-4 py-3">{{ item.quantity }} {{ item.unit }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <span
                    :class="item.received_quantity === item.quantity ? 'text-green-600' : item.received_quantity > 0 ? 'text-amber-600' : 'text-gray-500'"
                  >
                    {{ item.received_quantity || 0 }}
                  </span>
                  <div v-if="item.received_quantity !== item.quantity" class="flex-1 bg-gray-200 rounded-full h-1.5 max-w-[60px]">
                    <div
                      class="h-1.5 rounded-full"
                      :class="item.received_quantity > 0 ? 'bg-amber-500' : 'bg-gray-300'"
                      :style="{ width: `${(item.received_quantity / item.quantity) * 100}%` }"
                    ></div>
                  </div>
                  <Icon v-if="item.received_quantity === item.quantity" name="lucide:check-circle" class="w-4 h-4 text-green-600" />
                </div>
              </td>
              <td class="px-4 py-3">₹{{ item.unit_price?.toLocaleString() }}</td>
              <td class="px-4 py-3 text-right font-medium">₹{{ item.total_price?.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Delivery Info -->
      <div class="bg-card border border-border rounded-xl p-6">
        <h3 class="font-semibold mb-4">Delivery Information</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <div class="text-sm text-muted-foreground mb-1">Delivery Date</div>
            <div class="font-medium">{{ formatDate(po.delivery_date) }}</div>
          </div>
          <div>
            <div class="text-sm text-muted-foreground mb-1">Delivery Location</div>
            <div class="font-medium">{{ po.delivery_location }}</div>
          </div>
          <div class="md:col-span-2" v-if="po.delivery_instructions">
            <div class="text-sm text-muted-foreground mb-1">Special Instructions</div>
            <div class="text-sm">{{ po.delivery_instructions }}</div>
          </div>
        </div>
      </div>

        <!-- History -->
        <div class="bg-card border border-border rounded-xl p-6">
          <h3 class="font-semibold mb-4">Activity History</h3>
          <div class="space-y-4">
            <div 
              v-for="(event, index) in po.history" 
              :key="index"
              class="flex gap-4"
            >
              <div class="flex flex-col items-center">
                <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon :name="getHistoryIcon(event.action)" class="w-4 h-4 text-primary" />
                </div>
                <div v-if="index < po.history.length - 1" class="w-px h-full bg-border mt-2"></div>
              </div>
              <div class="flex-1 pb-4">
                <div class="font-medium">{{ event.action }}</div>
                <div class="text-sm text-muted-foreground">by {{ event.user }} • {{ formatDateTime(event.timestamp) }}</div>
                <div v-if="event.notes" class="mt-1 text-sm bg-muted/50 p-2 rounded">{{ event.notes }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
        <div class="space-y-6">
        <!-- Vendor Info -->
        <div class="bg-card border border-border rounded-xl p-6">
          <h3 class="font-semibold mb-4">Vendor</h3>
            <div class="space-y-4">
            <div>
              <div class="font-medium text-lg">{{ po.vendor?.name }}</div>
              <div class="text-sm text-muted-foreground">{{ po.vendor?.address?.street }}, {{ po.vendor?.address?.city }}</div>
            </div>
            <div class="space-y-2 text-sm">
              <div class="flex items-center gap-2">
                <Icon name="lucide:user" class="w-4 h-4 text-muted-foreground" />
                <span>{{ po.vendor?.contact_name }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="lucide:mail" class="w-4 h-4 text-muted-foreground" />
                <a :href="`mailto:${po.vendor?.contact_email}`" class="text-primary hover:underline">{{ po.vendor?.contact_email }}</a>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="lucide:phone" class="w-4 h-4 text-muted-foreground" />
                <span>{{ po.vendor?.contact_phone }}</span>
              </div>
            </div>
            <div class="pt-2 border-t border-border text-sm">
              <div class="text-muted-foreground">GST Number</div>
              <div class="font-mono">{{ po.vendor?.gst_number }}</div>
            </div>
          </div>
        </div>

        <!-- Terms -->
        <div class="bg-card border border-border rounded-xl p-6">
          <h3 class="font-semibold mb-4">Terms</h3>
          <div class="space-y-3 text-sm">
            <div>
              <div class="text-muted-foreground">Payment Terms</div>
              <div>{{ po.terms }}</div>
            </div>
            <div v-if="po.payment_terms">
              <div class="text-muted-foreground">Payment Schedule</div>
              <div>{{ po.payment_terms }}</div>
            </div>
          </div>
        </div>

        <!-- Related PR -->
        <div v-if="po.pr" class="bg-card border border-border rounded-xl p-6">
          <h3 class="font-semibold mb-4">Related Requisition</h3>
          <NuxtLink
            :to="`/admin/procurement/requisitions/${po.pr?.id}`"
            class="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
          >
            <div class="font-medium text-primary">{{ po.pr.pr_number }}</div>
            <div class="text-sm text-muted-foreground">{{ po.pr.title }}</div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Receipt Modal -->
    <div 
      v-if="showReceiptModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="showReceiptModal = false"
    >
      <div class="bg-card rounded-xl w-full max-w-2xl m-4 max-h-[90vh] overflow-hidden">
        <div class="p-6 border-b border-border flex items-center justify-between">
          <h3 class="text-lg font-semibold">Record Goods Receipt</h3>
          <button @click="showReceiptModal = false" class="p-2 hover:bg-muted rounded-full">
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>
        <form @submit.prevent="submitReceipt" class="p-6 overflow-y-auto max-h-[60vh]">
          <div class="space-y-4">
            <div class="grid md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-sm font-medium">Receipt Date *</label>
                <input 
                  v-model="receiptForm.receiptDate"
                  type="date"
                  class="w-full px-4 py-2 bg-background border border-border rounded-lg"
                  required
                />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium">Delivery Note / GRN Number</label>
                <input 
                  v-model="receiptForm.grnNumber"
                  type="text"
                  placeholder="e.g., GRN-2024-001"
                  class="w-full px-4 py-2 bg-background border border-border rounded-lg"
                />
              </div>
            </div>

            <div class="border border-border rounded-lg overflow-hidden">
              <table class="w-full text-sm">
                <thead class="bg-muted/50">
                  <tr>
                    <th class="px-3 py-2 text-left">Item</th>
                    <th class="px-3 py-2 text-center">Ordered</th>
                    <th class="px-3 py-2 text-center">Previously Received</th>
                    <th class="px-3 py-2 text-center">Receive Now</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border">
                  <tr v-for="(item, index) in receiptForm.items" :key="index">
                    <td class="px-3 py-2">{{ item.itemName }}</td>
                    <td class="px-3 py-2 text-center">{{ item.orderedQty }}</td>
                    <td class="px-3 py-2 text-center">{{ item.previouslyReceived }}</td>
                    <td class="px-3 py-2">
                      <input 
                        v-model.number="item.receiveNow"
                        type="number"
                        min="0"
                        :max="item.orderedQty - item.previouslyReceived"
                        class="w-20 px-2 py-1 text-center bg-background border border-border rounded"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium">Notes</label>
              <textarea 
                v-model="receiptForm.notes"
                rows="2"
                placeholder="Any notes about the delivery..."
                class="w-full px-4 py-2 bg-background border border-border rounded-lg resize-none"
              ></textarea>
            </div>
          </div>
        </form>
        <div class="p-6 border-t border-border flex justify-end gap-3">
          <button type="button" @click="showReceiptModal = false" class="px-4 py-2 border border-border rounded-lg hover:bg-muted">
            Cancel
          </button>
          <button 
            @click="submitReceipt"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Record Receipt
          </button>
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
const { authHeaders } = useAuth()
const API_BASE = 'http://localhost:8000/api/procurement'

const { data: po, refresh: refreshPO } = await useFetch(`${API_BASE}/purchase-orders/${route.params.id}/`, {
  headers: authHeaders(),
})

const showReceiptModal = ref(false)
const sending = ref(false)

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700',
    sent: 'bg-blue-100 text-blue-700',
    acknowledged: 'bg-cyan-100 text-cyan-700',
    partially_received: 'bg-amber-100 text-amber-700',
    received: 'bg-green-100 text-green-700',
  }
  return classes[status] || 'bg-gray-100 text-gray-700'
}

const formatStatus = (status: string) => status?.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
const formatDate = (date: string) => date ? new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'
const formatDateTime = (date: string) => date ? new Date(date).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'
const formatNumber = (num: any) => Number(num || 0).toLocaleString('en-IN')

const getHistoryIcon = (action: string) => {
  const icons: Record<string, string> = {
    'Created': 'lucide:plus',
    'Submitted for Approval': 'lucide:send',
    'Approved': 'lucide:check',
    'Sent to Vendor': 'lucide:mail',
    'Acknowledged by Vendor': 'lucide:check-check',
  }
  return icons[action] || 'lucide:circle'
}

// Receipt form
const receiptForm = ref({
  receiptDate: new Date().toISOString().split('T')[0],
  grnNumber: '',
  notes: '',
  items: [] as { itemName: string; orderedQty: number; previouslyReceived: number; receiveNow: number }[]
})

// Initialize receipt form when modal opens
watch(showReceiptModal, (isOpen) => {
  if (isOpen && po.value?.items) {
    receiptForm.value.items = po.value.items.map((item: any) => ({
      itemName: item.item_name,
      orderedQty: item.quantity,
      previouslyReceived: item.received_quantity || 0,
      receiveNow: 0
    }))
  }
})

const submitReceipt = async () => {
  try {
    const items = receiptForm.value.items
      .filter(item => item.receiveNow > 0)
      .map(item => ({
        itemId: po.value?.items.find((i: any) => i.item_name === item.itemName)?.id,
        receivedQuantity: item.previouslyReceived + item.receiveNow
      }))

    const { error } = await useFetch(`${API_BASE}/purchase-orders/${route.params.id}/receive/`, {
      method: 'POST',
      headers: authHeaders(),
      body: { items }
    })

    if (error.value) {
      console.error('Error recording receipt:', error.value)
      return
    }

    showReceiptModal.value = false
    await refreshPO()
  } catch (err) {
    console.error('Error recording receipt:', err)
  }
}

const sendToVendor = async () => {
  sending.value = true
  try {
    const { error } = await useFetch(`${API_BASE}/purchase-orders/${route.params.id}/send/`, {
      method: 'POST',
      headers: authHeaders()
    })

    if (error.value) {
      console.error('Error sending PO:', error.value)
      return
    }

    await refreshPO()
  } finally {
    sending.value = false
  }
}

const downloadPDF = async () => {
  try {
    const response = await fetch(`${API_BASE}/purchase-orders/${route.params.id}/pdf/`, {
      headers: authHeaders(),
    })
    
    if (!response.ok) throw new Error('Failed to download PDF')
    
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = window.document.createElement('a')
    a.href = url
    a.download = `${po.value?.po_number || 'purchase-order'}.pdf`
    window.document.body.appendChild(a)
    a.click()
    window.document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  } catch (err) {
    console.error('Error downloading PDF:', err)
  }
}
</script>
