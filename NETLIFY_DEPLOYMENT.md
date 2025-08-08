# Netlify Deployment Guide for PoliUX

## Pre-deployment Checklist ✅

Your code is now ready for Netlify deployment. The following issues have been resolved:

1. **✅ Netlify Configuration**: `netlify.toml` has been updated for Next.js
2. **✅ Next.js Configuration**: `next.config.ts` optimized for Netlify
3. **✅ Build Process**: Successfully tested and passes
4. **✅ Environment Variables**: Properly configured with fallbacks

## Netlify Environment Variables Setup

After connecting your repository to Netlify, configure these environment variables in your Netlify dashboard:

Go to: **Site Settings** → **Build & deploy** → **Environment variables**

Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://nxjflegwtmrrvbwvofoq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54amZsZWd3dG1ycnZid3ZvZm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNjQzOTksImV4cCI6MjA2ODY0MDM5OX0.U6rgXpgsjWDcGTx1BrvfdS-e5TvNvZ2khg8Ib7sxzk4
NEXT_PUBLIC_APP_URL=https://your-site-name.netlify.app
NEXT_PUBLIC_SITE_NAME=PoliUX
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-5431445907349741
```

**Important**: Replace `https://your-site-name.netlify.app` with your actual Netlify domain.

## Deployment Steps

1. **Push to Git**: Ensure your code is committed and pushed to your GitHub repository
2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
3. **Deploy Settings**:
   - Build command: `npm run build` (already configured in netlify.toml)
   - Publish directory: `.next` (already configured in netlify.toml)
   - Node version: 18 (already configured in netlify.toml)
4. **Add Environment Variables** (as listed above)
5. **Deploy**: Click "Deploy site"

## Build Configuration Details

- **Next.js Version**: 15.4.6
- **Node Version**: 18+
- **Build Output**: Static optimized build
- **Image Optimization**: Disabled (unoptimized: true) for Netlify compatibility
- **Trailing Slash**: Enabled for consistent routing
- **ESLint**: Warnings allowed during build

## Post-Deployment

After successful deployment:
1. Test all routes and functionality
2. Verify Supabase authentication works
3. Check that all pages render correctly
4. Test responsive design on different devices

Your app is now ready for production deployment on Netlify! 🚀