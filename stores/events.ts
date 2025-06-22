import { defineStore } from 'pinia'
import type { Event, EventRegistration, EventStats } from '~/types'

export const useEventsStore = defineStore('events', () => {
  const supabase = useSupabaseClient()
  
  const events = ref<Event[]>([])
  const registrations = ref<EventRegistration[]>([])
  const stats = ref<EventStats | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const upcomingEvents = computed(() => 
    events.value
      .filter(event => event.status === 'published' && new Date(event.date) >= new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  )

  const myEvents = computed(() => {
    const authStore = useAuthStore()
    if (!authStore.profile) return []
    
    return events.value.filter(event => event.organizer_id === authStore.profile.id)
  })

  const myRegistrations = computed(() => {
    const authStore = useAuthStore()
    if (!authStore.user) return []
    
    return registrations.value.filter(reg => reg.volunteer_id === authStore.user.id)
  })

  const fetchEvents = async (filters?: { organizer?: string; status?: string; upcoming?: boolean }) => {
    try {
      loading.value = true
      error.value = null

      // Simple query - get ALL events, no complications
      const { data, error: fetchError } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })

      if (fetchError) {
        console.error('Error fetching events:', fetchError)
        error.value = fetchError.message
        return { data: [], error: fetchError.message }
      }

      events.value = data || []
      console.log('✅ Events fetched successfully:', data?.length || 0, 'events')
      console.log('Events data:', data)
      return { data: data || [], error: null }
    } catch (err: any) {
      console.error('Error in fetchEvents:', err)
      error.value = err.message
      return { data: [], error: err.message }
    } finally {
      loading.value = false
    }
  }

  const createEvent = async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: createError } = await supabase
        .from('events')
        .insert([eventData])
        .select(`
          *,
          organizer:profiles(name, email)
        `)
        .single()

      if (createError) {
        error.value = createError.message
        return { data: null, error: createError.message }
      }

      events.value.push(data)
      return { data, error: null }
    } catch (err: any) {
      error.value = err.message
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const updateEvent = async (eventId: string, updates: Partial<Event>) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: updateError } = await supabase
        .from('events')
        .update(updates)
        .eq('id', eventId)
        .select(`
          *,
          organizer:profiles(name, email)
        `)
        .single()

      if (updateError) throw updateError

      const index = events.value.findIndex(event => event.id === eventId)
      if (index !== -1) {
        events.value[index] = data
      }

      return { data, error: null }
    } catch (err: any) {
      error.value = err.message
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const deleteEvent = async (eventId: string) => {
    try {
      loading.value = true
      error.value = null

      const { error: deleteError } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId)

      if (deleteError) throw deleteError

      events.value = events.value.filter(event => event.id !== eventId)
      return { error: null }
    } catch (err: any) {
      error.value = err.message
      return { error: err.message }
    } finally {
      loading.value = false
    }
  }

  const registerForEvent = async (eventId: string) => {
    try {
      const authStore = useAuthStore()
      if (!authStore.user) throw new Error('Must be logged in to register')

      loading.value = true
      error.value = null

      const { data, error: registerError } = await supabase
        .from('event_registrations')
        .insert([{
          event_id: eventId,
          volunteer_id: authStore.user.id,
          status: 'registered'
        }])
        .select(`
          *,
          event:events(*),
          volunteer:profiles(*)
        `)
        .single()

      if (registerError) throw registerError

      registrations.value.push(data)
      return { data, error: null }
    } catch (err: any) {
      error.value = err.message
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const cancelRegistration = async (registrationId: string) => {
    try {
      loading.value = true
      error.value = null

      const { error: cancelError } = await supabase
        .from('event_registrations')
        .update({ status: 'cancelled' })
        .eq('id', registrationId)

      if (cancelError) throw cancelError

      const index = registrations.value.findIndex(reg => reg.id === registrationId)
      if (index !== -1) {
        registrations.value[index].status = 'cancelled'
      }

      return { error: null }
    } catch (err: any) {
      error.value = err.message
      return { error: err.message }
    } finally {
      loading.value = false
    }
  }

  const fetchEventRegistrations = async (eventId: string) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: fetchError } = await supabase
        .from('event_registrations')
        .select(`
          *,
          volunteer:profiles(name, email, phone)
        `)
        .eq('event_id', eventId)
        .order('registered_at', { ascending: true })

      if (fetchError) throw fetchError

      return { data: data || [], error: null }
    } catch (err: any) {
      error.value = err.message
      return { data: [], error: err.message }
    } finally {
      loading.value = false
    }
  }

  const updateRegistrationStatus = async (registrationId: string, status: EventRegistration['status']) => {
    try {
      loading.value = true
      error.value = null

      const { data, error: updateError } = await supabase
        .from('event_registrations')
        .update({ status })
        .eq('id', registrationId)
        .select()
        .single()

      if (updateError) throw updateError

      const index = registrations.value.findIndex(reg => reg.id === registrationId)
      if (index !== -1) {
        registrations.value[index] = data
      }

      return { data, error: null }
    } catch (err: any) {
      error.value = err.message
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const fetchStats = async () => {
    try {
      const authStore = useAuthStore()
      if (!authStore.user) return { data: null, error: 'Not authenticated' }

      loading.value = true
      error.value = null

      const { data, error: statsError } = await supabase
        .rpc('get_event_stats', { organizer_id: authStore.user.id })

      if (statsError) throw statsError

      stats.value = data
      return { data, error: null }
    } catch (err: any) {
      error.value = err.message
      return { data: null, error: err.message }
    } finally {
      loading.value = false
    }
  }

  return {
    events: readonly(events),
    registrations: readonly(registrations),
    stats: readonly(stats),
    loading: readonly(loading),
    error: readonly(error),
    upcomingEvents,
    myEvents,
    myRegistrations,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    cancelRegistration,
    fetchEventRegistrations,
    updateRegistrationStatus,
    fetchStats
  }
}) 