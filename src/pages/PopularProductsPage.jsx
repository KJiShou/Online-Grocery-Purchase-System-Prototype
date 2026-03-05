import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/navigation/BottomNav'
import { products } from '../data/homeData'
import { loadWishlistIds, toggleWishlistId } from '../utils/wishlist'

function formatCurrentTime() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

function formatPrice(value) {
  return `RM${value.toFixed(2)}`
}

function StatusIcons() {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 20 14" className="h-[14px] w-[20px]" fill="none" aria-hidden="true">
        <rect x="1" y="9" width="4" height="4" rx="1.1" fill="#1C1B1B" />
        <rect x="6" y="6.5" width="4" height="6.5" rx="1.1" fill="#1C1B1B" />
        <rect x="11" y="3.5" width="4" height="9.5" rx="1.1" fill="#1C1B1B" />
        <rect x="16" y="1" width="3" height="12" rx="1" fill="#1C1B1B" />
      </svg>

      <svg viewBox="0 0 18 14" className="h-[14px] w-[18px]" fill="none" aria-hidden="true">
        <path d="M1 5.5C5.9 0.8 12.1 0.8 17 5.5" stroke="#1C1B1B" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 8.5C7.1 5.6 10.9 5.6 14 8.5" stroke="#1C1B1B" strokeWidth="2" strokeLinecap="round" />
        <circle cx="9" cy="11.5" r="1.6" fill="#1C1B1B" />
      </svg>

      <svg viewBox="0 0 26 14" className="h-[14px] w-[26px]" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="21" height="12" rx="3" stroke="#B3B3B3" strokeWidth="2" />
        <rect x="23.5" y="4.5" width="1.8" height="5" rx="0.9" fill="#D9D9D9" />
        <rect x="3.5" y="3.5" width="16" height="7" rx="1.6" fill="#1C1B1B" />
      </svg>
    </div>
  )
}

function BackIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12.7599 25.0935C12.5066 25.0935 12.2533 25.0002 12.0533 24.8002L3.95992 16.7068C3.57326 16.3202 3.57326 15.6802 3.95992 15.2935L12.0533 7.20016C12.4399 6.81349 13.0799 6.81349 13.4666 7.20016C13.8533 7.58682 13.8533 8.22682 13.4666 8.61349L6.07992 16.0002L13.4666 23.3868C13.8533 23.7735 13.8533 24.4135 13.4666 24.8002C13.2799 25.0002 13.0133 25.0935 12.7599 25.0935Z" fill="#1C1B1B" />
      <path d="M27.3336 17H4.89355C4.34689 17 3.89355 16.5467 3.89355 16C3.89355 15.4533 4.34689 15 4.89355 15H27.3336C27.8802 15 28.3336 15.4533 28.3336 16C28.3336 16.5467 27.8802 17 27.3336 17Z" fill="#1C1B1B" />
    </svg>
  )
}

function HeartIcon({ filled = false }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20.8 8.6c0 5.5-8.8 11.1-8.8 11.1S3.2 14.1 3.2 8.6a5 5 0 0 1 8.8-3.2A5 5 0 0 1 20.8 8.6z"></path>
    </svg>
  )
}

export default function PopularProductsPage() {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(formatCurrentTime())
  const [sortBy, setSortBy] = useState('bestMatch')
  const [priceDirection, setPriceDirection] = useState('asc')
  const [likedProducts, setLikedProducts] = useState(() => loadWishlistIds())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(formatCurrentTime()), 1000)
    return () => clearInterval(timer)
  }, [])

  const displayProducts = useMemo(() => {
    const items = [...products, ...products]
    if (sortBy !== 'price') return items
    return items.sort((a, b) => (priceDirection === 'asc' ? a.price - b.price : b.price - a.price))
  }, [sortBy, priceDirection])

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f4f4f5]">
      <section className="relative h-screen w-full overflow-hidden bg-[#f4f4f5] max-[420px]:mx-auto max-[420px]:h-[min(800px,100dvh)] max-[420px]:w-[min(360px,100vw)] max-[420px]:rounded-[24px] max-[420px]:border max-[420px]:border-[#d4d4d8] max-[420px]:shadow-[0_12px_36px_rgba(0,0,0,0.12)]">
        <div className="absolute inset-x-0 top-0 z-20 bg-white pb-3 pt-4">
          <div className="mx-auto w-full max-w-[360px] px-5">
            <div className="mb-2 flex items-center justify-between text-[15px] font-normal tracking-[-0.24px] text-[#1C1B1B]">
              <span className="leading-5">{currentTime}</span>
              <StatusIcons />
            </div>

            <header className="flex items-center gap-2">
              <button onClick={() => navigate('/home')} className="text-[#1f2937] transition hover:scale-110 hover:text-[#42c236]" aria-label="Back to home">
                <BackIcon />
              </button>
              <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[1.2] text-black">
                Popular Products
              </h1>
            </header>
          </div>
        </div>

        <div className="absolute inset-x-0 top-[87px] z-20 bg-white pb-2 pt-2">
          <div className="mx-auto w-full max-w-[360px] px-5">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSortBy('bestMatch')}
                className={`flex-1 rounded-[12px] px-4 py-2 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] font-semibold leading-[18px] transition ${
                  sortBy === 'bestMatch' ? 'bg-[#1C1B1B] text-white' : 'bg-white text-[#1C1B1B]'
                }`}
              >
                Best Match
              </button>
              <button
                onClick={() => {
                  if (sortBy === 'price') {
                    setPriceDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
                  } else {
                    setSortBy('price')
                  }
                }}
                className={`flex-1 rounded-[12px] px-4 py-2 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] font-semibold leading-[18px] transition ${
                  sortBy === 'price' ? 'bg-[#1C1B1B] text-white' : 'bg-white text-[#1C1B1B]'
                }`}
              >
                Price {sortBy === 'price' ? (priceDirection === 'asc' ? '↑' : '↓') : ''}
              </button>
            </div>
          </div>
        </div>

        <div className="hide-scrollbar absolute inset-x-0 bottom-[86px] top-[130px] overflow-y-auto pb-6">
          <div className="mx-auto w-full max-w-[360px] px-5 pt-4">
            <p className="mb-4 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] font-medium leading-[18px] tracking-[0.005em] text-[#6F7384]">
              Showing <b>{displayProducts.length}</b> popular products
            </p>

            <div className="grid grid-cols-2 gap-4">
              {displayProducts.map((product, index) => {
                const key = `${product.id}-${index}`
                const isLiked = likedProducts.includes(product.id)
                return (
                  <article
                    key={key}
                    className="group transform rounded-xl bg-white p-2.5 shadow-sm transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="relative mb-2 h-32 overflow-hidden rounded-xl bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <button
                        onClick={() => setLikedProducts(toggleWishlistId(product.id))}
                        className="absolute right-2 top-2 grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-black/50 text-white transition hover:scale-110 hover:bg-[#42c236]"
                        aria-label={`Toggle wishlist for ${product.name}`}
                      >
                        <HeartIcon filled={isLiked} />
                      </button>
                    </div>
                    <p className="mb-1 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] font-medium leading-[150%] tracking-[0.005em] text-[#1C1B1B]">
                      {product.name}
                    </p>
                    <p className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[15px] font-semibold leading-[19px] tracking-[0.005em] text-[#1C1B1B]">
                      {formatPrice(product.price)}
                    </p>
                    {product.oldPrice ? (
                      <p className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[10px] leading-[13px] tracking-[0.015em] text-[#EF4444] line-through">
                        {formatPrice(product.oldPrice)}
                      </p>
                    ) : null}
                  </article>
                )
              })}
            </div>
          </div>
        </div>

        <BottomNav />
      </section>
    </div>
  )
}
