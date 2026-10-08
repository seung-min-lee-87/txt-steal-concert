import { VIDEOS } from '../data/videos'
import { stagesOf, stageLabel } from '../data/stages'
import { parseYouTubeId } from './usePlayer'

// 곡별로 고를 수 있는 영상: 연습용(음원 길이) 영상, 공식 MV, 음악방송 무대(팬 응원 소리)
export function videoOptions(songId, state) {
  const video = VIDEOS[songId]
  return [
    ...(state.youtube ? [{ key: 'main', label: video?.kind || '영상', id: parseYouTubeId(state.youtube) }] : []),
    ...(video?.mv ? [{ key: 'mv', label: '공식 MV', id: video.mv }] : []),
    ...stagesOf(songId).map((s) => ({ key: s.id, label: '📣 ' + stageLabel(s), id: s.id, stage: s })),
  ]
}
