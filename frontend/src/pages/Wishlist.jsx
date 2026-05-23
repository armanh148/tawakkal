import React, { useEffect } from 'react';
import { useWishlist } from './WishlistContext';
import { useCart } from './CartContext';
import { useCurrency } from './CurrencyContext';
import { ShoppingBag, Trash2, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${import.meta.env.VITE_API_BASE_URL}${path}`;
  };

  const handleAddToCart = (product) => {
    const defaultSize = product.sizes?.length > 0 ? product.sizes[0] : 'M';
    const defaultColor = product.colors?.length > 0 ? product.colors[0] : { name: 'Black', hex: '#1a1a1a' };
    addToCart(product, 1, defaultSize, defaultColor);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-ivory min-h-screen text-charcoal pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
        <div className="flex items-center gap-4 mb-12">
          <Heart size={32} className="text-gold" />
          <h1 className="text-4xl font-bold tracking-tight">My <span className="italic font-serif text-gold">Wishlist</span></h1>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistItems.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gold/5"
              >
                {/* Image */}
                <div 
                  className="relative aspect-[3/4] overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img 
                    src={getImageUrl(product.image)} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                  
                  {/* Remove Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeFromWishlist(product.id); }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all transform hover:rotate-12"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold">{product.category || 'Collection'}</span>
                  </div>
                  <h3 
                    className="text-lg font-bold mb-4 line-clamp-1 hover:text-gold transition-colors cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xl font-bold text-charcoal">{formatPrice(product.price)}</p>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="bg-charcoal text-white p-3 rounded-xl hover:bg-gold transition-all shadow-lg hover:shadow-xl"
                      title="Add to Bag"
                    >
                      <ShoppingBag size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-12 md:p-24 text-center shadow-xl border border-gold/10">
            <div className="w-24 h-24 bg-gold/5 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart size={48} className="text-gold/20" />
            </div>
            <h2 className="text-2xl font-bold mb-4 tracking-tight">Your Wishlist is Empty</h2>
            <p className="text-gray-500 mb-10 max-w-md mx-auto">
              Save items you love to your wishlist. They will show up here so you can easily find them again.
            </p>
            <button 
              onClick={() => navigate('/products')}
              className="bg-charcoal text-white px-10 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gold transition-all shadow-2xl"
            >
              Discover Collections
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
