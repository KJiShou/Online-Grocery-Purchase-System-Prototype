import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/navigation/BottomNav'

// --- 顶部状态栏图标 (转为白色) ---
function StatusIconsWhite() {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 20 14" className="h-[14px] w-[20px]" fill="none">
        <rect x="1" y="9" width="4" height="4" rx="1.1" fill="#FFFFFF" />
        <rect x="6" y="6.5" width="4" height="6.5" rx="1.1" fill="#FFFFFF" />
        <rect x="11" y="3.5" width="4" height="9.5" rx="1.1" fill="#FFFFFF" />
        <rect x="16" y="1" width="3" height="12" rx="1" fill="#FFFFFF" />
      </svg>
      <svg viewBox="0 0 18 14" className="h-[14px] w-[18px]" fill="none">
        <path d="M1 5.5C5.9 0.8 12.1 0.8 17 5.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 8.5C7.1 5.6 10.9 5.6 14 8.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="9" cy="11.5" r="1.6" fill="#FFFFFF" />
      </svg>
      <svg viewBox="0 0 26 14" className="h-[14px] w-[26px]" fill="none">
        <rect x="1" y="1" width="21" height="12" rx="3" stroke="#FFFFFF" strokeWidth="2" />
        <rect x="23.5" y="4.5" width="1.8" height="5" rx="0.9" fill="#FFFFFF" />
        <rect x="3.5" y="3.5" width="16" height="7" rx="1.6" fill="#FFFFFF" />
      </svg>
    </div>
  )
}

// --- 菜单所用到的各种 SVG 图标 ---
function LogoutIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.2535 20.4933C23.0002 20.4933 22.7468 20.3999 22.5468 20.1999C22.1602 19.8133 22.1602 19.1733 22.5468 18.7866L25.2535 16.0799L22.5468 13.3733C22.1602 12.9866 22.1602 12.3466 22.5468 11.9599C22.9335 11.5733 23.5735 11.5733 23.9602 11.9599L27.3735 15.3733C27.7602 15.7599 27.7602 16.3999 27.3735 16.7866L23.9602 20.1999C23.7602 20.3999 23.5068 20.4933 23.2535 20.4933Z" fill="#EE4D4D"/>
    <path d="M26.5732 17.0801H13.0132C12.4665 17.0801 12.0132 16.6267 12.0132 16.0801C12.0132 15.5334 12.4665 15.0801 13.0132 15.0801H26.5732C27.1199 15.0801 27.5732 15.5334 27.5732 16.0801C27.5732 16.6267 27.1199 17.0801 26.5732 17.0801Z" fill="#EE4D4D"/>
    <path d="M15.6799 27.6668C8.81318 27.6668 4.01318 22.8668 4.01318 16.0002C4.01318 9.1335 8.81318 4.3335 15.6799 4.3335C16.2265 4.3335 16.6799 4.78683 16.6799 5.3335C16.6799 5.88016 16.2265 6.3335 15.6799 6.3335C9.98652 6.3335 6.01318 10.3068 6.01318 16.0002C6.01318 21.6935 9.98652 25.6668 15.6799 25.6668C16.2265 25.6668 16.6799 26.1202 16.6799 26.6668C16.6799 27.2135 16.2265 27.6668 15.6799 27.6668Z" fill="#EE4D4D"/>
    </svg>
  )
}

function BoxIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  )
}

function CardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  )
}

function ReceiptIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <circle cx="12" cy="17" r="1" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  const [currentTime, setCurrentTime] = useState(formatCurrentTime())
  
  // 记录 Dark Theme 的开关状态
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatCurrentTime())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f4f4f5]">
      <section className="relative h-screen w-full overflow-hidden bg-white max-[420px]:mx-auto max-[420px]:h-[min(800px,100dvh)] max-[420px]:w-[min(360px,100vw)] max-[420px]:rounded-[24px] max-[420px]:border max-[420px]:border-[#d4d4d8] max-[420px]:shadow-[0_12px_36px_rgba(0,0,0,0.12)]">
        
        {/* === 顶部绿色背景层 === */}
        <div className="absolute inset-x-0 top-0 z-0 h-[190px] w-full bg-[#4CBF35]"></div>

        {/* === 顶部 Header 内容区 === */}
        <div className="absolute inset-x-0 top-0 z-10 pb-3 pt-4">
          <div className="mx-auto w-full max-w-[360px] px-5">
            {/* 状态栏 (白色文字) */}
            <div className="mb-6 flex items-center justify-between text-[15px] font-medium tracking-[-0.24px] text-white">
              <span className="leading-5">{currentTime}</span>
              <StatusIconsWhite />
            </div>

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
          </div>
        </div>

        {/* === 中间白色滚动卡片区 (覆盖在绿色背景之上) === */}
        {/* top-[140px] 留出头部空间， rounded-t-[24px] 制作顶部圆角 */}
        <div className="hide-scrollbar absolute inset-x-0 bottom-[72px] top-[135px] z-20 overflow-y-auto rounded-t-[24px] bg-white">
          <div className="mx-auto w-full max-w-[360px] px-5 py-6">
            
            {/* --- Section 1: Personal Information --- */}
            <div className="mb-6">
              <h3 className="mb-2 text-[14px] font-bold text-[#1C1B1B]">Personal Information</h3>
              <div className="flex flex-col">
                <MenuItem icon={<BoxIcon />} label="Shipping Address" onClick={() => console.log('Shipping')} />
                <MenuItem icon={<CardIcon />} label="Payment Method" onClick={() => navigate('/select-payment')} />
                <MenuItem icon={<ReceiptIcon />} label="Order History" onClick={() => navigate('/order-history')} />
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

        {/* === 底部导航栏 === */}
        <BottomNav />
        
      </section>
    </div>
  )
}