// 사이트에 기본으로 들어가는 응원법 + 유튜브 영상.
// 응원법: 나무위키 「투모로우바이투게더/응원법」 (CC BY-NC-SA 2.0 KR) 을 정리한 chants.json
// 줄별 시간(t)은 음원 기준. 영상(MV 등)은 앞부분 길이가 달라서 offset으로 맞춘다.
// 내가 편집·싱크한 내용은 기기에 따로 저장되어 이 기본값보다 우선한다.
import CHANTS from './chants.json'
import { VIDEOS } from './videos'
import { findStage } from './stages'

// 테스트 페이지(#/sync)에서 맞춰 내보낸 공개 싱크 파일들 (src/data/sync/곡id.json)
const SYNC_FILES = import.meta.glob('./sync/*.json', { eager: true, import: 'default' })
export const PUBLISHED_SYNC = Object.fromEntries(
  Object.entries(SYNC_FILES).map(([path, v]) => [path.match(/([^/]+)\.json$/)[1], v]),
)

export const CHANT_SOURCE = CHANTS.source
export const TIMING_SOURCE = CHANTS.timingSource
export const CHANT_ORDER = CHANTS.order

// 영상 길이와 음원 길이 차이로 시작 위치를 추정한다.
// - 3초 이내: 같은 음원으로 보고 그대로(확실)
// - 영상이 10초 이내로 더 길면: 앞에 그만큼 여유가 있다고 추정
// - 그 외(MV 등): 알 수 없음 → "한 번에 맞추기" 필요
export function guessOffset(id) {
  const v = VIDEOS[id]
  const d = CHANTS.songs[id]?.duration
  if (!v?.dur || !d) return { offset: 0, sure: false }
  const diff = d - v.dur
  if (Math.abs(diff) <= 3) return { offset: 0, sure: true }
  if (diff < 0 && diff >= -10) return { offset: Math.round(diff * 10) / 10, sure: false }
  return { offset: 0, sure: false }
}

// 특정 유튜브 영상에서 쓸 시간 보정값. 내가 맞춘 값(state.offsets)이 있으면 그걸 쓴다.
export function videoOffset(songId, state, vid) {
  const mine = state.offsets?.[vid]
  if (mine != null) return { offset: mine, sure: true }
  const published = PUBLISHED_SYNC[songId]?.offsets?.[vid]
  if (published != null) return { offset: published, sure: true }
  if (vid && vid === VIDEOS[songId]?.id) return guessOffset(songId)
  const st = findStage(songId, vid)
  if (st?.offset != null) return { offset: st.offset, sure: true }
  return { offset: 0, sure: false }
}

export function chantMeta(id) {
  const s = CHANTS.songs[id]
  return s ? { anchor: s.anchor ?? 0, duration: s.duration, source: s.source || CHANTS.source } : null
}

export const DEFAULT_CHEERS = {}
for (const [id, v] of Object.entries(VIDEOS)) DEFAULT_CHEERS[id] = { youtube: v.id }
for (const [id, v] of Object.entries(CHANTS.songs)) {
  DEFAULT_CHEERS[id] = { ...DEFAULT_CHEERS[id], cues: applyTimes(v.cues, PUBLISHED_SYNC[id]?.times) }
}

// 공개 싱크의 줄별 시간을 덮어쓴다. 응원법 줄 수가 바뀌었으면(가사 수정 등) 어긋나니까 쓰지 않는다.
export function applyTimes(cues, times) {
  if (!times || times.length !== cues.length) return cues
  return cues.map((c, i) => ({ ...c, t: times[i] }))
}
