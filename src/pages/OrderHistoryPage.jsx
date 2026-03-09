import { useNavigate, useLocation } from 'react-router-dom'
import { useOrder } from '../contexts/OrderContext'
import { OrderStatusTag } from '../utils/orderStatus'
import { BackIcon, ChevronRightIcon } from '../components/Icons'
import cartIcon from '../assets/order-history/cart-icon.png'
import Item from '@arco-design/web-react/es/Breadcrumb/item'

export default function OrderListPage() {
  const navigate = useNavigate()
  const { orders, resetOrders } = useOrder();
  const location = useLocation()
   const data = { ...(location.state || {}) }

  return (
    <>  
        {/* === 顶部 Header === */}
        <div className="absolute inset-x-0 top-[44px] z-20 bg-white min-h-[44px]">
          <div className="mx-auto w-full max-w-[360px] px-5">
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => navigate(data.from || '/profile')} className="text-[#1C1B1B] transition hover:scale-110">
                  <BackIcon />
                </button>
                <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[1.2] text-black">
                  Order History
                </h1>
                {/* <button onClick={() => resetOrders()} className="text-[#1C1B1B] transition hover:scale-110">
                  Clear Orders
                </button> */}
              </div>
            </header>
          </div>
        </div>

        {/* === 中间订单列表区 === */}
        <div className="hide-scrollbar absolute inset-x-0 bottom-0 top-[88px] overflow-y-auto">
          <div className="mx-auto flex w-full max-w-[360px] flex-col gap-4 px-5 pb-8 pt-4">
            
            {orders.length === 0 && (
              // 严厉纠正：空状态不需要白色卡片！必须占据全部高度并完美居中！
              <div className="mx-auto flex min-h-full w-full max-w-[360px] flex-col items-center justify-center px-5 pb-20 pt-10">
                
                <h2 className="mb-2 max-w-[280px] text-center text-[22px] font-bold leading-[1.3] text-[#1C1B1B]">
                  Looks Like There Are No Orders Yet
                </h2>
                
                <p className="mb-4 text-center text-[15px] font-medium text-[#6b7280]">
                  Place an order when you're ready!
                </p>

                {/* 严厉提醒：去把设计图里的那个购物车图片切出来放进 public 文件夹，然后把路径填在这里！ */}
                <div className="mb-8 mr-5 h-[120px] w-[120px]">
                  <img
                    src={cartIcon} 
                    alt="Empty Cart"
                    className="h-full w-full object-contain"
                  />
                </div>

                <button
                  // 必须配置路由跳转：用户没有订单，当然要引导他们去主页或者商品列表页买东西！
                  onClick={() => navigate('/')} 
                  className="w-[200px] rounded-[14px] bg-[#1C1B1B] py-3.5 text-[16px] font-bold text-white shadow-lg transition-all hover:bg-black active:scale-95"
                >
                  Order Now
                </button>

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
                  {/* <span className={`rounded-lg px-3 py-1 text-[13px] font-semibold text-white 
                    ${order.status === 'Shipping' ? 'bg-[#7c8deb]' : order.status === 'Pending' ? 'bg-[#FFCB45]' : 'bg-[#4ade80]'}`}
                  >
                    {order.status}
                  </span> */}
                  <OrderStatusTag status={order.status} />
                </div>

                {/* 中间：数量与金额 + 右箭头 */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[15px] font-bold text-[#1C1B1B]">
                      {order.itemsCount > 1 ? 'Items: ' + order.itemsCount : 'Item: ' + order.itemsCount}
                    </span>
                    <span className="text-[15px] font-bold text-[#1C1B1B]">
                      Total: RM{order.summary.total.toFixed(2)}
                    </span>
                  </div>
                  <ChevronRightIcon />
                </div>

                {/* 底部：日期信息 */}
                <div className="flex flex-col gap-1 text-[12px] text-[#6b7280]">
                  <p className="text-[#1C1B1B]">Order Date: <span className="text-[#4b5563]">{order.date}</span></p>
                  {order.shippedDate && (
                    <p className="text-[#1C1B1B]">Shipped Date: <span className="text-[#4b5563]">{order.shippedDate}</span></p>
                  )}
                </div>

              </div>
            ))}

          </div>
        </div>
      </>
  )
}
