// 사이트에 기본으로 들어가는 응원법 + 유튜브 영상.
// 응원법: 나무위키 「투모로우바이투게더/응원법」 (CC BY-NC-SA 2.0 KR) 을 정리한 chants.json
// 내가 편집·싱크한 내용은 기기에 따로 저장되어 이 기본값보다 우선한다.
import CHANTS from './chants.json'
import { VIDEOS } from './videos'

export const CHANT_SOURCE = CHANTS.source
export const CHANT_ORDER = CHANTS.order

export const DEFAULT_CHEERS = {}
for (const [id, v] of Object.entries(VIDEOS)) DEFAULT_CHEERS[id] = { youtube: v.id }
for (const [id, v] of Object.entries(CHANTS.songs)) DEFAULT_CHEERS[id] = { ...DEFAULT_CHEERS[id], cues: v.cues }
