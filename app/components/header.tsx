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
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ✅ Read token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwt.decode(token) as JWTPayload;

        // Check expiry
        if (decoded?.exp && decoded.exp * 1000 > Date.now()) {
          setUsername(decoded.username);
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token"); // expired
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Invalid token", err);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }

    // ✅ Load cart count if logged in
    if (isLoggedIn) {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartCount(JSON.parse(storedCart).length);
      }

      // ✅ Listen for cart updates
      const handleStorage = () => {
        const updatedCart = localStorage.getItem("cart");
        setCartCount(updatedCart ? JSON.parse(updatedCart).length : 0);
      };
      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setUsername(null);
    setIsLoggedIn(false);
    window.location.href = "/signin"; // Redirect to signin
  };

  return (
    <header className="bg-green-800 text-white flex items-center justify-between p-3 md:p-4">
      {/* Left: Logo + Brand Name */}
      <div className="flex items-center space-x-2 md:space-x-3">
        <Image
          src="/logo/image.png"
          alt="GreenArray Logo"
          width={32}
          height={32}
          className="md:w-10 md:h-10"
        />
        <h1 className="text-lg md:text-2xl font-bold">GreenArray</h1>
      </div>

      {/* Right: Auth Section + Cart */}
      <div className="flex items-center space-x-2 md:space-x-4 relative">
        {/* ✅ Show Cart only if logged in */}
        {isLoggedIn && (
          <Link href="/cart" className="relative">
            <Image
              src="/images/add-to-cart-svgrepo-com.svg"
              alt="Cart"
              width={24}
              height={24}
              className="md:w-8 md:h-8 cursor-pointer hover:opacity-80"
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        )}

        {/* Auth Section */}
        <div className="relative">
          {username ? (
            <>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-1.5 md:py-2 bg-green-700 rounded hover:bg-green-600 text-sm md:text-base"
              >
                <span className="truncate max-w-[80px] md:max-w-none">{username}</span>
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

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg">
                  <Link
                    href="/plants/add"
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
            <div className="flex space-x-1.5 md:space-x-4">
              <Link
                href="/signin"
                className="bg-white text-green-800 px-2 py-1 md:px-4 md:py-2 rounded hover:bg-gray-200 text-xs md:text-base"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-green-600 text-white px-2 py-1 md:px-4 md:py-2 rounded hover:bg-green-500 text-xs md:text-base"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
