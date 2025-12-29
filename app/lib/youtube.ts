/**
 * Extracts YouTube video ID from various YouTube URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID
 * - http:// variants
 */
export function extractYouTubeId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;

  // Remove any whitespace
  const trimmedUrl = url.trim();
  
  if (!trimmedUrl) return null;

  // Check if it's already an embed URL
  const embedMatch = trimmedUrl.match(/youtube\.com\/embed\/([^?&\/]+)/i);
  if (embedMatch && embedMatch[1]) return embedMatch[1];

  // Check for watch?v= format
  const watchMatch = trimmedUrl.match(/[?&]v=([^?&]+)/i);
  if (watchMatch && watchMatch[1]) return watchMatch[1];

  // Check for youtu.be/ format
  const shortMatch = trimmedUrl.match(/youtu\.be\/([^?&\/]+)/i);
  if (shortMatch && shortMatch[1]) return shortMatch[1];
  
  // Check for youtube.com/v/VIDEO_ID format
  const vFormatMatch = trimmedUrl.match(/youtube\.com\/v\/([^?&\/]+)/i);
  if (vFormatMatch && vFormatMatch[1]) return vFormatMatch[1];

  return null;
}

/**
 * Converts YouTube URL to embed URL with autoplay
 */
export function getYouTubeEmbedUrl(url: string, autoplay: boolean = true): string | null {
  const videoId = extractYouTubeId(url);
  if (!videoId) return null;
  const autoplayParam = autoplay ? '?autoplay=1' : '';
  return `https://www.youtube.com/embed/${videoId}${autoplayParam}`;
}

/**
 * Gets YouTube thumbnail URL
 */
export function getYouTubeThumbnail(url: string): string | null {
  const videoId = extractYouTubeId(url);
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

/**
 * Checks if a URL is a YouTube URL
 * Checks the beginning of the URL to detect YouTube links
 */
export function isYouTubeUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  
  const trimmedUrl = url.trim().toLowerCase();
  
  // Check if URL starts with common YouTube patterns
  return (
    trimmedUrl.startsWith('https://www.youtube.com/') ||
    trimmedUrl.startsWith('https://youtube.com/') ||
    trimmedUrl.startsWith('http://www.youtube.com/') ||
    trimmedUrl.startsWith('http://youtube.com/') ||
    trimmedUrl.startsWith('https://youtu.be/') ||
    trimmedUrl.startsWith('http://youtu.be/') ||
    trimmedUrl.includes('youtube.com/watch') ||
    trimmedUrl.includes('youtube.com/embed') ||
    trimmedUrl.includes('youtu.be/')
  );
}

