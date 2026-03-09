import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/navigation/BottomNav'
import { productCategories } from '../data/homeData'

function CategoryPage() {
  const navigate = useNavigate()

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

        <div className="hide-scrollbar absolute inset-x-0 bottom-[72px] top-[88px] overflow-y-auto pb-6">
          <div className="mx-auto w-full max-w-[360px] px-5 pt-4">
            <div className="grid grid-cols-2 gap-2">
              {productCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => navigate(`/categories/${category.id}`)}
                  className="flex h-[108px] w-[155px] flex-col items-center justify-center rounded-[16px] bg-white px-3 shadow-sm transition hover:shadow-md active:scale-95"
                >
                  <img
                    src={category.icon}
                    alt={category.label}
                    className="mb-2 h-[32px] w-[32px] object-contain"
                  />
                  <p className="min-h-[32px] max-w-full break-words text-center text-[13px] font-medium leading-4 text-[#1C1B1B]">
                    {category.label}
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
