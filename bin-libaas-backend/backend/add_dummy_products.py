import os
from api.models import Product
import shutil

media_dir = os.path.join(os.path.dirname(__file__), 'media', 'products')
os.makedirs(media_dir, exist_ok=True)

public_dir = r"c:\Users\Arman\Desktop\Tawakkal\public"

products_data = [
    {
        'name': 'Midnight Velvet Suit',
        'category': 'Ready to Wear',
        'price': '8500',
        'badge': 'New',
        'stock': 15,
        'sizes': ['S', 'M', 'L'],
        'colors': ['#000000', '#1a1a1a'],
        'source_img': 'ready to wear.webp',
        'dest_img': 'products/ready_to_wear.webp'
    },
    {
        'name': 'Golden Glow Unstitched',
        'category': 'Unstitched',
        'price': '4500',
        'badge': 'Hot',
        'stock': 25,
        'sizes': ['Unstitched'],
        'colors': ['#FFD700', '#FFA500'],
        'source_img': 'unstitched.jpg',
        'dest_img': 'products/unstitched.jpg'
    },
    {
        'name': 'Royal Pearl Necklace',
        'category': 'Jewelry',
        'price': '2500',
        'badge': 'Sale',
        'stock': 5,
        'sizes': ['One Size'],
        'colors': ['#FFF'],
        'source_img': 'accessories.jpg',
        'dest_img': 'products/accessories.jpg'
    },
    {
        'name': 'Sapphire Luxe Chiffon',
        'category': 'Luxe Edition',
        'price': '12500',
        'badge': 'Premium',
        'stock': 8,
        'sizes': ['M', 'L', 'XL'],
        'colors': ['#0f52ba', '#000080'],
        'source_img': 'Luxe edition.webp',
        'dest_img': 'products/luxe_edition.webp'
    }
]

for p in products_data:
    # copy file
    src = os.path.join(public_dir, p['source_img'])
    dst = os.path.join(os.path.dirname(__file__), 'media', p['dest_img'])
    if os.path.exists(src):
        shutil.copy2(src, dst)
        
    obj = Product.objects.create(
        name=p['name'],
        category=p['category'],
        price=p['price'],
        badge=p['badge'],
        stock=p['stock'],
        sizes=p['sizes'],
        colors=p['colors'],
        active=True
    )
    if os.path.exists(src):
        obj.image.name = p['dest_img']
    obj.save()

print(f"Added {len(products_data)} dummy products.")
