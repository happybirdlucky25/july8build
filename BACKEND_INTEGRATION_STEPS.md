# 🔗 Complete Backend Integration Guide

## 🎯 **What You'll Have After This Setup**

- ✅ **Real Congressional Data** from ProPublica API
- ✅ **User-Specific Data** stored in Supabase
- ✅ **Secure Authentication** with row-level security
- ✅ **Real-time Updates** and data persistence
- ✅ **Scalable Architecture** ready for production

## 📋 **Step 1: Get Your API Keys**

### **ProPublica Congress API (Free)**
1. Visit: https://www.propublica.org/datastore/api/propublica-congress-api
2. Fill out the form to request access
3. You'll receive your API key via email
4. Add to your environment variables:
   ```bash
   PROPUBLICA_API_KEY=your_actual_api_key_here
   ```

### **Alternative: Congress.gov API (Official)**
1. Visit: https://api.congress.gov/
2. Request an API key
3. Add to environment variables:
   ```bash
   CONGRESS_API_KEY=your_congress_api_key_here
   ```

## 📋 **Step 2: Set Up Supabase Database**

### **In Your Supabase Dashboard:**

1. **Go to SQL Editor**
2. **Copy and paste the entire contents of `setup-database.sql`**
3. **Click "Run"** to create all tables and policies
4. **Verify tables were created** in Table Editor

### **Tables Created:**
- `user_campaigns` - User's advocacy campaigns
- `user_tracked_bills` - Bills user is following
- `user_tracked_legislators` - Legislators user is following  
- `user_notes` - User's notes on bills/legislators
- `campaign_items` - Bills/legislators associated with campaigns

## 📋 **Step 3: Update Environment Variables**

### **Local Development (`.env.local`):**
```bash
# Supabase (Already configured)
NEXT_PUBLIC_SUPABASE_URL=https://nxjflegwtmrrvbwvofoq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# ProPublica API
PROPUBLICA_API_KEY=your_propublica_api_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=PoliUX
```

### **Netlify Production:**
Add these same variables in your Netlify dashboard under Site Settings → Environment Variables.

## 📋 **Step 4: Switch to Real Data**

### **Option A: Test Real Data Search (Recommended)**
Replace your current search page with the real data version:

```bash
# Backup current version
mv src/app/search/legislation/page.tsx src/app/search/legislation/page-mock.tsx

# Use real data version
mv src/app/search/legislation/real-data-page.tsx src/app/search/legislation/page.tsx
```

### **Option B: Gradual Migration**
Keep both versions and add a toggle in your app to switch between mock and real data.

## 📋 **Step 5: Update Components to Use Real Backend**

### **Update AppContext to use Supabase:**

Replace the mock data tracking in `src/contexts/AppContext.tsx` with calls to your Supabase functions:

```typescript
// Instead of local state
const [trackedBills, setTrackedBills] = useState<string[]>([]);

// Use Supabase data
const [trackedBills, setTrackedBills] = useState<UserTrackedBill[]>([]);

// Load from Supabase
useEffect(() => {
  const loadTrackedBills = async () => {
    const bills = await getTrackedBills();
    setTrackedBills(bills);
  };
  loadTrackedBills();
}, []);
```

## 📋 **Step 6: Test Your Integration**

### **Real Data Test:**
1. Start your app: `npm run dev`
2. Go to `/search/legislation`
3. Should see real congressional bills
4. Search should work with live data

### **Backend Test:**
1. Sign up for a new account
2. Track some bills/legislators
3. Create a campaign
4. Add notes
5. Check Supabase dashboard to see data

### **API Limits Test:**
- ProPublica: 5,000 requests/day (free tier)
- Congress.gov: Rate limited but generous

## 📋 **Step 7: Deploy with Real Data**

### **Build and Test:**
```bash
npm run build
```

### **Deploy to Netlify:**
1. Push your code to GitHub
2. Netlify will auto-deploy
3. Add environment variables in Netlify dashboard
4. Test the live site

## 🔧 **Troubleshooting**

### **API Not Working?**
- Check your API key is correct
- Verify environment variables are set
- Check browser console for errors
- Try the demo endpoints first

### **Database Issues?**
- Verify RLS policies are enabled
- Check user is authenticated
- Review Supabase logs in dashboard
- Test with Supabase CLI

### **Build Errors?**
- Ensure all dependencies are installed
- Check TypeScript types are correct
- Verify import paths are correct

## 🎯 **What Each File Does**

| File | Purpose |
|------|---------|
| `propublica-api.ts` | Fetches real congressional data |
| `supabase-data.ts` | Manages user-specific data in Supabase |
| `setup-database.sql` | Creates all necessary database tables |
| `real-data-page.tsx` | Example search page with real data |

## 🚀 **Performance Optimization**

### **API Caching:**
Consider adding a caching layer for API responses:
```typescript
// Cache recent bills for 1 hour
const cacheKey = `bills-${Date.now() - (Date.now() % 3600000)}`;
```

### **Database Optimization:**
- Indexes are already created in setup script
- Use pagination for large result sets
- Consider database views for complex queries

## 🔐 **Security Best Practices**

✅ **Already Implemented:**
- Row Level Security (RLS) policies
- Environment variables for API keys
- Supabase auth integration
- Input validation

✅ **Additional Recommendations:**
- Rate limiting for API calls
- Data sanitization
- Error handling without exposing sensitive info

---

## 🎉 **You're Ready for Real Data!**

Your PoliUX app now has:
- Real congressional data from official APIs
- Secure user data storage in Supabase
- Production-ready backend integration
- Scalable architecture for growth

**Next Steps:** Test everything, deploy to Netlify, and start tracking real legislation! 🏛️
