<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="flex justify-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl">
            <CalendarPlusIcon class="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Create New Event</h1>
        <p class="text-lg text-gray-600">Organize a meaningful volunteer opportunity for your community</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Event Details Section -->
          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <InformationCircleIcon class="w-6 h-6 mr-2 text-blue-600" />
              Event Details
            </h3>
            
            <!-- Title -->
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
                placeholder="Enter a descriptive title for your event"
              />
            </div>

            <!-- Description -->
            <div class="space-y-2">
              <label for="description" class="block text-sm font-semibold text-gray-700">
                Description <span class="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                v-model="form.description"
                required
                rows="4"
                class="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Describe what volunteers will be doing, what impact they'll make, and any important details..."
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
                placeholder="Enter the full address or location name"
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
              <!-- Date -->
              <div class="space-y-2">
                <label for="date" class="block text-sm font-semibold text-gray-700">
                  Event Date <span class="text-red-500">*</span>
                </label>
                <input
                  id="date"
                  v-model="form.date"
                  type="date"
                  required
                  :min="today"
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
            <button
              type="button"
              @click="saveDraft"
              :disabled="loading || !form.title"
              class="flex-1 sm:flex-none px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Save as Draft
            </button>
            
            <button
              type="submit"
              :disabled="loading || !isFormValid"
              class="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publishing Event...
              </span>
              <span v-else>Publish Event</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  CalendarIcon,
  InformationCircleIcon,
  ClockIcon,
  UsersIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

// Middleware to ensure only organizers can access this page
definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
const eventsStore = useEventsStore()
const router = useRouter()

// Redirect if not an organizer
onMounted(() => {
  if (!authStore.isOrganizer) {
    navigateTo('/events')
  }
})

const loading = ref(false)
const error = ref('')
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
  required_skills: [] as string[]
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

const saveDraft = async () => {
  if (!form.title) {
    error.value = 'Title is required to save as draft'
    return
  }

  await createEvent('draft')
}

const handleSubmit = async () => {
  if (!isFormValid.value) {
    error.value = 'Please fill in all required fields'
    return
  }

  await createEvent('published')
}

const createEvent = async (status: 'draft' | 'published') => {
  try {
    loading.value = true
    error.value = ''

    const eventData = {
      title: form.title,
      description: form.description,
      location: form.location,
      date: form.date,
      start_time: form.start_time,
      end_time: form.end_time,
      max_volunteers: form.max_volunteers,
      required_skills: form.required_skills.length > 0 ? form.required_skills : undefined,
      organizer_id: authStore.user!.id, // Use user.id instead of profile.id
      status
    }

    const { data, error: createError } = await eventsStore.createEvent(eventData)
    
    if (createError) {
      error.value = createError
      return
    }

    // Show success message and redirect
    const message = status === 'draft' ? 'Event saved as draft' : 'Event published successfully!'
    await navigateTo(`/events?message=${encodeURIComponent(message)}`)
    
  } catch (err: any) {
    error.value = err.message || 'An error occurred while creating the event'
  } finally {
    loading.value = false
  }
}

// SEO
useSeoMeta({
  title: 'Create Event - VolunteerHub',
  description: 'Create a new volunteer event and organize meaningful community opportunities.',
})
</script> 