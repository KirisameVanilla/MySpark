import { profile } from '../data/site'
import type { TabId } from '../types'
import { TABS, tabHref } from '../useHashTab'
import { DrumBuddy } from './Art'

// The navigation is a Taiko note lane: each section is a don (red) or ka (blue) note.
const NOTE_KIND: Record<TabId, 'don' | 'ka'> = {
  home: 'don',
  profile: 'ka',
  resume: 'don',
  projects: 'ka',
  feed: 'don',
}

export function Header({ tab }: { tab: TabId }) {
  return (
    <header className="site-header">
      <div className="container top">
        <a className="brand" href="#/">
          <strong>{profile.handle}</strong>
          <span>Rhythm &amp; Magic</span>
        </a>
        <span className="hint" aria-hidden="true">Tap a note to jump ♪</span>
      </div>
      <nav className="container lane-wrap" aria-label="Site sections">
        <div className="lane">
          <div className="judge">
            <DrumBuddy className="bob" mood={NOTE_KIND[tab] === 'don' ? 'happy' : 'wink'} color={NOTE_KIND[tab] === 'don' ? '#F2542D' : '#3FB8D6'} />
          </div>
          <div className="notes">
            {TABS.map((t) => (
              <a
                key={t.id}
                className={`note ${NOTE_KIND[t.id]}`}
                href={tabHref(t.id)}
                aria-current={tab === t.id ? 'page' : undefined}
              >
                <span className="head" aria-hidden="true">{NOTE_KIND[t.id] === 'don' ? 'ドン' : 'カッ'}</span>
                <span className="label">{t.label}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
