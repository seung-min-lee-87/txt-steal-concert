import { useRef, useState } from 'react'
import { SONGS, SONG_MAP } from '../data/songs'
import { loadJSON, saveJSON } from '../lib/storage'

// 여러 곡의 응원법을 파일 하나로 주고받는다.
// 파일 형식: { format: 'stw-cheers', songs: { 곡id: { cues, youtube?, offset? } } }

export default function BundleCard({ onSaved }) {
  const fileRef = useRef(null)
  const [msg, setMsg] = useState('')

  async function importBundle(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    let data
    try {
      data = JSON.parse(await file.text())
      if (data.format !== 'stw-cheers' || typeof data.songs !== 'object') throw new Error()
    } catch {
      setMsg('이 파일은 응원법 묶음 파일이 아니에요.')
      return
    }
    const entries = Object.entries(data.songs).filter(([id, v]) => SONG_MAP[id] && Array.isArray(v.cues))
    const conflicts = entries.filter(([id]) => loadJSON('song:' + id, {}).cues?.length)
    let overwrite = false
    if (conflicts.length) {
      overwrite = window.confirm(
        `${conflicts.length}곡은 이미 내 응원법이 있어요.\n확인: 파일 내용으로 바꾸기\n취소: 내 것은 그대로 두고 나머지만 넣기`,
      )
    }
    let count = 0
    for (const [id, v] of entries) {
      const mine = loadJSON('song:' + id, {})
      if (mine.cues?.length && !overwrite) continue
      saveJSON('song:' + id, {
        ...mine,
        cues: v.cues,
        ...(v.youtube && !mine.youtube ? { youtube: v.youtube } : {}),
        ...(v.offset != null ? { offset: v.offset } : {}),
        ...(v.offsets ? { offsets: { ...mine.offsets, ...v.offsets } } : {}),
      })
      count++
    }
    setMsg(`${count}곡의 응원법을 넣었어요 📣`)
    onSaved?.()
  }

  function exportAll() {
    const songs = {}
    for (const s of SONGS) {
      const v = loadJSON('song:' + s.id, null)
      if (v?.cues?.length || v?.offsets) songs[s.id] = { cues: v.cues || [], youtube: v.youtube || '', offset: v.offset || 0, offsets: v.offsets || {} }
    }
    const blob = new Blob([JSON.stringify({ format: 'stw-cheers', songs }, null, 1)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = '내-응원법-백업.json'
    a.click()
    setTimeout(() => URL.revokeObjectURL(a.href), 1000)
    setMsg(`${Object.keys(songs).length}곡을 파일로 저장했어요`)
  }

  return (
    <div className="card bundle">
      <h3>💾 내 싱크 백업 · 불러오기</h3>
      <p className="hint small">
        내가 싱크·수정한 응원법은 이 기기에만 저장돼요. 「전체 백업」으로 저장한 파일을 다른 기기에서 불러오면 그대로
        옮겨져요.
      </p>
      <div className="sync-actions">
        <button className="btn small primary" onClick={() => fileRef.current?.click()}>
          백업 불러오기
        </button>
        <button className="btn small ghost" onClick={exportAll}>
          전체 백업
        </button>
        <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={importBundle} />
      </div>
      {msg && <p className="bundle-msg">{msg}</p>}
    </div>
  )
}
