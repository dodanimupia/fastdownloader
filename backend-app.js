import cors from 'cors';
import express from 'express';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, spawnSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const downloadsDir = path.join(__dirname, 'downloads');
const pythonBin = path.join(__dirname, '.venv', 'bin', 'python');
const certifiPath = spawnSync(
  pythonBin,
  ['-c', 'import certifi; print(certifi.where())'],
  { cwd: __dirname, encoding: 'utf8' },
).stdout.trim();

const allowedDomains = [
  'youtube.com',
  'youtu.be',
  'tiktok.com',
  'instagram.com',
  'facebook.com',
  'fb.watch',
  'vimeo.com',
  'x.com',
  'twitter.com',
];

function validateUrl(rawUrl) {
  let parsedUrl;

  try {
    parsedUrl = new URL(rawUrl);
  } catch {
    throw new Error('La URL no es valida.');
  }

  const hostname = parsedUrl.hostname.toLowerCase();
  const isAllowed = allowedDomains.some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
  );

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    throw new Error('Solo se permiten enlaces publicos con http o https.');
  }

  if (parsedUrl.username || parsedUrl.password) {
    throw new Error('No se permiten URLs con credenciales embebidas.');
  }

  if (!isAllowed) {
    throw new Error('Solo se aceptan enlaces publicos de YouTube, TikTok, Instagram, Facebook, Vimeo y X.');
  }

  return parsedUrl.toString();
}

function runYtDlp(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(pythonBin, ['-m', 'yt_dlp', ...args], {
      cwd: __dirname,
      env: {
        ...process.env,
        PYTHONUNBUFFERED: '1',
        SSL_CERT_FILE: certifiPath || process.env.SSL_CERT_FILE,
      },
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', (error) => {
      reject(error);
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }

      if (/ffmpeg|ffprobe/i.test(stderr)) {
        reject(new Error('La conversion solicitada necesita ffmpeg instalado en el sistema.'));
        return;
      }

      reject(new Error(stderr.trim() || 'yt-dlp no pudo completar la operacion.'));
    });
  });
}

function getQualityOptions(info) {
  const heights = new Set(
    (info.formats || [])
      .map((format) => format.height)
      .filter((height) => Number.isFinite(height)),
  );

  const qualities = [];

  if ([...heights].some((height) => height >= 720)) {
    qualities.push('720p');
  }

  if ([...heights].some((height) => height >= 1080)) {
    qualities.push('1080p');
  }

  if (qualities.length === 0) {
    qualities.push('Mejor disponible');
  }

  qualities.push('Audio MP3');

  return qualities;
}

function mapQualityToArgs(quality) {
  switch (quality) {
    case '720p':
      return ['-f', 'bestvideo[height<=720]+bestaudio/best[height<=720]/best'];
    case '1080p':
      return ['-f', 'bestvideo[height<=1080]+bestaudio/best[height<=1080]/best'];
    case 'Audio MP3':
      return ['-x', '--audio-format', 'mp3'];
    default:
      return ['-f', 'best'];
  }
}

async function downloadToFile(url, quality) {
  await fs.mkdir(downloadsDir, { recursive: true });

  const outputTemplate = path.join(downloadsDir, '%(title).120B [%(id)s].%(ext)s');
  const { stdout } = await runYtDlp([
    '--no-playlist',
    '--no-warnings',
    '--restrict-filenames',
    '--print',
    'after_move:filepath',
    ...mapQualityToArgs(quality),
    '-o',
    outputTemplate,
    url,
  ]);

  const savedPath = stdout
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .at(-1);

  if (!savedPath) {
    throw new Error('La descarga termino sin devolver una ruta final.');
  }

  const fileName = path.basename(savedPath);
  return { savedPath, fileName };
}

export function createBackendApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: '32kb' }));

  app.get('/api/health', async (_request, response) => {
    try {
      await fs.access(pythonBin);
      response.json({ ok: true });
    } catch {
      response.status(500).json({ ok: false, error: 'yt-dlp no esta disponible en .venv.' });
    }
  });

  app.post('/api/analyze', async (request, response) => {
    try {
      const url = validateUrl(request.body?.url || '');
      const { stdout } = await runYtDlp([
        '--dump-single-json',
        '--skip-download',
        '--no-playlist',
        '--no-warnings',
        url,
      ]);

      const info = JSON.parse(stdout);

      response.json({
        title: info.title,
        platform: info.extractor_key || info.extractor || 'Compatible',
        uploader: info.uploader || info.channel || 'Fuente publica',
        duration: info.duration || null,
        thumbnail: info.thumbnail || null,
        qualities: getQualityOptions(info),
      });
    } catch (error) {
      response.status(400).json({ error: error.message || 'No se pudo analizar el enlace.' });
    }
  });

  app.post('/api/download', async (request, response) => {
    try {
      const url = validateUrl(request.body?.url || '');
      const quality = request.body?.quality || 'Mejor disponible';
      const { savedPath, fileName } = await downloadToFile(url, quality);

      response.json({
        fileName,
        savedPath,
        downloadUrl: `/api/files/${encodeURIComponent(fileName)}`,
      });
    } catch (error) {
      response.status(400).json({ error: error.message || 'No se pudo descargar el archivo.' });
    }
  });

  app.post('/api/download-file', async (request, response) => {
    try {
      const url = validateUrl(request.body?.url || '');
      const quality = request.body?.quality || 'Mejor disponible';
      const { savedPath, fileName } = await downloadToFile(url, quality);

      response.download(savedPath, fileName);
    } catch (error) {
      response.status(400).json({ error: error.message || 'No se pudo descargar el archivo.' });
    }
  });

  app.get('/api/files/:fileName', async (request, response) => {
    const fileName = path.basename(request.params.fileName);
    const filePath = path.join(downloadsDir, fileName);

    try {
      await fs.access(filePath);
      response.download(filePath, fileName);
    } catch {
      response.status(404).json({ error: 'Archivo no encontrado.' });
    }
  });

  return app;
}

export async function ensureDownloadsDir() {
  await fs.mkdir(downloadsDir, { recursive: true });
}
