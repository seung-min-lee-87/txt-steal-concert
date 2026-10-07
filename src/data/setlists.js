// 지난 콘서트 세트리스트 (서울·일본 공연만)
// 출처: setlist.fm 및 공연 후기 기사 (검색으로 확인). 앙코르·일부 곡은 공연 날마다 다르다.
// 항목: { song: 곡 id, jpVer: 일본어 버전 여부 }
// tour: 공식 투어명 / name: 짧은 이름 / year: 연도
// theme: 공식 포스터에서 따온 투어 로고·색 (bg 배경, accent 강조색, logo 투명 로고, poster 포스터)

const s = (song, jpVer = false) => ({ song, jpVer })
// by: 원곡 멤버가 아닌 다른 멤버가 부른 경우 그 멤버
const by = (song, member) => ({ song, jpVer: false, by: member })
const list = (...ids) => ids.map((id) => s(id))

export const TOURS = [
  { key: 'moa-con', name: 'MOA CON', full: '2026 TXT MOA CON', years: '2026' },
  {
    key: 'act-tomorrow',
    name: 'ACT : TOMORROW',
    full: 'TOMORROW X TOGETHER WORLD TOUR <ACT : TOMORROW>',
    years: '2025–2026',
    theme: {
      bg: '#161c2c',
      accent: '#8fb5dc',
      logo: '/images/tours/act-tomorrow-logo.webp',
      poster: '/images/tours/act-tomorrow-seoul.webp',
    },
  },
  { key: 'act-promise', name: 'ACT : PROMISE', full: 'TOMORROW X TOGETHER WORLD TOUR <ACT : PROMISE>', years: '2024' },
  { key: 'act-sweet-mirage', name: 'ACT : SWEET MIRAGE', full: 'TOMORROW X TOGETHER WORLD TOUR <ACT : SWEET MIRAGE>', years: '2023' },
  { key: 'act-love-sick', name: 'ACT : LOVE SICK', full: 'TOMORROW X TOGETHER WORLD TOUR <ACT : LOVE SICK>', years: '2022' },
  { key: 'act-boy', name: 'ACT : BOY', full: 'TOMORROW X TOGETHER ONLINE CONCERT <ACT : BOY>', years: '2021' },
]

export const SETLISTS = [
  {
    id: 'seoul-2026-moacon',
    tourKey: 'moa-con',
    city: '서울',
    region: 'KR',
    label: '2026 MOA CON 서울',
    tour: '2026 TXT MOA CON',
    date: '2026-02-27',
    venue: 'KSPO DOME',
    source: '나무위키 「2026 TXT MOA CON」 (CC BY-NC-SA 2.0 KR)',
    notes: [
      '공연 기간 2026.2.27–3.1 서울 KSPO DOME, 이후 일본 나고야·후나바시·후쿠오카·고베 (5–6월)',
      '전곡 밴드 라이브',
      '솔로 무대는 멤버끼리 솔로곡을 바꿔 불렀어요 (곡 옆 괄호가 부른 멤버)',
      '커버 무대와 앵콜은 날마다 달랐어요',
    ],
    groups: [
      { name: '본 공연', items: list('beautiful-strangers', 'good-boy-gone-bad', 'run-away', '0x1-lovesong', 'loser-lover') },
      {
        name: '솔로 무대',
        items: [
          by('bird-of-night', '휴닝카이'), by('sunday-driver', '범규'), by('dance-with-you', '연준'),
          by('ghost-girl', '태현'), by('take-my-half', '수빈'), s('yj-coma'), s('talk-to-you'), s('panic'),
        ],
      },
      { name: '후반부', items: list('geunari-omyeon', 'new-rules', 'angel-or-devil', 'upside-down-kiss', 'cwjltma', 'dear-sputnik', 'see-you-there-tomorrow') },
    ],
  },
  {
    id: 'seoul-2025',
    tourKey: 'act-tomorrow',
    city: '서울',
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
    tourKey: 'act-tomorrow',
    city: '도쿄',
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
  {
    id: 'tokyo-2024',
    tourKey: 'act-promise',
    city: '도쿄',
    region: 'JP',
    label: '2024 ACT : PROMISE 도쿄',
    tour: 'TOMORROW X TOGETHER WORLD TOUR <ACT : PROMISE> IN JAPAN',
    date: '2024-07-10',
    venue: 'Tokyo Dome',
    groups: [
      {
        name: '본 공연',
        items: list(
          'deja-vu', 'run-away', '0x1-lovesong', 'devil-by-the-window', 'sugar-rush-ride', 'farewell-neverland',
          'chasing-that-feeling', 'magic', 'new-rules', 'loser-lover', 'kitto-zutto', 'force', 'thursdays-child',
          'hitori-no-yoru', 'trust-fund-baby', 'quarter-life', 'the-killa', 'back-for-more', 'tinnitus', 'puma',
          'good-boy-gone-bad', 'growing-pain', 'dreamer', 'see-you-there-tomorrow',
        ),
      },
      { name: '앙코르', items: list('magic-island', 'miracle', 'hydrangea-love') },
    ],
  },
  {
    id: 'seoul-2024',
    tourKey: 'act-promise',
    city: '서울',
    region: 'KR',
    label: '2024 ACT : PROMISE 서울',
    tour: 'TOMORROW X TOGETHER WORLD TOUR <ACT : PROMISE> IN SEOUL',
    date: '2024-05-03',
    venue: 'KSPO DOME',
    groups: [
      {
        name: '본 공연',
        items: list(
          'deja-vu', 'run-away', '0x1-lovesong', 'devil-by-the-window', 'sugar-rush-ride', 'farewell-neverland',
          'chasing-that-feeling', 'magic', 'new-rules', 'loser-lover', 'ghosting', 'thursdays-child',
          'trust-fund-baby', 'quarter-life', 'the-killa', 'back-for-more', 'tinnitus', 'puma', 'good-boy-gone-bad',
          'growing-pain', 'dreamer', 'deep-down', 'see-you-there-tomorrow',
        ),
      },
      { name: '앙코르', items: list('magic-island', 'miracle') },
      { name: '앙코르 (막공 추가)', items: list('skipping-stones', 'moa-diary') },
    ],
  },
  {
    id: 'osaka-2023',
    tourKey: 'act-sweet-mirage',
    city: '오사카',
    region: 'JP',
    label: '2023 ACT : SWEET MIRAGE 오사카',
    tour: 'TOMORROW X TOGETHER WORLD TOUR <ACT : SWEET MIRAGE> IN JAPAN',
    date: '2023-07-02',
    venue: 'Kyocera Dome Osaka',
    groups: [
      {
        name: '본 공연',
        items: [
          s('blue-hour', true), s('cwjltma'), s('drama', true), s('no-rules'), s('cat-dog'), s('run-away', true),
          s('we-lost-the-summer'), s('cant-you-see-me', true), s('0x1-lovesong', true), s('loser-lover'),
          s('dear-sputnik'), s('force'), s('magic'), s('hitori-no-yoru'), s('ring'), s('good-boy-gone-bad', true),
          s('tinnitus'), s('devil-by-the-window'), s('angel-or-devil', true), s('ice-cream'), s('happy-fools'),
          s('sugar-rush-ride', true),
        ],
      },
      { name: '앙코르', items: list('farewell-neverland', 'blue-spring', 'hydrangea-love', 'our-summer', 'ito') },
    ],
  },
  {
    id: 'seoul-2023',
    tourKey: 'act-sweet-mirage',
    city: '서울',
    region: 'KR',
    label: '2023 ACT : SWEET MIRAGE 서울',
    tour: 'TOMORROW X TOGETHER WORLD TOUR <ACT : SWEET MIRAGE> IN SEOUL',
    date: '2023-03-25',
    venue: 'KSPO DOME',
    groups: [
      {
        name: '본 공연',
        items: list(
          'blue-hour', 'cwjltma', 'drama', 'no-rules', 'cat-dog', 'run-away', 'we-lost-the-summer', 'cant-you-see-me',
          '0x1-lovesong', 'loser-lover', 'dear-sputnik', 'magic', 'opening-sequence', 'anti-romantic', 'eternally',
          'good-boy-gone-bad', 'tinnitus', 'devil-by-the-window', 'angel-or-devil', 'ice-cream', 'happy-fools',
          'sugar-rush-ride',
        ),
      },
      { name: '앙코르', items: list('farewell-neverland', 'blue-spring', 'our-summer') },
    ],
  },
  {
    id: 'osaka-2022',
    tourKey: 'act-love-sick',
    city: '오사카',
    region: 'JP',
    label: '2022 ACT : LOVE SICK 오사카',
    tour: 'TOMORROW X TOGETHER WORLD TOUR <ACT : LOVE SICK> IN JAPAN',
    date: '2022-09-03',
    venue: 'Ookini Arena Maishima',
    groups: [
      {
        name: '본 공연',
        items: [
          s('0x1-lovesong', true), s('force'), s('blue-orangeade'), s('magic'), s('ghosting'), s('new-rules'),
          s('puma'), s('what-if-puma'), s('loser-lover'), s('trust-fund-baby'), s('crown', true), s('magic-island'),
          s('run-away', true), s('blue-hour', true), s('frost'), s('maze-in-the-mirror'), s('eternally'),
          s('cant-you-see-me', true), s('lonely-boy'),
        ],
      },
      { name: '앙코르', items: [s('thursdays-child'), s('moa-diary', true), s('sweat')] },
    ],
  },
  {
    id: 'seoul-2022',
    tourKey: 'act-love-sick',
    city: '서울',
    region: 'KR',
    label: '2022 ACT : LOVE SICK 서울',
    tour: 'TOMORROW X TOGETHER WORLD TOUR <ACT : LOVE SICK> IN SEOUL',
    date: '2022-07-02',
    venue: '잠실실내체육관',
    groups: [
      {
        name: '본 공연',
        items: list(
          '0x1-lovesong', 'wishlist', 'blue-orangeade', 'magic', 'ghosting', 'new-rules', 'puma', 'what-if-puma',
          'loser-lover', 'trust-fund-baby', 'crown', 'magic-island', 'run-away', 'blue-hour', 'frost',
          'maze-in-the-mirror', 'eternally', 'cant-you-see-me', 'opening-sequence', 'lonely-boy', 'anti-romantic',
          'good-boy-gone-bad',
        ),
      },
      { name: '앙코르', items: list('thursdays-child', 'moa-diary', 'sweat') },
    ],
  },
  {
    id: 'online-2021',
    tourKey: 'act-boy',
    city: '서울 (온라인)',
    region: 'KR',
    label: '2021 ACT : BOY 서울',
    tour: 'TOMORROW X TOGETHER ONLINE CONCERT <ACT : BOY>',
    date: '2021-10-03',
    venue: '온라인 생중계',
    groups: [
      {
        name: '공연',
        items: list(
          'crown', 'blue-orangeade', 'poppin-star', 'our-summer', 'cwjltma', 'run-away', 'no-rules', '20cm',
          'fairy-of-shampoo', 'cat-dog', 'ice-cream', 'angel-or-devil', 'magic', 'blue-hour', 'nap-of-a-star',
          'magic-island', 'cant-you-see-me', 'puma', 'eternally', 'frost', '0x1-lovesong', 'loser-lover',
          'dear-sputnik', 'moa-diary',
        ),
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
