import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from '../navigation/BottomNav'
import StatusBar from './StatusBar'

function MainLayout() {
  const location = useLocation()
  const isCartPage = location.pathname === '/cart'
  const isPaymentPage = location.pathname === '/payment'
  const pageBgClass = 'bg-[#f4f4f5]'
  const isSelectPaymentPage = location.pathname === '/select-payment'
  const isSelectVoucherPage = location.pathname === '/select-voucher'
  const isSelectAddressPage = location.pathname === '/select-address'
  const isNewAddressPage = location.pathname === '/new-address'
  const isEditAddressPage = location.pathname === '/edit-address'
  const isAddressDetailsPage = location.pathname === '/address-details'
  const isOrderHistoryPage = location.pathname === '/order-history'
  const isOrderDetailPage = location.pathname.startsWith('/order-detail')
  const isProductDetailPage = location.pathname.startsWith('/product/')
  const isGroceryListPage = location.pathname === '/grocery-list'

  return (
    <div className={`min-h-screen w-full overflow-x-hidden ${pageBgClass}`}>
      <section className={`relative h-screen w-full overflow-hidden ${pageBgClass} max-[420px]:mx-auto max-[420px]:h-[min(800px,100dvh)] max-[420px]:w-[min(360px,100vw)] max-[420px]:rounded-[24px] max-[420px]:border max-[420px]:border-[#d4d4d8] max-[420px]:shadow-[0_12px_36px_rgba(0,0,0,0.12)]`}>
        <StatusBar />
        <Outlet />
        {!isCartPage && !isOrderDetailPage && !isOrderHistoryPage && !isPaymentPage && !isSelectPaymentPage && !isSelectVoucherPage && !isSelectAddressPage && !isNewAddressPage && !isEditAddressPage && !isAddressDetailsPage && !isProductDetailPage && !isGroceryListPage && <BottomNav />}
      </section>
    </div>
  )
}

export default MainLayout

