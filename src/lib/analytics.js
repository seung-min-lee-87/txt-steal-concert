// 방문자 통계 (Vercel Web Analytics) — 숫자는 Vercel 대시보드에서 사이트 주인만 볼 수 있다.
// 내 방문은 빼고 싶으면: 주소 끝에 ?me=1 을 붙여 한 번 접속 (그 기기·브라우저는 집계 제외)
//   다시 집계하려면 ?me=0
const KEY = 'stw:me'

try {
  const me = new URLSearchParams(location.search).get('me')
  if (me === '1') localStorage.setItem(KEY, '1')
  if (me === '0') localStorage.removeItem(KEY)
} catch {
  // 저장소를 못 쓰는 브라우저는 그냥 집계
}

function isMe() {
  try {
    return localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

// 이 사이트는 #/chant/crown 같은 주소를 쓰니까, 통계에서 페이지별로 보이도록 /chant/crown 으로 바꿔 보낸다
export function beforeSend(event) {
  if (isMe()) return null
  const u = new URL(event.url)
  const path = u.hash.replace(/^#/, '') || '/'
  return { ...event, url: u.origin + (path.startsWith('/') ? path : '/' + path) }
}
