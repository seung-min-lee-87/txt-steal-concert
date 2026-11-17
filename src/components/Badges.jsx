import { APPEARANCES, SETLISTS } from '../data/setlists'
import { tr, trData } from '../lib/i18n'

export const LEGEND = [
  { icon: '👑', label: '타이틀곡' },
  { icon: '💿', label: '수록곡' },
  { icon: '🎤', label: '솔로곡' },
  { icon: '🇯🇵', label: '일본곡 / 일본어 ver.' },
  { icon: '✨', label: '신곡 (아직 라이브 전)' },
  { icon: '🎬', label: 'OST' },
  { icon: '🔁', label: '지난 투어에서 부른 곡' },
  { icon: '📣', label: '내 응원법 준비됨' },
]

const SETLIST_LABEL = Object.fromEntries(SETLISTS.map((s) => [s.id, s.label]))

export function songBadges(song, { jpVer = false, hasCheer = false } = {}) {
  const out = []
  if (song.title_) out.push({ icon: '👑', label: tr('타이틀') })
  if (song.solo) out.push({ icon: '🎤', label: trData(`${song.solo} 솔로`) })
  if (song.ost) out.push({ icon: '🎬', label: 'OST' })
  else if (!song.title_ && !song.solo && !song.jp) out.push({ icon: '💿', label: tr('수록곡') })
  if (song.jp) out.push({ icon: '🇯🇵', label: tr('일본곡') })
  else if (jpVer) out.push({ icon: '🇯🇵', label: tr('일본어 ver.') })
  if (song.isNew) out.push({ icon: '✨', label: tr('신곡') })
  const seen = APPEARANCES[song.id]
  if (seen?.length) {
    // 많으면 "n개 공연"으로 줄이고, 전체 목록은 마우스를 올리면 보이게
    const all = seen.map((id) => trData(SETLIST_LABEL[id])).join(' · ')
    out.push({ icon: '🔁', label: seen.length <= 2 ? all : tr('지난 공연 {n}회', { n: seen.length }), title: all })
  }
  if (hasCheer) out.push({ icon: '📣', label: tr('응원법') })
  return out
}

export default function Badges({ song, jpVer, hasCheer, compact = false }) {
  return (
    <span className={'badges' + (compact ? ' compact' : '')}>
      {songBadges(song, { jpVer, hasCheer }).map((b) => (
        <span key={b.icon + b.label} className="badge" title={b.title || b.label}>
          <span aria-hidden="true">{b.icon}</span>
          {!compact && <span className="badge-label">{b.label}</span>}
          {compact && <span className="sr-only">{b.label}</span>}
        </span>
      ))}
    </span>
  )
}

export function Legend() {
  return (
    <div className="legend">
      {LEGEND.map((l) => (
        <span key={l.icon} className="legend-item">
          <span aria-hidden="true">{l.icon}</span> {tr(l.label)}
        </span>
      ))}
    </div>
  )
}
