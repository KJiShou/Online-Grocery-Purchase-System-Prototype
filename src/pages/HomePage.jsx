import { useEffect, useRef, useState } from 'react'
import {
  CategoryIcon,
  CloseIcon,
  FilterIcon,
  HeartIcon,
  RecentArrowIcon,
  SearchFieldIcon,
  SearchIcon,
} from '../components/Icons'
import { useNavigate } from 'react-router-dom'
import { bannerItems, categories, products } from '../data/homeData'
import { loadWishlistIds, saveWishlistIds, toggleWishlistId } from '../utils/wishlist'

function formatPrice(value) {
  return `RM${value.toFixed(2)}`
}

function CarouselArrowIcon({ className = '' }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12.4982 12.0007L8.27071 7.54013C8.09728 7.37041 8 7.14121 8 6.90236C8 6.66351 8.09728 6.43431 8.27071 6.26458C8.35587 6.18079 8.45738 6.11424 8.56933 6.06882C8.68128 6.02339 8.80143 6 8.9228 6C9.04417 6 9.16432 6.02339 9.27627 6.06882C9.38822 6.11424 9.48973 6.18079 9.57489 6.26458L14.7297 11.3616C14.9029 11.5317 15 11.761 15 12C15 12.239 14.9029 12.4683 14.7297 12.6384L9.57489 17.7354C9.48973 17.8192 9.38822 17.8858 9.27627 17.9312C9.16432 17.9766 9.04417 18 8.9228 18C8.80143 18 8.68128 17.9766 8.56933 17.9312C8.45738 17.8858 8.35587 17.8192 8.27071 17.7354C8.09728 17.5657 8 17.3365 8 17.0976C8 16.8588 8.09728 16.6296 8.27071 16.4599L12.4982 12.0007Z"
        fill="#1C1B1B"
      />
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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveBannerIndex((current) => (current + 1) % bannerItems.length)
    }, 3200)

    return () => window.clearInterval(timer)
  }, [])

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
            {bannerItems.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  activeBannerIndex === index ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
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
            <button
              onClick={() =>
                setActiveBannerIndex((current) => (current - 1 + bannerItems.length) % bannerItems.length)
              }
              aria-label="Previous banner"
              className="absolute left-2 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/80"
            >
              <CarouselArrowIcon className="rotate-180" />
            </button>
            <button
              onClick={() => setActiveBannerIndex((current) => (current + 1) % bannerItems.length)}
              aria-label="Next banner"
              className="absolute right-2 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/80"
            >
              <CarouselArrowIcon />
            </button>
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
              <button
                onClick={() => navigate('/categories')}
                className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[15px] font-semibold leading-[19px] tracking-[0.005em] text-[#42c236] transition hover:scale-105 hover:text-[#2f9e44]"
              >
                SEE ALL
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="flex h-[86px] flex-col items-center justify-center rounded-2xl border border-gray-200/80 bg-white p-2 text-center transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-green-100"
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
              <button
                onClick={() => navigate('/popular-products')}
                className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[15px] font-semibold leading-[19px] tracking-[0.005em] text-[#42c236] transition hover:scale-105 hover:text-[#2f9e44]"
              >
                SEE ALL
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {displayProducts.map((product, index) => {
                const isLiked = likedProducts.includes(product.id)

                return (
                  <article
                    key={`${product.id}-${index}`}
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
                        className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-black/50 text-white transition hover:scale-110 hover:bg-[#42c236]"
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

