import { episodes, profile } from '../data/site'
import { SectionHead } from '../components/SectionHead'

const tints = ['var(--tint-1)', 'var(--tint-2)', 'var(--tint-3)', 'var(--tint-4)']

export function Resume() {
  return (
    <section aria-labelledby="resume-title">
      <SectionHead fileNo="FILE 02" title="Episode Guide" id="resume-title">
        <a href={profile.resumePdf} download style={{ fontWeight: 700, padding: '12px 0' }}>
          Full résumé (PDF) →
        </a>
      </SectionHead>
      <ol className="episodes">
        {episodes.map((ep, i) => (
          <li key={ep.no} className="panel episode">
            <div className="ep-no tone" style={{ backgroundColor: tints[i % tints.length] }}>
              <strong>{ep.no}</strong>
              <span>{ep.period}</span>
            </div>
            <div className="ep-body">
              <div className="row">
                <h3>{ep.title}</h3>
                <span className="kind">{ep.kind}</span>
              </div>
              <div className="org">{ep.org}</div>
              <p>{ep.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
