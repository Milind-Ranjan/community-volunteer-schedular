// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  ssr: false,
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode'
  ],
  css: ['~/assets/css/main.css'],
  colorMode: {
    classSuffix: ''
  },
  supabase: {
    url: 'https://rdpcxeyeljmlfwbrrenc.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkcGN4ZXllbGptbGZ3YnJyZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MzcxMDQsImV4cCI6MjA2NjExMzEwNH0.A6woAhKR3CoCtTkVUaBPXp8Csi1MqSMaRizlsyAer5E',
    redirectOptions: {
      login: '/auth/signin',
      callback: '/',
      exclude: ['/', '/events', '/auth/*']
    }
  },
  runtimeConfig: {
    // Private keys (only available on server-side)
    supabaseServiceKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkcGN4ZXllbGptbGZ3YnJyZW5jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDUzNzEwNCwiZXhwIjoyMDY2MTEzMTA0fQ.6K_XHmuJMXXgzTH3dfaLyBD8YiuaFm81Z2_pT3CONos',

    // Public keys (exposed to client-side)
    public: {
      supabaseUrl: 'https://rdpcxeyeljmlfwbrrenc.supabase.co',
      supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkcGN4ZXllbGptbGZ3YnJyZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MzcxMDQsImV4cCI6MjA2NjExMzEwNH0.A6woAhKR3CoCtTkVUaBPXp8Csi1MqSMaRizlsyAer5E'
    }
  },
  app: {
    head: {
      title: 'Community Volunteer Scheduler',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Organize and manage community volunteer events with ease' }
      ]
    }
  }
}) 