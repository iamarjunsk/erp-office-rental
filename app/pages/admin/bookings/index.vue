<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold">Bookings</h1>
        <p class="text-muted-foreground">Manage space bookings and reservations</p>
      </div>
      <button
        @click="showAddModal = true"
        class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
      >
        <Icon name="lucide:plus" class="w-4 h-4" />
        New Booking
      </button>
    </div>

    <!-- Calendar View (Simplified for now) -->
    <div class="bg-card border border-border rounded-lg p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold">Booking Calendar</h3>
        <div class="flex items-center gap-2">
          <button @click="changeMonth(-1)" class="p-2 border border-border rounded-lg hover:bg-muted">
            <Icon name="lucide:chevron-left" class="w-4 h-4" />
          </button>
          <span class="px-4 py-2 border border-border rounded-lg">{{ currentMonthName }} {{ currentYear }}</span>
          <button @click="changeMonth(1)" class="p-2 border border-border rounded-lg hover:bg-muted">
            <Icon name="lucide:chevron-right" class="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div class="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
        <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="bg-muted p-3 text-center text-sm font-medium">
          {{ day }}
        </div>
        <div
          v-for="{ date, dateStr, isCurrentMonth } in calendarDays"
          :key="dateStr"
          class="bg-card p-3 min-h-24 hover:bg-muted/50"
          :class="{ 'opacity-50': !isCurrentMonth }"
        >
          <span class="text-sm">{{ date }}</span>
          <div v-if="getBookingCount(dateStr) > 0" class="mt-1">
            <span class="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
              {{ getBookingCount(dateStr) }} bookings
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
              <p class="font-medium">{{ booking.title }}</p>
              <p class="text-sm text-muted-foreground">
                {{ booking.space_details?.name }} • {{ booking.company_details?.name || 'Individual' }}
              </p>
            </div>
          </div>
          <div class="text-right flex items-center gap-4">
            <div>
              <p class="font-medium">{{ formatDate(booking.start_time) }}</p>
              <p class="text-sm text-muted-foreground">
                {{ formatTime(booking.start_time) }} - {{ formatTime(booking.end_time) }}
              </p>
            </div>
            <button
              @click="deleteBooking(booking.id)"
              class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Booking"
            >
              <Icon name="lucide:trash-2" class="w-4 h-4" />
            </button>
          </div>
        </div>
        <div v-if="recentBookings.length === 0" class="p-8 text-center text-muted-foreground">
          No bookings found
        </div>
      </div>
    </div>

    <!-- Add Booking Modal -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="showAddModal = false">
      <div class="bg-card rounded-xl w-full max-w-lg m-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-border flex items-center justify-between">
          <h3 class="text-lg font-semibold">New Booking</h3>
          <button @click="showAddModal = false" class="p-2 hover:bg-muted rounded-full">
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>
        </div>
        <form @submit.prevent="createBooking" class="p-6 space-y-4">
          <div>
            <label class="text-sm font-medium">Title *</label>
            <input v-model="newBooking.title" type="text" required class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
          </div>
          <div>
            <label class="text-sm font-medium">Space *</label>
            <select v-model="newBooking.space" required class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg">
              <option value="" disabled>Select Space</option>
              <option v-for="space in spaces" :key="space.id" :value="space.id">
                {{ space.name }} ({{ space.code }})
              </option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium">Company (Optional)</label>
            <select v-model="newBooking.company" class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg">
              <option value="">None</option>
              <option v-for="company in companies" :key="company.id" :value="company.id">
                {{ company.name }}
              </option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium">Start Time *</label>
              <input v-model="newBooking.start_time" type="datetime-local" required class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
            </div>
            <div>
              <label class="text-sm font-medium">End Time *</label>
              <input v-model="newBooking.end_time" type="datetime-local" required class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg" />
            </div>
          </div>
          <div>
            <label class="text-sm font-medium">Description</label>
            <textarea v-model="newBooking.description" rows="3" class="w-full mt-1 px-4 py-2 bg-background border border-border rounded-lg"></textarea>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <button type="button" @click="showAddModal = false" class="px-4 py-2 border border-border rounded-lg hover:bg-muted">Cancel</button>
            <button type="submit" :disabled="isSubmitting" class="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">
              {{ isSubmitting ? 'Creating...' : 'Create Booking' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { toast } = useToast()
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, addMonths, isSameMonth, parseISO } from 'date-fns'

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})

const { authHeaders } = useAuth()
const config = useRuntimeConfig()
const API_BASE = 'http://localhost:8000/api/bookings'
const SPACES_API = 'http://localhost:8000/api/spaces'
const COMPANIES_API = 'http://localhost:8000/api/companies'

const currentDate = ref(new Date())
const showAddModal = ref(false)
const isSubmitting = ref(false)

const newBooking = ref({
  title: '',
  space: '',
  company: '',
  start_time: '',
  end_time: '',
  description: ''
})

// Fetch Data - ensure lazy fetch or key refresh
const { data: bookingsData, refresh: refreshBookings } = await useFetch(`${API_BASE}/`, {
  headers: authHeaders(),
  key: 'bookings-list',
  server: false
})

const { data: spacesData } = await useFetch(`${SPACES_API}/`, {
  headers: authHeaders(),
  key: 'spaces-list',
  server: false
})

const { data: companiesData } = await useFetch(`${COMPANIES_API}/`, {
  headers: authHeaders(),
  key: 'companies-list',
  server: false
})

const bookings = computed(() => bookingsData.value || [])
const spaces = computed(() => spacesData.value || [])
const companies = computed(() => companiesData.value || [])

// Calendar Logic
const currentMonthName = computed(() => format(currentDate.value, 'MMMM'))
const currentYear = computed(() => format(currentDate.value, 'yyyy'))

const calendarDays = computed(() => {
  const start = startOfWeek(startOfMonth(currentDate.value))
  const end = endOfWeek(endOfMonth(currentDate.value))

  return eachDayOfInterval({ start, end }).map(day => ({
    date: format(day, 'd'),
    dateStr: format(day, 'yyyy-MM-dd'),
    isCurrentMonth: isSameMonth(day, currentDate.value)
  }))
})

const changeMonth = (delta: number) => {
  currentDate.value = addMonths(currentDate.value, delta)
}

const getBookingCount = (dateStr: string) => {
  return bookings.value.filter((b: any) => b.start_time.startsWith(dateStr)).length
}

const recentBookings = computed(() => {
  return [...bookings.value].sort((a: any, b: any) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ).slice(0, 5)
})

// Formatting
const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return format(new Date(dateStr), 'MMM d, yyyy')
}

const formatTime = (dateStr: string) => {
  if (!dateStr) return ''
  return format(new Date(dateStr), 'h:mm a')
}

// Create Booking
const createBooking = async () => {
  isSubmitting.value = true
  try {
    const payload = { ...newBooking.value }
    if (!payload.company) delete payload.company

    await $fetch(`${API_BASE}/`, {
      method: 'POST',
      headers: authHeaders(),
      body: payload
    })

    showAddModal.value = false
    newBooking.value = { title: '', space: '', company: '', start_time: '', end_time: '', description: '' }
    await refreshBookings()
  } catch (e: any) {
    toast({ title: 'Error', description: e.data?.detail || 'Failed to create booking', variant: 'destructive' })
  } finally {
    isSubmitting.value = false
  }
}

// Delete Booking
const deleteBooking = async (id: number) => {
  if (!confirm('Are you sure you want to delete this booking?')) return

  try {
    await $fetch(`${API_BASE}/${id}/`, {
      method: 'DELETE',
      headers: authHeaders()
    })
    await refreshBookings()
  } catch (e: any) {
    toast({ title: 'Error', description: 'Failed to delete booking: ' + (e.message || 'Unknown error'), variant: 'destructive' })
  }
}
</script>
