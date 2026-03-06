import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useOrder } from '../contexts/OrderContext'
import { useCart } from '../contexts/CartContext'
import { formatPrice, generateOrderID, generateOrderDate } from '../utils/helper'
import { BackIcon, LocationIcon, ChevronRightIcon, MaybankIcon, PublicBankIcon, CimbIcon, GPayIcon, TngIcon, CashIcon, TruckIcon } from '../components/Icons'

const paymentMethods = {
  maybank: { label: 'Maybank2U', icon: <MaybankIcon /> },
  publicbank: { label: 'Public Bank', icon: <PublicBankIcon /> },
  cimb: { label: 'CIMB Clicks', icon: <CimbIcon /> },
  gpay: { label: 'Google Pay', icon: <GPayIcon /> },
  tng: { label: 'Touch \'n Go', icon: <TngIcon /> },
  cod: { label: 'Cash On Delivery', icon: <CashIcon /> },
}

function formatAddressDisplay(address, unitNo) {
  const trimmedAddress = (address || '').trim()
  const trimmedUnit = (unitNo || '').trim()
  if (trimmedUnit && trimmedAddress) {
    return `${trimmedUnit}, ${trimmedAddress}`
  }
  if (!trimmedUnit) return trimmedAddress
  if (!trimmedAddress) return trimmedUnit
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { addOrder, resetOrders } = useOrder()
  const { selectedItems, subtotal, removeMultiple } = useCart()

  const isPaymentSuccessful = useRef(false)

  // 2. 安全地提取数据。如果用户是直接在浏览器输入网址进来的（没有经过购物车），
  // location.state 会是 null，我们需要给它一个默认值防止页面崩溃。
  const data = location.state || {}
  
  const defaultAddress = {
    id: 'andrew',
    name: 'Andrew',
    phone: '(+60) 12-345 6789',
    address:
      'Ground Floor, Bangunan Tan Sri Khaw Kai Boh (Block A), Jalan Genting Kelang, Setapak, 53300 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    unitNo: 'Unit 01-01'
    }

  const {
    selectedAddress = defaultAddress,
    paymentMethod = 'maybank', 
    appliedVoucher = null, 
    discountAmount = 0, 
    shippingDiscount = 0, 
    grandTotal = subtotal + 5,
  } = data;

  useEffect(() => {
    if (selectedItems.length === 0 && !isPaymentSuccessful.current) {
      alert('Your cart is empty or invalid. Returning to cart.')
      navigate('/cart')
    }
  }, [navigate, selectedItems.length])

  return (
    <>  
        {/* === 顶部 Header === */}
        <div className="absolute inset-x-0 top-[44px] z-20 bg-white pb-3 min-h-[44px]">
          <div className="mx-auto w-full max-w-[360px] px-5">
            <header className="flex items-center gap-2">
              <button onClick={() => navigate('/cart', { state: { from: location.pathname } })} className="text-[#1f2937] transition hover:scale-110 hover:text-[#42c236]">
                <BackIcon />
              </button>
              <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[1.2] text-black">
                Payment
              </h1>
            </header>
          </div>
        </div>

        {/* === 中间滚动内容区 === */}
        <div className="hide-scrollbar absolute inset-x-0 bottom-[50px] top-[108px] overflow-y-auto">
          <div className="mx-auto w-full max-w-[360px] px-5 pb-8">
            
            {/* 1. 收货地址 */}
            <div
              onClick={() => navigate('/select-address', { state: data })}
              className="flex cursor-pointer items-start justify-between border-b border-[#f3f4f6] py-5"
            >
              <div className="flex items-start gap-2">
                <div className="mt-0.5">
                  <LocationIcon />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[14px] text-[#1C1B1B]">
                    <span className="font-bold">{selectedAddress.name}</span> <span className="text-[#6b7280]">{selectedAddress.phone}</span>
                  </p>
                  <p className="text-[13px] leading-relaxed text-[#4b5563] pr-4">
                    {formatAddressDisplay(selectedAddress.address, selectedAddress.unitNo)}
                  </p>
                </div>
              </div>
              <div className="mt-8 flex-shrink-0">
                <ChevronRightIcon />
              </div>
            </div>

            {/* 2. 商品清单 (静态展示) */}
            {selectedItems.map((item) => (
            <div key={item.id} className="border-b border-[#f3f4f6] py-5">
              <div className="flex items-start gap-4">
                {/* 左侧：图片 */}
                <div className="h-[80px] w-[60px] flex-shrink-0 rounded-lg bg-[#f8fafc] p-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* 中间：商品信息 */}
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <p className="text-[14px] font-medium leading-snug text-[#1C1B1B] pr-4">
                      {item.name}
                    </p>
                  </div>
                  <div className="mt-2 flex flex-col">
                    <p className="text-[15px] font-bold text-[#1C1B1B]">
                      RM {item.price.toFixed(2)}
                    </p>
                    <p className="text-[12px] text-[#9CA3AF] line-through">RM 20.00</p>
                  </div>
                </div>

                {/* 右侧：数量 (修改这里) */}
                <div className="self-center"> {/* 加了 self-center 强制自身垂直居中 */}
                  <span className="text-[13px] font-medium text-[#6b7280]">
                    x{item.quantity}
                  </span>
                </div>
                
              </div>
            </div>
            ))}

            {/* 3. 优惠券 */}
            <div
            onClick={() => navigate('/select-voucher', { state: data, from: location.pathname })} 
            className="border-b border-[#f3f4f6] py-5">
              <div className="flex items-center justify-between mb-3 cursor-pointer">
                <span className="text-[15px] font-bold text-[#1C1B1B]">Voucher</span>
                <ChevronRightIcon />
              </div>
              {/* 渐变色 Pill */}
              <div className={`flex justify-center items-center w-full rounded-lg bg-gradient-to-r ${appliedVoucher || shippingDiscount > 0 ? 'from-[#c5e1e5] to-[#f4c8b7]' : 'from-[#e2e8f0] to-[#cbd5e1]'} py-2.5 text-center shadow-sm cursor-pointer hover:opacity-90 transition`}>
                <span className="text-[14px] font-bold text-[#1C1B1B]">{!appliedVoucher && shippingDiscount === 0 ? 'No Voucher Applied' : appliedVoucher ? appliedVoucher.label : ''}</span>
                {
                  shippingDiscount > 0 && appliedVoucher && <div className="mx-2 text-[14px] font-bold text-[#1C1B1B]">+</div>
                }
                {
                  shippingDiscount > 0 && <div className="flex w-auto flex-col items-center justify-center border-r border-dashed border-[#d4d4d8]">
                <TruckIcon />
                <span className="mt-1 text-[13px] font-bold text-[#1C1B1B]">FREE</span>
              </div>
                }
              </div>
            </div>

            {/* 4. 支付方式 */}
            <div
            onClick={() => navigate('/select-payment', { state: data, from: location.pathname })}
            className="border-b border-[#f3f4f6] py-5">
              <div className="flex items-center justify-between mb-3 cursor-pointer">
                <span className="text-[15px] font-bold text-[#1C1B1B]">Payment Method</span>
                <ChevronRightIcon />
              </div>
              <div className="flex items-center gap-3">
                {
                  <>
                  {paymentMethods[paymentMethod]?.icon}
                  <span className="text-[14px] font-semibold text-[#1C1B1B]">{paymentMethods[paymentMethod]?.label}</span>
                </>
                }
              </div>
            </div>

            {/* 5. 支付明细 */}
            <div className="py-5">
              <h3 className="mb-4 text-[15px] font-bold text-[#1C1B1B]">Payment Details</h3>
              <div className="flex flex-col gap-2.5 pl-0">
                
                {/* 把 flex 换成 grid grid-cols-3，分为均等的左、中、右三列 */}
                <div className="grid grid-cols-3 items-center text-[14px]">
                  <span className="text-left text-[#4b5563]">Subtotal:</span> {/* 第二列：居中对齐 */}
                  <span className="text-left font-medium text-[#1C1B1B]">{formatPrice(subtotal)}</span> {/* 第三列：靠右对齐 */}
                  <div></div>
                </div>

                <div className="grid grid-cols-3 items-center text-[14px]">
                  <span className="text-left text-[#4b5563]">Discount:</span>
                  <span className="text-left -ml-1.5 font-medium text-[#ee4d4d]">-{formatPrice(discountAmount)}</span>
                  <div></div>
                </div>

                <div className="grid grid-cols-3 items-center text-[14px]">
                  <span className="text-left text-[#4b5563]">Shipping Cost:</span>
                  <span className="text-left font-medium text-[#1C1B1B]">{formatPrice(5 - shippingDiscount)}</span>
                  <div></div>
                </div>

                <div className="grid grid-cols-3 items-center text-[14px]">
                  <span className="text-left font-bold text-[#1C1B1B]">Total:</span>
                  <span className="text-left font-bold text-[#1C1B1B]">{formatPrice(grandTotal)}</span>
                  <div></div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* === 底部操作栏 === */}
        <div className="absolute bottom-[0px] left-0 z-20 w-full border-t border-[#e4e4e7] bg-[#f8fafc] pb-2 pt-3">
          <div className="mx-auto flex w-full max-w-[360px] gap-3 px-5">
            <button 
              onClick={() => { 
                //resetOrders(); 
                navigate('/cart', { state: { from: location.pathname } })}}
              className="flex-1 rounded-xl border-2 border-[#ee4d4d] bg-white py-3.5 text-[16px] font-bold text-[#ee4d4d] transition hover:bg-[#fff5f5] active:scale-95"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                isPaymentSuccessful.current = true
                addOrder({
                id: generateOrderID(),
                status: 'Pending',
                date: generateOrderDate(),
                shippedDate: null,
                products: selectedItems,
                itemsCount: selectedItems.length,
                shippingInfo: {
                  address: formatAddressDisplay(selectedAddress.address, selectedAddress.unitNo),
                  name: selectedAddress.name,
                  phone: selectedAddress.phone
                },
                summary: {
                  subtotal: subtotal,
                  shippingCost: 5 - shippingDiscount, // 假设免邮
                  discount: discountAmount,     // 假设没打折
                  total: grandTotal // 实际支付总额
                },
                paymentMethod: paymentMethods[paymentMethod]?.label || 'Maybank2U',
                })
                removeMultiple(selectedItems.map(item => item.id))
                navigate('/cart', { state: { from: location.pathname, replace: true } })
              }}
              className="flex-1 rounded-xl bg-[#1C1B1B] py-3.5 text-[16px] font-bold text-white transition hover:bg-black hover:shadow-lg active:scale-95"
            >
              Confirm
            </button>
          </div>
        </div>
     </>
  )
}
