import React, { useEffect } from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

const StoreLocator = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stores = [
    {
      name: "Tawakkal Flagship Store",
      address: "Opposite GC University, Kotwali Road, Chenab Chowk",
      city: "Faisalabad",
      phone: "0300-7904231",
      hours: "Mon - Sat: 10:00 AM - 8:00 PM",
      features: ["Full Collection Available", "In-store Stitching", "Personal Shopping"]
    }
  ];

  return (
    <div className="bg-ivory min-h-screen text-charcoal">
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-charcoal">
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold tracking-[0.4em] uppercase text-[10px] font-bold mb-6">Find Us</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6">
            Store <span className="italic font-serif text-gold">Locator</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Visit our store for the complete shopping experience
          </p>
        </div>
      </section>

      {/* Store Locations */}
      <section className="py-24 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold tracking-[0.3em] uppercase text-[10px] font-bold mb-4">Visit Us</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Our <span className="italic font-serif text-gold">Location</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Store Info Cards */}
            <div className="space-y-8">
              {stores.map((store, index) => (
                <div key={index} className="bg-white p-8 shadow-lg border-l-4 border-gold">
                  <h3 className="text-2xl font-bold mb-6 tracking-tight">{store.name}</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">{store.address}</p>
                        <p className="text-gray-600">{store.city}, Pakistan</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                      <a href={`tel:${store.phone}`} className="hover:text-gold transition-colors">
                        {store.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-4">
                      <Clock className="w-5 h-5 text-gold flex-shrink-0" />
                      <span>{store.hours}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-3">Store Features:</p>
                    <div className="flex flex-wrap gap-2">
                      {store.features.map((feature, idx) => (
                        <span key={idx} className="bg-gold/10 text-gold px-3 py-1 text-xs font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=31.415547,73.070674" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 bg-charcoal text-white px-6 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-gold transition-colors"
                  >
                    <Navigation size={14} />
                    Get Directions
                  </a>
                </div>
              ))}

              {/* Contact Info */}
              <div className="bg-[#f9f9f9] p-8 border-y border-gold/10">
                <h4 className="font-bold text-lg mb-4">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Email:</span> mianusmanjee09@gmail.com</p>
                  <p><span className="font-medium">WhatsApp:</span> 0323-0000883</p>
                  <p><span className="font-medium">Phone:</span> 0300-7904231</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="aspect-square lg:aspect-auto lg:h-[600px] bg-gray-100 relative">
              <iframe
                src="https://maps.google.com/maps?q=31.415547,73.070674&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Store Location"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Store Experience */}
      <section className="py-24 bg-charcoal text-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              In-Store <span className="italic font-serif text-gold">Experience</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { title: "Personal Shopping", desc: "Get personalized assistance from our style experts" },
              { title: "Instant Alterations", desc: "Quick stitching and alteration services available" },
              { title: "Exclusive Deals", desc: "In-store only promotions and special discounts" }
            ].map((item, index) => (
              <div key={index} className="p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoreLocator;
