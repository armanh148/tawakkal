import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('cartItems');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Failed to parse cart items from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1, selectedSize, selectedColor) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (item) =>
                    item.id === product.id &&
                    item.selectedSize === selectedSize &&
                    item.selectedColor.name === selectedColor.name
            );

            if (existingItemIndex > -1) {
                return prevItems.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity, selectedSize, selectedColor }];
            }
        });
    };

    const removeFromCart = (productId, selectedSize, selectedColorName) => {
        setCartItems((prevItems) =>
            prevItems.filter(
                (item) =>
                    !(item.id === productId &&
                        item.selectedSize === selectedSize &&
                        item.selectedColor.name === selectedColorName)
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};