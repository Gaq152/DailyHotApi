# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DailyHotApi is a Node.js API service that aggregates trending/hot content from 40+ Chinese websites and platforms (Bilibili, Weibo, Zhihu, Douyin, etc.). It provides both JSON and RSS output formats.

## Commands

```bash
# Development (with hot reload, no cache)
npm run dev

# Development (with cache)
npm run dev:cache

# Build TypeScript to JavaScript
npm run build

# Run production build
npm run start

# Lint
npm run lint

# Format code
npm run format

# PM2 deployment
sh ./deploy.sh
```

## Architecture

**Framework**: Hono (lightweight web framework) running on Node.js with `@hono/node-server`

**Entry Flow**:
- `src/index.ts` - Server bootstrap, exports `serveHotApi()` for npm package usage
- `src/app.tsx` - Hono app configuration (CORS, compression, static files, error handling)
- `src/registry.ts` - Auto-discovers and registers all route handlers from `src/routes/`

**Route Pattern**:
Each file in `src/routes/` exports a `handleRoute(c: ListContext, noCache: boolean)` function. Routes are auto-registered based on filename (e.g., `bilibili.ts` → `/bilibili`).

Route handlers must return `RouterData`:
```typescript
{
  name: string;        // route identifier
  title: string;       // display name
  type: string;        // list type description
  description?: string;
  link?: string;       // source website URL
  total: number;
  updateTime: string;
  fromCache: boolean;
  data: ListItem[];    // array of {id, title, cover?, author?, desc?, hot, timestamp, url, mobileUrl}
}
```

**Caching Layer** (`src/utils/cache.ts`):
- Dual-layer: Redis (if available) + NodeCache (in-memory fallback)
- Default TTL: 60 minutes (configurable via `CACHE_TTL`)
- Auto-connects to Redis lazily; falls back silently if unavailable

**Data Fetching** (`src/utils/getData.ts`):
- Wraps axios with caching integration
- `get()` and `post()` functions handle cache check/store automatically
- Pass `noCache: true` to bypass cache

**Key Utilities**:
- `src/utils/getRSS.ts` - Converts list data to RSS feed
- `src/utils/getToken/*.ts` - Platform-specific token/signature generators (Bilibili WBI, etc.)
- `src/utils/logger.ts` - Winston logger

## Configuration

Copy `.env.example` to `.env`. Key settings:
- `PORT` - Server port (default: 6688)
- `CACHE_TTL` - Cache duration in seconds (default: 3600)
- `REQUEST_TIMEOUT` - HTTP request timeout in ms (default: 6000)
- `REDIS_*` - Redis connection settings (optional)
- `RSS_MODE` - Global RSS output mode

## Adding a New Route

1. Create `src/routes/{name}.ts`
2. Export `handleRoute(c: ListContext, noCache: boolean): Promise<RouterData>`
3. Use `get()` or `post()` from `../utils/getData.js` for HTTP requests
4. Route auto-registers at `/{name}`

Query params handled by registry:
- `?cache=false` - Skip cache
- `?limit=N` - Limit results
- `?rss=true` - Return RSS format
