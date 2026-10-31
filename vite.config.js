import { defineConfig } from 'vite';

export default defineConfig({
  // Serve the public/ folder at root so images are accessible at /assets/images/...
  publicDir: 'public',
  server: {
    port: 3000,
    open: false,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  }
});
