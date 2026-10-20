import { profile } from '../data/site'
import { ArrowRight, Download } from '../components/Icons'
import { tabHref } from '../useHashTab'

const shortcuts = [
  { href: tabHref('resume'), no: 'FILE 02', label: 'Résumé', hint: 'Experience & education' },
  { href: tabHref('projects'), no: 'FILE 03', label: 'Projects', hint: 'Things I have built' },
  { href: tabHref('feed'), no: 'FILE 04', label: 'Latest posts', hint: 'From Instagram & more' },
]

// Allow a line break between camelCase words ("Kirisame|Vanilla") instead of mid-word.
const breakableName = profile.name.replace(/([a-z])([A-Z])/g, '$1\u200B$2')

export function Home() {
  return (
    <section aria-label="Home">
      <div className="hero">
        <div className="hero-main speed">
          <p className="bubble">{profile.greeting}</p>
          <h1>
            <span>Hi, I'm</span>
            <span className="name">{breakableName}</span>
          </h1>
          <p className="tagline">{profile.tagline}</p>
          <div className="actions">
            <a className="btn dark" href={tabHref('projects')}>
              See my projects <ArrowRight />
            </a>
            {profile.resumePdf && (
              <a className="btn" href={profile.resumePdf} download>
                <Download /> Résumé PDF
              </a>
            )}
          </div>
          <span className="sfx" aria-hidden="true">!!</span>
        </div>

        <div className="hero-side">
          <div className="portrait tone-lav">
            <img src={profile.avatar} alt={`Illustrated avatar of ${profile.name}`} />
            <span className="sfx" aria-hidden="true">ドン</span>
          </div>
          <div className="status">
            <span className="dot" aria-hidden="true" />
            <div>
              <b>Now</b>&ensp;{profile.status}
            </div>
          </div>
        </div>
      </div>

      <nav className="shortcuts" aria-label="Jump to section">
        {shortcuts.map((s) => (
          <a key={s.href} className="btn shortcut" href={s.href}>
            <span>
              <small>{s.no}</small>
              <strong>{s.label}</strong>
              <em>{s.hint}</em>
            </span>
            <ArrowRight size={22} />
          </a>
        ))}
      </nav>
    </section>
  )
}
