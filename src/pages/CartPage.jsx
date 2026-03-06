import BottomNav from '../components/navigation/BottomNav'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { formatPrice } from '../utils/helper'
import { BackIcon, TrashIcon } from '../components/Icons'

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

function CartPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { 
    cartItems, 
    toggleSelected, 
    increment, 
    decrement, 
    remove,
    subtotal,
    totalSelectedQuantity
   } = useCart()

  // 安全提取数据
  const { from } = location.state || {}

  return (
    <>
        <div className="absolute inset-x-0 top-[44px] z-20 bg-white pb-3">
          <div className="mx-auto w-full max-w-[360px] px-5">
            <header className="flex items-center gap-2">
              <button onClick={() => {
                if(from === '/payment') {
                  navigate('/')
                } else {
                navigate(-1)}
              }
                } className="text-[#1f2937] transition hover:scale-110 hover:text-[#42c236]">
                <BackIcon />
              </button>
              <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[1.2] text-black">
              My Cart
            </h1>
            </header>
          </div>
        </div>

        <div className="hide-scrollbar absolute inset-x-0 bottom-[170px] top-[108px] overflow-y-auto pb-6">
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
              <span className="text-[16px] font-medium text-[#1f2937]">Subtotal</span>
              {/* 总价会自动根据打勾状态更新 */}
              <span className="text-[18px] font-bold text-[#42c236]">
                {formatPrice(subtotal)}
              </span>
            </div>
            
            {/* 按钮状态：如果没选商品，按钮应该变灰且不可点击 */}
            <button 
              disabled={totalSelectedQuantity === 0}
              onClick={() => {
                navigate('/payment');
              }}
              className={`mb-2 w-full rounded-xl py-3 text-[15px] font-semibold text-white transition 
                ${totalSelectedQuantity === 0 
                  ? 'bg-gray-300 cursor-not-allowed' // 未选中任何商品时的灰色状态
                  : 'bg-[#111827] hover:bg-[#1f2937] shadow-lg hover:-translate-y-0.5' // 有选中商品时的黑色状态
                }`}
            >
              Payment ({totalSelectedQuantity})
            </button>
          </div>
        </div>
        <BottomNav />
      </>
  )
}

export default CartPage
