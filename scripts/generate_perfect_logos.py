import numpy as np
from PIL import Image
import os
import base64

def process():
    src_path = 'References/logo/satvam logo.png'
    im = Image.open(src_path).convert('RGB')
    arr = np.array(im).astype(float)
    
    # Ivory background reference
    bg = np.array([254.0, 247.0, 237.0])
    
    # Distance from background
    diff = np.sqrt(np.sum((arr - bg)**2, axis=2))
    
    # Smooth alpha mask
    # Background texture threshold: 10
    # Clean dark line threshold: 55
    alpha = np.clip((diff - 10.0) / (55.0 - 10.0), 0.0, 1.0)
    alpha = np.power(alpha, 1.15) * 255.0
    
    # Deepen ink for bold clarity
    fg = arr.copy()
    # Darken strokes slightly so they contrast sharply on light backgrounds
    dark_mask = alpha > 80
    fg[dark_mask] = fg[dark_mask] * 0.90
    
    rgba = np.zeros((arr.shape[0], arr.shape[1], 4), dtype=np.uint8)
    rgba[:, :, :3] = np.clip(fg, 0, 255).astype(np.uint8)
    rgba[:, :, 3] = alpha.astype(np.uint8)
    
    # -------------------------------------------------------------
    # 1. Perfectly Centered Circular Logo Mark
    # Center of emblem: (976, 717)
    # -------------------------------------------------------------
    cx, cy = 976, 717
    half_size = 452 # 904x904 square
    x0, x1 = cx - half_size, cx + half_size
    y0, y1 = cy - half_size, cy + half_size
    mark_rgba = rgba[y0:y1, x0:x1]
    
    img_mark = Image.fromarray(mark_rgba)
    mark_png = 'References/logo/logo-mark.png'
    mark_webp = 'References/logo/logo-mark.webp'
    img_mark.save(mark_png, 'PNG')
    img_mark.save(mark_webp, 'WEBP', quality=95)
    
    # SVG wrapper for mark
    with open(mark_webp, 'rb') as f:
        b64_mark = base64.b64encode(f.read()).decode('utf-8')
    svg_mark = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {img_mark.width} {img_mark.height}" width="{img_mark.width}" height="{img_mark.height}">
  <image href="data:image/webp;base64,{b64_mark}" width="{img_mark.width}" height="{img_mark.height}"/>
</svg>'''
    with open('References/logo/logo-mark.svg', 'w', encoding='utf-8') as f:
        f.write(svg_mark)
        
    print(f'Logo Mark generated: {img_mark.size}, bbox: {img_mark.getbbox()}')
    
    # -------------------------------------------------------------
    # 2. Perfectly Centered Full Lockup Logo
    # Bounding box y: 275..1788, x: 378..1496 (width: 1118, height: 1513)
    # -------------------------------------------------------------
    y_min, y_max = 275, 1788
    x_min, x_max = 378, 1496
    logo_rgba = rgba[y_min:y_max, x_min:x_max]
    
    img_logo = Image.fromarray(logo_rgba)
    logo_png = 'References/logo/logo.png'
    logo_webp = 'References/logo/logo.webp'
    img_logo.save(logo_png, 'PNG')
    img_logo.save(logo_webp, 'WEBP', quality=95)
    
    # SVG wrapper for full logo
    with open(logo_webp, 'rb') as f:
        b64_logo = base64.b64encode(f.read()).decode('utf-8')
    svg_logo = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {img_logo.width} {img_logo.height}" width="{img_logo.width}" height="{img_logo.height}">
  <image href="data:image/webp;base64,{b64_logo}" width="{img_logo.width}" height="{img_logo.height}"/>
</svg>'''
    with open('References/logo/logo.svg', 'w', encoding='utf-8') as f:
        f.write(svg_logo)
        
    print(f'Full Logo generated: {img_logo.size}, bbox: {img_logo.getbbox()}')

    # Sync to dist/references/logo if exists
    dist_logo_dir = 'dist/references/logo'
    if os.path.exists(dist_logo_dir):
        img_mark.save(os.path.join(dist_logo_dir, 'logo-mark.webp'), 'WEBP', quality=95)
        img_logo.save(os.path.join(dist_logo_dir, 'logo.webp'), 'WEBP', quality=95)
        print('Copied to dist/references/logo')

if __name__ == '__main__':
    process()

