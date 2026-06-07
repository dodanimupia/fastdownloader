import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createBackendApp, ensureDownloadsDir } from './backend-app.js';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'fastdownloader-api',
      configureServer(server) {
        const apiApp = createBackendApp();
        ensureDownloadsDir();
        server.middlewares.use(apiApp);
      },
    },
  ],
});
