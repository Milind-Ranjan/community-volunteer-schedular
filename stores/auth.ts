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

      // First, create the user without metadata to avoid trigger issues
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password
      })

      if (signUpError) {
        error.value = signUpError.message
        return { data: null, error: signUpError.message }
      }

      // If user was created successfully, manually create the profile
      if (authData.user) {
        try {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: authData.user.id,
              email: email,
              name: userData.name,
              phone: userData.phone || null,
              role: userData.role
            })
            .select()
            .single()

          if (profileError) {
            console.error('Profile creation error:', profileError)
            // If profile creation fails, we should still return success
            // since the user was created successfully
            console.log('User created but profile creation failed. This can be handled later.')
          }
        } catch (profileErr) {
          console.error('Profile creation exception:', profileErr)
          // Don't fail the signup process if profile creation fails
        }
      }

      return { data: authData, error: null }
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
        
        // If profile doesn't exist, create it
        if (fetchError.code === 'PGRST116') {
          console.log('Profile not found, creating default profile...')
          
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: user.value.id,
              email: user.value.email || '',
              name: user.value.user_metadata?.name || 'User',
              role: user.value.user_metadata?.role || 'volunteer',
              phone: user.value.user_metadata?.phone || null
            })
            .select()
            .single()

          if (createError) {
            console.error('Error creating profile:', createError)
            error.value = createError.message
            return
          }

          profile.value = newProfile
          console.log('Profile created successfully:', newProfile)
          return
        }
        
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
    user,
    profile,
    loading,
    error,
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