import { useCallback, useEffect, useRef, useState } from 'react'

// 유튜브 주소에서 영상 ID만 뽑아낸다.
export function parseYouTubeId(input) {
  if (!input) return null
  const text = input.trim()
  if (/^[\w-]{11}$/.test(text)) return text
  const m = text.match(/(?:youtu\.be\/|v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/)
  return m ? m[1] : null
}

let ytPromise = null
function loadYouTubeAPI() {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (!ytPromise) {
    ytPromise = new Promise((resolve) => {
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        prev?.()
        resolve(window.YT)
      }
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(script)
    })
  }
  return ytPromise
}

// 유튜브 / 음악 파일을 같은 방식으로 다루기 위한 재생기 훅.
// source: { type: 'youtube', id } | { type: 'file', url } | null
export function usePlayer(source) {
  const ytHostRef = useRef(null)
  const audioRef = useRef(null)
  const ytRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [time, setTime] = useState(0)

  const type = source?.type
  const key = source?.type === 'youtube' ? source.id : source?.url

  // 유튜브 플레이어 만들기
  useEffect(() => {
    if (type !== 'youtube' || !ytHostRef.current) return
    let cancelled = false
    const host = ytHostRef.current
    const el = document.createElement('div')
    host.appendChild(el)
    loadYouTubeAPI().then((YT) => {
      if (cancelled) return
      const player = new YT.Player(el, {
        videoId: key,
        width: '100%',
        height: '100%',
        playerVars: { playsinline: 1, rel: 0, modestbranding: 1 },
        events: {
          onReady: () => {
            if (cancelled) return
            ytRef.current = player
            setDuration(player.getDuration() || 0)
            setReady(true)
          },
          onStateChange: (e) => {
            setPlaying(e.data === YT.PlayerState.PLAYING)
            const d = player.getDuration?.()
            if (d) setDuration(d)
          },
        },
      })
      ytRef.current = player
    })
    return () => {
      cancelled = true
      try {
        ytRef.current?.destroy()
      } catch {
        // 이미 사라진 경우
      }
      ytRef.current = null
      host.innerHTML = ''
      setReady(false)
      setPlaying(false)
      setDuration(0)
      setTime(0)
    }
  }, [type, key])

  // 음악 파일 연결
  useEffect(() => {
    const audio = audioRef.current
    if (type !== 'file' || !audio) return
    audio.src = key
    const onMeta = () => {
      setDuration(audio.duration || 0)
      setReady(true)
    }
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onPause)
    return () => {
      audio.pause()
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onPause)
      audio.removeAttribute('src')
      audio.load()
      setReady(false)
      setPlaying(false)
      setDuration(0)
      setTime(0)
    }
  }, [type, key])

  const getTime = useCallback(() => {
    if (type === 'youtube') return ytRef.current?.getCurrentTime?.() ?? 0
    if (type === 'file') return audioRef.current?.currentTime ?? 0
    return 0
  }, [type])

  // 재생 중에는 현재 시간을 자주 읽어온다
  useEffect(() => {
    if (!playing) return
    let raf
    const tick = () => {
      setTime(getTime())
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing, getTime])

  const play = useCallback(() => {
    if (type === 'youtube') ytRef.current?.playVideo?.()
    else if (type === 'file') audioRef.current?.play().catch(() => {})
  }, [type])

  const pause = useCallback(() => {
    if (type === 'youtube') ytRef.current?.pauseVideo?.()
    else if (type === 'file') audioRef.current?.pause()
  }, [type])

  const seek = useCallback(
    (t) => {
      const target = Math.max(0, t)
      if (type === 'youtube') ytRef.current?.seekTo?.(target, true)
      else if (type === 'file' && audioRef.current) audioRef.current.currentTime = target
      setTime(target)
    },
    [type],
  )

  const setRate = useCallback(
    (r) => {
      if (type === 'youtube') ytRef.current?.setPlaybackRate?.(r)
      else if (type === 'file' && audioRef.current) audioRef.current.playbackRate = r
    },
    [type],
  )

  return { ytHostRef, audioRef, ready, playing, duration, time, getTime, play, pause, seek, setRate }
}
