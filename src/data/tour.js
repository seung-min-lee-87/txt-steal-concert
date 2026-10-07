// STEAL THE WIND 투어 중 서울·일본 공연 일정
// 출처: 공식 발표 기사(2026.08) — 바뀌면 여기만 고치면 된다.

export const TOUR = {
  name: 'STEAL THE WIND',
  fullName: 'TOMORROW X TOGETHER WORLD TOUR <STEAL THE WIND>',
  meaning: '"바람을 훔치다"',
}

export const SHOWS = [
  {
    id: 'seoul',
    region: 'KR',
    city: '서울',
    venue: 'KSPO DOME',
    dates: ['2026-11-13', '2026-11-14', '2026-11-15'],
    note: '투어 첫 공연! 새 앨범 「PERFECT STORM」(11/16 발매) 바로 전이라 신곡 선공개 가능성 있음',
  },
  {
    id: 'fukuoka',
    region: 'JP',
    city: '후쿠오카',
    venue: 'MIZUHO PayPay Dome FUKUOKA',
    dates: ['2026-12-19', '2026-12-20'],
  },
  {
    id: 'tokyo',
    region: 'JP',
    city: '도쿄',
    venue: 'Tokyo Dome',
    dates: ['2027-01-07', '2027-01-08'],
  },
  {
    id: 'osaka',
    region: 'JP',
    city: '오사카',
    venue: 'Kyocera Dome Osaka',
    dates: ['2027-01-30', '2027-01-31'],
  },
  {
    id: 'aichi',
    region: 'JP',
    city: '아이치(나고야)',
    venue: 'Vantelin Dome Nagoya',
    dates: ['2027-02-20', '2027-02-21'],
  },
]

export const ALBUM_NEWS = [
  {
    title: 'PERFECT STORM',
    kind: '미니 9집',
    date: '2026-11-16',
    upcoming: true,
    logo: '/images/perfect-storm-logo.webp',
    links: [{ label: 'Spotify Pre-save', url: 'https://open.spotify.com/prerelease/44rCERevbz2R43ePnAggT7' }],
  },
]
