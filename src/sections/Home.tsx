import { profile } from '../data/site'
import { Hakkero, MagicCircle, Star } from '../components/Art'
import { tabHref } from '../useHashTab'

// Marisa's star bullets around the portrait: [left, top, size, color]
const BULLETS: [string, string, number, string][] = [
  ['6%', '8%', 34, '#F4C430'], ['82%', '4%', 26, '#FFF6EA'], ['90%', '40%', 38, '#F4C430'],
  ['2%', '52%', 22, '#3FB8D6'], ['78%', '82%', 30, '#FF9AAE'], ['44%', '-2%', 20, '#F4C430'],
]

// Star bullets riding the Master Spark beam: [left, size]
const SPARK_STARS: [string, number][] = [['12%', 18], ['31%', 26], ['52%', 16], ['70%', 24], ['88%', 18]]

export function Home() {
  return (
    <>
      <section className="hero" aria-label="Introduction">
        <div className="hero-art">
          <div className="portrait">
            <MagicCircle className="circle spin" />
            <div className="face">
              <img src={profile.avatar} alt={`${profile.nickname}'s avatar: a blonde witch in a black hat, winking with a peace sign`} />
            </div>
            {BULLETS.map(([left, top, size, fill]) => (
              <Star key={`${left}${top}`} className="bullet twinkle" size={size} fill={fill} style={{ left, top }} />
            ))}
            <span className="ready" aria-hidden="true">1P · READY!</span>
          </div>
        </div>

        <div className="hero-copy">
          <div className="stage" aria-hidden="true">
            <span>STAGE 1 — HOME</span>
            <span className="dash" />
          </div>
          <h1>
            Hi, I'm
            <br />
            <span className="outlined" style={{ color: 'var(--don)' }}>{profile.nickname}</span>
            <span className="outlined" style={{ color: 'var(--ka)' }}>!</span>
          </h1>
          <p className="aka">
            {profile.realName} <span>·</span> a.k.a. {profile.handle}
          </p>
          <p className="tagline">{profile.tagline}</p>
          <div className="now-playing">
            <span className="eq" aria-hidden="true"><i /><i /><i /><i /></span>
            <small>NOW PLAYING</small>
            <b>{profile.status}</b>
          </div>
          <div className="actions">
            <a className="pill-btn don" href={tabHref('projects')}>
              <span className="kana" aria-hidden="true">ドン</span>
              Play my projects
            </a>
            <a className="pill-btn ka" href={tabHref('resume')}>
              <span className="kana" aria-hidden="true">カッ</span>
              Read my story
            </a>
          </div>
        </div>
      </section>

      <div className="spark" aria-hidden="true">
        <Hakkero />
        <div className="beam">
          {SPARK_STARS.map(([left, size]) => (
            <Star key={left} className="star" size={size} fill="#FFFFFF" style={{ left }} />
          ))}
        </div>
      </div>
      <p className="spark-caption">Love Sign 「Master Spark」</p>
    </>
  )
}
