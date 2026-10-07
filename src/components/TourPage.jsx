import { useEffect, useRef, useState } from 'react'
import { ALBUM_NEWS, FLAGS, SHOWS, TOUR } from '../data/tour'
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

const AREAS = [
  { id: 'Korea', label: '한국' },
  { id: 'Japan', label: '일본' },
  { id: 'Asia', label: '아시아' },
  { id: 'North America', label: '북미' },
  { id: 'Europe', label: '유럽' },
]

// '2026-11-21' ~ '2026-11-22' → '11.21–22', 하루면 '3.13'
function shortRange(dates) {
  const [a, b] = [dates[0], dates[dates.length - 1]].map((d) => d.slice(5).split('-').map(Number))
  if (dates.length === 1) return `${a[0]}.${a[1]}`
  return a[0] === b[0] ? `${a[0]}.${a[1]}–${b[1]}` : `${a[0]}.${a[1]}–${b[0]}.${b[1]}`
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

  // 위에는 가까운 3개 도시만 크게, 나머지는 작은 배너로
  const next = SHOWS.filter((s) => s.dates[s.dates.length - 1] >= today)
  const featured = (next.length ? next : SHOWS).slice(0, 3)
  const others = SHOWS.filter((s) => !featured.includes(s))
  const [picked, setPicked] = useState(null)
  const pickedShow = others.find((s) => s.id === picked)
  const pickedRef = useRef(null)
  useEffect(() => {
    if (picked) pickedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [picked])

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
              📝 지난 세트리스트
            </button>
          </div>
        </div>
      </section>

      <h2 className="section-title">공연 일정 <span className="en">World Tour</span></h2>
      <p className="hint">내가 가는 날을 눌러 표시해두면 위 카운트다운이 해당 날짜로 바뀝니다.</p>
      <div className="show-grid">
        {featured.map((show) => (
          <ShowCard key={show.id} show={show} going={going} toggle={toggle} today={today} />
        ))}
      </div>

      <h3 className="sub-title">다른 도시 <span className="en">More Cities</span></h3>
      <div className="city-areas">
        {AREAS.map((area) => {
          const list = others.filter((s) => s.area === area.id)
          if (!list.length) return null
          return (
            <div key={area.id} className="city-area">
              <span className="city-area-label">{area.label}</span>
              <div className="city-chips">
                {list.map((show) => (
                  <button
                    key={show.id}
                    className={
                      'city-chip' +
                      (picked === show.id ? ' on' : '') +
                      (show.dates.some((d) => going[d]) ? ' going' : '') +
                      (show.dates[show.dates.length - 1] < today ? ' past' : '')
                    }
                    onClick={() => setPicked(picked === show.id ? null : show.id)}
                    aria-expanded={picked === show.id}
                  >
                    <span aria-hidden="true">{FLAGS[show.region]}</span> {show.city}
                    <span className="city-chip-date">{shortRange(show.dates)}</span>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      {pickedShow && (
        <div className="show-grid picked-show" ref={pickedRef}>
          <ShowCard show={pickedShow} going={going} toggle={toggle} today={today} />
        </div>
      )}
      <p className="hint">AND MORE</p>

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

      <h2 className="section-title">새 앨범 체크 <span className="en">New Album</span></h2>
      <div className="news-list">
        {ALBUM_NEWS.map((a) => (
          <article key={a.title} className={'card news' + (a.logo ? ' has-logo' : '')}>
            {/* 로고(또는 제목)를 위에 크게, 날짜·버튼은 아랫줄에 */}
            {a.logo ? <img className="news-logo" src={a.logo} alt={a.title} /> : <h3>{a.title}</h3>}
            <div className="news-bottom">
              <div className="news-meta">
                <p className="news-kind">{a.kind}</p>
                <p className="news-date">
                  {a.upcoming ? '발매 예정 ' : ''}
                  {prettyDate(a.date)}
                  {a.upcoming && a.date >= today && <span className="news-dday">{dDay(a.date)}</span>}
                </p>
              </div>
              {a.links && (
                <div className="news-links">
                  {a.links.map((l) => (
                    <a key={l.url} className="btn small presave" href={l.url} target="_blank" rel="noreferrer">
                      🎧 {l.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
            {a.text && <p className="news-text">{a.text}</p>}
          </article>
        ))}
      </div>

    </div>
  )
}

function ShowCard({ show, going, toggle, today }) {
  return (
    <article className={'card show ' + show.region.toLowerCase()}>
      <div className="show-head">
        <span className="flag">{FLAGS[show.region]}</span>
        <div>
          <h3>{show.city}</h3>
          <p className="venue">{show.venue || '공연장 발표 전'}</p>
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
  )
}
