// components/TitleUpdater.jsx
"use client";
import { useEffect } from 'react';

const TitleUpdater = () => {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const sectionTitle = section.getAttribute('data-title');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.title = `${sectionTitle} - My Website`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial title

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default TitleUpdater;