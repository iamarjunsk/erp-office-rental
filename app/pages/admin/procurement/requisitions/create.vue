<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/procurement/requisitions" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-3xl font-bold">New Purchase Requisition</h1>
        <p class="text-muted-foreground">Create a new procurement request</p>
      </div>
    </div>

    <form @submit.prevent="submitRequisition" class="space-y-8">
      <!-- Basic Info -->
      <div class="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 class="text-lg font-semibold">Basic Information</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Requisition Title *</label>
            <input 
              v-model="form.title"
              type="text"
              placeholder="e.g., Office Furniture Q1"
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Category *</label>
            <select 
              v-model="form.category"
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select category</option>
              <option value="office_supplies">Office Supplies</option>
              <option value="equipment">Equipment</option>
              <option value="furniture">Furniture</option>
              <option value="it_hardware">IT Hardware</option>
              <option value="services">Services</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Priority *</label>
            <select 
              v-model="form.priority"
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Delivery Property *</label>
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
          <div class="space-y-2">
            <label class="text-sm font-medium">Required Date *</label>
            <input 
              v-model="form.requiredDate"
              type="date"
              class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Description</label>
          <textarea 
            v-model="form.description"
            rows="3"
            placeholder="Detailed description of procurement need..."
            class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          ></textarea>
        </div>
      </div>

      <!-- Line Items -->
      <div class="bg-card border border-border rounded-xl p-6 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Line Items</h2>
          <button 
            type="button"
            @click="addItem"
            class="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted"
          >
            <Icon name="lucide:plus" class="w-4 h-4" />
            Add Item
          </button>
        </div>

        <div class="space-y-4">
          <div 
            v-for="(item, index) in form.items" 
            :key="index"
            class="grid md:grid-cols-6 gap-4 p-4 bg-muted/50 rounded-lg items-end"
          >
            <div class="md:col-span-2 space-y-2">
              <label class="text-sm font-medium">Item Name *</label>
              <input 
                v-model="item.itemName"
                type="text"
                placeholder="Item name"
                class="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Qty *</label>
              <input 
                v-model.number="item.quantity"
                type="number"
                min="1"
                class="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                @input="calculateItemTotal(index)"
                required
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Unit *</label>
              <select 
                v-model="item.unit"
                class="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="pcs">Pieces</option>
                <option value="kg">Kilograms</option>
                <option value="ltr">Liters</option>
                <option value="box">Boxes</option>
                <option value="hours">Hours</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Est. Price (₹)</label>
              <input 
                v-model.number="item.estimatedUnitPrice"
                type="number"
                min="0"
                class="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                @input="calculateItemTotal(index)"
              />
            </div>
            <div class="flex items-center gap-2">
              <div class="flex-1">
                <label class="text-sm font-medium">Total</label>
                <div class="text-lg font-bold">₹{{ (item.totalEstimatedPrice || 0).toLocaleString() }}</div>
              </div>
              <button 
                type="button"
                @click="removeItem(index)"
                class="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                :disabled="form.items.length === 1"
              >
                <Icon name="lucide:trash-2" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Total -->
        <div class="flex justify-end pt-4 border-t border-border">
          <div class="text-right">
            <div class="text-sm text-muted-foreground">Total Estimated Amount</div>
            <div class="text-2xl font-bold">₹{{ totalAmount.toLocaleString() }}</div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-4">
        <button 
          type="button"
          @click="$router.back()"
          class="px-4 py-2 border border-border rounded-lg hover:bg-muted"
        >
          Cancel
        </button>
        <button 
          type="button"
          @click="saveAsDraft"
          class="px-4 py-2 border border-border rounded-lg hover:bg-muted"
          :disabled="saving"
        >
          Save as Draft
        </button>
        <button 
          type="submit"
          class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          :disabled="saving"
        >
          {{ saving ? 'Submitting...' : 'Submit for Approval' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { data: propertyData } = await useFetch('/api/properties')
const properties = computed(() => propertyData.value?.data || [])

const saving = ref(false)

const form = ref({
  title: '',
  category: '',
  priority: 'medium',
  propertyId: '',
  requiredDate: '',
  description: '',
  items: [
    { itemName: '', quantity: 1, unit: 'pcs', estimatedUnitPrice: 0, totalEstimatedPrice: 0 }
  ]
})

const totalAmount = computed(() => 
  form.value.items.reduce((sum, item) => sum + (item.totalEstimatedPrice || 0), 0)
)

const addItem = () => {
  form.value.items.push({ itemName: '', quantity: 1, unit: 'pcs', estimatedUnitPrice: 0, totalEstimatedPrice: 0 })
}

const removeItem = (index: number) => {
  if (form.value.items.length > 1) {
    form.value.items.splice(index, 1)
  }
}

const calculateItemTotal = (index: number) => {
  const item = form.value.items[index]
  item.totalEstimatedPrice = (item.quantity || 0) * (item.estimatedUnitPrice || 0)
}

const saveAsDraft = async () => {
  saving.value = true
  try {
    console.log('Saving as draft:', { ...form.value, status: 'draft', totalEstimatedAmount: totalAmount.value })
    await new Promise(r => setTimeout(r, 1000))
    navigateTo('/admin/procurement/requisitions')
  } finally {
    saving.value = false
  }
}

const submitRequisition = async () => {
  saving.value = true
  try {
    console.log('Submitting:', { ...form.value, status: 'pending_approval', totalEstimatedAmount: totalAmount.value })
    await new Promise(r => setTimeout(r, 1000))
    navigateTo('/admin/procurement/requisitions')
  } finally {
    saving.value = false
  }
}
</script>
