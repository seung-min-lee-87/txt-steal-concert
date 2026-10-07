// 실제 음악방송 무대 영상 (관객 응원 소리가 들리는 것)
// 곡별로 여러 개 넣을 수 있다. offset: 응원법 시간(음원 기준)에 더할 값(초).
//   offset을 모르면 비워두면 되고, 화면에서 "한 번에 맞추기"로 맞추면 된다.
// 관객이 있던 시기(2019~2020.2, 2022.5~) 방송사 공식 채널 영상만 골랐다.
export const STAGES = {
  'blue-orangeade': [{ id: 'XNBe4AIRrxc', show: '더쇼', date: '2019-03-12' }],
  'crown': [{ id: 'KjFowwKfVuI', show: '뮤직뱅크', date: '2019-03-29' }, { id: '9nwyKQVUwD0', show: '엠카운트다운', date: '2019-03-21' }],
  'cat-dog': [{ id: 'IzWug96-zNE', show: '뮤직뱅크', date: '2019-05-03' }, { id: 'dWHAiC9G1eE', show: '엠카운트다운', date: '2019-05-02' }],
  'new-rules': [{ id: 'HMG67w8yQ_c', show: '뮤직뱅크', date: '2019-12-20' }],
  'run-away': [{ id: 'ZGuYGJ7Liss', show: '뮤직뱅크', date: '2019-11-15' }, { id: 'y_VESOhq3tY', show: '엠카운트다운', date: '2019-11-07' }],
  'angel-or-devil': [{ id: '3_FAG693htE', show: '뮤직뱅크', date: '2019-11-29' }, { id: 'L487HniOBbU', show: '엠카운트다운', date: '2019-10-24' }],
  'loser-lover': [{ id: 'YfLjfvLC0Po', show: '전국반짝투어', date: '2025-08-12' }],
  'opening-sequence': [{ id: 'CZmUIA6r5tQ', show: '뮤직뱅크', date: '2022-05-20' }],
  'good-boy-gone-bad': [{ id: '_XcOu_PN_10', show: '뮤직뱅크', date: '2022-06-24' }, { id: 'AoKEa5AkXig', show: '뮤직뱅크', date: '2022-05-20' }],
  'devil-by-the-window': [{ id: '75TVBD4QdLg', show: '뮤직뱅크', date: '2023-02-10' }, { id: '3cYjeHjWXZQ', show: '엠카운트다운', date: '2023-02-02' }],
  'sugar-rush-ride': [{ id: 'JqcigPL5p9M', show: '뮤직뱅크', date: '2023-02-10' }, { id: '1ltsjA7kMfM', show: '엠카운트다운', date: '2023-02-09' }],
  'chasing-that-feeling': [{ id: 'w_DQu1JoKvY', show: '뮤직뱅크', date: '2023-10-27' }, { id: 'Km2M14Tvyis', show: '엠카운트다운', date: '2023-10-19' }],
  'back-for-more': [{ id: 'tDr8PMkkYqo', show: '뮤직뱅크', date: '2023-10-13' }, { id: '9zq49ktu3Sk', show: '엠카운트다운', date: '2023-10-19' }],
  'see-you-there-tomorrow': [{ id: '679oSwJav0U', show: '뮤직뱅크', date: '2024-04-05' }, { id: 'VTS9cWe5atA', show: '음악중심', date: '2024-04-06' }],
  'deja-vu': [{ id: 'IySlMjDGbsM', show: '뮤직뱅크', date: '2024-04-12' }, { id: 'C3HY9Ay_1L0', show: '음악중심', date: '2024-04-13' }],
  'over-the-moon': [{ id: 'mmSamMi6xF0', show: '뮤직뱅크', date: '2024-11-15' }, { id: 'L9yLkv7Fvu4', show: '음악중심', date: '2024-11-16' }],
  'forty-one-winks': [{ id: 'bPXKEhNC1tY', show: '뮤직뱅크', date: '2024-11-08' }, { id: 'kTcPjzr3-yA', show: '음악중심', date: '2024-11-09' }],
  'love-language': [{ id: 'W-LOSGElZ_M', show: '뮤직뱅크', date: '2025-05-02' }, { id: 'smkrQN0KUr8', show: '음악중심', date: '2025-05-03' }],
  'upside-down-kiss': [{ id: 'YfN7xDsnexU', show: '뮤직뱅크', date: '2025-07-25' }, { id: 'Z6o28Y0rPGk', show: '음악중심', date: '2025-07-26' }],
  'beautiful-strangers': [{ id: 'hbQDOj9zA6E', show: '음악중심', date: '2025-08-02' }, { id: 'otHnLdTLWzY', show: '엠카운트다운', date: '2025-07-24' }],
  'just-one-more-day': [{ id: '7pmx0fJ_OZo', show: '뮤직뱅크', date: '2026-04-24' }, { id: 'jHF6YjFx2-A', show: '음악중심', date: '2026-04-25' }],
  'cant-stop': [{ id: 'ZL2g7oQiT-I', show: '뮤뱅 글로벌페스티벌', date: '2025-12-30' }],
  'where-do-you-go': [{ id: 'iv_phX-6KHY', show: '뮤뱅 글로벌페스티벌', date: '2025-12-30' }],
}

export const stagesOf = (songId) => STAGES[songId] || []
export const findStage = (songId, vid) => stagesOf(songId).find((s) => s.id === vid)

// '엠카운트다운' + '2023-01-26' → '엠카 23.01.26'
const SHORT = { 엠카운트다운: '엠카', 뮤직뱅크: '뮤뱅', 음악중심: '음중', 인기가요: '인가', 쇼챔피언: '쇼챔', 더쇼: '더쇼', '뮤뱅 글로벌페스티벌': '뮤뱅 글페', 전국반짝투어: '반짝투어' }
export const stageLabel = (s) => `${SHORT[s.show] || s.show} ${s.date.slice(2).replaceAll('-', '.')}`
