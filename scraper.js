import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

const URL = 'https://www.alkaramstudio.com/collections/new-in-women';

async function scrapeProducts() {
  try {
    console.log('Fetching products from Alkaram Studio...');
    const response = await axios.get(URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const products = [];

    // Try to find products - Shopify typically uses specific classes
    $('.product-item, .product-card, [data-product-card], .grid__item').each((index, element) => {
      const $el = $(element);
      
      // Extract product name
      const name = $el.find('.product-item__title, .product-title, .card__heading, h3, h2').first().text().trim();
      
      // Extract price
      const price = $el.find('.price, .product-price, .card__price, .money').first().text().trim();
      
      // Extract image URL
      const image = $el.find('img').first().attr('src') || $el.find('img').first().attr('data-src');
      
      // Extract product link
      const link = $el.find('a').first().attr('href');
      
      // Extract badge/sale info
      const badge = $el.find('.badge, .sale-badge, .tag').first().text().trim();

      if (name && image) {
        products.push({
          id: index + 1,
          name: name,
          category: 'Women',
          price: price || 'PKR 0',
          image: image.startsWith('http') ? image : `https:${image}`,
          link: link ? `https://www.alkaramstudio.com${link}` : URL,
          badge: badge || null
        });
      }
    });

    // If no products found with the above selectors, try alternative approach
    if (products.length === 0) {
      console.log('Trying alternative selectors...');
      $('img').each((index, element) => {
        const $el = $(element);
        const src = $el.attr('src') || $el.attr('data-src');
        const alt = $el.attr('alt');
        
        if (src && alt && src.includes('products')) {
          products.push({
            id: index + 1,
            name: alt,
            category: 'Women',
            price: 'PKR 0',
            image: src.startsWith('http') ? src : `https:${src}`,
            link: URL,
            badge: null
          });
        }
      });
    }

    console.log(`Found ${products.length} products`);
    
    // Save to JSON file
    fs.writeFileSync('./products.json', JSON.stringify(products, null, 2));
    console.log('Products saved to products.json');
    
    return products;
  } catch (error) {
    console.error('Error scraping products:', error.message);
    return [];
  }
}

scrapeProducts();
