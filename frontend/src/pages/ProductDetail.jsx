import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, Truck, Shield, RotateCcw, Minus, Plus, ShoppingBag, Star, ChevronRight, Check } from 'lucide-react';
import { useCart } from './CartContext.jsx';
import { useProducts } from './ProductContext.jsx';
import { useCurrency } from './CurrencyContext.jsx';
import { useWishlist } from './WishlistContext.jsx';

const DEFAULT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const DEFAULT_COLORS = [
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'Navy', hex: '#1e3a5f' },
  { name: 'Maroon', hex: '#800000' },
  { name: 'Beige', hex: '#d4c4b0' },
  { name: 'White', hex: '#f5f5f5' },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLORS[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);

  const { products, loading } = useProducts();
  const { formatPrice } = useCurrency();
  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${import.meta.env.VITE_API_BASE_URL}${path}`;
  };

  useEffect(() => {
    if (!loading && products.length > 0) {
      const foundProduct = products.find(p => p.id === parseInt(id));
      if (foundProduct) {
        const prodSizes = foundProduct.sizes?.length > 0 ? foundProduct.sizes : DEFAULT_SIZES;
        const prodColors = foundProduct.colors?.length > 0 ? foundProduct.colors : DEFAULT_COLORS;
        
        setProduct({
          ...foundProduct,
          category: foundProduct.category || (foundProduct.name.includes('SHIRT') ? 'Ready to Wear' : 'Unstitched'),
          sizes: prodSizes,
          colors: prodColors
        });
        
        setSelectedSize(prodSizes[0]);
        setSelectedColor(prodColors[0]);
      } else {
        navigate('/products');
      }
    }
    window.scrollTo(0, 0);
  }, [id, navigate, products, loading]);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    navigate('/cart');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  // Generate additional images for gallery
  const productImages = [product.image, ...(product.gallery?.map(img => img.image) || [])];

  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory to-white text-charcoal pt-24">
      {/* Breadcrumb */}
      <div className="max-w-[1600px] mx-auto px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="hover:text-gold cursor-pointer" onClick={() => navigate('/')}>Home</span>
          <ChevronRight size={14} />
          <span className="hover:text-gold cursor-pointer" onClick={() => navigate('/products')}>Products</span>
          <ChevronRight size={14} />
          <span className="text-charcoal font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-xl">
              <img
                src={getImageUrl(productImages[activeImage])}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-6 left-6 bg-gold text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                  {product.badge}
                </div>
              )}
              {product.discount && (
                <div className="absolute text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg bg-red-500" style={{top: product.badge ? '5rem' : '1.5rem', left: '1.5rem'}}>
                  {product.discount}% OFF
                </div>
              )}
              <button
                onClick={() => addToWishlist(product)}
                className={`absolute top-6 right-6 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all ${isInWishlist(product.id) ? 'bg-gold text-white' : 'bg-white text-charcoal hover:bg-gold hover:text-white'}`}
              >
                <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} className={isInWishlist(product.id) ? 'text-white' : ''} />
              </button>
              <button
                onClick={handleShare}
                className="absolute top-20 right-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gold hover:text-white transition-all"
                title="Share Product"
              >
                <Share2 size={20} />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === index ? 'border-gold shadow-lg' : 'border-gray-200 hover:border-gold/50'
                    }`}
                >
                  <img src={getImageUrl(img)} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-gold text-xs font-bold uppercase tracking-widest">{product.category}</span>
                <div className="h-px w-12 bg-gold/30" />
                <div className="flex items-center gap-1 text-gold">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-bold">4.9</span>
                  <span className="text-gray-400 text-sm">(128 reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              
              {(product.volume_no || product.article_no) && (
                <div className="flex gap-4 mb-4 text-sm text-gray-500 font-medium">
                  {product.volume_no && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-gold uppercase tracking-widest text-[10px]">Volume:</span>
                      <span className="text-charcoal">{product.volume_no}</span>
                    </div>
                  )}
                  {product.article_no && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-gold uppercase tracking-widest text-[10px]">Article:</span>
                      <span className="text-charcoal">{product.article_no}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap items-end gap-3">
                <p className="text-3xl font-bold text-gold">{formatPrice(product.price)}</p>
                {product.old_price && (
                  <p className="text-xl text-gray-400 line-through">{formatPrice(product.old_price)}</p>
                )}
                {product.discount && (
                  <span className="bg-red-500 text-white text-sm font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              Experience luxury with our premium fabric collection. This exquisite piece features intricate embroidery,
              premium quality materials, and exceptional craftsmanship that defines the Bin Labas heritage.
            </p>

            {/* Color Selection */}
            <div>
              <p className="font-semibold mb-3">Color: <span className="text-gray-600">{selectedColor?.name}</span></p>
              <div className="flex gap-3 flex-wrap">
                {product.colors?.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor?.name === color.name ? 'border-gold scale-110 shadow-lg' : 'border-gray-200'
                      }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold">Size: <span className="text-gold">{selectedSize}</span></p>
                <button className="text-sm text-gold hover:underline">Size Guide</button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl font-semibold text-sm transition-all ${selectedSize === size
                      ? 'bg-charcoal text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="font-semibold mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setQuantity(Math.max(1, quantity - 1)); }}
                  className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-16 text-center font-bold text-xl">{quantity}</span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setQuantity(quantity + 1); }}
                  className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 md:py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 md:gap-3 transition-all shadow-lg text-sm md:text-base ${addedToCart
                  ? 'bg-green-500 text-white'
                  : 'bg-charcoal text-white hover:bg-gold'
                  }`}
              >
                {addedToCart ? (
                  <><Check size={18} className="md:w-5 md:h-5" /> Added to Cart</>
                ) : (
                  <><ShoppingBag size={18} className="md:w-5 md:h-5" /> Add to Cart</>
                )}
              </button>
              <button
                onClick={handleBuyNow}
                className="px-6 md:px-8 py-3 md:py-4 rounded-xl border-2 border-charcoal font-bold uppercase tracking-wider hover:bg-charcoal hover:text-white transition-all text-sm md:text-base"
              >
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                <Truck size={18} className="text-gold md:w-5 md:h-5" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                <Shield size={18} className="text-gold md:w-5 md:h-5" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                <RotateCcw size={18} className="text-gold md:w-5 md:h-5" />
                <span>7-Day Returns</span>
              </div>
            </div>

            {/* Product Tabs */}
            <div className="mt-10">
              <div className="flex gap-4 md:gap-8 border-b border-gray-200 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                {['description', 'specifications', 'reviews', 'shipping'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 font-semibold capitalize transition-all whitespace-nowrap text-sm md:text-base ${activeTab === tab
                      ? 'text-gold border-b-2 border-gold'
                      : 'text-gray-500 hover:text-charcoal'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="py-6">
                {activeTab === 'description' && (
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      Indulge in the luxury of our premium collection, where every stitch tells a story of craftsmanship
                      and elegance. This exquisite piece has been meticulously designed to offer both comfort and style,
                      making it perfect for any occasion.
                    </p>
                    <p>
                      The fabric is carefully sourced from the finest mills, ensuring a soft touch against your skin while
                      maintaining its shape and color even after multiple washes. The intricate embroidery work is done by
                      skilled artisans who bring decades of experience to every piece.
                    </p>
                    <ul className="list-disc list-inside space-y-2 mt-4">
                      <li>Premium quality fabric with excellent drape</li>
                      <li>Intricate embroidery detailing</li>
                      <li>Comfortable fit for all-day wear</li>
                      <li>Available in multiple sizes and colors</li>
                      <li>Easy care - machine washable</li>
                    </ul>
                  </div>
                )}
                {activeTab === 'specifications' && (
                  <div>
                    <table className="w-full">
                      <tbody className="divide-y divide-gray-200">
                        {[
                          ['Article No', product.article_no || 'N/A'],
                          ['Volume No', product.volume_no || 'N/A'],
                          ['Fabric', 'Premium Lawn'],
                          ['Work', 'Embroidered'],
                          ['Occasion', 'Casual / Formal'],
                          ['Wash Care', 'Machine Wash'],
                          ['Country of Origin', 'Pakistan'],
                        ].map(([label, value]) => (
                          <tr key={label}>
                            <td className="py-3 font-semibold text-gray-600 w-1/3">{label}</td>
                            <td className="py-3 text-charcoal">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b border-gray-200 pb-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center font-bold text-gold">
                            A{review}
                          </div>
                          <div>
                            <p className="font-semibold">Ayesha K.</p>
                            <div className="flex text-gold text-sm">★★★★★</div>
                          </div>
                          <span className="text-gray-400 text-sm ml-auto">2 weeks ago</span>
                        </div>
                        <p className="text-gray-600">
                          Absolutely love this piece! The quality is amazing and it fits perfectly.
                          Will definitely be ordering more.
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-4 text-gray-600">
                    <p>
                      We offer free shipping on all orders above {formatPrice(5000)}. Orders are typically processed
                      within 24 hours and delivered within 3-5 business days across Pakistan.
                    </p>
                    <div className="bg-gray-50 p-6 rounded-xl mt-4">
                      <h4 className="font-bold text-charcoal mb-3">Delivery Options</h4>
                      <ul className="space-y-2">
                        <li>Standard Delivery: 3-5 business days (Free over {formatPrice(5000)})</li>
                        <li>Express Delivery: 1-2 business days (Additional charges apply)</li>
                        <li>Cash on Delivery available</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12 md:mt-16">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold">You May Also Like</h2>
            <button
              onClick={() => navigate('/products')}
              className="text-gold font-semibold hover:underline text-sm md:text-base"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-white shadow-md">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-xs text-gold uppercase tracking-wider font-bold mb-1">{item.name.includes('SHIRT') ? 'Ready to Wear' : 'Unstitched'}</p>
                <h3 className="font-bold group-hover:text-gold transition-colors line-clamp-1">{item.name}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-charcoal font-semibold">{formatPrice(item.price)}</p>
                  {item.old_price && <span className="text-gray-400 text-sm line-through">{formatPrice(item.old_price)}</span>}
                  {item.discount && <span className="bg-red-100 text-red-600 text-[9px] font-black px-1.5 py-0.5 rounded-full">{item.discount}% OFF</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
