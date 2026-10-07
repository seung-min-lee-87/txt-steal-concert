import { useCallback, useEffect, useState } from 'react'
import TourPage from './components/TourPage'
import SetlistPage from './components/SetlistPage'
import PracticePage, { loadSongState } from './components/PracticePage'
import ChantPage from './components/ChantPage'
import './App.css'

// 주소 끝(#/tour, #/setlist, #/practice/곡id)으로 화면을 나눈다.
function readRoute() {
  const [, page = 'tour', id] = window.location.hash.split('/')
  return { page, id }
}

const NAV = [
  { page: 'tour', icon: '🌬️', label: '투어' },
  { page: 'setlist', icon: '🎵', label: '세트리스트' },
  { page: 'chant', icon: '📣', label: '응원법' },
  { page: 'practice', icon: '🎧', label: '연습' },
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
        <a className="brand" href="#/tour" aria-label="STEAL THE WIND 홈">
          <img src="/images/logo-cream.webp" alt="STEAL THE WIND" width="770" height="306" />
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
        {route.page === 'chant' && <ChantPage songId={route.id} go={go} />}
        {!['setlist', 'practice', 'chant'].includes(route.page) && <TourPage go={go} />}
      </main>

      <footer className="footer">
        개인이 만든 비영리 비공식 팬 페이지예요. 아티스트·소속사와 관계없으며, 이미지·영상·가사의 저작권은 BIGHIT MUSIC에 있어요. 응원법 정리는 나무위키 문서(CC BY-NC-SA 2.0 KR)를 바탕으로 했어요.
      </footer>

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
