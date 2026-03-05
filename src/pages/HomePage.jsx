import { Carousel } from '@arco-design/web-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { bannerItems, categories, products } from '../data/homeData'
import { loadWishlistIds, saveWishlistIds, toggleWishlistId } from '../utils/wishlist'
import { Navigate, useNavigate } from 'react-router-dom'

function formatPrice(value) {
  return `RM${value.toFixed(2)}`
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#1f2937]" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 6 18 18"></path>
      <path d="M18 6 6 18"></path>
    </svg>
  )
}

function SearchFieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#6f7384]" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#6f7384]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M3 6h18"></path>
      <path d="M3 12h18"></path>
      <path d="M3 18h18"></path>
      <circle cx="9" cy="6" r="2.2" fill="#f4f4f5"></circle>
      <circle cx="15" cy="12" r="2.2" fill="#f4f4f5"></circle>
      <circle cx="11" cy="18" r="2.2" fill="#f4f4f5"></circle>
    </svg>
  )
}

function RecentArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#c0c0c0]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 6 12 12"></path>
      <path d="M9.5 18H18V9.5"></path>
    </svg>
  )
}

function HeartIcon({ filled = false }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M20.8 8.6c0 5.5-8.8 11.1-8.8 11.1S3.2 14.1 3.2 8.6a5 5 0 0 1 8.8-3.2A5 5 0 0 1 20.8 8.6z"></path>
    </svg>
  )
}

function StatusIcons() {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 20 14" className="h-[14px] w-[20px]" fill="none">
        <rect x="1" y="9" width="4" height="4" rx="1.1" fill="#1C1B1B" />
        <rect x="6" y="6.5" width="4" height="6.5" rx="1.1" fill="#1C1B1B" />
        <rect x="11" y="3.5" width="4" height="9.5" rx="1.1" fill="#1C1B1B" />
        <rect x="16" y="1" width="3" height="12" rx="1" fill="#1C1B1B" />
      </svg>

      <svg viewBox="0 0 18 14" className="h-[14px] w-[18px]" fill="none">
        <path d="M1 5.5C5.9 0.8 12.1 0.8 17 5.5" stroke="#1C1B1B" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 8.5C7.1 5.6 10.9 5.6 14 8.5" stroke="#1C1B1B" strokeWidth="2" strokeLinecap="round" />
        <circle cx="9" cy="11.5" r="1.6" fill="#1C1B1B" />
      </svg>

      <svg viewBox="0 0 26 14" className="h-[14px] w-[26px]" fill="none">
        <rect x="1" y="1" width="21" height="12" rx="3" stroke="#B3B3B3" strokeWidth="2" />
        <rect x="23.5" y="4.5" width="1.8" height="5" rx="0.9" fill="#D9D9D9" />
        <rect x="3.5" y="3.5" width="16" height="7" rx="1.6" fill="#1C1B1B" />
      </svg>
    </div>
  )
}


function CategoryIcon({ type }) {
  if (type === 'fresh') {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#2f9e44]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20c5-1.4 8-4.6 8-9.5C17 10.2 14.8 11 12 13c-2.8-2-5-2.8-8-2.5 0 4.9 3 8.1 8 9.5Z"></path>
        <path d="M12 13V4"></path>
      </svg>
    )
  }

  if (type === 'packaged') {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#a16207]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 8.5 12 4l8 4.5V18a1.8 1.8 0 0 1-1.8 1.8H5.8A1.8 1.8 0 0 1 4 18V8.5Z"></path>
        <path d="M12 4v15.8"></path>
        <path d="m4 8.5 8 4.5 8-4.5"></path>
      </svg>
    )
  }

  if (type === 'dairy') {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#0284c7]" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M8 6h8l1 3v9.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 18.5V9l1-3Z"></path>
        <path d="M9 6V4h6v2"></path>
        <path d="M10 13h4"></path>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#ea580c]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4.5 18.5V10.8a1.8 1.8 0 0 1 .5-1.2l4-4.1 4 4.1a1.8 1.8 0 0 1 .5 1.2v7.7"></path>
      <path d="M14.5 18.5V8.8a1.8 1.8 0 0 1 .5-1.2l4-4.1 0 15"></path>
      <circle cx="7.8" cy="13.2" r="0.8" fill="currentColor"></circle>
      <circle cx="10.8" cy="14.8" r="0.8" fill="currentColor"></circle>
      <circle cx="18.2" cy="11.5" r="0.8" fill="currentColor"></circle>
    </svg>
  )
}

function HomePage() {
  const navigate = useNavigate()
  const [likedProducts, setLikedProducts] = useState(() => {
    const stored = loadWishlistIds()
    if (stored.length > 0) return stored
    const defaultIds = ['dutch-lady']
    saveWishlistIds(defaultIds)
    return defaultIds
  })
  const navigate = useNavigate()
  const [activeBannerIndex, setActiveBannerIndex] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState(['Milk', 'Oil', 'Broccoli', 'Orange', 'Apple', 'Sugar'])
  const searchInputRef = useRef(null)

  const displayProducts = [...products, ...products]

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus()
    }
  }, [searchOpen])

  const runSearch = (inputText = searchText) => {
    const term = inputText.trim()
    if (!term) return

    if (term.toLowerCase() === 'sugar') {
      setSearchOpen(false)
      setFilterMenuOpen(false)
      navigate('/grocery-list')
      return
    }

    setRecentSearches((current) => [term, ...current.filter((item) => item.toLowerCase() !== term.toLowerCase())].slice(0, 8))
    setFilterMenuOpen(false)
  }

  const closeSearch = () => {
    setSearchOpen(false)
    setFilterMenuOpen(false)
  }

  return (
    <>
      <div className="absolute inset-x-0 top-[44px] z-20 bg-white pb-3">
        <div className="mx-auto w-full max-w-[360px] px-5">
          <header className="flex items-center justify-between">
            <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[1.2] text-black">
              Home Page
            </h1>
            <button
              onClick={() => setSearchOpen(true)}
              className="text-[#1f2937] transition hover:scale-110 hover:text-[#42c236]"
              aria-label="Open search"
            >
              <SearchIcon />
            </button>
          </header>
        </div>
      </div>

      <div className="hide-scrollbar absolute inset-x-0 bottom-[86px] top-[100px] overflow-y-auto pb-6">
        <div className="mx-auto w-full max-w-[360px] px-5">
          <section className="home-carousel relative mb-6 h-[155px] overflow-hidden rounded-[26px]">
            <Carousel
              autoPlay
              animation="slide"
              indicatorType="never"
              showArrow="hover"
              trigger="click"
              onChange={setActiveBannerIndex}
            >
              {bannerItems.map((item) => (
                <div key={item.id} className="relative h-[155px] w-full">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent"></div>
                  <div className="absolute left-4 top-4 rounded-lg bg-black/70 px-[6px] py-[6px] text-[10px] font-semibold leading-[13px] tracking-[0.015em] text-white">
                    {item.discount}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] font-normal leading-[18px] tracking-[0.005em]">
                      {item.title}
                    </p>
                    <p className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[15px] font-bold leading-[18px]">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </Carousel>
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1 rounded-full bg-white px-2 py-1">
              {bannerItems.map((item, index) => (
                <span
                  key={item.id}
                  className={`h-2.5 w-2.5 rounded-full ${activeBannerIndex === index ? 'bg-[#42c236]' : 'bg-[#d4d4d8]'}`}
                ></span>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-[#1f2937]">Categories</h2>
              <button className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[15px] font-semibold leading-[19px] tracking-[0.005em] text-[#42c236] transition hover:scale-105 hover:text-[#2f9e44]">
                SEE ALL
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="h-[86px] rounded-2xl border border-[#e4e4e7] bg-white px-2 py-2 text-center transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                >
                  <span className="mb-1 grid place-items-center">
                    <CategoryIcon type={category.id} />
                  </span>
                  <span className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] block text-[10px] font-semibold leading-[13px] tracking-[0.015em] text-[#1C1B1B]">
                    {category.label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-[#1f2937]">Popular Products</h2>
              <button className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[15px] font-semibold leading-[19px] tracking-[0.005em] text-[#42c236] transition hover:scale-105 hover:text-[#2f9e44]">
                SEE ALL
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {displayProducts.map((product, index) => {
                const isLiked = likedProducts.includes(product.id)

                return (
                  <article 
                  onClick={() => navigate(`/product/${product.id}`)}
                  key={`${product.id}-${index}`} 
                  className="rounded-xl bg-[#c8e8c5] p-2.5">
                    <div className="relative mb-2 h-32 overflow-hidden rounded-xl bg-[#d7f0d4]">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // 严厉警告：必须加上这一行，否则点击爱心会触发外层跳转！
                          setLikedProducts(toggleWishlistId(product.id));
                        }}
                        className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-[#18181b] text-white transition hover:scale-110 hover:bg-[#42c236]"
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
                      <p className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[10px] leading-[13px] tracking-[0.015em] text-[#EE4D4D] line-through">
                        {formatPrice(product.oldPrice)}
                      </p>
                    ) : null}
                  </article>
                )
              })}
            </div>
          </section>
        </div>
      </div>

      {searchOpen ? (
        <div className="absolute inset-x-0 bottom-0 top-[44px] z-30 bg-white">
          <div className="mx-auto h-full w-full max-w-[360px]">
            <header className="flex h-8 items-center justify-between px-4">
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

            <div className="mt-4 flex flex-col items-center gap-4">
              <div className="relative flex h-[56px] w-[328px] items-center justify-between rounded-xl border border-[#F4F5FD] px-3 py-4">
                <div className="flex min-w-0 flex-1 items-center gap-1">
                  <button
                    onClick={runSearch}
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
                <button
                  onClick={() => setFilterMenuOpen((current) => !current)}
                  className="ml-2 grid h-10 w-10 place-items-center rounded-lg hover:bg-[#f7f8fc]"
                  aria-label="Search filters"
                >
                  <FilterIcon />
                </button>

                {filterMenuOpen ? (
                  <div className="absolute right-0 top-[62px] z-10 w-[168px] rounded-xl border border-[#e7eaf2] bg-white p-1.5 shadow-[0_8px_24px_rgba(28,27,27,0.12)]">
                    <button
                      onClick={() => setFilterMenuOpen(false)}
                      className="block w-full rounded-md px-2 py-2 text-left text-[13px] text-[#1C1B1B] hover:bg-[#f7f8fc]"
                    >
                      Sort by relevance
                    </button>
                    <button
                      onClick={() => setFilterMenuOpen(false)}
                      className="block w-full rounded-md px-2 py-2 text-left text-[13px] text-[#1C1B1B] hover:bg-[#f7f8fc]"
                    >
                      Sort by latest
                    </button>
                    <button
                      onClick={() => {
                        setSearchText('')
                        setFilterMenuOpen(false)
                      }}
                      className="block w-full rounded-md px-2 py-2 text-left text-[13px] text-[#1C1B1B] hover:bg-[#f7f8fc]"
                    >
                      Clear input
                    </button>
                  </div>
                ) : null}
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
                      onClick={() => {
                        setSearchText(item)
                        runSearch(item)
                      }}
                      className="flex h-12 w-full items-end justify-between border-b border-[#F4F5FD] bg-white px-4 pb-1 text-left"
                    >
                      <span className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] font-medium leading-[150%] tracking-[0.005em] text-[#1C1B1B]">
                        {item}
                      </span>
                      <RecentArrowIcon />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default HomePage

