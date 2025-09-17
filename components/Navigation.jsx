// components/Navigation.jsx
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Animations on mount
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0, backgroundColor: "black" },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );

    gsap.fromTo(
      logoRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.5 }
    );

    gsap.fromTo(
      linksRef.current,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.2,
        delay: 0.8,
      }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-['Outfit',_sans-serif] ${
        isScrolled
          ? "bg-black/95 backdrop-blur-md shadow-lg py-2"
          : "bg-black/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center group">
            <div ref={logoRef} className="relative overflow-hidden">
              <div className="text-white font-bold text-2xl tracking-tight transition-transform duration-300 group-hover:scale-105 font-['Outfit',_sans-serif]">
                NextJs
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 text-blue-400">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/service", label: "Services" },
              { href: "/contact", label: "Contact" },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                ref={(el) => (linksRef.current[i] = el)}
                className="relative text-gray-300 hover:text-indigo-400 px-4 py-2 text-sm font-medium transition-all duration-300 group font-['Outfit',_sans-serif]"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-indigo-400 hover:bg-gray-800 focus:outline-none transition-colors duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-6 flex flex-col justify-center items-center relative">
                <span
                  className={`block absolute h-0.5 w-6 bg-current transform transition duration-500 ${
                    isMenuOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
                ></span>
                <span
                  className={`block absolute h-0.5 w-6 bg-current transition duration-500 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`block absolute h-0.5 w-6 bg-current transform transition duration-500 ${
                    isMenuOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 bg-black/95 backdrop-blur-md rounded-lg mt-2 shadow-xl border border-gray-800">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/service", label: "Services" },
              { href: "/contact", label: "Contact" },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-indigo-400 hover:bg-gray-800 transition-all duration-300 transform hover:translate-x-1 font-['Outfit',_sans-serif]"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;