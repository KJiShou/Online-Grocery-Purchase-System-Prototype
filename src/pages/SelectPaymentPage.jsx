import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { usePreference } from '../contexts/PreferenceContext'
import { BackIcon, CardIcon, ChevronUpIcon, MaybankIcon, PublicBankIcon, CimbIcon, GPayIcon, TngIcon, CashIcon, TruckIcon } from '../components/Icons'
import { paymentMethods } from '../utils/helper'

export default function SelectPaymentPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { defaultPaymentMethod } = usePreference()
  const incomingState = location.state?.checkoutData || location.state || {}
  
  // 核心状态：记录当前选中的支付方式 ID
  const [selectedMethod, setSelectedMethod] = useState(() => {
    if (paymentMethods[incomingState.paymentMethod]) return incomingState.paymentMethod
    if (paymentMethods[defaultPaymentMethod]) return defaultPaymentMethod
    return 'maybank'
  })

  // 确认按钮逻辑
  const handleSelect = () => {
        if (!selectedMethod) {
            alert('Please select a payment method first.')
            return
        }
        
        // 严厉提醒：绝对不能用 navigate(-1) 传状态！
        // 我们必须明确跳回 /payment，并合并原来的购物车数据
        navigate(location.state?.from ?? '/payment', { 
            state: { 
            ...incomingState, // 展开所有原来购物车传来的数据（items, subtotal 等）
            paymentMethod: selectedMethod // 加上你新选的支付方式
            },
            replace: true // 极其重要：替换当前历史记录，防止用户按手机返回键时在两个页面间死循环
        }) 
    }

  const [isBankingExpanded, setIsBankingExpanded] = useState(true)

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
                Select Payment Method
              </h1>
            </header>
          </div>
        </div>

        {/* === 中间滚动内容区 === */}
        <div className="hide-scrollbar absolute inset-x-0 bottom-[100px] top-[88px] overflow-y-auto">
          <div className="mx-auto flex w-full max-w-[360px] flex-col gap-5 px-5 pb-8 pt-4">
            
            {/* 1. Online Banking 区块 */}
           <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            {/* 区块标题 */}
            <div 
                onClick={() => setIsBankingExpanded(!isBankingExpanded)}
                className="flex cursor-pointer items-center justify-between border-b border-[#f3f4f6] px-4 py-3 text-[#6b7280] transition hover:bg-gray-50"
            >
                <div className="flex items-center gap-2">
                <CardIcon />
                <span className="text-[14px] font-medium">Online Banking</span>
                </div>
                {/* 箭头旋转动画 */}
                <div className={`transition-transform duration-300 ${isBankingExpanded ? '' : 'rotate-180'}`}>
                <ChevronUpIcon />
                </div>
            </div>

            {/* 银行列表 */}
            {isBankingExpanded && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                
                <div 
                    onClick={() => setSelectedMethod('maybank')}
                    className={`flex cursor-pointer items-center justify-between border-b border-[#f3f4f6] px-4 py-4 transition hover:bg-gray-50 ${selectedMethod === 'maybank' ? 'bg-[#f8fafc]' : ''}`}
                >
                    <div className="flex items-center gap-3">
                    <MaybankIcon />
                    <span className="text-[15px] font-semibold text-[#1C1B1B]">Maybank2U</span>
                    </div>
                    {/* 绿色打勾指示器 */}
                    {selectedMethod === 'maybank' && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#42c236]">
                        <svg className="h-3 w-3 text-white -mr-0.5 mt-0.5" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 5l3 3L11 1" />
                        </svg>
                    </div>
                    )}
                </div>

                <div 
                    onClick={() => setSelectedMethod('publicbank')}
                    className={`flex cursor-pointer items-center justify-between border-b border-[#f3f4f6] px-4 py-4 transition hover:bg-gray-50 ${selectedMethod === 'publicbank' ? 'bg-[#f8fafc]' : ''}`}
                >
                    <div className="flex items-center gap-3">
                    <PublicBankIcon />
                    <span className="text-[15px] font-semibold text-[#1C1B1B]">Public Bank</span>
                    </div>
                    {/* 绿色打勾指示器 */}
                    {selectedMethod === 'publicbank' && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#42c236]">
                        <svg className="h-3 w-3 text-white" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 5l3 3L11 1" />
                        </svg>
                    </div>
                    )}
                </div>

                <div 
                    onClick={() => setSelectedMethod('cimb')}
                    className={`flex cursor-pointer items-center justify-between px-4 py-4 transition hover:bg-gray-50 ${selectedMethod === 'cimb' ? 'bg-[#f8fafc]' : ''}`}
                >
                    <div className="flex items-center gap-3">
                    <CimbIcon />
                    <span className="text-[15px] font-semibold text-[#1C1B1B]">CIMB Clicks</span>
                    </div>
                    {/* 绿色打勾指示器 */}
                    {selectedMethod === 'cimb' && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#42c236]">
                        <svg className="h-3 w-3 text-white" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 5l3 3L11 1" />
                        </svg>
                    </div>
                    )}
                </div>

                </div>
            )}
            </div>

            {/* 2. Cash On Delivery 区块 */}
            <div 
              onClick={() => setSelectedMethod('cod')}
              className={`flex cursor-pointer items-center justify-between rounded-2xl bg-white p-4 shadow-sm transition hover:bg-gray-50 
                ${selectedMethod === 'cod' ? 'border-2 border-[#42c236]' : 'border-2 border-transparent'}`}
            >
              <div className="flex items-center gap-3 text-[#6b7280]">
                <CashIcon />
                <span className="text-[15px] font-medium">Cash On Delivery</span>
              </div>
              {/* Radio Button 逻辑 */}
              <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 
                ${selectedMethod === 'cod' ? 'border-[#42c236]' : 'border-[#d4d4d8]'}`}
              >
                {selectedMethod === 'cod' && <div className="h-2.5 w-2.5 rounded-full bg-[#42c236]"></div>}
              </div>
            </div>

            {/* 3. Other Payments 区块 */}
            <div
            className={`cursor-pointer rounded-2xl items-center border-b border-[#f3f4f6] px-4 py-4 transition bg-white shadow-sm`}
            >
              <p className="mb-3 px-1 text-[13px] font-medium text-[#6b7280] underline underline-offset-2">
                Other Payments
              </p>
              <div className="grid grid-cols-2 gap-3">
                {/* GPay */}
                <div 
                  onClick={() => setSelectedMethod('gpay')}
                  className={`flex h-[64px] cursor-pointer items-center justify-center rounded-2xl bg-[#F4FDFA] shadow-sm transition hover:-translate-y-0.5 
                    ${selectedMethod === 'gpay' ? 'border-2 border-[#42c236]' : 'border-2 border-transparent'}`}
                >
                  <GPayIcon />
                </div>
                {/* Touch n Go */}
                <div 
                  onClick={() => setSelectedMethod('tng')}
                  className={`flex h-[64px] cursor-pointer items-center justify-center rounded-2xl bg-[#F4FDFA] shadow-sm transition hover:-translate-y-0.5 
                    ${selectedMethod === 'tng' ? 'border-2 border-[#42c236]' : 'border-2 border-transparent'}`}
                >
                  <TngIcon />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* === 底部操作栏 === */}
        <div className="absolute bottom-[0px] left-0 z-20 w-full border-t border-[#e4e4e7] bg-[#f8fafc] pb-2 pt-3">
            <div className="mx-auto w-full max-w-[360px] px-5">
                <div className="border-b border-[#f3f4f6] py-0">
            <button 
              onClick={handleSelect}
              className="w-full rounded-2xl bg-[#1C1B1B] py-4 text-[16px] font-bold text-white transition hover:bg-[#2f3f58] active:scale-95"
            >
              Select
            </button>
            </div>
          </div>
        </div>
    </>
  )
}
