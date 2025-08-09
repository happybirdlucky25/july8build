# 🚀 Netlify + Supabase Connection Troubleshooting Guide

## 📋 **Current Status Check**

Your PoliUX app has:
- ✅ Supabase client configured
- ✅ Authentication system built
- ✅ Environment variables template ready
- ✅ Netlify configuration file

## 🔧 **Step 1: Netlify Setup**

### **A. Connect Your GitHub Repository**

1. **Push your code to GitHub first:**
   ```bash
   # From your project directory (poliux folder)
   git init
   git add .
   git commit -m "Initial commit with Supabase auth"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose "GitHub" and authorize Netlify
   - Select your repository
   - Configure build settings:
     - **Base directory:** `poliux`
     - **Build command:** `npm ci --include=dev && npm run build`
     - **Publish directory:** `.next`

### **B. Set Netlify Environment Variables**

In your Netlify dashboard → Site settings → Environment variables, add:

| Variable Name | Value |
|---------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://nxjflegwtmrrvbwvofoq.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54amZsZWd3dG1ycnZid3ZvZm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNjQzOTksImV4cCI6MjA2ODY0MDM5OX0.U6rgXpgsjWDcGTx1BrvfdS-e5TvNvZ2khg8Ib7sxzk4` |
| `NEXT_PUBLIC_APP_URL` | `https://YOUR_SITE_NAME.netlify.app` |
| `NODE_VERSION` | `18` |

## ⚡ **Step 2: Supabase Configuration**

### **A. Verify Supabase Project Settings**

1. **Go to your Supabase Dashboard:**
   - Visit [supabase.com/dashboard](https://supabase.com/dashboard)
   - Open your project: `nxjflegwtmrrvbwvofoq`

2. **Check Authentication Settings:**
   - Go to **Authentication** → **Settings**
   - Under **Site URL**, add your Netlify domain:
     ```
     https://YOUR_SITE_NAME.netlify.app
     ```
   - Under **Redirect URLs**, add:
     ```
     https://YOUR_SITE_NAME.netlify.app/auth/callback
     https://YOUR_SITE_NAME.netlify.app/dashboard
     ```

3. **Enable Email Authentication:**
   - In **Authentication** → **Providers**
   - Make sure **Email** is enabled
   - Configure email templates if needed

### **B. Test Supabase Connection Locally**

Create a test file to verify your connection:

```bash
# Run this in your project directory
npm run dev
```

Then visit `http://localhost:3000/auth/signup` and try creating an account.

## 🐛 **Common Issues & Solutions**

### **Issue 1: "Cannot find module" errors**
**Solution:** Ensure all dependencies are in package.json
```bash
npm install --save clsx tailwind-merge
npm install --save-dev typescript @types/node
```

### **Issue 2: Build fails on Netlify**
**Solution:** Check your `netlify.toml` configuration:
```toml
[build]
  command = "npm ci --include=dev && npm run build"
  publish = ".next"
  
[build.environment]
  NODE_VERSION = "18"
  NPM_CONFIG_PRODUCTION = "false"
```

### **Issue 3: Supabase auth not working on live site**
**Solution:** 
1. Verify environment variables are set in Netlify
2. Check Supabase redirect URLs include your Netlify domain
3. Ensure Site URL is configured in Supabase

### **Issue 4: CORS errors**
**Solution:** In Supabase → Authentication → Settings:
- Add your Netlify domain to allowed origins
- Include both `https://yoursite.netlify.app` and any preview URLs

## 🧪 **Step 3: Testing Your Deployment**

### **Local Testing Checklist:**
- [ ] `npm run build` succeeds
- [ ] `npm run dev` starts without errors
- [ ] Authentication signup/signin works
- [ ] All pages load correctly

### **Netlify Testing Checklist:**
- [ ] Build completes successfully
- [ ] Site loads at your Netlify URL
- [ ] Authentication flow works
- [ ] Environment variables are accessible

### **Supabase Testing Checklist:**
- [ ] Can create new users
- [ ] Can sign in existing users
- [ ] Sessions persist across page reloads
- [ ] Sign out works properly

## 🔧 **Quick Fixes**

### **Clear Build Cache:**
```bash
# Locally
rm -rf .next node_modules package-lock.json
npm install
npm run build

# On Netlify: Go to Site settings → Build & deploy → Clear cache
```

### **Check Logs:**
- **Netlify:** Deploy logs in your dashboard
- **Supabase:** Auth logs in Authentication → Logs
- **Browser:** Developer tools console for client-side errors

## 📞 **Need Help?**

If you're still having issues, please share:
1. Your Netlify site URL
2. Specific error messages from:
   - Netlify build logs
   - Browser console
   - Supabase logs
3. Which step you're stuck on

---

## 🎯 **Next Steps After Successful Deployment**

1. **Custom Domain** (optional)
2. **Email Templates** in Supabase
3. **Social Login** providers (Google, GitHub)
4. **Database Tables** for user data
5. **Row Level Security** policies
