import { Carousel } from '@arco-design/web-react'
import { useEffect, useState } from 'react'
import { bannerItems, categories, products } from '../data/homeData'

function formatPrice(value) {
  return `RM${value.toFixed(2)}`
}

function formatCurrentTime() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#1f2937]" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
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

function BottomIcon({ type, active = false }) {
  if (type === 'home' && active) {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.0402 6.82018L14.2802 2.79018C12.7102 1.69018 10.3002 1.75018 8.79023 2.92018L3.78023 6.83018C2.78023 7.61018 1.99023 9.21018 1.99023 10.4702V17.3702C1.99023 19.9202 4.06023 22.0002 6.61023 22.0002H17.3902C19.9402 22.0002 22.0102 19.9302 22.0102 17.3802V10.6002C22.0102 9.25018 21.1402 7.59018 20.0402 6.82018ZM12.7502 18.0002C12.7502 18.4102 12.4102 18.7502 12.0002 18.7502C11.5902 18.7502 11.2502 18.4102 11.2502 18.0002V15.0002C11.2502 14.5902 11.5902 14.2502 12.0002 14.2502C12.4102 14.2502 12.7502 14.5902 12.7502 15.0002V18.0002Z"
          fill="#4CBF35"
        />
      </svg>
    )
  }

  if (type === 'home') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17.79 22.75H6.21C3.47 22.75 1.25 20.52 1.25 17.78V10.37C1.25 9.00997 2.09 7.29997 3.17 6.45997L8.56 2.25997C10.18 0.999974 12.77 0.939974 14.45 2.11997L20.63 6.44997C21.82 7.27997 22.75 9.05997 22.75 10.51V17.79C22.75 20.52 20.53 22.75 17.79 22.75ZM9.48 3.43997L4.09 7.63997C3.38 8.19997 2.75 9.46997 2.75 10.37V17.78C2.75 19.69 4.3 21.25 6.21 21.25H17.79C19.7 21.25 21.25 19.7 21.25 17.79V10.51C21.25 9.54997 20.56 8.21997 19.77 7.67997L13.59 3.34997C12.45 2.54997 10.57 2.58997 9.48 3.43997Z"
          fill="#6F7384"
        />
        <path
          d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18C12.75 18.41 12.41 18.75 12 18.75Z"
          fill="#6F7384"
        />
      </svg>
    )
  }

  if (type === 'grid') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
        <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
        <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
        <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
      </svg>
    )
  }

  if (type === 'cart') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="20" r="1.4"></circle>
        <circle cx="18" cy="20" r="1.4"></circle>
        <path d="M3 4h2l2.2 10.2a1 1 0 0 0 1 .8h10.6a1 1 0 0 0 1-.7L22 7H7"></path>
      </svg>
    )
  }

  if (type === 'wishlist') {
    return <HeartIcon />
  }

  if (type === 'profile') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4"></circle>
        <path d="M4 20c2.2-3.8 13.8-3.8 16 0"></path>
      </svg>
    )
  }

  return null
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
  const [likedProducts, setLikedProducts] = useState(['dutch-lady'])
  const [activeBannerIndex, setActiveBannerIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(formatCurrentTime())

  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'categories', label: 'Categories', icon: 'grid' },
    { id: 'cart', label: 'My Cart', icon: 'cart' },
    { id: 'wishlist', label: 'Wishlist', icon: 'wishlist' },
    { id: 'profile', label: 'Profile', icon: 'profile' },
  ]

  const displayProducts = [...products, ...products]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatCurrentTime())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f4f4f5]">
      <section
        className="relative h-screen w-full overflow-hidden bg-[#f4f4f5] max-[420px]:mx-auto max-[420px]:h-[min(800px,100dvh)] max-[420px]:w-[min(360px,100vw)] max-[420px]:rounded-[24px] max-[420px]:border max-[420px]:border-[#d4d4d8] max-[420px]:shadow-[0_12px_36px_rgba(0,0,0,0.12)]"
      >
        <div className="absolute inset-x-0 top-0 z-20 bg-[#f4f4f5] pb-3 pt-4">
          <div className="mx-auto w-full max-w-[360px] px-5">
            <div className="mb-2 flex items-center justify-between text-[15px] font-normal tracking-[-0.24px] text-[#1C1B1B]">
              <span className="leading-5">{currentTime}</span>
              <StatusIcons />
            </div>

            <header className="flex items-center justify-between">
              <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[1.2] text-black">
                Home Page
              </h1>
              <button className="text-[#1f2937] transition hover:scale-110 hover:text-[#42c236]">
                <SearchIcon />
              </button>
            </header>
          </div>
        </div>

        <div className="hide-scrollbar absolute inset-x-0 bottom-[86px] top-[94px] overflow-y-auto pb-6">
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
                    className="h-[86px] rounded-2xl border border-[#e4e4e7] bg-[#f3f4f6] px-2 py-2 text-center transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
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
                    <article key={`${product.id}-${index}`} className="rounded-xl bg-[#c8e8c5] p-2.5">
                      <div className="relative mb-2 h-32 overflow-hidden rounded-xl bg-[#d7f0d4]">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                        <button
                          onClick={() =>
                            setLikedProducts((current) =>
                              current.includes(product.id)
                                ? current.filter((id) => id !== product.id)
                                : [...current, product.id],
                            )
                          }
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
                        <p className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[10px] leading-[13px] tracking-[0.015em] text-[#C0C0C0] line-through">
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

        <nav className="absolute bottom-0 left-0 z-20 w-full border-t border-[#e4e4e7] bg-[#f8fafc] pb-2 pt-3">
          <div className="mx-auto w-full max-w-[360px] px-2">
            <div className="mb-2 grid grid-cols-5">
              {navItems.map((item, index) => {
                const active = index === 0

                return (
                  <button
                    key={item.id}
                    className={`flex flex-col items-center gap-1 transition hover:-translate-y-0.5 ${active ? 'text-[#111827]' : 'text-[#6b7280] hover:text-[#111827]'}`}
                  >
                    <span className="grid h-6 w-6 place-items-center">
                      <BottomIcon type={item.icon} active={active} />
                    </span>
                    <span
                      className={`font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[15px] leading-[19px] tracking-[0.005em] ${active ? 'font-bold text-[#1C1B1B]' : 'font-semibold text-[#6F7384]'}`}
                    >
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="mx-auto h-1.5 w-28 rounded-full bg-[#111827]"></div>
          </div>
        </nav>
      </section>
    </div>
  )
}

export default HomePage
