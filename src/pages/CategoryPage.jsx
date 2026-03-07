import BottomNav from '../components/navigation/BottomNav'

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
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f4f4f5]">
      <section
        className="relative h-screen w-full overflow-hidden bg-[#f4f4f5] max-[420px]:mx-auto max-[420px]:h-[min(800px,100dvh)] max-[420px]:w-[min(360px,100vw)] max-[420px]:rounded-[24px] max-[420px]:border max-[420px]:border-[#d4d4d8] max-[420px]:shadow-[0_12px_36px_rgba(0,0,0,0.12)]"
      >
        <div className="absolute inset-x-0 top-[44px] z-20 bg-white min-h-[44px]">
          <div className="mx-auto w-full max-w-[360px] px-5">
            <header>
              <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[1.2] text-black">
                Categories
              </h1>
            </header>
          </div>
        </div>

        <div className="hide-scrollbar absolute inset-x-0 bottom-[86px] top-[88px] overflow-y-auto pb-6">
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
        
