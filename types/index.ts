export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: 'volunteer' | 'organizer' | 'admin'
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  start_time: string
  end_time: string
  location: string
  max_volunteers: number
  required_skills?: string[]
  organizer_id: string
  organizer?: User
  status: 'draft' | 'published' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}

export interface EventRegistration {
  id: string
  event_id: string
  volunteer_id: string
  volunteer?: User
  event?: Event
  status: 'registered' | 'confirmed' | 'attended' | 'no_show' | 'cancelled'
  notes?: string
  registered_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  event_id: string
  type: 'event_reminder' | 'event_update' | 'registration_confirmed' | 'event_cancelled'
  title: string
  message: string
  sent_at?: string
  read_at?: string
  created_at: string
}

export interface EventStats {
  total_events: number
  total_volunteers: number
  total_registrations: number
  upcoming_events: number
  completed_events: number
  avg_volunteers_per_event: number
} 