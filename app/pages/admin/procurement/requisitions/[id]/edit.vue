<template>
  <div class="space-y-6" v-if="requisition">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <NuxtLink :to="`/admin/procurement/requisitions/${route.params.id}`" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-3xl font-bold">Edit Requisition</h1>
        <p class="text-muted-foreground">{{ requisition.prNumber }} - {{ requisition.title }}</p>
      </div>
    </div>

    <form @submit.prevent="submitForm" class="grid lg:grid-cols-3 gap-6">
      <!-- Main Form -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Basic Info -->
        <div class="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 class="font-semibold">Basic Information</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="md:col-span-2 space-y-2">
              <label class="text-sm font-medium">Title *</label>
              <input 
                v-model="form.title"
                type="text"
                class="w-full px-4 py-2 bg-background border border-border rounded-lg"
                required
              />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Category *</label>
              <select v-model="form.category" class="w-full px-4 py-2 bg-background border border-border rounded-lg" required>
                <option value="furniture">Furniture</option>
                <option value="it_hardware">IT Hardware</option>
                <option value="office_supplies">Office Supplies</option>
                <option value="cleaning_supplies">Cleaning Supplies</option>
                <option value="maintenance">Maintenance</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Priority *</label>
              <select v-model="form.priority" class="w-full px-4 py-2 bg-background border border-border rounded-lg" required>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Delivery Location *</label>
              <select v-model="form.propertyId" class="w-full px-4 py-2 bg-background border border-border rounded-lg" required>
                <option value="1">Innovation Hub</option>
                <option value="2">Tech Park Tower</option>
                <option value="3">Business Plaza</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Required By Date</label>
              <input 
                v-model="form.requiredDate"
                type="date"
                class="w-full px-4 py-2 bg-background border border-border rounded-lg"
              />
            </div>
            <div class="md:col-span-2 space-y-2">
              <label class="text-sm font-medium">Description / Justification</label>
              <textarea 
                v-model="form.description"
                rows="3"
                class="w-full px-4 py-2 bg-background border border-border rounded-lg resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Line Items -->
        <div class="bg-card border border-border rounded-xl p-6 space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold">Line Items</h3>
            <button type="button" @click="addItem" class="flex items-center gap-2 text-sm text-primary hover:underline">
              <Icon name="lucide:plus" class="w-4 h-4" />
              Add Item
            </button>
          </div>

          <div 
            v-for="(item, index) in form.items" 
            :key="index"
            class="p-4 bg-muted/30 rounded-lg space-y-4"
          >
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">Item {{ index + 1 }}</span>
              <button 
                v-if="form.items.length > 1"
                type="button" 
                @click="removeItem(index)" 
                class="text-red-500 hover:text-red-700"
              >
                <Icon name="lucide:trash-2" class="w-4 h-4" />
              </button>
            </div>
            <div class="grid md:grid-cols-4 gap-4">
              <div class="md:col-span-2 space-y-2">
                <label class="text-xs text-muted-foreground">Item Name *</label>
                <input 
                  v-model="item.itemName"
                  type="text"
                  class="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
                  required
                />
              </div>
              <div class="space-y-2">
                <label class="text-xs text-muted-foreground">Quantity *</label>
                <input 
                  v-model.number="item.quantity"
                  type="number"
                  min="1"
                  class="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
                  @input="calculateItemTotal(index)"
                  required
                />
              </div>
              <div class="space-y-2">
                <label class="text-xs text-muted-foreground">Unit</label>
                <select v-model="item.unit" class="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm">
                  <option value="pcs">Pieces</option>
                  <option value="sets">Sets</option>
                  <option value="boxes">Boxes</option>
                  <option value="kg">Kilograms</option>
                  <option value="liters">Liters</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-xs text-muted-foreground">Est. Unit Price (₹)</label>
                <input 
                  v-model.number="item.estimatedUnitPrice"
                  type="number"
                  min="0"
                  class="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
                  @input="calculateItemTotal(index)"
                />
              </div>
              <div class="md:col-span-3 text-right text-sm text-muted-foreground">
                Item Total: <span class="font-medium text-foreground">₹{{ item.totalEstimatedPrice?.toLocaleString() || 0 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Summary -->
        <div class="bg-card border border-border rounded-xl p-6 space-y-4 sticky top-6">
          <h3 class="font-semibold">Summary</h3>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Items</span>
              <span class="font-medium">{{ form.items.length }}</span>
            </div>
            <div class="flex justify-between border-t border-border pt-3">
              <span class="text-muted-foreground">Total Estimated Amount</span>
              <span class="text-lg font-bold text-primary">₹{{ totalAmount.toLocaleString() }}</span>
            </div>
          </div>
          <div class="pt-4 border-t border-border space-y-3">
            <button 
              type="submit"
              class="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
            >
              Update Requisition
            </button>
            <NuxtLink 
              :to="`/admin/procurement/requisitions/${route.params.id}`"
              class="block w-full py-3 text-center border border-border rounded-lg hover:bg-muted"
            >
              Cancel
            </NuxtLink>
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
const router = useRouter()

const { data: requisition } = await useFetch(`/api/procurement/requisitions/${route.params.id}`)

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

// Populate form with existing data
watchEffect(() => {
  if (requisition.value) {
    const r = requisition.value as any
    form.value = {
      title: r.title || '',
      category: r.category || '',
      priority: r.priority || 'medium',
      propertyId: r.propertyId?.toString() || '',
      requiredDate: r.requiredDate || '',
      description: r.description || '',
      items: r.items?.map((item: any) => ({
        itemName: item.itemName,
        quantity: item.quantity,
        unit: item.unit,
        estimatedUnitPrice: item.estimatedUnitPrice,
        totalEstimatedPrice: item.totalEstimatedPrice
      })) || [{ itemName: '', quantity: 1, unit: 'pcs', estimatedUnitPrice: 0, totalEstimatedPrice: 0 }]
    }
  }
})

const totalAmount = computed(() => {
  return form.value.items.reduce((sum, item) => sum + (item.totalEstimatedPrice || 0), 0)
})

const addItem = () => {
  form.value.items.push({ itemName: '', quantity: 1, unit: 'pcs', estimatedUnitPrice: 0, totalEstimatedPrice: 0 })
}

const removeItem = (index: number) => {
  form.value.items.splice(index, 1)
}

const calculateItemTotal = (index: number) => {
  const item = form.value.items[index]
  item.totalEstimatedPrice = item.quantity * item.estimatedUnitPrice
}

const submitForm = () => {
  console.log('Updating requisition:', form.value)
  alert('Requisition updated successfully! (Mock)')
  router.push(`/admin/procurement/requisitions/${route.params.id}`)
}
</script>
