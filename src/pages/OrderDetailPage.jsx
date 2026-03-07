import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams, useNavigationType , useLocation} from 'react-router-dom'
import { useOrder } from '../contexts/OrderContext'
import { paymentMethods } from '../utils/helper'
import { OrderStatusTag } from '../utils/orderStatus'
import { ToastCartIcon, ToastCheckIcon } from '../components/Icons'

function formatAddressDisplay(address, unitNo) {
  const trimmedAddress = (address || '').trim()
  const trimmedUnit = (unitNo || '').trim()
  if (trimmedUnit && trimmedAddress) {
    return `${trimmedUnit}, ${trimmedAddress}`
  }
  if (!trimmedUnit) return trimmedAddress
  if (!trimmedAddress) return trimmedUnit
}

// --- 图标组件 ---
function BackIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1C1B1B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  )
}

function formatCurrentTime() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

function formatPrice(value) {
  return `RM ${value.toFixed(2)}`
}

export default function OrderDetailPage() {
  const navigate = useNavigate()
  const navigationType = useNavigationType()
  const location = useLocation()
  // 严厉提醒：必须通过 useParams 抓取上一个页面传过来的订单 ID
  // 你的路由配置必须是：<Route path="/order-detail/:orderId" element={<OrderDetailPage />} />
  const { orderId } = useParams()

  const { getOrderById, completeOrder, updateOrder } = useOrder()

  // 模拟从后端根据 orderId 获取到的订单详情数据
  const orderData = getOrderById('#' + orderId)

  const data = { ...(location.state || {}) }

  const {
		items = orderData?.products || [],
		subtotal = orderData?.summary.subtotal || 0,
		selectedAddress = orderData?.shippingInfo || {},
		discountAmount = orderData?.summary.discount || 0,
		shippingDiscount = orderData?.summary.shippingCost || 0,
		grandTotal = orderData?.summary.total || 0,
	} = data

  // 1. 控制 Toast 显示/隐藏的状态
    const [showToast, setShowToast] = useState(false)

    // 2. 用于存储定时器 ID 的 Ref (极其重要，防止多次点击导致动画鬼畜)
    const toastTimerRef = useRef(null)

  useEffect(() => {
      if (data.from && navigationType !== 'POP') {
        const shippingInfo = orderData.shippingInfo;
        shippingInfo.address = formatAddressDisplay(data.selectedAddress.address, data.selectedAddress.unitNo);
        shippingInfo.name = data.selectedAddress.name;
        shippingInfo.phone = data.selectedAddress.phone;
        updateOrder(orderData.id, { shippingInfo })
        
        // Show toast when shipping address is updated
        setShowToast(true)

        // 严厉警告：必须先清除上一个定时器！
        if (toastTimerRef.current) {
          clearTimeout(toastTimerRef.current)
        }

        // 设定 3 秒后自动隐藏
        toastTimerRef.current = setTimeout(() => {
          setShowToast(false)
        }, 3000)
    }
    }, [orderData.id, data.from])

  useEffect(() => {
    if (!orderData) {
      alert('Order not found. Returning to order history.')
      navigate('/order-history')
    }
  }, [orderData, navigate])

  return (
    <>
        {/* === 顶部 Header === */}
         <div className="absolute inset-x-0 top-[44px] z-20 bg-white pb-3 min-h-[44px]">
          <div className="mx-auto w-full max-w-[360px] px-5">
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => {
                  navigate(-1)
                  }} className="text-[#1C1B1B] transition hover:scale-110">
                  <BackIcon />
                </button>
                <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[1.2] text-black">
              Order Detail
            </h1>
              </div>
            </header>
            <div 
              className={`absolute left-1/2 top-[50px] z-50 flex w-[calc(100%-40px)] max-w-[320px] -translate-x-1/2 items-center justify-between rounded-2xl border border-[#f3f4f6] bg-white p-3 shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out 
              ${showToast ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-6 opacity-0 pointer-events-none'}`}
              >
                <div className="flex items-center gap-3">
                    <ToastCheckIcon />
                    <p className="w-full text-[13px] font-semibold leading-tight text-[#1C1B1B]">
                    Shipping address updated successfully!
                    </p>
                </div>
              </div>
          </div>
        </div>

        {/* === 中间滚动详情区 === */}
        <div className="hide-scrollbar absolute inset-x-0 bottom-[40px] top-[94px] overflow-y-auto">
          <div className="mx-auto w-full max-w-[360px] px-5 pb-10 pt-4">
            
            {/* 1. 订单编号与日期区块 */}
            <div className="border-b border-[#f3f4f6] pb-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[18px] font-bold text-[#1C1B1B]">{orderData.id}</span>
                {/* <span className={`rounded-lg px-3 py-1.5 text-[13px] font-semibold text-white ${orderData.status === 'Shipping' ? 'bg-[#7c8deb]' : orderData.status === 'Pending' ? 'bg-[#FFCB45]' : 'bg-[#4ade80]'}`}>
                  {orderData.status}
                </span> */}
                <OrderStatusTag status={orderData.status} />
              </div>
              <div className="flex flex-col gap-2 text-[13px] font-medium">
                <p className="text-[#1C1B1B]">Order Date: <span className="font-normal text-[#6b7280]">{orderData.date}</span></p>
                {orderData.shippedDate && (
                  <p className="text-[#1C1B1B]">Shipped Date: <span className="font-normal text-[#6b7280]">{orderData.shippedDate}</span></p>
                )}
              </div>
            </div>

            {/* 2. 商品列表区块 */}
            <div className="border-b border-[#f3f4f6] py-6">
              {orderData.products.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="h-[80px] w-[60px] flex-shrink-0 rounded-lg bg-[#f4f5f9] p-1">
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="mb-2 text-[14px] font-medium leading-tight text-[#1C1B1B]">{item.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-[#1C1B1B]">{formatPrice(item.price)}</span>
                      {item.oldPrice && (
                        <span className="text-[12px] text-[#9ca3af] line-through">{formatPrice(item.oldPrice)}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-[14px] font-semibold text-[#6b7280]">
                    x{item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* 3. 收货地址区块 */}
            <div className="border-b border-[#f3f4f6] py-6">
  
            {/* 1. 引入 flex 布局：让标题和按钮在同一行，并分别推向左右两端 */}
              <div className="mb-3 flex items-center justify-between">
                {/* 注意：把原先 h3 上的 mb-3 移到了外层父级 div 上 */}
                <h3 className="text-[16px] font-bold text-[#1C1B1B]">Shipping Address</h3>
                
                {/* 2. 严厉的业务逻辑拦截：只有订单状态还是 Pending 时才准许显示！ */}
                {orderData.status === 'Pending' && (
                  <button 
                    onClick={() => {
                      navigate('/select-address', { state: {...data, from: location.pathname } })
                    }}
                    className="rounded-md px-3 py-1.5 text-[13px] font-bold text-[#42c236] transition-all hover:bg-[#42c236]/10 active:scale-95"
                  >
                    Change
                  </button>
                )}
              </div>

              <p className="text-[14px] leading-relaxed text-[#6b7280]">
                {orderData.shippingInfo.address}
              </p>
              
            </div>

            {/* 4. 收件人信息区块 */}
            <div className="border-b border-[#f3f4f6] py-6">
              <h3 className="mb-4 text-[16px] font-bold text-[#1C1B1B]">Recipient Info</h3>
              <div className="flex flex-col gap-3 text-[14px]">
                <div className="flex items-center">
                  <span className="w-[120px] text-[#1C1B1B]">Name:</span>
                  <span className="text-[#6b7280]">{orderData.shippingInfo.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-[120px] text-[#1C1B1B]">Mobile Number :</span>
                  <span className="text-[#6b7280]">{orderData.shippingInfo.phone}</span>
                </div>
              </div>
            </div>

            <div className="border-b border-[#f3f4f6] py-6">
              <h3 className="mb-4 text-[16px] font-bold text-[#1C1B1B]">Payment Method</h3>
              <div className="flex flex-col gap-3 text-[14px]">
                <div className="flex items-center">
                  {
                    (() => {
                      for (const methodKey in paymentMethods) {
                        if (paymentMethods[methodKey].label === orderData.paymentMethod) {
                          const IconComponent = paymentMethods[methodKey].icon
                          return (
                            <div className="flex items-center gap-2">
                              <IconComponent />
                              <span className="text-[#6b7280]">{orderData.paymentMethod}</span>
                            </div>
                          )
                        }
                    }})()
                  }
                </div>
              </div>
            </div>

            {/* 5. 订单金额明细区块 */}
            <div className="py-5">
              <h3 className="mb-4 text-[15px] font-bold text-[#1C1B1B]">Payment Details</h3>
              <div className="flex flex-col gap-2.5 pl-0">
                
                {/* 把 flex 换成 grid grid-cols-3，分为均等的左、中、右三列 */}
                <div className="grid grid-cols-3 items-center text-[14px]">
                  <span className="text-left text-[#4b5563]">Subtotal:</span> {/* 第二列：居中对齐 */}
                  <span className="text-left font-medium text-[#1C1B1B]">{formatPrice(orderData.summary.subtotal)}</span> {/* 第三列：靠右对齐 */}
                  <div></div>
                </div>

                <div className="grid grid-cols-3 items-center text-[14px]">
                  <span className="text-left text-[#4b5563]">Discount:</span>
                  <span className="text-left -ml-1.5 font-medium text-[#ee4d4d]">-{formatPrice(orderData.summary.discount)}</span>
                  <div></div>
                </div>

                <div className="grid grid-cols-3 items-center text-[14px]">
                  <span className="text-left text-[#4b5563]">Shipping Cost:</span>
                  <span className="text-left font-medium text-[#1C1B1B]">{formatPrice(orderData.summary.shippingCost)}</span>
                  <div></div>
                </div>

                <div className="grid grid-cols-3 items-center text-[14px]">
                  <span className="text-left font-bold text-[#1C1B1B]">Total:</span>
                  <span className="text-left font-bold text-[#1C1B1B]">{formatPrice(orderData.summary.total)}</span>
                  <div></div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {orderData.status === 'Out for Delivery' && (
          <div className="absolute bottom-[0px] left-0 z-20 w-full border-t border-[#e4e4e7] bg-[#f8fafc] pb-2 pt-3">
            <div className="mx-auto w-full max-w-[360px] px-5">
                <div className="border-b border-[#f3f4f6] py-0">
                  <button 
                  onClick={() => {
                    completeOrder(orderData.id)
                    alert('Order marked as Delivered!')
                  }}
                  className={`mb-2 w-full rounded-xl py-3 text-[15px] font-semibold text-white transition bg-[#111827] hover:bg-[#1f2937] shadow-lg hover:-translate-y-0.5
                  `}>
                  Complete Order
                </button>
                </div>
              </div>
            </div>
              )}

          {/* {orderData.status === 'Pending' && (
          <div className="absolute bottom-[0px] left-0 z-20 w-full border-t border-[#e4e4e7] bg-[#f8fafc] pb-2 pt-3">
            <div className="mx-auto w-full max-w-[360px] px-5">
                <div className="border-b border-[#f3f4f6] py-0">
                  <button 
                  onClick={() => {
                    navigate('/select-address', { state: {...data, from: location.pathname } })
                  }}
                  className={`mb-2 w-full rounded-xl py-3 text-[15px] font-semibold text-white transition bg-[#111827] hover:bg-[#1f2937] shadow-lg hover:-translate-y-0.5
                  `}>
                  Change Address
                </button>
                </div>
              </div>
            </div>
              )} */}

      </>
  )
}