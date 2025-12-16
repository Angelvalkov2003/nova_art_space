import { supabase } from './supabase';

export interface News {
  title: string;
  subtitle: string;
  text: string;
  mainImage: string;
  images: string[];
  position: number;
  slug: string;
}

// Generate slug from title (useful for creating new news)
export function generateSlug(title: string): string {
  if (!title || title.trim() === '') {
    return generateAutoSlug();
  }

  let slug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

  // If slug is empty or only contains hyphens (e.g., from Cyrillic text),
  // generate automatic slug with number
  if (!slug || slug.trim() === '' || slug === '-') {
    return generateAutoSlug();
  }

  return slug;
}

// Generate automatic slug like "novina111", "novina112", etc.
function generateAutoSlug(): string {
  // Use timestamp to ensure uniqueness
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  return `novina${timestamp}${randomNum}`;
}

export async function getNews(): Promise<News[]> {
  try {
    // Fetch news from Supabase (always fresh, no cache)
    // Filter out archived news (position 1000)
    const { data: newsData, error: newsError } = await supabase
      .from('news')
      .select('*')
      .neq('position', 1000)
      .order('position', { ascending: false });

    if (newsError) {
      console.error('Error fetching news:', newsError);
      return [];
    }

    if (!newsData || newsData.length === 0) {
      return [];
    }

    // Fetch images for all news
    const newsIds = newsData.map((news) => news.id);
    const { data: imagesData, error: imagesError } = await supabase
      .from('news_images')
      .select('news_id, image_url, image_order')
      .in('news_id', newsIds)
      .order('image_order', { ascending: true });

    if (imagesError) {
      console.error('Error fetching images:', imagesError);
    }

    // Group images by news_id
    const imagesByNews = new Map<string, string[]>();
    if (imagesData) {
      imagesData.forEach((img) => {
        const newsId = img.news_id;
        if (!imagesByNews.has(newsId)) {
          imagesByNews.set(newsId, []);
        }
        imagesByNews.get(newsId)!.push(img.image_url);
      });
    }

    // Map to News interface
    const news: News[] = newsData.map((n) => {
      const images = imagesByNews.get(n.id) || [];
      
      return {
        title: n.title || '',
        subtitle: n.subtitle || '',
        text: n.text || '',
        mainImage: n.main_image || '',
        images: images,
        position: n.position || 0,
        slug: n.slug || '',
      };
    });

    // Sort news:
    // - Position 0 = main news (stays at top)
    // - Other news: sort by position descending (largest first)
    const sorted = news.sort((a, b) => {
      if (a.position === 0) return -1; // Main news always first
      if (b.position === 0) return 1;
      return b.position - a.position; // Descending order for other news
    });

    return sorted;
  } catch (error) {
    console.error('Error fetching news from Supabase:', error);
    return [];
  }
}

// Get single news by slug
export async function getNewsBySlug(slug: string): Promise<News | null> {
  try {
    // Fetch news by slug
    const { data: newsData, error: newsError } = await supabase
      .from('news')
      .select('*')
      .eq('slug', slug)
      .single();

    if (newsError || !newsData) {
      console.error('Error fetching news:', newsError);
      return null;
    }

    // Fetch images for this news
    const { data: imagesData, error: imagesError } = await supabase
      .from('news_images')
      .select('image_url, image_order')
      .eq('news_id', newsData.id)
      .order('image_order', { ascending: true });

    if (imagesError) {
      console.error('Error fetching images:', imagesError);
    }

    const images = imagesData ? imagesData.map((img) => img.image_url) : [];

    return {
      title: newsData.title || '',
      subtitle: newsData.subtitle || '',
      text: newsData.text || '',
      mainImage: newsData.main_image || '',
      images: images,
      position: newsData.position || 0,
      slug: newsData.slug || '',
    };
  } catch (error) {
    console.error('Error fetching news from Supabase:', error);
    return null;
  }
}
