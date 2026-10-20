import { useEffect, useState } from 'react'
import { SectionHead } from '../components/SectionHead'
import { FilterPills } from '../components/FilterPills'
import type { FeedFile, FeedPost, FeedSource } from '../types'

type Filter = 'all' | FeedSource

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'Instagram', label: 'Instagram' },
  { id: 'X', label: 'X' },
  { id: 'Bilibili', label: 'Bilibili' },
]
const srcColor: Record<FeedSource, string> = { Instagram: 'var(--ig)', X: 'var(--x)', Bilibili: 'var(--bili)' }
const tints = ['var(--tint-1)', 'var(--tint-2)', 'var(--tint-3)', 'var(--tint-4)']
const PAGE = 12

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

export function Feed() {
  const [data, setData] = useState<FeedFile | null>(null)
  const [error, setError] = useState(false)
  const [filter, setFilter] = useState<Filter>('all')
  const [limit, setLimit] = useState(PAGE)

  // feed.json is written by scripts/sync-feed.ts (run on a schedule in CI).
  useEffect(() => {
    fetch('/feed/feed.json', { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: FeedFile) => setData(d))
      .catch(() => setError(true))
  }, [])

  const all: FeedPost[] = data?.posts ?? []
  const filtered = filter === 'all' ? all : all.filter((p) => p.source === filter)
  const shown = filtered.slice(0, limit)

  return (
    <section aria-labelledby="feed-title">
      <SectionHead fileNo="FILE 04" title="Latest Posts" id="feed-title">
        <FilterPills
          label="Filter by platform"
          options={filters}
          value={filter}
          onChange={(f) => {
            setFilter(f)
            setLimit(PAGE)
          }}
        />
      </SectionHead>
      <p className="feed-meta">
        {data?.updatedAt ? `Synced automatically · last updated ${fmtDate(data.updatedAt)}` : 'Synced automatically'}
      </p>

      {error && <p className="empty">Couldn't load posts right now.</p>}
      {!error && !data && <p className="empty" aria-live="polite">Loading…</p>}
      {data && shown.length === 0 && <p className="empty">No posts here yet.</p>}

      <ul className="grid-feed">
        {shown.map((p, i) => (
          <li key={p.id}>
            <article className="post card">
              <header>
                <span className="src" style={{ background: srcColor[p.source] }}>{p.source}</span>
                <time dateTime={p.date}>{fmtDate(p.date)}</time>
              </header>
              <div className="media tone" style={{ backgroundColor: tints[i % tints.length] }}>
                {p.image ? (
                  <img src={p.image} alt="" loading="lazy" />
                ) : (
                  <span className="placeholder-label">{p.source}</span>
                )}
              </div>
              <div className="body">
                {p.text && <p>{p.text}</p>}
                <a href={p.url} target="_blank" rel="noreferrer">View on {p.source} →</a>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {filtered.length > limit && (
        <div className="more">
          <button type="button" className="btn" onClick={() => setLimit((n) => n + PAGE)}>
            Load more
          </button>
        </div>
      )}
    </section>
  )
}
