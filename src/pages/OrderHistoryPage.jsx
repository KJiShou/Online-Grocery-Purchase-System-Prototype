import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOrder } from '../contexts/OrderContext'

// --- 图标组件 ---
function BackIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1C1B1B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1C1B1B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

function formatCurrentTime() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

export default function OrderListPage() {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(formatCurrentTime())
  const { orders } = useOrder();
  console.log('Current orders in context:', orders) // 调试日志，确认订单数据正确传入

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatCurrentTime())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>  
        {/* === 顶部 Header === */}
        <div className="absolute inset-x-0 top-[44px] z-20 bg-white pb-3 min-h-[44px]">
          <div className="mx-auto w-full max-w-[360px] px-5">
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="text-[#1C1B1B] transition hover:scale-110">
                  <BackIcon />
                </button>
                <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[1.2] text-black">
              Order History
            </h1>
              </div>
            </header>
          </div>
        </div>

        {/* === 中间订单列表区 === */}
        <div className="hide-scrollbar absolute inset-x-0 bottom-0 top-[100px] overflow-y-auto">
          <div className="mx-auto flex w-full max-w-[360px] flex-col gap-4 px-5 pb-8 pt-0">
            
            {orders.length === 0 && (
              <div className="flex flex-col items-center gap-3 rounded-[20px] bg-white p-5 shadow-sm">
                <p className="text-[15px] font-bold text-[#1C1B1B]">
                  No orders yet
                </p>
                <p className="text-[13px] text-center text-[#6b7280]">
                  Your past orders will appear here once you have made a purchase.
                </p>
              </div>
            )}
            {orders.map((order) => (
              <div 
                key={order.id}
                // 点击卡片跳转到订单详情页，并将订单号作为参数传过去
                onClick={() => { navigate(`/order-detail/${order.id.replace('#', '')}`)}}
                className="flex cursor-pointer flex-col rounded-[20px] bg-white p-5 shadow-sm transition hover:shadow-md active:scale-[0.98]"
              >
                
                {/* 顶部：订单号与状态 */}
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[17px] font-bold text-[#1C1B1B]">
                    {order.id}
                  </span>
                  <span className={`rounded-lg px-3 py-1 text-[13px] font-semibold text-white 
                    ${order.status === 'Shipping' ? 'bg-[#7c8deb]' : order.status === 'Pending' ? 'bg-[#FFCB45]' : 'bg-[#4ade80]'}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* 中间：数量与金额 + 右箭头 */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[15px] font-bold text-[#1C1B1B]">
                      Items: {order.itemsCount}
                    </span>
                    <span className="text-[15px] font-bold text-[#1C1B1B]">
                      Amount: RM{order.summary.total.toFixed(2)}
                    </span>
                  </div>
                  <ChevronRightIcon />
                </div>

                {/* 底部：日期信息 */}
                <div className="flex flex-col gap-1 text-[12px] text-[#6b7280]">
                  <p>Order Date: <span className="text-[#4b5563]">{order.date}</span></p>
                  {order.shippedDate && (
                    <p>Shipped Date: <span className="text-[#4b5563]">{order.shippedDate}</span></p>
                  )}
                </div>

              </div>
            ))}

          </div>
        </div>
      </>
  )
}