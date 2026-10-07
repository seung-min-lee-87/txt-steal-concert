import { useCallback, useEffect, useState } from 'react'
import TourPage from './components/TourPage'
import SetlistPage from './components/SetlistPage'
import PracticePage, { loadSongState } from './components/PracticePage'
import './App.css'

// 주소 끝(#/tour, #/setlist, #/practice/곡id)으로 화면을 나눈다.
function readRoute() {
  const [, page = 'tour', id] = window.location.hash.split('/')
  return { page, id }
}

const NAV = [
  { page: 'tour', icon: '🌬️', label: '투어' },
  { page: 'setlist', icon: '🎵', label: '세트리스트' },
  { page: 'practice', icon: '📣', label: '응원법 연습' },
]

export default function App() {
  const [route, setRoute] = useState(readRoute)
  const [, setVersion] = useState(0)

  useEffect(() => {
    const onHash = () => {
      setRoute(readRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const go = useCallback((hash) => {
    window.location.hash = hash
  }, [])

  const hasCheer = (id) => loadSongState(id).cues.length > 0
  const onSaved = useCallback(() => setVersion((v) => v + 1), [])

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#/tour">
          <span className="brand-mark">TXT</span> STEAL THE WIND
        </a>
        <nav className="topnav">
          {NAV.map((n) => (
            <a key={n.page} href={`#/${n.page}`} className={route.page === n.page ? 'on' : ''}>
              {n.icon} {n.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {route.page === 'setlist' && <SetlistPage go={go} hasCheer={hasCheer} />}
        {route.page === 'practice' && (
          <PracticePage songId={route.id} go={go} hasCheer={hasCheer} onSaved={onSaved} />
        )}
        {route.page !== 'setlist' && route.page !== 'practice' && <TourPage go={go} />}
      </main>

      <nav className="bottomnav">
        {NAV.map((n) => (
          <a key={n.page} href={`#/${n.page}`} className={route.page === n.page ? 'on' : ''}>
            <span className="bn-icon">{n.icon}</span>
            <span>{n.label}</span>
          </a>
        ))}
      </nav>
    </div>
  )
}
