<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="event" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Back Button -->
      <div class="mb-8">
        <button
          @click="$router.go(-1)"
          class="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
        >
          <ArrowLeftIcon class="w-5 h-5 mr-2" />
          Back to Events
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Event Header -->
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 mb-8">
            <div class="flex items-start justify-between mb-6">
              <div class="flex-1">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ event.title }}</h1>
                <div class="flex flex-wrap gap-3">
                  <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                    {{ formatDate(event.date) }}
                  </span>
                  <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                    {{ event.status.charAt(0).toUpperCase() + event.status.slice(1) }}
                  </span>
                </div>
              </div>
              
              <!-- Organizer Actions -->
              <div v-if="isOwnEvent" class="flex gap-3">
                <NuxtLink
                  :to="`/events/edit-${event.id}`"
                  class="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 font-medium transition-colors duration-200"
                >
                  Edit Event
                </NuxtLink>
                <button
                  @click="deleteEvent"
                  class="bg-red-100 text-red-700 px-4 py-2 rounded-xl hover:bg-red-200 font-medium transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>

            <!-- Event Details Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <MapPinIcon class="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p class="text-sm text-gray-500">Location</p>
                  <p class="font-semibold text-gray-900">{{ event.location }}</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
                  <ClockIcon class="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p class="text-sm text-gray-500">Time</p>
                  <p class="font-semibold text-gray-900">{{ formatTime(event.start_time) }} - {{ formatTime(event.end_time) }}</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <UsersIcon class="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p class="text-sm text-gray-500">Volunteers Needed</p>
                  <p class="font-semibold text-gray-900">{{ registrationCount }}/{{ event.max_volunteers }}</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center">
                  <UserIcon class="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p class="text-sm text-gray-500">Organizer</p>
                  <p class="font-semibold text-gray-900">{{ event.organizer?.name || 'Event Organizer' }}</p>
                </div>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-700">Registration Progress</span>
                <span class="text-sm text-gray-500">{{ Math.round(registrationProgress) }}% filled</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div 
                  class="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                  :style="{ width: `${registrationProgress}%` }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
            <div class="prose prose-lg max-w-none text-gray-700">
              <p class="whitespace-pre-line">{{ event.description }}</p>
            </div>
          </div>

          <!-- Required Skills -->
          <div v-if="event.required_skills && event.required_skills.length > 0" class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Required Skills</h2>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="skill in event.required_skills"
                :key="skill"
                class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- Volunteer List (for organizers) -->
          <div v-if="isOwnEvent && registrations.length > 0" class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Registered Volunteers</h2>
            <div class="space-y-4">
              <div
                v-for="registration in registrations"
                :key="registration.id"
                class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl"
              >
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span class="text-white font-semibold">{{ registration.volunteer?.name?.charAt(0) || 'V' }}</span>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">{{ registration.volunteer?.name || 'Volunteer' }}</p>
                    <p class="text-sm text-gray-500">{{ registration.volunteer?.email }}</p>
                  </div>
                </div>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                      :class="getStatusClasses(registration.status)">
                  {{ registration.status.charAt(0).toUpperCase() + registration.status.slice(1) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Registration Card -->
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 sticky top-8">
            <!-- For Volunteers -->
            <div v-if="!isOwnEvent && authStore.isAuthenticated && authStore.profile?.role === 'volunteer'">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Join This Event</h3>
              
              <div v-if="userRegistration">
                <div class="text-center p-6 bg-green-50 rounded-2xl border border-green-200 mb-4">
                  <CheckCircleIcon class="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <p class="font-semibold text-green-800 mb-2">You're registered!</p>
                  <p class="text-sm text-green-600">Status: {{ userRegistration.status }}</p>
                </div>
                <button
                  @click="cancelRegistration"
                  :disabled="registrationLoading"
                  class="w-full bg-red-600 text-white py-3 rounded-2xl hover:bg-red-700 font-semibold transition-colors duration-200 disabled:opacity-50"
                >
                  {{ registrationLoading ? 'Cancelling...' : 'Cancel Registration' }}
                </button>
              </div>

              <div v-else-if="canRegister">
                <button
                  @click="registerForEvent"
                  :disabled="registrationLoading"
                  class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {{ registrationLoading ? 'Registering...' : 'Register Now' }}
                </button>
                <p class="text-sm text-gray-500 mt-3 text-center">
                  {{ event.max_volunteers - registrationCount }} spots remaining
                </p>
              </div>

              <div v-else class="text-center p-6 bg-gray-50 rounded-2xl">
                <p class="text-gray-600">
                  {{ registrationCount >= event.max_volunteers ? 'This event is full' : 'Registration not available' }}
                </p>
              </div>
            </div>

            <!-- For Organizers -->
            <div v-else-if="isOwnEvent">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Event Management</h3>
              <div class="space-y-3">
                <div class="text-center p-4 bg-blue-50 rounded-2xl">
                  <p class="text-2xl font-bold text-blue-600">{{ registrationCount }}</p>
                  <p class="text-sm text-blue-600">Registered Volunteers</p>
                </div>
                <NuxtLink
                  :to="`/events/edit-${event.id}`"
                  class="block w-full bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 font-semibold text-center transition-colors duration-200"
                >
                  Edit Event
                </NuxtLink>
                <button
                  @click="toggleEventStatus"
                  class="w-full bg-gray-600 text-white py-3 rounded-2xl hover:bg-gray-700 font-semibold transition-colors duration-200"
                >
                  {{ event.status === 'published' ? 'Unpublish' : 'Publish' }} Event
                </button>
              </div>
            </div>

            <!-- For Non-authenticated Users -->
            <div v-else-if="!authStore.isAuthenticated">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Join This Event</h3>
              <NuxtLink
                to="/auth/signin"
                class="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 font-semibold text-lg text-center transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Sign In to Register
              </NuxtLink>
            </div>

            <!-- For Organizers who are not the event creator -->
            <div v-else-if="authStore.profile?.role === 'organizer' && !isOwnEvent">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Event Information</h3>
              <div class="text-center p-6 bg-gray-50 rounded-2xl">
                <p class="text-gray-600">Organizers cannot register for events</p>
              </div>
            </div>

            <!-- For other cases (shouldn't happen but fallback) -->
            <div v-else>
              <h3 class="text-xl font-bold text-gray-900 mb-4">Event Information</h3>
              <div class="text-center p-6 bg-gray-50 rounded-2xl">
                <p class="text-gray-600">View event details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
        <p class="text-gray-600 mb-8">The event you're looking for doesn't exist.</p>
        <NuxtLink
          to="/events"
          class="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 font-semibold transition-colors duration-200"
        >
          Back to Events
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeftIcon,
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  UserIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'
import type { Event, EventRegistration } from '~/types'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const eventsStore = useEventsStore()

const eventId = route.params.id as string

const loading = ref(true)
const registrationLoading = ref(false)
const event = ref<Event | null>(null)
const registrations = ref<EventRegistration[]>([])
const registrationCount = ref(0)

const isOwnEvent = computed(() => {
  const isOwner = authStore.user?.id === event.value?.organizer_id
  console.log('=== Ownership Check ===')
  console.log('User ID:', authStore.user?.id)
  console.log('Profile ID:', authStore.profile?.id)  
  console.log('Event organizer_id:', event.value?.organizer_id)
  console.log('Is owner:', isOwner)
  return isOwner
})

const userRegistration = computed(() => {
  if (!authStore.user || !event.value) return null
  const registration = registrations.value.find(
    reg => reg.volunteer_id === authStore.user!.id && reg.status !== 'cancelled'
  )
  console.log('User registration found:', registration)
  return registration
})

const canRegister = computed(() => {
  console.log('=== Registration Check ===')
  console.log('Event exists:', !!event.value)
  console.log('Is authenticated:', authStore.isAuthenticated)
  console.log('User role:', authStore.profile?.role)
  console.log('Already registered:', !!userRegistration.value)
  
  if (!event.value || !authStore.isAuthenticated) {
    console.log('❌ Not authenticated or no event')
    return false
  }
  if (authStore.profile?.role !== 'volunteer') {
    console.log('❌ Not a volunteer, role is:', authStore.profile?.role)
    return false
  }
  if (userRegistration.value) {
    console.log('❌ Already registered')
    return false
  }
  
  const eventDate = new Date(event.value.date)
  const today = new Date()
  const isFutureEvent = eventDate > today
  const isPublished = event.value.status === 'published'
  const hasSpots = registrationCount.value < event.value.max_volunteers
  
  console.log('Event date:', event.value.date, 'Is future:', isFutureEvent)
  console.log('Event status:', event.value.status, 'Is published:', isPublished)
  console.log('Spots:', registrationCount.value, '/', event.value.max_volunteers, 'Has spots:', hasSpots)
  
  const canRegister = isFutureEvent && isPublished && hasSpots
  console.log('✅ Can register:', canRegister)
  return canRegister
})

const registrationProgress = computed(() => {
  if (!event.value) return 0
  return Math.min((registrationCount.value / event.value.max_volunteers) * 100, 100)
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
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

const getStatusClasses = (status: string) => {
  switch (status) {
    case 'registered':
      return 'bg-blue-100 text-blue-800'
    case 'confirmed':
      return 'bg-green-100 text-green-800'
    case 'attended':
      return 'bg-purple-100 text-purple-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    case 'no_show':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const fetchEvent = async () => {
  try {
    loading.value = true
    
    // First get the event from the store
    await eventsStore.fetchEvents()
    event.value = eventsStore.events.find(e => e.id === eventId) || null
    
    if (event.value) {
      // Debug logging
      console.log('Event found:', event.value)
      console.log('Event status:', event.value.status)
      console.log('User role:', authStore.profile?.role)
      console.log('Is authenticated:', authStore.isAuthenticated)
      
      // Fetch registrations for this event
      const { data } = await eventsStore.fetchEventRegistrations(eventId)
      if (data) {
        registrations.value = data
        registrationCount.value = data.filter(reg => reg.status !== 'cancelled').length
        console.log('Registrations loaded:', data.length)
        console.log('Active registrations:', registrationCount.value)
      }
    }
  } catch (error) {
    console.error('Error fetching event:', error)
  } finally {
    loading.value = false
  }
}

const registerForEvent = async () => {
  if (!canRegister.value) return
  
  try {
    registrationLoading.value = true
    const { data, error } = await eventsStore.registerForEvent(eventId)
    
    if (error) {
      console.error('Registration failed:', error)
      return
    }
    
    console.log('Registration successful:', data)
    
    // Refresh the registration data
    const { data: newRegistrations } = await eventsStore.fetchEventRegistrations(eventId)
    if (newRegistrations) {
      registrations.value = newRegistrations
      registrationCount.value = newRegistrations.filter(reg => reg.status !== 'cancelled').length
      console.log('Registrations refreshed:', newRegistrations.length)
    }
  } finally {
    registrationLoading.value = false
  }
}

const cancelRegistration = async () => {
  if (!userRegistration.value) return
  
  try {
    registrationLoading.value = true
    const { error } = await eventsStore.cancelRegistration(userRegistration.value.id)
    
    if (error) {
      console.error('Cancellation failed:', error)
      return
    }
    
    console.log('Cancellation successful')
    
    // Refresh the registration data
    const { data: newRegistrations } = await eventsStore.fetchEventRegistrations(eventId)
    if (newRegistrations) {
      registrations.value = newRegistrations
      registrationCount.value = newRegistrations.filter(reg => reg.status !== 'cancelled').length
      console.log('Registrations refreshed after cancellation:', newRegistrations.length)
    }
  } finally {
    registrationLoading.value = false
  }
}

const toggleEventStatus = async () => {
  if (!event.value || !isOwnEvent.value) return
  
  const newStatus = event.value.status === 'published' ? 'draft' : 'published'
  const { error } = await eventsStore.updateEvent(eventId, { status: newStatus })
  
  if (error) {
    console.error('Failed to update event status:', error)
    alert(`Error: ${error}`)
    return
  }
  
  event.value.status = newStatus
}

const deleteEvent = async () => {
  if (!confirm('Are you sure you want to delete this event?')) return
  
  const { error } = await eventsStore.deleteEvent(eventId)
  
  if (error) {
    console.error('Failed to delete event:', error)
    alert(`Error: ${error}`)
    return
  }
  
  router.push('/events')
}

onMounted(() => {
  fetchEvent()
})

// SEO
useSeoMeta({
  title: () => event.value ? `${event.value.title} - VolunteerHub` : 'Event - VolunteerHub',
  description: () => event.value?.description || 'Volunteer event details',
})
</script> 