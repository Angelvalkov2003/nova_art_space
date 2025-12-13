"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Изложби", href: "/izlozhbi" },
    { label: "Събития", href: "/subitiya" },
    { label: "Новини", href: "/novini" },
    { label: "За нас", href: "/za-nas" },
    { label: "Контакти", href: "/kontakti" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-[#E8E8E8] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.jpg"
              alt="nOva art space"
              width={150}
              height={60}
              className="h-auto transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-[#495464] hover:text-[#495464] font-medium transition-all duration-300 px-4 py-2 rounded-lg group"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-0 bg-[#E8E8E8] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#495464] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#495464] p-2 rounded-lg hover:bg-[#E8E8E8] transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 transition-transform duration-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 pb-4" : "max-h-0"
          }`}
        >
          <div className="space-y-2 pt-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-[#495464] hover:text-[#495464] font-medium transition-all duration-300 px-4 py-3 rounded-lg hover:bg-[#E8E8E8]"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
