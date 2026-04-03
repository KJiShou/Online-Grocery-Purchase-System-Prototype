import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useOrder } from '../contexts/OrderContext'
import { useCart } from '../contexts/CartContext'
import { usePreference } from '../contexts/PreferenceContext'
import { formatPrice, generateOrderID, generateOrderDate, paymentMethods } from '../utils/helper'
import { BackIcon, LocationIcon, ChevronRightIcon, TruckIcon } from '../components/Icons'
import tickIcon from '../assets/order-placed/tick.png'
import orderIcon from '../assets/order-placed/order.png'
import homeIcon from '../assets/order-placed/home.png'

function formatAddressDisplay(address, unitNo) {
  const trimmedAddress = (address || '').trim()
  const trimmedUnit = (unitNo || '').trim()
  const line = [trimmedUnit, trimmedAddress].filter(Boolean).join(', ')
  return line
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { addOrder, updateOrderStatus, resetOrders, updateShippedDate } = useOrder()
  const { selectedItems, subtotal, removeMultiple } = useCart()
  const { defaultAddressId, defaultPaymentMethod, getAddressById } = usePreference()

  const isPaymentSuccessful = useRef(false)
  const [showConfirmPaymentModal, setShowConfirmPaymentModal] = useState(false)
  const [showCancelPaymentModal, setShowCancelPaymentModal] = useState(false)
  const [showOrderPlacedModal, setShowOrderPlacedModal] = useState(false)
  const [currentOrderId, setCurrentOrderId] = useState(null)

  // 2. 安全地提取数据。如果用户是直接在浏览器输入网址进来的（没有经过购物车），
  // location.state 会是 null，我们需要给它一个默认值防止页面崩溃。
  const data = location.state || {}
  const shouldRestoreOrderPlacedPopup = Boolean(data?.showOrderPlacedPopup)
  const restoredOrderId = data?.currentOrderId || null

  const fallbackAddress = {
    id: 'andrew',
    name: 'Andrew',
    phone: '(+60) 12-345 6789',
    address:
      'Ground Floor, Bangunan Tan Sri Khaw Kai Boh (Block A), Jalan Genting Kelang, Setapak, 53100 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    unitNo: 'Unit 01-01',
    postalCode: '53100',
    isDefault: true,
  }

  const preferredAddress = getAddressById(defaultAddressId)
  const defaultAddress = preferredAddress
    ? {
      id: preferredAddress.id,
      name: preferredAddress.shipping?.name || '',
      phone: preferredAddress.shipping?.phone || '',
      address: preferredAddress.shipping?.address || '',
      unitNo: preferredAddress.shipping?.unitNo || '',
      postalCode: preferredAddress.shipping?.postalCode || '',
      isDefault: Boolean(preferredAddress.isDefault),
    }
    : fallbackAddress

  const {
    directBuyProduct = null,
    directBuyProductQuantity = 0,
    directBuyProductSubtotal = 0,
    selectedAddress = defaultAddress,
    paymentMethod: incomingPaymentMethod,
    appliedVoucher = null, 
    discountAmount = 0, 
    shippingDiscount = 0, 
    grandTotal = directBuyProductSubtotal == 0 ? subtotal + 5 : directBuyProductSubtotal + 5,
    from = ''
  } = data

  useEffect(() => {
    if (shouldRestoreOrderPlacedPopup && restoredOrderId) {
      isPaymentSuccessful.current = true
      setCurrentOrderId(restoredOrderId)
      setShowOrderPlacedModal(true)
    }
  }, [restoredOrderId, shouldRestoreOrderPlacedPopup])

  const checkoutDirectBuyProduct = directBuyProduct ? {
    ...directBuyProduct,
    quantity: directBuyProductQuantity
  } : null

  const paymentMethod = paymentMethods[incomingPaymentMethod]
    ? incomingPaymentMethod
    : paymentMethods[defaultPaymentMethod]
      ? defaultPaymentMethod
      : 'maybank'

  const checkoutData = {
    ...data,
    items: checkoutDirectBuyProduct ? [checkoutDirectBuyProduct] : selectedItems,
    subtotal: directBuyProductSubtotal == 0 ? subtotal : directBuyProductSubtotal,
    selectedAddress,
    paymentMethod,
    appliedVoucher,
    discountAmount,
    shippingDiscount,
    grandTotal,
  }

  useEffect(() => {
    if (selectedItems.length === 0 && !isPaymentSuccessful.current && !directBuyProduct && !shouldRestoreOrderPlacedPopup) {
      alert('Your cart is empty or invalid. Returning to cart.')
      navigate('/cart')
    }
  }, [directBuyProduct, navigate, selectedItems.length, shouldRestoreOrderPlacedPopup])

  return (
    <>  
        {/* === 顶部 Header === */}
        <div className="absolute inset-x-0 top-[44px] z-20 bg-white min-h-[44px]">
          <div className="mx-auto w-full max-w-[360px] px-5">
            <header className="flex items-center gap-2">
              <button onClick={() => setShowCancelPaymentModal(true)} className="text-[#1f2937] transition hover:scale-110 hover:text-[#42c236]">
                <BackIcon />
              </button>
              <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[1.2] text-black">
                Payment
              </h1>
            </header>
          </div>
        </div>

        {/* === 中间滚动内容区 === */}
        <div className="hide-scrollbar absolute inset-x-0 bottom-[50px] top-[88px] overflow-y-auto">
          <div className="mx-auto flex w-full max-w-[360px] flex-col px-5 pb-8 pt-4">
            
            {/* 1. 收货地址 (卡片化) */}
            <div
            onClick={() => navigate('/select-address', { state: checkoutData })}
              className="mb-4 flex cursor-pointer items-start justify-between rounded-2xl bg-white p-5 transition hover:bg-[#f1f5f9] active:scale-[0.98]"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-[#1C1B1B]">
                  <LocationIcon />
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="text-[14px] text-[#1C1B1B]">
                    <span className="font-bold">{selectedAddress.name}</span>{' '}
                    <span className="text-[#6b7280]">{selectedAddress.phone}</span>
                  </p>
                  <p className="pr-2 text-[13px] leading-relaxed text-[#4b5563]">
                  {formatAddressDisplay(selectedAddress.address, selectedAddress.unitNo)}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex-shrink-0 text-[#1C1B1B]">
                <ChevronRightIcon />
              </div>
            </div>

            {/* 2. 商品清单 (统一包装在一个卡片内) */}
            <div className="mb-4 flex flex-col rounded-2xl bg-white p-5">
              <h3 className="mb-4 text-[15px] font-bold text-[#1C1B1B]">Order Items</h3>
              { !directBuyProduct ?
              (selectedItems.map((item, index) => (
                <div 
                  key={item.id} 
                  // 严厉的排版细节：除了最后一个商品，其他的底部都要加一条极淡的分割线和间距
                  className={`flex items-start gap-4 ${index !== selectedItems.length - 1 ? 'border-b border-[#e2e8f0] pb-4 mb-4' : ''}`}
                >
                  {/* 左侧：图片 */}
                  <div className="h-[72px] w-[72px] flex-shrink-0 rounded-xl bg-white p-1.5 shadow-sm">
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain mix-blend-multiply" />
                  </div>

                  {/* 中间：商品信息 */}
                  <div className="flex flex-1 flex-col justify-between py-0.5">
                    <p className="pr-2 text-[14px] font-medium leading-snug text-[#1C1B1B]">
                      {item.name}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <p className="text-[15px] font-bold text-[#1C1B1B]">
                        RM {item.price.toFixed(2)}
                      </p>
                      {item.oldPrice ? (<p className="text-[12px] text-[#EE4D4D] line-through">{formatPrice(item.oldPrice)}</p>) : null }
                    </div>
                  </div>

                  {/* 右侧：数量 */}
                  <div className="self-center">
                    <span className="text-[14px] font-bold text-[#6b7280]">x{item.quantity}</span>
                  </div>
                </div>
              ))) :
               <div 
                  className={`flex items-start gap-4`}
                >
                  {/* 左侧：图片 */}
                  <div className="h-[72px] w-[72px] flex-shrink-0 rounded-xl bg-white p-1.5 shadow-sm">
                    <img src={directBuyProduct.image} alt={directBuyProduct.name} className="h-full w-full object-contain mix-blend-multiply" />
                  </div>

                  {/* 中间：商品信息 */}
                  <div className="flex flex-1 flex-col justify-between py-0.5">
                    <p className="pr-2 text-[14px] font-medium leading-snug text-[#1C1B1B]">
                      {directBuyProduct.name}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <p className="text-[15px] font-bold text-[#1C1B1B]">
                        RM {directBuyProduct.price.toFixed(2)}
                      </p>
                      <p className="text-[12px] text-[#9CA3AF] line-through">RM 20.00</p>
                    </div>
                  </div>

                  {/* 右侧：数量 */}
                  <div className="self-center">
                    <span className="text-[14px] font-bold text-[#6b7280]">x{directBuyProductQuantity}</span>
                  </div>
                </div>
            }
            </div>

            {/* 3. 优惠券 (卡片化) */}
            <div
            onClick={() => navigate('/select-voucher', { state: { 
              ...checkoutData, 
              from: location.pathname 
            } })}
              className="mb-4 flex cursor-pointer flex-col rounded-2xl bg-white p-5 transition hover:bg-[#f1f5f9] active:scale-[0.98]"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[15px] font-bold text-[#1C1B1B]">Voucher</span>
                <div className="text-[#1C1B1B]"><ChevronRightIcon /></div>
              </div>
              {/* 渐变色 Pill */}
              <div className={`flex w-full items-center justify-center rounded-xl bg-gradient-to-r py-3 text-center shadow-sm transition hover:opacity-90 ${appliedVoucher || shippingDiscount > 0 ? 'from-[#c5e1e5] to-[#f4c8b7]' : 'from-[#e2e8f0] to-[#cbd5e1]'}`}>
                <span className="text-[14px] font-bold text-[#1C1B1B]">
                  {!appliedVoucher && shippingDiscount === 0 ? 'No Voucher Applied' : appliedVoucher ? appliedVoucher.label : ''}
                </span>
                {/* {shippingDiscount > 0 && appliedVoucher && (
                  <div className="mx-2 text-[14px] font-bold text-[#1C1B1B]">+</div>
                )} */}
                {shippingDiscount > 0 && (
                  <div className="flex items-center justify-center border-l border-dashed border-[#1C1B1B]/20 pl-3 ml-2">
                    <TruckIcon />
                    <span className="ml-1.5 text-[13px] font-bold text-[#1C1B1B]">FREE</span>
                  </div>
                )}
              </div>
            </div>

            {/* 4. 支付方式 (卡片化) */}
            <div
            onClick={() => navigate('/select-payment', { state: checkoutData, from: location.pathname })}
              className="mb-4 flex cursor-pointer items-center justify-between rounded-2xl bg-white p-5 transition hover:bg-[#f1f5f9] active:scale-[0.98]"
            >
              <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-[15px] font-bold text-[#1C1B1B]">Payment</span>
              </div>
              <div className="flex items-center gap-2">
                {(() => {
                  const IconComponent = paymentMethods[paymentMethod]?.icon
                  return IconComponent ? <IconComponent /> : null
                })()}
                <span className="text-[14px] font-semibold text-[#1C1B1B]">{paymentMethods[paymentMethod]?.label}</span>
              </div>
              </div>
              <div className="ml-1 text-[#1C1B1B]"><ChevronRightIcon /></div>
            </div>

            {/* 5. 支付明细 (彻底修复排版) */}
            <div className="mb-4 rounded-2xl bg-white p-5">
              <h3 className="mb-4 text-[15px] font-bold text-[#1C1B1B]">Payment Details</h3>
              <div className="flex flex-col gap-3">
                
                {/* 严厉纠正：这是电商系统最标准的左右对齐写法，用 flex justify-between！ */}
                <div className="grid grid-cols-3 items-center text-[14px]">
                  <span className="text-left text-[#4b5563]">Subtotal:</span>
                  <span className="pl-4 text-left font-medium text-[#1C1B1B]">{directBuyProductSubtotal === 0 ? formatPrice(subtotal) : formatPrice(directBuyProductSubtotal)}</span>
                </div>

                <div className="grid grid-cols-3 items-center text-[14px]">
                  <span className="text-left text-[#4b5563]">Discount:</span>
                  <span className="pl-4 -ml-1.5 text-left font-medium text-[#ee4d4d]">-{formatPrice(discountAmount)}</span>
                </div>

                <div className="grid grid-cols-3 items-center text-[14px]">
                  <span className="text-left text-[#4b5563]">Shipping Cost:</span>
                  <span className="pl-4 text-left font-medium text-[#1C1B1B]">{formatPrice(5 - shippingDiscount)}</span>
                </div>

                {/* 底部加一条线区分 Total */}
                <div className="mt-1 border-t border-[#f3f4f6] pt-4 grid grid-cols-3 items-center text-[14px]">
                  <span className="text-left text-[15px] font-bold text-[#1C1B1B]">Total:</span>
                  <span className="pl-4 text-left text-[18px] font-bold text-[#1C1B1B]">{formatPrice(grandTotal)}</span>
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
                resetOrders(); 
                setShowCancelPaymentModal(true);
                }}
              className="flex-1 rounded-xl border-2 border-[#ee4d4d] bg-white py-3.5 text-[16px] font-bold text-[#ee4d4d] transition hover:bg-[#fff5f5] active:scale-95"
            >
              Cancel Payment
            </button>
            <button 
              onClick={() => {
                setShowConfirmPaymentModal(true)
              }}
              className="flex-1 rounded-xl bg-[#1C1B1B] py-3.5 text-[16px] font-bold text-white transition hover:bg-black hover:shadow-lg active:scale-95"
            >
              Pay Now
            </button>
          </div>
        </div>

        {showConfirmPaymentModal ? (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/35 px-4">
            <div className="w-full max-w-[328px] rounded-2xl bg-white p-4 shadow-[0_16px_36px_rgba(0,0,0,0.22)]">
              <h3 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[18px] font-bold text-[#1C1B1B]">Confirm Payment</h3>
              <p className="mt-2 text-[14px] leading-5 text-[#4B5563]">Proceed with payment and place this order?</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirmPaymentModal(false)}
                  className="h-10 rounded-lg border border-[#D4D4D8] bg-white text-[14px] font-semibold text-[#1C1B1B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]"
                >
                    Go Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // 这里填入取消订单的逻辑
                isPaymentSuccessful.current = true
                const currentOrderId = generateOrderID();
                    setCurrentOrderId(currentOrderId)
                addOrder({
                id: currentOrderId,
                status: 'Pending',
                date: generateOrderDate(),
                shippedDate: null,
                products: checkoutDirectBuyProduct ? [checkoutDirectBuyProduct] : selectedItems,
                itemsCount: checkoutDirectBuyProduct ? 1 : selectedItems.length,
                shippingInfo: {
                  id: selectedAddress.id,
                  address: formatAddressDisplay(selectedAddress.address, selectedAddress.unitNo),
                  name: selectedAddress.name,
                  phone: selectedAddress.phone
                },
                summary: {
                  subtotal: directBuyProductSubtotal === 0 ? subtotal : directBuyProductSubtotal,
                  shippingCost: 5 - shippingDiscount, // 假设免邮
                  discount: discountAmount,     // 假设没打折
                  total: grandTotal // 实际支付总额
                },
                paymentMethod: paymentMethods[paymentMethod]?.label || 'Maybank2U',
                })

                // 1. 模拟第一阶段：30秒（30000毫秒）后，把状态改为 Shipped
                setTimeout(() => {
                  updateOrderStatus(currentOrderId, 'Shipped');
                  console.log(`后台模拟推送：订单 ${currentOrderId} 第一阶段 -> Shipped`);

                  // 2. 模拟第二阶段：在变成 Shipped 之后，再开启一个新的 30 秒定时器
                  setTimeout(() => {
                    const shippedDate = generateOrderDate()
                    updateShippedDate(currentOrderId, shippedDate)
                    updateOrderStatus(currentOrderId, 'Out for Delivery');
                    console.log(`后台模拟推送：订单 ${currentOrderId} 第二阶段 -> Out for Delivery`);
                    
                    // 因为这里是终点，所以不需要再嵌套定时器了，更新到此停止。
                  }, 30000);

                }, 30000);

                removeMultiple(selectedItems.map(item => item.id))
                setShowConfirmPaymentModal(false)
                    setShowOrderPlacedModal(true)
                    
                  }}
                  className="h-10 rounded-lg bg-[#1C1B1B] text-[14px] font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {showCancelPaymentModal ? (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/35 px-4">
            <div className="w-full max-w-[328px] rounded-2xl bg-white p-4 shadow-[0_16px_36px_rgba(0,0,0,0.22)]">
              <h3 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[18px] font-bold text-[#1C1B1B]">Cancel Payment</h3>
              <p className="mt-2 text-[14px] leading-5 text-[#4B5563]">Are you sure you want to cancel this payment?</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowCancelPaymentModal(false)}
                  className="h-10 rounded-lg border border-[#D4D4D8] bg-white text-[14px] font-semibold text-[#1C1B1B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]"
                >
                    Keep Payment
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCancelPaymentModal(false)
                    navigate(from === '/product' || from.startsWith('/product') ? -1 : '/cart', { state: { from: location.pathname }, replace: true })
                  }}
                  className="h-10 rounded-lg bg-[#EE4D4D] text-[14px] font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EE4D4D]"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        ) : null}

      {showOrderPlacedModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35">
          <div className="w-full max-w-[360px] rounded-2xl bg-white p-5 shadow-[0_16px_36px_rgba(0,0,0,0.22)] mx-4">
            <div className="flex flex-col items-center">
              <img src={tickIcon} alt="Order placed" className="h-[72px] w-[72px] object-contain" />
              <h2 className="mt-5 text-center text-[22px] font-bold leading-[1.1] tracking-[-0.03em] text-[#1C1B1B]">
                Order Placed!
              </h2>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  navigate('/home')
                }}
                className="flex h-[46px] items-center justify-center gap-2 rounded-[12px] border border-[#e4e4e7] bg-white text-[15px] font-semibold text-[#1C1B1B] hover:bg-gray-100"
              >
                <img src={homeIcon} alt="Back to Home" className="h-[20px] w-[20px] object-contain" />
                <span>Back to Home</span>
              </button>

              <button
                onClick={() => {
                  navigate('/order-detail/' + currentOrderId.substring(1), {
                    state: {
                      returnToOrderHistory: true,
                      currentOrderId,
                    },
                  })
                }}
                className="flex h-[46px] items-center justify-center gap-2 rounded-[12px] bg-[#1C1B1B] text-[15px] font-semibold text-white"
              >
                <img src={orderIcon} alt="Order detail" className="h-[20px] w-[20px] object-contain" />
                <span>Order Detail</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

     </>
  )
}
