<template>
  <div class="min-h-screen">
    <!-- Hero Section with Enhanced Gradient and Animation -->
    <section class="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0 opacity-40" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23dbeafe&quot; fill-opacity=&quot;0.3&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"></div>
      <div class="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-32">
        <div class="text-center space-y-8">
          
          <!-- Main Headline -->
<!-- Main Headline -->
<div class="space-y-8 px-4 sm:px-8 max-w-5xl mx-auto">
  <h1 class="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-snug sm:leading-tight mb-10 text-center">
    Make a Difference in Your
    <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 relative inline-block">
      Community
      <div class="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transform scale-x-0 animate-scale-x"></div>
    </span>
  </h1>
    <p class="text-lg sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-center">
      Connect with meaningful volunteer opportunities and organize impactful community events. 
      <span class="text-blue-600 font-semibold">Simple. Powerful. Community-driven.</span>
  </p>
</div>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-in-delayed">
            <NuxtLink 
              to="/events" 
              class="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-2xl hover:from-blue-700 hover:to-indigo-700 font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg relative overflow-hidden"
            >
              <span class="relative z-10 flex items-center">
                Find Events to Join
                <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NuxtLink>
            
            <NuxtLink 
              v-if="!authStore.isAuthenticated"
              to="/auth/signup" 
              class="group bg-white/90 backdrop-blur-sm text-blue-600 border-2 border-blue-200/50 px-10 py-4 rounded-2xl hover:bg-white hover:border-blue-300 font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-md"
            >
              <span class="flex items-center">
                Get Started Free
                <svg class="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </span>
            </NuxtLink>
            
            <NuxtLink 
              v-if="authStore.isOrganizer"
              to="/events/create" 
              class="group bg-white/90 backdrop-blur-sm text-blue-600 border-2 border-blue-200/50 px-10 py-4 rounded-2xl hover:bg-white hover:border-blue-300 font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-md"
            >
              <span class="flex items-center">
                Create Event
                <svg class="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section with Cards -->
    <section class="py-24 bg-white relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Why Choose VolunteerHub?
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We simplify community volunteering with powerful features designed for both volunteers and organizers
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>
            <div class="relative">
              <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <CalendarDaysIcon class="w-10 h-10 text-white" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Easy Event Management</h3>
              <p class="text-gray-600 leading-relaxed">
                Create and manage volunteer events with detailed descriptions, schedules, and requirements. Everything you need in one place.
              </p>
              <div class="mt-6 flex items-center text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Learn more</span>
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-green-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
            <div class="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>
            <div class="relative">
              <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <UserGroupIcon class="w-10 h-10 text-white" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Smart Registration</h3>
              <p class="text-gray-600 leading-relaxed">
                Volunteers can easily sign up for events with automatic confirmations, reminders, and seamless communication.
              </p>
              <div class="mt-6 flex items-center text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Learn more</span>
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-purple-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>
            <div class="relative">
              <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <ChartBarIcon class="w-10 h-10 text-white" />
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Real-time Dashboard</h3>
              <p class="text-gray-600 leading-relaxed">
                Track registrations, manage attendance, and get deep insights into your volunteer programs with analytics.
              </p>
              <div class="mt-6 flex items-center text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Learn more</span>
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Upcoming Events Section -->
    <section class="py-24 bg-white relative overflow-hidden">
      <!-- Decorative Background -->
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-full blur-3xl"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Enhanced Header -->
        <div class="text-center mb-16">
          <h2 class="text-5xl font-bold text-gray-900 mb-6">
            Join Amazing 
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Community Initiatives
            </span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover meaningful volunteer opportunities in your area and connect with like-minded community members making a difference.
          </p>
          
          <!-- View All Events Button -->
          <NuxtLink 
            to="/events" 
            class="group inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-indigo-700 font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
          >
            <span>View All Events</span>
            <svg class="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </NuxtLink>
        </div>

        <!-- Enhanced Loading State -->
        <div v-if="eventsStore.loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="i in 6" :key="i" class="group">
            <div class="bg-white rounded-3xl shadow-lg hover:shadow-2xl p-8 border border-gray-100 transition-all duration-300 animate-pulse">
              <div class="flex items-center justify-between mb-6">
                <div class="h-8 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full w-24"></div>
                <div class="h-6 bg-gray-200 rounded-full w-16"></div>
              </div>
              <div class="space-y-4">
                <div class="h-6 bg-gray-200 rounded-lg w-3/4"></div>
                <div class="h-4 bg-gray-200 rounded w-full"></div>
                <div class="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div class="mt-8 pt-6 border-t border-gray-100">
                <div class="h-12 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Empty State -->
        <div v-else-if="featuredEvents.length === 0" class="text-center py-20">
          <div class="relative inline-block mb-12">
            <div class="w-40 h-40 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-lg">
              <CalendarDaysIcon class="w-20 h-20 text-blue-500" />
            </div>
            <div class="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
          </div>
          
          <h3 class="text-3xl font-bold text-gray-900 mb-6">No upcoming events yet</h3>
          <p class="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Be the first to create a community event and start making a difference! Your initiative could inspire others to join and build a stronger community together.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-6 justify-center">
            <NuxtLink 
              v-if="authStore.isOrganizer"
              to="/events/create" 
              class="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-2xl hover:from-blue-700 hover:to-indigo-700 font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
            >
              <span class="flex items-center">
                Create First Event
                <svg class="w-5 h-5 ml-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </span>
            </NuxtLink>
            <NuxtLink 
              v-else
              to="/auth/signup" 
              class="group bg-white text-blue-600 border-2 border-blue-200 px-10 py-5 rounded-2xl hover:bg-blue-50 hover:border-blue-300 font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
            >
              <span class="flex items-center">
                Join as Organizer
                <svg class="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </NuxtLink>
          </div>
        </div>

        <!-- Enhanced Events Grid -->
        <div v-else class="space-y-12">
          <!-- Stats Bar -->
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div class="space-y-2">
                <div class="text-3xl font-bold text-blue-600">{{ featuredEvents.length }}+</div>
                <div class="text-gray-600 font-medium">Active Events</div>
              </div>
              <div class="space-y-2">
                <div class="text-3xl font-bold text-indigo-600">500+</div>
                <div class="text-gray-600 font-medium">Volunteers Joined</div>
              </div>
              <div class="space-y-2">
                <div class="text-3xl font-bold text-blue-600">50+</div>
                <div class="text-gray-600 font-medium">Organizations</div>
              </div>
            </div>
          </div>

          <!-- Events Carousel -->
          <div class="relative">
            <!-- Carousel Container -->
            <div 
              class="overflow-hidden rounded-3xl mx-16"
              @touchstart="handleTouchStart"
              @touchmove="handleTouchMove"
              @touchend="handleTouchEnd"
            >
              <div 
                ref="carouselRef"
                class="flex transition-transform duration-700 ease-in-out"
                :style="{ transform: `translateX(-${currentSlide * slideWidth}%)` }"
              >
                <div 
                  v-for="(event, index) in featuredEvents" 
                  :key="event.id"
                  class="flex-shrink-0"
                  :class="[
                    'px-4',
                    carouselSettings.slidesToShow === 1 ? 'w-full' :
                    carouselSettings.slidesToShow === 2 ? 'w-1/2' : 'w-1/3'
                  ]"
                >
                  <EventCard 
                    :event="event" 
                    :show-actions="false"
                    :registration-count="registrationCounts[event.id] || 0"
                    @registration-changed="handleRegistrationChanged"
                    class="transform hover:scale-105 transition-all duration-300 hover:shadow-2xl h-full"
                  />
                </div>
              </div>
            </div>

            <!-- Navigation Arrows - positioned outside the cards -->
            <button
              @click="previousSlide"
              class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-blue-600 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
              :class="{ 'opacity-50 cursor-not-allowed': totalSlides <= 1 }"
              :disabled="totalSlides <= 1"
            >
              <svg class="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              @click="nextSlide"
              class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-blue-600 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
              :class="{ 'opacity-50 cursor-not-allowed': totalSlides <= 1 }"
              :disabled="totalSlides <= 1"
            >
              <svg class="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <!-- Dots Indicator -->
            <div v-if="totalSlides > 1" class="flex justify-center mt-8 space-x-3">
              <button
                v-for="(dot, index) in totalSlides"
                :key="index"
                @click="goToSlide(index)"
                class="w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125"
                :class="[
                  currentSlide === index 
                    ? 'bg-blue-600 shadow-lg' 
                    : 'bg-blue-200 hover:bg-blue-400'
                ]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Enhanced CTA Section -->
    <section class="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;80&quot; height=&quot;80&quot; viewBox=&quot;0 0 80 80&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;40&quot; cy=&quot;40&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"></div>
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      
      <div class="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div class="space-y-8">
          
          <p class="text-xl sm:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Join thousands of volunteers and organizers already using VolunteerHub to strengthen their communities and create lasting change.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <NuxtLink 
              v-if="!authStore.isAuthenticated"
              to="/auth/signup" 
              class="group bg-white text-blue-600 px-12 py-5 rounded-2xl hover:bg-gray-50 font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl"
            >
              <span class="flex items-center">
                Sign Up Free
                <svg class="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
            </NuxtLink>
            
            <NuxtLink 
              to="/events" 
              class="group bg-blue-500/80 backdrop-blur-sm text-white border-2 border-blue-400/50 px-12 py-5 rounded-2xl hover:bg-blue-400/80 hover:border-blue-300/50 font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl"
            >
              <span class="flex items-center">
                Browse Events
                <svg class="w-6 h-6 ml-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-50 border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="text-center">
          <p class="text-gray-600 text-sm">
            Created by <span class="font-semibold text-blue-600">Milind Ranjan</span>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { 
  CalendarDaysIcon, 
  UserGroupIcon, 
  ChartBarIcon
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const eventsStore = useEventsStore()

// Track registration counts for events
const registrationCounts = ref<Record<string, number>>({})

// Carousel state
const currentSlide = ref(0)
const carouselRef = ref(null)

// Responsive carousel settings
const carouselSettings = computed(() => {
  if (process.client) {
    const width = window.innerWidth
    if (width < 768) return { slidesToShow: 1 }
    if (width < 1024) return { slidesToShow: 2 }
    return { slidesToShow: 3 }
  }
  return { slidesToShow: 3 }
})

// Computed properties for carousel
const slideWidth = computed(() => 100 / carouselSettings.value.slidesToShow)
const totalSlides = computed(() => {
  if (featuredEvents.value.length <= carouselSettings.value.slidesToShow) return 0
  return Math.max(0, featuredEvents.value.length - carouselSettings.value.slidesToShow + 1)
})

// Fetch featured events on component mount
const featuredEvents = computed(() => 
  eventsStore.upcomingEvents.slice(0, 6)
)

const fetchRegistrationCounts = async () => {
  for (const event of featuredEvents.value) {
    const { data } = await eventsStore.fetchEventRegistrations(event.id)
    if (data) {
      registrationCounts.value[event.id] = data.filter(reg => reg.status !== 'cancelled').length
    }
  }
}

const handleRegistrationChanged = async (eventId: string) => {
  const { data } = await eventsStore.fetchEventRegistrations(eventId)
  if (data) {
    registrationCounts.value[eventId] = data.filter(reg => reg.status !== 'cancelled').length
  }
}

// Carousel control functions
const nextSlide = () => {
  console.log('Next slide clicked:', { 
    currentSlide: currentSlide.value, 
    totalSlides: totalSlides.value,
    featuredEventsLength: featuredEvents.value.length,
    slidesToShow: carouselSettings.value.slidesToShow
  })
  
  if (totalSlides.value <= 1) {
    console.log('No navigation needed - not enough slides')
    return
  }
  
  const newSlide = (currentSlide.value + 1) % totalSlides.value
  console.log('Moving to slide:', newSlide)
  currentSlide.value = newSlide
}

const previousSlide = () => {
  console.log('Previous slide clicked:', { 
    currentSlide: currentSlide.value, 
    totalSlides: totalSlides.value,
    featuredEventsLength: featuredEvents.value.length,
    slidesToShow: carouselSettings.value.slidesToShow
  })
  
  if (totalSlides.value <= 1) {
    console.log('No navigation needed - not enough slides')
    return
  }
  
  const newSlide = currentSlide.value === 0 ? totalSlides.value - 1 : currentSlide.value - 1
  console.log('Moving to slide:', newSlide)
  currentSlide.value = newSlide
}

const goToSlide = (index: number) => {
  console.log('Go to slide clicked:', index)
  currentSlide.value = index
}

// Handle window resize for responsive behavior
const handleResize = () => {
  // Reset slide position if it's out of bounds after resize
  if (currentSlide.value >= totalSlides.value) {
    currentSlide.value = Math.max(0, totalSlides.value - 1)
  }
}

// Touch/swipe handling
const touchStart = ref(0)
const touchEnd = ref(0)
const minSwipeDistance = 50

const handleTouchStart = (e: TouchEvent) => {
  touchStart.value = e.targetTouches[0].clientX
}

const handleTouchMove = (e: TouchEvent) => {
  touchEnd.value = e.targetTouches[0].clientX
}

const handleTouchEnd = () => {
  if (!touchStart.value || !touchEnd.value) return
  
  const distance = touchStart.value - touchEnd.value
  const isLeftSwipe = distance > minSwipeDistance
  const isRightSwipe = distance < -minSwipeDistance

  if (isLeftSwipe) {
    nextSlide()
  } else if (isRightSwipe) {
    previousSlide()
  }
  
  // Reset
  touchStart.value = 0
  touchEnd.value = 0
}

onMounted(async () => {
  await eventsStore.fetchEvents({ 
    status: 'published', 
    upcoming: true 
  })
  await fetchRegistrationCounts()
  
  // Initialize carousel resize handler
  if (process.client) {
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('resize', handleResize)
  }
})

// SEO
useSeoMeta({
  title: 'VolunteerHub - Community Volunteer Scheduler',
  ogTitle: 'VolunteerHub - Community Volunteer Scheduler',
  description: 'Connect with local volunteer opportunities and help organize community events. Make volunteering simple and impactful.',
  ogDescription: 'Connect with local volunteer opportunities and help organize community events. Make volunteering simple and impactful.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
})
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scale-x {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-slide-up {
  animation: slide-up 1s ease-out;
}

.animate-scale-x {
  animation: scale-x 1.2s ease-out 0.5s both;
}

.animate-fade-in-delayed {
  animation: fade-in 1s ease-out 0.3s both;
}

.animation-delay-2000 {
  animation-delay: 2s;
}
</style>