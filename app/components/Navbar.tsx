"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-green-600 py-3 px-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center gap-6 w-full">
            <Link href="#home" className="text-white font-semibold hover:underline">
              Home
            </Link>
            <Link href="#products" className="text-white font-semibold hover:underline">
              Plants
            </Link>
            <Link href="#guidance" className="text-white font-semibold hover:underline">
              Guidance
            </Link>
            <Link href="#contact" className="text-white font-semibold hover:underline">
              Contact
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white focus:outline-none ml-auto"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
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
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 flex flex-col gap-3 pb-3">
            <Link
              href="#home"
              className="text-white font-semibold hover:underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#products"
              className="text-white font-semibold hover:underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              Plants
            </Link>
            <Link
              href="#guidance"
              className="text-white font-semibold hover:underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              Guidance
            </Link>
            <Link
              href="#contact"
              className="text-white font-semibold hover:underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}