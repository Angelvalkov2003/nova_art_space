import { supabase } from './supabase';

export interface CarouselSlide {
  id: string;
  image_url: string;
  link_url: string;
  position: number;
  created_at?: string;
  updated_at?: string;
}

export async function getCarouselSlides(): Promise<CarouselSlide[]> {
  try {
    const { data, error } = await supabase
      .from('carousel_slides')
      .select('*')
      .order('position', { ascending: true });

    if (error) {
      console.error('Error fetching carousel slides:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching carousel slides:', error);
    return [];
  }
}

