// 화면 글자 한국어/영어 전환.
// - tr('한국어 문장'): 영어 모드면 사전(EN)의 영어로, 없으면 한국어 그대로. {n} 같은 자리는 vars로 채운다.
// - trData('2026 MOA CON 서울'): 공연 이름·도시·멤버 이름처럼 데이터에 든 짧은 글자용. 사전에 없으면 낱말(PARTS)을 바꿔 끼운다.
// 언어 상태는 App이 들고 있다가 setLang으로 바꾸고, App이 다시 그려지면서 모든 화면이 새 언어로 나온다.
import { loadJSON, saveJSON } from './storage'

let LANG = 'ko'

export function initialLang() {
  const saved = loadJSON('lang', null)
  if (saved === 'ko' || saved === 'en') return saved
  // 처음 온 사람: 브라우저 언어가 한국어가 아니면 영어로
  return (navigator.language || 'ko').toLowerCase().startsWith('ko') ? 'ko' : 'en'
}

export function setCurrentLang(lang) {
  LANG = lang
  if (typeof document !== 'undefined') document.documentElement.lang = lang
}

export function saveLang(lang) {
  saveJSON('lang', lang)
}

export const isEn = () => LANG === 'en'

function fill(s, vars) {
  if (!vars) return s
  return Object.entries(vars).reduce((out, [k, v]) => out.replaceAll(`{${k}}`, v), s)
}

export function tr(ko, vars) {
  return fill(LANG === 'en' ? (EN[ko] ?? ko) : ko, vars)
}

export function trData(ko) {
  if (LANG !== 'en' || !ko) return ko
  if (EN[ko]) return EN[ko]
  return PARTS_SORTED.reduce((out, [k, v]) => out.replaceAll(k, v), ko)
}

// 데이터 안의 낱말 (도시·멤버·공연장·묶음 이름)
const PARTS = {
  '서울 (온라인)': 'Seoul (Online)',
  서울: 'Seoul',
  도쿄: 'Tokyo',
  오사카: 'Osaka',
  마카오: 'Macau',
  후쿠오카: 'Fukuoka',
  '아이치(나고야)': 'Aichi (Nagoya)',
  가오슝: 'Kaohsiung',
  쿠알라룸푸르: 'Kuala Lumpur',
  자카르타: 'Jakarta',
  타코마: 'Tacoma',
  '잉글우드(LA)': 'Inglewood (LA)',
  멕시코시티: 'Mexico City',
  포트워스: 'Fort Worth',
  애틀랜타: 'Atlanta',
  '벨몬트 파크(뉴욕)': 'Belmont Park (NY)',
  시카고: 'Chicago',
  맨체스터: 'Manchester',
  밀라노: 'Milan',
  파리: 'Paris',
  암스테르담: 'Amsterdam',
  안트베르펜: 'Antwerp',
  쾰른: 'Cologne',
  홍콩: 'Hong Kong',
  고척스카이돔: 'Gocheok Sky Dome',
  잠실실내체육관: 'Jamsil Indoor Stadium',
  '온라인 생중계': 'Online livestream',
  휴닝카이: 'Hueningkai',
  수빈: 'Soobin',
  연준: 'Yeonjun',
  범규: 'Beomgyu',
  태현: 'Taehyun',
  '막공 추가': 'added on last day',
  앙코르: 'Encore',
  앵콜: 'Encore',
  '본 공연': 'Main set',
  '솔로 무대': 'Solo stages',
  후반부: 'Second half',
  공연: 'Show',
  솔로: 'solo',
}
const PARTS_SORTED = Object.entries(PARTS).sort((a, b) => b[0].length - a[0].length)

// 화면 문장 사전 (한국어 → 영어)
const EN = {
  // 메뉴·공통
  투어: 'Tour',
  세트리스트: 'Setlist',
  응원법: 'Fanchants',
  연습: 'Practice',
  'STEAL THE WIND 홈': 'STEAL THE WIND home',
  닫기: 'Close',
  재생: 'Play',
  일시정지: 'Pause',
  일시정지됨: 'Paused',
  '재생 끄기': 'Stop playback',
  '이 사이트는 투바투 늦덕이 콘서트 대비 응원 연습을 위해 임의로 만든 비영리 비공식 팬 페이지입니다. 이미지·영상·가사의 저작권은 BIGHIT MUSIC에 있으며, 응원법은 공식사이트, weverse, 나무위키 문서 등을 참고했습니다.':
    'This is an unofficial, non-profit fan page made by a new MOA to practice fanchants before the concerts. All images, videos and lyrics belong to BIGHIT MUSIC. Fanchants are based on official notices, Weverse and Namuwiki.',

  // 투어 화면
  '서울 공연 포스터': 'Seoul concert poster',
  '전체 투어 일정 포스터': 'Full tour schedule poster',
  한국: 'Korea',
  일본: 'Japan',
  아시아: 'Asia',
  북미: 'North America',
  유럽: 'Europe',
  '내가 가는 다음 공연': 'My next show',
  '다음 공연': 'Next show',
  '📣 응원법 보러 가기': '📣 Learn the fanchants',
  '📝 지난 세트리스트': '📝 Past setlists',
  '공연 일정': 'Schedule',
  '내가 가는 날을 눌러 표시해두면 위 카운트다운이 해당 날짜로 바뀝니다.': 'Tap the dates you’re going to — the countdown above will switch to that date.',
  '다른 도시': 'More cities',
  '공식 포스터': 'Official posters',
  '{name} 크게 보기': 'View {name} larger',
  '새 앨범 체크': 'New album',
  '발매 예정 ': 'Release ',
  '공연장 발표 전': 'Venue TBA',
  '✔ 가요': '✔ Going',
  '🔇 소리 끄기': '🔇 Sound off',
  '🔊 소리 켜기': '🔊 Sound on',
  '미니 9집': '9th mini album',
  '투어 첫 공연 (3회 매진). 세트리스트 탭에서 셋리를 볼 수 있어요.': 'Tour opener (3 sold-out shows). See the setlist in the Setlist tab.',
  'AND MORE — 추가 공연은 발표되는 대로 넣을게요.': 'AND MORE — new dates will be added as they are announced.',

  // 세트리스트 화면
  전체: 'All',
  '👑 타이틀': '👑 Title',
  '✨ 신곡': '✨ New',
  '🔁 지난 투어': '🔁 Past tours',
  '🇯🇵 일본곡': '🇯🇵 Japanese',
  '🎤 솔로': '🎤 Solo',
  '📣 준비됨': '📣 Has fanchant',
  'STEAL THE WIND 서울 공연과 지난 콘서트들의 서울·일본 공연을 모아뒀어요. ': 'STEAL THE WIND Seoul plus past concerts in Seoul and Japan. ',
  '곡을 누르면 응원법(없으면 연습 화면)으로 가요.': 'Tap a song to open its fanchant (or practice page).',
  '응원법이 있는 곡(📣)을 누르면 응원법 화면으로 가요.': 'Tap a song with 📣 to open its fanchant.',
  '투어 선택': 'Choose tour',
  '📚 곡 모아보기': '📚 All songs',
  '공연 선택': 'Choose show',
  '{name} 포스터': '{name} poster',
  '포스터 크게 보기': 'View poster larger',
  '출처: {src} · 앙코르는 공연 날마다 달라요. 틀린 부분이 있으면 알려주세요.': 'Source: {src} · Encores change by date. Let us know if anything is wrong.',
  'setlist.fm·공연 후기 기사': 'setlist.fm · concert reviews',
  '사용자 정리 셋리스트 (2026.11.13–15 서울 공연)': 'Fan-compiled setlist (Seoul, Nov 13–15, 2026)',

  // 아이콘 설명·뱃지
  타이틀곡: 'Title track',
  수록곡: 'B-side',
  솔로곡: 'Solo',
  '일본곡 / 일본어 ver.': 'Japanese / Japanese ver.',
  '신곡 (아직 라이브 전)': 'New (not yet performed)',
  '지난 투어에서 부른 곡': 'Performed on past tours',
  '내 응원법 준비됨': 'Fanchant available',
  타이틀: 'Title',
  일본곡: 'Japanese',
  '일본어 ver.': 'Japanese ver.',
  신곡: 'New',
  '지난 공연 {n}회': '{n} past shows',

  // 응원법 목록
  '🔁 지난 투어 곡': '🔁 Past tour songs',
  '⏱ 싱크 완료': '⏱ Synced',
  기타: 'Others',
  '공식 응원법 {n}곡. 곡을 누르면 공식 영상과 함께 응원법을 보면서 따라 할 수 있습니다.': '{n} official fanchants. Tap a song to follow the fanchant along with the video.',
  '곡 이름 검색': 'Search songs',
  '조건에 맞는 곡이 없습니다.': 'No matching songs.',
  '📣 {n}곳': '📣 {n} parts',
  '📺 음방 응원': '📺 Live stage',
  '응원법 출처: {src} · 연준 솔로곡·「그날이 오면」·일본곡은 공식 응원법 공지': 'Fanchant source: {src} · Yeonjun solos, “그날이 오면” and Japanese songs: official notices',

  // 응원법 상세
  '← 응원법 전체': '← All fanchants',
  '📺 {show} 실제 무대예요. 팬들 응원 소리를 들으며 따라 해보세요!': '📺 A real {show} stage — follow along with the fans’ chants!',
  '🎬 뮤직비디오는 중간 연출 때문에 응원법 싱크가 맞지 않아요. 영상 감상용이에요.': '🎬 The MV has extra scenes, so the fanchant timing won’t match. Just for watching.',
  '이 곡은 아직 영상이 없습니다.': 'No video for this song yet.',
  '▶ 유튜브 ↗': '▶ YouTube ↗',
  '🍈 멜론 ↗': '🍈 Melon ↗',
  '📣 연습 모드': '📣 Practice mode',
  '보는 법': 'How to read',
  '파란 굵은 줄': 'Bold blue line',
  '다 같이 외쳐요': 'Everyone chants',
  '줄 안의': 'Inside a line,',
  '파란 글자': 'blue text',
  '그 부분만 외쳐요': 'chant only that part',
  '흰 글씨': 'White text',
  '멤버 파트 (듣기)': 'Members sing (listen)',
  취소선: 'Strikethrough',
  '멤버 가사 위로 팬이 대신 외쳐요': 'Fans chant over the members’ line',
  '🇰🇷 한국어 발음 {v}': '🇰🇷 Korean pronunciation {v}',
  켜짐: 'on',
  꺼짐: 'off',
  '자동 따라가기 켜짐': 'Auto-scroll on',
  '자동 따라가기 꺼짐': 'Auto-scroll off',
  '응원법 출처: {src}': 'Fanchant source: {src}',
  '5초 뒤로': 'Back 5 seconds',
  '5초 앞으로': 'Forward 5 seconds',
  '지금!': 'Now!',
  '줄별 시간: lrclib.net 공개 싱크 가사를 음원 기준으로 자동 정렬 (일부는 추정값)': 'Line timing: auto-aligned from lrclib.net synced lyrics (some are estimates)',
  '나무위키 「투모로우바이투게더/응원법」 (2026-06-19 수정본), CC BY-NC-SA 2.0 KR': 'Namuwiki “TOMORROW X TOGETHER/Fanchants” (rev. 2026-06-19), CC BY-NC-SA 2.0 KR',
  '공식 응원법 안내 (캡처 제공)': 'Official fanchant notice (screenshot)',
  '위버스 공식 공지 「연준 응원법 안내」': 'Official Weverse notice (Yeonjun fanchants)',
  "위버스 공식 공지 「'Can't Stop' 응원법 안내」": "Official Weverse notice ('Can't Stop' fanchant)",
  "위버스 공식 공지 「'Where Do You Go?' 응원법 안내」": "Official Weverse notice ('Where Do You Go?' fanchant)",
  "위버스 공식 공지 「'ひとつの誓い (We’ll Never Change)' 응원법 안내」": "Official Weverse notice ('ひとつの誓い' fanchant)",
  "위버스 공식 공지 「HI-BOYZ '그날이 오면' 응원법 안내」": "Official Weverse notice (HI-BOYZ '그날이 오면' fanchant)",

  // 영상 종류·방송
  '안무 연습 영상': 'Dance practice',
  '안무 영상': 'Choreography video',
  '공식 영상': 'Official video',
  '무대 영상': 'Stage video',
  '퍼포먼스 영상': 'Performance video',
  '스페셜 필름': 'Special film',
  '스튜디오 춤': 'STUDIO CHOOM',
  '공식 MV': 'Official MV',
  영상: 'Video',
  뮤직뱅크: 'Music Bank',
  엠카운트다운: 'M COUNTDOWN',
  음악중심: 'Music Core',
  인기가요: 'Inkigayo',
  쇼챔피언: 'Show Champion',
  더쇼: 'THE SHOW',
  '뮤뱅 글로벌페스티벌': 'Music Bank Global Festival',
  전국반짝투어: 'Mnet tour show',
  컴백쇼: 'Comeback show',
  '더 시즌즈 밴드': 'The Seasons (band)',
  '데뷔 쇼케이스': 'Debut showcase',
  '📣 데뷔 쇼케이스': '📣 Debut showcase',
  '📣 쇼챔 EP.307': '📣 Show Champion EP.307',
  '📣 쇼챔 EP.338': '📣 Show Champion EP.338',
  '📣 쇼챔 EP.355': '📣 Show Champion EP.355',
  '📺 뮤직뱅크 K-Choreo(전체 직캠) 영상이에요.': '📺 Music Bank K-Choreo (full group cam).',
  '🎥 STUDIO CHOOM 퍼포먼스 영상이에요.': '🎥 STUDIO CHOOM performance video.',
  '📺 Mnet 데뷔 셀러브레이션 쇼 무대예요.': '📺 Mnet Debut Celebration Show stage.',
  '📺 Mnet 컴백쇼 「Thursday’s Child」 풀캠 영상이에요.': '📺 Mnet comeback show “Thursday’s Child” full cam.',
  '🎥 M2 Performance37 퍼포먼스 영상이에요.': '🎥 M2 Performance37 performance video.',

  // 영상 맞추기
  '✓ 영상과 맞춰져 있어요': '✓ Synced with the video',
  '보정 {v}초': 'offset {v}s',
  '응원법이 늦게 나오면': 'If the chant shows up late',
  '응원법이 빨리 나오면': 'If the chant shows up early',
  '◀ 0.3초 빨리': '◀ 0.3s earlier',
  '0.3초 늦게 ▶': '0.3s later ▶',
  '다시 맞추기': 'Re-sync',
  '이 기기에서 맞춘 값을 지우고 사이트 기본 싱크로': 'Clear the timing saved on this device',
  '↺ 공개 싱크로 되돌리기': '↺ Reset to default sync',
  '⏱ 영상과 한 번만 맞춰주세요': '⏱ Sync with the video once',
  '영상을 ▶ 재생해요.': 'Play ▶ the video.',
  '이 가사가': 'The moment you',
  '들리기 시작하는 순간': 'start to hear this line',
  '「지금!」을 눌러요': ', tap “Now!”',
  취소: 'Cancel',
  '재생 중일 때 누를 수 있어요.': 'Available while playing.',

  // 재생기
  '▶ 이 곡 재생': '▶ Play this song',
  '지금 재생 중인 곡 대신 이 곡을 틀어요': 'Plays this instead of the current song',
  '{title} 응원법 화면으로': 'Open {title} fanchant',

  // 요일
  일: 'Sun',
  월: 'Mon',
  화: 'Tue',
  수: 'Wed',
  목: 'Thu',
  금: 'Fri',
  토: 'Sat',
}
