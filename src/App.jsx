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
import PopularProductsPage from './pages/PopularProductsPage'
import SelectAddressPage from './pages/SelectAddressPage'
import WishlistPage from './pages/WishlistPage'
import NewAddressPage from './pages/NewAddressPage'
import AddressDetailsPage from './pages/AddressDetailsPage'
import EditAddressPage from './pages/EditAddressPage'
import OrderPlacedPage from './pages/OrderPlacedPage'
import ProfilePage from './pages/ProfilePage'
import OrderHistoryPage from './pages/OrderHistoryPage'
import ProductDetailPage from './pages/ProductDetailsPage'
import OrderDetailPage from './pages/OrderDetailPage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/categories" element={<CategoryPage title="Categories Page" />} />
        <Route path="/grocery-list" element={<GroceryListPage title="Grocery List Page" />} />
        <Route path="/popular-products" element={<PopularProductsPage />} />
        <Route path="/cart" element={<CartPage title="" />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/profile" element={<ProfilePage title="" />} />
        <Route path="/payment" element={<PaymentPage title="" />} />
        <Route path="/order-placed" element={<OrderPlacedPage title="" />} />
        <Route path="/select-payment" element={<SelectPaymentPage title=""/>} />
        <Route path="/select-voucher" element={<SelectVoucherPage title=""/>} />
        <Route path="/select-address" element={<SelectAddressPage title=""/>} />
        <Route path="/new-address" element={<NewAddressPage title=""/>} />
        <Route path="/edit-address" element={<EditAddressPage title=""/>} />
        <Route path="/address-details" element={<AddressDetailsPage title=""/>} />
        <Route path="/order-history" element={<OrderHistoryPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/order-detail/:orderId" element={<OrderDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App
