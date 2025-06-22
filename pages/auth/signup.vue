<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <div class="max-w-lg w-full space-y-8 relative z-10">
      <!-- Header Section -->
      <div class="text-center">
        <div class="flex justify-center mb-8">
          <div class="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300">
            <HeartIcon class="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 class="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          Join VolunteerHub
        </h2>
        <p class="text-lg text-gray-600 mb-2">
          Create your account to get started
        </p>
        <p class="text-sm text-gray-500">
          Already have an account?
          <NuxtLink 
            to="/auth/signin" 
            class="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200 ml-1 hover:underline"
          >
            Sign in here
          </NuxtLink>
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 space-y-8">
        <form class="space-y-6" @submit.prevent="handleSignUp">
          <!-- Role Selection -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Choose your role</h3>
            <div class="grid grid-cols-1 gap-4">
              <label 
                for="volunteer" 
                class="relative flex cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 hover:bg-blue-50"
                :class="form.role === 'volunteer' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'"
              >
                <input
                  id="volunteer"
                  v-model="form.role"
                  name="role"
                  type="radio"
                  value="volunteer"
                  class="sr-only"
                />
                <div class="flex items-center w-full">
                  <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-500 mr-4 flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <span class="block text-base font-semibold text-gray-900">Volunteer</span>
                      <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200"
                           :class="form.role === 'volunteer' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'">
                        <div v-if="form.role === 'volunteer'" class="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <span class="block text-sm text-gray-600 mt-1">Join community events and help make a difference</span>
                  </div>
                </div>
              </label>

              <label 
                for="organizer" 
                class="relative flex cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 hover:bg-blue-50"
                :class="form.role === 'organizer' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'"
              >
                <input
                  id="organizer"
                  v-model="form.role"
                  name="role"
                  type="radio"
                  value="organizer"
                  class="sr-only"
                />
                <div class="flex items-center w-full">
                  <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-500 mr-4 flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <span class="block text-base font-semibold text-gray-900">Organizer</span>
                      <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200"
                           :class="form.role === 'organizer' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'">
                        <div v-if="form.role === 'organizer'" class="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <span class="block text-sm text-gray-600 mt-1">Create and manage volunteer events in your community</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <!-- Personal Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            
            <!-- Full Name -->
            <div class="space-y-2">
              <label for="name" class="block text-sm font-semibold text-gray-700">
                Full Name <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  id="name"
                  v-model="form.name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  required
                  class="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                  :class="{'border-red-300 focus:ring-red-500': error && !form.name}"
                  placeholder="Enter your full name"
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <div class="w-2 h-2 bg-blue-400 rounded-full opacity-0 transition-opacity duration-200" :class="{'opacity-100': form.name}"></div>
                </div>
              </div>
            </div>

            <!-- Email -->
            <div class="space-y-2">
              <label for="email" class="block text-sm font-semibold text-gray-700">
                Email Address <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  id="email"
                  v-model="form.email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                  :class="{'border-red-300 focus:ring-red-500': error && !form.email}"
                  placeholder="Enter your email address"
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <div class="w-2 h-2 bg-blue-400 rounded-full opacity-0 transition-opacity duration-200" :class="{'opacity-100': form.email}"></div>
                </div>
              </div>
            </div>

            <!-- Phone -->
            <div class="space-y-2">
              <label for="phone" class="block text-sm font-semibold text-gray-700">
                Phone Number <span class="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div class="relative">
                <input
                  id="phone"
                  v-model="form.phone"
                  name="phone"
                  type="tel"
                  autocomplete="tel"
                  class="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                  placeholder="Enter your phone number"
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <div class="w-2 h-2 bg-blue-400 rounded-full opacity-0 transition-opacity duration-200" :class="{'opacity-100': form.phone}"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Security Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Security</h3>
            
            <!-- Password -->
            <div class="space-y-2">
              <label for="password" class="block text-sm font-semibold text-gray-700">
                Password <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="form.password"
                  name="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  required
                  class="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 pr-12"
                  :class="{'border-red-300 focus:ring-red-500': error && !form.password}"
                  placeholder="Create a secure password"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <EyeIcon v-if="!showPassword" class="h-5 w-5" />
                  <EyeSlashIcon v-else class="h-5 w-5" />
                </button>
              </div>
              <div class="mt-2">
                <div class="flex items-center space-x-2 text-xs">
                  <div class="flex space-x-1">
                    <div class="w-2 h-2 rounded-full transition-colors duration-200" 
                         :class="form.password.length >= 6 ? 'bg-green-400' : 'bg-gray-300'"></div>
                    <div class="w-2 h-2 rounded-full transition-colors duration-200" 
                         :class="form.password.length >= 8 ? 'bg-green-400' : 'bg-gray-300'"></div>
                    <div class="w-2 h-2 rounded-full transition-colors duration-200" 
                         :class="/[A-Z]/.test(form.password) ? 'bg-green-400' : 'bg-gray-300'"></div>
                    <div class="w-2 h-2 rounded-full transition-colors duration-200" 
                         :class="/[0-9]/.test(form.password) ? 'bg-green-400' : 'bg-gray-300'"></div>
                  </div>
                  <span class="text-gray-500">Password strength</span>
                </div>
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="space-y-2">
              <label for="confirmPassword" class="block text-sm font-semibold text-gray-700">
                Confirm Password <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  name="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  required
                  class="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 pr-12"
                  :class="{'border-red-300 focus:ring-red-500': form.confirmPassword && form.password !== form.confirmPassword, 'border-green-300 focus:ring-green-500': form.confirmPassword && form.password === form.confirmPassword}"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <EyeIcon v-if="!showConfirmPassword" class="h-5 w-5" />
                  <EyeSlashIcon v-else class="h-5 w-5" />
                </button>
              </div>
              <div v-if="form.confirmPassword" class="mt-2 text-xs">
                <span v-if="form.password === form.confirmPassword" class="text-green-600 flex items-center">
                  <CheckCircleIcon class="h-4 w-4 mr-1" />
                  Passwords match
                </span>
                <span v-else class="text-red-600 flex items-center">
                  <XCircleIcon class="h-4 w-4 mr-1" />
                  Passwords don't match
                </span>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border-l-4 border-red-400 rounded-lg p-4 animate-in slide-in-from-top-2 duration-300">
            <div class="flex items-start">
              <ExclamationTriangleIcon class="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <p class="text-sm text-red-800 ml-3 leading-5">{{ error }}</p>
            </div>
          </div>

          <!-- Create Account Button -->
          <div class="pt-4">
            <button
              type="submit"
              :disabled="loading || !isFormValid"
              class="group relative w-full flex justify-center py-4 px-4 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-4">
                <UserPlusIcon 
                  class="h-5 w-5 text-blue-200 group-hover:text-blue-100 transition-colors duration-200" 
                  :class="{'animate-pulse': loading}"
                />
              </span>
              
              <span v-if="loading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating your account...
              </span>
              <span v-else>Create Your Account</span>
            </button>
          </div>

          <!-- Terms and Privacy -->
          <div class="text-center pt-4">
            <p class="text-xs text-gray-500 leading-relaxed">
              By creating an account, you agree to our 
              <a href="#" class="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200 hover:underline">Terms of Service</a> 
              and 
              <a href="#" class="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </form>

        <!-- Security Badge -->
        <div class="flex items-center justify-center text-xs text-gray-500 mt-6 pt-6 border-t border-gray-100">
          <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          Your information is protected with enterprise-grade security
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  HeartIcon, 
  UserPlusIcon, 
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  layout: false,
  middleware: 'guest'
})

const authStore = useAuthStore()
const loading = ref(false)
const error = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: 'volunteer' as 'volunteer' | 'organizer'
})

const isFormValid = computed(() => {
  return form.name && 
         form.email && 
         form.password && 
         form.confirmPassword && 
         form.password === form.confirmPassword &&
         form.role &&
         form.password.length >= 6
})

const handleSignUp = async () => {
  try {
    loading.value = true
    error.value = ''

    // Validate form
    if (form.password !== form.confirmPassword) {
      error.value = 'Passwords do not match'
      return
    }

    if (form.password.length < 6) {
      error.value = 'Password must be at least 6 characters'
      return
    }

    const { error: signUpError } = await authStore.signUp(
      form.email, 
      form.password, 
      {
        name: form.name,
        phone: form.phone || undefined,
        role: form.role
      }
    )
    
    if (signUpError) {
      error.value = formatAuthError(signUpError)
      return
    }

    // Show success message and redirect
    await navigateTo('/auth/signin?message=Account created successfully. Please sign in.')
  } catch (err: any) {
    error.value = formatAuthError(err.message || 'An error occurred during sign up')
  } finally {
    loading.value = false
  }
}

// SEO
useSeoMeta({
  title: 'Sign Up - VolunteerHub',
  description: 'Create your VolunteerHub account to start volunteering or organizing community events.',
})
</script>