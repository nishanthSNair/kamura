import testimonialsData from "../../content/data/testimonials.json";

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
}

export const testimonials: Testimonial[] = testimonialsData.testimonials as Testimonial[];
