import { useEffect, useMemo, useRef, useState } from 'react'
import { SONG_MAP } from '../data/songs'
import { APPEARANCES } from '../data/setlists'
import { CHANT_ORDER, CHANT_SOURCE } from '../data/cheers'
import { VIDEOS } from '../data/videos'
import { usePlayer, parseYouTubeId } from '../lib/usePlayer'
import { activeIndex } from '../lib/cues'
import { loadJSON, saveJSON } from '../lib/storage'
import Badges from './Badges'
import CueText, { hasPart } from './CueText'
import { loadSongState } from './PracticePage'

const FILTERS = [
  { id: 'all', label: '전체' },
  { id: 'past', label: '🔁 지난 투어 곡' },
  { id: 'title', label: '👑 타이틀' },
  { id: 'synced', label: '⏱ 싱크 완료' },
]

function melonUrl(song) {
  return `https://www.melon.com/search/total/index.htm?q=${encodeURIComponent(`투모로우바이투게더 ${song.short || song.title}`)}`
}

export default function ChantPage({ songId, go }) {
  if (songId && SONG_MAP[songId] && CHANT_ORDER.includes(songId)) {
    return <ChantDetail key={songId} song={SONG_MAP[songId]} go={go} />
  }
  return <ChantList go={go} />
}

function isSynced(id) {
  return loadSongState(id).cues.some((c) => c.t != null)
}

function ChantList({ go }) {
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')

  // 앨범별로 묶기 (나무위키 문서 순서 = 발매 순)
  const groups = useMemo(() => {
    const list = CHANT_ORDER.map((id) => SONG_MAP[id]).filter((s) => {
      if (filter === 'past' && !APPEARANCES[s.id]) return false
      if (filter === 'title' && !s.title_) return false
      if (filter === 'synced' && !isSynced(s.id)) return false
      if (q && !(s.title + (s.short || '')).toLowerCase().includes(q.toLowerCase())) return false
      return true
    })
    const out = []
    for (const s of list) {
      const album = s.album || '기타'
      if (out.at(-1)?.album !== album) out.push({ album, songs: [] })
      out.at(-1).songs.push(s)
    }
    return out
  }, [filter, q])

  return (
    <div className="page">
      <p className="kicker">Fanchant Guide</p>
      <h1 className="page-title">응원법</h1>
      <p className="hint">
        공식 응원법 {CHANT_ORDER.length}곡. 곡을 누르면 공식 영상과 함께 응원법을 보면서 따라 할 수 있어요.
      </p>
      <div className="chant-tools">
        <input
          className="search"
          type="search"
          placeholder="곡 이름 검색"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="곡 이름 검색"
        />
        <div className="filters">
          {FILTERS.map((f) => (
            <button key={f.id} className={'chip' + (filter === f.id ? ' on' : '')} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>
      {groups.length === 0 && <p className="hint">조건에 맞는 곡이 없어요.</p>}
      {groups.map((g) => (
        <section key={g.album} className="set-group">
          <h3>{g.album}</h3>
          <ul className="song-list">
            {g.songs.map((song) => {
              const st = loadSongState(song.id)
              const fanLines = st.cues.filter((c) => c.fan || hasPart(c.text)).length
              return (
                <li key={song.id}>
                  <button className="song-row" onClick={() => go(`#/chant/${song.id}`)}>
                    <span className="song-main">
                      <span className="song-title">{song.title}</span>
                      <span className="chant-meta">
                        <Badges song={song} compact />
                        <span>📣 {fanLines}곳</span>
                        {VIDEOS[song.id] && <span>▶ {VIDEOS[song.id].kind}</span>}
                        {st.cues.some((c) => c.t != null) && <span className="synced">⏱ 싱크됨</span>}
                      </span>
                    </span>
                    <span className="go">›</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
      <p className="hint small source">응원법 출처: {CHANT_SOURCE}</p>
    </div>
  )
}

function ChantDetail({ song, go }) {
  const state = loadSongState(song.id)
  const cues = state.cues
  const offset = state.offset || 0
  const synced = cues.some((c) => c.t != null)
  const ytId = parseYouTubeId(state.youtube)
  const source = useMemo(() => (ytId ? { type: 'youtube', id: ytId } : null), [ytId])
  const player = usePlayer(source)
  const [follow, setFollow] = useState(() => loadJSON('chant-follow', true))
  const listRef = useRef(null)
  const t = player.time + offset
  const active = synced ? activeIndex(cues, t) : -1

  const idx = CHANT_ORDER.indexOf(song.id)
  const prev = SONG_MAP[CHANT_ORDER[idx - 1]]
  const next = SONG_MAP[CHANT_ORDER[idx + 1]]

  useEffect(() => {
    if (!follow || active < 0) return
    const box = listRef.current
    const el = box?.querySelector(`[data-idx="${active}"]`)
    if (!el) return
    const r = el.getBoundingClientRect()
    // 화면 가운데 근처에 오도록 페이지를 부드럽게 스크롤
    window.scrollBy({ top: r.top - window.innerHeight * 0.45, behavior: 'smooth' })
  }, [active, follow])

  function toggleFollow() {
    setFollow(!follow)
    saveJSON('chant-follow', !follow)
  }

  return (
    <div className="page chant-detail">
      <div className="chant-side">
      <button className="text-link" onClick={() => go('#/chant')}>
        ← 응원법 전체
      </button>
      <p className="kicker">Fanchant Guide</p>
      <h1 className="page-title">{song.title}</h1>
      <p className="chant-album">
        {song.album}
        {VIDEOS[song.id] && ` · 영상: ${VIDEOS[song.id].kind}`}
      </p>
      <Badges song={song} />

      <div className="chant-player">
        {source ? (
          <div className="yt-frame" ref={player.ytHostRef} />
        ) : (
          <div className="card empty">이 곡은 아직 영상이 없어요. 연습 모드에서 유튜브 주소를 넣을 수 있어요.</div>
        )}
        <div className="chant-links">
          {ytId && (
            <a className="btn small" href={`https://www.youtube.com/watch?v=${ytId}`} target="_blank" rel="noreferrer">
              ▶ 유튜브에서 보기 ↗
            </a>
          )}
          <a className="btn small" href={melonUrl(song)} target="_blank" rel="noreferrer">
            🍈 멜론에서 듣기 ↗
          </a>
          <button className="btn small primary" onClick={() => go(`#/practice/${song.id}`)}>
            📣 연습 모드
          </button>
        </div>
      </div>

      <div className="card legend-card">
        <h3>보는 법</h3>
        <ul>
          <li>
            <span className="lg fan">파란 굵은 줄</span> 다 같이 외쳐요
          </li>
          <li>
            <span className="lg">줄 안의 <mark className="fan-part">파란 글자</mark></span> 그 부분만 외쳐요
          </li>
          <li>
            <span className="lg member">흰 글씨</span> 멤버 파트 (듣기)
          </li>
        </ul>
        {synced ? (
          <button className={'chip' + (follow ? ' on' : '')} onClick={toggleFollow}>
            {follow ? '자동 따라가기 켜짐' : '자동 따라가기 꺼짐'}
          </button>
        ) : (
          <p className="hint small">
            ⏱ 아직 싱크 전이라 직접 스크롤하며 따라가요. 「연습 모드」에서 싱크를 맞추면 영상에 맞춰 자동으로 따라가요.
          </p>
        )}
      </div>
      </div>

      <div className="chant-main">
      <ol className="chant-lines" ref={listRef}>
        {cues.map((c, i) => (
          <li
            key={i}
            data-idx={i}
            className={'chant-line' + (c.fan ? ' fan' : '') + (i === active ? ' active' : '') + (synced && i < active ? ' past' : '')}
          >
            <button
              disabled={c.t == null || !player.ready}
              onClick={() => {
                player.seek(Math.max(0, c.t - offset - 0.3))
                player.play()
              }}
            >
              <CueText text={c.text} />
            </button>
          </li>
        ))}
      </ol>

      <nav className="prev-next">
        {prev ? (
          <button className="text-link" onClick={() => go(`#/chant/${prev.id}`)}>
            ← {prev.short || prev.title}
          </button>
        ) : (
          <span />
        )}
        {next && (
          <button className="text-link" onClick={() => go(`#/chant/${next.id}`)}>
            {next.short || next.title} →
          </button>
        )}
      </nav>
      <p className="hint small source">응원법 출처: {CHANT_SOURCE}</p>
      </div>
    </div>
  )
}
