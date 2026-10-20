import { episodes, profile } from '../data/site'

const COLORS = ['var(--g-purple)', 'var(--g-green)', 'var(--ka)', 'var(--g-orange)']

export function Resume() {
  return (
    <section aria-labelledby="resume-title">
      <div className="page-head">
        <h1 id="resume-title">Spell card history</h1>
        {profile.resumePdf ? (
          <a className="meta" href={profile.resumePdf} download>Full résumé (PDF) →</a>
        ) : (
          <span className="meta">Newest first</span>
        )}
      </div>
      <ol className="spellcards">
        {episodes.map((ep, i) => (
          <li key={ep.no} className="spellcard night-sky">
            <div className="when" style={{ background: COLORS[i % COLORS.length] }}>
              <small>{ep.no}</small>
              <b>{ep.period}</b>
              <span>{ep.kind}</span>
            </div>
            <div className="what">
              <span className="sign">{ep.sign}</span>
              <h3>「{ep.title}」</h3>
              <span className="org">{ep.org}</span>
              <p>{ep.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
