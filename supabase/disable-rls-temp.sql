-- Disable RLS temporarily for testing
-- Run this in Supabase SQL Editor

-- Disable RLS on contact_messages
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;

-- Disable RLS on subscribers  
ALTER TABLE subscribers DISABLE ROW LEVEL SECURITY;

-- Note: In production, you should enable RLS and create proper policies
-- This is just for testing purposes
