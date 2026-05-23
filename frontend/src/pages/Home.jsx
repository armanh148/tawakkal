import React from 'react';
import HeroSection from '../components/HeroSection';
import OurStory from '../components/OurStory';
import CategoryGallery from '../components/CategoryGallery';
import ProductMarquee from '../components/ProductMarquee';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import ReelsGallery from '../components/ReelsGallery';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <CategoryGallery />
      <ProductMarquee id="shop" limit={8} />
      <WhyChooseUs />

      {/* Quote & Statistics Combined Section */}
      <section className="relative py-16 md:py-28 bg-charcoal overflow-hidden text-white">
        {/* Background Image */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-charcoal/80 z-10" />
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200"
            className="w-full h-full object-cover grayscale opacity-50"
            alt="Background"
          />
        </div>

        <div className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quote */}
          <div className="text-center mb-10 md:mb-16">
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-4 md:mb-6">
              <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
              <p className="text-gold tracking-[0.4em] uppercase text-[10px] font-bold">Our Philosophy</p>
              <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-5xl font-serif italic text-white leading-tight mb-4 md:mb-6 max-w-4xl mx-auto px-4">
              "Quality is never an accident; it is always the result of intelligent effort."
            </h2>
            <p className="text-white/50 text-xs uppercase tracking-[0.3em]">The Tawakkal Collection</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {/* Stat 1 */}
            <div className="group bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-gold/30 flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 rounded-lg md:rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-charcoal tracking-tight">
                  25<span className="text-gold">k</span><span className="text-gold">+</span>
                </h3>
                <div className="w-6 md:w-8 h-0.5 bg-gold my-0.5 md:my-1" />
                <p className="text-gray-500 text-[10px] md:text-[11px] uppercase tracking-wider font-semibold">Happy Clients</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="group bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-gold/30 flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-charcoal tracking-tight">
                  28<span className="text-gold">+</span>
                </h3>
                <div className="w-6 md:w-8 h-0.5 bg-gold my-0.5 md:my-1" />
                <p className="text-gray-500 text-[10px] md:text-[11px] uppercase tracking-wider font-semibold">Years Experience</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="group bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-gold/30 flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 rounded-lg md:rounded-xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-charcoal tracking-tight">
                  500<span className="text-gold">+</span>
                </h3>
                <div className="w-6 md:w-8 h-0.5 bg-gold my-0.5 md:my-1" />
                <p className="text-gray-500 text-[10px] md:text-[11px] uppercase tracking-wider font-semibold">Exclusive Designs</p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="group bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-gold/30 flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 rounded-lg md:rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-charcoal tracking-tight">
                  100<span className="text-gold">%</span>
                </h3>
                <div className="w-6 md:w-8 h-0.5 bg-gold my-0.5 md:my-1" />
                <p className="text-gray-500 text-[10px] md:text-[11px] uppercase tracking-wider font-semibold">Authentic Fabric</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OurStory id="about" />

      <Testimonials />

      <ReelsGallery />
    </main>
  );
};

export default Home;
