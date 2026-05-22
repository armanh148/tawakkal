import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        const updated = prev.filter(item => item.id !== product.id);
        localStorage.setItem('wishlist', JSON.stringify(updated));
        return updated;
      }
      const updated = [...prev, product];
      localStorage.setItem('wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  const isInWishlist = (id) => {
    return wishlistItems.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
