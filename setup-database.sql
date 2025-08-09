-- PoliUX Database Setup for Supabase
-- Run this in your Supabase SQL Editor

-- 1. Create user campaigns table
CREATE TABLE IF NOT EXISTS user_campaigns (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create user tracked bills table
CREATE TABLE IF NOT EXISTS user_tracked_bills (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  bill_id TEXT NOT NULL,
  bill_congress TEXT,
  bill_type TEXT,
  bill_number TEXT,
  tracked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, bill_id)
);

-- 3. Create user tracked legislators table
CREATE TABLE IF NOT EXISTS user_tracked_legislators (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  bioguide_id TEXT NOT NULL,
  tracked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, bioguide_id)
);

-- 4. Create user notes table
CREATE TABLE IF NOT EXISTS user_notes (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('bill', 'legislator')),
  entity_id TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create campaign items table (bills/legislators in campaigns)
CREATE TABLE IF NOT EXISTS campaign_items (
  id SERIAL PRIMARY KEY,
  campaign_id INTEGER REFERENCES user_campaigns(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL CHECK (item_type IN ('bill', 'legislator')),
  item_id TEXT NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(campaign_id, item_type, item_id)
);

-- 6. Enable Row Level Security (RLS) on all tables
ALTER TABLE user_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tracked_bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tracked_legislators ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_items ENABLE ROW LEVEL SECURITY;

-- 7. Create RLS policies for user_campaigns
DROP POLICY IF EXISTS "Users can manage own campaigns" ON user_campaigns;
CREATE POLICY "Users can manage own campaigns" ON user_campaigns
  FOR ALL USING (auth.uid() = user_id);

-- 8. Create RLS policies for user_tracked_bills
DROP POLICY IF EXISTS "Users can manage own tracked bills" ON user_tracked_bills;
CREATE POLICY "Users can manage own tracked bills" ON user_tracked_bills
  FOR ALL USING (auth.uid() = user_id);

-- 9. Create RLS policies for user_tracked_legislators
DROP POLICY IF EXISTS "Users can manage own tracked legislators" ON user_tracked_legislators;
CREATE POLICY "Users can manage own tracked legislators" ON user_tracked_legislators
  FOR ALL USING (auth.uid() = user_id);

-- 10. Create RLS policies for user_notes
DROP POLICY IF EXISTS "Users can manage own notes" ON user_notes;
CREATE POLICY "Users can manage own notes" ON user_notes
  FOR ALL USING (auth.uid() = user_id);

-- 11. Create RLS policies for campaign_items
DROP POLICY IF EXISTS "Users can manage own campaign items" ON campaign_items;
CREATE POLICY "Users can manage own campaign items" ON campaign_items
  FOR ALL USING (
    campaign_id IN (
      SELECT id FROM user_campaigns WHERE user_id = auth.uid()
    )
  );

-- 12. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_campaigns_user_id ON user_campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_user_campaigns_status ON user_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_user_tracked_bills_user_id ON user_tracked_bills(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tracked_bills_bill_id ON user_tracked_bills(bill_id);
CREATE INDEX IF NOT EXISTS idx_user_tracked_legislators_user_id ON user_tracked_legislators(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tracked_legislators_bioguide_id ON user_tracked_legislators(bioguide_id);
CREATE INDEX IF NOT EXISTS idx_user_notes_user_id ON user_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_user_notes_entity ON user_notes(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_campaign_items_campaign_id ON campaign_items(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_items_item ON campaign_items(item_type, item_id);

-- 13. Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 14. Create triggers for updated_at
DROP TRIGGER IF EXISTS update_user_campaigns_updated_at ON user_campaigns;
CREATE TRIGGER update_user_campaigns_updated_at
    BEFORE UPDATE ON user_campaigns
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_notes_updated_at ON user_notes;
CREATE TRIGGER update_user_notes_updated_at
    BEFORE UPDATE ON user_notes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 15. Create view for campaign summary
CREATE OR REPLACE VIEW campaign_summary AS
SELECT 
  c.id,
  c.user_id,
  c.name,
  c.description,
  c.status,
  c.created_at,
  c.updated_at,
  COUNT(CASE WHEN ci.item_type = 'bill' THEN 1 END) as bill_count,
  COUNT(CASE WHEN ci.item_type = 'legislator' THEN 1 END) as legislator_count,
  COUNT(ci.id) as total_items
FROM user_campaigns c
LEFT JOIN campaign_items ci ON c.id = ci.campaign_id
GROUP BY c.id, c.user_id, c.name, c.description, c.status, c.created_at, c.updated_at;

-- 16. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- 17. Insert sample data (optional - remove if not needed)
-- This creates a sample campaign for testing
DO $$
BEGIN
  -- Only insert if no campaigns exist
  IF NOT EXISTS (SELECT 1 FROM user_campaigns LIMIT 1) THEN
    INSERT INTO user_campaigns (user_id, name, description, status) VALUES 
    ('00000000-0000-0000-0000-000000000000', 'Sample Campaign', 'This is a sample campaign for testing', 'active');
  END IF;
END
$$;

-- Setup complete!
-- Don't forget to:
-- 1. Add your ProPublica API key to environment variables
-- 2. Test the authentication flow
-- 3. Verify RLS policies are working correctly
