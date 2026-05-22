const fs = require('fs');

const data = fs.readFileSync('page.html', 'utf-8');

// Regex to find article items
const articleRegex = /<article class="wpr-grid-item[^>]+>([\s\S]*?)<\/article>/g;

let match;
const products = [];

while ((match = articleRegex.exec(data)) !== null) {
  const articleHtml = match[1];
  
  // Extract image
  const imgMatch = articleHtml.match(/<img decoding="async" src="([^"]+)"/);
  const image = imgMatch ? imgMatch[1] : null;
  
  // Extract title
  const titleMatch = articleHtml.match(/<a[^>]+>([^<]+)<\/a><\/div><\/h2>/);
  const title = titleMatch ? titleMatch[1] : null;
  
  // Extract price (get the last occurrence which is usually the current price, not the deleted price)
  const priceMatches = [...articleHtml.matchAll(/<span class="woocommerce-Price-amount amount">([\d,.]+)<span class="woocommerce-Price-currencySymbol">/g)];
  const price = priceMatches.length > 0 ? priceMatches[priceMatches.length - 1][1] : null;
  
  if (title && image) {
    products.push({
      id: products.length + 1,
      name: title.trim(),
      price: price ? price : '0.00',
      image: image,
      category: 'Luxury Collection' // Placeholder
    });
  }
}

// deduplicate
const uniqueProducts = Array.from(new Map(products.map(item => [item.name, item])).values());

console.log(JSON.stringify(uniqueProducts, null, 2));
