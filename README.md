# CleanAgent.AI

A modern web application for automating cleaning business operations with AI-powered features.

## Features

- User authentication with email/password and social logins (Google, Facebook)
- Modern, responsive UI built with React and Tailwind CSS
- Form validation and error handling
- Protected routes and authenticated sessions
- Real-time updates with Supabase

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI Components
- React Hook Form
- Zod Validation
- Supabase Auth
- React Router DOM

## Getting Started

1. Clone the repository
```bash
git clone <your-repo-url>
cd cleanagent-frontend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## Environment Variables

The following environment variables are required:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy your application.

## License

MIT 