# 🔗 Real Data & Backend Integration Guide

## 🎯 **Overview**

This guide shows you how to replace mock data with real congressional data and connect your Supabase backend for user data persistence.

## 📊 **Data Sources Available**

### **1. Congressional Data APIs**
- **Congress.gov API** (Official U.S. Government)
- **ProPublica Congress API** (Excellent, free tier)
- **OpenCongress API** (Community-driven)
- **GovTrack API** (Bill tracking focused)

### **2. Your Supabase Backend**
- User authentication ✅ (Already connected)
- User campaigns, tracking, notes
- Real-time data sync

## 🚀 **Step-by-Step Integration**

### **Phase 1: Connect Real Congressional APIs**

1. **Get API Keys:**
   ```bash
   # ProPublica (Recommended - Free)
   # Visit: https://www.propublica.org/datastore/api/propublica-congress-api
   PROPUBLICA_API_KEY=your_key_here

   # Congress.gov (Official)
   # Visit: https://api.congress.gov/
   CONGRESS_API_KEY=your_key_here
   ```

2. **Add to Environment:**
   ```bash
   # In your .env.local
   PROPUBLICA_API_KEY=your_propublica_key
   CONGRESS_API_KEY=your_congress_key
   ```

### **Phase 2: Database Schema for User Data**

Your Supabase needs these tables for user-specific data:

```sql
-- User Campaigns
CREATE TABLE user_campaigns (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User Tracked Bills
CREATE TABLE user_tracked_bills (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  bill_id TEXT NOT NULL,
  bill_congress TEXT,
  bill_type TEXT,
  bill_number TEXT,
  tracked_at TIMESTAMP DEFAULT NOW()
);

-- User Tracked Legislators
CREATE TABLE user_tracked_legislators (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  bioguide_id TEXT NOT NULL,
  tracked_at TIMESTAMP DEFAULT NOW()
);

-- User Notes
CREATE TABLE user_notes (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  entity_type TEXT NOT NULL, -- 'bill' or 'legislator'
  entity_id TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Campaign Items (Bills/Legislators in campaigns)
CREATE TABLE campaign_items (
  id SERIAL PRIMARY KEY,
  campaign_id INTEGER REFERENCES user_campaigns(id),
  item_type TEXT NOT NULL, -- 'bill' or 'legislator'
  item_id TEXT NOT NULL,
  added_at TIMESTAMP DEFAULT NOW()
);
```

### **Phase 3: Row Level Security (RLS)**

```sql
-- Enable RLS on all tables
ALTER TABLE user_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tracked_bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tracked_legislators ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_items ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own campaigns" ON user_campaigns
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own tracked bills" ON user_tracked_bills
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own tracked legislators" ON user_tracked_legislators
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own notes" ON user_notes
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own campaign items" ON campaign_items
  FOR ALL USING (
    campaign_id IN (
      SELECT id FROM user_campaigns WHERE user_id = auth.uid()
    )
  );
```
