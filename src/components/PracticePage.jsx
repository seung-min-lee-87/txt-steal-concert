import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SONGS, SONG_MAP } from '../data/songs'
import { APPEARANCES } from '../data/setlists'
import { DEFAULT_CHEERS } from '../data/cheers'
import { loadJSON, saveJSON, putAudio, getAudio, deleteAudio } from '../lib/storage'
import { usePlayer, parseYouTubeId } from '../lib/usePlayer'
import { activeIndex, nextTime, formatTime } from '../lib/cues'
import Badges from './Badges'
import CueEditor from './CueEditor'
import CueText, { hasPart } from './CueText'
import BundleCard from './BundleCard'

const RATES = [0.5, 0.75, 1, 1.25]

export function loadSongState(id) {
  const base = { youtube: '', cues: [], offset: 0, source: 'youtube', ...(DEFAULT_CHEERS[id] || {}) }
  const mine = loadJSON('song:' + id, {})
  // 내 기기에 저장된 값이 우선. 단, 비어 있으면 사이트 기본값을 쓴다.
  return {
    ...base,
    ...mine,
    youtube: mine.youtube || base.youtube,
    cues: mine.cues?.length ? mine.cues : base.cues,
  }
}

export default function PracticePage({ songId, go, hasCheer, onSaved }) {
  if (!songId || !SONG_MAP[songId]) return <SongPicker go={go} hasCheer={hasCheer} onSaved={onSaved} />
  return <Practice key={songId} song={SONG_MAP[songId]} go={go} onSaved={onSaved} />
}

function SongPicker({ go, hasCheer, onSaved }) {
  const ready = SONGS.filter((s) => hasCheer(s.id))
  const rest = SONGS.filter((s) => !hasCheer(s.id))
  const order = (s) => (s.isNew ? 0 : APPEARANCES[s.id] ? 1 : 2)
  rest.sort((a, b) => order(a) - order(b))
  return (
    <div className="page">
      <p className="kicker">Fanchant Practice</p>
      <h1 className="page-title">응원법 연습</h1>
      <div className="card howto">
        <h3>연습 모드 사용법</h3>
        <ol>
          <li>연습할 곡을 골라요. 공식 응원법과 유튜브 영상이 미리 들어 있어요. (원하면 다른 영상이나 내 음악 파일로 바꿀 수 있어요)</li>
                    <li>「싱크 맞추기」를 누르고, 노래를 들으면서 줄이 바뀔 때마다 큰 버튼을 톡 눌러요.</li>
          <li>「연습」 탭에서 노래방처럼 따라 외치기! 외워졌다면 🙈 가리기 모드로 시험해봐요.</li>
        </ol>
      </div>
      <BundleCard onSaved={onSaved} />
      {ready.length > 0 && (
        <>
          <h2 className="section-title">📣 응원법 준비된 곡 <span className="en">Ready</span></h2>
          <SongList songs={ready} go={go} hasCheer={hasCheer} />
        </>
      )}
      <h2 className="section-title">전체 곡 <span className="en">All Songs</span></h2>
      <SongList songs={rest} go={go} hasCheer={hasCheer} />
    </div>
  )
}

function SongList({ songs, go, hasCheer }) {
  return (
    <ul className="song-list">
      {songs.map((song) => (
        <li key={song.id}>
          <button className="song-row" onClick={() => go(`#/practice/${song.id}`)}>
            <span className="song-main">
              <span className="song-title">{song.short || song.title}</span>
              <Badges song={song} hasCheer={hasCheer(song.id)} compact />
            </span>
            <span className="go">›</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

function Practice({ song, go, onSaved }) {
  const [state, setState] = useState(() => loadSongState(song.id))
  const [mode, setMode] = useState(() => (loadSongState(song.id).cues.length ? 'practice' : 'edit'))
  const [fileInfo, setFileInfo] = useState(null) // { url, name }
  const [ytInput, setYtInput] = useState(state.youtube)
  const [rate, setRateState] = useState(1)
  const [loopIdx, setLoopIdx] = useState(null)
  const [hide, setHide] = useState(false)
  const [peek, setPeek] = useState({})
  const listRef = useRef(null)

  const update = useCallback(
    (patch) => {
      setState((prev) => {
        const next = { ...prev, ...patch }
        saveJSON('song:' + song.id, next)
        return next
      })
      onSaved?.()
    },
    [song.id, onSaved],
  )

  // 저장해둔 음악 파일 불러오기
  useEffect(() => {
    let url
    getAudio(song.id).then((rec) => {
      if (!rec) return
      url = URL.createObjectURL(rec.blob)
      setFileInfo({ url, name: rec.name })
    })
    return () => url && URL.revokeObjectURL(url)
  }, [song.id])

  const ytId = parseYouTubeId(state.youtube)
  const source = useMemo(() => {
    if (state.source === 'file' && fileInfo) return { type: 'file', url: fileInfo.url }
    if (state.source === 'youtube' && ytId) return { type: 'youtube', id: ytId }
    return null
  }, [state.source, fileInfo, ytId])

  const player = usePlayer(source)
  const { time, playing, duration, play, pause, seek, setRate, getTime } = player
  const offset = state.offset || 0
  const t = time + offset
  const cues = state.cues
  const active = activeIndex(cues, t)
  const timed = cues.some((c) => c.t != null)

  // 한 줄 반복
  useEffect(() => {
    if (loopIdx == null || !playing) return
    const start = cues[loopIdx]?.t
    if (start == null) return
    const end = nextTime(cues, loopIdx) ?? start + 6
    if (t >= end - 0.05 || t < start - 1.5) seek(Math.max(0, start - offset - 0.8))
  }, [t, loopIdx, playing, cues, seek, offset])

  // 지금 줄이 화면 가운데 오도록 스크롤
  useEffect(() => {
    if (mode !== 'practice') return
    const box = listRef.current
    const el = box?.querySelector(`[data-idx="${active}"]`)
    if (!box || !el) return
    const target = el.offsetTop - box.clientHeight / 2 + el.clientHeight / 2
    box.scrollTo({ top: target, behavior: 'smooth' })
  }, [active, mode])

  // 키보드: 스페이스 = 재생/정지 (연습 탭에서만)
  useEffect(() => {
    if (mode !== 'practice') return
    const onKey = (e) => {
      if (e.target.closest('input, textarea, select')) return
      if (e.code === 'Space') {
        e.preventDefault()
        playing ? pause() : play()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mode, playing, play, pause])

  function changeRate(r) {
    setRateState(r)
    setRate(r)
  }

  function jumpLine(delta) {
    const timedIdx = cues.map((c, i) => (c.t != null ? i : -1)).filter((i) => i >= 0)
    if (!timedIdx.length) return
    const pos = timedIdx.indexOf(active)
    const target = timedIdx[Math.min(timedIdx.length - 1, Math.max(0, pos + delta))]
    seek(Math.max(0, cues[target].t - offset - 0.3))
  }

  async function onPickFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (fileInfo) URL.revokeObjectURL(fileInfo.url)
    setFileInfo({ url: URL.createObjectURL(file), name: file.name })
    update({ source: 'file' })
    await putAudio(song.id, file)
  }

  function removeFile() {
    if (fileInfo) URL.revokeObjectURL(fileInfo.url)
    setFileInfo(null)
    deleteAudio(song.id)
    update({ source: 'youtube' })
  }

  function saveYouTube() {
    update({ youtube: ytInput.trim(), source: 'youtube' })
  }

  const cur = cues[active]
  const nextIdx = cues.findIndex((c, i) => i > active && c.t != null)
  const next = cues[nextIdx]
  const untilNext = next ? next.t - t : null
  const curStart = cur?.t ?? 0
  const progress = next && cur ? Math.min(1, Math.max(0, (t - curStart) / (next.t - curStart))) : 0
  const searchQuery = encodeURIComponent(`TXT ${song.short || song.title}`)

  return (
    <div className="page practice">
      <div className="practice-head">
        <button className="back" onClick={() => go('#/practice')} aria-label="곡 목록으로">
          ‹
        </button>
        <div>
          <h1 className="page-title tight">{song.title}</h1>
          <Badges song={song} hasCheer={cues.length > 0} />
        </div>
      </div>

      <div className="practice-layout">
        <div className="practice-left">
          <section className="card source">
            <div className="seg">
              <button className={state.source === 'youtube' ? 'on' : ''} onClick={() => update({ source: 'youtube' })}>
                ▶️ 유튜브
              </button>
              <button
                className={state.source === 'file' ? 'on' : ''}
                onClick={() => (fileInfo ? update({ source: 'file' }) : document.getElementById('file-pick').click())}
              >
                🎧 내 음악 파일
              </button>
            </div>
            {state.source === 'youtube' ? (
              <div className="yt-input">
                <input
                  type="url"
                  inputMode="url"
                  placeholder="유튜브 주소 붙여넣기 (뮤비·음원 영상)"
                  value={ytInput}
                  onChange={(e) => setYtInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveYouTube()}
                />
                <button className="btn small" onClick={saveYouTube} disabled={ytInput.trim() === state.youtube}>
                  적용
                </button>
                {!ytId && (
                  <a
                    className="hint small"
                    href={`https://www.youtube.com/results?search_query=${searchQuery}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    유튜브에서 이 곡 찾기 ↗
                  </a>
                )}
              </div>
            ) : (
              <div className="file-row">
                <span className="file-name">{fileInfo ? `🎵 ${fileInfo.name}` : '파일을 골라주세요'}</span>
                <label className="btn small" htmlFor="file-pick">
                  다른 파일
                </label>
                {fileInfo && (
                  <button className="btn small ghost" onClick={removeFile}>
                    삭제
                  </button>
                )}
              </div>
            )}
            <input id="file-pick" type="file" accept="audio/*,video/*" hidden onChange={onPickFile} />
            <div className={'yt-frame' + (source?.type === 'youtube' ? '' : ' hidden')} ref={player.ytHostRef} />
            <audio ref={player.audioRef} preload="auto" />
            {!source && <p className="hint small">음원을 정하면 재생 버튼이 켜져요.</p>}
          </section>

          <section className="card transport">
            <input
              className="seekbar"
              type="range"
              min="0"
              max={duration || 1}
              step="0.1"
              value={Math.min(time, duration || 1)}
              onChange={(e) => seek(Number(e.target.value))}
              disabled={!player.ready}
              aria-label="재생 위치"
            />
            <div className="time-row">
              <span>{formatTime(time)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="buttons">
              <button className="icon-btn" onClick={() => jumpLine(-1)} disabled={!player.ready} aria-label="이전 줄">
                ⏮
              </button>
              <button className="icon-btn" onClick={() => seek(getTime() - 5)} disabled={!player.ready} aria-label="5초 뒤로">
                ↺5
              </button>
              <button
                className="icon-btn big"
                onClick={() => (playing ? pause() : play())}
                disabled={!player.ready}
                aria-label={playing ? '일시정지' : '재생'}
              >
                {playing ? '⏸' : '▶'}
              </button>
              <button className="icon-btn" onClick={() => seek(getTime() + 5)} disabled={!player.ready} aria-label="5초 앞으로">
                5↻
              </button>
              <button className="icon-btn" onClick={() => jumpLine(1)} disabled={!player.ready} aria-label="다음 줄">
                ⏭
              </button>
            </div>
            <div className="options">
              <div className="rates" role="group" aria-label="재생 속도">
                {RATES.map((r) => (
                  <button key={r} className={'chip' + (rate === r ? ' on' : '')} onClick={() => changeRate(r)}>
                    {r}x
                  </button>
                ))}
              </div>
              <button
                className={'chip' + (loopIdx != null ? ' on' : '')}
                onClick={() => setLoopIdx(loopIdx != null ? null : Math.max(0, active))}
                disabled={!timed}
              >
                🔂 {loopIdx != null ? `${loopIdx + 1}번째 줄 반복 중` : '이 줄 반복'}
              </button>
              <button className={'chip' + (hide ? ' on' : '')} onClick={() => { setHide(!hide); setPeek({}) }}>
                🙈 가리기 {hide ? 'ON' : 'OFF'}
              </button>
            </div>
          </section>
        </div>

        <div className="practice-right">
          <div className="tabs" role="tablist">
            <button
              role="tab"
              aria-selected={mode === 'practice'}
              className={'tab' + (mode === 'practice' ? ' on' : '')}
              onClick={() => setMode('practice')}
            >
              📣 연습
            </button>
            <button
              role="tab"
              aria-selected={mode === 'edit'}
              className={'tab' + (mode === 'edit' ? ' on' : '')}
              onClick={() => setMode('edit')}
            >
              ✏️ 편집 · 싱크 맞추기
            </button>
          </div>

          {mode === 'practice' && (
            <>
              {!cues.length ? (
                <div className="card empty">
                  <p>아직 이 곡의 응원법이 없어요.</p>
                  <button className="btn primary" onClick={() => setMode('edit')}>
                    ✏️ 응원법 넣으러 가기
                  </button>
                </div>
              ) : (
                <>
                  <div className={'now card' + (cur?.fan ? ' fan' : cur && hasPart(cur.text) ? ' part' : '')}>
                    <p className="now-label">
                      {!timed
                        ? '편집 탭에서 싱크를 맞추면 자동으로 따라가요'
                        : cur
                          ? cur.fan
                            ? '📣 다 같이!'
                            : hasPart(cur.text)
                              ? '📣 파란 부분 같이!'
                              : '🎤 멤버 파트'
                          : '곧 시작해요'}
                    </p>
                    <p className="now-text">
                      {cur ? (
                        hide && cur.fan && !peek[active] ? (
                          '● ● ●'
                        ) : (
                          <CueText text={cur.text} masked={hide && !peek[active]} />
                        )
                      ) : (
                        '…'
                      )}
                    </p>
                    {next && (
                      <>
                        <div className="now-bar">
                          <span style={{ transform: `scaleX(${progress})` }} />
                        </div>
                        <p className={'now-next' + (next.fan ? ' fan' : '')}>
                          다음{untilNext != null && untilNext < 3 ? ` (${Math.max(0, untilNext).toFixed(1)}초)` : ''}:{' '}
                          {next.fan ? '📣 ' : ''}
                          {hide && next.fan ? '● ● ●' : <CueText text={next.text} masked={hide} />}
                        </p>
                      </>
                    )}
                  </div>
                  <ol className="cue-list" ref={listRef}>
                    {cues.map((c, i) => {
                      const hidden = hide && i >= active && !peek[i]
                      const masked = hidden && c.fan
                      return (
                        <li
                          key={i}
                          data-idx={i}
                          className={
                            'cue' + (c.fan ? ' fan' : '') + (i === active ? ' active' : '') + (i < active ? ' past' : '')
                          }
                        >
                          <button
                            onClick={() => {
                              if (hidden && (c.fan || hasPart(c.text))) setPeek({ ...peek, [i]: true })
                              else if (c.t != null) seek(Math.max(0, c.t - offset - 0.3))
                            }}
                          >
                            <span className="cue-time">{c.t != null ? formatTime(c.t) : '--'}</span>
                            <span className="cue-text">
                              {masked ? '● ● ● (눌러서 보기)' : <CueText text={c.text} masked={hidden} />}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ol>
                  <p className="hint small">줄을 누르면 그 부분부터 재생돼요. PC에서는 스페이스바로 재생/정지.</p>
                </>
              )}
            </>
          )}

          {mode === 'edit' && (
            <CueEditor song={song} state={state} update={update} player={player} t={t} />
          )}
        </div>
      </div>
    </div>
  )
}
