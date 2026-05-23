import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Clock, Shield, Heart, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    gsap.fromTo(statsRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <div className="bg-ivory min-h-screen text-charcoal">
      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-charcoal/60 z-10" />
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1920"
            alt="About Tawakkal"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold tracking-[0.4em] uppercase text-[10px] font-bold mb-6">Est. 2018</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-6">
            About <span className="italic font-serif text-gold">Us</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Tawakkal (بن لباس) is your one-stop destination for premium branded apparel
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section ref={sectionRef} className="py-24 md:py-32 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-gold tracking-[0.3em] uppercase text-[10px] font-bold">Our Story</p>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                  Tawakkal <span className="italic font-serif text-gold">Brand History</span>
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Tawakkal is a women's fashion brand proudly serving for over 7 years, offering premium embroidered and elegant Eastern wear. With years of experience in the fashion industry, we understand what modern women truly seek — quality, grace, and timeless style.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Our journey has been built on trust, craftsmanship, and a commitment to delivering outfits that reflect confidence and sophistication.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800"
                  alt="Fashion Collection"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 bg-gold text-white p-4 md:p-8">
                <p className="text-3xl md:text-5xl font-bold">7+</p>
                <p className="text-[9px] md:text-[10px] tracking-widest uppercase font-bold mt-1 md:mt-2">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-charcoal text-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold tracking-[0.3em] uppercase text-[10px] font-bold mb-4">Our Expertise</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              What We <span className="italic font-serif text-gold">Do?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Premium Collections", desc: "We create fashion that tells a story. Our mission is to provide premium unstitched and stitched collections that combine comfort with style." },
              { icon: Award, title: "Quality Craftsmanship", desc: "Whether it's the elegance of a classic lawn suit or the grandeur of a heavily embroidered festive outfit, we ensure every stitch meets the highest standards." },
              { icon: Shield, title: "Trust & Reliability", desc: "Built on years of trust, we deliver outfits that reflect confidence and sophistication for the modern woman." }
            ].map((item, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm p-8 border border-white/10 hover:border-gold/30 transition-all duration-300 group">
                <item.icon className="w-10 h-10 text-gold mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-4 tracking-tight">{item.title}</h3>
                <p className="text-white/70 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/5" />
        <div className="max-w-[1440px] mx-auto relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="mb-6 flex">
                  <div className="w-16 h-px bg-gold" />
                </div>
                <p className="text-gold tracking-[0.3em] uppercase text-[10px] font-bold">Our Purpose</p>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                  Our <span className="italic font-serif text-gold">Mission</span>
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-xl">
                Our mission is to deliver fashion that celebrates individuality, elegance, and confidence. We aim to provide beautifully crafted outfits that combine superior quality with timeless design, ensuring every customer experiences luxury and comfort in every stitch.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                We strive to combine premium fabrics, elegant embroidery, and modern silhouettes to create outfits that leave a lasting impression.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"
                  alt="Fashion Mission"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-gold text-white p-4 md:p-6">
                <p className="text-2xl md:text-4xl font-bold">7+</p>
                <p className="text-[9px] md:text-[10px] tracking-widest uppercase font-bold mt-1">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands We Offer */}
      <section className="py-24 bg-[#f9f9f9] border-y border-gold/10">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold tracking-[0.3em] uppercase text-[10px] font-bold mb-4">Premium Partners</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Brands We <span className="italic font-serif text-gold">Offer</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
            {['Tawakkal', 'Nisha by Nishat', 'Alkaram Studio', 'Zellbury', 'Maria.B', 'Junaid Jamshed (J.)', 'Ideas by Gul Ahmed'].map((brand, index) => (
              <div key={index} className="bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <p className="text-sm font-bold tracking-tight text-charcoal">{brand}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold tracking-[0.3em] uppercase text-[10px] font-bold mb-4">Support</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Frequently Asked <span className="italic font-serif text-gold">Questions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mx-auto">
            {[
              { q: "Can I purchase a return shipping label?", a: "Currently, we do not provide pre-paid return shipping labels. If you need to return an item, please use a reliable and trackable courier service to send the package back to our warehouse address." },
              { q: "Can I exchange items?", a: "Yes, we offer exchanges within 7 days of delivery if the size is incorrect or the product does not meet your expectations. Please ensure the items are unworn, unwashed, and have all original tags attached." },
              { q: "Should I know anything else about the Online Return Policy?", a: "Returns are generally accepted only for manufacturing defects or if the wrong item was dispatched. Please note that shipping charges are non-refundable unless the return is due to an error on our part." },
              { q: "What is the Store Returns Policy?", a: "Items purchased online can only be returned or exchanged through our online portal and cannot be processed at physical retail locations. Conversely, store purchases must be exchanged at the original point of sale with a valid receipt." },
              { q: "What items are final sale?", a: "All items purchased from the 'Clearance' or 'Flash Sale' sections are considered final sale and cannot be returned or exchanged. Additionally, customized stitched suits and accessories are non-returnable for hygiene and personalization reasons." }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 border border-gray-100 shadow-sm hover:border-gold/30 transition-all">
                <h3 className="font-bold text-charcoal mb-3 text-sm">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-24 bg-charcoal text-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold tracking-[0.3em] uppercase text-[10px] font-bold mb-4">Get in Touch</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Contact <span className="italic font-serif text-gold">Information</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-bold tracking-tight">Phone</h3>
              <p className="text-white/70 text-sm">0300-7904231</p>
              <p className="text-white/70 text-sm">0323-0000883</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-bold tracking-tight">Email</h3>
              <p className="text-white/70 text-sm">mianusmanjee09@gmail.com</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-bold tracking-tight">Address</h3>
              <a href="https://www.google.com/maps/search/?api=1&query=31.415547,73.070674" target="_blank" rel="noopener noreferrer" className="block hover:text-gold transition-colors">
                <p className="text-white/70 text-sm">Opposite GC University</p>
                <p className="text-white/70 text-sm">Kotwali Road, Chenab Chowk</p>
                <p className="text-white/70 text-sm">Faisalabad, Pakistan</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
