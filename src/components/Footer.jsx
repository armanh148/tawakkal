import React from 'react';
import { Link } from 'react-router-dom';

const SocialIcons = {
  Facebook: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Instagram: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Youtube: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.5 12 20.5 12 20.5s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  Tiktok: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  ),
  WhatsApp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M11.5 2C6.253 2 2 6.253 2 11.5c0 1.938.584 3.74 1.587 5.24L2 22l5.438-1.566C8.926 21.459 10.687 22 12.5 22 17.747 22 22 17.747 22 12.5S17.747 2 11.5 2zm0 18c-1.72 0-3.33-.504-4.682-1.37l-.336-.199-3.226.929.958-3.131-.218-.35A8.457 8.457 0 0 1 3 11.5C3 6.804 6.804 3 11.5 3S20 6.804 20 11.5 16.196 20 11.5 20z"/>
    </svg>
  ),
  Email: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  ),
  Location: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  ),
};

const Footer = ({ id }) => {
  return (
    <footer id={id} className="bg-charcoal text-white pt-16 md:pt-24 pb-8 border-t border-gold/20">
      <div className="max-w-[100%] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12 md:mb-20">
          
          {/* Column 1: Address */}
          <div className="pr-0 xl:pr-8">
            <h3 className="text-[14px] font-semibold text-white mb-3">Address</h3>
            <div className="w-16 h-[2px] bg-gold mb-6"></div>
            
            <div className="space-y-4 text-white">
              <a href="http://wa.me/03007904231" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gold transition-colors group">
                <span className="text-gold group-hover:scale-110 transition-transform">
                  <SocialIcons.WhatsApp />
                </span>
                <span className="text-[12px]">03007904231</span>
              </a>
              
              <a href="mailto:mianusmanjee09@gmail.com" className="flex items-center gap-3 hover:text-gold transition-colors group">
                <span className="text-gold group-hover:scale-110 transition-transform">
                  <SocialIcons.Email />
                </span>
                <span className="text-[12px]">mianusmanjee09@gmail.com</span>
              </a>
              
              <a href="https://www.google.com/maps/search/?api=1&query=31.415547,73.070674" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-gold transition-colors group">
                <span className="text-gold mt-1 group-hover:scale-110 transition-transform">
                  <SocialIcons.Location />
                </span>
                <span className="text-[12px] leading-relaxed">
                  Opposite GC University, Kotwali<br />Road, Chenab Chowk, Faisalabad
                </span>
              </a>
            </div>
          </div>

          {/* Column 2: Customer Care */}
          <div>
            <h3 className="text-[14px] uppercase tracking-[0.2em] font-extrabold text-white mb-4 md:mb-6">CUSTOMER CARE</h3>
            <ul className="space-y-1.5 md:space-y-2 text-[12px] text-white/60">
              <li><Link to="/contact" className="hover:text-gold transition-colors block">Contact Us</Link></li>
              <li><Link to="/feedback-survey" className="hover:text-gold transition-colors block">Feedback Survey</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-gold transition-colors block">Privacy Policy</Link></li>
              <li><Link to="/faqs" className="hover:text-gold transition-colors block">FAQ's</Link></li>
              <li><Link to="/disclaimer" className="hover:text-gold transition-colors block">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div>
            <h3 className="text-[14px] uppercase tracking-[0.2em] font-extrabold text-white mb-4 md:mb-6">INFORMATION</h3>
            <ul className="space-y-1.5 md:space-y-2 text-[12px] text-white/60">
              <li><Link to="/about" className="hover:text-gold transition-colors block">About Us</Link></li>
              <li><Link to="/shipping" className="hover:text-gold transition-colors block">Shipping and Handling</Link></li>
              <li><Link to="/store-locator" className="hover:text-gold transition-colors block">Store Locator</Link></li>
              <li><Link to="/blogs" className="hover:text-gold transition-colors block">Blogs</Link></li>
              <li><Link to="/fabric-glossary" className="hover:text-gold transition-colors block">Fabric Glossary</Link></li>
            </ul>
          </div>

          {/* Column 4: About */}
          <div className="lg:col-span-2">
            <h3 className="text-[14px] uppercase tracking-[0.2em] font-extrabold text-white mb-6">ABOUT</h3>
            <p className="text-white/60 text-[13px] leading-relaxed text-justify mb-4">
              Tawakkal began its journey with a global vision: to craft world-class textiles driven by innovation, quality, and design. Over the years, it has evolved into one of Pakistan's premier fashion and textile institutions. Today, Tawakkal stands as a symbol of premium fashion, trusted across domestic and international markets with a rapidly growing global footprint.
            </p>
            <div className="flex space-x-6 text-white/60">
              <a href="https://www.facebook.com/people/Tawakkal-by-aaa/61590335150631/?sk=directory_personal_details" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><SocialIcons.Facebook /></a>
              <a href="https://www.instagram.com/tawakkal.byaaa/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><SocialIcons.Instagram /></a>
              <a href="#" className="hover:text-gold transition-colors"><SocialIcons.Youtube /></a>
              <a href="#" className="hover:text-gold transition-colors"><SocialIcons.Tiktok /></a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 md:pt-4 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
          © 2026 - TAWAKKAL STUDIO | Developed by <span className="text-gold hover:text-orange-200 transition-colors"><a href="https://techmiresolutions.com/" target="_blank" rel="noopener noreferrer">Techmire Solutions</a></span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
