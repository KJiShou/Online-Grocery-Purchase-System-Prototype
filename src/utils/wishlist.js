const WISHLIST_STORAGE_KEY = 'wishlist_product_ids'

export function loadWishlistIds() {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveWishlistIds(ids) {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(ids))
}

export function toggleWishlistId(id) {
  const ids = loadWishlistIds()
  const exists = ids.includes(id)
  const nextIds = exists ? ids.filter((item) => item !== id) : [...ids, id]
  saveWishlistIds(nextIds)
  return nextIds
}
