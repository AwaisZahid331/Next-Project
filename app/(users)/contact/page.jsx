"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // More subtle animations for professional look
      gsap.fromTo(".contact-title", 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }
      );

      // Contact info cards animation
      gsap.fromTo(".contact-card", 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Form animation
      gsap.fromTo(".contact-form", 
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Subtle icon animation
      gsap.to(".animated-icon", {
        y: -5,
        duration: 3,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.3
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900 text-white">
      {/* Hero Section - Reduced height */}
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-indigo-400 font-medium tracking-wide uppercase text-xs">Get In Touch</span>
          <h1 className="contact-title text-2xl md:text-4xl font-bold mt-3 mb-4">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Us</span>
          </h1>
          <p className="text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Ready to start your project? Let's discuss how we can help you achieve your goals.
          </p>
        </div>
      </section>

      {/* Contact Info & Form - Reduced spacing */}
      <section ref={contactRef} className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-200">Get in Touch</h2>
              
              <div className="space-y-4">
                {/* Phone */}
                <div className="contact-card group p-4 bg-white/5 rounded-lg border border-white/5 hover:border-indigo-400/30 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="animated-icon w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1 text-gray-200">Phone</h3>
                      <p className="text-xs text-gray-400">+1 (555) 123-4567</p>
                      <p className="text-xs text-gray-400">+1 (555) 987-6543</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-card group p-4 bg-white/5 rounded-lg border border-white/5 hover:border-purple-400/30 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="animated-icon w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1 text-gray-200">Email</h3>
                      <p className="text-xs text-gray-400">info@company.com</p>
                      <p className="text-xs text-gray-400">support@company.com</p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="contact-card group p-4 bg-white/5 rounded-lg border border-white/5 hover:border-green-400/30 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="animated-icon w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1 text-gray-200">Office</h3>
                      <p className="text-xs text-gray-400">123 Business Avenue</p>
                      <p className="text-xs text-gray-400">New York, NY 10001, USA</p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="contact-card group p-4 bg-white/5 rounded-lg border border-white/5 hover:border-yellow-400/30 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="animated-icon w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1 text-gray-200">Business Hours</h3>
                      <p className="text-xs text-gray-400">Mon - Fri: 9:00 AM - 6:00 PM</p>
                      <p className="text-xs text-gray-400">Sat: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3 text-gray-200">Follow Us</h3>
                <div className="flex space-x-3">
                  {[
                    { icon: "📘", label: "Facebook", color: "blue-400" },
                    { icon: "📷", label: "Instagram", color: "pink-400" },
                    { icon: "💼", label: "LinkedIn", color: "blue-500" },
                    { icon: "🐦", label: "Twitter", color: "sky-400" }
                  ].map((social, index) => (
                    <div key={index} className="animated-icon w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300 cursor-pointer">
                      <span className="text-lg">{social.icon}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <h2 className="text-xl font-semibold mb-6 text-gray-200">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-300 mb-2 font-medium">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-md focus:outline-none focus:border-indigo-400 transition-all duration-300"
                      placeholder="Your first name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-300 mb-2 font-medium">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-md focus:outline-none focus:border-indigo-400 transition-all duration-300"
                      placeholder="Your last name"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-300 mb-2 font-medium">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-md focus:outline-none focus:border-indigo-400 transition-all duration-300"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-300 mb-2 font-medium">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-md focus:outline-none focus:border-indigo-400 transition-all duration-300"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-300 mb-2 font-medium">Subject</label>
                  <select className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-md focus:outline-none focus:border-indigo-400 transition-all duration-300">
                    <option>General Inquiry</option>
                    <option>Web Development</option>
                    <option>Mobile App</option>
                    <option>UI/UX Design</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-300 mb-2 font-medium">Message</label>
                  <textarea 
                    rows="4"
                    className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-md focus:outline-none focus:border-indigo-400 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-3 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;