import os
import random
from api.models import Product

names = ["Velvet Dream", "Golden Aura", "Sapphire Elegance", "Ruby Charm", "Emerald Glint", "Midnight Charm", "Royal Silk", "Pearl Drop", "Diamond Spark", "Onyx Style", "Silver Thread", "Opal Shine", "Crystal Clear", "Amethyst Grace", "Topaz Vibe", "Quartz Finish"]
categories = ['Ready to Wear', 'Unstitched', 'Luxe Edition', 'Embroidered', 'Accessories', 'Jewelry']
images = ['products/ready_to_wear.webp', 'products/unstitched.jpg', 'products/accessories.jpg', 'products/luxe_edition.webp']
badges = ['New', 'Hot', 'Sale', 'Premium', '', '', '']
sizes_list = [['S', 'M', 'L'], ['Unstitched'], ['One Size'], ['M', 'L', 'XL']]
colors_list = [['#000000', '#1a1a1a'], ['#FFD700', '#FFA500'], ['#FFF'], ['#0f52ba', '#000080']]

added = 0
for i in range(16):
    name = f"{random.choice(names)} {random.choice(['Suit', 'Dress', 'Set', 'Collection'])}"
    category = random.choice(categories)
    price = str(random.randint(15, 150) * 100)
    badge = random.choice(badges)
    stock = random.randint(5, 50)
    sizes = random.choice(sizes_list)
    colors = random.choice(colors_list)
    img = random.choice(images)
    
    obj = Product.objects.create(
        name=name,
        category=category,
        price=price,
        badge=badge,
        stock=stock,
        sizes=sizes,
        colors=colors,
        active=True
    )
    obj.image.name = img
    obj.save()
    added += 1

print(f"Added {added} more dummy products.")
