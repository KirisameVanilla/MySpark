import { fullName, profile } from '../data/site'
import { Star } from '../components/Art'

export function Profile() {
  return (
    <section className="profile" aria-labelledby="player-name">
      <div className="player-card night-sky">
        <div className="bar" aria-hidden="true">
          <span>PLAYER SELECT</span>
          <span>1P</span>
        </div>
        <div className="pic">
          <img src={profile.avatar} alt={`${profile.nickname}'s avatar: a blonde witch in a black hat`} />
        </div>
        <div className="who">
          <small>{profile.title}</small>
          <h1 id="player-name">{fullName}</h1>
          <span>{profile.handle}</span>
        </div>
      </div>

      <div className="profile-cards">
        <div className="panel">
          <h2>STATUS</h2>
          <dl className="stats">
            {profile.basics.map((b) => (
              <div key={b.label} style={{ display: 'contents' }}>
                <dt>{b.label}</dt>
                <dd>{b.value}</dd>
              </div>
            ))}
            <dt>Now</dt>
            <dd>{profile.status}</dd>
          </dl>
        </div>
        <div className="panel">
          <h2>SPELL LIST</h2>
          <ul className="spells">
            {profile.skills.map((s) => (
              <li key={s}><Star size={14} />{s}</li>
            ))}
          </ul>
        </div>
        <div className="panel wide">
          <h2>FAVORITE THINGS</h2>
          <ul className="favs">
            {profile.favorites.map((f) => (
              <li key={f.label}><i style={{ background: f.color }} aria-hidden="true" />{f.label}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
