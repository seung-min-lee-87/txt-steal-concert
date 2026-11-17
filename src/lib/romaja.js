// 한글 → 로마자(영어 발음) 변환. 해외 팬용, 소리 나는 대로 적는다 (국어의 로마자 표기법 + 주요 발음 규칙).
// 예: 이젠 집어쳐 → ijen jibeochyeo, 같이 → gachi, 대혼란 → daehollan
// 멤버 이름·그룹 이름은 팬들이 쓰는 공식 표기로 먼저 바꾼다.

const NAMES = [
  ['투모로우 바이 투게더', 'Tomorrow X Together'],
  ['투모로우바이투게더', 'Tomorrow X Together'],
  ['투바투', 'TXT'],
  ['최수빈', 'Choi Soobin'],
  ['최연준', 'Choi Yeonjun'],
  ['최범규', 'Choi Beomgyu'],
  ['강태현', 'Kang Taehyun'],
  ['휴닝카이', 'Hueningkai'],
  ['수빈', 'Soobin'],
  ['연준', 'Yeonjun'],
  ['범규', 'Beomgyu'],
  ['태현', 'Taehyun'],
  ['모아', 'MOA'],
]

// 초성 19, 중성 21, 종성 28 (0 = 없음)
const CHO = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
const JONG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
const VOWEL = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i']
const ONSET = { ㄱ: 'g', ㄲ: 'kk', ㄴ: 'n', ㄷ: 'd', ㄸ: 'tt', ㄹ: 'r', ㅁ: 'm', ㅂ: 'b', ㅃ: 'pp', ㅅ: 's', ㅆ: 'ss', ㅇ: '', ㅈ: 'j', ㅉ: 'jj', ㅊ: 'ch', ㅋ: 'k', ㅌ: 't', ㅍ: 'p', ㅎ: 'h' }
// 받침의 대표 소리
const CODA_SOUND = { ㄱ: 'ㄱ', ㄲ: 'ㄱ', ㅋ: 'ㄱ', ㄳ: 'ㄱ', ㄺ: 'ㄱ', ㄴ: 'ㄴ', ㄵ: 'ㄴ', ㄶ: 'ㄴ', ㄷ: 'ㄷ', ㅅ: 'ㄷ', ㅆ: 'ㄷ', ㅈ: 'ㄷ', ㅊ: 'ㄷ', ㅌ: 'ㄷ', ㅎ: 'ㄷ', ㄹ: 'ㄹ', ㄼ: 'ㄹ', ㄽ: 'ㄹ', ㄾ: 'ㄹ', ㅀ: 'ㄹ', ㅁ: 'ㅁ', ㄻ: 'ㅁ', ㅂ: 'ㅂ', ㅍ: 'ㅂ', ㅄ: 'ㅂ', ㄿ: 'ㅂ', ㅇ: 'ㅇ' }
const CODA_ROMAN = { ㄱ: 'k', ㄴ: 'n', ㄷ: 't', ㄹ: 'l', ㅁ: 'm', ㅂ: 'p', ㅇ: 'ng' }
// 겹받침 + 모음: 앞은 남고 뒤는 다음 글자로 넘어간다
const SPLIT = { ㄳ: ['ㄱ', 'ㅅ'], ㄵ: ['ㄴ', 'ㅈ'], ㄺ: ['ㄹ', 'ㄱ'], ㄻ: ['ㄹ', 'ㅁ'], ㄼ: ['ㄹ', 'ㅂ'], ㄽ: ['ㄹ', 'ㅅ'], ㄾ: ['ㄹ', 'ㅌ'], ㄿ: ['ㄹ', 'ㅍ'], ㅄ: ['ㅂ', 'ㅅ'] }
const ASPIRATE = { ㄱ: 'ㅋ', ㄷ: 'ㅌ', ㅂ: 'ㅍ', ㅈ: 'ㅊ' }

const isHangul = (ch) => ch >= '가' && ch <= '힣'

function decompose(ch) {
  const c = ch.charCodeAt(0) - 0xac00
  return { cho: CHO[Math.floor(c / 588)], v: Math.floor((c % 588) / 28), jong: JONG[c % 28] }
}

// 한 낱말(연속된 한글) 안에서 발음 규칙을 적용하고 로마자로
function romanizeWord(word) {
  const s = [...word].map(decompose)
  for (let i = 0; i < s.length - 1; i++) {
    const a = s[i]
    const b = s[i + 1]
    if (!a.jong) continue
    if (b.cho === 'ㅇ') {
      // 연음: 받침이 다음 글자 첫소리로
      if (a.jong === 'ㅇ') continue
      if (a.jong === 'ㅎ') { a.jong = ''; continue }
      if (a.jong === 'ㄶ') { a.jong = 'ㄴ'; continue }
      if (a.jong === 'ㅀ') { a.jong = 'ㄹ'; continue }
      if (SPLIT[a.jong]) { const [x, y] = SPLIT[a.jong]; a.jong = x; b.cho = y === 'ㅅ' ? 'ㅆ' : y; continue }
      // 구개음화: 굳이 → 구지, 같이 → 가치
      if (b.v === 20 && (a.jong === 'ㄷ' || a.jong === 'ㅌ')) { b.cho = a.jong === 'ㄷ' ? 'ㅈ' : 'ㅊ'; a.jong = ''; continue }
      b.cho = a.jong
      a.jong = ''
      continue
    }
    // 격음화: 받침 ㄱㄷㅂㅈ + ㅎ, 받침 ㅎ + ㄱㄷㅈ
    if (b.cho === 'ㅎ' && ASPIRATE[CODA_SOUND[a.jong]]) { b.cho = ASPIRATE[CODA_SOUND[a.jong]]; a.jong = ''; continue }
    if (['ㅎ', 'ㄶ', 'ㅀ'].includes(a.jong) && ASPIRATE[b.cho]) {
      b.cho = ASPIRATE[b.cho]
      a.jong = a.jong === 'ㅎ' ? '' : a.jong === 'ㄶ' ? 'ㄴ' : 'ㄹ'
      continue
    }
    const sound = CODA_SOUND[a.jong]
    // 비음화: 국물 → 궁물, 받는 → 반는, 밥물 → 밤물
    if (b.cho === 'ㄴ' || b.cho === 'ㅁ') {
      if (sound === 'ㄱ') a.jong = 'ㅇ'
      else if (sound === 'ㄷ') a.jong = 'ㄴ'
      else if (sound === 'ㅂ') a.jong = 'ㅁ'
      continue
    }
    if (b.cho === 'ㄹ') {
      // 유음화: 신라 → 실라 / ㅁㅇ + ㄹ → ㄴ / ㄱㅂ + ㄹ → ㅇㅁ + ㄴ
      if (sound === 'ㄴ' || sound === 'ㄹ') { a.jong = 'ㄹ'; continue }
      if (sound === 'ㅁ' || sound === 'ㅇ') { b.cho = 'ㄴ'; continue }
      if (sound === 'ㄱ') { a.jong = 'ㅇ'; b.cho = 'ㄴ'; continue }
      if (sound === 'ㅂ') { a.jong = 'ㅁ'; b.cho = 'ㄴ'; continue }
      if (sound === 'ㄷ') { a.jong = 'ㄴ'; b.cho = 'ㄴ'; continue }
    }
    // ㄹ + ㄴ → ㄹㄹ
    if (sound === 'ㄹ' && b.cho === 'ㄴ') b.cho = 'ㄹ'
  }
  let out = ''
  s.forEach((x, i) => {
    let onset = ONSET[x.cho]
    // 받침 ㄹ 뒤의 ㄹ은 l (ㄹㄹ → ll)
    if (x.cho === 'ㄹ' && i > 0 && CODA_SOUND[s[i - 1].jong] === 'ㄹ') onset = 'l'
    out += onset + VOWEL[x.v]
    if (x.jong) out += CODA_ROMAN[CODA_SOUND[x.jong]] || ''
  })
  return out
}

export function hasHangul(text) {
  return /[가-힣]/.test(text)
}

export function romanize(text) {
  let t = text
  for (const [ko, en] of NAMES) t = t.replaceAll(ko, `\u0000${en}\u0001`)
  // 이름 표기는 그대로 두고 나머지 한글만 바꾼다
  return t
    .split(/(\u0000[^\u0001]*\u0001)/)
    .map((part) => {
      if (part.startsWith('\u0000')) return part.slice(1, -1)
      let out = ''
      let word = ''
      for (const ch of part) {
        if (isHangul(ch)) word += ch
        else {
          if (word) out += romanizeWord(word)
          word = ''
          out += ch
        }
      }
      if (word) out += romanizeWord(word)
      return out
    })
    .join('')
}

// 응원 부분만 로마자로 (팬이 외치는 줄 전체, 또는 줄 안의 {응원} 부분). 한글이 없으면 null
export function fanRomaja(cue) {
  const clean = (t) => t.replace(/~[^~]*~/g, '').replace(/[{}]/g, '').replace(/\s+/g, ' ').trim()
  const parts = cue.fan ? [clean(cue.text)] : [...cue.text.matchAll(/\{([^}]*)\}/g)].map((m) => m[1].trim())
  const ko = parts.filter(hasHangul)
  return ko.length ? ko.map(romanize).join(' / ') : null
}
