import { useEffect, useState } from 'react'
import type { FeedFile } from './types'

let cache: Promise<FeedFile> | null = null

/** Loads feed.json (written by scripts/sync-feed.ts) once and shares it between pages. */
export function useFeed() {
  const [data, setData] = useState<FeedFile | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    cache ??= fetch('/feed/feed.json', { cache: 'no-cache' }).then((r) =>
      r.ok ? (r.json() as Promise<FeedFile>) : Promise.reject(new Error(String(r.status))),
    )
    let alive = true
    cache.then(
      (d) => alive && setData(d),
      () => {
        cache = null
        if (alive) setError(true)
      },
    )
    return () => {
      alive = false
    }
  }, [])

  return { data, error }
}

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
