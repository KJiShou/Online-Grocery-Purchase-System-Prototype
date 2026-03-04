import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from '../navigation/BottomNav'
import StatusBar from './StatusBar'

function MainLayout() {
  const location = useLocation()
  const isHomePage = location.pathname === '/home' || location.pathname === '/'
  const isPaymentPage = location.pathname === '/payment'
  const isSelectPaymentPage = location.pathname === '/select-payment'
  const isSelectVoucherPage = location.pathname === '/select-voucher'
  const pageBgClass = isHomePage ? 'bg-white' : 'bg-[#f4f4f5]'

  return (
    <div className={`min-h-screen w-full overflow-x-hidden ${pageBgClass}`}>
      <section className={`relative h-screen w-full overflow-hidden ${pageBgClass} max-[420px]:mx-auto max-[420px]:h-[min(800px,100dvh)] max-[420px]:w-[min(360px,100vw)] max-[420px]:rounded-[24px] max-[420px]:border max-[420px]:border-[#d4d4d8] max-[420px]:shadow-[0_12px_36px_rgba(0,0,0,0.12)]`}>
        <StatusBar />
        <Outlet />
        {!isPaymentPage && !isSelectPaymentPage && !isSelectVoucherPage && <BottomNav />}
      </section>
    </div>
  )
}

export default MainLayout
