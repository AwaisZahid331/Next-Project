"use client";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

const particlePositions = [
  { top: "10%", left: "20%", size: "12px", duration: "4s", delay: "0.5s" },
  { top: "25%", left: "75%", size: "8px", duration: "5s", delay: "1s" },
  { top: "40%", left: "40%", size: "15px", duration: "6s", delay: "0s" },
  { top: "60%", left: "10%", size: "10px", duration: "7s", delay: "1.5s" },
  { top: "75%", left: "60%", size: "18px", duration: "5s", delay: "0.8s" },
];

export default function Page() {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const statsRef = useRef(null);
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useLayoutEffect(() => {
    if (pathname === "/" && isMounted) {
      const ctx = gsap.context(() => {
        // Hide all elements initially
        gsap.set([titleRef.current, textRef.current, buttonRef.current], {
          opacity: 0,
          y: 30,
        });
        
        // Specifically hide the stats container and its children
        gsap.set(statsRef.current, { opacity: 0 });
        gsap.set(statsRef.current.children, { x: -50, opacity: 0 });

        const tl = gsap.timeline();
        tl.to(titleRef.current, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
          .to(textRef.current, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.5")
          .to(buttonRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.3")
          .to(statsRef.current, { opacity: 1, duration: 0.2 }) // Fade in the container first
          .to(
            statsRef.current.children,
            { x: 0, opacity: 1, stagger: 0.3, duration: 1, ease: "power2.out" },
            "-=0.1"
          );
      });
      return () => ctx.revert();
    }
  }, [pathname, isMounted]);

  // Hover animation for buttons
  const handleButtonHover = (e) => {
    gsap.to(e.target, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleButtonLeave = (e) => {
    gsap.to(e.target, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  // Hover animation for stat cards
  const handleStatHover = (e) => {
    gsap.to(e.currentTarget, {
      y: -10,
      backgroundColor: "rgba(30, 41, 59, 0.7)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleStatLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      backgroundColor: "rgba(31, 41, 55, 0.5)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center text-white overflow-hidden pt-16">
      {/* Dark background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526406915894-6c1d6c5e6c05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-br from-black/90 to-gray-900/90"></div>

      {/* Particles */}
      {isMounted && (
        <div className="absolute inset-0 z-2 opacity-20">
          {particlePositions.map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: p.size,
                height: p.size,
                top: p.top,
                left: p.left,
                animationDuration: p.duration,
                animationDelay: p.delay,
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-10">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300"
        >
          Welcome to <span className="text-blue-400">Next.js Project</span>
        </h1>

        <p
          ref={textRef}
          className="mt-4 text-lg md:text-xl text-gray-300 font-light leading-relaxed"
        >
          Build modern apps with speed and performance. The React framework for
          production-ready web apps.
        </p>

        <div
          ref={buttonRef}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button 
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:shadow-lg"
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            Get Started
          </button>
          <button 
            className="px-6 py-3 rounded-lg bg-transparent border border-white/30 text-white font-medium shadow-md hover:bg-white/10 transition-all duration-300 transform hover:shadow-lg"
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            Learn More
          </button>
        </div>

        {/* Stats (moved left) */}
        <div
          ref={statsRef}
          className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left opacity-0" // Added opacity-0 as fallback
        >
          <div 
            className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/30 transition-all duration-300 cursor-pointer hover:shadow-lg"
            onMouseEnter={handleStatHover}
            onMouseLeave={handleStatLeave}
          >
            <div className="text-3xl font-bold text-blue-300">100%</div>
            <div className="text-gray-300 mt-1 text-sm">Faster Refresh</div>
          </div>
          <div 
            className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/30 transition-all duration-300 cursor-pointer hover:shadow-lg"
            onMouseEnter={handleStatHover}
            onMouseLeave={handleStatLeave}
          >
            <div className="text-3xl font-bold text-blue-300">SEO</div>
            <div className="text-gray-300 mt-1 text-sm">Ready</div>
          </div>
          <div 
            className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/30 transition-all duration-300 cursor-pointer hover:shadow-lg"
            onMouseEnter={handleStatHover}
            onMouseLeave={handleStatLeave}
          >
            <div className="text-3xl font-bold text-blue-300">0 Config</div>
            <div className="text-gray-300 mt-1 text-sm">Required</div>
          </div>
        </div>
      </div>
    </main>
  );
}