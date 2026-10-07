// 지난 투어(ACT : TOMORROW) 세트리스트
// 출처: setlist.fm. 앙코르는 공연마다 바뀐다.
// 항목: { song: 곡 id, jpVer: 일본어 버전 여부 }

const s = (song, jpVer = false) => ({ song, jpVer })

export const SETLISTS = [
  {
    id: 'seoul-2025',
    region: 'KR',
    label: '2025 ACT : TOMORROW 서울',
    tour: 'TOMORROW X TOGETHER WORLD TOUR <ACT : TOMORROW>',
    date: '2025-08-22',
    venue: '고척스카이돔',
    groups: [
      {
        name: '본 공연',
        items: [
          s('loser-lover'), s('wishlist'), s('blue-hour'), s('blue-orangeade'), s('love-language'),
          s('over-the-moon'), s('danger'), s('upside-down-kiss'), s('growing-pain'), s('frost'),
          s('good-boy-gone-bad'), s('farewell-neverland'), s('skipping-stones'), s('0x1-lovesong'),
        ],
      },
      {
        name: '솔로 무대',
        items: [s('bird-of-night'), s('sunday-driver'), s('dance-with-you'), s('ghost-girl'), s('take-my-half')],
      },
      {
        name: '후반부',
        items: [
          s('dear-sputnik'), s('no-rules'), s('deja-vu'), s('eternally'), s('crown'),
          s('beautiful-strangers'), s('song-of-the-stars'),
        ],
      },
      { name: '앙코르 (8/22)', items: [s('miracle'), s('higher-than-heaven'), s('see-you-there-tomorrow')] },
      {
        name: '앙코르 (8/23)',
        items: [s('moa-diary'), s('magic'), s('our-summer'), s('cat-dog'), s('see-you-there-tomorrow'), s('sweat')],
      },
    ],
  },
  {
    id: 'tokyo-2026',
    region: 'JP',
    label: '2026 ACT : TOMORROW 도쿄',
    tour: 'TOMORROW X TOGETHER WORLD TOUR <ACT : TOMORROW> IN JAPAN',
    date: '2026-01-21',
    venue: 'Tokyo Dome',
    groups: [
      {
        name: '본 공연',
        items: [
          s('loser-lover'), s('kitto-zutto'), s('blue-hour', true), s('blue-orangeade'), s('love-language'),
          s('cant-stop'), s('danger'), s('upside-down-kiss'), s('growing-pain'), s('frost'),
          s('good-boy-gone-bad', true), s('hitori-no-yoru'), s('farewell-neverland'), s('0x1-lovesong', true),
        ],
      },
      {
        name: '솔로 무대',
        items: [
          s('bird-of-night'), s('sunday-driver'), s('dance-with-you'), s('ghost-girl'), s('talk-to-you'),
          s('take-my-half'),
        ],
      },
      {
        name: '후반부',
        items: [
          s('where-do-you-go'), s('no-rules'), s('deja-vu', true), s('eternally'), s('crown', true),
          s('beautiful-strangers', true), s('song-of-the-stars', true),
        ],
      },
      {
        name: '앙코르',
        items: [
          s('new-rules'), s('everlasting-shine'), s('higher-than-heaven'), s('moa-diary', true),
          s('happy-fools'), s('see-you-there-tomorrow'), s('miracle'),
        ],
      },
    ],
  },
]

// 곡 id → 등장한 세트리스트 id 목록
export const APPEARANCES = (() => {
  const map = {}
  for (const sl of SETLISTS) {
    for (const g of sl.groups) {
      for (const it of g.items) {
        map[it.song] ??= new Set()
        map[it.song].add(sl.id)
      }
    }
  }
  return Object.fromEntries(Object.entries(map).map(([k, v]) => [k, [...v]]))
})()
