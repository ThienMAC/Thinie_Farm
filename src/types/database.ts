// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      farm_diary_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          plant_name: string;
          plant_date: string;
          harvest_date: string | null;
          days_to_harvest: number | null;
          survival_rate: number | null;
          harvest_weight: number | null;
          planting_method: string | null;
          watering_frequency: string | null;
          lessons_learned: string[] | null;
          images: string[] | null;
          status: 'draft' | 'published';
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['farm_diary_posts']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['farm_diary_posts']['Insert']>;
      };
      guides: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          category: string;
          difficulty: string | null;
          reading_time: number | null;
          tags: string[] | null;
          cover_image: string | null;
          images: string[] | null;
          status: 'draft' | 'published';
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['guides']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['guides']['Insert']>;
      };
      harvests: {
        Row: {
          id: string;
          product_name: string;
          variety: string | null;
          plant_date: string;
          harvest_date: string;
          quantity: number;
          unit: string;
          quality_rating: number | null;
          quality_notes: string | null;
          diary_post_id: string | null;
          status: 'available' | 'sold' | 'reserved';
          images: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['harvests']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['harvests']['Insert']>;
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          subject: string | null;
          status: 'new' | 'read' | 'replied' | 'archived';
          replied_at: string | null;
          reply_message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['contact_messages']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['contact_messages']['Insert']>;
      };
      subscribers: {
        Row: {
          id: string;
          name: string | null;
          email: string | null;
          phone: string | null;
          notification_method: 'email' | 'zalo' | 'both';
          interested_in: string[] | null;
          status: 'active' | 'unsubscribed';
          subscribed_at: string;
          unsubscribed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['subscribers']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['subscribers']['Insert']>;
      };
      site_stats: {
        Row: {
          id: string;
          stat_key: string;
          stat_value: number;
          stat_metadata: Record<string, any> | null;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['site_stats']['Row'], 'id' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['site_stats']['Insert']>;
      };
    };
  };
}

// Helper types
export type FarmDiaryPost = Database['public']['Tables']['farm_diary_posts']['Row'];
export type Guide = Database['public']['Tables']['guides']['Row'];
export type Harvest = Database['public']['Tables']['harvests']['Row'];
export type ContactMessage = Database['public']['Tables']['contact_messages']['Row'];
export type Subscriber = Database['public']['Tables']['subscribers']['Row'];
export type SiteStat = Database['public']['Tables']['site_stats']['Row'];
