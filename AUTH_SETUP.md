# PoliUX Authentication Setup

## 🚀 Quick Setup Guide

### 1. Supabase Project Setup

1. Go to [Supabase](https://supabase.com) and create a new project
2. In your Supabase dashboard:
   - Go to **Settings** → **API**
   - Copy your **Project URL** and **anon key**

### 2. Environment Variables

Create a `.env.local` file in the `/poliux` directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=PoliUX

# Google AdSense
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-5431445907349741
```

### 3. Supabase Database Setup

Your Supabase project automatically includes user authentication tables. No additional setup required!

### 4. Netlify Deployment

#### Environment Variables in Netlify:
1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add these variables:

| Variable Name | Value |
|---------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `NEXT_PUBLIC_APP_URL` | `https://yoursite.netlify.app` |
| `NEXT_PUBLIC_SITE_NAME` | `PoliUX` |
| `NEXT_PUBLIC_GOOGLE_ADSENSE_ID` | `ca-pub-5431445907349741` |

#### Build Settings:
- **Build command**: `npm run build`
- **Publish directory**: `.next`

## 🔐 Authentication Features

### ✅ What's Included:

- **User Registration** - Email/password signup with email confirmation
- **User Login** - Secure authentication with session management
- **Protected Routes** - Automatic redirect for unauthenticated users
- **User Dashboard** - Personalized landing page for authenticated users
- **Navigation Updates** - Dynamic navigation based on auth state
- **Session Persistence** - Users stay logged in across browser sessions

### 🔒 Protected Pages:
- `/dashboard` - User dashboard (redirects to sign-in if not authenticated)
- `/tracked` - Tracked bills and legislators
- `/campaigns` - Campaign management
- `/campaigns/[id]` - Individual campaign pages
- `/campaigns/new` - Create new campaign

### 🌐 Public Pages:
- `/` - Landing page (redirects authenticated users to dashboard)
- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page
- `/constitution` - U.S. Constitution
- `/info-center` - Civic education
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## 🧪 Testing Authentication

### Local Development:
```bash
cd poliux
npm run dev
```

### Test Flow:
1. Visit `http://localhost:3000`
2. Click "Get Started Free" → Should redirect to signup
3. Create an account → Check email for confirmation
4. Sign in → Should redirect to dashboard
5. Try accessing `/tracked` without authentication → Should redirect to sign-in
6. Sign out → Should return to landing page

## 🚨 Important Notes

- **Email Confirmation**: Supabase requires email confirmation by default
- **Local Development**: Users can sign up but need to confirm email to sign in
- **Production**: Make sure to configure your domain in Supabase auth settings
- **Security**: Never commit `.env.local` to git (it's in .gitignore)

## 🎯 Next Steps

1. **Deploy to Netlify** with environment variables
2. **Test authentication flow** end-to-end
3. **Configure custom email templates** in Supabase (optional)
4. **Add social login providers** like Google/GitHub (optional)
5. **Implement user profiles** and preferences (future enhancement)

Your PoliUX app now has full authentication! 🎉
