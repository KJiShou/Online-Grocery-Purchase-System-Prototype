import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@arco-design/web-react/dist/css/arco.css'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { OrderProvider } from './contexts/OrderContext.jsx'
import { PreferenceProvider } from './contexts/PreferenceContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <CartProvider>
      <OrderProvider>
        <PreferenceProvider>
      <App />
        </PreferenceProvider>
      </OrderProvider>
    </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
