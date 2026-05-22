import React, { useState } from 'react';
import { useCart } from './CartContext.jsx';
import { useCurrency } from './CurrencyContext.jsx';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Truck, Shield, CreditCard, CheckCircle2, X } from 'lucide-react';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    phone: '',
    paymentMethod: 'cod'
  });

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, "")) : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 5000 ? 0 : 250;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send order to backend
      const orderData = {
        order_id: `#BL-${Date.now().toString().slice(-6)}`,
        customer: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        product: cartItems.map(item => `${item.name} (x${item.quantity})`).join(', '),
        amount: total,
        status: 'processing',
        address: `${formData.address}, ${formData.city}`,
        phone: formData.phone
      };

      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      setShowSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (cartItems.length === 0 && !showSuccess) {
    return (
      <div className="min-h-screen bg-ivory pt-32 flex flex-col items-center justify-center px-6">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold uppercase tracking-widest mb-4">Your bag is empty</h1>
        <button onClick={() => navigate('/products')} className="gold-button px-8 py-3 rounded-xl font-bold uppercase tracking-widest">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory pt-32 pb-20">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 mb-12">
          <span className="hover:text-gold cursor-pointer" onClick={() => navigate('/cart')}>Bag</span>
          <ChevronRight size={12} />
          <span className="text-charcoal font-bold">Checkout</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left - Checkout Form */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 border-b border-gray-100 pb-4">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">First Name</label>
                  <input
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Last Name</label>
                  <input
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Phone Number</label>
                <input
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  placeholder="+92 300 1234567"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Street Address</label>
                <input
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  placeholder="House #, Street Name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">City</label>
                <input
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  placeholder="Lahore"
                />
              </div>

              <div className="pt-8">
                <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">Payment Method</h2>
                <div className="space-y-4">
                  <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-gold bg-gold/5 shadow-md' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'cod' ? 'border-gold' : 'border-gray-300'}`}>
                        {formData.paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-gold rounded-full" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-wider">Cash on Delivery</p>
                        <p className="text-[10px] text-gray-500 mt-0.5 uppercase">Pay when you receive your order</p>
                      </div>
                    </div>
                    <Truck size={24} className="text-gray-400" />
                    <input type="radio" name="paymentMethod" value="cod" className="hidden" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} />
                  </label>

                  <label className={`flex items-center justify-between p-4 rounded-2xl border-2 opacity-50 cursor-not-allowed border-gray-100 bg-gray-50`}>
                    <div className="flex items-center gap-4">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                      <div>
                        <p className="text-sm font-bold uppercase tracking-wider text-gray-400">Credit / Debit Card</p>
                        <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-widest font-bold">Coming Soon</p>
                      </div>
                    </div>
                    <CreditCard size={24} className="text-gray-300" />
                  </label>
                </div>
              </div>

              <button type="submit" className="w-full gold-button py-5 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl mt-8">
                Place Order
              </button>
            </form>
          </div>

          {/* Right - Order Summary */}
          <div className="lg:w-[400px]">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-32">
              <h3 className="text-lg font-bold uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                    <div className="w-16 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate uppercase tracking-wider">{item.name}</p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">{item.selectedSize} | {item.quantity} Qty</p>
                      <p className="text-xs font-bold text-gold mt-1">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 uppercase tracking-widest font-bold text-[10px]">Subtotal</span>
                  <span className="font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 uppercase tracking-widest font-bold text-[10px]">Shipping</span>
                  <span className="font-bold">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-100">
                  <span className="font-extrabold uppercase tracking-widest">Total</span>
                  <span className="text-xl font-extrabold text-gold">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-[10px] text-gray-500 uppercase tracking-widest font-bold bg-gray-50 p-3 rounded-xl">
                  <Shield size={16} className="text-gold" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-charcoal/90 backdrop-blur-md animate-in fade-in duration-500">
          <div className="bg-white w-full max-w-lg p-12 shadow-2xl rounded-3xl relative animate-in zoom-in-95 duration-500 text-center">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={48} className="text-green-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4 uppercase tracking-widest text-charcoal">Order Placed!</h2>
            <p className="text-gray-500 mb-10 leading-relaxed uppercase tracking-widest font-bold text-[10px]">
              Thank you for shopping with Tawakkal. Your order has been successfully placed and is being processed. 
              Our representative will contact you shortly for confirmation.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="w-full gold-button py-5 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
