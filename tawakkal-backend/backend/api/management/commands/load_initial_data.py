import json
import os
from django.core.management.base import BaseCommand
from api.models import Product, StoreSettings

from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Loads initial data into the database'

    def handle(self, *args, **kwargs):
        # Create superuser
        if not User.objects.filter(username='admin@tawakkal.com').exists():
            User.objects.create_superuser('admin@tawakkal.com', 'admin@tawakkal.com', 'admin123')
            self.stdout.write(self.style.SUCCESS('Successfully created superuser'))

        # Load products
        products_file = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))), 'products.json')
        try:
            with open(products_file, 'r', encoding='utf-8') as f:
                products = json.load(f)
                for i, p in enumerate(products):
                    cat = p.get('category', 'Ready to Wear')
                    if cat == 'Women':
                        cat = 'Ready to Wear' if i % 3 == 0 else 'Unstitched' if i % 3 == 1 else 'Luxe Edition'
                    
                    price = p.get('price', 'PKR 4,500')
                    if price == 'PKR 0':
                        price = 'PKR 4,500'
                        
                    Product.objects.get_or_create(
                        name=p.get('name', f'Product {i}'),
                        defaults={
                            'category': cat,
                            'price': price,
                            'image': p.get('image', ''),
                            'badge': p.get('badge', ''),
                            'stock': 50,
                            'active': True
                        }
                    )
            self.stdout.write(self.style.SUCCESS('Successfully loaded products'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error loading products: {e}'))

        # Load settings
        StoreSettings.objects.get_or_create(id=1)
        self.stdout.write(self.style.SUCCESS('Successfully loaded store settings'))
