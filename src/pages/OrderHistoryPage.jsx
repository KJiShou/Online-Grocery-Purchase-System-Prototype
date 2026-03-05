import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusIcons from '../components/layout/StatusBar'

// --- 图标组件 ---
function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C1B1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  )
}

function formatPrice(value) {
  return `RM${value.toFixed(2)}`
}

function formatCurrentTime() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

// 模拟的订单历史数据
const orderHistoryData = [
  {
    id: 'o1',
    status: 'Finished',
    date: '7 January, 2026',
    name: 'COCA-COLA 1.5L',
    price: 4.00,
    oldPrice: 5.00,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=150&q=80', // 占位图
    quantity: 1
  },
  {
    id: 'o2',
    status: 'Finished',
    date: '7 January, 2026',
    name: 'MINUTE MAID PULPY 1.5L',
    price: 6.30,
    oldPrice: 7.30,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=150&q=80', // 占位图
    quantity: 1
  }
]

export default function OrderHistoryPage() {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(formatCurrentTime())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatCurrentTime())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f4f4f5]">
      <section className="relative h-screen w-full overflow-hidden bg-white max-[420px]:mx-auto max-[420px]:h-[min(800px,100dvh)] max-[420px]:w-[min(360px,100vw)] max-[420px]:rounded-[24px] max-[420px]:border max-[420px]:border-[#d4d4d8] max-[420px]:shadow-[0_12px_36px_rgba(0,0,0,0.12)]">
        
        {/* === 顶部 Header === */}
        <div className="absolute inset-x-0 top-0 z-20 bg-white pb-3 pt-4">
          <div className="mx-auto w-full max-w-[360px] px-5">
            <div className="mb-4 flex items-center justify-between text-[15px] font-normal tracking-[-0.24px] text-[#1C1B1B]">
              <span className="leading-5">{currentTime}</span>
              <StatusIcons />
            </div>

            <header className="flex items-center gap-3">
              <button onClick={() => navigate(-1)} className="text-[#1C1B1B] transition hover:scale-110">
                <BackIcon />
              </button>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-[22px] font-bold leading-[1.2] text-[#1C1B1B]">
                Order History
              </h1>
            </header>
          </div>
        </div>

        {/* === 中间订单列表区 === */}
        <div className="hide-scrollbar absolute inset-x-0 bottom-0 top-[94px] overflow-y-auto">
          <div className="mx-auto flex w-full max-w-[360px] flex-col gap-6 px-5 pb-8 pt-4">
            
            {orderHistoryData.map((order) => (
              <div key={order.id} className="flex flex-col border-b border-[#f3f4f6] pb-6 last:border-0">
                
                {/* 状态与日期 */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-md bg-[#2aa1ed] px-2.5 py-1 text-[12px] font-semibold text-white">
                    {order.status}
                  </div>
                  <span className="text-[11px] font-medium text-[#1C1B1B]">
                    {order.date}
                  </span>
                </div>

                {/* 商品详情区 */}
                <div className="flex items-start gap-4">
                  {/* 图片 */}
                  <div className="h-[100px] w-[70px] flex-shrink-0">
                    <img 
                      src={order.image} 
                      alt={order.name} 
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* 文字与价格 */}
                  <div className="flex flex-1 flex-col">
                    <p className="mb-3 text-[13px] font-semibold leading-snug text-[#1C1B1B] uppercase">
                      {order.name}
                    </p>
                    
                    <div className="mb-3 flex flex-col">
                      <span className="text-[15px] font-bold text-[#1C1B1B]">
                        {formatPrice(order.price)}
                      </span>
                      {order.oldPrice && (
                        <span className="text-[12px] text-[#fc7171] line-through">
                          {formatPrice(order.oldPrice)}
                        </span>
                      )}
                    </div>

                    {/* 只读的数量展示器 (仿 Disabled 状态) */}
                    <div className="flex h-8 w-[84px] items-center justify-between rounded-lg border border-[#e4e4e7] bg-white px-2.5 opacity-60">
                      <span className="text-[16px] text-[#9ca3af] select-none">-</span>
                      <span className="text-[14px] font-medium text-[#1C1B1B]">{order.quantity}</span>
                      <span className="text-[16px] text-[#9ca3af] select-none">+</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>

      </section>
    </div>
  )
}