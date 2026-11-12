import json
import os

with open('src/data/products.json', encoding='utf-8') as f:
    data = json.load(f)

print('--- PRODUCT IMAGES STATUS ---')
found = []
missing = []

for i, p in enumerate(data['products'], 1):
    img_rel = p.get('image', '')
    disk_path = img_rel.replace('references/', 'References/')
    if os.path.exists(disk_path):
        found.append((p['name'], p['slug'], img_rel))
        print(f'{i:2d}. [FOUND]   {p["name"]:<15} ({p["slug"]}) -> {img_rel}')
    else:
        missing.append((p['name'], p['slug'], img_rel))
        print(f'{i:2d}. [MISSING] {p["name"]:<15} ({p["slug"]}) -> {img_rel}')

print(f'\nTotal Found: {len(found)} / {len(data["products"])}')
print(f'Total Missing: {len(missing)} / {len(data["products"])}')
