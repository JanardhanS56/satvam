import base64
from PIL import Image

for name in ['logo', 'logo-mark']:
    with open(f'References/logo/{name}.webp', 'rb') as f:
        b64 = base64.b64encode(f.read()).decode('utf-8')
    im = Image.open(f'References/logo/{name}.webp')
    w, h = im.size
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">
  <image href="data:image/webp;base64,{b64}" width="{w}" height="{h}"/>
</svg>'''
    with open(f'References/logo/{name}.svg', 'w', encoding='utf-8') as f:
        f.write(svg)
    print(f'Created References/logo/{name}.svg ({w}x{h})')

