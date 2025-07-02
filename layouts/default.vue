<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
          <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
              <NuxtLink to="/" class="flex items-center">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <HeartIcon class="w-5 h-5 text-white" />
              </div>
                <span class="ml-2 text-xl font-bold text-gray-900">VolunteerHub</span>
            </NuxtLink>
          </div>

            <!-- Navigation Links -->
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NuxtLink 
              to="/events" 
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                active-class="border-blue-500 text-gray-900"
            >
              Browse Events
            </NuxtLink>
            <NuxtLink 
              v-if="authStore.isOrganizer" 
              to="/events/create" 
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                active-class="border-blue-500 text-gray-900"
            >
              Create Event
            </NuxtLink>
            <NuxtLink 
              v-if="authStore.isAuthenticated" 
              to="/my-events" 
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                active-class="border-blue-500 text-gray-900"
            >
              {{ authStore.isOrganizer ? 'My Events' : 'My Registrations' }}
            </NuxtLink>
            </div>
          </div>

          <!-- User Menu -->
          <div class="flex items-center">
            <div v-if="authStore.isAuthenticated" class="flex items-center space-x-4">
              <!-- User Profile Dropdown -->
              <div class="relative">
              <button 
                  @click="showDropdown = !showDropdown"
                  class="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserIcon class="w-5 h-5 text-blue-600" />
                  </div>
                  <span class="ml-2 text-gray-700 font-medium">{{ authStore.profile?.name }}</span>
                  <ChevronDownIcon class="ml-1 w-4 h-4 text-gray-500" />
              </button>
              
                <!-- Dropdown Menu -->
              <div 
                  v-if="showDropdown"
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  @click="showDropdown = false"
                >
                  <div class="py-1">
                <NuxtLink 
                  to="/profile" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </NuxtLink>
                <button 
                  @click="handleSignOut"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Auth Buttons -->
            <div v-else class="flex items-center space-x-4">
              <NuxtLink 
                to="/auth/signin" 
                class="text-gray-500 hover:text-gray-700 text-sm font-medium"
              >
                Sign In
              </NuxtLink>
              <NuxtLink 
                to="/auth/signup" 
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
import { 
  HeartIcon, 
  UserIcon, 
  ChevronDownIcon 
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const showDropdown = ref(false)

const handleSignOut = async () => {
  try {
  await authStore.signOut()
  await navigateTo('/')
  } catch (error) {
    console.error('Sign out error:', error)
  }
}

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      showDropdown.value = false
  }
  })
})
</script> 