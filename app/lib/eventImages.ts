import { supabase } from './supabase';

export interface EventImage {
  id: string;
  image_url: string;
  category: 'koncert' | 'kokteil' | 'seminar' | 'produkt';
  position: number;
  created_at?: string;
  updated_at?: string;
}

export async function getEventImagesByCategory(category: string): Promise<EventImage[]> {
  try {
    const { data, error } = await supabase
      .from('event_images')
      .select('*')
      .eq('category', category)
      .order('position', { ascending: true });

    if (error) {
      console.error('Error fetching event images:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching event images:', error);
    return [];
  }
}

export async function getAllEventImages(): Promise<EventImage[]> {
  try {
    const { data, error } = await supabase
      .from('event_images')
      .select('*')
      .order('category', { ascending: true })
      .order('position', { ascending: true });

    if (error) {
      console.error('Error fetching event images:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching event images:', error);
    return [];
  }
}

