import { useEffect, useState } from 'react'
import { products } from '../data/homeData'
import { useNavigate } from 'react-router-dom'

function formatPrice(value) {
  return `RM${value.toFixed(2)}`
}

function formatCurrentTime() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

function TrashIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.9997 6.73046C20.9797 6.73046 20.9497 6.73046 20.9197 6.73046C15.6297 6.20046 10.3497 6.00046 5.11967 6.53046L3.07967 6.73046C2.65967 6.77046 2.28967 6.47046 2.24967 6.05046C2.20967 5.63046 2.50967 5.27046 2.91967 5.23046L4.95967 5.03046C10.2797 4.49046 15.6697 4.70046 21.0697 5.23046C21.4797 5.27046 21.7797 5.64046 21.7397 6.05046C21.7097 6.44046 21.3797 6.73046 20.9997 6.73046Z" fill="#EE4D4D"/>
        <path d="M8.49977 5.72C8.45977 5.72 8.41977 5.72 8.36977 5.71C7.96977 5.64 7.68977 5.25 7.75977 4.85L7.97977 3.54C8.13977 2.58 8.35977 1.25 10.6898 1.25H13.3098C15.6498 1.25 15.8698 2.63 16.0198 3.55L16.2398 4.85C16.3098 5.26 16.0298 5.65 15.6298 5.71C15.2198 5.78 14.8298 5.5 14.7698 5.1L14.5498 3.8C14.4098 2.93 14.3798 2.76 13.3198 2.76H10.6998C9.63977 2.76 9.61977 2.9 9.46977 3.79L9.23977 5.09C9.17977 5.46 8.85977 5.72 8.49977 5.72Z" fill="#EE4D4D"/>
        <path d="M15.2104 22.7496H8.79039C5.30039 22.7496 5.16039 20.8196 5.05039 19.2596L4.40039 9.18959C4.37039 8.77959 4.69039 8.41959 5.10039 8.38959C5.52039 8.36959 5.87039 8.67959 5.90039 9.08959L6.55039 19.1596C6.66039 20.6796 6.70039 21.2496 8.79039 21.2496H15.2104C17.3104 21.2496 17.3504 20.6796 17.4504 19.1596L18.1004 9.08959C18.1304 8.67959 18.4904 8.36959 18.9004 8.38959C19.3104 8.41959 19.6304 8.76959 19.6004 9.18959L18.9504 19.2596C18.8404 20.8196 18.7004 22.7496 15.2104 22.7496Z" fill="#EE4D4D"/>
        <path d="M13.6601 17.25H10.3301C9.92008 17.25 9.58008 16.91 9.58008 16.5C9.58008 16.09 9.92008 15.75 10.3301 15.75H13.6601C14.0701 15.75 14.4101 16.09 14.4101 16.5C14.4101 16.91 14.0701 17.25 13.6601 17.25Z" fill="#EE4D4D"/>
        <path d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z" fill="#EE4D4D"/>
    </svg>
  )
}

function QuantityControl({ quantity, onIncrement, onDecrement }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrement}
        className="h-6 w-6 grid place-items-center rounded border border-[#e4e4e7] bg-white text-[#1f2937] transition hover:bg-[#f3f4f6]"
      >
        -
      </button>
      <span className="text-[14px] font-medium">{quantity}</span>
      <button
        onClick={onIncrement}
        className="h-6 w-6 grid place-items-center rounded border border-[#e4e4e7] bg-white text-[#1f2937] transition hover:bg-[#f3f4f6]"
      >
        +
      </button>
    </div>
  )
}

function BackIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.7599 25.0935C12.5066 25.0935 12.2533 25.0002 12.0533 24.8002L3.95992 16.7068C3.57326 16.3202 3.57326 15.6802 3.95992 15.2935L12.0533 7.20016C12.4399 6.81349 13.0799 6.81349 13.4666 7.20016C13.8533 7.58682 13.8533 8.22682 13.4666 8.61349L6.07992 16.0002L13.4666 23.3868C13.8533 23.7735 13.8533 24.4135 13.4666 24.8002C13.2799 25.0002 13.0133 25.0935 12.7599 25.0935Z" fill="#1C1B1B"/>
        <path d="M27.3336 17H4.89355C4.34689 17 3.89355 16.5467 3.89355 16C3.89355 15.4533 4.34689 15 4.89355 15H27.3336C27.8802 15 28.3336 15.4533 28.3336 16C28.3336 16.5467 27.8802 17 27.3336 17Z" fill="#1C1B1B"/>
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

function HeartIcon({ filled = false }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M20.8 8.6c0 5.5-8.8 11.1-8.8 11.1S3.2 14.1 3.2 8.6a5 5 0 0 1 8.8-3.2A5 5 0 0 1 20.8 8.6z"></path>
    </svg>
  )
}

function BottomIcon({ type, active = false }) {
  if (type === 'cart' && active) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.25 22.5C17.2165 22.5 18 21.7165 18 20.75C18 19.7835 17.2165 19 16.25 19C15.2835 19 14.5 19.7835 14.5 20.75C14.5 21.7165 15.2835 22.5 16.25 22.5Z" fill="#21D4B4"/>
            <path d="M8.25 22.5C9.2165 22.5 10 21.7165 10 20.75C10 19.7835 9.2165 19 8.25 19C7.2835 19 6.5 19.7835 6.5 20.75C6.5 21.7165 7.2835 22.5 8.25 22.5Z" fill="#21D4B4"/>
            <path d="M4.84 3.94L4.64 6.39C4.6 6.86 4.97 7.25 5.44 7.25H20.75C21.17 7.25 21.52 6.93 21.55 6.51C21.68 4.74 20.33 3.3 18.56 3.3H6.27C6.17 2.86 5.97 2.44 5.66 2.09C5.16 1.56 4.46 1.25 3.74 1.25H2C1.59 1.25 1.25 1.59 1.25 2C1.25 2.41 1.59 2.75 2 2.75H3.74C4.05 2.75 4.34 2.88 4.55 3.1C4.76 3.33 4.86 3.63 4.84 3.94Z" fill="#21D4B4"/>
            <path d="M20.5101 8.75H5.17005C4.75005 8.75 4.41005 9.07 4.37005 9.48L4.01005 13.83C3.87005 15.54 5.21005 17 6.92005 17H18.0401C19.5401 17 20.8601 15.77 20.9701 14.27L21.3001 9.6C21.3401 9.14 20.9801 8.75 20.5101 8.75Z" fill="#21D4B4"/>
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.25 22.5C17.2165 22.5 18 21.7165 18 20.75C18 19.7835 17.2165 19 16.25 19C15.2835 19 14.5 19.7835 14.5 20.75C14.5 21.7165 15.2835 22.5 16.25 22.5Z"/>
            <path d="M8.25 22.5C9.2165 22.5 10 21.7165 10 20.75C10 19.7835 9.2165 19 8.25 19C7.2835 19 6.5 19.7835 6.5 20.75C6.5 21.7165 7.2835 22.5 8.25 22.5Z"/>
            <path d="M4.84 3.94L4.64 6.39C4.6 6.86 4.97 7.25 5.44 7.25H20.75C21.17 7.25 21.52 6.93 21.55 6.51C21.68 4.74 20.33 3.3 18.56 3.3H6.27C6.17 2.86 5.97 2.44 5.66 2.09C5.16 1.56 4.46 1.25 3.74 1.25H2C1.59 1.25 1.25 1.59 1.25 2C1.25 2.41 1.59 2.75 2 2.75H3.74C4.05 2.75 4.34 2.88 4.55 3.1C4.76 3.33 4.86 3.63 4.84 3.94Z"/>
            <path d="M20.5101 8.75H5.17005C4.75005 8.75 4.41005 9.07 4.37005 9.48L4.01005 13.83C3.87005 15.54 5.21005 17 6.92005 17H18.0401C19.5401 17 20.8601 15.77 20.9701 14.27L21.3001 9.6C21.3401 9.14 20.9801 8.75 20.5101 8.75Z"/>
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

function CartPage() {
  const [cartItems, setCartItems] = useState([
    { ...products[2], quantity: 1, selected: true },
  ])

  const toggleSelected = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    )
  }

  const increment = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    )
  }

  const decrement = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    )
  }

  const remove = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const [currentTime, setCurrentTime] = useState(formatCurrentTime())

  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'categories', label: 'Categories', icon: 'grid' },
    { id: 'cart', label: 'My Cart', icon: 'cart' },
    { id: 'wishlist', label: 'Wishlist', icon: 'wishlist' },
    { id: 'profile', label: 'Profile', icon: 'profile' },
  ]

  const navigate = useNavigate()

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

            <header className="flex items-center gap-2">
              <button className="text-[#1f2937] transition hover:scale-110 hover:text-[#42c236]">
                <BackIcon />
              </button>
              <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[1.2] text-black">
                Cart
              </h1>
            </header>
          </div>
        </div>

        <div className="hide-scrollbar absolute inset-x-0 bottom-[86px] top-[94px] overflow-y-auto pb-6">
            <div className="mx-auto w-full max-w-[360px] px-5">
                {cartItems.map((item) => (
                <div
                    key={item.id}
                    // 外部容器：使用 flex items-stretch 确保左右两列等高
                    className="mb-4 flex w-full items-stretch justify-between rounded-xl bg-white p-3 shadow-sm"
                >
                    {/* === 左侧：商品图片 === */}
                    <div className="mr-3 flex-shrink-0">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="h-[100px] w-[70px] object-contain"
                    />
                    </div>

                    {/* === 中间：文字信息 + 数量控制 === */}
                    <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                        <p className="mb-1 text-[16px] font-medium leading-tight text-[#1C1B1B]">
                        {item.name}
                        </p>
                        <div className="flex flex-col">
                        <p className="text-[16px] font-bold text-[#1C1B1B]">
                            {formatPrice(item.price)}
                        </p>
                        {item.oldPrice ? (
                            <p className="text-[13px] text-[#9CA3AF] line-through">
                            {formatPrice(item.oldPrice)}
                            </p>
                        ) : null}
                        </div>
                    </div>
                    
                    <div className="mt-2">
                        <QuantityControl
                        quantity={item.quantity}
                        onIncrement={() => increment(item.id)}
                        onDecrement={() => decrement(item.id)}
                        />
                    </div>
                    </div>

                    {/* === 右侧：复选框 (顶) + 垃圾桶 (底) === */}
                    <div className="ml-2 flex flex-col items-end justify-between py-1">
                    
                    {/* 使用 Tailwind 'peer' 技巧制作的自定义 Checkbox */}
                    {/* 右侧：复选框容器 */}
                    <label className="relative flex cursor-pointer items-center justify-center">
                        {/* 1. 隐藏的原生 input */}
                        <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={() => toggleSelected(item.id)}
                            className="peer sr-only" 
                        />

                        {/* 2. 占位容器 */}
                        {/* 我们给容器一个固定的宽高，默认只显示边框 */}
                        {/* <div className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-[#e4e4e7] bg-transparent transition-all peer-checked:border-transparent"> */}
                        <div className="absolute inset-0 transition-opacity peer-checked:opacity-100 rounded-md border-2 border-[#e4e4e7] flex items-center justify-center">
                            
                            
                        
                        </div>
                         {/* 3. 你的自定义 SVG */}
                            {/* 默认 opacity-0 (隐藏)，当 peer-checked 时 opacity-100 (显示) */}
                            <div className="opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path 
                                d="M14.19 0H5.81C2.17 0 0 2.17 0 5.81V14.18C0 17.83 2.17 20 5.81 20H14.18C17.82 20 19.99 17.83 19.99 14.19V5.81C20 2.17 17.83 0 14.19 0ZM14.78 7.7L9.11 13.37C8.97 13.51 8.78 13.59 8.58 13.59C8.38 13.59 8.19 13.51 8.05 13.37L5.22 10.54C4.93 10.25 4.93 9.77 5.22 9.48C5.51 9.19 5.99 9.19 6.28 9.48L8.58 11.78L13.72 6.64C14.01 6.35 14.49 6.35 14.78 6.64C15.07 6.93 15.07 7.4 14.78 7.7Z" 
                                fill="#38d4a4" // 统一颜色
                                />
                            </svg>
                        </div>

                    </label>

                    {/* 垃圾桶按钮 */}
                    <button
                        onClick={() => remove(item.id)}
                        className="text-[#ef4444] transition hover:scale-110 mb-1"
                    >
                        <TrashIcon />
                    </button>
                    </div>

                </div>
                ))}
            </div>
            </div>

        <div className="absolute bottom-[72px] left-0 z-20 w-full border-t border-[#e4e4e7] bg-[#f8fafc] pb-2 pt-3">
          <div className="mx-auto w-full max-w-[360px] px-5">
            <div className="mb-3 flex items-center justify-center gap-4">
              <span className="text-[16px] font-medium">Subtotal</span>
              <span className="text-[16px] font-semibold">
                {formatPrice(subtotal)}
              </span>
            </div>
            <button className="mb-2 w-full rounded-xl bg-[#111827] py-3 text-[15px] font-semibold text-white transition hover:bg-[#1f2937]">
              Checkout ({cartItems.length})
            </button>
          </div>
        </div>

        <nav className="absolute bottom-0 left-0 z-20 w-full border-t border-[#e4e4e7] bg-[#f8fafc] pb-2 pt-3">
          <div className="mx-auto w-full max-w-[360px] px-2">
            <div className="mb-2 grid grid-cols-5">
              {navItems.map((item, index) => {
                const active = index === 2

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'home') navigate('/')
                    }}
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

export default CartPage
