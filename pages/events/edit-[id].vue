<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Back Button -->
      <div class="mb-8">
        <button
          @click="$router.go(-1)"
          class="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
        >
          <ArrowLeftIcon class="w-5 h-5 mr-2" />
          Back to Event
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center min-h-96">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        <p class="ml-4 text-gray-600">Loading event data...</p>
      </div>

      <!-- Not Found State -->
      <div v-else-if="!event" class="text-center py-20">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
        <p class="text-gray-600 mb-8">The event you're trying to edit doesn't exist.</p>
        <p class="text-sm text-gray-500 mb-4">Event ID: {{ eventId }}</p>
        <NuxtLink
          to="/my-events"
          class="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 font-semibold transition-colors duration-200"
        >
          Back to My Events
        </NuxtLink>
      </div>

      <!-- Edit Form -->
      <div v-else-if="event && isOwnEvent" class="space-y-8">
          <!-- Header -->
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold text-gray-900 mb-4">Edit Event</h1>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              Update your event details and manage volunteer requirements.
            </p>
          </div>

          <!-- Form Card -->
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Basic Information Section -->
            <div class="space-y-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <InformationCircleIcon class="w-6 h-6 mr-2 text-blue-600" />
                Basic Information
              </h3>
              
              <!-- Event Title -->
              <div class="space-y-2">
                <label for="title" class="block text-sm font-semibold text-gray-700">
                  Event Title <span class="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter event title"
                />
              </div>

              <!-- Event Description -->
              <div class="space-y-2">
                <label for="description" class="block text-sm font-semibold text-gray-700">
                  Description <span class="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  v-model="form.description"
                  rows="4"
                  required
                  class="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Describe your event and what volunteers will be doing"
                ></textarea>
              </div>

              <!-- Location -->
              <div class="space-y-2">
                <label for="location" class="block text-sm font-semibold text-gray-700">
                  Location <span class="text-red-500">*</span>
                </label>
                <input
                  id="location"
                  v-model="form.location"
                  type="text"
                  required
                  class="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter event location"
                />
              </div>
            </div>

            <!-- Date & Time Section -->
            <div class="space-y-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ClockIcon class="w-6 h-6 mr-2 text-blue-600" />
                Date & Time
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Event Date -->
                <div class="space-y-2">
                  <label for="date" class="block text-sm font-semibold text-gray-700">
                    Event Date <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="date"
                    v-model="form.date"
                    type="date"
                    required
                    class="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <!-- Start Time -->
                <div class="space-y-2">
                  <label for="start-time" class="block text-sm font-semibold text-gray-700">
                    Start Time <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="start-time"
                    v-model="form.start_time"
                    type="time"
                    required
                    class="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <!-- End Time -->
                <div class="space-y-2">
                  <label for="end-time" class="block text-sm font-semibold text-gray-700">
                    End Time <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="end-time"
                    v-model="form.end_time"
                    type="time"
                    required
                    class="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            <!-- Volunteer Settings Section -->
            <div class="space-y-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <UsersIcon class="w-6 h-6 mr-2 text-blue-600" />
                Volunteer Settings
              </h3>
              
              <!-- Max Volunteers -->
              <div class="space-y-2">
                <label for="max-volunteers" class="block text-sm font-semibold text-gray-700">
                  Maximum Volunteers <span class="text-red-500">*</span>
                </label>
                <input
                  id="max-volunteers"
                  v-model.number="form.max_volunteers"
                  type="number"
                  min="1"
                  max="100"
                  required
                  class="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="How many volunteers do you need?"
                />
                <p class="text-sm text-gray-500">
                  Currently {{ registrationCount }} volunteers registered
                </p>
              </div>

              <!-- Required Skills -->
              <div class="space-y-2">
                <label for="skills" class="block text-sm font-semibold text-gray-700">
                  Required Skills <span class="text-gray-500 text-xs">(Optional)</span>
                </label>
                <input
                  id="skills"
                  v-model="skillsInput"
                  type="text"
                  class="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter skills separated by commas (e.g., Physical fitness, Teamwork, First aid)"
                />
                <p class="text-xs text-gray-500">Separate multiple skills with commas</p>
              </div>

              <!-- Event Status -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">
                  Event Status
                </label>
                <div class="flex gap-4">
                  <label class="flex items-center">
                    <input
                      v-model="form.status"
                      type="radio"
                      value="draft"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span class="ml-2 text-sm text-gray-700">Draft (not visible to volunteers)</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="form.status"
                      type="radio"
                      value="published"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span class="ml-2 text-sm text-gray-700">Published (visible to volunteers)</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="bg-red-50 border-l-4 border-red-400 rounded-lg p-4">
              <div class="flex items-start">
                <ExclamationTriangleIcon class="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p class="text-sm text-red-800 ml-3">{{ error }}</p>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <NuxtLink
                :to="`/events/${eventId}`"
                class="flex-1 sm:flex-none px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 text-center"
              >
                Cancel
              </NuxtLink>
              
              <button
                type="submit"
                :disabled="updateLoading || !isFormValid"
                class="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span v-if="updateLoading" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating Event...
                </span>
                <span v-else>Update Event</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Unauthorized Access -->
      <div v-else class="text-center py-20">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p class="text-gray-600 mb-8">You can only edit events that you created.</p>
        <NuxtLink
          to="/events"
          class="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 font-semibold transition-colors duration-200"
        >
          Browse Events
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeftIcon,
  InformationCircleIcon,
  ClockIcon,
  UsersIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'
import type { Event } from '~/types'

// Middleware to ensure only authenticated users can access
definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const eventsStore = useEventsStore()

const eventId = route.params.id as string

const loading = ref(true)
const updateLoading = ref(false)
const error = ref('')
const event = ref<Event | null>(null)
const registrationCount = ref(0)
const skillsInput = ref('')

const today = new Date().toISOString().split('T')[0]

const form = reactive({
  title: '',
  description: '',
  location: '',
  date: '',
  start_time: '',
  end_time: '',
  max_volunteers: 10,
  required_skills: [] as string[],
  status: 'published' as 'draft' | 'published'
})

const isOwnEvent = computed(() => {
  return authStore.user?.id === event.value?.organizer_id
})

const isFormValid = computed(() => {
  return form.title && 
         form.description && 
         form.location && 
         form.date && 
         form.start_time && 
         form.end_time && 
         form.max_volunteers > 0 &&
         new Date(`${form.date}T${form.end_time}`) > new Date(`${form.date}T${form.start_time}`)
})

// Watch skills input and convert to array
watch(skillsInput, (newValue) => {
  form.required_skills = newValue 
    ? newValue.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0)
    : []
})

const fetchEvent = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // Fetch the specific event directly from Supabase
    const supabase = useSupabaseClient()
    const { data, error: supabaseError } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single()
    
    if (supabaseError) {
      error.value = 'Event not found'
      return
    }
    
    event.value = data
    
    if (event.value) {
      // Check if user is the owner
      if (!isOwnEvent.value) {
        error.value = 'You can only edit events you created'
        return
      }

      // Populate form with existing data
      await nextTick()
      
      const eventData = event.value as Event
      const formUpdate = {
        title: eventData.title || '',
        description: eventData.description || '',
        location: eventData.location || '',
        date: eventData.date || '',
        start_time: eventData.start_time || '',
        end_time: eventData.end_time || '',
        max_volunteers: eventData.max_volunteers || 10,
        status: eventData.status || 'published'
      }
      
      Object.assign(form, formUpdate)
      
      // Handle required skills
      if (eventData.required_skills && eventData.required_skills.length > 0) {
        form.required_skills = [...eventData.required_skills]
        skillsInput.value = eventData.required_skills.join(', ')
      } else {
        form.required_skills = []
        skillsInput.value = ''
      }
      
      await nextTick()

      // Fetch registration count
      const { data: regData } = await eventsStore.fetchEventRegistrations(eventId)
      if (regData) {
        registrationCount.value = regData.filter(reg => reg.status !== 'cancelled').length
      }
    } else {
      error.value = 'Event not found'
    }
  } catch (err: any) {
    error.value = 'Failed to load event data'
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  if (!isFormValid.value || !event.value || !isOwnEvent.value) return

  try {
    updateLoading.value = true
    error.value = ''

    const updateData = {
      title: form.title,
      description: form.description,
      location: form.location,
      date: form.date,
      start_time: form.start_time,
      end_time: form.end_time,
      max_volunteers: form.max_volunteers,
      required_skills: form.required_skills.length > 0 ? form.required_skills : undefined,
      status: form.status as 'draft' | 'published'
    }

    const { error: updateError } = await eventsStore.updateEvent(eventId, updateData)
    
    if (updateError) {
      error.value = updateError
      return
    }

    // Redirect back to event page with success message
    await navigateTo(`/events/${eventId}?updated=true`)
    
  } catch (err: any) {
    error.value = err.message || 'An error occurred while updating the event'
  } finally {
    updateLoading.value = false
  }
}

onMounted(() => {
  fetchEvent()
})

// SEO
useSeoMeta({
  title: () => event.value ? `Edit ${event.value.title} - VolunteerHub` : 'Edit Event - VolunteerHub',
  description: 'Edit your volunteer event details and manage volunteer requirements.',
})
</script> 