-- Quick Setup - Just create site_stats table for testing

-- Site Stats table
CREATE TABLE IF NOT EXISTS site_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_key VARCHAR(100) UNIQUE NOT NULL,
  stat_value INTEGER DEFAULT 0,
  stat_metadata JSONB,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert initial stats
INSERT INTO site_stats (stat_key, stat_value) VALUES
  ('total_diary_posts', 0),
  ('total_guides', 0),
  ('total_harvests', 0),
  ('total_kg_harvested', 0),
  ('days_farming', 30),
  ('varieties_tried', 3)
ON CONFLICT (stat_key) DO NOTHING;

-- Enable RLS
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Public can view stats"
  ON site_stats FOR SELECT
  USING (true);

-- Allow admin write
CREATE POLICY "Authenticated users can update stats"
  ON site_stats FOR ALL
  USING (auth.role() = 'authenticated');

-- Success message
SELECT 'Database setup complete! ✅' as message;
