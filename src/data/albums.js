// 앨범 키컬러 (앨범 이름 칩 표시용)
// 그룹 앨범 색은 나무위키 「투모로우바이투게더/응원법」 문서에서 앨범마다 쓰인 색을 따왔다.
// 그 문서에 색이 없는 앨범(Blue Hour, 솔로·OST)은 앨범 이미지를 참고해 정했다.
export const ALBUM_COLORS = {
  '꿈의 장: STAR': '#4f87ab',
  '꿈의 장: MAGIC': '#00db8c',
  '꿈의 장: ETERNITY': '#9400ff',
  'minisode1 : Blue Hour': '#e8879c',
  '혼돈의 장: FREEZE': '#05a6e0',
  '혼돈의 장: FIGHT OR ESCAPE': '#a3526e',
  "minisode 2: Thursday's Child": '#e02142',
  '이름의 장: TEMPTATION': '#995466',
  '이름의 장: FREEFALL': '#142b94',
  'minisode 3: TOMORROW': '#9e4d26',
  '誓い (CHIKAI)': '#294773',
  '별의 장: SANCTUARY': '#303f66',
  'Love Language (싱글)': '#f2261f',
  '별의 장: TOGETHER': '#1447ff',
  '7TH YEAR': '#ab1461',
  'Setsuna Hanabi (일본 싱글 5집)': '#24306b',
  "YEONJUN's Mixtape: GGUM (2024)": '#ff6fa8',
  'NO LABELS: PART 01': '#3b3b3b',
  'NO LABELS: PART 02': '#f2c94c',
  "BEOMGYU's Mixtape: Panic (2025)": '#c0392b',
  '언젠가는 슬기로울 전공의생활 OST Part 9': '#5aa9a0',
}

// 배경색 밝기에 따라 글자색(흰색/진한 초록)을 고른다
export function albumTextColor(hex) {
  const n = parseInt(hex.slice(1), 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return L > 0.3 ? '#06210f' : '#ffffff'
}
