"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { useCart } from "../context/CartContext";

// Hook to detect mobile
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

export default function Navbar() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const [user, setUser] = useState(null);
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedPic = localStorage.getItem("picture");
    if (storedUser || storedPic) {
      setUser("USER");
      setPicture(storedPic);
    }
  }, []);

  const onLogout = () => {
    setUser(null);
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md w-full relative z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center text-xl font-bold text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            <span className="ml-2">Fashionista</span>
          </Link>

          {/* Desktop Menu */}
          {!isMobile && (
            <div className="flex items-center space-x-6">
              <Link
                href="/products"
                className="text-sm font-medium hover:text-red-400 transition"
              >
                Shop
              </Link>
              <div className="relative">
                <Link href="/cart">
                  <FaShoppingCart className="text-gray-800" size={20} />
                  <span className="absolute -top-2 -right-2 text-xs bg-red-400 text-white w-5 h-5 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                </Link>
              </div>

              {user ? (
                <>
                  <button
                    onClick={onLogout}
                    className="rounded-md bg-red-400 hover:bg-red-500 transition px-4 py-2 text-sm text-white shadow"
                  >
                    Log Out
                  </button>
                  {picture ? (
                    <Link href="/profile">
                      <Image
                        src={picture}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </Link>
                  ) : (
                    <Link href="/profile">
                      <div className="rounded-full w-10 h-10 bg-gray-100 shadow flex justify-center items-center text-gray-600">
                        <IoPerson />
                      </div>
                    </Link>
                  )}
                </>
              ) : (
                <div className="flex gap-4">
                  <Link
                    href="/login"
                    className="bg-red-400 hover:bg-red-500 transition px-4 py-2 text-sm text-white rounded shadow"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="text-red-400 hover:text-red-500 px-4 py-2 text-sm transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <button onClick={toggleMenu} className="text-gray-900 z-50">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Panel */}
      {isMobile && menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md px-6 py-6 z-40 rounded-b-xl">
          <div className="space-y-4">
            <Link
              href="/products"
              onClick={toggleMenu}
              className="block text-gray-800 hover:text-red-400"
            >
              Shop
            </Link>
            <Link
              href="/cart"
              onClick={toggleMenu}
              className="block text-gray-800 hover:text-red-400"
            >
              Cart ({cart.length})
            </Link>
            {user ? (
              <>
                <button
                  onClick={() => {
                    toggleMenu();
                    onLogout();
                  }}
                  className="block w-full text-left text-red-500 hover:text-red-600 font-medium"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={toggleMenu}
                  className="block rounded bg-red-400 text-white px-4 py-2 text-sm text-center hover:bg-red-500"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={toggleMenu}
                  className="block text-red-400 hover:text-red-500 text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
