import json
import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter

def create_flatlays():
    with open('src/data/products.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    products = data.get('products', [])

    font_dir = os.path.join(os.environ.get('WINDIR', 'C:\\Windows'), 'Fonts')
    georgia_path = os.path.join(font_dir, 'georgia.ttf')
    georgiab_path = os.path.join(font_dir, 'georgiab.ttf')
    arial_path = os.path.join(font_dir, 'arial.ttf')

    try:
        font_serif = ImageFont.truetype(georgiab_path, 26)
        font_serif_lg = ImageFont.truetype(georgiab_path, 30)
        font_sans = ImageFont.truetype(arial_path, 16)
        font_micro = ImageFont.truetype(arial_path, 13)
    except Exception:
        font_serif = ImageFont.load_default()
        font_serif_lg = ImageFont.load_default()
        font_sans = ImageFont.load_default()
        font_micro = ImageFont.load_default()

    img_seed = Image.open('References/journey/journey-01-seed.webp').convert('RGBA')
    img_harvest = Image.open('References/journey/journey-03-harvest.webp').convert('RGBA')
    img_extract = Image.open('References/journey/journey-04-extract.webp').convert('RGBA')

    os.makedirs('References/products', exist_ok=True)

    for p in products:
        name = p.get('name', 'Botanical')
        slug = p.get('slug', '')
        dosha = p.get('dosha', 'tridoshic').lower()
        ing_list = [i.get('name', '') for i in p.get('ingredients', [])][:3]
        ing_str = ' · '.join(ing_list) if ing_list else 'Ayurvedic Botanicals'
        ing_img_path = p.get('ingredientsImage', f'references/products/{slug}-ingredients.webp')
        out_filename = os.path.basename(ing_img_path)

        # Choose base texture
        if any(w in slug for w in ['seed', 'tiladi', 'rasayana', 'triphala', 'arjunadi']):
            base = img_seed.copy()
            tint_color = (210, 180, 140, 40) # warm amber
        elif any(w in slug for w in ['kumkumadi', 'pushpa', 'japa', 'keshkanti']):
            base = img_extract.copy()
            tint_color = (220, 120, 100, 45) # rose / saffron ruby
        else:
            base = img_harvest.copy()
            tint_color = (45, 90, 50, 40) # deep forest green

        # Center-crop 800x800
        w, h = base.size
        dim = min(w, h)
        left = (w - dim) // 2
        top = (h - dim) // 2
        base = base.crop((left, top, left + dim, top + dim)).resize((800, 800), Image.Resampling.LANCZOS)

        # Apply tint overlay
        overlay = Image.new('RGBA', (800, 800), tint_color)
        base = Image.alpha_composite(base, overlay)

        # Create overlay layer for borders & badge
        draw_layer = Image.new('RGBA', (800, 800), (0, 0, 0, 0))
        draw = ImageDraw.Draw(draw_layer)

        # Draw outer gold frame
        gold_color = (232, 180, 74, 180) # #E8B44A
        dark_gold = (107, 91, 69, 140)
        draw.rectangle([24, 24, 776, 776], outline=gold_color, width=2)
        draw.rectangle([32, 32, 768, 768], outline=dark_gold, width=1)

        # Corner gold diamonds
        corners = [(24, 24), (776, 24), (24, 776), (776, 776)]
        for cx, cy in corners:
            draw.polygon([(cx, cy - 6), (cx + 6, cy), (cx, cy + 6), (cx - 6, cy)], fill=(232, 180, 74, 220))

        # Bottom Vellum Card
        card_box = [60, 540, 740, 730]
        card_bg = (245, 239, 227, 240) # #F5EFE3 vellum
        draw.rounded_rectangle(card_box, radius=16, fill=card_bg, outline=(232, 180, 74, 160), width=2)

        # Text inside card
        # 1. Micro header
        header_text = "WHOLE AYURVEDIC BOTANICAL HARVEST"
        draw.text((400, 565), header_text, fill=(107, 91, 69, 230), font=font_micro, anchor="mm")

        # 2. Key ingredients (bold serif)
        draw.text((400, 608), ing_str.upper(), fill=(45, 62, 47, 255), font=font_serif, anchor="mm")

        # 3. Subtitle / Product name & dosha
        sub_text = f"Formulation for {name} · {dosha.upper()} BALANCING"
        draw.text((400, 655), sub_text, fill=(107, 91, 69, 210), font=font_sans, anchor="mm")

        # 4. Certification badge line
        badge_text = "✦ 100% SOURCED BOTANICALS · SUN-DRIED & COLD-PRESSED ✦"
        draw.text((400, 695), badge_text, fill=(232, 180, 74, 240), font=font_micro, anchor="mm")

        # Composite and save
        final_img = Image.alpha_composite(base, draw_layer).convert('RGB')
        
        target_path = os.path.join('References', 'products', out_filename)
        final_img.save(target_path, 'WEBP', quality=85)
        print(f"Generated {target_path}")

        # Also write standard slug version if different
        slug_target = os.path.join('References', 'products', f"{slug}-ingredients.webp")
        if slug_target != target_path:
            final_img.save(slug_target, 'WEBP', quality=85)
            print(f"Generated alias {slug_target}")

if __name__ == '__main__':
    create_flatlays()

