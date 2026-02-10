<template>
  <div class="bg-background text-foreground flex font-sans">
    <!-- Sidebar - Fixed height to screen -->
    <aside class="fixed left-0 top-0 h-screen w-[280px] border-r border-border bg-background flex flex-col hidden md:flex z-50">
      <!-- Logo -->
      <div class="p-6 flex-shrink-0">
        <div class="flex items-center gap-3">
          <div class="bg-[#0f172a] text-white p-2 rounded-lg">
            <Icon name="lucide:building-2" class="w-6 h-6" />
          </div>
          <span class="font-bold text-xl text-[#0f172a]">OfficeERP</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        <NuxtLink 
          v-for="item in navigation" 
          :key="item.name" 
          :to="item.href"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all duration-200"
          :class="isActive(item.href) ? 'bg-[#0f172a] text-white shadow-lg shadow-gray-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'"
        >
          <Icon :name="item.icon" class="w-5 h-5" :class="isActive(item.href) ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'" />
          {{ item.name }}
        </NuxtLink>
      </nav>

      <!-- User Profile -->
      <div class="p-4 border-t border-border flex-shrink-0">
        <div class="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
          <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
            <Icon name="lucide:user" class="w-5 h-5 text-slate-600" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-slate-900 truncate">{{ user?.first_name || 'User' }} {{ user?.last_name || '' }}</p>
            <p class="text-xs text-slate-500 truncate group-hover:text-slate-700">{{ user?.email || 'Not logged in' }}</p>
          </div>
          <button @click="logout" title="Logout" class="p-1 hover:bg-slate-100 rounded-lg transition-colors">
            <Icon name="lucide:log-out" class="w-5 h-5 text-slate-400 hover:text-slate-900 transition-colors" />
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content - Scrolls independently -->
    <main class="flex-1 md:ml-[280px] min-h-screen bg-slate-50/50">
      <header class="h-16 border-b border-border bg-background flex items-center justify-between px-8 sticky top-0 z-10">
        <h1 class="text-xl font-bold text-slate-800 capitalize">{{ $route.path.split('/').pop()?.replace('-', ' ') || 'Dashboard' }}</h1>
        <div class="flex items-center gap-4">
          <button class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
            <Icon name="lucide:bell" class="w-5 h-5" />
            <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>
      <div class="p-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()
const route = useRoute()

const isActive = (href: string) => {
  if (href === '/admin') {
    return route.path === '/admin' // Exact match for dashboard
  }
  return route.path.startsWith(href)
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: 'lucide:layout-dashboard' },
  { name: 'Properties', href: '/admin/properties', icon: 'lucide:building' },
  { name: 'Spaces', href: '/admin/spaces', icon: 'lucide:door-open' },
  { name: 'Leases', href: '/admin/leases', icon: 'lucide:file-text' },
  { name: 'Companies', href: '/admin/companies', icon: 'lucide:briefcase' },
  { name: 'Procurement', href: '/admin/procurement', icon: 'lucide:shopping-cart' },
  { name: 'Assets', href: '/admin/assets', icon: 'lucide:package' },
  { name: 'Billing', href: '/admin/billing', icon: 'lucide:credit-card' },
  { name: 'Maintenance', href: '/admin/maintenance', icon: 'lucide:wrench' },
  { name: 'Bookings', href: '/admin/bookings', icon: 'lucide:calendar' },
  { name: 'Users', href: '/admin/users', icon: 'lucide:users' },
  { name: 'Reports', href: '/admin/reports', icon: 'lucide:bar-chart-3' },
]
</script>
