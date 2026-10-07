// 응원법 한 줄 표시.
// {중괄호}: 줄 일부만 팬이 외치는 부분 → 강조
// ~물결~: 멤버가 부르는 가사 위로 팬이 대신 외치는 부분 → 취소선으로 흐리게
export function hasPart(text) {
  return /\{[^}]*\}/.test(text)
}

export default function CueText({ text, masked = false }) {
  const pieces = text.split(/(\{[^}]*\}|~[^~]+~)/).filter(Boolean)
  return pieces.map((p, i) => {
    if (p.startsWith('{') && p.endsWith('}')) {
      return (
        <mark key={i} className="fan-part">
          {masked ? '● ● ●' : p.slice(1, -1)}
        </mark>
      )
    }
    if (p.length > 2 && p.startsWith('~') && p.endsWith('~')) {
      return (
        <s key={i} className="sung-over">
          {p.slice(1, -1)}
        </s>
      )
    }
    return <span key={i}>{p}</span>
  })
}
