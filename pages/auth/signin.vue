<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <div class="max-w-md w-full space-y-8 relative z-10">
      <!-- Header Section -->
      <div class="text-center">
        <div class="flex justify-center mb-8">
          <div class="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300">
            <HeartIcon class="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 class="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          Welcome back
        </h2>
        <p class="text-lg text-gray-600 mb-2">
          Sign in to your account
        </p>
        <p class="text-sm text-gray-500">
          Don't have an account?
          <NuxtLink 
            to="/auth/signup" 
            class="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200 ml-1 hover:underline"
          >
            Create one here
          </NuxtLink>
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6">
        <form class="space-y-6" @submit.prevent="handleSignIn">
          <!-- Email Input -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
              Email address
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
                :class="{'border-red-300 focus:ring-red-500': error}"
                placeholder="Enter your email"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <div class="w-2 h-2 bg-blue-400 rounded-full opacity-0 transition-opacity duration-200" :class="{'opacity-100': form.email}"></div>
              </div>
            </div>
          </div>

          <!-- Password Input -->
          <div class="space-y-2">
            <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                class="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 pr-12"
                :class="{'border-red-300 focus:ring-red-500': error}"
                placeholder="Enter your password"
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
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border-l-4 border-red-400 rounded-lg p-4 animate-in slide-in-from-top-2 duration-300">
            <div class="flex items-start">
              <ExclamationTriangleIcon class="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <p class="text-sm text-red-800 ml-3 leading-5">{{ error }}</p>
            </div>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between pt-2">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="form.rememberMe"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
              />
              <label for="remember-me" class="ml-3 block text-sm font-medium text-gray-700">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a 
                href="#" 
                class="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200 hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <!-- Sign In Button -->
          <div class="pt-4">
            <button
              type="submit"
              :disabled="loading"
              class="group relative w-full flex justify-center py-4 px-4 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-4">
                <LockClosedIcon 
                  class="h-5 w-5 text-blue-200 group-hover:text-blue-100 transition-colors duration-200" 
                  :class="{'animate-pulse': loading}"
                />
              </span>
              
              <span v-if="loading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
              <span v-else>Sign in to your account</span>
            </button>
          </div>
        </form>

        <!-- Divider -->
        <div class="relative mt-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500 font-medium">Secure sign in</span>
          </div>
        </div>

        <!-- Security Badge -->
        <div class="flex items-center justify-center text-xs text-gray-500 mt-4">
          <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          Protected by SSL encryption
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  HeartIcon, 
  LockClosedIcon, 
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  layout: false,
  middleware: 'guest'
})

const authStore = useAuthStore()
const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const handleSignIn = async () => {
  try {
    loading.value = true
    error.value = ''

    const { error: signInError } = await authStore.signIn(form.email, form.password)
    
    if (signInError) {
      error.value = formatAuthError(signInError)
      return
    }

    // Redirect to my-events for organizers (their dashboard), events for volunteers
    if (authStore.isOrganizer) {
      await navigateTo('/my-events')
    } else {
      await navigateTo('/events')
    }
  } catch (err: any) {
    error.value = formatAuthError(err.message || 'An error occurred during sign in')
  } finally {
    loading.value = false
  }
}

// SEO
useSeoMeta({
  title: 'Sign In - VolunteerHub',
  description: 'Sign in to your VolunteerHub account to access volunteer opportunities and manage events.',
})
</script>