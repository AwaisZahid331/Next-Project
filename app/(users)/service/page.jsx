"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Service = () => {
  const servicesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main title animation
      gsap.fromTo(
        ".service-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        }
      );

      // Services cards animation
      gsap.fromTo(
        ".service-card",
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Process steps animation
      gsap.fromTo(
        ".process-step",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".process-section",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // CTA section animation
      gsap.fromTo(
        ".cta-section",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleCardHover = (e) => {
    gsap.to(e.currentTarget, {
      y: -10,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleCardLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900 text-white">
      <section
        ref={servicesRef}
        className="py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-950"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide cutting-edge digital solutions to help your business
              grow and succeed in the modern world.
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-stretch">
            {/* Service Card Template */}
            {[
              {
                title: "Web Development",
                icon: "💻",
                color: "indigo",
                desc: "Custom websites and web applications built with modern technologies for optimal performance.",
                items: [
                  "React/Next.js Development",
                  "Responsive Design",
                  "E-commerce Solutions",
                  "API Integration",
                ],
              },
              {
                title: "Mobile Development",
                icon: "📱",
                color: "purple",
                desc: "Native and cross-platform mobile applications for iOS and Android platforms.",
                items: [
                  "iOS & Android Apps",
                  "React Native",
                  "Flutter Development",
                  "App Store Deployment",
                ],
              },
              {
                title: "UI/UX Design",
                icon: "🎨",
                color: "green",
                desc: "User-centered design solutions that enhance engagement and drive conversions.",
                items: [
                  "User Interface Design",
                  "User Experience Research",
                  "Prototyping & Wireframing",
                  "Design Systems",
                ],
              },
              {
                title: "Digital Marketing",
                icon: "📈",
                color: "yellow",
                desc: "Strategic marketing campaigns to increase brand visibility and drive growth.",
                items: [
                  "SEO Optimization",
                  "Social Media Marketing",
                  "Content Strategy",
                  "Analytics & Reporting",
                ],
              },
              {
                title: "Cloud Solutions",
                icon: "☁️",
                color: "blue",
                desc: "Scalable cloud infrastructure and deployment solutions for modern applications.",
                items: [
                  "AWS/Azure/GCP",
                  "DevOps & CI/CD",
                  "Serverless Architecture",
                  "Database Management",
                ],
              },
              {
                title: "Tech Consulting",
                icon: "💼",
                color: "pink",
                desc: "Expert guidance and strategic planning for your digital transformation journey.",
                items: [
                  "Technology Audit",
                  "Digital Strategy",
                  "Project Planning",
                  "Team Training",
                ],
              },
            ].map((service, index) => (
              <div
                key={index}
                className={`service-card group flex flex-col p-8 bg-white/5 rounded-xl border border-white/10 
            hover:border-${service.color}-400/60 hover:shadow-lg hover:shadow-${service.color}-500/20 
            transition-all duration-300 cursor-pointer text-left`}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 bg-${service.color}-500/20 rounded-lg flex items-center justify-center mb-6 
            group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-3xl">{service.icon}</span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{service.desc}</p>

                {/* List */}
                <ul className="list-disc list-outside pl-5 space-y-2 text-gray-300 text-sm">
                  {service.items.map((item, i) => (
                    <li
                      key={i}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section py-20 px-4 bg-gradient-to-b from-black/50 to-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
          <p className="text-gray-300 mb-12">
            How we deliver exceptional results
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="process-step text-center">
              <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-semibold mb-2">Discover</h3>
              <p className="text-gray-400 text-sm">Research and analysis</p>
            </div>

            <div className="process-step text-center">
              <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📐</span>
              </div>
              <h3 className="font-semibold mb-2">Plan</h3>
              <p className="text-gray-400 text-sm">Strategy and design</p>
            </div>

            <div className="process-step text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">Develop</h3>
              <p className="text-gray-400 text-sm">Implementation</p>
            </div>

            <div className="process-step text-center">
              <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold mb-2">Launch</h3>
              <p className="text-gray-400 text-sm">Deployment and support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
    </div>
  );
};

export default Service;
