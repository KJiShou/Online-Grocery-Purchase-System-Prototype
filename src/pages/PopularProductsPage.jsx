import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/navigation/BottomNav'
import { CloseIcon, SearchFieldIcon, SearchIcon } from '../components/Icons'
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

function ProductImagePlaceholder({ name }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#f4f4f5] to-[#e5e7eb] px-3 text-center">
      <span className="mb-2 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#42c236]">
        Add Image
      </span>
      <span className="text-[13px] font-semibold leading-[1.4] text-[#1f2937]">{name}</span>
    </div>
  )
}

export default function PopularProductsPage() {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(formatCurrentTime())
  const [sortBy, setSortBy] = useState('bestMatch')
  const [priceDirection, setPriceDirection] = useState('asc')
  const [likedProducts, setLikedProducts] = useState(() => loadWishlistIds())
  const [searchText, setSearchText] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState(['Milk', 'Bread', 'Egg', 'Rice', 'Oil', 'Sugar'])
  const deferredSearchText = useDeferredValue(searchText)
  const searchInputRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(formatCurrentTime()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus()
    }
  }, [searchOpen])

  const runSearch = (inputText = searchText) => {
    const term = inputText.trim()
    if (!term) return

    setSearchText(term)
    setRecentSearches((current) => [term, ...current.filter((item) => item.toLowerCase() !== term.toLowerCase())].slice(0, 8))
    setSearchOpen(false)
  }

  const closeSearch = () => {
    setSearchOpen(false)
  }

  const displayProducts = useMemo(() => {
    const term = deferredSearchText.trim().toLowerCase()
    const items = products.filter((product) => {
      if (!term) return true
      return (
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      )
    })

    if (sortBy !== 'price') return items
    return items.sort((a, b) => (priceDirection === 'asc' ? a.price - b.price : b.price - a.price))
  }, [deferredSearchText, sortBy, priceDirection])

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
              <div className="flex flex-1 items-center justify-between gap-2">
                <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[1.2] text-black">
                  Popular Products
                </h1>
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-[#1f2937] transition hover:scale-110 hover:text-[#42c236]"
                  aria-label="Open search"
                >
                  <SearchIcon />
                </button>
              </div>
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
              {searchText.trim() ? <> for <b>"{searchText.trim()}"</b></> : null}
            </p>

            {displayProducts.length === 0 ? (
              <div className="flex h-[280px] items-center justify-center rounded-[20px] bg-white px-6 text-center shadow-sm">
                <p className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] font-medium leading-[22px] tracking-[0.005em] text-[#6F7384]">
                  No popular products match <b>"{searchText.trim()}"</b>.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {displayProducts.map((product, index) => {
                  const key = `${product.id}-${index}`
                  const isLiked = likedProducts.includes(product.id)
                  return (
                    <article
                      key={key}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="group transform rounded-xl bg-white p-2.5 shadow-sm transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="relative mb-2 h-32 overflow-hidden rounded-xl bg-gray-100">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <ProductImagePlaceholder name={product.name} />
                        )}
                        <button
                          onClick={(event) => {
                            event.stopPropagation()
                            setLikedProducts(toggleWishlistId(product.id))
                          }}
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
            )}
          </div>
        </div>

        {searchOpen ? (
          <div className="absolute inset-x-0 bottom-0 top-0 z-30 bg-white">
            <div className="mx-auto h-full w-full max-w-[360px]">
              <div className="bg-white px-5 pb-3 pt-4">
                <div className="mb-2 flex items-center justify-between text-[15px] font-normal tracking-[-0.24px] text-[#1C1B1B]">
                  <span className="leading-5">{currentTime}</span>
                  <StatusIcons />
                </div>

                <header className="flex items-center justify-between">
                  <h2 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[120%] text-black">
                    Search
                  </h2>
                  <button
                    onClick={closeSearch}
                    className="grid h-8 w-8 place-items-center text-[#1C1B1B]"
                    aria-label="Close search"
                  >
                    <CloseIcon />
                  </button>
                </header>
              </div>

              <div className="mt-4 flex flex-col items-center gap-4">
                <div className="relative flex h-[56px] w-[328px] items-center justify-between rounded-xl border border-[#F4F5FD] px-3 py-4">
                  <div className="flex min-w-0 flex-1 items-center gap-1">
                    <button
                      onClick={() => runSearch()}
                      className="grid h-8 w-8 place-items-center rounded-md hover:bg-[#f7f8fc]"
                      aria-label="Search"
                    >
                      <SearchFieldIcon />
                    </button>
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchText}
                      onChange={(event) => setSearchText(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          runSearch()
                        }
                      }}
                      placeholder="Search"
                      className="h-[18px] w-full border-none bg-transparent font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] font-normal leading-[18px] tracking-[0.005em] text-[#1C1B1B] outline-none placeholder:text-[#6F7384]"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <div className="px-4">
                    <h3 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[18px] font-bold leading-[23px] tracking-[0.0025em] text-[#1C1B1B]">
                      RECENT SEARCH
                    </h3>
                  </div>

                  <div className="mt-1 flex flex-col">
                    {recentSearches.map((item) => (
                      <button
                        key={item}
                        onClick={() => runSearch(item)}
                        className="flex h-12 w-full items-end justify-between border-b border-[#F4F5FD] bg-white px-4 pb-1 text-left"
                      >
                        <span className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] font-medium leading-[150%] tracking-[0.005em] text-[#1C1B1B]">
                          {item}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <BottomNav />
      </section>
    </div>
  )
}
