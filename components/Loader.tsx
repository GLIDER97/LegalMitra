import React from 'react';

export const FeaturedOn: React.FC = () => {
  return (
    <section className="py-12 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-6">
          Find Us On
        </h2>
        <div className="flex justify-center">
          <a href="https://www.producthunt.com/posts/legaliq-app?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-legaliq-app" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=465133&theme=dark" 
              alt="LegalIQ.app - Your AI Legal Guardian - Before You Sign, Let AI Shine | Product Hunt" 
              style={{width: '250px', height: '54px'}} 
              width="250" 
              height="54" 
            />
          </a>
        </div>
      </div>
    </section>
  );
};
