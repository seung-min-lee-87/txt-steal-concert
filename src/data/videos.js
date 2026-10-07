// 곡별 공식 유튜브 영상 (HYBE LABELS / TOMORROW X TOGETHER OFFICIAL 채널)
// 응원법 시간이 음원 기준이라, 음원과 길이가 같은 영상(주로 안무 연습 영상)을 우선 골랐다.
// mv: 공식 MV가 따로 있으면 그 영상 id (앞뒤 연출 때문에 "한 번에 맞추기" 필요)
// dur: 영상 길이(초). 바꾸려면 id만 고치면 된다.
export const VIDEOS = {
  'loser-lover': { id: 'JzODRUBBXpc', kind: 'MV', dur: 237 }, // TXT (투모로우바이투게더) 'LO$ER=LO♡ER' Official MV
  'wishlist': { id: 'ApKJya5GDzo', kind: '공식 영상', dur: 201 }, // [T:TIME] ‘Wishlist’ Special Video (Holiday ver.) - TXT (투모로우바이투게더)
  'blue-hour': { id: 'Vd9QkWsd5p4', kind: 'MV', dur: 304 }, // TXT (투모로우바이투게더) '5시 53분의 하늘에서 발견한 너와 나' Official MV
  'blue-orangeade': { id: 'nzgUcGMR2QI', kind: '안무 연습 영상', dur: 186 }, // TXT (투모로우바이투게더) ‘Blue Orangeade’ Dance Practice
  'love-language': { id: '9mMg2b7-K4E', kind: '공식 영상', dur: 179, mv: '8aRTMQvbODs' }, // TXT (투모로우바이투게더) 'Love Language' Special Film
  'over-the-moon': { id: 'oCYVYbk0quo', kind: '안무 연습 영상', dur: 158, mv: '80SH8Z_DOnY' }, // ‘Over The Moon’ Dance Practice | TXT (투모로우바이투게더)
  'danger': { id: '7jS65GRR8Kc', kind: '퍼포먼스 영상', dur: 159 }, // 'Danger' Performance Video (raw ver.) | TXT (투모로우바이투게더)
  'upside-down-kiss': { id: 'eHC1Y-TrC7U', kind: '퍼포먼스 영상', dur: 170 }, // TOMORROW X TOGETHER 'Upside Down Kiss' | Spotify Performance Video
  'growing-pain': { id: 'SW2eKuGszR4', kind: '무대 영상', dur: 217 }, // ‘Growing Pain’ stage @ ACT : PROMISE IN SEOUL | T:TIME | TXT (투모로우바이투게
  'frost': { id: 'X3lA4EeeXtM', kind: 'MV', dur: 242 }, // TXT (투모로우바이투게더) 'Frost' Official MV
  'good-boy-gone-bad': { id: 'Os_6c5j6YiQ', kind: 'MV', dur: 216 }, // TXT (투모로우바이투게더) 'Good Boy Gone Bad' Official MV
  'skipping-stones': { id: 'FKXEcZyBaes', kind: '무대 영상', dur: 118 }, // BEOMGYU X TAEHYUN X HUENINGKAI '물수제비 (Skipping Stones)' Live Clip - TX
  '0x1-lovesong': { id: 'd5bbqKYu51w', kind: 'MV', dur: 276 }, // TXT (투모로우바이투게더) '0X1=LOVESONG (I Know I Love You) feat. Seori' Officia
  'bird-of-night': { id: '0NpyuuGqK9k', kind: 'MV', dur: 170 }, // 태현 (TAEHYUN) 'Bird of Night' Official MV
  'sunday-driver': { id: 'o9thOizwRW4', kind: 'MV', dur: 187 }, // 수빈 (SOOBIN) 'Sunday Driver' Official MV
  'dance-with-you': { id: 'zOaZ_MoV18U', kind: 'MV', dur: 164 }, // 휴닝카이 (HUENINGKAI) 'Dance With You' Official MV
  'ghost-girl': { id: 'tA48jeiyRaw', kind: 'MV', dur: 199 }, // 연준 (YEONJUN) ‘Ghost Girl’ Official MV
  'take-my-half': { id: 'VNWX3qWBd-A', kind: 'MV', dur: 194 }, // 범규 (BEOMGYU) 'Take My Half' Official MV
  'where-do-you-go': { id: '4-U5xMpVeBw', kind: 'MV', dur: 204 }, // TXT (투모로우바이투게더) 'Where Do You Go?' Official MV
  'deja-vu': { id: 'DiHUEWBRQEI', kind: 'MV', dur: 241 }, // TXT (투모로우바이투게더) 'Deja Vu' Official MV
  'eternally': { id: 'ldx45XGJrH4', kind: '무대 영상', dur: 225 }, // [T:TCAM] ‘Eternally’ stage @ ACT : LOVE SICK IN SEOUL - TXT (투모로우바이투게더
  'crown': { id: '6HMsGJRLtto', kind: '안무 연습 영상', dur: 229, mv: 'W3iSnJ663II' }, // TXT (투모로우바이투게더) ‘어느날 머리에서 뿔이 자랐다 (CROWN)’ Dance Practice
  'beautiful-strangers': { id: 'oG16Esx419c', kind: '안무 영상', dur: 139, mv: 'IcwHopeT5gY' }, // 'Beautiful Strangers' Choreography Video (YEONJUN draft) | TXT (투모로우바이
  'song-of-the-stars': { id: 'bsKe_P8cjrw', kind: '무대 영상', dur: 331 }, // ‘별의 노래 (Song of the Stars)’ stage @ ACT : TOMORROW IN SEOUL | TXT (투모로
  'miracle': { id: '8efrOFRXMxo', kind: '공식 영상', dur: 168 }, // 'Miracle (기적은 너와 내가 함께하는 순간마다 일어나고 있어)' Special Thanks to MOA | TXT (투
  'see-you-there-tomorrow': { id: 'AGtzFK8nejw', kind: '무대 영상', dur: 235 }, // ‘내일에서 기다릴게 (I’ll See You There Tomorrow)’ stage @ COMEBACK SHOWCASE | 
  'moa-diary': { id: 'ugPutzQD1yk', kind: '공식 영상', dur: 192 }, // TXT (투모로우바이투게더) '교환일기 (두밧두 와리와리)' Special Thanks to MOA
  'magic': { id: 'AP2WEsJfPYU', kind: '퍼포먼스 영상', dur: 167, mv: 'FQRnJvbLTAo' }, // TXT(투모로우바이투게더) ‘Magic’ Special Performance Video
  'our-summer': { id: 'M_iYqRNS_o0', kind: '공식 영상', dur: 211 }, // [T:TIME] TOMORROW X TOGETHER ‘Our Summer’ (selfie ver.) - TXT (투모로우바이투
  'cat-dog': { id: 'JKp80jCzho0', kind: '안무 연습 영상', dur: 188, mv: 'NaKrke1EL1A' }, // TXT (투모로우바이투게더) ‘Cat & Dog’ Dance Practice
  'kitto-zutto': { id: 'f0ZuP1Da948', kind: 'MV', dur: 177 }, // TXT (투모로우바이투게더) ‘きっとずっと (Kitto Zutto)' Official MV
  'cant-stop': { id: 'sswmsnPigDc', kind: 'MV', dur: 159 }, // TXT (투모로우바이투게더) 'Can't Stop' Official MV
  'happy-fools': { id: 'nAtSdy6of-k', kind: '공식 영상', dur: 160 }, // [2023 DREAM WEEK] TXT (투모로우바이투게더) 'Happy Fools (TOMORROW X TOGETHER Ve
  'run-away': { id: 'jqHslIR2x7w', kind: '안무 연습 영상', dur: 214, mv: '6yWPfUz0z94' }, // TXT (투모로우바이투게더) ‘9와 4분의 3 승강장에서 너를 기다려 (Run Away)’ Dance Practice
  'angel-or-devil': { id: 'KyQacFvXWAM', kind: '안무 연습 영상', dur: 238, mv: 'cfm97EKin4c' }, // TXT (투모로우바이투게더) ‘Angel Or Devil’ Dance Practice
  'cant-you-see-me': { id: 'HwdOeu8I4Ho', kind: '안무 연습 영상', dur: 210, mv: 'cMFHUTJ13Ys' }, // TXT (투모로우바이투게더) ‘세계가 불타버린 밤, 우린... (Can't You See Me?)' Dance Practice
  'puma': { id: 'qz7bJKO_JzU', kind: '안무 연습 영상', dur: 212, mv: 'ImTgS5OXgbU' }, // TXT (투모로우바이투게더) ‘동물원을 빠져나온 퓨마' Dance Practice
  'we-lost-the-summer': { id: 'kwy0nR1_SBQ', kind: 'MV', dur: 235 }, // TXT (투모로우바이투게더) '날씨를 잃어버렸어' Official MV
  'opening-sequence': { id: 'eU8om2tfSYQ', kind: '안무 연습 영상', dur: 182 }, // TXT (투모로우바이투게더) 'Opening Sequence' Dance Practice
  'devil-by-the-window': { id: '0u50XFKHJKY', kind: '퍼포먼스 영상', dur: 207 }, // TXT(투모로우바이투게더) ‘Devil by the Window’ Special Performance Video
  'sugar-rush-ride': { id: 'paL62pifsbc', kind: '안무 연습 영상', dur: 194, mv: 'P9tKTxbgdkk' }, // TXT (투모로우바이투게더) 'Sugar Rush Ride' Dance Practice
  'chasing-that-feeling': { id: 'WMswPS8gfNs', kind: '안무 연습 영상', dur: 190, mv: 'ISnyONG1dEc' }, // TXT (투모로우바이투게더) ‘Chasing That Feeling’ Dance Practice
  'back-for-more': { id: 'e42AhJzYpVE', kind: 'MV', dur: 207 }, // TXT (투모로우바이투게더), Anitta ‘Back for More’ Official MV
  'hitotsu-no-chikai': { id: '5BVC6VggY3A', kind: 'MV', dur: 199 }, // TXT (투모로우바이투게더) 'We’ll Never Change' Official MV
  'forty-one-winks': { id: 'J1Q-6FvVxck', kind: '퍼포먼스 영상', dur: 151 }, // ‘Forty One Winks’ Special Performance Video | TXT (투모로우바이투게더)
  'just-one-more-day': { id: 'jOnLqqDRfY4', kind: 'MV', dur: 278 }, // TXT (투모로우바이투게더) '하루에 하루만 더 (Stick With You)' Official MV
  'new-rules': { id: 'YVAEyZ35_ew', kind: '안무 연습 영상', dur: 173 }, // TXT (투모로우바이투게더) ‘New Rules’ Dance Practice
  'drama': { id: '9bGCUD2-0J4', kind: '안무 연습 영상', dur: 217 }, // TXT (투모로우바이투게더) ‘Drama’ Dance Practice
  'no-rules': { id: 'lDRkALaSjzU', kind: '안무 연습 영상', dur: 195 }, // TXT (투모로우바이투게더) ‘No Rules’ Dance Practice
  'ggum': { id: '1T9tLMh99Wo', kind: 'MV', dur: 164 }, // 연준 (YEONJUN) ‘GGUM’ Official MV
  'talk-to-you': { id: 'NIGA89HGTBU', kind: '퍼포먼스 영상', dur: 181 }, // 'Talk to You' Performance Video | NO LABELS: PART 01
  'yj-coma': { id: 'bwuOE9YdG9M', kind: '퍼포먼스 영상', dur: 161 }, // 'Coma' Performance Video | NO LABELS: PART 01
  'yj-ice-cream': { id: 'Cu1JJrvKkv4', kind: '퍼포먼스 영상', dur: 133, mv: 'ihvuwqlGHXs' }, // 'Ice Cream' Performance Video
  'yj-fxxking-star': { id: 'wNBzt5O1iyw', kind: 'MV', dur: 184 }, // YEONJUN (연준) 'Fxxking Star' Official MV
}
