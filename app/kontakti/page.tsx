import Navigation from "../components/Navigation";
import Link from "next/link";
import {
  IconLocation,
  IconPhone,
  IconMail,
  IconGlobe,
  IconCamera,
  IconFacebook,
} from "../components/Icons";

export default function Kontakti() {
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

        <div className="flex items-center gap-3 mb-6">
          <span className="w-12 h-0.5 bg-[#495464]"></span>
          <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
            Контакти
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#495464] mb-12">
          Контакти
        </h1>

        <div className="max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <IconLocation className="w-8 h-8 text-[#495464]" />
                <h2 className="text-2xl font-bold text-[#495464]">Адрес</h2>
              </div>
              <a
                href="https://maps.google.com/?q=ул.+Съборна+№+3,+София"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#495464]/80 hover:text-[#495464] transition-colors duration-300 block mb-4"
              >
                гр. София, ул. Съборна № 3, ниво -1
              </a>
            </div>

            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <IconPhone className="w-8 h-8 text-[#495464]" />
                <h2 className="text-2xl font-bold text-[#495464]">Телефон</h2>
              </div>
              <a
                href="tel:0888426610"
                className="text-[#495464]/80 hover:text-[#495464] transition-colors duration-300 block text-lg"
              >
                0888 426 610
              </a>
            </div>

            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <IconMail className="w-8 h-8 text-[#495464]" />
                <h2 className="text-2xl font-bold text-[#495464]">Имейл</h2>
              </div>
              <a
                href="mailto:novaartspace@gmail.com"
                className="text-[#495464]/80 hover:text-[#495464] transition-colors duration-300 block break-all"
              >
                novaartspace@gmail.com
              </a>
            </div>

            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <IconGlobe className="w-8 h-8 text-[#495464]" />
                <h2 className="text-2xl font-bold text-[#495464]">
                  Социални мрежи
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.instagram.com/nova_art_space/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#495464]/80 hover:text-[#495464] transition-colors duration-300 inline-flex items-center gap-2"
                >
                  <IconCamera className="w-4 h-4 text-[#495464]" />
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/artspacenOva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#495464]/80 hover:text-[#495464] transition-colors duration-300 inline-flex items-center gap-2"
                >
                  <IconFacebook className="w-4 h-4 text-[#495464]" />
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#495464] mb-4">Карта</h2>
            <div className="rounded-lg overflow-hidden shadow-md border border-[#E8E8E8]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.5!2d23.3219!3d42.6975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDQxJzUxLjAiTiAyM8KwMTknMTkuNCJF!5e0!3m2!1sen!2sbg!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-b from-[#495464] to-[#3a4149] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#495464] text-sm">
            © {new Date().getFullYear()} nOva art space. Всички права запазени.
          </p>
        </div>
      </footer>
    </div>
  );
}
