-- Fix Row Level Security for contact_messages and subscribers tables
-- Run this in Supabase SQL Editor

-- Allow anonymous users to insert contact messages
CREATE POLICY "Allow public to insert contact messages"
ON contact_messages
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow anonymous users to insert subscribers
CREATE POLICY "Allow public to insert subscribers"
ON subscribers
FOR INSERT
TO anon
WITH CHECK (true);

-- Optional: Allow service role to do everything (for admin panel)
CREATE POLICY "Allow service role full access to contact_messages"
ON contact_messages
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow service role full access to subscribers"
ON subscribers
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
