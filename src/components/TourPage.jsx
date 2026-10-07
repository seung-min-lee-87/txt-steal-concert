import { useState } from 'react'
import { ALBUM_NEWS, SHOWS, TOUR } from '../data/tour'
import { loadJSON, saveJSON } from '../lib/storage'

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
        <div className="wind" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="hero-kicker">TOMORROW X TOGETHER WORLD TOUR</p>
        <h1 className="hero-title">{TOUR.name}</h1>
        <p className="hero-sub">{TOUR.meaning}</p>
        {upcoming && (
          <div className="countdown">
            <span className="dday">{dDay(upcoming.date)}</span>
            <span>
              {mine.length ? '내 다음 공연' : '다음 공연'} · {upcoming.show.city} {prettyDate(upcoming.date)}
            </span>
          </div>
        )}
        <div className="hero-actions">
          <button className="btn primary" onClick={() => go('#/practice')}>
            📣 응원법 연습하러 가기
          </button>
          <button className="btn ghost" onClick={() => go('#/setlist')}>
            🎵 지난 세트리스트 보기
          </button>
        </div>
      </section>

      <h2 className="section-title">공연 일정 · 서울 & 일본</h2>
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

      <h2 className="section-title">새 앨범 체크</h2>
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

      <h2 className="section-title">참고 링크</h2>
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
