// 응원법 한 줄 = { t: 시작 시간(초) 또는 null, text: 내용, fan: 팬이 외치는 부분인지 }

// 붙여넣은 글을 줄 단위로 나눈다.
// 줄 앞에 ! 또는 ★ 를 붙이면 "팬이 외치는 줄"로 표시된다.
export function parseCueText(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const fan = /^[!！★*]/.test(line)
      return { t: null, text: fan ? line.replace(/^[!！★*]\s*/, '') : line, fan }
    })
}

export function cuesToText(cues) {
  return cues.map((c) => (c.fan ? '! ' : '') + c.text).join('\n')
}

// 현재 시간에 해당하는 줄 번호 (아직 시작 전이면 -1)
export function activeIndex(cues, time) {
  let idx = -1
  for (let i = 0; i < cues.length; i++) {
    const t = cues[i].t
    if (t == null) continue
    if (t <= time) idx = i
    else break
  }
  return idx
}

// 해당 줄 다음에 나오는, 시간이 있는 줄의 시작 시간
export function nextTime(cues, i) {
  for (let j = i + 1; j < cues.length; j++) if (cues[j].t != null) return cues[j].t
  return null
}

export function formatTime(sec) {
  if (sec == null || Number.isNaN(sec)) return '--:--'
  const s = Math.max(0, sec)
  const m = Math.floor(s / 60)
  const r = s - m * 60
  return `${m}:${r.toFixed(1).padStart(4, '0')}`
}
