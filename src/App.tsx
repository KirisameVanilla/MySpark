import { useEffect } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './sections/Home'
import { Profile } from './sections/Profile'
import { Resume } from './sections/Resume'
import { Projects } from './sections/Projects'
import { Feed } from './sections/Feed'
import { profile } from './data/site'
import { TABS, useHashTab } from './useHashTab'

const sections = { home: Home, profile: Profile, resume: Resume, projects: Projects, feed: Feed }

export default function App() {
  const tab = useHashTab()
  const Section = sections[tab]

  useEffect(() => {
    const t = TABS.find((x) => x.id === tab)!
    document.title = tab === 'home' ? profile.name : `${t.title} · ${profile.name}`
  }, [tab])

  return (
    <div className="app">
      <Header tab={tab} />
      <main className="container">
        <Section />
      </main>
      <Footer />
    </div>
  )
}
