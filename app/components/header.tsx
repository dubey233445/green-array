"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

interface JWTPayload {
  username: string;
  exp: number;
}

export default function Header() {
  const [username, setUsername] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // ✅ Read token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwt.decode(token) as JWTPayload;

        // Check expiry
        if (decoded?.exp && decoded.exp * 1000 > Date.now()) {
          setUsername(decoded.username);
        } else {
          // Token expired → cleanup
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setUsername(null);
    window.location.href = "/signin"; // Redirect to signin
  };

  return (
    <header className="bg-green-800 text-white flex items-center justify-between p-4">
      {/* Left: Logo + Brand Name */}
      <div className="flex items-center space-x-3">
        <Image
          src="/logo/image.png"
          alt="GreenArray Logo"
          width={40}
          height={40}
        />
        <h1 className="text-2xl font-bold">GreenArray</h1>
      </div>

      {/* Right: Auth Section */}
      <div className="relative">
        {username ? (
          <>
            {/* Username button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-700 rounded hover:bg-green-600"
            >
              <span>{username}</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg">
                <Link
                  href="/cart"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  View Cart
                </Link>
                <Link
                  href="/public/add"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Become a seller
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="space-x-4">
            <Link
              href="/signin"
              className="bg-white text-green-800 px-4 py-2 rounded hover:bg-gray-200"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
