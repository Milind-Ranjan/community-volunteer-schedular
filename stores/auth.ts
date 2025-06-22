import { defineStore } from 'pinia'
import type { User } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  
  const profile = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)
  const isOrganizer = computed(() => profile.value?.role === 'organizer' || profile.value?.role === 'admin')
  const isAdmin = computed(() => profile.value?.role === 'admin')

  const signUp = async (email: string, password: string, userData: { name: string; phone?: string; role: 'volunteer' | 'organizer' }) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            phone: userData.phone,
            role: userData.role
          }
        }
      })

      if (signUpError) {
        error.value = signUpError.message
        return { data: null, error: signUpError.message }
      }

      return { data, error: null }
    } catch (err: any) {
      error.value = err.message
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) {
        error.value = signInError.message
        return { data: null, error: signInError.message }
      }

      // Fetch profile after successful sign in
      await fetchProfile()

      return { data, error: null }
    } catch (err: any) {
      error.value = err.message
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const signOut = async () => {
    try {
      loading.value = true
      error.value = null

      const { error: signOutError } = await supabase.auth.signOut()
      
      if (signOutError) {
        error.value = signOutError.message
        return { error: signOutError.message }
      }

      profile.value = null
      return { error: null }
    } catch (err: any) {
      error.value = err.message
      return { error: err.message }
    } finally {
      loading.value = false
    }
  }

  const fetchProfile = async () => {
    if (!user.value) return

    try {
      loading.value = true
      error.value = null

      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.value.id)
        .single()

      if (fetchError) {
        console.error('Error fetching profile:', fetchError)
        error.value = fetchError.message
        return
      }

      profile.value = data
    } catch (err: any) {
      console.error('Error in fetchProfile:', err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const updateProfile = async (updates: any) => {
    if (!user.value) return { data: null, error: 'No user logged in' }

    try {
      loading.value = true
      error.value = null

      const { data, error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.value.id)
        .select()
        .single()

      if (updateError) {
        error.value = updateError.message
        return { data: null, error: updateError.message }
      }

      profile.value = data as User
      return { data: data as User, error: null }
    } catch (err: any) {
      error.value = err.message
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  // Watch for auth state changes
  watch(user, async (newUser) => {
    if (newUser) {
      await fetchProfile()
    } else {
      profile.value = null
    }
  }, { immediate: true })

  return {
    user: readonly(user),
    profile: readonly(profile),
    loading: readonly(loading),
    error: readonly(error),
    isAuthenticated,
    isOrganizer,
    isAdmin,
    signUp,
    signIn,
    signOut,
    fetchProfile,
    updateProfile
  }
}) 