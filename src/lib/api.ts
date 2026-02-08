import { supabase } from './supabase';
import type { FarmDiaryPost as DBFarmDiaryPost, Guide as DBGuide, Harvest } from '@/types/database';
import type { FarmDiaryPost, Guide } from '@/types';

// ==========================================
// TYPE MAPPERS
// ==========================================

function mapDBPostToPost(dbPost: DBFarmDiaryPost): FarmDiaryPost {
  return {
    slug: dbPost.slug,
    title: dbPost.title,
    date: dbPost.published_at || dbPost.created_at,
    startDate: dbPost.plant_date,
    howToPlant: dbPost.planting_method || '',
    howToWater: dbPost.watering_frequency || '',
    survivalRate: dbPost.survival_rate || 0,
    daysToHarvest: dbPost.days_to_harvest || 0,
    lessons: Array.isArray(dbPost.lessons_learned) ? dbPost.lessons_learned : [],
    images: Array.isArray(dbPost.images) ? dbPost.images : [],
    excerpt: dbPost.excerpt,
    content: dbPost.content,
  };
}

function mapDBGuideToGuide(dbGuide: DBGuide): Guide {
  return {
    slug: dbGuide.slug,
    title: dbGuide.title,
    date: dbGuide.published_at || dbGuide.created_at,
    excerpt: dbGuide.excerpt,
    content: dbGuide.content,
    category: dbGuide.category,
  };
}

// ==========================================
// FARM DIARY POSTS
// ==========================================

export async function getFarmDiaryPosts(): Promise<FarmDiaryPost[]> {
  const { data, error } = await supabase
    .from('farm_diary_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching farm diary posts:', error);
    return [];
  }

  return (data as DBFarmDiaryPost[]).map(mapDBPostToPost);
}

export async function getFarmDiaryPost(slug: string): Promise<FarmDiaryPost | null> {
  const { data, error } = await supabase
    .from('farm_diary_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching farm diary post:', error);
    return null;
  }

  return mapDBPostToPost(data as DBFarmDiaryPost);
}

export async function getFarmDiaryPostSlugs() {
  const { data, error } = await supabase
    .from('farm_diary_posts')
    .select('slug')
    .eq('status', 'published');

  if (error) {
    console.error('Error fetching farm diary slugs:', error);
    return [];
  }

  return data.map(post => post.slug);
}

// ==========================================
// GUIDES
// ==========================================

export async function getGuides(category?: string): Promise<Guide[]> {
  let query = supabase
    .from('guides')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching guides:', error);
    return [];
  }

  return (data as DBGuide[]).map(mapDBGuideToGuide);
}

export async function getGuide(slug: string): Promise<Guide | null> {
  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching guide:', error);
    return null;
  }

  return mapDBGuideToGuide(data as DBGuide);
}

export async function getGuideSlugs() {
  const { data, error } = await supabase
    .from('guides')
    .select('slug')
    .eq('status', 'published');

  if (error) {
    console.error('Error fetching guide slugs:', error);
    return [];
  }

  return data.map(guide => guide.slug);
}

export async function getGuideCategories() {
  const { data, error } = await supabase
    .from('guides')
    .select('category')
    .eq('status', 'published');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  // Get unique categories
  const categories = [...new Set(data.map(g => g.category))];
  return categories;
}

// ==========================================
// HARVESTS
// ==========================================

export async function getHarvests(status?: string) {
  let query = supabase
    .from('harvests')
    .select('*')
    .order('harvest_date', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching harvests:', error);
    return [];
  }

  return data as Harvest[];
}

export async function getUpcomingHarvests() {
  const { data, error } = await supabase
    .from('harvests')
    .select('*')
    .eq('status', 'available')
    .gte('harvest_date', new Date().toISOString().split('T')[0])
    .order('harvest_date', { ascending: true })
    .limit(10);

  if (error) {
    console.error('Error fetching upcoming harvests:', error);
    return [];
  }

  return data as Harvest[];
}

export async function getRecentHarvests(limit: number = 5) {
  const { data, error } = await supabase
    .from('harvests')
    .select('*')
    .order('harvest_date', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent harvests:', error);
    return [];
  }

  return data as Harvest[];
}

// ==========================================
// SITE STATS
// ==========================================

export async function getSiteStats() {
  const { data, error } = await supabase
    .from('site_stats')
    .select('*');

  if (error) {
    console.error('Error fetching site stats:', error);
    return null;
  }

  // Convert array to object for easier access
  const stats: Record<string, number> = {};
  data.forEach(stat => {
    stats[stat.stat_key] = stat.stat_value;
  });

  return stats;
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

export async function getTotalHarvestWeight() {
  const { data, error } = await supabase
    .from('harvests')
    .select('quantity');

  if (error) {
    console.error('Error calculating total harvest weight:', error);
    return 0;
  }

  const total = data.reduce((sum, harvest) => sum + (harvest.quantity || 0), 0);
  return total;
}

export async function getVarietiesCount() {
  const { data, error } = await supabase
    .from('harvests')
    .select('product_name');

  if (error) {
    console.error('Error counting varieties:', error);
    return 0;
  }

  const uniqueVarieties = new Set(data.map(h => h.product_name));
  return uniqueVarieties.size;
}

export async function getHarvestsCount() {
  const { count, error } = await supabase
    .from('harvests')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error counting harvests:', error);
    return 0;
  }

  return count || 0;
}
