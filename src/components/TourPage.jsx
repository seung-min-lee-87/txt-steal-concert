import { useState } from 'react'
import { ALBUM_NEWS, SHOWS, TOUR } from '../data/tour'
import { loadJSON, saveJSON } from '../lib/storage'

const POSTERS = [
  { src: '/images/poster-seoul.webp', alt: '서울 공연 포스터' },
  { src: '/images/poster-schedule.webp', alt: '전체 투어 일정 포스터' },
]

const DAY = 24 * 60 * 60 * 1000
const WEEK = ['일', '월', '화', '수', '목', '금', '토']

function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function dDay(date) {
  const diff = Math.round((new Date(date + 'T00:00:00') - new Date(todayStr() + 'T00:00:00')) / DAY)
  if (diff === 0) return 'D-DAY'
  return diff > 0 ? `D-${diff}` : `D+${-diff}`
}

function prettyDate(date) {
  const d = new Date(date + 'T00:00:00')
  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()} (${WEEK[d.getDay()]})`
}

export default function TourPage({ go }) {
  const [going, setGoing] = useState(() => loadJSON('going', {}))
  const [zoom, setZoom] = useState(null)

  function toggle(date) {
    const next = { ...going, [date]: !going[date] }
    setGoing(next)
    saveJSON('going', next)
  }

  const today = todayStr()
  const allDates = SHOWS.flatMap((s) => s.dates.map((d) => ({ date: d, show: s })))
  const mine = allDates.filter((x) => going[x.date])
  const upcoming = (mine.length ? mine : allDates).find((x) => x.date >= today)

  return (
    <div className="page">
      <section className="hero">
        <picture>
          <source media="(max-width: 700px)" srcSet="/images/banner-sm.webp" />
          <img className="hero-banner" src="/images/banner.webp" alt="TOMORROW X TOGETHER WORLD TOUR STEAL THE WIND" />
        </picture>
        <div className="hero-body">
          <p className="kicker">Tomorrow X Together World Tour</p>
          <p className="hero-sub">
            <em>Steal the Wind</em> · {TOUR.meaning}
          </p>
          {upcoming && (
            <div className="countdown">
              <span className="dday">{dDay(upcoming.date)}</span>
              <span className="countdown-text">
                <b>
                  {upcoming.show.city} · {prettyDate(upcoming.date)}
                </b>
                {mine.length ? '내가 가는 다음 공연' : '다음 공연'} · {upcoming.show.venue}
              </span>
            </div>
          )}
          <div className="hero-actions">
            <button className="btn primary" onClick={() => go('#/chant')}>
              📣 응원법 보러 가기
            </button>
            <button className="btn ghost" onClick={() => go('#/setlist')}>
              🎵 지난 세트리스트
            </button>
          </div>
        </div>
      </section>

      <h2 className="section-title">공연 일정 <span className="en">Seoul &amp; Japan</span></h2>
      <p className="hint">내가 가는 날을 눌러 표시해두면 위 카운트다운이 그 날짜로 바뀌어요.</p>
      <div className="show-grid">
        {SHOWS.map((show) => (
          <article key={show.id} className={'card show ' + show.region.toLowerCase()}>
            <div className="show-head">
              <span className="flag">{show.region === 'KR' ? '🇰🇷' : '🇯🇵'}</span>
              <div>
                <h3>{show.city}</h3>
                <p className="venue">{show.venue}</p>
              </div>
            </div>
            <div className="dates">
              {show.dates.map((d) => (
                <button
                  key={d}
                  className={'date-chip' + (going[d] ? ' on' : '') + (d < today ? ' past' : '')}
                  onClick={() => toggle(d)}
                  aria-pressed={!!going[d]}
                >
                  <span>{prettyDate(d)}</span>
                  <span className="chip-d">{going[d] ? '✔ 가요' : dDay(d)}</span>
                </button>
              ))}
            </div>
            {show.note && <p className="show-note">{show.note}</p>}
          </article>
        ))}
      </div>

      <h2 className="section-title">공식 포스터 <span className="en">Key Visual</span></h2>
      <div className="posters">
        {POSTERS.map((p) => (
          <button key={p.src} className="poster" onClick={() => setZoom(p)} aria-label={`${p.alt} 크게 보기`}>
            <img src={p.src} alt={p.alt} loading="lazy" />
          </button>
        ))}
      </div>
      {zoom && (
        <button className="lightbox" onClick={() => setZoom(null)} aria-label="닫기">
          <img src={zoom.src} alt={zoom.alt} />
        </button>
      )}

      <h2 className="section-title">새 앨범 체크 <span className="en">New Music</span></h2>
      <div className="news-list">
        {ALBUM_NEWS.map((a) => (
          <article key={a.title} className="card news">
            <p className="news-kind">
              {a.kind} · {prettyDate(a.date)}
            </p>
            <h3>{a.title}</h3>
            <p>{a.text}</p>
          </article>
        ))}
      </div>

      <h2 className="section-title">참고 링크 <span className="en">Links</span></h2>
      <div className="links">
        <a className="card link" href="https://ibighit.com/en/txt/tour/" target="_blank" rel="noreferrer">
          🖼️ 공식 투어 페이지 (포스터·공지)
        </a>
        <a
          className="card link"
          href="https://namu.wiki/w/%ED%88%AC%EB%AA%A8%EB%A1%9C%EC%9A%B0%EB%B0%94%EC%9D%B4%ED%88%AC%EA%B2%8C%EB%8D%94/%EC%9D%91%EC%9B%90%EB%B2%95"
          target="_blank"
          rel="noreferrer"
        >
          📖 나무위키 응원법 모음
        </a>
      </div>
    </div>
  )
}
