"use client";

import Hero from "./hero/page";
import About from "./about/page";
import Service from "./service/page";
import Contact from "./contact/page";
import Link from "next/link";

export default function Page() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden pt-16">
     

      {/* Hero Section */}
      <section id="home" className="mb-24"> {/* add bottom margin */}
        <Hero />
      </section>

      {/* About Section */}
      <section id="about" className="mb-24">
        <About />
      </section>

      {/* Services Section */}
      <section id="service" className="mb-24">
        <Service />
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-16">
        <Contact />
      </section>
    </main>
  );
}
