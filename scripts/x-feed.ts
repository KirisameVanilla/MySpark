import { Scraper, type Tweet } from '@the-convocation/twitter-scraper'
import type { FeedPost } from '../src/types.ts'

export function parseCookies(raw: string): string[] {
  const value = raw.trim()
  if (value.startsWith('[')) {
    const entries: unknown = JSON.parse(value)
    if (!Array.isArray(entries)) throw new Error('Invalid X cookie array')
    return entries.flatMap((entry) => {
      if (typeof entry === 'string') return [entry]
      if (!entry || typeof entry !== 'object') return []
      const cookie = entry as Record<string, unknown>
      const name = cookie.name ?? cookie.key
      return typeof name === 'string' && typeof cookie.value === 'string'
        ? [`${name}=${cookie.value}; Domain=x.com; Path=/; Secure`]
        : []
    })
  }
  return value.split(';').map((part) => part.trim()).filter(Boolean)
}

export function originalPost(tweet: Tweet, username: string): FeedPost | undefined {
  if (!tweet.id || tweet.username?.toLowerCase() !== username.toLowerCase()
    || tweet.isReply || tweet.inReplyToStatusId || tweet.inReplyToStatus
    || tweet.isRetweet || tweet.retweetedStatusId || tweet.retweetedStatus) return
  const date = tweet.timeParsed ?? (tweet.timestamp ? new Date(tweet.timestamp * 1000) : undefined)
  if (!date || !Number.isFinite(date.getTime())) return
  return {
    id: `x-${tweet.id}`,
    source: 'X',
    date: date.toISOString(),
    text: tweet.text?.trim() ?? '',
    url: `https://x.com/${username}/status/${tweet.id}`,
  }
}

/** Collect all attached and quoted photos, retaining per-image attribution. */
export function tweetPhotos(tweet: Tweet): { url: string; fromQuote: boolean }[] {
  const visited = new Set<Tweet>()
  const seen = new Set<string>()
  const photos: { url: string; fromQuote: boolean }[] = []
  let current: Tweet | undefined = tweet
  while (current && !visited.has(current)) {
    visited.add(current)
    for (const photo of current.photos ?? []) {
      if (!photo.url || seen.has(photo.url)) continue
      seen.add(photo.url)
      photos.push({ url: photo.url, fromQuote: current !== tweet })
    }
    current = current.quotedStatus
  }
  return photos
}

export function coverPhotoInfo(tweet: Tweet) { return tweetPhotos(tweet)[0] }
export function coverPhoto(tweet: Tweet): string | undefined { return coverPhotoInfo(tweet)?.url }

export async function fetchX(
  saveImage: (name: string, url: string) => Promise<string | undefined>,
): Promise<FeedPost[]> {
  const raw = process.env.TWITTER_COOKIES
  if (!raw?.trim()) throw new Error('TWITTER_COOKIES not set')
  const username = process.env.X_USERNAME?.trim().replace(/^@/, '') || 'spark_barry'
  if (!/^\w{1,15}$/.test(username)) throw new Error('Invalid X_USERNAME')
  const deadline = AbortSignal.timeout(120_000)
  const scraper = new Scraper({
    // Fail this source promptly so Instagram can still be published.
    fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.any([deadline, AbortSignal.timeout(30_000)]) }),
    rateLimitStrategy: { async onRateLimit() { throw new Error('X rate limited; retry next scheduled run') } },
  })
  await scraper.setCookies(parseCookies(raw))
  if (!await scraper.isLoggedIn()) throw new Error('X cookie expired or login check failed')

  const posts = new Map<string, FeedPost>()
  // Bound the scan, including replies/reposts filtered below. This is a latest-post
  // snapshot, not a full archive; pinned/previously seen posts never stop the scan.
  for await (const tweet of scraper.getTweets(username, 100)) {
    const post = originalPost(tweet, username)
    if (!post) continue
    const images: NonNullable<FeedPost['images']> = []
    const photos = tweetPhotos(tweet)
    for (let index = 0; index < photos.length; index++) {
      const photo = photos[index]
      const url = await saveImage(`${post.id}-${index + 1}`, photo.url)
      if (!url) throw new Error('X photo download failed; retaining previous snapshot')
      images.push({ url, fromQuote: photo.fromQuote })
    }
    if (images.length) {
      post.images = images
      post.image = images[0].url
      post.imageFromQuote = images[0].fromQuote
    }
    posts.set(post.id, post)
  }
  if (!posts.size) throw new Error('X returned no original posts; keeping previous snapshot')
  return [...posts.values()]
}
