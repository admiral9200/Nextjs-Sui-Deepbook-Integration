"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} className="p-2" aria-label="Toggle menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b z-50">
          <nav className="flex flex-col p-4">
            <Link
              href="/markets"
              className="py-2 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Markets
            </Link>
            <Link
              href="/portfolio"
              className="py-2 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href="/create-market"
              className="py-2 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Create Market
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
