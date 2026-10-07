import { useState } from 'react'
import { SETLISTS, APPEARANCES, TOURS } from '../data/setlists'
import { SONGS, SONG_MAP } from '../data/songs'
import Badges, { Legend } from './Badges'
import AlbumChip from './AlbumChip'
import { CHANT_ORDER } from '../data/cheers'

const songLink = (id) => (CHANT_ORDER.includes(id) ? `#/chant/${id}` : `#/practice/${id}`)

const FILTERS = [
  { id: 'all', label: '전체' },
  { id: 'title', label: '👑 타이틀' },
  { id: 'new', label: '✨ 신곡' },
  { id: 'past', label: '🔁 지난 투어' },
  { id: 'jp', label: '🇯🇵 일본곡' },
  { id: 'solo', label: '🎤 솔로' },
  { id: 'cheer', label: '📣 준비됨' },
]


export default function SetlistPage({ go, hasCheer }) {
  // tab: 투어 key | 'all'(곡 모아보기)
  const [tab, setTab] = useState(TOURS[0].key)
  const [showId, setShowId] = useState(null)
  const [filter, setFilter] = useState('all')
  const [zoom, setZoom] = useState(null)

  // 한 투어 안에서는 날짜순 (보통 서울 → 일본)
  const shows = SETLISTS.filter((s) => s.tourKey === tab).sort((a, b) => a.date.localeCompare(b.date))
  const current = shows.find((s) => s.id === showId) || shows[0]
  const tour = TOURS.find((t) => t.key === tab)

  function pickTour(key) {
    setTab(key)
    setShowId(null)
  }

  return (
    <div className="page">
      <p className="kicker">Setlist</p>
      <h1 className="page-title">세트리스트</h1>
      <p className="hint">
        이번 투어는 아직 시작 전이라, 지난 콘서트들의 서울·일본 공연을 모아뒀어요. 곡을 누르면 응원법(없으면 연습
        화면)으로 가요.
      </p>
      <Legend />

      <div className="tabs" role="tablist" aria-label="투어 선택">
        {TOURS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            className={'tab' + (tab === t.key ? ' on' : '')}
            style={tab === t.key && t.theme ? { background: t.theme.accent, borderColor: t.theme.accent, color: t.theme.bg } : undefined}
            onClick={() => pickTour(t.key)}
          >
            <span className="tab-year">{t.years}</span> {t.name}
          </button>
        ))}
        <button
          role="tab"
          aria-selected={tab === 'all'}
          className={'tab' + (tab === 'all' ? ' on' : '')}
          onClick={() => pickTour('all')}
        >
          📚 곡 모아보기
        </button>
      </div>

      {tour && <TourBanner tour={tour} onPoster={setZoom} />}
      {zoom && (
        <button className="lightbox" onClick={() => setZoom(null)} aria-label="닫기">
          <img src={zoom} alt={`${tour?.name} 포스터`} />
        </button>
      )}

      {current && (
        <div className="setlist">
          <div className="filters" aria-label="공연 선택">
            {shows.map((s) => (
              <button
                key={s.id}
                className={'chip' + (current.id === s.id ? ' on' : '')}
                onClick={() => setShowId(s.id)}
              >
                {s.region === 'KR' ? '🇰🇷' : '🇯🇵'} {s.label}
              </button>
            ))}
          </div>
          <p className="setlist-meta">
            {current.tour || tour?.full} · {current.venue} · {current.date.replaceAll('-', '.')}
          </p>
          {current.notes && (
            <ul className="setlist-notes">
              {current.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          )}
          {(() => {
            let n = 0
            return current.groups.map((g) => (
              <section key={g.name} className="set-group">
                <h3>{g.name}</h3>
                <ol>
                  {g.items.map((it, i) => {
                    const song = SONG_MAP[it.song]
                    const encore = g.name.startsWith('앙코르')
                    if (!encore) n += 1
                    return (
                      <li key={g.name + i}>
                        <SongRow song={song} go={go} num={encore ? `E${i + 1}` : n} jpVer={it.jpVer} by={it.by} hasCheer={hasCheer} />
                      </li>
                    )
                  })}
                </ol>
              </section>
            ))
          })()}
          <p className="hint small">
            출처: {current.source || 'setlist.fm·공연 후기 기사'} · 앙코르는 공연 날마다 달라요. 틀린 부분이 있으면 알려주세요.
          </p>
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
              if (filter === 'solo') return s.solo
              if (filter === 'cheer') return hasCheer(s.id)
              return true
            }).map((song) => (
              <li key={song.id}>
                <SongRow song={song} go={go} hasCheer={hasCheer} full />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function SongRow({ song, go, num, jpVer, by, hasCheer, full = false }) {
  return (
    <button className="song-row" onClick={() => go(songLink(song.id))}>
      {num != null && <span className="num">{num}</span>}
      <span className="song-main">
        <span className="song-title">
          {full ? song.title : song.short || song.title}
          {jpVer && <span className="ver"> (Japanese ver.)</span>}
          {by && <span className="by"> ({by})</span>}
        </span>
        <span className="row-meta">
          <AlbumChip album={song.album} small />
          <Badges song={song} jpVer={jpVer} hasCheer={hasCheer(song.id)} compact={!full} />
        </span>
      </span>
      <span className="go">›</span>
    </button>
  )
}

// 투어 배너: 공식 포스터의 로고·색. 포스터가 없는 투어는 글자 로고로 보여준다.
function TourBanner({ tour, onPoster }) {
  const th = tour.theme
  const style = th
    ? { '--tour-bg': th.bg, '--tour-accent': th.accent }
    : undefined
  return (
    <section className={'tour-banner' + (th ? ' themed' : '')} style={style}>
      <div className="tour-banner-text">
        <p className="tour-banner-years">{tour.years}</p>
        {th?.logo ? (
          <img className="tour-banner-logo" src={th.logo} alt={tour.full} />
        ) : (
          <p className="tour-banner-name">{tour.name}</p>
        )}
        {!th?.logo && <p className="tour-banner-full">{tour.full}</p>}
      </div>
      {th?.poster && (
        <button className="tour-banner-poster" onClick={() => onPoster(th.poster)} aria-label="포스터 크게 보기">
          <img src={th.poster} alt={`${tour.name} 포스터`} loading="lazy" />
        </button>
      )}
    </section>
  )
}
