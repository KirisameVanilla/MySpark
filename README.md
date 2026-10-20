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
| Résumé PDF | put it at `public/resume.pdf` |
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

### Other platforms

Add a fetcher in `scripts/sync-feed.ts` (see the `sources` map). Posts from a source without a
fetcher are kept as-is, so you can also hand-add entries to `feed.json`.
The bundled `sample-*` posts are removed automatically after the first successful sync.

## Deploy

Any static host works. On Vercel or Cloudflare Pages: build command `npm run build`, output `dist`.
