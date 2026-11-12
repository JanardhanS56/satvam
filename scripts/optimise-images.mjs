

// Usage: node scripts/optimize-images.mjs
// Converts PNG/JPG in references/ to WEBP at 1600px max width. Skips existing WEBPs.
import sharp from 'sharp';
import { readdir, stat, mkdir } from 'node:fs/promises';
import { extname, join } from 'node:path';

const ROOT = 'references';
const MAX = 1600;

async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
        const p = join(dir, e.name);
        if (e.isDirectory()) { await walk(p); continue; }
        const ext = extname(e.name).toLowerCase();
        if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
        const out = p.replace(/\.(png|jpe?g)$/i, '.webp');
        try { await stat(out); console.log('skip', out); continue; } catch { }
        const before = (await stat(p)).size;
        await sharp(p).resize({ width: MAX, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out);
        const after = (await stat(out)).size;
        console.log(`✓ ${p} → ${out}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`);
    }
}

await walk(ROOT);
console.log('done');