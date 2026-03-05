const CART_STORAGE_KEY = 'cart_items'

function normalizeQuantity(value) {
  const parsed = Number.parseInt(value, 10)
  if (Number.isNaN(parsed) || parsed < 1) return 1
  return parsed
}

function normalizeCartItem(item) {
  if (!item || !item.id) return null

  return {
    id: item.id,
    name: item.name,
    price: Number(item.price) || 0,
    oldPrice: typeof item.oldPrice === 'number' ? item.oldPrice : null,
    image: item.image || '',
    quantity: normalizeQuantity(item.quantity),
    selected: Boolean(item.selected),
  }
}

export function loadCartItems() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map(normalizeCartItem).filter(Boolean)
  } catch {
    return []
  }
}

export function saveCartItems(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

export function addItemToCart(product, quantity = 1) {
  const items = loadCartItems()
  const normalizedQuantity = normalizeQuantity(quantity)
  const index = items.findIndex((item) => item.id === product.id)

  if (index >= 0) {
    items[index] = {
      ...items[index],
      quantity: items[index].quantity + normalizedQuantity,
    }
  } else {
    items.push({
      id: product.id,
      name: product.name,
      price: Number(product.price) || 0,
      oldPrice: typeof product.oldPrice === 'number' ? product.oldPrice : null,
      image: product.image || '',
      quantity: normalizedQuantity,
      selected: false,
    })
  }

  saveCartItems(items)
  return items
}
