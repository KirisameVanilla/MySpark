import type { FeedPost, FeedSource } from '../types'
import { fmtDate } from '../useFeed'

const SRC_COLOR: Record<FeedSource, string> = { Instagram: '#B3122E', X: '#1E1726', Bilibili: '#1F5FD1' }

export function PostCard({ post }: { post: FeedPost }) {
  return (
    <article className="post">
      <div className="media">
        {post.image ? (
          <img src={post.image} alt="" loading="lazy" />
        ) : (
          <div className="placeholder tone">{post.source}</div>
        )}
        <span className="src" style={{ background: SRC_COLOR[post.source] }}>{post.source}</span>
      </div>
      <div className="body">
        <time dateTime={post.date}>{fmtDate(post.date)}</time>
        {post.text && <p>{post.text}</p>}
        <a href={post.url} target="_blank" rel="noreferrer">View on {post.source} →</a>
      </div>
    </article>
  )
}
