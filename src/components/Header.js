"use client";

import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center relative">
            <Link
              href="/"
              className="flex items-center text-[#9AE66E] font-bold text-lg relative"
            >
              CaptionCrafter
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute top-[-6px] right-[-16px]"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M14.8 7.5a1.84 1.84 0 0 0-2.6 0l-.2.3-.3-.3a1.84 1.84 0 1 0-2.4 2.8L12 13l2.7-2.7c.9-.9.8-2.1.1-2.8" />
              </svg>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link
              href="/"
              className="text-black transition hover:text-gray-700"
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="text-black transition hover:text-gray-700"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="text-black transition hover:text-gray-700"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-black focus:outline-none"
          >
            {isMenuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col items-center gap-4">
              <Link
                href="/"
                className="text-black transition hover:text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/pricing"
                className="text-black transition hover:text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-black transition hover:text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
