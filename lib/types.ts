export type EventItem = {
  id: string;
  title: string;
  slug: string;
  image_url: string;
  start_at: string;
  short_description: string | null;
  ticket_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};
