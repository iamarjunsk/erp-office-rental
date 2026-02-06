<template>
    <div class="space-y-6" v-if="asset">
        <!-- Header -->
        <div class="flex items-center gap-4">
            <NuxtLink :to="`/admin/assets/${route.params.id}`" class="p-2 hover:bg-muted rounded-full">
                <Icon name="lucide:arrow-left" class="w-5 h-5" />
            </NuxtLink>
            <div>
                <h1 class="text-3xl font-bold">Edit Asset</h1>
                <p class="text-muted-foreground">{{ asset.assetNumber }} • {{ asset.name }}</p>
            </div>
        </div>

        <form @submit.prevent="saveAsset" class="space-y-6">
            <!-- Basic Information -->
            <div class="bg-card border border-border rounded-xl p-6">
                <h3 class="text-lg font-semibold mb-4">Basic Information</h3>
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <label class="text-sm font-medium">Asset Name *</label>
                        <input v-model="form.name" type="text"
                            class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            required />
                    </div>
                    <div>
                        <label class="text-sm font-medium">Asset Number</label>
                        <input v-model="form.assetNumber" type="text"
                            class="w-full mt-1 px-4 py-2 bg-muted border border-border rounded-lg" disabled />
                    </div>
                    <div>
                        <label class="text-sm font-medium">Category *</label>
                        <select v-model="form.categoryId"
                            class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" required>
                            <option value="">Select category</option>
                            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-sm font-medium">Subcategory</label>
                        <input v-model="form.subcategory" type="text"
                            class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
                    </div>
                    <div>
                        <label class="text-sm font-medium">Make</label>
                        <input v-model="form.make" type="text"
                            class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
                    </div>
                    <div>
                        <label class="text-sm font-medium">Model</label>
                        <input v-model="form.model" type="text"
                            class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
                    </div>
                    <div>
                        <label class="text-sm font-medium">Serial Number</label>
                        <input v-model="form.serialNumber" type="text"
                            class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg font-mono" />
                    </div>
                    <div>
                        <label class="text-sm font-medium">Condition</label>
                        <select v-model="form.condition"
                            class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg">
                            <option value="excellent">Excellent</option>
                            <option value="good">Good</option>
                            <option value="fair">Fair</option>
                            <option value="poor">Poor</option>
                        </select>
                    </div>
                </div>
                <div class="mt-4">
                    <label class="text-sm font-medium">Description</label>
                    <textarea v-model="form.description" rows="3"
                        class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg resize-none"></textarea>
                </div>
            </div>

            <!-- Location & Assignment -->
            <div class="bg-card border border-border rounded-xl p-6">
                <h3 class="text-lg font-semibold mb-4">Location & Assignment</h3>
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <label class="text-sm font-medium">Property</label>
                        <select v-model="form.propertyId"
                            class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg">
                            <option value="">Select property</option>
                            <option value="1">Cyber Towers</option>
                            <option value="2">IT Park Main</option>
                            <option value="3">Business Hub</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-sm font-medium">Location Details</label>
                        <input v-model="form.location" type="text" placeholder="e.g., Floor 3, Desk 42"
                            class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
                    </div>
                    <div>
                        <label class="text-sm font-medium">Status</label>
                        <select v-model="form.status"
                            class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg">
                            <option value="in_use">In Use</option>
                            <option value="available">Available</option>
                            <option value="under_maintenance">Under Maintenance</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Financial Information -->
            <div class="bg-card border border-border rounded-xl p-6">
                <h3 class="text-lg font-semibold mb-4">Financial Information</h3>
                <div class="grid md:grid-cols-3 gap-4">
                    <div>
                        <label class="text-sm font-medium">Purchase Price (₹)</label>
                        <input v-model.number="form.purchasePrice" type="number"
                            class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
                    </div>
                    <div>
                        <label class="text-sm font-medium">Purchase Date</label>
                        <input v-model="form.purchaseDate" type="date"
                            class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
                    </div>
                    <div>
                        <label class="text-sm font-medium">Warranty Expiry</label>
                        <input v-model="form.warrantyExpiry" type="date"
                            class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
                    </div>
                    <div>
                        <label class="text-sm font-medium">Depreciation Method</label>
                        <select v-model="form.depreciationMethod"
                            class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg">
                            <option value="straight_line">Straight Line</option>
                            <option value="declining_balance">Declining Balance</option>
                            <option value="sum_of_years">Sum of Years</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-sm font-medium">Useful Life (Years)</label>
                        <input v-model.number="form.usefulLife" type="number"
                            class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
                    </div>
                    <div>
                        <label class="text-sm font-medium">Salvage Value (₹)</label>
                        <input v-model.number="form.salvageValue" type="number"
                            class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
                    </div>
                </div>
            </div>

            <!-- Form Actions -->
            <div class="flex justify-end gap-3">
                <NuxtLink :to="`/admin/assets/${route.params.id}`"
                    class="px-6 py-2 border border-border rounded-lg hover:bg-muted">
                    Cancel
                </NuxtLink>
                <button type="submit"
                    class="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                    Save Changes
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

const route = useRoute()
const { data: asset } = await useFetch(`/api/assets/${route.params.id}`)
const { data: categoriesData } = await useFetch('/api/assets/categories')

const categories = computed(() => categoriesData.value || [])

const form = ref({
    name: '',
    assetNumber: '',
    categoryId: '',
    subcategory: '',
    make: '',
    model: '',
    serialNumber: '',
    condition: 'good',
    description: '',
    propertyId: '',
    location: '',
    status: 'in_use',
    purchasePrice: 0,
    purchaseDate: '',
    warrantyExpiry: '',
    depreciationMethod: 'straight_line',
    usefulLife: 5,
    salvageValue: 0,
})

// Pre-populate form with existing asset data
watchEffect(() => {
    if (asset.value) {
        form.value = {
            name: asset.value.name || '',
            assetNumber: asset.value.assetNumber || '',
            categoryId: asset.value.categoryId || '',
            subcategory: asset.value.subcategory || '',
            make: asset.value.make || '',
            model: asset.value.model || '',
            serialNumber: asset.value.serialNumber || '',
            condition: asset.value.condition || 'good',
            description: asset.value.description || '',
            propertyId: asset.value.propertyId || '',
            location: asset.value.location || '',
            status: asset.value.status || 'in_use',
            purchasePrice: asset.value.purchasePrice || 0,
            purchaseDate: asset.value.purchaseDate?.split('T')[0] || '',
            warrantyExpiry: asset.value.warrantyExpiry?.split('T')[0] || '',
            depreciationMethod: asset.value.depreciationMethod || 'straight_line',
            usefulLife: asset.value.usefulLife || 5,
            salvageValue: asset.value.salvageValue || 0,
        }
    }
})

const saveAsset = () => {
    console.log('Saving asset:', form.value)
    alert('Asset updated successfully! (Mock)')
    navigateTo(`/admin/assets/${route.params.id}`)
}
</script>
