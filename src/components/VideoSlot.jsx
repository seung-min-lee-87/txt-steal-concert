// 페이지의 영상 자리. 이 곡이 재생기에 올라가 있으면 사이트 공용 재생기가 이 자리 위에 겹쳐 보인다.
// 다른 곡이 재생 중이면 썸네일과 "이 곡 재생" 버튼을 보여준다.
export default function VideoSlot({ sp, source }) {
  if (!source) return null
  if (sp.active) {
    return source.type === 'youtube' ? <div className="yt-frame video-slot" ref={sp.slotRef} /> : null
  }
  return (
    <button className="yt-frame video-wait" onClick={sp.activate}>
      {source.type === 'youtube' && (
        <img src={`https://i.ytimg.com/vi/${source.id}/hqdefault.jpg`} alt="" loading="lazy" />
      )}
      <span className="video-wait-label">
        ▶ 이 곡 재생
        {sp.otherPlaying && <small>지금 재생 중인 곡 대신 이 곡을 틀어요</small>}
      </span>
    </button>
  )
}
