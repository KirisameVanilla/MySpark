import { useState } from 'react'
import { projects } from '../data/site'
import { SectionHead } from '../components/SectionHead'
import { FilterPills } from '../components/FilterPills'
import type { ProjectCategory } from '../types'

type Filter = 'all' | ProjectCategory

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'Web', label: 'Web' },
  { id: 'Game', label: 'Games' },
  { id: 'Tool', label: 'Tools' },
]
const tints = ['var(--tint-1)', 'var(--tint-2)', 'var(--tint-3)', 'var(--tint-4)']

export function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const shown = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section aria-labelledby="projects-title">
      <SectionHead fileNo="FILE 03" title="Projects" id="projects-title">
        <FilterPills label="Filter projects" options={filters} value={filter} onChange={setFilter} />
      </SectionHead>
      <ul className="grid-projects">
        {shown.map((p, i) => (
          <li key={p.title}>
            <article className="panel card project">
              <div className="cover tone" style={{ backgroundColor: tints[i % tints.length] }}>
                <span className="cat">{p.category}</span>
                {p.cover ? (
                  <img src={p.cover} alt="" loading="lazy" />
                ) : (
                  <span className="placeholder-label">[Screenshot / cover]</span>
                )}
              </div>
              <div className="body">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="tags">
                  {p.tags.map((t, j) => (
                    <span key={j} className="chip">{t}</span>
                  ))}
                </div>
                {(p.detailsUrl || p.repoUrl) && (
                  <div className="links">
                    {p.detailsUrl && <a href={p.detailsUrl} target="_blank" rel="noreferrer">Details →</a>}
                    {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noreferrer">GitHub</a>}
                  </div>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
