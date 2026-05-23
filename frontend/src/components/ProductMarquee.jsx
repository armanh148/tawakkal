import React, { useMemo } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useProducts } from '../pages/ProductContext.jsx';
import { useCart } from '../pages/CartContext.jsx';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductMarquee = ({ id, limit = 8 }) => {
  const { products: contextProducts, loading } = useProducts();
  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${import.meta.env.VITE_API_BASE_URL}${path}`;
  };
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    const defaultSize = product.sizes?.length > 0 ? product.sizes[0] : 'M';
    const defaultColor = product.colors?.length > 0 ? product.colors[0] : { name: 'Black', hex: '#1a1a1a' };
    addToCart(product, 1, defaultSize, defaultColor);
    alert(`${product.name} added to cart!`);
  };

  const products = useMemo(() => {
    return contextProducts.map(product => ({
      ...product,
      category: product.name.includes('SHIRT') ? 'Ready to Wear' : 'Embroidered Suits'
    }));
  }, [contextProducts]);

  const displayedProducts = products.slice(0, limit);

  if (loading) return null;

  return (
    <section id={id} className="py-16 md:py-24 bg-ivory text-charcoal overflow-hidden">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6">
          <div className="space-y-2 md:space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-gold" />
              <p className="text-gold tracking-[0.3em] uppercase text-[10px] font-bold">Trending Now</p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Featured <span className="italic font-serif text-gold">Collection</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-md">
              Discover our handpicked selection of premium fabrics and exquisite designs
            </p>
          </div>
          <a
            href="/products"
            className="group flex items-center gap-2 bg-charcoal text-white px-6 py-3 text-[11px] tracking-[0.15em] uppercase font-bold hover:bg-gold transition-all"
          >
            View All
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Products Slider */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={2}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
          className="product-slider"
        >
          {displayedProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="group h-full cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                {/* Product Card */}
                <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    {product.badge && (
                      <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10 bg-gold text-white text-[8px] md:text-[9px] font-bold uppercase tracking-widest px-2 py-1 md:px-3 md:py-1.5">
                        {product.badge}
                      </div>
                    )}
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                    {/* Quick Add Button */}
                    <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <button onClick={(e) => handleQuickAdd(e, product)} className="w-full bg-white text-charcoal py-2.5 md:py-3 flex items-center justify-center gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-gold hover:text-white transition-all shadow-xl">
                        <ShoppingBag size={14} />
                        <span className="hidden sm:inline">Add to Bag</span>
                        <span className="sm:hidden">Add</span>
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-3 md:p-4 space-y-1 md:space-y-2">
                    <p className="text-gold text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold">
                      {product.category}
                    </p>
                    <h3 className="text-sm md:text-base font-bold group-hover:text-gold transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    
                    {(product.volume_no || product.article_no) && (
                      <div className="flex gap-2 text-[8px] md:text-[9px] text-gray-400 font-medium uppercase tracking-wider">
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

                    <p className="text-charcoal font-bold text-xs md:text-sm tracking-wider">
                      {product.price}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Swiper Styles */}
      <style>{`
        .product-slider .swiper-button-next,
        .product-slider .swiper-button-prev {
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          color: #1a1a1a;
          transition: all 0.3s ease;
        }
        
        .product-slider .swiper-button-next:hover,
        .product-slider .swiper-button-prev:hover {
          background: #e6a13b;
          color: white;
          transform: scale(1.1);
        }
        
        .product-slider .swiper-button-next::after,
        .product-slider .swiper-button-prev::after {
          font-size: 14px;
          font-weight: bold;
        }
        
        .product-slider .swiper-pagination {
          position: relative;
          margin-top: 20px;
        }
        
        .product-slider .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .product-slider .swiper-pagination-bullet-active {
          background: #e6a13b;
          width: 24px;
          border-radius: 4px;
        }

        @media (max-width: 640px) {
          .product-slider .swiper-button-next,
          .product-slider .swiper-button-prev {
            width: 32px;
            height: 32px;
          }
          
          .product-slider .swiper-button-next::after,
          .product-slider .swiper-button-prev::after {
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  );
};

export default ProductMarquee;
