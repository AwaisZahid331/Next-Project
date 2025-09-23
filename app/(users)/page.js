"use client";

import Hero from "./hero/page";
import About from "./about/page";
import Service from "./service/page";
import Contact from "./contact/page";

export default function Page() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden pt-16">
      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Services Section */}
      <section id="service">  
        <Service />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}
