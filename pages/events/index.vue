<template>
  <div class="min-h-screen bg-white">
    <!-- Enhanced Hero Section -->
    <section class="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 py-20 overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px); background-size: 60px 60px; background-position: 0 0, 30px 30px;"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="transform transition-all duration-1000 ease-out" :class="{ 'translate-y-0 opacity-100': heroLoaded, 'translate-y-10 opacity-0': !heroLoaded }">
          <h1 class="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Volunteer
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
              Events
            </span>
          </h1>
          <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Discover meaningful volunteer opportunities in your community and make a lasting impact
          </p>
          <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          </div>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
      <!-- Enhanced Search and Filter Section -->
      <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 mb-12 transition-all duration-500">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Enhanced Search -->
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search events..."
              class="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white placeholder-gray-500 text-gray-700 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
            />
          </div>

          <!-- Enhanced Location Filter -->
          <div class="relative">
            <select
              v-model="locationFilter"
              class="w-full px-4 py-4 bg-gray-50/50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-700 appearance-none cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
            >
              <option value="" class="text-gray-600">All Locations</option>
              <option v-for="location in availableLocations" :key="location" :value="location">
                {{ location }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <!-- Enhanced Date Filter -->
          <div class="relative">
            <select
              v-model="dateFilter"
              class="w-full px-4 py-4 bg-gray-50/50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-700 appearance-none cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
            >
              <option value="" class="text-gray-600">All Dates</option>
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="next-month">Next Month</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Enhanced Clear Filters -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 transform scale-95"
          enter-to-class="opacity-100 transform scale-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 transform scale-100"
          leave-to-class="opacity-0 transform scale-95"
        >
          <div v-if="hasActiveFilters" class="mt-6 flex justify-end">
            <button
              @click="clearFilters"
              class="group flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 transform"
            >
              <svg class="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear all filters
            </button>
          </div>
        </Transition>
      </div>

      <!-- Enhanced Results Summary and Controls -->
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        
        <div class="flex items-center space-x-6">
          <!-- Enhanced View Toggle -->
          <div class="flex bg-gray-100 rounded-2xl p-1" role="group">
            <button
              @click="viewMode = 'grid'"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300',
                viewMode === 'grid' 
                  ? 'bg-white text-blue-700 shadow-md transform scale-105' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
              ]"
            >
              <Squares2X2Icon class="w-5 h-5" />
            </button>
            <button
              @click="viewMode = 'list'"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300',
                viewMode === 'list' 
                  ? 'bg-white text-blue-700 shadow-md transform scale-105' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
              ]"
            >
              <ListBulletIcon class="w-5 h-5" />
            </button>
          </div>

          <!-- Enhanced Sort Options -->
          <div class="relative">
            <select
              v-model="sortBy"
              class="px-4 py-3 bg-white border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 text-gray-700 appearance-none cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg focus:shadow-xl min-w-48"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="location">Sort by Location</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Loading State -->
      <div v-if="eventsStore.loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 6" :key="i" class="group">
          <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/40 hover:shadow-2xl transition-all duration-500">
            <div class="animate-pulse space-y-4">
              <div class="h-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl w-3/4"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl w-full"></div>
                <div class="h-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl w-5/6"></div>
              </div>
              <div class="h-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl w-full"></div>
              <div class="h-12 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl w-full"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced No Events State -->
      <div v-else-if="filteredEvents.length === 0" class="text-center py-20">
        <div class="relative">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-32 h-32 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full opacity-20"></div>
          </div>
          <CalendarDaysIcon class="relative w-20 h-20 text-blue-400 mx-auto mb-6" />
        </div>
        <h3 class="text-2xl font-bold text-gray-700 mb-3">
          {{ hasActiveFilters ? 'No events match your filters' : 'No events available' }}
        </h3>
        <p class="text-gray-500 mb-8 text-lg max-w-md mx-auto">
          {{ hasActiveFilters 
            ? 'Try adjusting your search criteria or clear the filters.' 
            : 'Check back later for new volunteer opportunities.' 
          }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            Clear Filters
          </button>
          <NuxtLink 
            v-if="authStore.isOrganizer"
            to="/events/create" 
            class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-indigo-700 hover:to-purple-700 font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            Create First Event
          </NuxtLink>
        </div>
      </div>

      <!-- Enhanced Events Display -->
      <div v-else>
        <!-- Enhanced Grid View -->
        <TransitionGroup
          v-if="viewMode === 'grid'"
          name="grid"
          tag="div"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          appear
        >
          <div
            v-for="(event, index) in filteredEvents" 
            :key="event.id"
            :style="{ 'animation-delay': `${index * 100}ms` }"
            class="group cursor-pointer"
          >
            <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-white/40 hover:border-blue-200/50 hover:-translate-y-2 transform">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                    {{ event.title }}
                  </h3>
                  <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-3">
                    {{ formatDate(event.date) }}
                  </div>
                </div>
              </div>
              
              <div class="space-y-3 mb-6">
                <div class="flex items-center text-gray-600">
                  <MapPinIcon class="w-5 h-5 mr-3 text-blue-500" />
                  <span class="font-medium">{{ event.location }}</span>
                </div>
                <div class="flex items-center text-gray-600">
                  <ClockIcon class="w-5 h-5 mr-3 text-blue-500" />
                  <span>{{ formatTime(event.start_time) }} - {{ formatTime(event.end_time) }}</span>
                </div>
              </div>
              
              <p class="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{{ event.description }}</p>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center text-gray-500">
                    <UserGroupIcon class="w-4 h-4 mr-2" />
                    <span class="font-medium">{{ getRegistrationCount(event.id) }}/{{ event.max_volunteers }} volunteers</span>
                  </div>
                  <span class="text-blue-600 font-semibold">
                    {{ Math.round(getRegistrationProgress(event.id, event.max_volunteers)) }}% filled
                  </span>
                </div>
                
                <div class="w-full bg-blue-100 rounded-full h-3 overflow-hidden">
                  <div 
                    class="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-700 ease-out" 
                    :style="{ width: `${getRegistrationProgress(event.id, event.max_volunteers)}%` }"
                  ></div>
                </div>
                
                <div class="flex gap-3 pt-2">
                  <NuxtLink 
                    :to="`/events/${event.id}`"
                    class="flex-1 bg-blue-50 text-blue-700 py-3 rounded-2xl hover:bg-blue-100 font-semibold text-center transition-all duration-300 hover:scale-105 transform border border-blue-200"
                  >
                    View Details
                  </NuxtLink>
                  <button
                    v-if="authStore.isAuthenticated && canRegister(event) && !isRegistered(event.id)"
                    @click="handleQuickRegister(event.id)"
                    class="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-2xl hover:from-blue-700 hover:to-blue-800 font-semibold transition-all duration-300 hover:scale-105 transform shadow-lg"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>

        <!-- Enhanced List View -->
        <TransitionGroup
          v-else
          name="list"
          tag="div"
          class="space-y-6"
          appear
        >
          <div 
            v-for="(event, index) in filteredEvents" 
            :key="event.id"
            :style="{ 'animation-delay': `${index * 50}ms` }"
            class="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-white/40 hover:border-blue-200/50 hover:-translate-y-1 transform cursor-pointer"
          >
            <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
              <div class="flex-1 min-w-0">
                <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                      {{ event.title }}
                    </h3>
                    <div class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800">
                      {{ formatDate(event.date) }}
                    </div>
                  </div>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div class="flex items-center text-gray-600">
                    <MapPinIcon class="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                    <span class="font-medium">{{ event.location }}</span>
                  </div>
                  <div class="flex items-center text-gray-600">
                    <ClockIcon class="w-5 h-5 mr-3 text-blue-500 flex-shrink-0" />
                    <span>{{ formatTime(event.start_time) }} - {{ formatTime(event.end_time) }}</span>
                  </div>
                </div>
                
                <p class="text-gray-600 mb-6 line-clamp-2 leading-relaxed text-lg">{{ event.description }}</p>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <div class="flex items-center">
                      <UserGroupIcon class="w-5 h-5 mr-2" />
                      <span class="font-medium">{{ getRegistrationCount(event.id) }}/{{ event.max_volunteers }} volunteers</span>
                    </div>
                    <div class="flex items-center space-x-3">
                      <div class="w-32 bg-blue-100 rounded-full h-3">
                        <div 
                          class="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-700" 
                          :style="{ width: `${getRegistrationProgress(event.id, event.max_volunteers)}%` }"
                        ></div>
                      </div>
                      <span class="text-blue-600 font-semibold">
                        {{ Math.round(getRegistrationProgress(event.id, event.max_volunteers)) }}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="flex-shrink-0">
                <div class="flex flex-col sm:flex-row gap-3">
                  <NuxtLink 
                    :to="`/events/${event.id}`"
                    class="bg-blue-50 text-blue-700 px-6 py-3 rounded-2xl hover:bg-blue-100 font-semibold text-center transition-all duration-300 border border-blue-200 hover:scale-105 transform"
                  >
                    View Details
                  </NuxtLink>
                  <button
                    v-if="authStore.isAuthenticated && canRegister(event) && !isRegistered(event.id)"
                    @click="handleQuickRegister(event.id)"
                    class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-blue-800 font-semibold transition-all duration-300 hover:scale-105 transform shadow-lg"
                  >
                    Quick Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Enhanced Load More Button -->
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 transform translate-y-10"
        enter-to-class="opacity-100 transform translate-y-0"
      >
        <div v-if="hasMore && !eventsStore.loading" class="text-center mt-12">
          <button
            @click="loadMore"
            class="group bg-white text-blue-600 border-2 border-blue-600 px-10 py-4 rounded-2xl hover:bg-blue-600 hover:text-white font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            <span class="flex items-center justify-center">
              Load More Events
              <svg class="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m0 0l7-7" />
              </svg>
            </span>
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  Squares2X2Icon,
  ListBulletIcon
} from '@heroicons/vue/24/outline'
import type { Event } from '~/types'

const authStore = useAuthStore()
const eventsStore = useEventsStore()

// Reactive state
const searchQuery = ref('')
const locationFilter = ref('')
const dateFilter = ref('')
const sortBy = ref('date')
const viewMode = ref<'grid' | 'list'>('grid')
const registrationCounts = ref<Record<string, number>>({})
const hasMore = ref(true)
const heroLoaded = ref(false)

// Computed properties
const availableLocations = computed(() => {
  const locations = eventsStore.events.map(event => event.location)
  return [...new Set(locations)].sort()
})

const hasActiveFilters = computed(() => {
  return searchQuery.value || locationFilter.value || dateFilter.value
})

const filteredEvents = computed(() => {
  let filtered = [...eventsStore.events]

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(event => 
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query)
    )
  }

  // Location filter
  if (locationFilter.value) {
    filtered = filtered.filter(event => event.location === locationFilter.value)
  }

  // Date filter
  if (dateFilter.value) {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    filtered = filtered.filter(event => {
      const eventDate = new Date(event.date)
      
      switch (dateFilter.value) {
        case 'today':
          return eventDate.toDateString() === today.toDateString()
        case 'this-week':
          const weekEnd = new Date(today)
          weekEnd.setDate(today.getDate() + 7)
          return eventDate >= today && eventDate <= weekEnd
        case 'this-month':
          return eventDate.getMonth() === today.getMonth() && 
                 eventDate.getFullYear() === today.getFullYear()
        case 'next-month':
          const nextMonth = new Date(today)
          nextMonth.setMonth(today.getMonth() + 1)
          return eventDate.getMonth() === nextMonth.getMonth() && 
                 eventDate.getFullYear() === nextMonth.getFullYear()
        default:
          return true
      }
    })
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'location':
        return a.location.localeCompare(b.location)
      case 'date':
      default:
        return new Date(a.date).getTime() - new Date(b.date).getTime()
    }
  })

  return filtered
})

// Methods
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

const formatTime = (timeString: string) => {
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

const clearFilters = () => {
  searchQuery.value = ''
  locationFilter.value = ''
  dateFilter.value = ''
}

const getRegistrationCount = (eventId: string): number => {
  return registrationCounts.value[eventId] || 0
}

const getRegistrationProgress = (eventId: string, maxVolunteers: number): number => {
  const count = getRegistrationCount(eventId)
  return maxVolunteers > 0 ? Math.min((count / maxVolunteers) * 100, 100) : 0
}

const canRegister = (event: Event): boolean => {
  const eventDate = new Date(event.date)
  const today = new Date()
  return eventDate > today && 
         event.status === 'published' && 
         getRegistrationCount(event.id) < event.max_volunteers
}

const isRegistered = (eventId: string): boolean => {
  if (!authStore.user) return false
  return eventsStore.myRegistrations.some(
    reg => reg.event_id === eventId && reg.status !== 'cancelled'
  )
}

const handleQuickRegister = async (eventId: string) => {
  const { error } = await eventsStore.registerForEvent(eventId)
  if (error) {
    console.error('Registration failed:', error)
  }
}

const loadMore = async () => {
  // Implementation for pagination
  hasMore.value = false
}

const fetchRegistrationCounts = async () => {
  // Fetch registration counts for all events
  for (const event of eventsStore.events) {
    const { data } = await eventsStore.fetchEventRegistrations(event.id)
    if (data) {
      registrationCounts.value[event.id] = data.length
    }
  }
}

// Lifecycle
onMounted(async () => {
  // Just fetch ALL events - no filters, no BS
  await eventsStore.fetchEvents()
  await fetchRegistrationCounts()
  
  // Animate hero section
  setTimeout(() => {
    heroLoaded.value = true
  }, 100)
})

// SEO
useSeoMeta({
  title: 'Browse Events - VolunteerHub',
  description: 'Discover meaningful volunteer opportunities in your community. Join events and make a difference.',
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Enhanced Transitions */
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.grid-enter-active {
  transition: all 0.6s ease;
}
.grid-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}
.grid-move {
  transition: transform 0.5s ease;
}

.list-enter-active {
  transition: all 0.5s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.list-move {
  transition: transform 0.4s ease;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #1d4ed8);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #1e40af);
}

/* Backdrop blur fallback */
@supports not (backdrop-filter: blur(12px)) {
  .backdrop-blur-xl {
    background-color: rgba(255, 255, 255, 0.9);
  }
  .backdrop-blur-sm {
    background-color: rgba(255, 255, 255, 0.8);
  }
}

/* Custom focus styles */
input:focus,
select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Smooth hover animations */
.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}
.group:hover .group-hover\:translate-y-1 {
  transform: translateY(0.25rem);
}
.group:hover .group-hover\:rotate-90 {
  transform: rotate(90deg);
}

/* Loading animation improvements */
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.animate-pulse {
  animation: shimmer 2s infinite linear;
  background: linear-gradient(90deg, #f0f9ff 0%, #dbeafe 50%, #f0f9ff 100%);
  background-size: 200px 100%;
}

/* Enhanced button hover effects */
button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

/* Gradient text selection */
::selection {
  background: rgba(59, 130, 246, 0.2);
  color: #1e40af;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }
  
  .grid-cols-1 {
    gap: 1rem;
  }
  
  .backdrop-blur-xl {
    padding: 1.5rem;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .bg-gradient-to-r {
    background: #1e40af;
  }
  
  .text-blue-600 {
    color: #1e40af;
  }
  
  .border-blue-200 {
    border-color: #3b82f6;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>