import { useState, useEffect } from 'react'
import BottomNav from '../components/navigation/BottomNav'

function formatCurrentTime() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
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

const categories = [
  { id: 1, name: 'Beverages', icon: '/src/assets/categories/beverages.png' },
  { id: 2, name: 'Dairy & Frozen', icon: '/src/assets/categories/dairy-frozen.png' },
  { id: 3, name: 'Fresh Produce', icon: '/src/assets/categories/fresh-produce.png' },
  { id: 4, name: 'Packaged Food', icon: '/src/assets/categories/packaged-food.png' },
  { id: 5, name: 'Meat, Seafood & Deli', icon: '/src/assets/categories/meat-seafood-deli.png' },
  { id: 6, name: 'Bakery & Breakfast', icon: '/src/assets/categories/bakery-breakfast.png' },
  { id: 7, name: 'Rice, Noodles & Pasta', icon: '/src/assets/categories/rice-noodles-pasta.png' },
  { id: 8, name: 'Biscuits & Crackers', icon: '/src/assets/categories/biscuits-crackers.png' },
  { id: 9, name: 'Ice cream', icon: '/src/assets/categories/ice-cream.png' },
  { id: 10, name: 'Cooking & Condiments', icon: '/src/assets/categories/cooking-condiments.png' },
]

function CategoryPage() {
  const [currentTime, setCurrentTime] = useState(formatCurrentTime())

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
        <div className="absolute inset-x-0 top-0 z-20 bg-white pb-5 pt-4">
          <div className="mx-auto w-full max-w-[360px] px-5">
            <div className="mb-2 flex items-center justify-between text-[15px] font-normal tracking-[-0.24px] text-[#1C1B1B]">
              <span className="leading-5">{currentTime}</span>
              <StatusIcons />
            </div>

            <header>
              <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[1.2] text-black">
                Categories
              </h1>
            </header>
          </div>
        </div>

        <div className="hide-scrollbar absolute inset-x-0 bottom-[86px] top-[108px] overflow-y-auto pb-6">
          <div className="mx-auto w-full max-w-[360px] px-5 pt-4">
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="flex h-[100px] w-[155px] flex-col items-center justify-center rounded-[16px] bg-white shadow-sm transition hover:shadow-md active:scale-95"
                >
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="mb-2 h-[32px] w-[32px] object-contain"
                  />
                  <p className="text-center text-[13px] font-medium text-[#1C1B1B]">
                    {category.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <BottomNav />
      </section>
    </div>
  )
}

export default CategoryPage
        
