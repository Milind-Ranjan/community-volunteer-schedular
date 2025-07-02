<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="flex justify-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl">
            <component :is="headerIcon" class="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ pageTitle }}</h1>
        <p class="text-lg text-gray-600">{{ pageDescription }}</p>
      </div>

      <!-- Organizer View -->
      <div v-if="authStore.isOrganizer">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <CalendarDaysIcon class="w-6 h-6 text-blue-600" />
              </div>
              <div class="ml-4">
                <p class="text-2xl font-bold text-gray-900">{{ myEvents.length }}</p>
                <p class="text-sm text-gray-500">Total Events</p>
              </div>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <CheckCircleIcon class="w-6 h-6 text-green-600" />
              </div>
              <div class="ml-4">
                <p class="text-2xl font-bold text-gray-900">{{ publishedEvents.length }}</p>
                <p class="text-sm text-gray-500">Published</p>
              </div>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                <DocumentIcon class="w-6 h-6 text-yellow-600" />
              </div>
              <div class="ml-4">
                <p class="text-2xl font-bold text-gray-900">{{ draftEvents.length }}</p>
                <p class="text-sm text-gray-500">Drafts</p>
              </div>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                <UsersIcon class="w-6 h-6 text-purple-600" />
              </div>
              <div class="ml-4">
                <p class="text-2xl font-bold text-gray-900">{{ totalVolunteers }}</p>
                <p class="text-sm text-gray-500">Total Volunteers</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="mb-8">
          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink
              to="/events/create"
              class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-blue-800 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform flex items-center justify-center"
            >
              <PlusIcon class="w-5 h-5 mr-2" />
              Create New Event
            </NuxtLink>
          </div>
        </div>

        <!-- Events Tabs -->
        <div class="mb-8">
          <div class="flex space-x-1 bg-gray-100 rounded-2xl p-1" role="tablist">
            <button
              v-for="tab in organizerTabs"
              :key="tab.id"
              @click="activeOrganizerTab = tab.id"
              :class="[
                'px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300',
                activeOrganizerTab === tab.id
                  ? 'bg-white text-blue-700 shadow-md'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
              ]"
            >
              {{ tab.label }} ({{ tab.count }})
            </button>
          </div>
        </div>

        <!-- Events List -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            v-for="event in filteredOrganizerEvents"
            :key="event.id"
            class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-white/20 hover:border-blue-200/50"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ event.title }}</h3>
                <div class="flex gap-2">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                        :class="getEventStatusClasses(event.status)">
                    {{ event.status.charAt(0).toUpperCase() + event.status.slice(1) }}
                  </span>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {{ formatDate(event.date) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="space-y-3 mb-6">
              <div class="flex items-center text-gray-600">
                <MapPinIcon class="w-4 h-4 mr-2" />
                <span class="text-sm">{{ event.location }}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <ClockIcon class="w-4 h-4 mr-2" />
                <span class="text-sm">{{ formatTime(event.start_time) }} - {{ formatTime(event.end_time) }}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <UsersIcon class="w-4 h-4 mr-2" />
                <span class="text-sm">{{ getEventVolunteerCount(event.id) }}/{{ event.max_volunteers }} volunteers</span>
              </div>
            </div>

            <p class="text-gray-600 mb-6 line-clamp-2">{{ event.description }}</p>

            <div class="flex gap-3">
              <NuxtLink
                :to="`/events/${event.id}`"
                class="flex-1 bg-blue-50 text-blue-700 py-2 rounded-xl hover:bg-blue-100 font-medium text-center transition-colors duration-200"
              >
                View Details
              </NuxtLink>
              <NuxtLink
                :to="`/events/${event.id}/edit`"
                class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-xl hover:bg-gray-200 font-medium text-center transition-colors duration-200"
              >
                Edit
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Empty State for Organizers -->
        <div v-if="filteredOrganizerEvents.length === 0" class="text-center py-20">
          <CalendarDaysIcon class="w-20 h-20 text-gray-400 mx-auto mb-6" />
          <h3 class="text-2xl font-bold text-gray-700 mb-3">
            {{ activeOrganizerTab === 'all' ? 'No events yet' : `No ${activeOrganizerTab} events` }}
          </h3>
          <p class="text-gray-500 mb-8 text-lg max-w-md mx-auto">
            {{ activeOrganizerTab === 'all' 
              ? 'Create your first event to start organizing volunteer opportunities.' 
              : `You don't have any ${activeOrganizerTab} events at the moment.`
            }}
          </p>
          <NuxtLink
            v-if="activeOrganizerTab === 'all'"
            to="/events/create"
            class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            Create Your First Event
          </NuxtLink>
        </div>
      </div>

      <!-- Volunteer View -->
      <div v-else>
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <CheckCircleIcon class="w-6 h-6 text-green-600" />
              </div>
              <div class="ml-4">
                <p class="text-2xl font-bold text-gray-900">{{ activeRegistrations.length }}</p>
                <p class="text-sm text-gray-500">Active Registrations</p>
              </div>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                <HeartIcon class="w-6 h-6 text-purple-600" />
              </div>
              <div class="ml-4">
                <p class="text-2xl font-bold text-gray-900">{{ attendedCount }}</p>
                <p class="text-sm text-gray-500">Events Attended</p>
              </div>
            </div>
          </div>

          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <CalendarDaysIcon class="w-6 h-6 text-blue-600" />
              </div>
              <div class="ml-4">
                <p class="text-2xl font-bold text-gray-900">{{ upcomingCount }}</p>
                <p class="text-sm text-gray-500">Upcoming Events</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Registration Tabs -->
        <div class="mb-8">
          <div class="flex space-x-1 bg-gray-100 rounded-2xl p-1" role="tablist">
            <button
              v-for="tab in volunteerTabs"
              :key="tab.id"
              @click="activeVolunteerTab = tab.id"
              :class="[
                'px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300',
                activeVolunteerTab === tab.id
                  ? 'bg-white text-blue-700 shadow-md'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
              ]"
            >
              {{ tab.label }} ({{ tab.count }})
            </button>
          </div>
        </div>

        <!-- Registrations List -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            v-for="registration in filteredVolunteerRegistrations"
            :key="registration.id"
            class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-white/20 hover:border-blue-200/50"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ registration.event?.title }}</h3>
                <div class="flex gap-2">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                        :class="getRegistrationStatusClasses(registration.status)">
                    {{ registration.status.charAt(0).toUpperCase() + registration.status.slice(1) }}
                  </span>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {{ formatDate(registration.event?.date || '') }}
                  </span>
                </div>
              </div>
            </div>

            <div class="space-y-3 mb-6">
              <div class="flex items-center text-gray-600">
                <MapPinIcon class="w-4 h-4 mr-2" />
                <span class="text-sm">{{ registration.event?.location }}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <ClockIcon class="w-4 h-4 mr-2" />
                <span class="text-sm">{{ formatTime(registration.event?.start_time || '') }} - {{ formatTime(registration.event?.end_time || '') }}</span>
              </div>
            </div>

            <p class="text-gray-600 mb-6 line-clamp-2">{{ registration.event?.description }}</p>

            <div class="flex gap-3">
              <NuxtLink
                :to="`/events/${registration.event_id}`"
                class="flex-1 bg-blue-50 text-blue-700 py-2 rounded-xl hover:bg-blue-100 font-medium text-center transition-colors duration-200"
              >
                View Event
              </NuxtLink>
              <button
                v-if="registration.status === 'registered' && canCancelRegistration(registration)"
                @click="cancelRegistration(registration.id)"
                class="flex-1 bg-red-50 text-red-700 py-2 rounded-xl hover:bg-red-100 font-medium transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State for Volunteers -->
        <div v-if="filteredVolunteerRegistrations.length === 0" class="text-center py-20">
          <HeartIcon class="w-20 h-20 text-gray-400 mx-auto mb-6" />
          <h3 class="text-2xl font-bold text-gray-700 mb-3">
            {{ activeVolunteerTab === 'all' ? 'No registrations yet' : `No ${activeVolunteerTab} registrations` }}
          </h3>
          <p class="text-gray-500 mb-8 text-lg max-w-md mx-auto">
            {{ activeVolunteerTab === 'all' 
              ? 'Browse events and register for volunteer opportunities that interest you.' 
              : `You don't have any ${activeVolunteerTab} registrations.`
            }}
          </p>
          <NuxtLink
            v-if="activeVolunteerTab === 'all'"
            to="/events"
            class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            Browse Events
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  DocumentIcon,
  UsersIcon,
  PlusIcon,
  MapPinIcon,
  ClockIcon,
  HeartIcon,
  CogIcon
} from '@heroicons/vue/24/outline'

// Middleware
definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
const eventsStore = useEventsStore()

// Reactive state
const activeOrganizerTab = ref('all')
const activeVolunteerTab = ref('all')
const volunteerCounts = ref<Record<string, number>>({})

// Computed properties
const headerIcon = computed(() => {
  return authStore.isOrganizer ? CogIcon : HeartIcon
})

const pageTitle = computed(() => {
  return authStore.isOrganizer ? 'My Events' : 'My Registrations'
})

const pageDescription = computed(() => {
  return authStore.isOrganizer 
    ? 'Manage your volunteer events and track registrations'
    : 'View your volunteer registrations and upcoming events'
})

const myEvents = computed(() => eventsStore.myEvents)
const myRegistrations = computed(() => eventsStore.myRegistrations)

// Organizer computed properties
const publishedEvents = computed(() => myEvents.value.filter(e => e.status === 'published'))
const draftEvents = computed(() => myEvents.value.filter(e => e.status === 'draft'))
const totalVolunteers = computed(() => {
  return Object.values(volunteerCounts.value).reduce((sum, count) => sum + count, 0)
})

const organizerTabs = computed(() => [
  { id: 'all', label: 'All Events', count: myEvents.value.length },
  { id: 'published', label: 'Published', count: publishedEvents.value.length },
  { id: 'draft', label: 'Drafts', count: draftEvents.value.length }
])

const filteredOrganizerEvents = computed(() => {
  switch (activeOrganizerTab.value) {
    case 'published': return publishedEvents.value
    case 'draft': return draftEvents.value
    default: return myEvents.value
  }
})

// Volunteer computed properties
const activeRegistrations = computed(() => 
  myRegistrations.value.filter(r => ['registered', 'confirmed'].includes(r.status))
)
const attendedCount = computed(() => 
  myRegistrations.value.filter(r => r.status === 'attended').length
)
const upcomingCount = computed(() => 
  activeRegistrations.value.filter(r => {
    const eventDate = new Date(r.event?.date || '')
    return eventDate > new Date()
  }).length
)

const volunteerTabs = computed(() => [
  { id: 'all', label: 'All', count: myRegistrations.value.length },
  { id: 'upcoming', label: 'Upcoming', count: upcomingCount.value },
  { id: 'attended', label: 'Attended', count: attendedCount.value }
])

const filteredVolunteerRegistrations = computed(() => {
  switch (activeVolunteerTab.value) {
    case 'upcoming':
      return activeRegistrations.value.filter(r => {
        const eventDate = new Date(r.event?.date || '')
        return eventDate > new Date()
      })
    case 'attended':
      return myRegistrations.value.filter(r => r.status === 'attended')
    default:
      return myRegistrations.value.filter(r => r.status !== 'cancelled')
  }
})

// Methods
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const formatTime = (timeString: string) => {
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

const getEventStatusClasses = (status: string) => {
  switch (status) {
    case 'published': return 'bg-green-100 text-green-800'
    case 'draft': return 'bg-yellow-100 text-yellow-800'
    case 'completed': return 'bg-purple-100 text-purple-800'
    case 'cancelled': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getRegistrationStatusClasses = (status: string) => {
  switch (status) {
    case 'registered': return 'bg-blue-100 text-blue-800'
    case 'confirmed': return 'bg-green-100 text-green-800'
    case 'attended': return 'bg-purple-100 text-purple-800'
    case 'cancelled': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getEventVolunteerCount = (eventId: string) => {
  return volunteerCounts.value[eventId] || 0
}

const canCancelRegistration = (registration: any) => {
  const eventDate = new Date(registration.event?.date || '')
  return eventDate > new Date()
}

const cancelRegistration = async (registrationId: string) => {
  if (!confirm('Are you sure you want to cancel this registration?')) return
  
  const { error } = await eventsStore.cancelRegistration(registrationId)
  if (!error) {
    // Refresh data
    await fetchData()
  }
}

const fetchVolunteerCounts = async () => {
  for (const event of myEvents.value) {
    const { data } = await eventsStore.fetchEventRegistrations(event.id)
    if (data) {
      volunteerCounts.value[event.id] = data.filter(r => r.status !== 'cancelled').length
    }
  }
}

const fetchData = async () => {
  await eventsStore.fetchEvents()
  if (authStore.isOrganizer) {
    await fetchVolunteerCounts()
  }
}

// Lifecycle
onMounted(() => {
  fetchData()
})

// SEO
useSeoMeta({
  title: () => `${pageTitle.value} - VolunteerHub`,
  description: () => pageDescription.value,
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 