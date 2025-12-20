"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useNewsGallery } from "./NewsGalleryContext";

interface NewsGalleryProps {
  mainImage?: string;
  images: string[];
  title: string;
  showOnlyMain?: boolean;
  showOnlyGallery?: boolean;
}

export default function NewsGallery({
  mainImage,
  images,
  title,
  showOnlyMain = false,
  showOnlyGallery = false,
}: NewsGalleryProps) {
  const {
    allImages,
    setAllImages,
    lightboxOpen,
    setLightboxOpen,
    currentImageIndex,
    setCurrentImageIndex,
  } = useNewsGallery();

  // Update allImages when props change
  useEffect(() => {
    const combined = mainImage ? [mainImage, ...images] : images;
    setAllImages(combined);
  }, [mainImage, images, setAllImages]);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  if (allImages.length === 0 && !mainImage) return null;

  return (
    <>
      {/* Main Image */}
      {mainImage && !showOnlyGallery && (
        <div
          onClick={() => openLightbox(0)}
          className="mb-8 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-300"
        >
          <Image
            src={mainImage}
            alt={title}
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Gallery Images */}
      {images.length > 0 && !showOnlyMain && (
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-12 h-0.5 bg-[#495464]"></span>
            <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
              Галерия
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(mainImage ? idx + 1 : idx)}
                className="rounded-lg overflow-hidden aspect-[4/3] cursor-pointer hover:opacity-90 transition-opacity duration-300"
              >
                <Image
                  src={image}
                  alt={`${title} - Снимка ${idx + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

    </>
  );
}

