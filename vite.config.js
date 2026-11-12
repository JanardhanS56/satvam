import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

function referencesPlugin() {
  return {
    name: 'serve-references',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawUrl = (req.url || '').split('?')[0];
        const decodedUrl = decodeURIComponent(rawUrl);
        if (decodedUrl.startsWith('/references/') || decodedUrl.startsWith('/References/')) {
          const relPath = decodedUrl.replace(/^\/(references|References)\//, '');
          const p1 = path.resolve('References', relPath);
          const p2 = path.resolve('references', relPath);
          const target = fs.existsSync(p1) ? p1 : (fs.existsSync(p2) ? p2 : null);
          if (target && fs.statSync(target).isFile()) {
            return fs.createReadStream(target).pipe(res);
          }
        }
        next();
      });
    },
    closeBundle() {
      const srcDir = fs.existsSync('References') ? 'References' : (fs.existsSync('references') ? 'references' : null);
      if (srcDir) {
        const outDir = path.resolve('dist/references');
        fs.cpSync(srcDir, outDir, { recursive: true });
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), referencesPlugin()],
  server: { port: 5173 },
  build: { target: 'es2020', sourcemap: false }
});
