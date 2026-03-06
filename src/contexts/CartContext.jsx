import { useEffect, createContext, useContext, useState } from 'react'

// 1. 创建 Context
const CartContext = createContext()

// 2. 创建 Provider 组件（它将包裹你的整个 App）
export function CartProvider({ children }) {
  // 1. 严厉的改动：惰性初始化 (Lazy Initialization)
  // 不要直接写 useState([])，而是传入一个函数，让它在首次加载时去读 localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('shopping_cart')
      // 如果找到了数据，就解析成 JSON 数组；如果没有，就返回空数组 []
      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.error("读取 LocalStorage 失败:", error)
      return []
    }
  })

  // 2. 严厉的改动：添加 useEffect 进行后台静默同步
  // 只要 cartItems 这个数组发生任何增删改，立刻把它变成字符串存入 localStorage
  useEffect(() => {
    localStorage.setItem('shopping_cart', JSON.stringify(cartItems))
  }, [cartItems])

  // 添加商品到购物车
  const addToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      // 严厉的业务逻辑：先检查购物车里是不是已经有这个商品了
      const existingItem = prevItems.find((item) => item.id === product.id)
      
      if (existingItem) {
        // 如果有，就只增加数量
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      
      // 如果没有，就把它作为一个新项目加进去，默认设为选中 (selected: true)
      return [...prevItems, { ...product, quantity, selected: true }]
    })
  }

  // 切换商品勾选状态
  const toggleSelected = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    )
  }

  // 增加数量
  const increment = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  // 减少数量
  const decrement = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  // 删除商品
  const remove = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const removeMultiple = (idsToRemove) => {
    setCartItems((prevItems) => 
      // 过滤掉所有存在于 idsToRemove 数组里的商品
      prevItems.filter((item) => !idsToRemove.includes(item.id))
    )
  }

  const selectedItems = cartItems.filter((item) => item.selected)

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const totalSelectedQuantity = selectedItems.length

  // 将所有数据和操作方法打包提供出去
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        toggleSelected,
        increment,
        decrement,
        remove,
        removeMultiple,
        selectedItems,
        subtotal,
        totalSelectedQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// 3. 导出一个自定义 Hook，方便其他页面直接调用
export const useCart = () => {
  return useContext(CartContext)
}