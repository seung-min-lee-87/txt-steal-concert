// STEAL THE WIND 월드투어 전체 일정 (AND MORE — 추가 발표 예정)
// 출처: 공식 일정 포스터·발표 기사(2026.08) — 바뀌면 여기만 고치면 된다.

export const TOUR = {
  name: 'STEAL THE WIND',
  fullName: 'TOMORROW X TOGETHER WORLD TOUR <STEAL THE WIND>',
  meaning: '흐름을 내 것으로 만들다',
}

// 공연장(venue)은 공식 발표된 곳만 적었다. 비어 있으면 아직 미발표.
export const SHOWS = [
  {
    id: 'seoul',
    region: 'KR',
    area: 'Korea',
    city: '서울',
    venue: 'KSPO DOME',
    dates: ['2026-11-13', '2026-11-14', '2026-11-15'],
    note: '투어 첫 공연! 새 앨범 「PERFECT STORM」(11/16 발매) 바로 전이라 신곡 선공개 가능성 있음',
  },
  { id: 'macau', 
    region: 'MO', 
    area: 'Asia',
    city: '마카오', 
    venue: 'GALAXY ARENA', 
    dates: ['2026-11-21', '2026-11-22'] },
  {
    id: 'fukuoka',
    region: 'JP',
    area: 'Japan',
    city: '후쿠오카',
    venue: 'MIZUHO PayPay Dome FUKUOKA',
    dates: ['2026-12-19', '2026-12-20'],
  },
  {
    id: 'tokyo',
    region: 'JP',
    area: 'Japan',
    city: '도쿄',
    venue: 'Tokyo Dome',
    dates: ['2027-01-07', '2027-01-08'],
  },
  {
    id: 'osaka',
    region: 'JP',
    area: 'Japan',
    city: '오사카',
    venue: 'Kyocera Dome Osaka',
    dates: ['2027-01-30', '2027-01-31'],
  },
  {
    id: 'aichi',
    region: 'JP',
    area: 'Japan',
    city: '아이치(나고야)',
    venue: 'Vantelin Dome Nagoya',
    dates: ['2027-02-20', '2027-02-21'],
  },
  { id: 'kaohsiung', region: 'TW', area: 'Asia', city: '가오슝', dates: ['2027-03-06', '2027-03-07'] },
  { id: 'kuala-lumpur', region: 'MY', area: 'Asia', city: '쿠알라룸푸르', dates: ['2027-03-13'] },
  { id: 'jakarta', region: 'ID', area: 'Asia', city: '자카르타', dates: ['2027-03-20'] },
  { id: 'tacoma', region: 'US', area: 'North America', city: '타코마', dates: ['2027-05-04'] },
  { id: 'inglewood', region: 'US', area: 'North America', city: '잉글우드(LA)', dates: ['2027-05-07'] },
  { id: 'mexico-city', region: 'MX', area: 'North America', city: '멕시코시티', dates: ['2027-05-12'] },
  { id: 'fort-worth', region: 'US', area: 'North America', city: '포트워스', dates: ['2027-05-15'] },
  { id: 'atlanta', region: 'US', area: 'North America', city: '애틀랜타', dates: ['2027-05-18'] },
  { id: 'belmont-park', region: 'US', area: 'North America', city: '벨몬트 파크(뉴욕)', dates: ['2027-05-22'] },
  { id: 'chicago', region: 'US', area: 'North America', city: '시카고', dates: ['2027-05-25'] },
  { id: 'manchester', region: 'GB', area: 'Europe', city: '맨체스터', dates: ['2027-06-02'] },
  { id: 'milan', region: 'IT', area: 'Europe', city: '밀라노', dates: ['2027-06-05'] },
  { id: 'paris', region: 'FR', area: 'Europe', city: '파리', dates: ['2027-06-07'] },
  { id: 'amsterdam', region: 'NL', area: 'Europe', city: '암스테르담', dates: ['2027-06-10'] },
  { id: 'antwerp', region: 'BE', area: 'Europe', city: '안트베르펜', dates: ['2027-06-12'] },
  { id: 'cologne', region: 'DE', area: 'Europe', city: '쾰른', dates: ['2027-06-14'] },
  { id: 'hong-kong', region: 'HK', area: 'Asia', city: '홍콩', dates: ['2027-06-19', '2027-06-20'] },
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

export const FLAGS = { KR: '🇰🇷', JP: '🇯🇵', MO: '🇲🇴', TW: '🇹🇼', MY: '🇲🇾', ID: '🇮🇩', US: '🇺🇸', MX: '🇲🇽', GB: '🇬🇧', IT: '🇮🇹', FR: '🇫🇷', NL: '🇳🇱', BE: '🇧🇪', DE: '🇩🇪', HK: '🇭🇰' }
