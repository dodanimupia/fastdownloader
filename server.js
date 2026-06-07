import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createBackendApp, ensureDownloadsDir } from './backend-app.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');
const app = createBackendApp();
const port = 8787;

app.use(express.static(distDir));

app.use((_request, response) => {
  response.sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, async () => {
  await ensureDownloadsDir();
  console.log(`FastDownloader listo en http://127.0.0.1:${port}`);
});
