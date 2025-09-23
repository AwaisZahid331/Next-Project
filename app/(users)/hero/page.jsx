
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";

gsap.registerPlugin(ScrollToPlugin);

export default function Hero() {
  const heroRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main hero animation
      gsap.fromTo(
        heroRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );

      // Staggered text animation
      gsap.fromTo(
        ".hero-text",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.2,
        }
      );

      // Button animation
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.6,
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          delay: 0.4,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleButtonHover = (e) => {
    gsap.to(e.target, {
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleButtonLeave = (e) => {
    gsap.to(e.target, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const scrollToNext = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: "#about", offsetY: 50 },
      ease: "power2.inOut",
    });
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900">
      {/* Main Hero Section */}
      <section
        ref={heroRef}
        className="relative py-16 px-4 min-h-screen flex items-center"
      >
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="hero-text inline-block px-3 py-1.5 bg-indigo-500/20 border border-indigo-400/30 rounded-full mb-6">
                <span className="text-indigo-300 text-xs font-medium">
                  🚀 Trusted by 10,000+ Companies Worldwide
                </span>
              </div>

              <h1 className="hero-text text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Build{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Amazing
                </span>{" "}
                Digital Experiences
              </h1>

              <p className="hero-text text-base md:text-lg text-gray-300 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                We create stunning web applications with cutting-edge technology,
                delivering exceptional performance and user experiences that drive
                business growth.
              </p>
              {/* Buttons */}
              <div className="hero-text flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center">
                <button
                  ref={buttonRef}
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                  onClick={scrollToNext}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-sm"
                >
                  Start Your Project
                </button>
                <button
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                  className="px-6 py-3 border border-indigo-400 text-indigo-300 font-medium rounded-lg hover:bg-indigo-400/10 transition-all duration-300 text-sm"
                >
                  View Case Studies
                </button>
              </div>

              {/* Trusted By */}
              <div className="hero-text mt-8">
                <p className="text-xs text-gray-400 mb-4">Trusted by industry leaders</p>
                <div className="flex justify-center lg:justify-start items-center gap-6 opacity-60">
                  <div className="text-gray-300 font-semibold text-sm">Google</div>
                  <div className="text-gray-300 font-semibold text-sm">Microsoft</div>
                  <div className="text-gray-300 font-semibold text-sm">Amazon</div>
                </div>
              </div>
            </div>

            {/* Image Content */}
            <div className="relative" ref={imageRef}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* Main Hero Image */}
                <div className="aspect-video bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">Digital Excellence</h3>
                    <p className="text-gray-300 text-sm">Cutting-edge solutions for modern businesses</p>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-indigo-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-purple-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute top-1/2 -right-6 w-6 h-6 bg-green-400 rounded-full opacity-30 animate-bounce"></div>
              </div>

              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-2">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}