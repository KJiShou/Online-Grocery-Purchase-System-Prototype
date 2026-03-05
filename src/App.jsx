import { Navigate, Routes, Route } from 'react-router-dom'
import CartPage from './pages/CartPage'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/HomePage'
import PlaceholderPage from './pages/PlaceholderPage'
import PaymentPage from './pages/PaymentPage'
import SelectPaymentPage from './pages/SelectPaymentPage'
import SelectVoucherPage from './pages/SelectVoucherPage'
import CategoryPage from './pages/CategoryPage'
import GroceryListPage from './pages/GroceryListPage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/categories" element={<CategoryPage title="Categories Page" />} />
        <Route path="/grocery-list" element={<GroceryListPage title="Grocery List Page" />} />
        <Route path="/cart" element={<CartPage title="" />} />
        <Route path="/wishlist" element={<PlaceholderPage title="Wishlist Page" />} />
        <Route path="/profile" element={<PlaceholderPage title="Profile Page" />} />
        <Route path="/payment" element={<PaymentPage title="" />} />
        <Route path="/select-payment" element={<SelectPaymentPage title=""/>} />
        <Route path="/select-voucher" element={<SelectVoucherPage title=""/>} />
      </Route>
    </Routes>
  )
}

export default App
