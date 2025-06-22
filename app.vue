<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Initialize auth store on app start
const authStore = useAuthStore()

// Listen for auth state changes
onMounted(() => {
  // The auth store will automatically handle user state through the useSupabaseUser composable
  console.log('App initialized - Auth system ready')
})
</script>
