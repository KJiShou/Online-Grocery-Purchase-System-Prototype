import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { BackIcon, TruckIcon } from '../components/Icons'
import { formatPrice } from '../utils/helper'

// 模拟的优惠券数据
const itemVouchers = [
  { id: 'v20', label: '20% OFF\nVoucher', title: '20% OFF CAPPED AT RM20', minSpend: 'Min. Spend RM15', rate: 0.2 },
  { id: 'v15a', label: '15% OFF\nVoucher', title: '15% OFF CAPPED AT RM10', minSpend: 'Min. Spend RM5', rate: 0.15 },
  { id: 'v15b', label: '15% OFF\nVoucher', title: '15% OFF CAPPED AT RM10', minSpend: 'Min. Spend RM5', rate: 0.15 },
  { id: 'v10', label: '10% OFF\nVoucher', title: '10% OFF CAPPED AT RM5', minSpend: 'Min. Spend RM0', rate: 0.1 },
]

export default function SelectVoucherPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { subtotal } = useCart()

  // 提取之前页面传过来的数据 (确保不丢失)
  const data = location.state || {}
  const { 
    appliedVoucher = null, 
    shippingDiscount = 0,
    directBuyProductSubtotal = 0,
  } = data // 默认给个 15.25 方便你直接测试页面
  
  // 状态管理：记录选中的免邮券和商品优惠券
  const [selectedShipping, setSelectedShipping] = useState(shippingDiscount === 0 ? false : true) // 默认选中免邮
  const [selectedItemVoucher, setSelectedItemVoucher] = useState(appliedVoucher?.id ? appliedVoucher.id : null) // 默认选中20%

  // 动态计算折扣和总价
  const currentVoucherObj = itemVouchers.find(v => v.id === selectedItemVoucher)
  const discountRate = currentVoucherObj ? currentVoucherObj.rate : 0
  const discountAmount = directBuyProductSubtotal === 0 ? subtotal * discountRate : directBuyProductSubtotal * discountRate
  const grandTotal = directBuyProductSubtotal === 0 ? subtotal - discountAmount + (selectedShipping ? 0 : 5) : directBuyProductSubtotal - discountAmount + (selectedShipping ? 0 : 5)// 如果免邮券被选中，运费为0，否则加上RM5

  // 计算选中了多少个券
  const selectedCount = (selectedShipping ? 1 : 0) + (selectedItemVoucher ? 1 : 0)

  // 确认按钮逻辑：带着计算好的数据返回 Checkout
  const handleConfirm = () => {
    navigate('/payment', { 
      state: { 
        ...data, // 展开原有数据（包含商品列表等）
        appliedVoucher: currentVoucherObj, // 将选中的优惠券对象传过去
        discountAmount: discountAmount,    // 传算好的折扣金额
        shippingDiscount: selectedShipping ? 5 : 0, // 传算好的运费折扣
        grandTotal: grandTotal,             // 传算好的总价
        from: location.pathname
      },
      replace: true 
    })
  }
  // console.log(data)

  return (
    <>
        {/* === 顶部 Header === */}
        <div className="absolute inset-x-0 top-[44px] z-20 bg-white min-h-[44px]">
          <div className="mx-auto w-full max-w-[360px] px-5">
            <header className="flex items-center gap-2">
              <button onClick={() => navigate(-1)} className="text-[#1f2937] transition hover:scale-110">
                <BackIcon />
              </button>
              <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[20px] font-bold leading-[1.2] text-black">
                Select Voucher / Discount
              </h1>
            </header>
          </div>
        </div>

        {/* === 中间滚动内容区 === */}
        <div className="hide-scrollbar absolute inset-x-0 bottom-[200px] top-[88px] overflow-y-auto">
          <div className="mx-auto w-full max-w-[360px] px-5 pb-8 pt-4">
            
            {/* 1. Shipping Vouchers 区块 */}
            <p className="mb-3 text-[14px] font-medium text-[#4b5563]">Shipping Vouchers</p>
            
            <div 
              onClick={() => setSelectedShipping(!selectedShipping)}
              className="mb-6 flex h-[72px] w-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md"
            >
              {/* 左侧渐变区 */}
              <div className="flex w-[110px] flex-col items-center justify-center border-r border-dashed border-[#d4d4d8] bg-gradient-to-br from-[#c1dfe3] to-[#e8cbb9]">
                <TruckIcon />
                <span className="mt-1 text-[13px] font-bold text-[#1C1B1B]">FREE</span>
              </div>
              {/* 右侧信息区 */}
              <div className="flex flex-1 items-center justify-between px-4">
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-[#1C1B1B]">FREE SHIPPING DISCOUNT</span>
                  <span className="text-[12px] text-[#9ca3af]">Min. Spend RM5</span>
                </div>
                {/* 绿圈 Radio Button */}
                <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${selectedShipping ? 'border-[#42c236]' : 'border-[#d4d4d8]'}`}>
                  {selectedShipping && <div className="h-2.5 w-2.5 rounded-full bg-[#42c236]"></div>}
                </div>
              </div>
            </div>

            {/* 2. Item Vouchers 区块 */}
            <p className="mb-3 text-[14px] font-medium text-[#4b5563]">Item Vouchers</p>
            
            <div className="flex flex-col gap-3">
              {itemVouchers.map((voucher) => (
                <div 
                  key={voucher.id}
                  onClick={() => setSelectedItemVoucher(selectedItemVoucher === voucher.id ? null : voucher.id)}
                  className="flex h-[72px] w-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* 左侧渐变区 */}
                  <div className="flex w-[110px] flex-col items-center justify-center border-r border-dashed border-[#d4d4d8] bg-gradient-to-br from-[#c1dfe3] to-[#f4cfbc] p-2 text-center leading-tight">
                    <span className="whitespace-pre-line text-[13px] font-bold text-[#1C1B1B]">{voucher.label}</span>
                  </div>
                  {/* 右侧信息区 */}
                  <div className="flex flex-1 items-center justify-between px-4">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-[#1C1B1B]">{voucher.title}</span>
                      <span className="text-[12px] text-[#9ca3af]">{voucher.minSpend}</span>
                    </div>
                    {/* 绿圈 Radio Button */}
                    <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${selectedItemVoucher === voucher.id ? 'border-[#42c236]' : 'border-[#d4d4d8]'}`}>
                      {selectedItemVoucher === voucher.id && <div className="h-2.5 w-2.5 rounded-full bg-[#42c236]"></div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* === 底部结算信息与操作栏 === */}
        <div className="absolute bottom-0 left-0 z-20 w-full bg-white pb-6 pt-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
          <div className="mx-auto flex w-full max-w-[360px] flex-col px-5">
            
            {/* 优惠摘要 */}
            <div className="mb-4 flex flex-col gap-1 text-[13px]">
              <p className="font-semibold text-[#1C1B1B]">{selectedCount} Vouchers / Discount Selected</p>
              <div className="flex items-center">
                  <span className="text-[#4b5563]">Subtotal : </span>
                  <span className="ml-1 font-medium text-[#4b5563]">{formatPrice(subtotal)}</span>
              </div>
              {currentVoucherObj && (
                <div className="flex items-center">
                  <span className="text-[#4b5563]">Item Discount {currentVoucherObj.rate * 100}% : </span>
                  <span className="ml-1 font-medium text-[#ee4d4d]">- {formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex items-center">
                  <span className="text-[#4b5563]">Shipping Cost : </span>
                  {selectedShipping && (
                    <span className="ml-1 font-semibold  text-[#4b5563]">RM 0.00</span>
                    )}
                  <span className={`ml-1 font-semibold ${selectedShipping ? 'line-through text-[#ee4d4d]' : ''}`}>RM 5.00</span>
              </div>
              
              <div className="mt-1 flex items-center text-[14px]">
                <span className="font-bold text-[#1C1B1B]"> Total : </span>
                <span className="ml-1 font-bold text-[#1C1B1B]">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Confirm 按钮 */}
            <button 
              onClick={handleConfirm}
              className="w-full rounded-2xl bg-[#1C1B1B] py-4 text-[16px] font-bold text-white transition hover:bg-[#2f3f58] active:scale-95"
            >
              Confirm
            </button>
          </div>
        </div>
        
      </>
  )
}
