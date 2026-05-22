import React, { useEffect } from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blogs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPosts = [
    {
      title: "Summer Fashion Trends 2026: Embracing Eastern Elegance",
      excerpt: "Discover the latest summer fashion trends that blend traditional Eastern aesthetics with modern comfort. From breathable fabrics to vibrant colors, explore what's in vogue this season.",
      author: "Tawakkal Team",
      date: "May 1, 2026",
      category: "Fashion Trends",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "The Art of Pakistani Embroidery: A Legacy of Craftsmanship",
      excerpt: "Explore the rich history and intricate techniques of Pakistani embroidery. Learn about the different styles that make our traditional outfits truly special.",
      author: "Nisha Khan",
      date: "April 25, 2026",
      category: "Craftsmanship",
      image: "https://images.unsplash.com/photo-1610189012901-1f3e5d7f9b1c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Styling Guide: How to Accessorize Your Eastern Wear",
      excerpt: "Complete your look with the perfect accessories. From jewelry to handbags, learn how to elevate your traditional outfits with modern styling tips.",
      author: "Ayesha Malik",
      date: "April 18, 2026",
      category: "Styling Tips",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Fabric Care: Maintaining Your Premium Eastern Outfits",
      excerpt: "Learn the best practices for washing, storing, and maintaining your precious Eastern wear. Keep your outfits looking fresh and vibrant for years to come.",
      author: "Tawakkal Team",
      date: "April 10, 2026",
      category: "Care Guide",
      image: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Eid Collection 2026: Festive Fashion Preview",
      excerpt: "Get an exclusive sneak peek at our upcoming Eid collection. Discover the stunning designs that will make your celebrations even more special.",
      author: "Design Team",
      date: "April 5, 2026",
      category: "Collections",
      image: "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Sustainable Fashion: Our Commitment to Ethical Practices",
      excerpt: "Learn about our initiatives towards sustainable and ethical fashion. Discover how we're making a difference while delivering premium quality.",
      author: "Management",
      date: "March 28, 2026",
      category: "Sustainability",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="bg-ivory min-h-screen text-charcoal">
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-charcoal">
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <p className="text-gold tracking-[0.4em] uppercase text-[10px] font-bold mb-6">Stories & Insights</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6">
            Our <span className="italic font-serif text-gold">Blog</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Fashion tips, styling guides, and the latest trends
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-white shadow-sm group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="text-gold font-medium">{post.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 tracking-tight group-hover:text-gold transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <User size={12} />
                      {post.author}
                    </span>
                    <span className="text-xs font-bold text-gold flex items-center gap-1">
                      Read More
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-[#f9f9f9] border-y border-gold/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Stay <span className="italic font-serif text-gold">Updated</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for the latest blog posts, fashion tips, and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-1 bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
            />
            <button className="bg-charcoal text-white px-6 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-gold transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
