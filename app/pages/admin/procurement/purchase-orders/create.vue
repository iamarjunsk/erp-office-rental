<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/procurement/purchase-orders" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-3xl font-bold">Create Purchase Order</h1>
        <p class="text-muted-foreground">
          <span v-if="fromPR">Convert PR {{ prData?.prNumber }} to Purchase Order</span>
          <span v-else>Create a new purchase order</span>
        </p>
      </div>
    </div>

    <form @submit.prevent="submitOrder" class="space-y-6">
      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Main Form -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Basic Info -->
          <div class="bg-card border border-border rounded-xl p-6 space-y-4">
            <h2 class="text-lg font-semibold">Order Information</h2>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-sm font-medium">Order Title *</label>
                <input 
                  v-model="form.title"
                  type="text"
                  placeholder="e.g., Office Supplies Order - Feb 2024"
                  class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium">Vendor *</label>
                <select 
                  v-model="form.vendorId"
                  class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select vendor</option>
                  <option v-for="vendor in vendors" :key="vendor.id" :value="vendor.id">
                    {{ vendor.name }} ({{ vendor.code }})
                  </option>
                </select>
              </div>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-sm font-medium">Expected Delivery Date *</label>
                <input 
                  v-model="form.expectedDeliveryDate"
                  type="date"
                  class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium">Delivery Location *</label>
                <select 
                  v-model="form.propertyId"
                  class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select property</option>
                  <option v-for="prop in properties" :key="prop.id" :value="prop.id">
                    {{ prop.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Line Items -->
          <div class="bg-card border border-border rounded-xl p-6 space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold">Order Items</h2>
              <button 
                type="button"
                @click="addItem"
                class="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Icon name="lucide:plus-circle" class="w-4 h-4" />
                Add Item
              </button>
            </div>

            <div class="space-y-4">
              <div 
                v-for="(item, index) in form.items" 
                :key="index"
                class="p-4 bg-muted/50 rounded-lg space-y-3"
              >
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium">Item {{ index + 1 }}</span>
                  <button 
                    v-if="form.items.length > 1"
                    type="button"
                    @click="removeItem(index)"
                    class="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Icon name="lucide:trash-2" class="w-4 h-4" />
                  </button>
                </div>
                <div class="grid md:grid-cols-5 gap-3">
                  <div class="md:col-span-2 space-y-1">
                    <label class="text-xs text-muted-foreground">Item Name *</label>
                    <input 
                      v-model="item.itemName"
                      type="text"
                      placeholder="Item name"
                      class="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg"
                      required
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="text-xs text-muted-foreground">Quantity *</label>
                    <input 
                      v-model.number="item.quantity"
                      type="number"
                      min="1"
                      class="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg"
                      required
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="text-xs text-muted-foreground">Unit</label>
                    <select 
                      v-model="item.unit"
                      class="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg"
                    >
                      <option value="pcs">Pieces</option>
                      <option value="kg">Kilograms</option>
                      <option value="ltr">Liters</option>
                      <option value="box">Boxes</option>
                      <option value="pack">Packs</option>
                    </select>
                  </div>
                  <div class="space-y-1">
                    <label class="text-xs text-muted-foreground">Unit Price (₹) *</label>
                    <input 
                      v-model.number="item.unitPrice"
                      type="number"
                      min="0"
                      placeholder="0"
                      class="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg"
                      required
                      @input="updateItemTotal(index)"
                    />
                  </div>
                </div>
                <div class="flex justify-between items-center pt-2 border-t border-border">
                  <span class="text-sm text-muted-foreground">Item Total</span>
                  <span class="font-medium">₹{{ (item.quantity * item.unitPrice).toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Terms -->
          <div class="bg-card border border-border rounded-xl p-6 space-y-4">
            <h2 class="text-lg font-semibold">Terms & Conditions</h2>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-sm font-medium">Payment Terms</label>
                <select 
                  v-model="form.paymentTerms"
                  class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="net_30">Net 30 Days</option>
                  <option value="net_15">Net 15 Days</option>
                  <option value="net_45">Net 45 Days</option>
                  <option value="cod">Cash on Delivery</option>
                  <option value="advance">Advance Payment</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium">Delivery Terms</label>
                <select 
                  v-model="form.deliveryTerms"
                  class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="door_delivery">Door Delivery</option>
                  <option value="ex_works">Ex Works</option>
                  <option value="fob">FOB</option>
                </select>
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Special Instructions</label>
              <textarea 
                v-model="form.specialInstructions"
                rows="3"
                placeholder="Any special delivery or handling instructions..."
                class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Order Summary -->
          <div class="bg-card border border-border rounded-xl p-6 space-y-4 sticky top-6">
            <h3 class="font-semibold">Order Summary</h3>
            <dl class="space-y-3 text-sm">
              <div class="flex justify-between">
                <dt class="text-muted-foreground">Subtotal</dt>
                <dd>₹{{ subtotal.toLocaleString() }}</dd>
              </div>
              <div class="flex justify-between items-center">
                <dt class="text-muted-foreground">Tax Rate (%)</dt>
                <dd>
                  <input 
                    v-model.number="form.taxRate"
                    type="number"
                    min="0"
                    max="100"
                    class="w-16 px-2 py-1 text-right bg-background border border-border rounded"
                  />
                </dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-muted-foreground">Tax Amount</dt>
                <dd>₹{{ taxAmount.toLocaleString() }}</dd>
              </div>
              <div class="flex justify-between items-center">
                <dt class="text-muted-foreground">Shipping (₹)</dt>
                <dd>
                  <input 
                    v-model.number="form.shippingCost"
                    type="number"
                    min="0"
                    class="w-20 px-2 py-1 text-right bg-background border border-border rounded"
                  />
                </dd>
              </div>
              <div class="flex justify-between pt-3 border-t border-border text-base font-semibold">
                <dt>Total Amount</dt>
                <dd class="text-primary">₹{{ totalAmount.toLocaleString() }}</dd>
              </div>
            </dl>

            <div class="pt-4 space-y-2">
              <button 
                type="submit"
                class="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                :disabled="saving"
              >
                {{ saving ? 'Creating...' : 'Create & Send to Vendor' }}
              </button>
              <button 
                type="button"
                @click="saveAsDraft"
                class="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted"
                :disabled="saving"
              >
                Save as Draft
              </button>
            </div>
          </div>

          <!-- From PR Info -->
          <div v-if="fromPR && prData" class="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-3">
            <div class="flex items-center gap-2 text-blue-700">
              <Icon name="lucide:file-text" class="w-5 h-5" />
              <span class="font-semibold">From Purchase Requisition</span>
            </div>
            <dl class="text-sm space-y-2">
              <div class="flex justify-between">
                <dt class="text-blue-600">PR Number</dt>
                <dd class="font-medium">{{ prData.prNumber }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-blue-600">Title</dt>
                <dd>{{ prData.title }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-blue-600">Estimated Amount</dt>
                <dd class="font-medium">₹{{ prData.totalEstimatedAmount?.toLocaleString() }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const route = useRoute()
const fromPR = computed(() => !!route.query.prId)
const { authHeaders } = useAuth()
const API_BASE = 'http://localhost:8000/api/procurement'

const { data: vendorData } = await useFetch(`${API_BASE}/vendors/`, {
  headers: authHeaders(),
})
const { data: propertyData } = await useFetch('/api/properties')

const prData = ref<any>(null)
if (fromPR.value) {
  const { data } = await useFetch(`${API_BASE}/requisitions/${route.query.prId}/convert_to_po/`, {
    headers: authHeaders(),
  })
  prData.value = data.value

  // Pre-populate form from PR
  if (prData.value) {
    setTimeout(() => {
      form.value.title = `PO for ${prData.value.title}`
      form.value.propertyId = prData.value.propertyId
      form.value.expectedDeliveryDate = prData.value.required_date
      form.value.items = prData.value.items?.map((item: any) => ({
        itemName: item.item_name,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit || 'pcs',
        unitPrice: parseFloat(item.estimated_unit_price) || 0
      })) || form.value.items
    }, 0)
  }
}

// Pre-populate vendor if passed in query
const fromVendor = computed(() => !!route.query.vendorId)
if (fromVendor.value) {
  setTimeout(() => {
    form.value.vendorId = route.query.vendorId as string
  }, 100)
}

const vendors = computed(() => vendorData.value?.results || vendorData.value || [])
const properties = computed(() => propertyData.value?.data || [])

const saving = ref(false)

const form = ref({
  title: '',
  vendorId: '',
  propertyId: '',
  expectedDeliveryDate: '',
  paymentTerms: 'net_30',
  deliveryTerms: 'door_delivery',
  specialInstructions: '',
  taxRate: 18,
  shippingCost: 0,
  items: [
    { itemName: '', quantity: 1, unit: 'pcs', unitPrice: 0 }
  ]
})

const addItem = () => {
  form.value.items.push({ itemName: '', quantity: 1, unit: 'pcs', unitPrice: 0 })
}

const removeItem = (index: number) => {
  form.value.items.splice(index, 1)
}

const updateItemTotal = (index: number) => {
  // Reactivity handles this
}

const subtotal = computed(() => 
  form.value.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
)

const taxAmount = computed(() => 
  Math.round(subtotal.value * (form.value.taxRate / 100))
)

const totalAmount = computed(() => 
  subtotal.value + taxAmount.value + form.value.shippingCost
)

const submitOrder = async () => {
  saving.value = true
  try {
    const payload = {
      pr: route.query.prId ? parseInt(route.query.prId as string) : null,
      vendor: parseInt(form.value.vendorId),
      title: form.value.title,
      terms: form.value.paymentTerms,
      delivery_date: form.value.expectedDeliveryDate,
      delivery_location: properties.value.find((p: any) => p.id === parseInt(form.value.propertyId))?.name || 'Door Delivery',
      tax_rate: form.value.taxRate,
      shipping_cost: form.value.shippingCost,
      discount: 0,
      notes: form.value.specialInstructions,
      items: form.value.items.map(item => ({
        item_name: item.itemName,
        description: '',
        quantity: item.quantity,
        unit: item.unit,
        unit_price: item.unitPrice
      }))
    }

    const { data, error } = await useFetch(`${API_BASE}/purchase-orders/`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })

    if (error.value) {
      console.error('Error creating PO:', error.value)
      return
    }

    // Send the PO if created successfully
    if (data.value?.id) {
      await useFetch(`${API_BASE}/purchase-orders/${data.value.id}/send/`, {
        method: 'POST',
        headers: authHeaders()
      })
    }

    navigateTo('/admin/procurement/purchase-orders')
  } finally {
    saving.value = false
  }
}

const saveAsDraft = async () => {
  saving.value = true
  try {
    const payload = {
      pr: route.query.prId ? parseInt(route.query.prId as string) : null,
      vendor: parseInt(form.value.vendorId),
      title: form.value.title,
      terms: form.value.paymentTerms,
      delivery_date: form.value.expectedDeliveryDate,
      delivery_location: properties.value.find((p: any) => p.id === parseInt(form.value.propertyId))?.name || 'Door Delivery',
      tax_rate: form.value.taxRate,
      shipping_cost: form.value.shippingCost,
      discount: 0,
      notes: form.value.specialInstructions,
      items: form.value.items.map(item => ({
        item_name: item.itemName,
        description: '',
        quantity: item.quantity,
        unit: item.unit,
        unit_price: item.unitPrice
      }))
    }

    const { error } = await useFetch(`${API_BASE}/purchase-orders/`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })

    if (error.value) {
      console.error('Error saving PO draft:', error.value)
      return
    }

    navigateTo('/admin/procurement/purchase-orders')
  } finally {
    saving.value = false
  }
}
</script>
