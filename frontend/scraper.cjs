const https = require('https');

function scrapeAlkaramProducts() {
  const url = 'https://www.alkaramstudio.com/collections/new-in-women';
  
  https.get(url, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      // Extract product data from HTML
      // Look for product cards, titles, prices, images
      const products = [];
      
      // Try to find product data in JSON-LD or script tags
      const jsonLdMatch = data.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
      
      if (jsonLdMatch) {
        jsonLdMatch.forEach(match => {
          try {
            const jsonStr = match.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
            const jsonData = JSON.parse(jsonStr);
            
            if (jsonData['@type'] === 'ItemList' && jsonData.itemListElement) {
              jsonData.itemListElement.forEach(item => {
                if (item.item) {
                  products.push({
                    name: item.item.name,
                    price: item.item.offers?.price || 'N/A',
                    image: item.item.image,
                    url: item.item.url
                  });
                }
              });
            }
          } catch (e) {
            // Skip invalid JSON
          }
        });
      }
      
      // If no JSON-LD found, try to extract from HTML patterns
      if (products.length === 0) {
        // Look for product card patterns
        const productCardMatches = data.match(/class="[^"]*product[^"]*"[^>]*>([\s\S]*?)<\/div>/g);
        
        if (productCardMatches) {
          productCardMatches.forEach((card, index) => {
            const titleMatch = card.match(/<h3[^>]*>([^<]+)<\/h3>/) || card.match(/class="[^"]*title[^"]*"[^>]*>([^<]+)</);
            const priceMatch = card.match(/class="[^"]*price[^"]*"[^>]*>([^<]+)</) || card.match(/PKR\s*[\d,]+/);
            const imageMatch = card.match(/src="([^"]*\.(jpg|jpeg|png|webp))"/) || card.match(/data-src="([^"]*)"/);
            
            if (titleMatch || priceMatch || imageMatch) {
              products.push({
                id: index + 1,
                name: titleMatch ? titleMatch[1].trim() : `Product ${index + 1}`,
                price: priceMatch ? priceMatch[0] : 'PKR 0',
                image: imageMatch ? imageMatch[1] : '',
                category: 'Women',
                badge: 'New'
              });
            }
          });
        }
      }
      
      console.log(JSON.stringify(products, null, 2));
    });
  }).on('error', (err) => {
    console.error('Error:', err.message);
  });
}

scrapeAlkaramProducts();
