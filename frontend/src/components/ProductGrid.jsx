import React, { useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { useCart } from '../pages/CartContext.jsx';
import { useProducts } from '../pages/ProductContext.jsx';
import { useCurrency } from '../pages/CurrencyContext.jsx';
import { useWishlist } from '../pages/WishlistContext.jsx';

gsap.registerPlugin(ScrollTrigger);

const ProductGrid = ({ id, limit = null, category = 'All', sortBy = 'Featured', gridView = '4col' }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products, loading, error } = useProducts();
  const { formatPrice } = useCurrency();
  const { addToWishlist, isInWishlist } = useWishlist();

  const handleWishlist = (e, product) => {
    e.stopPropagation();
    addToWishlist(product);
  };
  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${import.meta.env.VITE_API_BASE_URL}${path}`;
  };

  const handleQuickAdd = (e, product) => {
    e.stopPropagation(); // Prevent navigation to product page
    // Default options for quick add
    const defaultSize = product.sizes?.length > 0 ? product.sizes[0] : 'M';
    const defaultColor = product.colors?.length > 0 ? product.colors[0] : { name: 'Black', hex: '#1a1a1a' };
    addToCart(product, 1, defaultSize, defaultColor);
    alert(`${product.name} added to cart!`);
  };

  const filteredProducts = useMemo(() => {
    let filtered = products.map((product, index) => {
      let cat = product.category;
      if (cat === 'Women') {
        cat = index % 3 === 0 ? 'Ready to Wear' : index % 3 === 1 ? 'Unstitched' : 'Luxe Edition';
      }
      return { ...product, category: cat };
    });

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter(p => p.category === category);
    }

    // Sort products
    if (sortBy === 'Price: Low to High') {
      filtered = [...filtered].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
        const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
        return priceA - priceB;
      });
    } else if (sortBy === 'Price: High to Low') {
      filtered = [...filtered].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
        const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
        return priceB - priceA;
      });
    } else if (sortBy === 'Newest') {
      filtered = [...filtered].reverse();
    } else if (sortBy === 'Best Seller') {
      const bestSellers = [...filtered].filter(p => p.badge && p.badge.toLowerCase() === 'best seller');
      const others = [...filtered].filter(p => !p.badge || p.badge.toLowerCase() !== 'best seller');
      filtered = [...bestSellers, ...others];
    }
    // 'Featured' keeps original order

    return limit ? filtered.slice(0, limit) : filtered;
  }, [products, category, limit, sortBy]);

  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(itemsRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>Failed to load products. Please try again later.</p>
      </div>
    );
  }

  return (
    <section ref={sectionRef} id={id} className="py-16 bg-ivory text-charcoal">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-500 text-sm">
            Showing <span className="font-bold text-charcoal">{filteredProducts.length}</span> products
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridView === '4col' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-8 transition-all duration-300`}>
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (itemsRef.current[index] = el)}
              onClick={() => navigate(`/product/${product.id}`)}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden mb-5 bg-white rounded-2xl shadow-md group-hover:shadow-xl transition-all duration-500">
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10 bg-gold text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                    {product.badge}
                  </div>
                )}
                {product.discount && (
                  <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg" style={{top: product.badge ? '3rem' : '1rem'}}>
                    {product.discount}% OFF
                  </div>
                )}

                {/* Image */}
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                  <button 
                    onClick={(e) => handleWishlist(e, product)}
                    className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all ${isInWishlist(product.id) ? 'bg-gold text-white' : 'bg-white text-charcoal hover:bg-gold hover:text-white'}`}
                  >
                    <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-charcoal hover:bg-gold hover:text-white transition-all">
                    <Eye size={18} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-20 group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="w-full bg-white text-charcoal py-4 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-gold hover:text-white transition-all shadow-xl flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} />
                    Add to Bag
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-2 px-1">
                <div className="flex items-center gap-2">
                  <p className="text-gold text-[10px] uppercase tracking-[0.2em] font-bold">{product.category}</p>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>
                <h3 className="text-lg font-bold group-hover:text-gold transition-colors line-clamp-1">{product.name}</h3>
                
                {(product.volume_no || product.article_no) && (
                  <div className="flex gap-2 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                    {product.volume_no && (
                      <span className="flex items-center gap-1">
                        <span className="text-gold/70">Vol:</span> {product.volume_no}
                      </span>
                    )}
                    {product.volume_no && product.article_no && <span className="text-gray-300">|</span>}
                    {product.article_no && (
                      <span className="flex items-center gap-1">
                        <span className="text-gold/70">Art:</span> {product.article_no}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-end justify-between gap-2 flex-wrap">
                  <div className="flex flex-col">
                    {product.old_price && (
                      <span className="text-gray-400 text-sm line-through leading-tight">{formatPrice(product.old_price)}</span>
                    )}
                    <div className="flex items-center gap-2">
                      <p className="text-charcoal font-bold text-lg">{formatPrice(product.price)}</p>
                      {product.discount && (
                        <span className="bg-red-100 text-red-600 text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-red-200">
                          {product.discount}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex text-gold text-sm">
                    ★★★★★
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {!limit && filteredProducts.length > 8 && (
          <div className="mt-16 text-center">
            <button className="inline-flex items-center gap-3 bg-charcoal text-white px-8 py-4 rounded-xl font-semibold hover:bg-gold transition-all shadow-lg hover:shadow-xl">
              Load More Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
