import { useState } from 'react'
import { SETLISTS, APPEARANCES } from '../data/setlists'
import { SONGS, SONG_MAP } from '../data/songs'
import Badges, { Legend } from './Badges'

const FILTERS = [
  { id: 'all', label: '전체' },
  { id: 'title', label: '👑 타이틀' },
  { id: 'new', label: '✨ 신곡' },
  { id: 'past', label: '🔁 지난 투어' },
  { id: 'jp', label: '🇯🇵 일본곡' },
  { id: 'cheer', label: '📣 준비됨' },
]

export default function SetlistPage({ go, hasCheer }) {
  const [tab, setTab] = useState(SETLISTS[0].id)
  const [filter, setFilter] = useState('all')

  const current = SETLISTS.find((s) => s.id === tab)

  return (
    <div className="page">
      <h1 className="page-title">세트리스트</h1>
      <p className="hint">
        이번 투어는 아직 시작 전이라, 지난 투어 「ACT : TOMORROW」의 서울·도쿄 공연을 모아뒀어요. 곡을 누르면
        바로 연습 화면으로 가요.
      </p>
      <Legend />

      <div className="tabs" role="tablist">
        {SETLISTS.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={tab === s.id}
            className={'tab' + (tab === s.id ? ' on' : '')}
            onClick={() => setTab(s.id)}
          >
            {s.region === 'KR' ? '🇰🇷' : '🇯🇵'} {s.label}
          </button>
        ))}
        <button
          role="tab"
          aria-selected={tab === 'all'}
          className={'tab' + (tab === 'all' ? ' on' : '')}
          onClick={() => setTab('all')}
        >
          📚 곡 모아보기
        </button>
      </div>

      {current && (
        <div className="setlist">
          <p className="setlist-meta">
            {current.tour} · {current.venue} · {current.date.replaceAll('-', '.')}
          </p>
          {(() => {
            let n = 0
            return current.groups.map((g) => (
              <section key={g.name} className="set-group">
                <h3>{g.name}</h3>
                <ol>
                  {g.items.map((it, i) => {
                    const song = SONG_MAP[it.song]
                    if (!g.name.startsWith('앙코르')) n += 1
                    const num = g.name.startsWith('앙코르') ? `E${i + 1}` : n
                    return (
                      <li key={g.name + i}>
                        <button className="song-row" onClick={() => go(`#/practice/${song.id}`)}>
                          <span className="num">{num}</span>
                          <span className="song-main">
                            <span className="song-title">
                              {song.short || song.title}
                              {it.jpVer && <span className="ver"> (Japanese ver.)</span>}
                            </span>
                            <Badges song={song} jpVer={it.jpVer} hasCheer={hasCheer(song.id)} compact />
                          </span>
                          <span className="go">›</span>
                        </button>
                      </li>
                    )
                  })}
                </ol>
              </section>
            ))
          })()}
          <p className="hint small">출처: setlist.fm · 틀린 부분이 있으면 알려주세요.</p>
        </div>
      )}

      {tab === 'all' && (
        <div className="setlist">
          <div className="filters">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={'chip' + (filter === f.id ? ' on' : '')}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <ul className="song-list">
            {SONGS.filter((s) => {
              if (filter === 'title') return s.title_
              if (filter === 'new') return s.isNew
              if (filter === 'past') return APPEARANCES[s.id]
              if (filter === 'jp') return s.jp
              if (filter === 'cheer') return hasCheer(s.id)
              return true
            }).map((song) => (
              <li key={song.id}>
                <button className="song-row" onClick={() => go(`#/practice/${song.id}`)}>
                  <span className="song-main">
                    <span className="song-title">{song.title}</span>
                    {song.album && <span className="album">{song.album}</span>}
                    <Badges song={song} hasCheer={hasCheer(song.id)} />
                  </span>
                  <span className="go">›</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
