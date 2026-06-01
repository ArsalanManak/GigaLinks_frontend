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
  description?: string;
  featured?: boolean;
}
