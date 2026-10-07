// 응원법 한 줄 표시. {중괄호} 안은 "줄 일부만 팬이 외치는 부분"이라 따로 강조한다.
export function hasPart(text) {
  return /\{[^}]*\}/.test(text)
}

export default function CueText({ text, masked = false }) {
  const pieces = text.split(/(\{[^}]*\})/).filter(Boolean)
  return pieces.map((p, i) =>
    p.startsWith('{') && p.endsWith('}') ? (
      <mark key={i} className="fan-part">
        {masked ? '● ● ●' : p.slice(1, -1)}
      </mark>
    ) : (
      <span key={i}>{p}</span>
    ),
  )
}
