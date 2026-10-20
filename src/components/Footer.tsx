import { profile } from '../data/site'
import { Mail } from './Icons'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="site-footer tone-lav">
      <div className="container">
        <div className="top">
          <div>
            <div className="kicker">NEXT EPISODE —</div>
            <h2>Let's write it together.</h2>
          </div>
          <div className="links">
            <a className="btn dark" href={`mailto:${profile.email}`}>
              <Mail />
              {profile.email}
            </a>
            {profile.socials.map((s) => (
              <a key={s.label} className="btn" href={s.url} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="bottom">
          <span>© {year} {profile.realName}</span>
          <span>— To be continued —</span>
        </div>
      </div>
    </footer>
  )
}
