import { createContext, useContext, useState, useEffect } from 'react'

// 1. 创建 Context
const OrderContext = createContext()

// 2. 创建 Provider 组件
export function OrderProvider({ children }) {
  // 惰性初始化读取 LocalStorage，键名要和购物车区分开
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem('order_history')
      return savedOrders ? JSON.parse(savedOrders) : []
    } catch (error) {
      console.error("读取 LocalStorage 订单数据失败:", error)
      return []
    }
  })

  // 监听 orders 数组变化，自动静默同步到 LocalStorage
  useEffect(() => {
    localStorage.setItem('order_history', JSON.stringify(orders))
  }, [orders])

  // === 核心方法 1：添加新订单 ===
  // 这个方法应该在你点击 Payment 页面的 "Confirm Pay" 时调用
  const addOrder = (newOrder) => {
    //console.log('Adding new order:', newOrder) // 调试日志，确认订单数据正确传入
    setOrders((prevOrders) => {
      // 严厉的排版规范：新产生的订单应该放在数组的【最前面】，这样在订单列表页才会显示在最顶端！
      return [newOrder, ...prevOrders]
    })
  }

  // === 核心方法 2：根据 ID 查找特定订单 ===
  // 这个方法专门留给你的 OrderDetailPage 用，通过 URL 传过来的 ID 查找订单详情
  const getOrderById = (id) => {
    return orders.find((order) => order.id === id)
  }

  const completeOrder = (id) => {
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (order.id === id) {
          return { ...order, status: 'Delivered' }
        }
        return order
      })
    })
  }

  const cancelOrder = (id) => {
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (order.id === id) {
          return { ...order, status: 'Cancelled' }
        }
        return order
      })
    })
  }
  
  const updateOrder = (id, updatedData) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, ...updatedData } : order
      )
    )
  }

  const resetOrders = () => {
    setOrders([])
  }

  // === 新增方法：更新特定订单的状态 ===
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId && order.status !== 'Cancelled' 
          ? { ...order, status: newStatus } // 找到目标订单，只更新 status 字段
          : order
      )
    )
  }

  const updateShippedDate = (orderId, date) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId 
          ? { ...order, shippedDate: date } // 找到目标订单，只更新 status 字段
          : order
      )
    )
  }

  // 将数据和方法打包提供出去
  return (
    <OrderContext.Provider
      value={{
        orders,      // 所有的订单列表 (给 OrderListPage 用)
        addOrder,    // 写入新订单的方法 (给 Payment 结算页用)
        updateOrder, // 更新订单的方法 (给 OrderPlacedPage 用)
        getOrderById, // 查找单个订单的方法 (给 OrderDetailPage 用)
        completeOrder, // 完成订单的方法 (给 OrderDetailPage 用)
        resetOrders,   // 重置订单列表的方法
        updateOrderStatus, // 更新订单状态的方法
        cancelOrder, // 取消订单的方法 (给 OrderDetailPage 用)
        updateShippedDate,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

// 3. 导出一个自定义 Hook，方便其他页面直接调用
export const useOrder = () => {
  return useContext(OrderContext)
}