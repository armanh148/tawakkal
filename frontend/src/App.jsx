import React, { useState } from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Preloader from './components/Preloader';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Auth from './pages/Auth';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Disclaimer from './pages/Disclaimer';
import Shipping from './pages/Shipping';
import StoreLocator from './pages/StoreLocator';
import Blogs from './pages/Blogs';
import FabricGlossary from './pages/FabricGlossary';
import FeedbackSurvey from './pages/FeedbackSurvey';
import FAQs from './pages/FAQs';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import { ProductProvider } from './pages/ProductContext';
import { CartProvider } from './pages/CartContext';
import { CurrencyProvider } from './pages/CurrencyContext';
import { WishlistProvider } from './pages/WishlistContext';

// Layout for the main storefront
const StoreLayout = ({ loading, setLoading }) => {
  return (
    <WishlistProvider>
      <CurrencyProvider>
        <CartProvider>
          <ProductProvider>
            {loading && <Preloader onComplete={() => setLoading(false)} />}
            <Navbar />
            <SmoothScroll>
              <div className="bg-ivory min-h-screen text-charcoal">
                <Outlet />
                <Footer id="contact" />
                <WhatsAppButton />
              </div>
            </SmoothScroll>
          </ProductProvider>
        </CartProvider>
      </CurrencyProvider>
    </WishlistProvider>
  );
};

// Layout for Admin (Standalone)
const AdminLayout = () => {
  return <Outlet />;
};

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Routes>
      {/* Admin Section */}
      <Route path="/admin/*">
        <Route index element={<AdminLogin />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      {/* Storefront Section */}
      <Route element={<StoreLayout loading={loading} setLoading={setLoading} />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:categorySlug" element={<CategoryPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/store-locator" element={<StoreLocator />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/fabric-glossary" element={<FabricGlossary />} />
        <Route path="/feedback-survey" element={<FeedbackSurvey />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
