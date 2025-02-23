"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t-2 py-8 mt-7">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Logo Text */}
        <div className="flex justify-center text-[#9AE66E] font-bold text-lg">
          <span className="relative">
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
              className="absolute top-[-8px] right-[-16px]"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 1 1 2-2h14a2 2 1 1 1 2 2z" />
              <path d="M14.8 7.5a1.84 1.84 0 0 0-2.6 0l-.2.3-.3-.3a1.84 1.84 0 1 0-2.4 2.8L12 13l2.7-2.7c.9-.9.8-2.1.1-2.8" />
            </svg>
          </span>
        </div>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Crafting perfect captions for your moments.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
