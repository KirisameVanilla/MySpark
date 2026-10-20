import { profile } from '../data/site'
import type { TabId } from '../types'
import { TABS, tabHref } from '../useHashTab'

export function Header({ tab }: { tab: TabId }) {
  return (
    <header className="site-header">
      <nav className="container" aria-label="Site sections">
        <a className="brand" href="#/">
          <img src={profile.avatar} alt="" />
          <span>{profile.name}</span>
        </a>
        <div className="tabs">
          {TABS.map((t) => (
            <a
              key={t.id}
              className="tab"
              href={tabHref(t.id)}
              aria-current={tab === t.id ? 'page' : undefined}
            >
              <small aria-hidden="true">{t.no}</small>
              {t.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
