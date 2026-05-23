import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductCtx = createContext();
export const useProducts = () => useContext(ProductCtx);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        
        // Ensure active products only for public store
        const activeProducts = data.filter(p => p.active);
        setProducts(activeProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductCtx.Provider value={{ products, loading, error }}>
      {children}
    </ProductCtx.Provider>
  );
};
