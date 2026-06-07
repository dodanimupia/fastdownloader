FROM node:20-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 python3-venv python3-pip ffmpeg ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm ci

COPY . .

RUN python3 -m venv .venv \
  && ./.venv/bin/pip install --no-cache-dir --upgrade pip \
  && ./.venv/bin/pip install --no-cache-dir yt-dlp certifi \
  && npm run build \
  && npm prune --omit=dev

ENV NODE_ENV=production
ENV PORT=8787

EXPOSE 8787

CMD ["npm", "run", "start"]
