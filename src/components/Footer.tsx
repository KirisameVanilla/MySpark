import { profile } from '../data/site'
import { GlassShards, SpiderLily } from './Art'
import { Mail } from './Icons'

const year = new Date().getFullYear()

// "Curtain call" — Phrolova's crimson elegy, shown on every page.
export function Footer() {
  return (
    <footer className="curtain">
      <div className="staff-lines" aria-hidden="true" />
      <GlassShards className="shards" />
      <SpiderLily className="lily-a" />
      <SpiderLily className="lily-b" />
      <div className="container inner">
        <span className="kicker">CURTAIN CALL</span>
        <h2>Let's play the next piece together.</h2>
        <div className="links">
          <a className="elegy-btn solid" href={`mailto:${profile.email}`}>
            <Mail />
            {profile.email}
          </a>
          {profile.socials.map((s) => (
            <a key={s.label} className="elegy-btn" href={s.url} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
        <div className="fine">
          <b>© {year} {profile.realName} · Unofficial fan site</b>
          <span>
            このコンテンツはファンメイドコンテンツです — made under the{' '}
            <a href="https://taiko-ch.net/ip_policy/" target="_blank" rel="noreferrer">Taiko no Tatsujin fan-made content policy</a>.
            Taiko no Tatsujin © Bandai Namco Entertainment Inc. · Wuthering Waves © Kuro Games · Touhou Project © Team Shanghai Alice.
            Header lane art from <a href="https://github.com/OurTaiko/OurTaikoPlay" target="_blank" rel="noreferrer">OurTaikoPlay</a> by OurTaiko;
            other character motifs are original fan drawings, not official art.
          </span>
        </div>
      </div>
    </footer>
  )
}
