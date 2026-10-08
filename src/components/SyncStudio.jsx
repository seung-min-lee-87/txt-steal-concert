// 싱크 맞추기 테스트 페이지 (#/sync/곡id) — 메뉴에는 없고 주소로만 들어온다.
// 여기서 맞춘 값은 이 기기에 "초안"으로만 저장되고, 공개 화면에는 영향을 주지 않는다.
// "내보내기"로 만든 파일을 GitHub의 src/data/sync/곡id.json 에 올리면 모든 방문자의 기본값이 된다.
import { useEffect, useMemo, useRef, useState } from 'react'
import { SONG_MAP } from '../data/songs'
import { CHANT_ORDER, DEFAULT_CHEERS, PUBLISHED_SYNC, chantMeta, videoOffset } from '../data/cheers'
import { useSongPlayer } from '../lib/PlayerContext'
import { videoOptions } from '../lib/videoOptions'
import { activeIndex, formatTime } from '../lib/cues'
import { loadJSON, saveJSON } from '../lib/storage'
import VideoSlot from './VideoSlot'
import CueText from './CueText'
import SyncCalibrator, { REACTION } from './SyncCalibrator'

const REPO = 'https://github.com/seung-min-lee-87/txt-steal-concert'
const RATES = [1, 0.75, 0.5]
const r2 = (n) => Math.round(n * 100) / 100

export default function SyncStudio({ songId, go }) {
  const id = SONG_MAP[songId] && CHANT_ORDER.includes(songId) ? songId : CHANT_ORDER[0]
  return <Studio key={id} song={SONG_MAP[id]} go={go} />
}

function Studio({ song, go }) {
  const base = useMemo(() => ({ youtube: '', cues: [], ...DEFAULT_CHEERS[song.id] }), [song.id])
  const [draft, setDraftState] = useState(() => loadJSON('syncdraft:' + song.id, { times: {}, offsets: {} }))
  const setDraft = (next) => {
    setDraftState(next)
    saveJSON('syncdraft:' + song.id, next)
  }

  const options = videoOptions(song.id, base)
  const [which, setWhich] = useState('main')
  const picked = options.find((o) => o.key === which) || options[0]
  const vid = picked?.id || null
  const source = useMemo(() => (vid ? { type: 'youtube', id: vid } : null), [vid])
  const sp = useSongPlayer(song.id, source)
  const player = sp.player

  // 공개 기본값 + 이 기기의 초안
  const cues = base.cues.map((c, i) => (draft.times[i] != null ? { ...c, t: draft.times[i] } : c))
  const guess = videoOffset(song.id, {}, vid)
  const offset = draft.offsets[vid] ?? guess.offset
  const sure = draft.offsets[vid] != null || guess.sure
  const [calibrating, setCalibrating] = useState(false)
  const setOffset = (n) => setDraft({ ...draft, offsets: { ...draft.offsets, [vid]: n } })

  const now = player.time + offset
  const active = activeIndex(cues, now)
  const [cursor, setCursor] = useState(0)
  const [rate, setRateState] = useState(1)
  const listRef = useRef(null)

  const meta = chantMeta(song.id)
  const anchor =
    (meta && cues[meta.anchor]?.t != null && !cues[meta.anchor].fan && cues[meta.anchor]) ||
    cues.find((c) => c.t != null && !c.fan)

  function setTime(i, t) {
    setDraft({ ...draft, times: { ...draft.times, [i]: r2(Math.max(0, t)) } })
  }

  // 지금 들리는 순간을 커서 줄의 시작 시간으로 찍고 다음 줄로
  function tapNow() {
    // 느리게 재생하면 반응 시간도 영상 시간으로 그만큼 짧아진다
    setTime(cursor, player.getTime() + offset - REACTION * rate)
    setCursor(Math.min(cursor + 1, cues.length - 1))
  }

  function jumpTo(i) {
    setCursor(i)
    const t = cues[i].t
    if (t != null && player.ready) player.seek(Math.max(0, t - offset - 1.5))
  }

  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    listRef.current?.querySelector(`[data-idx="${cursor}"]`)?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [cursor])

  function changeRate() {
    const next = RATES[(RATES.indexOf(rate) + 1) % RATES.length]
    setRateState(next)
    player.setRate(next)
  }

  // 내보내기: 공개본과 초안을 합친 전체 값
  const exported = useMemo(() => {
    const offsets = { ...(PUBLISHED_SYNC[song.id]?.offsets || {}), ...draft.offsets }
    const times = cues.map((c) => (c.t == null ? null : r2(c.t)))
    return `{\n  "times": ${JSON.stringify(times)},\n  "offsets": ${JSON.stringify(offsets)}\n}\n`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft, song.id])
  const edited = Object.keys(draft.times).length + Object.keys(draft.offsets).length
  const published = !!PUBLISHED_SYNC[song.id]
  const githubUrl = published
    ? `${REPO}/edit/main/src/data/sync/${song.id}.json`
    : `${REPO}/new/main/src/data/sync?filename=${song.id}.json&value=${encodeURIComponent(exported)}`
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(exported)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="page studio">
      <p className="kicker">Sync Studio · 테스트 페이지</p>
      <h1 className="page-title">🔧 싱크 맞추기</h1>
      <select className="studio-select" value={song.id} onChange={(e) => go(`#/sync/${e.target.value}`)}>
        {CHANT_ORDER.map((sid) => (
          <option key={sid} value={sid}>
            {PUBLISHED_SYNC[sid] ? '✅ ' : ''}
            {SONG_MAP[sid]?.title}
          </option>
        ))}
      </select>

      {options.length > 1 && (
        <div
          className={'seg video-seg' + (options.length > 3 ? ' two-rows' : '')}
          style={{ gridTemplateColumns: `repeat(${options.length > 3 ? 2 : options.length}, 1fr)` }}
        >
          {options.map((o) => (
            <button key={o.key} className={picked === o ? 'on' : ''} onClick={() => setWhich(o.key)}>
              {o.label}
            </button>
          ))}
        </div>
      )}
      <div className="studio-video">
        <VideoSlot sp={sp} source={source} />
      </div>

      <div className="card studio-help">
        <b>순서</b>
        <ol>
          <li>
            <b>영상 보정</b>: 영상마다 앞부분 길이가 달라요. 아래에서 「지금!」으로 먼저 맞춰요.
          </li>
          <li>
            <b>줄별 시간</b>: 줄을 눌러 고른 뒤, 그 줄이 시작되는 순간 「⏱ 찍기」. 자동으로 다음 줄로 넘어가요. ±0.1로 미세 조정.
          </li>
          <li>
            <b>내보내기</b>: 맨 아래 버튼으로 GitHub에 올리면 공개 화면에 반영돼요.
          </li>
        </ol>
        <p className="hint small">
          줄별 시간은 음원 기준이라 한 영상에서 맞추면 다른 영상에도 그대로 쓰여요. 안무 연습 영상처럼 음원과 같은 영상에서 맞추는 게
          가장 정확해요.
        </p>
      </div>

      {vid && (
        <SyncCalibrator
          anchor={anchor}
          player={player}
          offset={offset}
          sure={sure}
          setOffset={setOffset}
          calibrating={calibrating || !sure}
          setCalibrating={setCalibrating}
        />
      )}

      <ol className="studio-lines" ref={listRef}>
        {cues.map((c, i) => (
          <li
            key={i}
            data-idx={i}
            className={
              'studio-line' +
              (c.fan ? ' fan' : '') +
              (i === active ? ' active' : '') +
              (i === cursor ? ' cursor' : '') +
              (draft.times[i] != null ? ' edited' : '')
            }
          >
            <button className="studio-text" onClick={() => jumpTo(i)}>
              <span className="studio-t">{c.t == null ? '--:--' : formatTime(c.t)}</span>
              <CueText text={c.text} />
            </button>
            <span className="studio-nudge">
              <button onClick={() => c.t != null && setTime(i, c.t - 0.1)} aria-label="0.1초 빠르게">
                −.1
              </button>
              <button onClick={() => c.t != null && setTime(i, c.t + 0.1)} aria-label="0.1초 늦게">
                +.1
              </button>
            </span>
          </li>
        ))}
      </ol>

      <div className="card studio-export">
        <h3>내보내기</h3>
        <p className="hint small">
          이 기기에서 바꾼 곳: {edited}개 {published ? '· ✅ 공개 싱크 파일 있음' : '· 아직 공개 싱크 파일 없음'}
        </p>
        <textarea readOnly value={exported} rows={4} onFocus={(e) => e.target.select()} />
        <div className="studio-export-btns">
          <button className="btn small" onClick={copy}>
            {copied ? '✔ 복사됨' : '📋 복사'}
          </button>
          <a className="btn small primary" href={githubUrl} target="_blank" rel="noreferrer">
            {published ? 'GitHub 파일 열기 ↗' : 'GitHub에 새 파일로 올리기 ↗'}
          </a>
          <button
            className="btn small ghost"
            onClick={() => window.confirm('이 기기의 초안을 지우고 공개본으로 되돌릴까요?') && setDraft({ times: {}, offsets: {} })}
          >
            초안 지우기
          </button>
        </div>
        <p className="hint small">
          {published
            ? 'GitHub 파일을 열고 ✏️ → 내용 전부 지우고 붙여넣기 → Commit changes'
            : '열린 GitHub 화면에서 바로 Commit changes만 누르면 돼요.'}
        </p>
      </div>

      {player.ready && (
        <div className="mini-player studio-bar">
          <button className="icon-btn" onClick={() => player.seek(player.getTime() - 2)} aria-label="2초 뒤로">
            ↺2
          </button>
          <button
            className="icon-btn big"
            onClick={() => (player.playing ? player.pause() : player.play())}
            aria-label={player.playing ? '일시정지' : '재생'}
          >
            {player.playing ? '⏸' : '▶'}
          </button>
          <button className="icon-btn" onClick={changeRate} aria-label="재생 속도">
            {rate}×
          </button>
          <span className="mini-time">{formatTime(player.time)}</span>
          <button className="btn primary mini-now" disabled={!player.playing || !sure} onClick={tapNow}>
            ⏱ 찍기 ({cursor + 1}번)
          </button>
        </div>
      )}
    </div>
  )
}
