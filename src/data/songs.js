// 곡 사전
// - title: true  → 타이틀곡
// - solo: '멤버' → 솔로곡 (soloAlbum: 멤버 개인 앨범에 실린 곡)
// - jp: true     → 일본 오리지널 곡
// - ost: true    → 드라마 OST
// - isNew: true  → 아직 콘서트에서 안 부른 신곡 (7TH YEAR 등)
// - album        → 확실한 것만 적었다. 모르면 비워둔다.
// 세트리스트 등장 여부(🔁)는 setlists.js를 보고 자동으로 계산한다.

export const SONGS = [
  { id: 'loser-lover', title: 'LO$ER=LO♡ER', album: '혼돈의 장: FIGHT OR ESCAPE', title_: true },
  { id: 'wishlist', title: 'Wishlist', album: 'minisode1 : Blue Hour' },
  { id: 'blue-hour', title: '5시 53분의 하늘에서 발견한 너와 나 (Blue Hour)', short: 'Blue Hour', album: 'minisode1 : Blue Hour', title_: true },
  { id: 'blue-orangeade', title: 'Blue Orangeade', album: '꿈의 장: STAR' },
  { id: 'love-language', title: 'Love Language', album: 'Love Language (싱글)', title_: true },
  { id: 'over-the-moon', title: 'Over The Moon', album: '별의 장: SANCTUARY', title_: true },
  { id: 'danger', title: 'Danger', album: '별의 장: SANCTUARY' },
  { id: 'upside-down-kiss', title: 'Upside Down Kiss', album: '별의 장: TOGETHER' },
  { id: 'growing-pain', title: 'Growing Pain', album: '이름의 장: FREEFALL' },
  { id: 'frost', title: 'Frost', album: '혼돈의 장: FREEZE' },
  { id: 'good-boy-gone-bad', title: 'Good Boy Gone Bad', album: 'minisode 2: Thursday\'s Child', title_: true },
  { id: 'farewell-neverland', title: '네버랜드를 떠나며 (Farewell, Neverland)', short: 'Farewell, Neverland', album: '꿈의 장: ETERNITY' },
  { id: 'skipping-stones', title: '물수제비 (Skipping Stones)', short: 'Skipping Stones', album: '이름의 장: FREEFALL' },
  { id: '0x1-lovesong', title: '0X1=LOVESONG (I Know I Love You)', short: '0X1=LOVESONG', album: '혼돈의 장: FREEZE', title_: true },
  { id: 'bird-of-night', title: 'Bird of Night', solo: '태현', album: '별의 장: TOGETHER' },
  { id: 'sunday-driver', title: 'Sunday Driver', solo: '수빈', album: '별의 장: TOGETHER' },
  { id: 'dance-with-you', title: 'Dance With You', solo: '휴닝카이', album: '별의 장: TOGETHER' },
  { id: 'ghost-girl', title: 'Ghost Girl', solo: '연준', album: '별의 장: TOGETHER' },
  { id: 'talk-to-you', title: 'Talk to You', solo: '연준', soloAlbum: true, album: 'NO LABELS: PART 01', title_: true },
  { id: 'take-my-half', title: 'Take My Half', solo: '범규', album: '별의 장: TOGETHER' },
  { id: 'dear-sputnik', title: 'Dear Sputnik' },
  { id: 'where-do-you-go', title: 'Where Do You Go?' },
  { id: 'no-rules', title: 'No Rules', album: '혼돈의 장: FREEZE' },
  { id: 'deja-vu', title: 'Deja Vu', album: 'minisode 3: TOMORROW', title_: true },
  { id: 'eternally', title: 'Eternally', album: '꿈의 장: ETERNITY' },
  { id: 'crown', title: '어느날 머리에서 뿔이 자랐다 (CROWN)', short: 'CROWN', album: '꿈의 장: STAR', title_: true },
  { id: 'beautiful-strangers', title: 'Beautiful Strangers', album: '별의 장: TOGETHER', title_: true },
  { id: 'song-of-the-stars', title: '별의 노래 (Song of the Stars)', short: 'Song of the Stars', album: '별의 장: TOGETHER' },
  { id: 'miracle', title: 'Miracle', album: 'minisode 3: TOMORROW' },
  { id: 'higher-than-heaven', title: 'Higher Than Heaven', jp: true, title_: true },
  { id: 'see-you-there-tomorrow', title: '내일에서 기다릴게 (I\'ll See You There Tomorrow)', short: 'I\'ll See You There Tomorrow', album: 'minisode 3: TOMORROW' },
  { id: 'moa-diary', title: '교환일기 (두밧두 와리와리) (MOA Diary)', short: 'MOA Diary', album: '혼돈의 장: FIGHT OR ESCAPE' },
  { id: 'magic', title: 'Magic', album: '혼돈의 장: FREEZE' },
  { id: 'our-summer', title: 'Our Summer', album: '꿈의 장: STAR' },
  { id: 'cat-dog', title: 'Cat & Dog', album: '꿈의 장: STAR' },
  { id: 'sweat', title: 'Sweat' },
  { id: 'kitto-zutto', title: 'きっとずっと (Kitto Zutto)', short: 'Kitto Zutto', jp: true },
  { id: 'cant-stop', title: 'Can\'t Stop' },
  { id: 'hitori-no-yoru', title: 'ひとりの夜 (Hitori no Yoru)', short: 'Hitori no Yoru', jp: true },
  { id: 'new-rules', title: 'New Rules', album: '꿈의 장: MAGIC' },
  { id: 'everlasting-shine', title: 'Everlasting Shine', jp: true },
  { id: 'happy-fools', title: 'Happy Fools', album: '이름의 장: TEMPTATION' },

  // 지난 투어 세트리스트엔 없지만 공식 응원법이 있는 곡
  { id: 'run-away', title: '9와 4분의 3 승강장에서 너를 기다려 (Run Away)', short: 'Run Away', album: '꿈의 장: MAGIC', title_: true },
  { id: 'angel-or-devil', title: 'Angel Or Devil', album: '꿈의 장: MAGIC' },
  { id: 'drama', title: 'DRAMA', album: '꿈의 장: ETERNITY' },
  { id: 'cant-you-see-me', title: "세계가 불타버린 밤, 우린... (Can't You See Me?)", short: "Can't You See Me?", album: '꿈의 장: ETERNITY', title_: true },
  { id: 'puma', title: '동물원을 빠져나온 퓨마 (PUMA)', short: 'PUMA', album: '꿈의 장: ETERNITY' },
  { id: 'we-lost-the-summer', title: '날씨를 잃어버렸어 (We Lost The Summer)', short: '날씨를 잃어버렸어', album: 'minisode1 : Blue Hour' },
  { id: 'opening-sequence', title: 'Opening Sequence', album: "minisode 2: Thursday's Child" },
  { id: 'devil-by-the-window', title: 'Devil by the Window', album: '이름의 장: TEMPTATION' },
  { id: 'sugar-rush-ride', title: 'Sugar Rush Ride', album: '이름의 장: TEMPTATION', title_: true },
  { id: 'chasing-that-feeling', title: 'Chasing That Feeling', album: '이름의 장: FREEFALL', title_: true },
  { id: 'back-for-more', title: 'Back For More', album: '이름의 장: FREEFALL' },
  { id: 'hitotsu-no-chikai', title: "ひとつの誓い (We'll Never Change)", short: 'ひとつの誓い', album: '誓い (CHIKAI)', jp: true },
  { id: 'forty-one-winks', title: 'Forty One Winks', album: '별의 장: SANCTUARY' },

  // 지난 투어(ACT : BOY ~ ACT : PROMISE) 세트리스트에 나온 곡
  { id: 'poppin-star', title: "Poppin' Star", album: '꿈의 장: STAR' },
  { id: 'nap-of-a-star', title: 'Nap of a Star', album: '꿈의 장: STAR' },
  { id: 'cwjltma', title: "Can't We Just Leave The Monster Alive?", short: 'CWJLTMA', album: '꿈의 장: MAGIC' },
  { id: 'magic-island', title: 'Magic Island', album: '꿈의 장: MAGIC' },
  { id: '20cm', title: '20cm' },
  { id: 'ice-cream', title: 'Ice Cream' },
  { id: 'fairy-of-shampoo', title: 'Fairy of Shampoo', album: '꿈의 장: ETERNITY' },
  { id: 'ghosting', title: 'Ghosting', album: 'minisode1 : Blue Hour' },
  { id: 'what-if-puma', title: 'What if I had been that PUMA', album: '혼돈의 장: FREEZE' },
  { id: 'maze-in-the-mirror', title: 'Maze in the Mirror', album: '혼돈의 장: FREEZE' },
  { id: 'anti-romantic', title: 'Anti-Romantic', album: '혼돈의 장: FREEZE' },
  { id: 'lonely-boy', title: 'Lonely Boy (The Tattoo On My Ring Finger)', short: 'Lonely Boy', album: '혼돈의 장: FIGHT OR ESCAPE' },
  { id: 'trust-fund-baby', title: 'Trust Fund Baby' },
  { id: 'thursdays-child', title: "Thursday's Child Has Far To Go", album: "minisode 2: Thursday's Child" },
  { id: 'tinnitus', title: 'Tinnitus (Wanna be a rock)', short: 'Tinnitus', album: '이름의 장: TEMPTATION' },
  { id: 'blue-spring', title: 'Blue Spring', album: '이름의 장: FREEFALL' },
  { id: 'dreamer', title: 'Dreamer', album: '이름의 장: FREEFALL' },
  { id: 'deep-down', title: 'Deep Down', album: '이름의 장: FREEFALL' },
  { id: 'quarter-life', title: 'Quarter Life', album: 'minisode 3: TOMORROW' },
  { id: 'the-killa', title: 'The Killa (I Belong to You)', short: 'The Killa', album: 'minisode 3: TOMORROW' },
  { id: 'force', title: 'Force', jp: true },
  { id: 'ring', title: 'Ring', jp: true },
  { id: 'hydrangea-love', title: 'Hydrangea Love', jp: true },
  { id: 'ito', title: 'Ito', jp: true },

  // 범규 솔로 (2026 MOA CON에서 부름)
  { id: 'panic', title: 'Panic', solo: '범규', soloAlbum: true, album: "BEOMGYU's Mixtape: Panic (2025)", title_: true },
  // 드라마 OST (2025.05.11)
  { id: 'geunari-omyeon', title: '그날이 오면', album: '언젠가는 슬기로울 전공의생활 OST Part 9', ost: true },

  // 연준 솔로 (응원법이 있는 곡만)
  { id: 'ggum', title: 'GGUM', solo: '연준', soloAlbum: true, album: "YEONJUN's Mixtape: GGUM (2024)", title_: true },
  { id: 'yj-coma', title: 'Coma', solo: '연준', soloAlbum: true, album: 'NO LABELS: PART 01' },
  { id: 'yj-ice-cream', title: 'Ice Cream', solo: '연준', soloAlbum: true, album: 'NO LABELS: PART 02', title_: true },
  { id: 'yj-fxxking-star', title: 'Fxxking Star', solo: '연준', soloAlbum: true, album: 'NO LABELS: PART 02' },

  // 일본 싱글 5집 Setsuna Hanabi (2026.08.19) — 이번 일본 공연 예상 신곡
  { id: 'setsuna-hanabi', title: 'セツナハナビ (Setsuna Hanabi)', short: 'Setsuna Hanabi', album: 'Setsuna Hanabi (일본 싱글 5집)', jp: true, title_: true, isNew: true },
  { id: 'jp-silence', title: 'Silence', album: 'Setsuna Hanabi (일본 싱글 5집)', jp: true, isNew: true },
  { id: 'nice-to-meet-ya', title: 'Nice to Meet Ya', album: 'Setsuna Hanabi (일본 싱글 5집)', jp: true, isNew: true },

  // 7TH YEAR (2026.04) — 이번 투어 예상 신곡
  { id: 'just-one-more-day', title: '하루에 하루만 더 (Stick With You)', short: '하루에 하루만 더', album: '7TH YEAR', title_: true, isNew: true },
  { id: 'bed-of-thorns', title: 'Bed of Thorns', album: '7TH YEAR', isNew: true },
  { id: 'take-me-to-nirvana', title: 'Take Me to Nirvana (feat. Vinida Weng)', short: 'Take Me to Nirvana', album: '7TH YEAR', isNew: true },
  { id: 'so-what', title: 'So What', album: '7TH YEAR', isNew: true },
  { id: '21st-century-romance', title: '21st Century Romance', album: '7TH YEAR', isNew: true },
  { id: 'the-next-after-next', title: 'The Next After Next', album: '7TH YEAR', isNew: true },
]

export const SONG_MAP = Object.fromEntries(SONGS.map((s) => [s.id, s]))
