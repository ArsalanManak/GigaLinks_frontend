export interface User {
  id?: string;
  name: string;
  email: string;
}

export interface Inquiry {
  id?: string;
  customer_id?: string;
  service_type: string;
  city: string;
  message?: string;
  status?: string;
}

export interface Project {
  id?: string;
  title: string;
  service_type: string;
  city: string;
  cloudinary_urls: string[];
  youtube_url?: string;
  description?: string;
  featured?: boolean;
}

export interface Service {
  id?: string;
  slug: string;
  title: string;
  description: string;
  icon?: string;
  hero_image?: string;
  image_url?: string;
  youtube_url?: string;
  sub_services: string[];
}
