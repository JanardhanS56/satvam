import json
import os

with open('src/data/products.json', encoding='utf-8') as f:
    data = json.load(f)

print('--- PRODUCT IMAGES STATUS ---')
found = []
missing = []

found_count = 0
missing_count = 0

for i, p in enumerate(data['products'], 1):
    img_rel = p.get('image', '')
    disk_path = img_rel.replace('references/', 'References/')
    hero = p.get('hero', False)
    exists = os.path.exists(disk_path)
    if exists:
        found_count += 1
        status = '[FOUND]  '
    else:
        missing_count += 1
        status = '[MISSING]'
    print(f'{i:2d}. {status} {p["name"]:<15} ({p["slug"]:<15}) hero={hero} -> {img_rel}')

print(f'\nTotal Found: {found_count} / {len(data["products"])}')
print(f'Total Missing: {missing_count} / {len(data["products"])}')

