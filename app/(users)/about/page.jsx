"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main content animation
      gsap.fromTo(".about-content", 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Timeline animation
      gsap.fromTo(".timeline-item", 
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".timeline-section",
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stats counter animation
      gsap.fromTo(".stat-number", 
        { innerText: 0 },
        {
          innerText: (i, target) => parseInt(target.getAttribute("data-value")),
          duration: 2,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          onUpdate: function() {
            this.targets()[0].innerText = Math.floor(this.targets()[0].innerText);
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900 text-white">
      {/* Hero About Section */}
      <section ref={aboutRef} className="relative py-32 px-4">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="about-content text-center mb-16">
           
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
              Leading <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Digital Innovation</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We transform ideas into powerful digital solutions. With expertise in modern technologies 
              and a passion for excellence, we deliver results that drive business growth.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="stats-section grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="stat-number text-3xl md:text-4xl font-bold text-indigo-400 mb-2" data-value="8">0</div>
              <div className="text-gray-400 text-sm">Years Experience</div>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="stat-number text-3xl md:text-4xl font-bold text-purple-400 mb-2" data-value="250">0</div>
              <div className="text-gray-400 text-sm">Projects Completed</div>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="stat-number text-3xl md:text-4xl font-bold text-green-400 mb-2" data-value="50">0</div>
              <div className="text-gray-400 text-sm">Team Experts</div>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
              <div className="stat-number text-3xl md:text-4xl font-bold text-yellow-400 mb-2" data-value="98">0</div>
              <div className="text-gray-400 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section py-20 px-6">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
      <p className="text-gray-400 text-base md:text-lg">
        Milestones that shaped our growth and success.
      </p>
    </div>

    {/* Timeline grid (2 per row on md+) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Item 1 */}
      <div className="timeline-item relative pl-8 border-l-2 border-indigo-400">
        <div className="absolute -left-2 w-4 h-4 bg-indigo-400 rounded-full"></div>
        <div className="bg-white/5 p-5 rounded-lg border border-white/10 hover:border-indigo-400/50 transition-all duration-300">
          <span className="text-indigo-400 font-semibold text-lg">
            2016 - Company Foundation
          </span>
          <p className="text-gray-300 text-sm mt-2 leading-relaxed">
            Established with a vision to deliver exceptional digital solutions and innovative technology services.
          </p>
        </div>
      </div>

      {/* Item 2 */}
      <div className="timeline-item relative pl-8 border-l-2 border-purple-400">
        <div className="absolute -left-2 w-4 h-4 bg-purple-400 rounded-full"></div>
        <div className="bg-white/5 p-5 rounded-lg border border-white/10 hover:border-purple-400/50 transition-all duration-300">
          <span className="text-purple-400 font-semibold text-lg">
            2018 - First Major Client
          </span>
          <p className="text-gray-300 text-sm mt-2 leading-relaxed">
            Secured enterprise-level client, marking our entry into the corporate digital transformation space.
          </p>
        </div>
      </div>

      {/* Item 3 */}
      <div className="timeline-item relative pl-8 border-l-2 border-green-400">
        <div className="absolute -left-2 w-4 h-4 bg-green-400 rounded-full"></div>
        <div className="bg-white/5 p-5 rounded-lg border border-white/10 hover:border-green-400/50 transition-all duration-300">
          <span className="text-green-400 font-semibold text-lg">
            2020 - Global Expansion
          </span>
          <p className="text-gray-300 text-sm mt-2 leading-relaxed">
            Expanded operations internationally, serving clients across 15+ countries with remote teams.
          </p>
        </div>
      </div>

      {/* Item 4 */}
      <div className="timeline-item relative pl-8 border-l-2 border-yellow-400">
        <div className="absolute -left-2 w-4 h-4 bg-yellow-400 rounded-full"></div>
        <div className="bg-white/5 p-5 rounded-lg border border-white/10 hover:border-yellow-400/50 transition-all duration-300">
          <span className="text-yellow-400 font-semibold text-lg">
            2022 - AI Integration
          </span>
          <p className="text-gray-300 text-sm mt-2 leading-relaxed">
            Integrated artificial intelligence and machine learning capabilities into our service offerings.
          </p>
        </div>
      </div>

      {/* Item 5 (full width if odd) */}
      <div className="timeline-item relative pl-8 border-l-2 border-pink-400 md:col-span-2">
        <div className="absolute -left-2 w-4 h-4 bg-pink-400 rounded-full"></div>
        <div className="bg-white/5 p-5 rounded-lg border border-white/10 hover:border-pink-400/50 transition-all duration-300">
          <span className="text-pink-400 font-semibold text-lg">
            2024 - Industry Recognition
          </span>
          <p className="text-gray-300 text-sm mt-2 leading-relaxed">
            Awarded as Top Digital Agency, recognized for innovation and excellence in web development.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* CTA Section */}
      {/* <section className="py-20 px-4 bg-gradient-to-r from-indigo-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our growing list of satisfied clients and let's create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
              Get Started Today
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
              View Our Work
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default About;