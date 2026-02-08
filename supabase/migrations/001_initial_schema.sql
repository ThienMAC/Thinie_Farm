-- Thinie Farm Database Schema
-- Run this in Supabase SQL Editor

-- =============================================
-- 1. CREATE TABLES
-- =============================================

-- Farm Diary Posts
CREATE TABLE IF NOT EXISTS farm_diary_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  
  -- Metadata
  plant_name VARCHAR(100) NOT NULL,
  plant_date DATE NOT NULL,
  harvest_date DATE,
  days_to_harvest INTEGER,
  
  -- Results
  survival_rate DECIMAL(5,2),
  harvest_weight DECIMAL(8,2),
  planting_method VARCHAR(100),
  watering_frequency VARCHAR(100),
  
  -- Lessons & Images
  lessons_learned JSONB,
  images JSONB,
  
  -- Status
  status VARCHAR(20) DEFAULT 'draft',
  published_at TIMESTAMP,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Guides
CREATE TABLE IF NOT EXISTS guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  
  -- Categorization
  category VARCHAR(50) NOT NULL,
  difficulty VARCHAR(20),
  reading_time INTEGER,
  
  -- SEO
  tags JSONB,
  
  -- Images
  cover_image VARCHAR(500),
  images JSONB,
  
  -- Status
  status VARCHAR(20) DEFAULT 'draft',
  published_at TIMESTAMP,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Harvests
CREATE TABLE IF NOT EXISTS harvests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Product info
  product_name VARCHAR(100) NOT NULL,
  variety VARCHAR(100),
  
  -- Dates
  plant_date DATE NOT NULL,
  harvest_date DATE NOT NULL,
  
  -- Quantity
  quantity DECIMAL(8,2) NOT NULL,
  unit VARCHAR(20) DEFAULT 'kg',
  
  -- Quality
  quality_rating INTEGER,
  quality_notes TEXT,
  
  -- Related diary post
  diary_post_id UUID REFERENCES farm_diary_posts(id) ON DELETE SET NULL,
  
  -- Status
  status VARCHAR(20) DEFAULT 'available',
  
  -- Images
  images JSONB,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Contact info
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  
  -- Message
  message TEXT NOT NULL,
  subject VARCHAR(255),
  
  -- Status
  status VARCHAR(20) DEFAULT 'new',
  replied_at TIMESTAMP,
  reply_message TEXT,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Subscribers
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Contact info
  name VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  
  -- Preferences
  notification_method VARCHAR(20) DEFAULT 'email',
  interested_in JSONB,
  
  -- Status
  status VARCHAR(20) DEFAULT 'active',
  subscribed_at TIMESTAMP DEFAULT NOW(),
  unsubscribed_at TIMESTAMP,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Site Stats
CREATE TABLE IF NOT EXISTS site_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  stat_key VARCHAR(100) UNIQUE NOT NULL,
  stat_value INTEGER DEFAULT 0,
  stat_metadata JSONB,
  
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 2. CREATE INDEXES
-- =============================================

-- Farm Diary Posts
CREATE INDEX IF NOT EXISTS idx_farm_diary_slug ON farm_diary_posts(slug);
CREATE INDEX IF NOT EXISTS idx_farm_diary_status ON farm_diary_posts(status);
CREATE INDEX IF NOT EXISTS idx_farm_diary_published_at ON farm_diary_posts(published_at DESC);

-- Guides
CREATE INDEX IF NOT EXISTS idx_guides_slug ON guides(slug);
CREATE INDEX IF NOT EXISTS idx_guides_category ON guides(category);
CREATE INDEX IF NOT EXISTS idx_guides_status ON guides(status);
CREATE INDEX IF NOT EXISTS idx_guides_published_at ON guides(published_at DESC);

-- Harvests
CREATE INDEX IF NOT EXISTS idx_harvests_harvest_date ON harvests(harvest_date DESC);
CREATE INDEX IF NOT EXISTS idx_harvests_status ON harvests(status);

-- Contact Messages
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_messages(created_at DESC);

-- Subscribers
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_phone ON subscribers(phone);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);

-- =============================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE farm_diary_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE harvests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 4. CREATE RLS POLICIES
-- =============================================

-- Public can view published diary posts
CREATE POLICY "Public can view published diary posts"
  ON farm_diary_posts FOR SELECT
  USING (status = 'published');

-- Public can view published guides
CREATE POLICY "Public can view published guides"
  ON guides FOR SELECT
  USING (status = 'published');

-- Public can view available harvests
CREATE POLICY "Public can view available harvests"
  ON harvests FOR SELECT
  USING (status = 'available');

-- Anyone can submit contact messages
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- Anyone can subscribe
CREATE POLICY "Anyone can subscribe"
  ON subscribers FOR INSERT
  WITH CHECK (true);

-- Admin full access (authenticated users)
CREATE POLICY "Authenticated users full access to diary posts"
  ON farm_diary_posts FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access to guides"
  ON guides FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users full access to harvests"
  ON harvests FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read messages"
  ON contact_messages FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update messages"
  ON contact_messages FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read subscribers"
  ON subscribers FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update subscribers"
  ON subscribers FOR UPDATE
  USING (auth.role() = 'authenticated');

-- =============================================
-- 5. INSERT INITIAL DATA
-- =============================================

-- Populate site stats
INSERT INTO site_stats (stat_key, stat_value) VALUES
  ('total_diary_posts', 0),
  ('total_guides', 0),
  ('total_harvests', 0),
  ('total_kg_harvested', 0),
  ('days_farming', 0),
  ('varieties_tried', 0)
ON CONFLICT (stat_key) DO NOTHING;

-- =============================================
-- 6. CREATE FUNCTIONS (Optional)
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_farm_diary_posts_updated_at
  BEFORE UPDATE ON farm_diary_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guides_updated_at
  BEFORE UPDATE ON guides
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_harvests_updated_at
  BEFORE UPDATE ON harvests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at
  BEFORE UPDATE ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscribers_updated_at
  BEFORE UPDATE ON subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- DONE! 🎉
-- =============================================

-- Next steps:
-- 1. Go to Storage and create buckets:
--    - diary-images (public)
--    - guide-images (public)
--    - harvest-photos (public)
-- 2. Add your env variables to .env.local
-- 3. Start migrating your MDX content to database
