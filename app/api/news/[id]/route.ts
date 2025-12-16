import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '../../../lib/supabase';
import { getSupabaseServerClient } from '../../../lib/auth';
import { generateSlug } from '../../../lib/news';
import { v2 as cloudinary } from 'cloudinary';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// Configure Cloudinary from CLOUDINARY_URL
if (process.env.CLOUDINARY_URL) {
  const urlMatch = process.env.CLOUDINARY_URL.match(/cloudinary:\/\/(\d+):(.+)@(.+)/);
  if (urlMatch) {
    cloudinary.config({
      cloud_name: urlMatch[3],
      api_key: urlMatch[1],
      api_secret: urlMatch[2],
    });
  }
}

// Helper function to extract public_id from Cloudinary URL
function extractPublicIdFromUrl(url: string): string | null {
  if (!url || typeof url !== 'string') {
    return null;
  }

  try {
    const cloudinaryPattern = /res\.cloudinary\.com\/[^/]+\/image\/upload\/(?:v\d+\/)?(?:[^/]+\/)*(.+?)(?:\.[a-z]{3,4})?(?:\?|$)/i;
    const match = url.match(cloudinaryPattern);
    
    if (match && match[1]) {
      let publicId = match[1].split('?')[0];
      publicId = publicId.replace(/\.(jpg|jpeg|png|webp|gif|svg)$/i, '');
      return publicId;
    }

    return null;
  } catch (error) {
    console.error('Error extracting public_id from URL:', url, error);
    return null;
  }
}

// Helper function to delete single image from Cloudinary
async function deleteImageFromCloudinary(publicId: string): Promise<boolean> {
  try {
    if (!process.env.CLOUDINARY_URL) {
      console.warn('Cloudinary not configured, skipping image deletion');
      return false;
    }

    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok' || result.result === 'not found';
  } catch (error) {
    console.error(`Error deleting image ${publicId} from Cloudinary:`, error);
    return false;
  }
}

// Helper function to delete multiple images from Cloudinary
async function deleteImagesFromCloudinary(publicIds: string[]): Promise<void> {
  if (publicIds.length === 0) {
    return;
  }

  try {
    if (!process.env.CLOUDINARY_URL) {
      console.warn('Cloudinary not configured, skipping image deletion');
      return;
    }

    const validPublicIds = publicIds.filter((id): id is string => Boolean(id));
    
    if (validPublicIds.length === 0) {
      return;
    }

    if (validPublicIds.length === 1) {
      await deleteImageFromCloudinary(validPublicIds[0]);
      return;
    }

    const result = await cloudinary.api.delete_resources(validPublicIds);
    
    if (result.not_found && result.not_found.length > 0) {
      console.warn('Some images were not found in Cloudinary:', result.not_found);
    }
    
    if (result.errors && Object.keys(result.errors).length > 0) {
      console.error('Errors deleting images from Cloudinary:', result.errors);
    }
  } catch (error) {
    console.error('Error deleting images from Cloudinary:', error);
    console.log('Falling back to individual deletions...');
    await Promise.allSettled(
      publicIds.map(id => id ? deleteImageFromCloudinary(id) : Promise.resolve(false))
    );
  }
}

// PUT - Update news
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const supabaseAuth = await getSupabaseServerClient();
    const {
      data: { user },
    } = await supabaseAuth.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, subtitle, text, main_image, position, slug, images } = body;

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Admin client not configured. Please set SUPABASE_SERVICE_ROLE_KEY in .env.local' },
        { status: 500 }
      );
    }

    // Fetch current news data to compare with new data
    const { data: currentNews, error: fetchError } = await supabaseAdmin
      .from('news')
      .select('main_image')
      .eq('id', id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching current news:', fetchError);
    }

    // Handle main_image deletion from Cloudinary if it's being changed
    if (main_image !== undefined && currentNews?.main_image) {
      const oldMainImage = currentNews.main_image;
      const newMainImage = main_image;
      
      if (oldMainImage && oldMainImage !== newMainImage) {
        const publicId = extractPublicIdFromUrl(oldMainImage);
        if (publicId) {
          await deleteImageFromCloudinary(publicId);
        }
      }
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    if (text !== undefined) updateData.text = text;
    if (main_image !== undefined) updateData.main_image = main_image;
    if (position !== undefined) updateData.position = position;

    if (slug !== undefined && slug.trim() !== '') {
      updateData.slug = slug;
    } else if (title) {
      let generatedSlug = generateSlug(title);
      if (!generatedSlug || generatedSlug.trim() === '') {
        generatedSlug = generateSlug(title);
      }
      updateData.slug = generatedSlug;
    }

    const { data: newsItem, error: newsError } = await supabaseAdmin
      .from('news')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (newsError) {
      return NextResponse.json(
        { error: newsError.message },
        { status: 500 }
      );
    }

    // Update images if provided
    if (images !== undefined) {
      // Fetch current gallery images before deletion
      const { data: currentGalleryImages } = await supabaseAdmin
        .from('news_images')
        .select('image_url')
        .eq('news_id', id);

      // Filter out empty strings and get valid new image URLs
      const newImageUrls = Array.isArray(images) 
        ? images.filter((url: string) => url && url.trim() !== '')
        : [];

      // Find images that are being removed (in current but not in new)
      const imagesToDelete: string[] = [];
      if (currentGalleryImages) {
        currentGalleryImages.forEach((currentImg) => {
          if (currentImg.image_url && !newImageUrls.includes(currentImg.image_url)) {
            imagesToDelete.push(currentImg.image_url);
          }
        });
      }

      // Extract public_ids from URLs and delete from Cloudinary (batch deletion)
      if (imagesToDelete.length > 0) {
        const publicIdsToDelete = imagesToDelete
          .map(url => extractPublicIdFromUrl(url))
          .filter((id): id is string => Boolean(id));
        
        if (publicIdsToDelete.length > 0) {
          await deleteImagesFromCloudinary(publicIdsToDelete);
        }
      }

      // Delete existing images from database
      await supabaseAdmin
        .from('news_images')
        .delete()
        .eq('news_id', id);

      // Insert new images
      if (newImageUrls.length > 0) {
        const imageRecords = newImageUrls.map((url: string, index: number) => ({
          news_id: id,
          image_url: url,
          image_order: index + 1,
        }));

        await supabaseAdmin
          .from('news_images')
          .insert(imageRecords);
      }
    }

    return NextResponse.json({ success: true, data: newsItem });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete news
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const supabaseAuth = await getSupabaseServerClient();
    const {
      data: { user },
    } = await supabaseAuth.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Admin client not configured. Please set SUPABASE_SERVICE_ROLE_KEY in .env.local' },
        { status: 500 }
      );
    }

    // First, fetch the news and its images before deletion
    const { data: newsItem, error: fetchError } = await supabaseAdmin
      .from('news')
      .select('main_image')
      .eq('id', id)
      .single();

    if (fetchError) {
      return NextResponse.json(
        { error: fetchError.message },
        { status: 500 }
      );
    }

    // Fetch all gallery images for this news
    const { data: galleryImages, error: imagesError } = await supabaseAdmin
      .from('news_images')
      .select('image_url')
      .eq('news_id', id);

    if (imagesError) {
      console.error('Error fetching gallery images:', imagesError);
    }

    // Collect all image URLs to delete
    const imageUrls: string[] = [];
    
    if (newsItem?.main_image) {
      imageUrls.push(newsItem.main_image);
    }

    if (galleryImages) {
      galleryImages.forEach((img) => {
        if (img.image_url) {
          imageUrls.push(img.image_url);
        }
      });
    }

    // Extract public_ids from URLs and delete from Cloudinary (batch deletion)
    if (imageUrls.length > 0) {
      const publicIds = imageUrls
        .map(url => extractPublicIdFromUrl(url))
        .filter((id): id is string => Boolean(id));
      
      if (publicIds.length > 0) {
        await deleteImagesFromCloudinary(publicIds);
      }
    }

    // Now delete the news (images will be deleted automatically due to CASCADE)
    const { error } = await supabaseAdmin
      .from('news')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
