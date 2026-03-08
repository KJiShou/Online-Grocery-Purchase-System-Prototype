import { useEffect, useState } from 'react'
import { useNavigate, useLocation, useNavigationType } from 'react-router-dom'
import { CardIcon, LogoutIcon, BoxIcon, ReceiptIcon, ChevronRightIcon, ShieldIcon, DocumentIcon, ChatIcon, LockIcon, PhoneIcon } from '../components/Icons'
import { usePreference } from '../contexts/PreferenceContext'
import { ToastCheckIcon } from '../components/Icons'

function formatCurrentTime() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

// === 高度复用的列表项组件 ===
function MenuItem({ icon, label, hasToggle = false, isToggleOn = false, onToggle, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="flex cursor-pointer items-center justify-between py-3.5 transition-opacity hover:opacity-70"
    >
      <div className="flex items-center gap-4 text-[#6b7280]">
        {icon}
        <span className="text-[14px] font-medium text-[#4b5563]">{label}</span>
      </div>
      
      {/* 如果有 Toggle 就渲染开关，否则渲染右箭头 */}
      {hasToggle ? (
        <div 
          onClick={(e) => { e.stopPropagation(); onToggle && onToggle(); }}
          className={`flex h-6 w-11 items-center rounded-full p-1 transition-colors ${isToggleOn ? 'bg-[#21D4B4]' : 'bg-[#e4e4e7]'}`}
        >
          <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${isToggleOn ? 'translate-x-5' : 'translate-x-0'}`}></div>
        </div>
      ) : (
        <ChevronRightIcon />
      )}
    </div>
  )
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const navigationType = useNavigationType()
  const location = useLocation()
  
  // 记录 Dark Theme 的开关状态
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const { changeDefaultPaymentMethod, defaultPaymentMethod, changeDefaultAddress } = usePreference()

  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const data = location.state || {}

  useEffect(() => {
    console.log('ProfilePage received state:', location.state)
    if (data.paymentMethod && navigationType !== 'POP') {
      changeDefaultPaymentMethod(data.paymentMethod)
      setToastMessage('Default payment method updated successfully!')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } else if (data.selectedAddress && navigationType !== 'POP') {
      changeDefaultAddress(data.selectedAddress.id)
      setToastMessage('Default address updated successfully!')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }, [data.paymentMethod, defaultPaymentMethod])

  return (
    <>
        {/* === 顶部绿色背景层 === */}
        <div className="absolute inset-x-0 top-0 z-0 h-[190px] w-full bg-[#4CBF35]"></div>

        {/* === 顶部 Header 内容区 === */}
        <div className="absolute inset-x-0 top-[50px] z-20 bg-[#4CBF35] pb-3 min-h-[44px]">
          <div className="mx-auto w-full max-w-[360px] px-5">

            {/* 用户信息与退出按钮 */}
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" 
                  alt="Profile Avatar" 
                  className="h-[52px] w-[52px] rounded-xl object-cover shadow-sm"
                />
                <div className="flex flex-col text-white">
                  <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-[18px] font-bold leading-tight">
                    Ahmed Raza
                  </h1>
                  <p className="text-[13px] opacity-90">ahmedraza@gmail.com</p>
                </div>
              </div>
              
              <button 
                onClick={() => console.log('Logout')}
                className="text-white transition hover:scale-110"
              >
                <LogoutIcon />
              </button>
            </header>
            <div 
              className={`absolute left-1/2 top-[0px] z-50 flex w-[calc(100%-40px)] max-w-[320px] -translate-x-1/2 items-center justify-between rounded-2xl border border-[#f3f4f6] bg-white p-3 shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out 
              ${showToast ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-6 opacity-0 pointer-events-none'}`}
            >
                <div className="flex items-center gap-3">
                  <ToastCheckIcon />
                  <p className="w-full text-[13px] font-semibold leading-tight text-[#1C1B1B]">
                    {toastMessage}
                  </p>
                </div>
              </div>
          </div>
        </div>

        {/* === 中间白色滚动卡片区 (覆盖在绿色背景之上) === */}
        {/* top-[140px] 留出头部空间， rounded-t-[24px] 制作顶部圆角 */}
        <div className="hide-scrollbar absolute inset-x-0 bottom-[72px] top-[120px] z-20 overflow-y-auto rounded-t-[24px] bg-white">
          <div className="mx-auto w-full max-w-[360px] px-5 py-6">
            
          {/* --- Section 2: My Order --- */}
            <div className="mb-6">
            <h3 className="mb-2 text-[14px] font-bold text-[#1C1B1B]">My Order</h3>
            <div className="flex flex-col">
              <MenuItem icon={<ReceiptIcon />} label="Order History" onClick={() => navigate('/order-history')} />
            </div>
          </div>

          {/* --- Section 1: Preferences --- */}
          <div className="mb-6">
            <h3 className="mb-2 text-[14px] font-bold text-[#1C1B1B]">My Preferences</h3>
              <div className="flex flex-col">
                <MenuItem icon={<BoxIcon />} label="Default Shipping Address" onClick={() => navigate('/select-address', { state: { from: '/profile' } })} />
              <MenuItem icon={<CardIcon />} label="Default Payment Method" onClick={() => navigate('/select-payment', { state: { from: '/profile', paymentMethod: defaultPaymentMethod } })} />
              </div>
            </div>

            {/* --- Section 2: Support & Information --- */}
            {/* <div className="mb-6">
              <h3 className="mb-2 text-[14px] font-bold text-[#1C1B1B]">Support & Information</h3>
              <div className="flex flex-col">
                <MenuItem icon={<ShieldIcon />} label="Privacy Policy" />
                <MenuItem icon={<DocumentIcon />} label="Terms & Conditions" />
                <MenuItem icon={<ChatIcon />} label="FAQs" />
              </div>
            </div> */}

            {/* --- Section 3: Account Management --- */}
            {/* <div className="mb-2">
              <h3 className="mb-2 text-[14px] font-bold text-[#1C1B1B]">Account Management</h3>
              <div className="flex flex-col">
                <MenuItem icon={<LockIcon />} label="Change Password" />
                <MenuItem 
                  icon={<PhoneIcon />} 
                  label="Dark Theme" 
                  hasToggle={true} 
                  isToggleOn={isDarkTheme} 
                  onToggle={() => setIsDarkTheme(!isDarkTheme)} 
                />
              </div>
            </div> */}

          </div>
        </div>
      </>
  )
}