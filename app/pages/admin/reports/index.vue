<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold">Reports</h1>
        <p class="text-muted-foreground">Generate and view business reports</p>
      </div>
      <button class="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted">
        <Icon name="lucide:download" class="w-4 h-4" />
        Export All
      </button>
    </div>

    <!-- Report Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div class="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer">
        <div class="flex items-start justify-between">
          <div>
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <Icon name="lucide:bar-chart-3" class="w-6 h-6 text-blue-600" />
            </div>
            <h3 class="text-lg font-semibold">Occupancy Report</h3>
            <p class="text-sm text-muted-foreground mt-1">Space utilization and occupancy trends</p>
          </div>
          <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      <div class="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer">
        <div class="flex items-start justify-between">
          <div>
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <Icon name="lucide:indian-rupee" class="w-6 h-6 text-green-600" />
            </div>
            <h3 class="text-lg font-semibold">Revenue Report</h3>
            <p class="text-sm text-muted-foreground mt-1">Monthly revenue and collection analysis</p>
          </div>
          <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      <div class="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer">
        <div class="flex items-start justify-between">
          <div>
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <Icon name="lucide:file-text" class="w-6 h-6 text-purple-600" />
            </div>
            <h3 class="text-lg font-semibold">Lease Report</h3>
            <p class="text-sm text-muted-foreground mt-1">Active leases and expiring contracts</p>
          </div>
          <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      <div class="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer">
        <div class="flex items-start justify-between">
          <div>
            <div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-4">
              <Icon name="lucide:wrench" class="w-6 h-6 text-amber-600" />
            </div>
            <h3 class="text-lg font-semibold">Maintenance Report</h3>
            <p class="text-sm text-muted-foreground mt-1">Ticket trends and resolution times</p>
          </div>
          <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      <div class="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer">
        <div class="flex items-start justify-between">
          <div>
            <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
              <Icon name="lucide:credit-card" class="w-6 h-6 text-red-600" />
            </div>
            <h3 class="text-lg font-semibold">Outstanding Dues</h3>
            <p class="text-sm text-muted-foreground mt-1">Overdue invoices and payment status</p>
          </div>
          <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      <div class="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer">
        <div class="flex items-start justify-between">
          <div>
            <div class="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mb-4">
              <Icon name="lucide:users" class="w-6 h-6 text-cyan-600" />
            </div>
            <h3 class="text-lg font-semibold">Tenant Report</h3>
            <p class="text-sm text-muted-foreground mt-1">Company onboarding and activity</p>
          </div>
          <Icon name="lucide:arrow-right" class="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="bg-card border border-border rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-4">Quick Overview</h3>
      <div class="grid gap-4 md:grid-cols-4">
        <div class="text-center p-4 bg-muted rounded-lg">
          <p class="text-3xl font-bold text-blue-600">87%</p>
          <p class="text-sm text-muted-foreground">Avg Occupancy</p>
        </div>
        <div class="text-center p-4 bg-muted rounded-lg">
          <p class="text-3xl font-bold text-green-600">98%</p>
          <p class="text-sm text-muted-foreground">Collection Rate</p>
        </div>
        <div class="text-center p-4 bg-muted rounded-lg">
          <p class="text-3xl font-bold text-amber-600">24h</p>
          <p class="text-sm text-muted-foreground">Avg Resolution</p>
        </div>
        <div class="text-center p-4 bg-muted rounded-lg">
          <p class="text-3xl font-bold text-purple-600">4.8</p>
          <p class="text-sm text-muted-foreground">Tenant Satisfaction</p>
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
</script>