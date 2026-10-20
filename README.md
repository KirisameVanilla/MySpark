# Anime-style personal site

Vite + React + TypeScript. Manga-panel look, tabbed sections (Home / Profile / Résumé / Projects / Feed),
and a social feed synced from Instagram on a schedule.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static output in dist/
```

## Where to edit

| What | File |
| --- | --- |
| Name, intro, skills, contacts, résumé, projects | `src/data/site.ts` |
| Colors, fonts, layout | `src/index.css` (tokens at the top) |
| Avatar | `public/avatar.jpg` |
| Résumé PDF | put it at `public/resume.pdf` and set `resumePdf: '/resume.pdf'` (buttons stay hidden until then) |
| Header lane art (notes, drum, judge circle, backgrounds) | `public/lane/`, from OurTaikoPlay by OurTaiko |
| Project screenshots | put in `public/projects/` and set `cover: '/projects/x.jpg'` |

Tabs live in the URL hash (`/#/projects`), so every tab can be linked to directly and Back works.

## Social feed

`scripts/sync-feed.ts` writes `public/feed/feed.json` and saves images into `public/feed/images/`.
The site only reads that JSON — no tokens ever reach the browser.

### Instagram setup (once)

1. In the Instagram app, switch your account to a **Creator** or **Business** account (free).
2. At developers.facebook.com create an app → add the **Instagram** product →
   "API setup with Instagram login" → add your account as a tester and generate an access token.
   This gives a long-lived token (valid 60 days, refreshable).
3. Try it locally: `IG_ACCESS_TOKEN=xxxx npm run sync-feed`
4. In your GitHub repo: Settings → Secrets and variables → Actions → add two secrets:
   - `IG_ACCESS_TOKEN` — the token (copy the current value from `.env.local`; local runs keep it up to date).
   - `GH_PAT` — a fine-grained personal access token limited to this repo with
     **Secrets: Read and write** permission. The workflow uses it to store the refreshed Instagram token,
     because Meta returns a new token string on every refresh.

`.github/workflows/sync-feed.yml` then runs every 6 hours (or on demand from the Actions tab),
refreshes the token, and commits the new `feed.json` — your host (Vercel / Cloudflare Pages) redeploys on that commit.

### Bilibili and other platforms

Bilibili has no official API for listing a user's uploads, and its web API blocks scripts,
so those posts are listed by hand in `content/manual-posts.json`:

```json
[
  {
    "source": "Bilibili",
    "date": "2026-10-01T12:00:00+08:00",
    "text": "Video title",
    "url": "https://www.bilibili.com/video/BV...",
    "image": "/feed/manual/cover.jpg"
  }
]
```

`image` is optional (put the file in `public/feed/manual/`). Pushing a change to this file
runs the sync workflow, which merges it into `feed.json`.
Platforms with a real API can get a fetcher in `scripts/sync-feed.ts` (see the `sources` map).

## Deploy

Any static host works. On Vercel or Cloudflare Pages: build command `npm run build`, output `dist`.
