// 이 기기(브라우저)에만 저장되는 데이터.
// - 곡별 설정(유튜브 주소, 응원법 줄, 싱크 보정값): localStorage
// - 내가 고른 음악 파일: IndexedDB (용량이 커서)

const PREFIX = 'stw:'

export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function saveJSON(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // 저장 공간이 없거나 막힌 경우: 조용히 무시 (화면은 계속 동작)
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('stw-audio', 1)
    req.onupgradeneeded = () => req.result.createObjectStore('files')
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function putAudio(songId, file) {
  try {
    const db = await openDB()
    await new Promise((resolve, reject) => {
      const tx = db.transaction('files', 'readwrite')
      tx.objectStore('files').put({ blob: file, name: file.name }, songId)
      tx.oncomplete = resolve
      tx.onerror = () => reject(tx.error)
    })
  } catch {
    // 저장 실패해도 이번 접속 동안은 재생 가능
  }
}

export async function getAudio(songId) {
  try {
    const db = await openDB()
    return await new Promise((resolve) => {
      const req = db.transaction('files').objectStore('files').get(songId)
      req.onsuccess = () => resolve(req.result || null)
      req.onerror = () => resolve(null)
    })
  } catch {
    return null
  }
}

export async function deleteAudio(songId) {
  try {
    const db = await openDB()
    db.transaction('files', 'readwrite').objectStore('files').delete(songId)
  } catch {
    // 무시
  }
}
