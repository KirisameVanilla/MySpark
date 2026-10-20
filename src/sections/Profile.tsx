import { profile } from '../data/site'
import { SectionHead } from '../components/SectionHead'

export function Profile() {
  return (
    <section aria-labelledby="profile-title">
      <SectionHead fileNo="FILE 01" title="Character Sheet" id="profile-title" />
      <div className="profile">
        <div className="profile-pic tone-lav">
          <img src={profile.avatar} alt={`Illustrated avatar of ${profile.nickname}`} />
        </div>
        <div className="profile-cards">
          <div className="panel">
            <h3 className="card-label">BASICS</h3>
            <dl className="basics">
              {profile.basics.map((b) => (
                <div key={b.label} style={{ display: 'contents' }}>
                  <dt>{b.label}</dt>
                  <dd>{b.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="panel">
            <h3 className="card-label">SKILLS</h3>
            <ul className="skills">
              {profile.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="panel wide">
            <h3 className="card-label">FAVORITE THINGS</h3>
            <p className="favorites">{profile.favorites}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
