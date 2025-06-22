-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('volunteer', 'organizer', 'admin');
CREATE TYPE event_status AS ENUM ('draft', 'published', 'completed', 'cancelled');
CREATE TYPE registration_status AS ENUM ('registered', 'confirmed', 'attended', 'no_show', 'cancelled');
CREATE TYPE notification_type AS ENUM ('event_reminder', 'event_update', 'registration_confirmed', 'event_cancelled');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'volunteer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    location TEXT NOT NULL,
    max_volunteers INTEGER NOT NULL DEFAULT 10,
    required_skills TEXT[],
    organizer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    status event_status NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event registrations table
CREATE TABLE event_registrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
    volunteer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    status registration_status NOT NULL DEFAULT 'registered',
    notes TEXT,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, volunteer_id)
);

-- Notifications table
CREATE TABLE notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_events_organizer_id ON events(organizer_id);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX idx_event_registrations_volunteer_id ON event_registrations(volunteer_id);
CREATE INDEX idx_event_registrations_status ON event_registrations(status);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read_at ON notifications(read_at);

-- Updated at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_registrations_updated_at BEFORE UPDATE ON event_registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', ''),
        COALESCE(NEW.raw_user_meta_data->>'role', 'volunteer')::user_role
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS (Row Level Security) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profile policies
CREATE POLICY "Users can view all profiles" ON profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Event policies
CREATE POLICY "Anyone can view published events" ON events
    FOR SELECT USING (status = 'published' OR organizer_id = auth.uid());

CREATE POLICY "Organizers can create events" ON events
    FOR INSERT WITH CHECK (organizer_id = auth.uid());

CREATE POLICY "Organizers can update own events" ON events
    FOR UPDATE USING (organizer_id = auth.uid());

CREATE POLICY "Organizers can delete own events" ON events
    FOR DELETE USING (organizer_id = auth.uid());

-- Registration policies
CREATE POLICY "Users can view registrations for their events or own registrations" ON event_registrations
    FOR SELECT USING (
        volunteer_id = auth.uid() OR 
        EXISTS (SELECT 1 FROM events WHERE events.id = event_registrations.event_id AND events.organizer_id = auth.uid())
    );

CREATE POLICY "Users can register for events" ON event_registrations
    FOR INSERT WITH CHECK (volunteer_id = auth.uid());

CREATE POLICY "Users can update own registrations" ON event_registrations
    FOR UPDATE USING (volunteer_id = auth.uid());

CREATE POLICY "Organizers can update registrations for their events" ON event_registrations
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM events WHERE events.id = event_registrations.event_id AND events.organizer_id = auth.uid())
    );

CREATE POLICY "Users can delete own registrations" ON event_registrations
    FOR DELETE USING (volunteer_id = auth.uid());

-- Notification policies
CREATE POLICY "Users can view own notifications" ON notifications
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications" ON notifications
    FOR UPDATE USING (user_id = auth.uid());

-- Function to get event statistics for organizers
CREATE OR REPLACE FUNCTION get_event_stats(organizer_id UUID)
RETURNS JSON AS $$
DECLARE
    stats JSON;
BEGIN
    SELECT json_build_object(
        'total_events', COALESCE(events_count.count, 0),
        'total_volunteers', COALESCE(volunteers_count.count, 0),
        'total_registrations', COALESCE(registrations_count.count, 0),
        'upcoming_events', COALESCE(upcoming_count.count, 0),
        'completed_events', COALESCE(completed_count.count, 0),
        'avg_volunteers_per_event', COALESCE(ROUND(volunteers_count.count::DECIMAL / NULLIF(events_count.count, 0), 2), 0)
    ) INTO stats
    FROM 
        (SELECT COUNT(*) as count FROM events WHERE events.organizer_id = get_event_stats.organizer_id) events_count,
        (SELECT COUNT(DISTINCT volunteer_id) as count FROM event_registrations 
         JOIN events ON events.id = event_registrations.event_id 
         WHERE events.organizer_id = get_event_stats.organizer_id 
         AND event_registrations.status IN ('registered', 'confirmed', 'attended')) volunteers_count,
        (SELECT COUNT(*) as count FROM event_registrations 
         JOIN events ON events.id = event_registrations.event_id 
         WHERE events.organizer_id = get_event_stats.organizer_id 
         AND event_registrations.status IN ('registered', 'confirmed', 'attended')) registrations_count,
        (SELECT COUNT(*) as count FROM events 
         WHERE events.organizer_id = get_event_stats.organizer_id 
         AND events.date >= CURRENT_DATE 
         AND events.status = 'published') upcoming_count,
        (SELECT COUNT(*) as count FROM events 
         WHERE events.organizer_id = get_event_stats.organizer_id 
         AND events.status = 'completed') completed_count;
    
    RETURN stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to send notifications (placeholder for future email/SMS integration)
CREATE OR REPLACE FUNCTION create_notification(
    p_user_id UUID,
    p_event_id UUID,
    p_type notification_type,
    p_title TEXT,
    p_message TEXT
)
RETURNS UUID AS $$
DECLARE
    notification_id UUID;
BEGIN
    INSERT INTO notifications (user_id, event_id, type, title, message)
    VALUES (p_user_id, p_event_id, p_type, p_title, p_message)
    RETURNING id INTO notification_id;
    
    RETURN notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to automatically create registration confirmation notifications
CREATE OR REPLACE FUNCTION handle_registration_notification()
RETURNS TRIGGER AS $$
DECLARE
    event_record RECORD;
BEGIN
    -- Get event details
    SELECT title, date, start_time, location INTO event_record
    FROM events WHERE id = NEW.event_id;
    
    -- Create notification for successful registration
    IF NEW.status = 'registered' AND (OLD IS NULL OR OLD.status != 'registered') THEN
        PERFORM create_notification(
            NEW.volunteer_id,
            NEW.event_id,
            'registration_confirmed',
            'Registration Confirmed',
            'You have successfully registered for "' || event_record.title || '" on ' || 
            event_record.date || ' at ' || event_record.start_time || '. Location: ' || event_record.location
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_registration_change
    AFTER INSERT OR UPDATE ON event_registrations
    FOR EACH ROW EXECUTE FUNCTION handle_registration_notification();

-- Sample data (optional - remove in production)
-- Insert sample organizer
-- INSERT INTO auth.users (id, email) VALUES ('550e8400-e29b-41d4-a716-446655440000', 'organizer@example.com');
-- INSERT INTO profiles (id, email, name, role) VALUES ('550e8400-e29b-41d4-a716-446655440000', 'organizer@example.com', 'Sample Organizer', 'organizer');

-- Insert sample events
-- INSERT INTO events (title, description, date, start_time, end_time, location, max_volunteers, organizer_id, status) VALUES
-- ('Community Garden Cleanup', 'Help us clean and maintain our community garden for the spring season.', '2024-04-15', '09:00', '12:00', 'Central Park Community Garden', 15, '550e8400-e29b-41d4-a716-446655440000', 'published'),
-- ('Food Bank Sorting', 'Sort and organize donations at the local food bank.', '2024-04-20', '14:00', '17:00', 'Downtown Food Bank', 10, '550e8400-e29b-41d4-a716-446655440000', 'published'),
-- ('Beach Cleanup', 'Join us for a beach cleanup to protect our marine environment.', '2024-04-25', '08:00', '11:00', 'Sunset Beach', 20, '550e8400-e29b-41d4-a716-446655440000', 'published'); 