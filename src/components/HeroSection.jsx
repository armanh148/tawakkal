import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Star, Award, Tag, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch dynamic banner from backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/hero-banner/`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id) setBanner(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo('.hero-fade-in',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
    )
      .fromTo('.product-card-reveal',
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power4.out' },
        '-=0.8'
      );
  }, []);

  // Resolve image sources: prefer dynamic, fallback to local static
  const bgSrc = banner?.bg_image || '/hero-bg.webp';
  const leftSrc = banner?.left_image || '/hero-left.jpg';
  const rightSrc = banner?.right_image || '/hero-right.jpg';

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#ebebeb]">

      {/* Vertical Scroll Indicator (Left) */}
      <div className="absolute left-10 bottom-24 hidden lg:flex flex-col items-center gap-6 z-30">
        <p className="text-[#a8a8a8] [writing-mode:vertical-lr] uppercase text-[9px] font-bold tracking-[0.4em] rotate-180">
          Scroll to Explore
        </p>
        <div className="w-px h-16 bg-[#e5e5e5]" />
      </div>

      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        {loading ? (
          <div className="w-full h-full bg-[#ebebeb] animate-pulse" />
        ) : (
          <img
            src={bgSrc}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        )}
        {/* Light overlay so text stays readable */}
        <div className="absolute inset-0 bg-white/55" />
      </div>

      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 md:pt-24 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Side: Product Image (3 columns) */}
          <div className="hidden xl:block xl:col-span-3 relative">
            <div 
              onClick={() => navigate('/products?sort=Newest')}
              className="product-card-reveal relative group cursor-pointer"
            >
              {/* New Arrival Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                <div className="bg-gold px-6 py-3 shadow-xl flex items-center gap-2 whitespace-nowrap">
                  <span className="text-sm font-bold uppercase tracking-widest text-white">New Arrival</span>
                </div>
              </div>

              <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f5] shadow-2xl">
                {loading ? (
                  <div className="w-full h-full bg-[#e0e0e0] animate-pulse" />
                ) : (
                  <img
                    src={leftSrc}
                    alt="Left Featured Product"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                )}
              </div>

            </div>
          </div>

          {/* Center Content */}
          <div className="lg:col-span-12 xl:col-span-6 space-y-10 flex flex-col items-center text-center z-40">
            <div className="hero-fade-in space-y-6 flex flex-col items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-[#e5e5e5]" />
                <p className="text-gold tracking-[0.4em] uppercase text-[10px] font-bold">Est. 1995</p>
                <div className="w-12 h-px bg-[#e5e5e5]" />
              </div>
              <p className="text-[#424242] tracking-[0.3em] uppercase text-[10px] font-bold">
                {banner?.subtitle || 'Experience the Art of Elegance'}
              </p>
            </div>

            <div className="hero-fade-in">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-7xl xl:text-9xl font-bold text-charcoal tracking-tighter leading-[0.9] uppercase mb-4">
                {banner?.title ? banner.title : (
                  <>LUXURY <br /><span className="italic font-serif text-gold">Defined</span></>
                )}
              </h1>
            </div>

            <div className="hero-fade-in pt-4">
              <button className="bg-gold hover:bg-gold/90 text-white px-8 sm:px-14 py-4 sm:py-6 uppercase text-[10px] sm:text-[11px] font-bold tracking-[0.2em] sm:tracking-[0.3em] transition-all duration-300 shadow-[0_20px_50px_rgba(230,161,59,0.2)]">
                Explore Collection
              </button>
            </div>
          </div>

          {/* Right Side: Product Card (3 columns) */}
          <div className="hidden xl:block xl:col-span-3 relative">
            <div 
              onClick={() => navigate('/products?sort=Best Seller')}
              className="product-card-reveal relative group cursor-pointer"
            >

              {/* Badges Overlay */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                <div className="bg-white px-6 py-3 shadow-xl flex items-center gap-2 whitespace-nowrap">
                  <Award size={16} className="text-gold" />
                  <span className="text-sm font-bold uppercase tracking-widest text-charcoal">Best Seller</span>
                </div>
              </div>

              {/* Main Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f5] shadow-2xl">
                {loading ? (
                  <div className="w-full h-full bg-[#e0e0e0] animate-pulse" />
                ) : (
                  <img
                    src={rightSrc}
                    alt="Right Featured Product"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                )}

                {/* Color Swatches */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
                  <div className="w-4 h-4 rounded-full bg-[#064e3b] border-2 border-white shadow-lg" />
                  <div className="w-4 h-4 rounded-full bg-[#f5f5dc] border-2 border-white shadow-lg" />
                  <div className="w-4 h-4 rounded-full bg-[#e6a13b] border-2 border-white shadow-lg" />
                </div>
              </div>



            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
