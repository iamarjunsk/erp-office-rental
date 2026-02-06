<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/companies" class="p-2 hover:bg-muted rounded-full">
        <Icon name="lucide:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <div>
        <h1 class="text-3xl font-bold">Add Company</h1>
        <p class="text-muted-foreground">Register a new tenant company</p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="max-w-2xl space-y-8">
      <div class="space-y-4">
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="space-y-2">
            <label class="text-sm font-medium">Company Name</label>
            <input type="text" v-model="form.name" class="w-full px-3 py-2 bg-background border border-border rounded-lg" required />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Legal Name</label>
            <input type="text" v-model="form.legalName" class="w-full px-3 py-2 bg-background border border-border rounded-lg" required />
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="space-y-2">
            <label class="text-sm font-medium">Type</label>
            <select v-model="form.type" class="w-full px-3 py-2 bg-background border border-border rounded-lg">
              <option value="technology">Technology</option>
              <option value="financial">Financial</option>
              <option value="healthcare">Healthcare</option>
              <option value="retail">Retail</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Industry</label>
            <input type="text" v-model="form.industry" class="w-full px-3 py-2 bg-background border border-border rounded-lg" />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium">GSTIN</label>
          <input type="text" v-model="form.gstin" class="w-full px-3 py-2 bg-background border border-border rounded-lg" />
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="space-y-2">
            <label class="text-sm font-medium">City</label>
            <input type="text" v-model="form.city" class="w-full px-3 py-2 bg-background border border-border rounded-lg" required />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">State</label>
            <input type="text" v-model="form.state" class="w-full px-3 py-2 bg-background border border-border rounded-lg" required />
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <button type="button" @click="$router.back()" class="px-4 py-2 border border-border rounded-lg hover:bg-muted">
          Cancel
        </button>
        <button type="submit" class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
          Create Company
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

const form = ref({
  name: '',
  legalName: '',
  type: 'technology',
  industry: '',
  gstin: '',
  city: '',
  state: ''
})

const handleSubmit = () => {
  console.log('Submitting company:', form.value)
  // TODO: Implement API call
  navigateTo('/admin/companies')
}
</script>
