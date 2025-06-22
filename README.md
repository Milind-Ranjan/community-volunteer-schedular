# Community Volunteer Scheduler

A comprehensive platform for organizing and managing community volunteer events built with Nuxt.js, Supabase, and Tailwind CSS.

## Features

- 🔐 **Authentication System** - Secure user registration and login
- 👥 **Role-based Access** - Volunteers, Organizers, and Admin roles
- 📅 **Event Management** - Create, edit, and manage volunteer events
- ✅ **Event Registration** - Easy signup for volunteer opportunities
- 📊 **Dashboard Analytics** - Track events, volunteers, and registrations
- 🔔 **Notifications** - Stay updated on event changes
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **Frontend**: Nuxt.js 3, Vue 3, TypeScript
- **Styling**: Tailwind CSS, Headless UI
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **State Management**: Pinia
- **Icons**: Heroicons

## Quick Start

### Prerequisites

- Node.js 18+ 
- A Supabase account

### 1. Clone and Install

```bash
git clone <repository-url>
cd community-volunteer-scheduler
npm install
```

### 2. Supabase Setup

1. Create a new project at [Supabase](https://app.supabase.com)
2. Copy your project URL and keys from Settings > API
3. Create a `.env` file in the root directory:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3. Database Setup

Run the SQL schema in your Supabase SQL editor:

```bash
# The schema file is provided at: supabase-schema.sql
# Copy and run this in your Supabase SQL editor
```

### 4. Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see your app!

## Authentication Setup

The authentication system is fully configured with:

- **Sign Up/Sign In** pages with role selection
- **Protected routes** with middleware
- **Role-based permissions** (Volunteer, Organizer, Admin)
- **Profile management** with Supabase integration
- **Session persistence** across page reloads

### User Roles

- **Volunteer**: Can view and register for events
- **Organizer**: Can create and manage events + all volunteer permissions
- **Admin**: Full system access + all organizer permissions

## Environment Variables

```env
# Required for Supabase integration
SUPABASE_URL=              # Your Supabase project URL
SUPABASE_ANON_KEY=         # Your Supabase anon/public key  
SUPABASE_SERVICE_ROLE_KEY= # Your Supabase service role key
```

## Project Structure

```
├── components/          # Reusable Vue components
├── composables/         # Vue composables and utilities
├── layouts/             # Nuxt layout components
├── middleware/          # Route middleware (auth, guest)
├── pages/              # File-based routing
│   ├── auth/           # Authentication pages
│   └── events/         # Event-related pages
├── stores/             # Pinia state management
├── types/              # TypeScript type definitions
└── supabase-schema.sql # Database schema
```

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your community initiatives! 