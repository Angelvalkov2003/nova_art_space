import Navigation from "../components/Navigation";
import Link from "next/link";
import { IconCalendar, IconLocation, IconParty } from "../components/Icons";
import { getExhibitions, Exhibition } from "../lib/exhibitions";
import Image from "next/image";

export default async function Izlozhbi() {
  const exhibitions = await getExhibitions();

  // Separate current (position 0) and past exhibitions
  const currentExhibition = exhibitions.find((ex) => ex.position === 0);
  const pastExhibitions = exhibitions.filter((ex) => ex.position !== 0);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <Link
          href="/"
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
          Назад към началната страница
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <span className="w-12 h-0.5 bg-[#495464]"></span>
          <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
            Изложби
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#495464] mb-12">
          Изложби
        </h1>

        {/* Настояща изложба */}
        {currentExhibition && (
          <Link
            href={`/izlozhbi/${currentExhibition.slug}`}
            className="block mb-20 pb-16 border-b-2 border-[#E8E8E8] relative group cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#E8E8E8] rounded-full blur-3xl opacity-20 -ml-32 -mt-32"></div>
            <div className="relative z-10">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 bg-[#495464] text-white px-5 py-2 rounded-full text-sm font-medium shadow-md">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  Настояща
                </span>
              </div>

              {/* Subtitle */}
              {currentExhibition.subtitle && (
                <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-6 group-hover:text-[#3a4149] transition-colors">
                  {currentExhibition.subtitle}
                </h2>
              )}

              {/* Main Image */}
              {currentExhibition.mainImage && (
                <div className="mb-6 rounded-lg overflow-hidden group-hover:opacity-90 transition-opacity">
                  <Image
                    src={currentExhibition.mainImage}
                    alt={currentExhibition.title}
                    width={1200}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Date */}
              {currentExhibition.date && (
                <div className="flex items-center gap-2 text-[#495464]/70">
                  <IconCalendar className="w-5 h-5 text-[#495464]" />
                  <p className="text-lg">{currentExhibition.date}</p>
                </div>
              )}
            </div>
          </Link>
        )}

        {/* Минали изложби */}
        {pastExhibitions.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-0.5 bg-[#495464]"></span>
              <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
                История
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-12">
              Минали изложби
            </h2>

            <div className="space-y-16">
              {pastExhibitions.map((exhibition, idx) => (
                <Link
                  key={idx}
                  href={`/izlozhbi/${exhibition.slug}`}
                  className={`block ${
                    idx < pastExhibitions.length - 1 ? "pb-12 border-b" : "pb-8"
                  } border-[#E8E8E8] hover:bg-[#E8E8E8]/30 transition-colors duration-300 rounded-lg p-6 -m-6 group cursor-pointer`}
                >
                  <div className="mb-4">
                    {/* Subtitle */}
                    {exhibition.subtitle && (
                      <h3 className="text-2xl md:text-3xl font-bold text-[#495464] mb-4 group-hover:text-[#3a4149] transition-colors">
                        {exhibition.subtitle}
                      </h3>
                    )}

                    {/* Main Image */}
                    {exhibition.mainImage && (
                      <div className="mb-4 rounded-lg overflow-hidden group-hover:opacity-90 transition-opacity">
                        <Image
                          src={exhibition.mainImage}
                          alt={exhibition.title}
                          width={1200}
                          height={600}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}

                    {/* Date */}
                    {exhibition.date && (
                      <div className="flex items-center gap-2 text-[#495464]/70">
                        <IconCalendar className="w-5 h-5 text-[#495464]" />
                        <p className="text-lg">{exhibition.date}</p>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gradient-to-b from-[#495464] to-[#3a4149] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/80 text-sm">
            © {new Date().getFullYear()} nOva art space. Всички права запазени.
          </p>
        </div>
      </footer>
    </div>
  );
}
