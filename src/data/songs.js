// 곡 사전
// - title: true  → 타이틀곡
// - solo: '멤버' → 솔로곡
// - jp: true     → 일본 오리지널 곡
// - isNew: true  → 아직 콘서트에서 안 부른 신곡 (7TH YEAR 등)
// - album        → 확실한 것만 적었다. 모르면 비워둔다.
// 세트리스트 등장 여부(🔁)는 setlists.js를 보고 자동으로 계산한다.

export const SONGS = [
  { id: 'loser-lover', title: 'LO$ER=LO♡ER', album: 'The Chaos Chapter: FIGHT OR ESCAPE', title_: true },
  { id: 'wishlist', title: 'Wishlist', album: 'minisode1 : Blue Hour' },
  { id: 'blue-hour', title: '5시 53분의 하늘에서 발견한 너와 나 (Blue Hour)', short: 'Blue Hour', album: 'minisode1 : Blue Hour', title_: true },
  { id: 'blue-orangeade', title: 'Blue Orangeade', album: '꿈의 장: STAR' },
  { id: 'love-language', title: 'Love Language' },
  { id: 'over-the-moon', title: 'Over The Moon', album: '별의 장: SANCTUARY', title_: true },
  { id: 'danger', title: 'Danger', album: '별의 장: SANCTUARY' },
  { id: 'upside-down-kiss', title: 'Upside Down Kiss' },
  { id: 'growing-pain', title: 'Growing Pain', album: '이름의 장: FREEFALL' },
  { id: 'frost', title: 'Frost', album: '혼돈의 장: FREEZE' },
  { id: 'good-boy-gone-bad', title: 'Good Boy Gone Bad', album: 'minisode 2: Thursday\'s Child', title_: true },
  { id: 'farewell-neverland', title: '네버랜드를 떠나며 (Farewell, Neverland)', short: 'Farewell, Neverland', album: '꿈의 장: ETERNITY' },
  { id: 'skipping-stones', title: '물수제비 (Skipping Stones)', short: 'Skipping Stones', album: '이름의 장: FREEFALL' },
  { id: '0x1-lovesong', title: '0X1=LOVESONG (I Know I Love You)', short: '0X1=LOVESONG', album: '혼돈의 장: FREEZE', title_: true },
  { id: 'bird-of-night', title: 'Bird of Night', solo: '태현' },
  { id: 'sunday-driver', title: 'Sunday Driver', solo: '수빈' },
  { id: 'dance-with-you', title: 'Dance With You', solo: '휴닝카이' },
  { id: 'ghost-girl', title: 'Ghost Girl', solo: '연준' },
  { id: 'talk-to-you', title: 'Talk to You', solo: '연준' },
  { id: 'take-my-half', title: 'Take My Half', solo: '범규' },
  { id: 'dear-sputnik', title: 'Dear Sputnik' },
  { id: 'where-do-you-go', title: 'Where Do You Go?' },
  { id: 'no-rules', title: 'No Rules' },
  { id: 'deja-vu', title: 'Deja Vu', album: 'minisode 3: TOMORROW', title_: true },
  { id: 'eternally', title: '세계가 불타버린 밤, 우린... (Eternally)', short: 'Eternally', album: '꿈의 장: ETERNITY' },
  { id: 'crown', title: '어느날 머리에서 뿔이 자랐다 (CROWN)', short: 'CROWN', album: '꿈의 장: STAR', title_: true },
  { id: 'beautiful-strangers', title: 'Beautiful Strangers', album: '별의 장: TOGETHER', title_: true },
  { id: 'song-of-the-stars', title: 'Song of the Stars' },
  { id: 'miracle', title: 'Miracle', album: 'minisode 3: TOMORROW' },
  { id: 'higher-than-heaven', title: 'Higher Than Heaven', jp: true, title_: true },
  { id: 'see-you-there-tomorrow', title: '내일에서 기다릴게 (I\'ll See You There Tomorrow)', short: 'I\'ll See You There Tomorrow', album: 'minisode 3: TOMORROW' },
  { id: 'moa-diary', title: 'MOA Diary (Dubaddu Wari Wari)', short: 'MOA Diary' },
  { id: 'magic', title: 'Magic', album: '혼돈의 장: FREEZE' },
  { id: 'our-summer', title: 'Our Summer', album: '꿈의 장: STAR' },
  { id: 'cat-dog', title: 'Cat & Dog', album: '꿈의 장: STAR' },
  { id: 'sweat', title: 'Sweat' },
  { id: 'kitto-zutto', title: 'きっとずっと (Kitto Zutto)', short: 'Kitto Zutto', jp: true },
  { id: 'cant-stop', title: 'Can\'t Stop' },
  { id: 'hitori-no-yoru', title: 'ひとりの夜 (Hitori no Yoru)', short: 'Hitori no Yoru', jp: true },
  { id: 'new-rules', title: 'New Rules' },
  { id: 'everlasting-shine', title: 'Everlasting Shine', jp: true },
  { id: 'happy-fools', title: 'Happy Fools', album: '이름의 장: TEMPTATION' },

  // 7TH YEAR (2026.04) — 이번 투어 예상 신곡
  { id: 'just-one-more-day', title: '하루에 하루만 더 (Stick With You)', short: '하루에 하루만 더', album: '7TH YEAR', title_: true, isNew: true },
  { id: 'bed-of-thorns', title: 'Bed of Thorns', album: '7TH YEAR', isNew: true },
  { id: 'take-me-to-nirvana', title: 'Take Me to Nirvana (feat. Vinida Weng)', short: 'Take Me to Nirvana', album: '7TH YEAR', isNew: true },
  { id: 'so-what', title: 'So What', album: '7TH YEAR', isNew: true },
  { id: '21st-century-romance', title: '21st Century Romance', album: '7TH YEAR', isNew: true },
  { id: 'the-next-after-next', title: 'The Next After Next', album: '7TH YEAR', isNew: true },
]

export const SONG_MAP = Object.fromEntries(SONGS.map((s) => [s.id, s]))
