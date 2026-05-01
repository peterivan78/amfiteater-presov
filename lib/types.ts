export type EventItem = {
  id: string;
  title: string;
  slug: string;
  image_url: string;
  cover_image_url?: string | null;
  start_at: string;
  end_at?: string | null;
  display_date?: string;
  short_description: string | null;
  ticket_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};
