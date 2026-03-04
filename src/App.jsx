import { Navigate, Routes, Route } from 'react-router-dom'
import CartPage from './pages/CartPage'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/HomePage'
import PlaceholderPage from './pages/PlaceholderPage'
import PaymentPage from './pages/PaymentPage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/categories" element={<PlaceholderPage title="Categories Page" />} />
        <Route path="/cart" element={<CartPage title="" />} />
        <Route path="/wishlist" element={<PlaceholderPage title="Wishlist Page" />} />
        <Route path="/profile" element={<PlaceholderPage title="Profile Page" />} />
        <Route path="/payment" element={<PaymentPage title="" />} />
      </Route>
    </Routes>
  )
}

export default App
