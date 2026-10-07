import { ALBUM_COLORS, albumTextColor } from '../data/albums'

// 앨범 이름을 앨범 키컬러 칩으로 보여준다. 색이 없는 앨범은 기본 칩.
export default function AlbumChip({ album, small = false }) {
  if (!album) return null
  const bg = ALBUM_COLORS[album]
  const style = bg ? { background: bg, color: albumTextColor(bg) } : undefined
  return (
    <span className={'album-chip' + (small ? ' small' : '') + (bg ? '' : ' plain')} style={style}>
      {album}
    </span>
  )
}
