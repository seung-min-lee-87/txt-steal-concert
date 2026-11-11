import { VIDEOS } from '../data/videos'
import { stagesOf, stageLabel } from '../data/stages'
import { parseYouTubeId } from './usePlayer'

// 곡별로 고를 수 있는 영상: 연습용(음원 길이) 영상, 공식 MV, 음악방송 무대(팬 응원 소리)
export function videoOptions(songId, state) {
  const video = VIDEOS[songId]
  const stages = stagesOf(songId).map((s) => ({ key: s.id, label: s.label || '📣 ' + stageLabel(s), id: s.id, stage: s }))
  const groups = {
    main: state.youtube ? [{ key: 'main', label: video?.kind || '영상', id: parseYouTubeId(state.youtube) }] : [],
    mv: video?.mv ? [{ key: 'mv', label: '공식 MV', id: video.mv }] : [],
    stage: stages.filter((o) => !o.stage.first),
  }
  // 버튼 순서: videos.js 의 order (예: ['mv', 'stage', 'main']). 없으면 연습 영상 → MV → 무대.
  // first: true 인 무대 영상은 항상 맨 앞.
  const order = video?.order || ['main', 'mv', 'stage']
  return [...stages.filter((o) => o.stage.first), ...order.flatMap((g) => groups[g] || [])]
}
