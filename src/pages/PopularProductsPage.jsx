import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/navigation/BottomNav'
import { products, productCategories } from '../data/homeData'
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

const categories = productCategories.map((category) => category.label)

export default function PopularProductsPage() {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(formatCurrentTime())
  const [sortBy, setSortBy] = useState('bestMatch')
  const [priceDirection, setPriceDirection] = useState('asc')
  const [likedProducts, setLikedProducts] = useState(() => loadWishlistIds())
  const [filterOpen, setFilterOpen] = useState(false)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [categorySearch, setCategorySearch] = useState('')
  const [activeMinPrice, setActiveMinPrice] = useState('')
  const [activeMaxPrice, setActiveMaxPrice] = useState('')
  const [activeCategories, setActiveCategories] = useState([])

  const categoryLabelToId = new Map(productCategories.map((category) => [category.label, category.id]))

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(formatCurrentTime()), 1000)
    return () => clearInterval(timer)
  }, [])

  const displayProducts = useMemo(() => {
    const items = products
      .filter((product) => {
        const min = activeMinPrice ? parseFloat(activeMinPrice) : null
        const max = activeMaxPrice ? parseFloat(activeMaxPrice) : null
        const productPrice = product.price ?? 0

        if (min !== null && productPrice < min) return false
        if (max !== null && productPrice > max) return false

        if (activeCategories.length > 0) {
          const activeCategoryIds = activeCategories
            .map((label) => categoryLabelToId.get(label))
            .filter(Boolean)

          if (!activeCategoryIds.includes(product.categoryId)) {
            return false
          }
        }

        return true
      })

    return items.sort((a, b) => {
      if (sortBy === 'price') {
        return priceDirection === 'asc' ? a.price - b.price : b.price - a.price
      }
      return 0
    })
  }, [activeCategories, activeMaxPrice, activeMinPrice, categoryLabelToId, priceDirection, sortBy])

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f4f4f5]">
      <section className="relative h-screen w-full overflow-hidden bg-[#f4f4f5] max-[420px]:mx-auto max-[420px]:h-[min(800px,100dvh)] max-[420px]:w-[min(360px,100vw)] max-[420px]:rounded-[24px] max-[420px]:border max-[420px]:border-[#d4d4d8] max-[420px]:shadow-[0_12px_36px_rgba(0,0,0,0.12)]">
        <div className="absolute inset-x-0 top-0 z-20 bg-white pb-3 pt-4">
          <div className="mx-auto w-full max-w-[360px] px-5">
            <div className="mb-2 flex items-center justify-between text-[15px] font-normal tracking-[-0.24px] text-[#1C1B1B]">
              <span className="leading-5">{currentTime}</span>
              <StatusIcons />
            </div>

            <header className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <button onClick={() => navigate('/home')} className="shrink-0 text-[#1f2937] transition hover:scale-110 hover:text-[#42c236]" aria-label="Back to home">
                  <BackIcon />
                </button>
                <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[1.2] text-black">
                  Popular Products
                </h1>
              </div>
              <button onClick={() => setFilterOpen(true)} className="shrink-0 text-[#1f2937] transition hover:scale-110 hover:text-[#42c236]" aria-label="Open filter">
                <img src="/src/assets/grocery-list/filter-toggle.png" alt="Filter" className="h-6 w-6" />
              </button>
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
                className={`flex flex-1 items-center justify-center gap-2 rounded-[12px] px-4 py-2 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] font-semibold leading-[18px] transition ${
                  sortBy === 'price' ? 'bg-[#1C1B1B] text-white' : 'bg-white text-[#1C1B1B]'
                }`}
              >
                <span>Price</span>
                <img
                  src={
                    sortBy === 'price'
                      ? priceDirection === 'asc'
                        ? '/src/assets/grocery-list/arrow-up-white.png'
                        : '/src/assets/grocery-list/arrow-down-white.png'
                      : priceDirection === 'asc'
                        ? '/src/assets/grocery-list/arrow-up-dark.png'
                        : '/src/assets/grocery-list/arrow-down-dark.png'
                  }
                  alt="Sort arrow"
                  className="h-5 w-5"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="hide-scrollbar absolute inset-x-0 bottom-[86px] top-[130px] overflow-y-auto pb-6">
          <div className="mx-auto w-full max-w-[360px] px-5 pt-4">
            <p className="mb-2 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] font-medium leading-[18px] tracking-[0.005em] text-[#6F7384]">
              Showing <b>{displayProducts.length}</b> popular products
            </p>
            {(activeMinPrice || activeMaxPrice || activeCategories.length > 0) && (
              <p className="mb-4 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[12px] font-normal leading-[16px] tracking-[0.005em] text-[#6F7384]">
                Filters are applied.
              </p>
            )}

            {displayProducts.length === 0 ? (
              <div className="flex h-[280px] items-center justify-center rounded-[20px] bg-white px-6 text-center shadow-sm">
                <p className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] font-medium leading-[22px] tracking-[0.005em] text-[#6F7384]">
                  No products found. Try another filter?
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

        {filterOpen ? (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30" onClick={() => setFilterOpen(false)}>
            <div className="mx-4 w-full max-w-[360px] rounded-[12px] bg-white" onClick={(event) => event.stopPropagation()}>
              <div className="p-5 pb-0">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[20px] font-bold leading-[25px] text-[#1C1B1B]">
                    Filter Products
                  </h2>
                  <button onClick={() => setFilterOpen(false)} className="text-[#6F7384] transition hover:text-[#1C1B1B]">
                    <img src="/src/assets/grocery-list/close.png" alt="Close" className="h-6 w-6" />
                  </button>
                </div>

                <div className="mb-4 rounded-[12px] border border-[#F4F5FD] p-4">
                  <h3 className="mb-3 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[16px] font-semibold leading-[20px] text-[#1C1B1B]">
                    Price Range
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] font-medium text-[#1C1B1B]">
                      From RM
                    </span>
                    <input
                      type="text"
                      value={minPrice}
                      onChange={(event) => {
                        const value = event.target.value
                        if (value === '' || /^\d+\.?\d{0,2}$/.test(value)) {
                          setMinPrice(value)
                        }
                      }}
                      placeholder="min"
                      className="w-16 rounded-[12px] border border-[#E4E4E7] bg-[#F9FAFB] px-2 py-1 text-center font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[12px] placeholder:text-center placeholder:text-black/50"
                    />
                    <span className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] font-medium text-[#1C1B1B]">
                      to RM
                    </span>
                    <input
                      type="text"
                      value={maxPrice}
                      onChange={(event) => {
                        const value = event.target.value
                        if (value === '' || /^\d+\.?\d{0,2}$/.test(value)) {
                          setMaxPrice(value)
                        }
                      }}
                      placeholder="max"
                      className="w-16 rounded-[12px] border border-[#E4E4E7] bg-[#F9FAFB] px-2 py-1 text-center font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[12px] placeholder:text-center placeholder:text-black/50"
                    />
                  </div>
                </div>

                <div className="mb-5 rounded-[12px] border border-[#F4F5FD] p-4">
                  <h3 className="mb-3 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[16px] font-semibold leading-[20px] text-[#1C1B1B]">
                    Category
                  </h3>
                  <div className="mb-3 text-[14px] font-medium text-[#1C1B1B]">
                    {selectedCategories.length > 0 ? selectedCategories.join(', ') : 'No category selected'}
                  </div>

                  <input
                    type="text"
                    value={categorySearch}
                    onChange={(event) => setCategorySearch(event.target.value)}
                    placeholder="Search Category..."
                    className="mb-3 w-full rounded-[12px] border border-[#E4E4E7] bg-[#F9FAFB] px-3 py-2.5 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] placeholder:text-black/50"
                  />

                  <div className="max-h-[200px] overflow-y-auto rounded-[12px] border border-[#E4E4E7] bg-white">
                    {categories
                      .filter((category) => category.toLowerCase().includes(categorySearch.toLowerCase()))
                      .map((category) => (
                        <label
                          key={category}
                          className="flex cursor-pointer items-center gap-2 border-b border-[#F4F5FD] px-3 py-2.5 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] text-[#1C1B1B] last:border-b-0 hover:bg-[#F9FAFB]"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={(event) => {
                              if (event.target.checked) {
                                setSelectedCategories([...selectedCategories, category])
                              } else {
                                setSelectedCategories(selectedCategories.filter((item) => item !== category))
                              }
                            }}
                            className="h-4 w-4 cursor-pointer"
                          />
                          {category}
                        </label>
                      ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#F4F5FD] px-5 py-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setMinPrice('')
                      setMaxPrice('')
                      setSelectedCategories([])
                      setCategorySearch('')
                      setActiveMinPrice('')
                      setActiveMaxPrice('')
                      setActiveCategories([])
                      setFilterOpen(false)
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-[12px] border border-[#E4E4E7] px-4 py-2.5 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] font-semibold text-[#1C1B1B] transition hover:bg-[#F9FAFB]"
                  >
                    <img src="/src/assets/grocery-list/reset.png" alt="Reset" className="h-4 w-4" />
                    Reset
                  </button>
                  <button
                    onClick={() => {
                      setActiveMinPrice(minPrice)
                      setActiveMaxPrice(maxPrice)
                      setActiveCategories(selectedCategories)
                      setFilterOpen(false)
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-[12px] bg-[#1C1B1B] px-4 py-2.5 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] font-semibold text-white transition hover:bg-[#333]"
                  >
                    <img src="/src/assets/grocery-list/filter-apply.png" alt="Apply" className="h-4 w-4" />
                    Apply
                  </button>
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
