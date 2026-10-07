import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { usePlayer } from './usePlayer'
import { activeIndex } from './cues'
import { SONG_MAP } from '../data/songs'
import { CHANT_ORDER, videoOffset } from '../data/cheers'
import { loadSongState } from '../components/PracticePage'
import CueText from '../components/CueText'

// 사이트 전체에서 하나만 쓰는 재생기.
// 페이지를 옮겨도 음악이 끊기지 않도록 재생기(유튜브 iframe·audio)는 App 바깥쪽에 계속 둔다.
// - 응원법/연습 페이지는 영상 자리(slot)만 만들고, 재생기가 그 자리 위에 겹쳐 보이게 한다.
// - 다른 메뉴로 가면 화면 아래 미니 플레이어로 줄어든다.

const Ctx = createContext(null)

const sourceKey = (s) => (s ? `${s.type}:${s.id || s.url}` : null)

const IDLE = {
  ready: false,
  playing: false,
  duration: 0,
  time: 0,
  getTime: () => 0,
  play: () => {},
  pause: () => {},
  seek: () => {},
  setRate: () => {},
}

export function PlayerProvider({ children, go }) {
  const [track, setTrack] = useState(null) // { songId, source }
  const player = usePlayer(track?.source || null)
  const [slot, setSlot] = useState(null)
  const [onPage, setOnPage] = useState(false) // 지금 화면이 재생 중인 곡의 페이지인지
  const pendingPlay = useRef(false)

  const load = useCallback((songId, source, autoplay = false) => {
    pendingPlay.current = autoplay
    setTrack((cur) => (cur && cur.songId === songId && sourceKey(cur.source) === sourceKey(source) ? cur : { songId, source }))
  }, [])

  const stop = useCallback(() => {
    player.pause()
    setTrack(null)
  }, [player])

  // "이 곡 재생"으로 불러왔으면 준비되는 대로 재생
  const { ready, play } = player
  useEffect(() => {
    if (ready && pendingPlay.current) {
      pendingPlay.current = false
      play()
    }
  }, [ready, play])

  const value = useMemo(() => ({ track, player, load, stop, registerSlot: setSlot, setOnPage }), [track, player, load, stop])

  return (
    <Ctx.Provider value={value}>
      {children}
      <GlobalPlayer track={track} player={player} slot={slot} onPage={onPage} stop={stop} go={go} />
    </Ctx.Provider>
  )
}

// 페이지에서 쓰는 훅. 이 곡이 지금 재생기에 올라가 있으면 active.
export function useSongPlayer(songId, source) {
  const g = useContext(Ctx)
  const key = sourceKey(source)
  const active = !!key && g.track?.songId === songId && sourceKey(g.track.source) === key
  const { track, load } = g
  const othersPlaying = g.player.playing

  // 지금 아무것도 재생 중이 아니면 바로 이 곡을 올린다.
  // 다른 곡이 재생 중이면 끊지 않고 "이 곡 재생" 버튼을 보여준다.
  useEffect(() => {
    if (!key) return
    if (!track || !othersPlaying) load(songId, source)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, songId])

  // 재생 중인 곡의 페이지에 있으면 미니 플레이어를 숨긴다 (페이지에 재생 버튼이 이미 있으니까)
  const { setOnPage } = g
  useEffect(() => {
    if (!active) return
    setOnPage(true)
    return () => setOnPage(false)
  }, [active, setOnPage])

  return {
    player: active ? g.player : IDLE,
    active,
    slotRef: g.registerSlot,
    activate: () => load(songId, source, true),
    otherPlaying: !!track && !active && othersPlaying,
  }
}

function GlobalPlayer({ track, player, slot, onPage, stop, go }) {
  const boxRef = useRef(null)
  const isVideo = track?.source?.type === 'youtube'

  // 페이지의 영상 자리 위에 재생기를 겹쳐 놓는다 (스크롤해도 따라가게 매 프레임 위치 갱신)
  useEffect(() => {
    const box = boxRef.current
    if (!box) return
    if (!slot) {
      box.style.cssText = ''
      return
    }
    let raf
    const tick = () => {
      const r = slot.getBoundingClientRect()
      box.style.cssText = `top:${r.top}px;left:${r.left}px;width:${r.width}px;height:${r.height}px;`
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(raf)
  }, [slot])

  const mode = !track ? 'off' : slot ? 'slot' : onPage ? 'page' : 'mini'

  return (
    <>
      <div ref={boxRef} className={`gp-video ${isVideo ? mode : 'off'}`}>
        <div className="gp-host" ref={player.ytHostRef} />
      </div>
      <audio ref={player.audioRef} preload="auto" />
      {mode === 'mini' && <MiniBar track={track} player={player} stop={stop} go={go} isVideo={isVideo} />}
    </>
  )
}

function MiniBar({ track, player, stop, go, isVideo }) {
  const song = SONG_MAP[track.songId]
  const state = useMemo(() => loadSongState(track.songId), [track.songId])
  const vid = track.source.type === 'youtube' ? track.source.id : null
  const offset = vid ? videoOffset(track.songId, state, vid).offset : state.offset || 0
  const idx = activeIndex(state.cues, player.time + offset)
  const line = state.cues[idx]
  // 내 음악 파일은 연습 화면에서, 유튜브는 응원법 화면(있으면)에서 재생 중인 그 영상을 보여준다
  const href =
    track.source.type === 'youtube' && CHANT_ORDER.includes(track.songId) ? `#/chant/${track.songId}` : `#/practice/${track.songId}`

  return (
    <div className={'gp-mini' + (isVideo ? ' with-video' : '')}>
      {!isVideo && <span className="gp-icon" aria-hidden="true">🎧</span>}
      <button className="gp-info" onClick={() => go(href)} aria-label={`${song?.title} 응원법 화면으로`}>
        <span className="gp-title">{song?.short || song?.title}</span>
        <span className={'gp-line' + (line?.fan ? ' fan' : '')}>
          {line ? <CueText text={line.text} /> : player.playing ? '♪' : '일시정지됨'}
        </span>
      </button>
      <button
        className="icon-btn gp-play"
        onClick={() => (player.playing ? player.pause() : player.play())}
        disabled={!player.ready}
        aria-label={player.playing ? '일시정지' : '재생'}
      >
        {player.playing ? '⏸' : '▶'}
      </button>
      <button className="gp-close" onClick={stop} aria-label="재생 끄기">
        ✕
      </button>
    </div>
  )
}
