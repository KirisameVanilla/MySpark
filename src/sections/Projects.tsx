import { useState } from 'react'
import { projects } from '../data/site'
import { FilterPills } from '../components/FilterPills'
import { SpiderLily } from '../components/Art'
import type { ProjectCategory } from '../types'

type Filter = 'all' | ProjectCategory

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'Game', label: 'Game' },
  { id: 'Web', label: 'Web' },
  { id: 'Tool', label: 'Tool' },
]

// Genre colors + a darker shade that passes contrast as text on the light song bar.
const GENRE: Record<ProjectCategory, { color: string; text: string }> = {
  Game: { color: '#F2542D', text: '#B3301A' },
  Web: { color: '#3FB8D6', text: '#1C6F86' },
  Tool: { color: '#F4C430', text: '#7A5B00' },
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const [picked, setPicked] = useState(0)
  const shown = filter === 'all' ? projects : projects.filter((p) => p.category === filter)
  const sel = shown[Math.min(picked, shown.length - 1)]

  return (
    <section aria-labelledby="projects-title">
      <div className="page-head">
        <h1 id="projects-title">Song select</h1>
        <FilterPills
          label="Filter by genre"
          options={filters}
          value={filter}
          onChange={(f) => {
            setFilter(f)
            setPicked(0)
          }}
        />
      </div>

      <div className="song-select">
        <ul className="songs">
          {shown.map((p, i) => {
            const on = p === sel
            const g = GENRE[p.category]
            return (
              <li key={p.title}>
                <button
                  type="button"
                  className="song"
                  aria-pressed={on}
                  onClick={() => setPicked(i)}
                  style={{ boxShadow: `0 6px 0 ${on ? g.color : 'var(--ink)'}` }}
                >
                  <span className="stripe" style={{ background: g.color }} />
                  <span className="name">
                    <small style={{ color: on ? 'var(--paper)' : g.text }}>{p.category.toUpperCase()}</small>
                    <b>{p.title}</b>
                  </span>
                  <span className="score">
                    <b>{p.stars ? `★ ${p.stars}` : 'NEW'}</b>
                    <small>{p.stars ? 'GitHub stars' : 'just shipped'}</small>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        {sel && (
          <article className="stage-panel staff" aria-live="polite">
            <SpiderLily className="lily" />
            <div className="shot">
              {sel.cover ? (
                <img src={sel.cover} alt={`Screenshot of ${sel.title}`} />
              ) : (
                <div className="placeholder tone"><span>{sel.title}</span></div>
              )}
              <span className="genre" style={{ background: GENRE[sel.category].color }}>{sel.category.toUpperCase()}</span>
            </div>
            <div className="info">
              <small>NOW CONDUCTING</small>
              <h2>{sel.title}</h2>
              <p>{sel.description}</p>
              <div className="tags">
                {sel.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
              <div className="links">
                {sel.detailsUrl && <a className="elegy-btn solid" href={sel.detailsUrl} target="_blank" rel="noreferrer">Play / visit ↗</a>}
                {sel.repoUrl && <a className="elegy-btn" href={sel.repoUrl} target="_blank" rel="noreferrer">GitHub ↗</a>}
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
