// 영상과 응원법 시간을 "한 번에 맞추기".
// 기준 줄(첫 가사)이 들리는 순간 버튼을 누르면, 그 차이만큼 전체 시간을 옮긴다.
import CueText from './CueText'
import { tr } from '../lib/i18n'

// 사람이 듣고 누르기까지 걸리는 시간 (초)
export const REACTION = 0.2

export function calibrate(anchor, player, setOffset) {
  if (!anchor) return
  setOffset(Math.round((anchor.t - player.getTime() + REACTION) * 10) / 10)
}

// onReset: 이 기기에 저장된 내 보정값이 공개 싱크와 다를 때만 넘어온다 (공개 싱크로 되돌리기 버튼)
export default function SyncCalibrator({ anchor, player, offset, sure, setOffset, calibrating, setCalibrating, onReset }) {
  if (!anchor) return null
  const nudge = (d) => setOffset(Math.round((offset + d) * 10) / 10)

  if (!calibrating && sure) {
    return (
      <div className="calib ok">
        <p>
          {tr('✓ 영상과 맞춰져 있어요')} <span className="calib-num">{tr('보정 {v}초', { v: (offset > 0 ? '+' : '') + offset.toFixed(1) })}</span>
        </p>
        <div className="sync-actions">
          <button className="btn small ghost" onClick={() => nudge(-0.3)} title={tr('응원법이 늦게 나오면')}>
            {tr('◀ 0.3초 빨리')}
          </button>
          <button className="btn small ghost" onClick={() => nudge(0.3)} title={tr('응원법이 빨리 나오면')}>
            {tr('0.3초 늦게 ▶')}
          </button>
          <button className="btn small ghost" onClick={() => setCalibrating(true)}>
            {tr('다시 맞추기')}
          </button>
          {onReset && (
            <button className="btn small ghost" onClick={onReset} title={tr('이 기기에서 맞춘 값을 지우고 사이트 기본 싱크로')}>
              {tr('↺ 공개 싱크로 되돌리기')}
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="calib need">
      <p className="calib-title">{tr('⏱ 영상과 한 번만 맞춰주세요')}</p>
      <ol>
        <li>{tr('영상을 ▶ 재생해요.')}</li>
        <li>
          {tr('이 가사가')} <b>{tr('들리기 시작하는 순간')}</b> {tr('「지금!」을 눌러요')}
          <span className="calib-line">
            <CueText text={anchor.text} />
          </span>
        </li>
      </ol>
      <div className="sync-actions">
        <button
          className="btn primary"
          disabled={!player.playing}
          onClick={() => {
            calibrate(anchor, player, setOffset)
            setCalibrating(false)
          }}
        >
          {tr('지금!')}
        </button>
        {sure && (
          <button className="btn small ghost" onClick={() => setCalibrating(false)}>
            {tr('취소')}
          </button>
        )}
      </div>
      {!player.playing && <p className="hint small">{tr('재생 중일 때 누를 수 있어요.')}</p>}
    </div>
  )
}
