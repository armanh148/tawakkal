import React, { createContext, useState, useContext, useEffect } from 'react';

const CurrencyContext = createContext();

const currencies = {
  PK: { code: 'PKR', symbol: 'Rs.', rate: 1, name: 'Pakistan' },
  AE: { code: 'AED', symbol: 'د.إ', rate: 0.013, name: 'UAE' },
  US: { code: 'USD', symbol: '$', rate: 0.0036, name: 'USA' },
  GB: { code: 'GBP', symbol: '£', rate: 0.0028, name: 'UK' }
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('site_currency');
    return saved ? JSON.parse(saved) : currencies.PK;
  });

  useEffect(() => {
    localStorage.setItem('site_currency', JSON.stringify(currency));
  }, [currency]);

  const formatPrice = (price) => {
    // Parse price if it's a string (e.g. "Rs. 5,000")
    let numericPrice = price;
    if (typeof price === 'string') {
      numericPrice = parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
    }

    const converted = (numericPrice * currency.rate).toFixed(2);
    // Remove decimal if it's .00 for PKR
    if (currency.code === 'PKR') {
      return `${currency.symbol} ${Math.round(numericPrice * currency.rate).toLocaleString()}`;
    }
    return `${currency.symbol} ${parseFloat(converted).toLocaleString()}`;
  };

  const changeCurrency = (countryCode) => {
    if (currencies[countryCode]) {
      setCurrency(currencies[countryCode]);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency, formatPrice, currencies }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
