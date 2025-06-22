// Test connection function
export const testSupabaseConnection = async () => {
  try {
    const supabase = useSupabaseClient()
    const { data, error } = await supabase.from('profiles').select('count').limit(1)
    
    if (error) {
      console.error('Supabase connection error:', error)
      return { success: false, error: error.message }
    }
    
    console.log('✅ Supabase connection successful!')
    return { success: true, data }
  } catch (err) {
    console.error('Connection test failed:', err)
    return { success: false, error: err }
  }
} 

// Helper function to check if user has required role
export const useAuthGuard = (requiredRole?: 'volunteer' | 'organizer' | 'admin') => {
  const authStore = useAuthStore()
  
  const hasPermission = computed(() => {
    if (!requiredRole) return authStore.isAuthenticated
    
    switch (requiredRole) {
      case 'admin':
        return authStore.isAdmin
      case 'organizer':
        return authStore.isOrganizer || authStore.isAdmin
      case 'volunteer':
        return authStore.isAuthenticated
      default:
        return false
    }
  })

  return {
    hasPermission,
    user: authStore.user,
    profile: authStore.profile,
    isAuthenticated: authStore.isAuthenticated,
    isOrganizer: authStore.isOrganizer,
    isAdmin: authStore.isAdmin
  }
}

// Helper function for formatted error messages
export const formatAuthError = (error: string) => {
  const errorMap: Record<string, string> = {
    'Invalid login credentials': 'Invalid email or password. Please try again.',
    'Email not confirmed': 'Please check your email and click the confirmation link.',
    'User already registered': 'An account with this email already exists.',
    'Password should be at least 6 characters': 'Password must be at least 6 characters long.',
    'Invalid email': 'Please enter a valid email address.'
  }

  return errorMap[error] || error
} 