import os
import shutil

backend_dir = r"c:\Users\Arman\Desktop\Tawakkal\bin-libaas-backend\backend"
public_dir = r"c:\Users\Arman\Desktop\Tawakkal\public"
media_products_dir = os.path.join(backend_dir, 'media', 'products')

os.makedirs(media_products_dir, exist_ok=True)

files_to_copy = {
    'ready to wear.webp': 'ready_to_wear.webp',
    'unstitched.jpg': 'unstitched.jpg',
    'accessories.jpg': 'accessories.jpg',
    'Luxe edition.webp': 'luxe_edition.webp'
}

for src_name, dst_name in files_to_copy.items():
    src = os.path.join(public_dir, src_name)
    dst = os.path.join(media_products_dir, dst_name)
    print(f"Copying {src} to {dst}")
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print("Copied successfully.")
    else:
        print("Source file not found!")
