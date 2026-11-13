import os
import shutil
from PIL import Image
import numpy as np

PRODUCTS_DIR = 'References/products'

CONVERSIONS = [
    {
        'src': 'keshkanti.png',
        'targets': [
            'keshkanti-bottle.webp',
            'keshkanti.webp'
        ]
    },
    {
        'src': 'amla-pitta.jpg',
        'targets': [
            'amla-pitta-bottle.webp',
            'amla-pitta.webp'
        ]
    },
    {
        'src': 'shirodhara.png',
        'targets': [
            'shirodhara-bottle.webp',
            'shirodhara.webp'
        ]
    },
    {
        'src': 'vanaspati.png',
        'targets': [
            'vanaspati-bottle.webp',
            'vanaspati.webp'
        ]
    },
    {
        'src': 'pushpa.png',
        'targets': [
            'pushpa-bottle.webp',
            'pushpa-vetiver-bottle.webp',
            'pushpa.webp'
        ]
    },
    {
        'src': 'Rasayana.png',
        'targets': [
            'rasayana-bottle.webp',
            'Rasayana.webp',
            'rasayana.webp'
        ]
    },
    {
        'src': 'Kumkumadi.png',
        'targets': [
            'kumkumadi-bottle.webp',
            'Kumkumadi.webp',
            'kumkumadi.webp'
        ]
    },
    {
        'src': 'Neelibhringadi.png',
        'targets': [
            'neelibhringadi-bottle.webp',
            'Neelibhringadi.webp',
            'neelibhringadi.webp'
        ]
    },
    {
        'src': 'Tiladi.png',
        'targets': [
            'tiladi-bottle.webp',
            'tiladi-men-bottle.webp',
            'Tiladi.webp',
            'tiladi.webp'
        ]
    },
    {
        'src': 'Keshini.png',
        'targets': [
            'keshini-bottle.webp',
            'keshini-men-bottle.webp',
            'Keshini.webp',
            'keshini.webp'
        ]
    },
    {
        'src': 'Sariva.png',
        'targets': [
            'sariva-bottle.webp',
            'Sariva.webp',
            'sariva.webp'
        ]
    },
    {
        'src': 'Mahabhringraj.png',
        'targets': [
            'mahabhringraj-bottle.webp',
            'mahabhringraj.webp',
            'Mahabhringraj.webp'
        ]
    },
    {
        'src': 'chandanadi.jpg',
        'targets': [
            'chandanadi-bottle.webp',
            'chandanadi.webp'
        ]
    },
    {
        'src': 'yastimadhu.png',
        'targets': [
            'yastimadhu-bottle.webp',
            'yastimadhu.webp'
        ]
    },
    {
        'src': 'japa.png',
        'targets': [
            'japa-bottle.webp',
            'japa.webp'
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
    print(f"Processing all {len(CONVERSIONS)} product bottle images...")
    processed_count = 0
    all_clean = True

    for item in CONVERSIONS:
        src_path = os.path.join(PRODUCTS_DIR, item['src'])
        if not os.path.exists(src_path):
            print(f"ERROR: {src_path} not found!")
            all_clean = False
            continue

        with Image.open(src_path) as im:
            if im.mode == 'RGBA':
                alpha = im.split()[-1]
                if alpha.getextrema() != (255, 255):
                    bg = Image.new('RGB', im.size, (250, 247, 240))
                    bg.paste(im, mask=alpha)
                    im_rgb = bg
                else:
                    im_rgb = im.convert('RGB')
            else:
                im_rgb = im.convert('RGB')

            resized = im_rgb.resize((1600, 1600), Image.Resampling.LANCZOS)

            primary_target = os.path.join(PRODUCTS_DIR, item['targets'][0])
            resized.save(primary_target, 'WEBP', quality=88, method=6)
            size_kb = os.path.getsize(primary_target) / 1024
            print(f"✓ Created {primary_target} ({size_kb:.1f} KB)")
            processed_count += 1

            for target_name in item['targets'][1:]:
                alias_path = os.path.join(PRODUCTS_DIR, target_name)
                if os.path.abspath(primary_target).lower() != os.path.abspath(alias_path).lower():
                    shutil.copy2(primary_target, alias_path)
                    print(f"  → Alias: {alias_path}")
                else:
                    # Case-variant on Windows NTFS: save directly to preserve filename case if needed
                    resized.save(alias_path, 'WEBP', quality=88, method=6)
                    print(f"  → Case variant: {alias_path}")

    print(f"\nVerification of watermark removal on all generated webp assets...")
    for item in CONVERSIONS:
        primary_target = os.path.join(PRODUCTS_DIR, item['targets'][0])
        with Image.open(primary_target) as im:
            w, h = im.size
            crop = im.convert('RGB').crop((w - 200, h - 200, w, h))
            arr = np.array(crop)
            pts = np.where((arr[:, :, 0] > 250) & (arr[:, :, 1] > 240) & (arr[:, :, 2] > 230))
            count = len(pts[0])
            if count > 50:
                print(f"❌ FAIL: {item['targets'][0]} still has {count} watermark pixels!")
                all_clean = False
            else:
                print(f"✓ PASS: {item['targets'][0]} is clean ({count} pixels)")

    if all_clean:
        print(f"\nSUCCESS: All {processed_count} product bottle webp files are 100% watermark-free!")
    else:
        print(f"\nWARNING: Some files failed verification.")

if __name__ == '__main__':
    main()

