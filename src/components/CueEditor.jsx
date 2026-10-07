import { useEffect, useRef, useState } from 'react'
import { parseCueText, cuesToText, formatTime } from '../lib/cues'

// 사람이 버튼을 누를 때 생기는 반응 지연 보정 (초)
const REACTION = 0.15

export default function CueEditor({ song, state, update, player, t }) {
  const cues = state.cues
  const [draft, setDraft] = useState(() => cuesToText(cues))
  const [syncIdx, setSyncIdx] = useState(null)
  const [msg, setMsg] = useState('')
  const fileRef = useRef(null)
  const tapRef = useRef(null)
  const draftRef = useRef(null)
  const offset = state.offset || 0

  const setCues = (next) => update({ cues: next })

  // 줄별로 고친 내용을 위 글상자에도 반영 (글상자를 쓰는 중일 땐 건드리지 않음)
  useEffect(() => {
    if (document.activeElement !== draftRef.current) setDraft(cuesToText(cues))
  }, [cues])

  function applyDraft() {
    const parsed = parseCueText(draft)
    // 줄 수가 같은 위치는 기존 시간을 유지
    const merged = parsed.map((c, i) => ({ ...c, t: cues[i]?.t ?? null }))
    setCues(merged)
    flash(`${merged.length}줄 저장했어요`)
  }

  function flash(text) {
    setMsg(text)
    setTimeout(() => setMsg(''), 2000)
  }

  function editCue(i, patch) {
    setCues(cues.map((c, j) => (j === i ? { ...c, ...patch } : c)))
  }

  function removeCue(i) {
    setCues(cues.filter((_, j) => j !== i))
  }

  function addCue() {
    setCues([...cues, { t: null, text: '', fan: false }])
  }

  // --- 싱크 맞추기 ---
  function startSync(from) {
    const prev = cues.slice(0, from).reverse().find((c) => c.t != null)
    player.seek(prev ? Math.max(0, prev.t - offset - 2) : 0)
    setSyncIdx(from)
    player.play()
    setTimeout(() => tapRef.current?.focus(), 50)
  }

  function tap() {
    if (syncIdx == null || syncIdx >= cues.length) return
    const stamp = Math.max(0, Math.round((player.getTime() + offset - REACTION) * 20) / 20)
    setCues(cues.map((c, j) => (j === syncIdx ? { ...c, t: stamp } : c)))
    const nextIdx = syncIdx + 1
    if (nextIdx >= cues.length) {
      setSyncIdx(null)
      player.pause()
      flash('싱크 완료! 연습 탭에서 확인해보세요 🎉')
    } else setSyncIdx(nextIdx)
  }

  function undoTap() {
    if (syncIdx == null || syncIdx === 0) return
    const back = syncIdx - 1
    setCues(cues.map((c, j) => (j === back ? { ...c, t: null } : c)))
    setSyncIdx(back)
    const prev = cues.slice(0, back).reverse().find((c) => c.t != null)
    player.seek(prev ? Math.max(0, prev.t - offset - 1) : 0)
  }

  // 싱크 중엔 스페이스/엔터 = 탭
  useEffect(() => {
    if (syncIdx == null) return
    const onKey = (e) => {
      if (e.target.closest('input, textarea')) return
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault()
        tap()
      } else if (e.code === 'Backspace') {
        e.preventDefault()
        undoTap()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // --- 파일로 주고받기 ---
  function exportData() {
    const data = JSON.stringify({ song: song.id, youtube: state.youtube, offset, cues }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `응원법-${song.id}.json`
    a.click()
    setTimeout(() => URL.revokeObjectURL(a.href), 1000)
  }

  async function importData(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const data = JSON.parse(await file.text())
      if (!Array.isArray(data.cues)) throw new Error()
      update({ cues: data.cues, youtube: data.youtube ?? state.youtube, offset: data.offset ?? offset })
      setDraft(cuesToText(data.cues))
      flash('불러왔어요')
    } catch {
      flash('이 파일은 읽을 수 없어요')
    }
  }

  const canSync = player.ready && cues.length > 0
  const syncing = syncIdx != null

  return (
    <div className="editor">
      {syncing ? (
        <div className="card sync">
          <p className="sync-step">
            {syncIdx + 1} / {cues.length}번째 줄 · {formatTime(t)}
          </p>
          <p className="sync-prev">{cues[syncIdx - 1]?.text ?? '(시작)'}</p>
          <button ref={tapRef} className={'tap' + (cues[syncIdx]?.fan ? ' fan' : '')} onClick={tap}>
            <span className="tap-hint">이 줄이 시작될 때 톡!</span>
            <span className="tap-text">{cues[syncIdx]?.text || '(빈 줄)'}</span>
          </button>
          <div className="sync-actions">
            <button className="btn small ghost" onClick={undoTap} disabled={syncIdx === 0}>
              ↩ 한 줄 되돌리기
            </button>
            <button className="btn small ghost" onClick={() => (player.playing ? player.pause() : player.play())}>
              {player.playing ? '⏸ 잠깐 멈춤' : '▶ 계속'}
            </button>
            <button
              className="btn small"
              onClick={() => {
                setSyncIdx(null)
                player.pause()
              }}
            >
              그만하기
            </button>
          </div>
          <p className="hint small">PC: 스페이스/엔터 = 톡, 백스페이스 = 되돌리기</p>
        </div>
      ) : (
        <div className="card sync-start">
          <h3>⏱ 싱크 맞추기</h3>
          <p className="hint">
            노래가 나오는 동안, 각 줄이 <b>시작되는 순간</b> 큰 버튼을 눌러주세요. 틀려도 아래에서 ±로 고칠 수 있어요.
          </p>
          <div className="sync-actions">
            <button className="btn primary" disabled={!canSync} onClick={() => startSync(0)}>
              처음부터 싱크
            </button>
            {cues.some((c) => c.t == null) && cues.some((c) => c.t != null) && (
              <button
                className="btn"
                disabled={!canSync}
                onClick={() => startSync(cues.findIndex((c) => c.t == null))}
              >
                빈 줄부터 이어서
              </button>
            )}
          </div>
          {!player.ready && <p className="hint small">먼저 위에서 유튜브 주소나 음악 파일을 정해주세요.</p>}
          {player.ready && !cues.length && <p className="hint small">먼저 아래에 응원법을 붙여넣어 주세요.</p>}
        </div>
      )}

      {!syncing && (
        <>
          <details className="card bulk" open={!cues.length}>
            <summary>📋 응원법 붙여넣기 / 글로 한꺼번에 고치기</summary>
            <p className="hint small">
              나무위키 응원법을 복사해서 그대로 붙여넣으세요. 한 줄이 한 칸이 돼요.
              <br />
              <b>팬이 외치는 줄</b>은 맨 앞에 <code>!</code>를 붙이면 📣로 표시돼요. (나중에 버튼으로 바꿔도 돼요)
            </p>
            <textarea
              ref={draftRef}
              rows={10}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={'예)\n(전주)\n! 멤버 이름 콜\n멤버가 부르는 가사 한 줄\n! 팬이 같이 외치는 부분'}
            />
            <button className="btn primary" onClick={applyDraft}>
              저장
            </button>
          </details>

          {cues.length > 0 && (
            <div className="card lines">
              <div className="lines-head">
                <h3>줄별로 고치기</h3>
                <label className="offset">
                  전체 싱크 보정 {offset > 0 ? '+' : ''}
                  {offset.toFixed(1)}초
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.1"
                    value={offset}
                    onChange={(e) => update({ offset: Number(e.target.value) })}
                  />
                </label>
              </div>
              <p className="hint small">글자가 늦게 나오면 보정값을 + 쪽으로, 빨리 나오면 - 쪽으로 옮겨요.</p>
              <ul>
                {cues.map((c, i) => (
                  <li key={i} className={'line' + (c.fan ? ' fan' : '')}>
                    <button
                      className="line-time"
                      onClick={() => c.t != null && player.seek(Math.max(0, c.t - offset - 0.5))}
                      title="이 줄부터 듣기"
                    >
                      {c.t != null ? formatTime(c.t) : '--'}
                    </button>
                    <button
                      className={'line-fan' + (c.fan ? ' on' : '')}
                      onClick={() => editCue(i, { fan: !c.fan })}
                      aria-pressed={c.fan}
                      title="팬 파트 표시"
                    >
                      📣
                    </button>
                    <input
                      value={c.text}
                      onChange={(e) => editCue(i, { text: e.target.value })}
                      aria-label={`${i + 1}번째 줄`}
                    />
                    <span className="line-nudge">
                      <button onClick={() => c.t != null && editCue(i, { t: Math.max(0, +(c.t - 0.1).toFixed(2)) })}>
                        −
                      </button>
                      <button onClick={() => c.t != null && editCue(i, { t: +(c.t + 0.1).toFixed(2) })}>+</button>
                      <button
                        onClick={() => editCue(i, { t: Math.round(t * 20) / 20 })}
                        disabled={!player.ready}
                        title="지금 재생 위치로"
                      >
                        ⏱
                      </button>
                      <button onClick={() => removeCue(i)} title="줄 삭제">
                        ✕
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
              <button className="btn small ghost" onClick={addCue}>
                + 줄 추가
              </button>
            </div>
          )}

          <div className="card share">
            <h3>💾 다른 기기로 옮기기</h3>
            <p className="hint small">
              응원법은 지금 쓰는 기기에만 저장돼요. 파일로 저장해서 폰↔PC로 옮기거나, 저에게 보내주시면 사이트에
              기본으로 넣어둘게요.
            </p>
            <div className="sync-actions">
              <button className="btn small" onClick={exportData} disabled={!cues.length}>
                파일로 저장
              </button>
              <button className="btn small ghost" onClick={() => fileRef.current?.click()}>
                파일 불러오기
              </button>
              <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={importData} />
            </div>
          </div>
        </>
      )}
      {msg && <div className="toast">{msg}</div>}
    </div>
  )
}
