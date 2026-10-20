import { useEffect, useState } from 'react'
import type { TabId } from './types'

export const TABS: { id: TabId; no: string; label: string; title: string }[] = [
  { id: 'home', no: '00', label: 'Home', title: 'Home' },
  { id: 'profile', no: '01', label: 'Profile', title: 'Player Select' },
  { id: 'resume', no: '02', label: 'Résumé', title: 'Spell Card History' },
  { id: 'projects', no: '03', label: 'Projects', title: 'Song Select' },
  { id: 'feed', no: '04', label: 'Feed', title: 'Latest Posts' },
]

const ids = new Set<string>(TABS.map((t) => t.id))

function read(): TabId {
  const id = window.location.hash.replace(/^#\/?/, '')
  return ids.has(id) ? (id as TabId) : 'home'
}

export const tabHref = (id: TabId) => (id === 'home' ? '#/' : `#/${id}`)

/** Current tab, kept in the URL hash (#/projects) so tabs are linkable and Back works. */
export function useHashTab(): TabId {
  const [tab, setTab] = useState<TabId>(read)
  useEffect(() => {
    const onChange = () => {
      setTab(read())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return tab
}
