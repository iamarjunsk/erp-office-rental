<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold">Bookings</h1>
        <p class="text-muted-foreground">Manage space bookings and reservations</p>
      </div>
      <button class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
        <Icon name="lucide:plus" class="w-4 h-4" />
        New Booking
      </button>
    </div>

    <!-- Calendar View -->
    <div class="bg-card border border-border rounded-lg p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold">Booking Calendar</h3>
        <div class="flex items-center gap-2">
          <button class="p-2 border border-border rounded-lg hover:bg-muted">
            <Icon name="lucide:chevron-left" class="w-4 h-4" />
          </button>
          <span class="px-4 py-2 border border-border rounded-lg">February 2026</span>
          <button class="p-2 border border-border rounded-lg hover:bg-muted">
            <Icon name="lucide:chevron-right" class="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div class="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
        <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="bg-muted p-3 text-center text-sm font-medium">
          {{ day }}
        </div>
        <div v-for="date in calendarDates" :key="date" class="bg-card p-3 min-h-24 hover:bg-muted/50">
          <span class="text-sm">{{ date }}</span>
          <div v-if="hasBooking(date)" class="mt-1">
            <span class="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
              {{ getBookingCount(date) }} bookings
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Bookings -->
    <div class="bg-card border border-border rounded-lg">
      <div class="p-6 border-b border-border">
        <h3 class="text-lg font-semibold">Recent Bookings</h3>
      </div>
      <div class="divide-y divide-border">
        <div v-for="booking in recentBookings" :key="booking.id" class="p-4 flex items-center justify-between hover:bg-muted/50">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="lucide:calendar" class="w-5 h-5 text-primary" />
            </div>
            <div>
              <p class="font-medium">{{ booking.space }}</p>
              <p class="text-sm text-muted-foreground">{{ booking.company }} • {{ booking.purpose }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-medium">{{ booking.date }}</p>
            <p class="text-sm text-muted-foreground">{{ booking.time }}</p>
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

const calendarDates = Array.from({ length: 28 }, (_, i) => i + 1)

const hasBooking = (date: number) => [5, 12, 15, 18, 22, 25].includes(date)
const getBookingCount = (date: number) => {
  const counts: Record<number, number> = { 5: 2, 12: 1, 15: 3, 18: 1, 22: 2, 25: 1 }
  return counts[date] || 0
}

const recentBookings = [
  { id: 1, space: 'Meeting Room FL-01-102', company: 'Tech Solutions', purpose: 'Team Meeting', date: 'Feb 5, 2026', time: '10:00 AM - 12:00 PM' },
  { id: 2, space: 'Conference Hall A', company: 'Innovate Labs', purpose: 'Client Presentation', date: 'Feb 5, 2026', time: '2:00 PM - 4:00 PM' },
  { id: 3, space: 'Hot Desk Zone', company: 'Freelancer', purpose: 'Daily Work', date: 'Feb 6, 2026', time: '9:00 AM - 6:00 PM' },
]
</script>