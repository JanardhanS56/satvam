import os
import shutil
from PIL import Image, ImageDraw
import numpy as np

def process_all_icons():
    folder = 'References/icons/product_composition'
    bg = np.array([254.0, 248.0, 236.0])
    
    files = [f for f in os.listdir(folder) if f.endswith('.png') and not f.startswith('test_') and 'set' not in f]
    print(f'Processing {len(files)} ingredient icons in {folder}...')
    
    for f in sorted(files):
        p = os.path.join(folder, f)
        im = Image.open(p).convert('RGB')
        arr = np.array(im).astype(float)
        w, h = im.size
        
        diff = np.sqrt(np.sum((arr - bg)**2, axis=2))
        fg = diff > 30
        coords = np.argwhere(fg)
        
        if len(coords) == 0:
            continue
            
        y_min, x_min = coords.min(axis=0)
        y_max, x_max = coords.max(axis=0)
        
        cx = int(round((x_min + x_max) / 2.0))
        cy = int(round((y_min + y_max) / 2.0))
        r = int(round(max((x_max - x_min) / 2.0, (y_max - y_min) / 2.0))) + 1
        
        # Crop square centered at (cx, cy)
        box = (cx - r, cy - r, cx + r, cy + r)
        cropped = Image.new('RGB', (2 * r, 2 * r), tuple(bg.astype(int)))
        
        # Calculate overlap
        src_x0 = max(0, box[0])
        src_y0 = max(0, box[1])
        src_x1 = min(w, box[2])
        src_y1 = min(h, box[3])
        
        dst_x0 = src_x0 - box[0]
        dst_y0 = src_y0 - box[1]
        
        if src_x1 > src_x0 and src_y1 > src_y0:
            region = im.crop((src_x0, src_y0, src_x1, src_y1))
            cropped.paste(region, (dst_x0, dst_y0))
            
        # Create 4x anti-aliased circular alpha mask
        target_size = 400
        scale = 4
        mask_size = target_size * scale
        mask = Image.new('L', (mask_size, mask_size), 0)
        draw = ImageDraw.Draw(mask)
        # Draw circle filling the mask
        draw.ellipse([2, 2, mask_size - 2, mask_size - 2], fill=255)
        mask = mask.resize((target_size, target_size), Image.Resampling.LANCZOS)
        
        # Resize cropped image to target size
        final_rgb = cropped.resize((target_size, target_size), Image.Resampling.LANCZOS)
        final_rgba = final_rgb.convert('RGBA')
        final_rgba.putalpha(mask)
        
        # Save PNG and WEBP
        out_png = os.path.join(folder, f)
        out_webp = os.path.join(folder, f.replace('.png', '.webp'))
        final_rgba.save(out_png, 'PNG')
        final_rgba.save(out_webp, 'WEBP', quality=95)
        
    # Create spelling aliases
    aliases = [
        ('bringaraj.png', 'bhringraj.png'),
        ('bringaraj.webp', 'bhringraj.webp'),
        ('capsaisin.png', 'capsaicin.png'),
        ('capsaisin.webp', 'capsaicin.webp'),
        ('aloe_vera.png', 'aloe.png'),
        ('aloe_vera.webp', 'aloe.webp'),
        ('black_seed.png', 'black-seed.png'),
        ('black_seed.webp', 'black-seed.webp'),
        ('tea_tree.png', 'tea-tree.png'),
        ('tea_tree.webp', 'tea-tree.webp'),
        ('vitamin_e.png', 'vitamin-e.png'),
        ('vitamin_e.webp', 'vitamin-e.webp'),
    ]
    for src, dst in aliases:
        s = os.path.join(folder, src)
        d = os.path.join(folder, dst)
        if os.path.exists(s):
            shutil.copyfile(s, d)
            
    print('Completed circular cropping and webp generation with aliases.')
    
    # Sync to dist/references/icons/product_composition
    dist_dir = 'dist/references/icons/product_composition'
    if os.path.exists('dist/references'):
        os.makedirs(dist_dir, exist_ok=True)
        for f in os.listdir(folder):
            if f.endswith('.png') or f.endswith('.webp'):
                shutil.copyfile(os.path.join(folder, f), os.path.join(dist_dir, f))
        print(f'Synced all icons to {dist_dir}')

if __name__ == '__main__':
    process_all_icons()
