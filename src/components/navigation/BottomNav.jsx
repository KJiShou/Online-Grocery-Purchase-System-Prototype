function HeartIcon({ filled = false }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M20.8 8.6c0 5.5-8.8 11.1-8.8 11.1S3.2 14.1 3.2 8.6a5 5 0 0 1 8.8-3.2A5 5 0 0 1 20.8 8.6z"></path>
    </svg>
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

const navItems = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'categories', label: 'Categories', icon: 'grid' },
  { id: 'cart', label: 'My Cart', icon: 'cart' },
  { id: 'wishlist', label: 'Wishlist', icon: 'wishlist' },
  { id: 'profile', label: 'Profile', icon: 'profile' },
]

function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="absolute bottom-0 left-0 z-20 w-full border-t border-[#e4e4e7] bg-[#f8fafc] pb-2 pt-3">
      <div className="mx-auto w-full max-w-[360px] px-2">
        <div className="mb-2 grid grid-cols-5">
          {navItems.map((item) => {
            const active = activeTab === item.id

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
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
  )
}

export default BottomNav
