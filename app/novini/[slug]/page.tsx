import Navigation from "../../components/Navigation";
import Link from "next/link";
import { getNewsBySlug } from "../../lib/news";
import { notFound } from "next/navigation";
import NewsGallery from "../../components/NewsGallery";
import { NewsGalleryProvider } from "../../components/NewsGalleryContext";
import NewsLightbox from "../../components/NewsLightbox";

// Force dynamic rendering to always fetch fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsDetail({ params }: PageProps) {
  const { slug } = await params;
  const newsItem = await getNewsBySlug(slug);

  // Block access to archived news (position 1000)
  if (!newsItem || newsItem.position === 1000) {
    notFound();
  }

  return (
    <NewsGalleryProvider>
      <div className="min-h-screen bg-white">
        <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <Link
          href="/novini"
          className="inline-flex items-center gap-2 mb-8 text-[#495464] hover:text-[#495464] font-medium transition-colors duration-300 group"
        >
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Назад към новините
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <span className="w-12 h-0.5 bg-[#495464]"></span>
          <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
            Новина
          </span>
        </div>

        {/* Main news badge */}
        {newsItem.position === 0 && (
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 bg-[#495464] text-white px-5 py-2 rounded-full text-sm font-medium shadow-md">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Главна новина
            </span>
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold text-[#495464] mb-2">
          {newsItem.title}
        </h1>

        {newsItem.subtitle && (
          <h2 className="text-2xl md:text-3xl text-[#495464]/90 mb-8 font-medium">
            {newsItem.subtitle}
          </h2>
        )}

        {/* Main Image */}
        {newsItem.mainImage && (
          <NewsGallery
            mainImage={newsItem.mainImage}
            images={[]}
            title={newsItem.title}
            showOnlyMain={true}
          />
        )}

        {/* Text content */}
        {newsItem.text && (
          <div className="space-y-4 mb-8">
            {newsItem.text.split("\n").map(
              (paragraph, idx) =>
                paragraph.trim() && (
                  <p
                    key={idx}
                    className="text-lg text-[#495464]/80 leading-relaxed"
                  >
                    {paragraph.trim()}
                  </p>
                )
            )}
          </div>
        )}

        {/* Additional Gallery Images */}
        {newsItem.images && newsItem.images.length > 0 && (
          <NewsGallery
            mainImage={newsItem.mainImage}
            images={newsItem.images}
            title={newsItem.title}
            showOnlyGallery={true}
          />
        )}

        {/* Lightbox - rendered once */}
        <NewsLightbox title={newsItem.title} />
      </div>

      <footer className="bg-gradient-to-b from-[#495464] to-[#3a4149] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/80 text-sm">
            © {new Date().getFullYear()} nOva art space. Всички права запазени.
          </p>
        </div>
      </footer>
      </div>
    </NewsGalleryProvider>
  );
}
