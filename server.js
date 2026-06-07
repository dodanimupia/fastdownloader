import { createBackendApp, ensureDownloadsDir } from './backend-app.js';

const app = createBackendApp();
const port = Number(process.env.PORT || 8787);

app.listen(port, async () => {
  await ensureDownloadsDir();
  console.log(`FastDownloader backend listo en http://127.0.0.1:${port}`);
});
