<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
    <div class="p-6">
      <!-- Event Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ event.title }}</h3>
          <div class="flex items-center text-sm text-gray-600 mb-2">
            <MapPinIcon class="w-4 h-4 mr-1" />
            <span>{{ event.location }}</span>
          </div>
        </div>
        <div class="text-right">
          <div class="text-lg font-bold text-blue-600">
            {{ formatDate(event.date) }}
          </div>
          <div class="text-sm text-gray-600">
            {{ formatTime(event.start_time) }} - {{ formatTime(event.end_time) }}
          </div>
        </div>
      </div>

      <!-- Event Description -->
      <p class="text-gray-600 mb-4 line-clamp-3">{{ event.description }}</p>

      <!-- Event Stats -->
      <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div class="flex items-center">
          <UserGroupIcon class="w-4 h-4 mr-1" />
          <span>{{ registrationCount }}/{{ event.max_volunteers }} volunteers</span>
        </div>
        <div class="flex items-center">
          <ClockIcon class="w-4 h-4 mr-1" />
          <span>{{ timeUntilEvent }}</span>
        </div>
      </div>

      <!-- Registration Progress Bar -->
      <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          class="bg-blue-600 h-2 rounded-full transition-all duration-300" 
          :style="{ width: `${registrationProgress}%` }"
        ></div>
      </div>

      <!-- Skills/Requirements -->
      <div v-if="event.required_skills?.length" class="mb-4">
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="skill in event.required_skills" 
            :key="skill"
            class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div v-if="showActions" class="flex flex-col sm:flex-row gap-2">
        <!-- Registration Button -->
        <template v-if="!authStore.isAuthenticated">
          <NuxtLink 
            to="/auth/signin" 
            class="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 font-medium"
          >
            Sign In to Register
          </NuxtLink>
        </template>
        
        <template v-else-if="!isRegistered && !isEventFull && canRegister">
          <button 
            @click="handleRegister"
            :disabled="loading"
            class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Registering...</span>
            <span v-else>Register to Volunteer</span>
          </button>
        </template>

        <template v-else-if="isRegistered">
          <div class="flex flex-col sm:flex-row gap-2 flex-1">
            <div class="flex-1 bg-green-100 text-green-800 py-2 px-4 rounded-md text-center font-medium">
              ✓ Registered
            </div>
            <button 
              @click="handleCancelRegistration"
              :disabled="loading"
              class="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 font-medium disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </template>

        <template v-else-if="isEventFull">
          <div class="flex-1 bg-gray-100 text-gray-600 py-2 px-4 rounded-md text-center font-medium">
            Event Full
          </div>
        </template>

        <template v-else-if="!canRegister">
          <div class="flex-1 bg-gray-100 text-gray-600 py-2 px-4 rounded-md text-center font-medium">
            Registration Closed
          </div>
        </template>

        <!-- View Details Button -->
        <NuxtLink 
          :to="`/events/${event.id}`" 
          class="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 font-medium text-center"
        >
          View Details
        </NuxtLink>
      </div>

      <!-- View Details Only -->
      <div v-else class="mt-2">
        <NuxtLink 
          :to="`/events/${event.id}`" 
          class="text-blue-600 hover:text-blue-700 font-medium"
        >
          Learn More →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  MapPinIcon, 
  UserGroupIcon, 
  ClockIcon
} from '@heroicons/vue/24/outline'
import type { Event } from '~/types'

interface Props {
  event: Event
  showActions?: boolean
  registrationCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  showActions: true,
  registrationCount: 0
})

// Emit events for parent to handle registration changes
const emit = defineEmits<{
  registrationChanged: [eventId: string]
}>()

const authStore = useAuthStore()
const eventsStore = useEventsStore()
const loading = ref(false)

// Computed properties
const registrationProgress = computed(() => {
  return props.event.max_volunteers > 0 
    ? Math.min((props.registrationCount / props.event.max_volunteers) * 100, 100)
    : 0
})

const isEventFull = computed(() => {
  return props.registrationCount >= props.event.max_volunteers
})

const canRegister = computed(() => {
  // Only volunteers can register for events
  if (!authStore.isAuthenticated || authStore.profile?.role !== 'volunteer') {
    return false
  }
  
  const eventDate = new Date(props.event.date)
  const today = new Date()
  return eventDate > today && props.event.status === 'published'
})

const isRegistered = computed(() => {
  if (!authStore.user) return false
  return eventsStore.myRegistrations.some(
    reg => reg.event_id === props.event.id && reg.status !== 'cancelled'
  )
})

const userRegistration = computed(() => {
  if (!authStore.user) return null
  return eventsStore.myRegistrations.find(
    reg => reg.event_id === props.event.id && reg.status !== 'cancelled'
  )
})

const timeUntilEvent = computed(() => {
  const eventDate = new Date(props.event.date + 'T' + props.event.start_time)
  const now = new Date()
  const diffMs = eventDate.getTime() - now.getTime()
  
  if (diffMs < 0) return 'Event ended'
  
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  
  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} away`
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} away`
  } else {
    return 'Starting soon'
  }
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

const handleRegister = async () => {
  if (!authStore.isAuthenticated) {
    await navigateTo('/auth/signin')
    return
  }

  loading.value = true
  const { error } = await eventsStore.registerForEvent(props.event.id)
  
  if (error) {
    // Show error toast/notification
    console.error('Registration failed:', error)
  } else {
    // Emit event to parent to refresh registration count
    emit('registrationChanged', props.event.id)
  }
  
  loading.value = false
}

const handleCancelRegistration = async () => {
  if (!userRegistration.value) return

  loading.value = true
  const { error } = await eventsStore.cancelRegistration(userRegistration.value.id)
  
  if (error) {
    // Show error toast/notification
    console.error('Cancellation failed:', error)
  } else {
    // Emit event to parent to refresh registration count
    emit('registrationChanged', props.event.id)
  }
  
  loading.value = false
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>