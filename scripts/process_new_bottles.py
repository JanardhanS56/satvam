import os
import shutil
from PIL import Image

PRODUCTS_DIR = 'References/products'

CONVERSIONS = [
    {
        'src': 'Mahabhringraj.png',
        'targets': [
            'mahabhringraj-bottle.webp',
            'mahabhringraj.webp',
            'Mahabhringraj.webp'
        ]
    },
    {
        'src': 'Triphala.png',
        'targets': [
            'triphala-bottle.webp',
            'triphala.webp',
            'Triphala.webp'
        ]
    },
    {
        'src': 'Arjunadi.png',
        'targets': [
            'arjunadi-bottle.webp',
            'arjunadi.webp',
            'Arjunadi.webp'
        ]
    },
    {
        'src': 'Karanja.png',
        'targets': [
            'karanja-bottle.webp',
            'karanja.webp',
            'Karanja.webp'
        ]
    },
    {
        'src': 'Devadaru.png',
        'targets': [
            'devadaru-bottle.webp',
            'devadaru-men-bottle.webp',
            'devadaru.webp',
            'devadaru-men.webp',
            'Devadaru.webp'
        ]
    },
    {
        'src': 'Shubhra.png',
        'targets': [
            'shubhra-bottle.webp',
            'shubhra-kids-bottle.webp',
            'shubhra.webp',
            'shubhra-kids.webp',
            'Shubhra.webp'
        ]
    }
]

def main():
    print("Processing 6 pending product bottle images...")
    for item in CONVERSIONS:
        src_path = os.path.join(PRODUCTS_DIR, item['src'])
        if not os.path.exists(src_path):
            print(f"Error: {src_path} not found!")
            continue
        
        with Image.open(src_path) as im:
            # Convert RGBA to RGB with cream background if alpha present
            if im.mode == 'RGBA':
                # Check if alpha is used or fully opaque
                alpha = im.split()[-1]
                if alpha.getextrema() != (255, 255):
                    # Composite over cream luxury background
                    bg = Image.new('RGB', im.size, (250, 247, 240))
                    bg.paste(im, mask=alpha)
                    im_rgb = bg
                else:
                    im_rgb = im.convert('RGB')
            else:
                im_rgb = im.convert('RGB')
            
            # Resize to standard 1600x1600 using LANCZOS
            resized = im_rgb.resize((1600, 1600), Image.Resampling.LANCZOS)
            
            # Save to first target with high-quality webp
            primary_target = os.path.join(PRODUCTS_DIR, item['targets'][0])
            resized.save(primary_target, 'WEBP', quality=85, method=6)
            size_kb = os.path.getsize(primary_target) / 1024
            print(f"✓ Created {primary_target} ({size_kb:.1f} KB)")
            
            # Copy or save to all alias targets
            for target_name in item['targets'][1:]:
                alias_path = os.path.join(PRODUCTS_DIR, target_name)
                # On Windows NTFS, case differences might refer to same file
                if os.path.abspath(primary_target).lower() != os.path.abspath(alias_path).lower():
                    shutil.copy2(primary_target, alias_path)
                    print(f"  → Alias: {alias_path}")
                else:
                    print(f"  → Same NTFS path (case variant): {alias_path}")

if __name__ == '__main__':
    main()
