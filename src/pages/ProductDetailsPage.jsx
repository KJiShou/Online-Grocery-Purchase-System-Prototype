import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BottomNav from '../components/navigation/BottomNav'
import { products } from '../data/homeData'
import { useCart } from '../contexts/CartContext'
import { loadWishlistIds, saveWishlistIds, toggleWishlistId } from '../utils/wishlist'

function formatPrice(value) {
  return `RM${value.toFixed(2)}`
}

// --- 图标组件 ---
function BackIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1C1B1B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  )
}

function HeartIcon({ filled = false }) {
  console.log("HeartIcon received filled prop:", filled)
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M20.8 8.6c0 5.5-8.8 11.1-8.8 11.1S3.2 14.1 3.2 8.6a5 5 0 0 1 8.8-3.2A5 5 0 0 1 20.8 8.6z"></path>
    </svg>
  )
}

function CartAddIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1C1B1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 48 48" aria-hidden="true" focusable="false" className="arco-icon arco-icon-left"><path d="M32 8.4 16.444 23.956 32 39.513"></path></svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 48 48" aria-hidden="true" focusable="false" className="arco-icon arco-icon-right"><path d="m16 39.513 15.556-15.557L16 8.4"></path></svg>
  )
}

// Toast 左侧的绿色打勾图标
function ToastCheckIcon() {
  return (
    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-[#42c236]">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.0003 18.9577C5.05866 18.9577 1.04199 14.941 1.04199 9.99935C1.04199 5.05768 5.05866 1.04102 10.0003 1.04102C14.942 1.04102 18.9587 5.05768 18.9587 9.99935C18.9587 14.941 14.942 18.9577 10.0003 18.9577ZM10.0003 2.29102C5.75033 2.29102 2.29199 5.74935 2.29199 9.99935C2.29199 14.2493 5.75033 17.7077 10.0003 17.7077C14.2503 17.7077 17.7087 14.2493 17.7087 9.99935C17.7087 5.74935 14.2503 2.29102 10.0003 2.29102Z" fill="white"/>
        <path d="M8.81621 12.9827C8.64954 12.9827 8.49121 12.916 8.37454 12.7993L6.01621 10.441C5.77454 10.1993 5.77454 9.79935 6.01621 9.55768C6.25788 9.31602 6.65788 9.31602 6.89954 9.55768L8.81621 11.4743L13.0995 7.19102C13.3412 6.94935 13.7412 6.94935 13.9829 7.19102C14.2245 7.43268 14.2245 7.83268 13.9829 8.07435L9.25788 12.7993C9.14121 12.916 8.98288 12.9827 8.81621 12.9827Z" fill="white"/>
    </svg>  
    </div>
  )
}

// Toast 右侧的绿色购物车图标
function ToastCartIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.75 1.75H3.2725C4.2175 1.75 4.96125 2.56375 4.8825 3.5L4.15625 12.215C4.03375 13.6412 5.16249 14.8662 6.59749 14.8662H15.9163C17.1763 14.8662 18.2788 13.8338 18.375 12.5825L18.8475 6.02C18.9525 4.5675 17.85 3.38625 16.3887 3.38625H5.09251" stroke="#4CBF35" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.2188 19.25C14.8228 19.25 15.3125 18.7603 15.3125 18.1562C15.3125 17.5522 14.8228 17.0625 14.2188 17.0625C13.6147 17.0625 13.125 17.5522 13.125 18.1562C13.125 18.7603 13.6147 19.25 14.2188 19.25Z" stroke="#4CBF35" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.21875 19.25C7.82281 19.25 8.3125 18.7603 8.3125 18.1562C8.3125 17.5522 7.82281 17.0625 7.21875 17.0625C6.61469 17.0625 6.125 17.5522 6.125 18.1562C6.125 18.7603 6.61469 19.25 7.21875 19.25Z" stroke="#4CBF35" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.875 7H18.375" stroke="#4CBF35" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function formatCurrentTime() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

export default function ProductDetailPage() {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(formatCurrentTime())
  const { addToCart, cartItems } = useCart()

  // 数量状态管理
  const [quantity, setQuantity] = useState(1)

  const { id } = useParams()

  const itemInCart = cartItems.find((item) => item.id === id);
  const productQuantityInCart = itemInCart ? itemInCart.quantity : 0;

  const product = products.find((p) => p.id === id)

  const [likedProducts, setLikedProducts] = useState(() => {
      const stored = loadWishlistIds()
      if (stored.length > 0) return stored
      const defaultIds = ['dutch-lady']
      saveWishlistIds(defaultIds)
      return defaultIds
    }) 

  const isLiked = likedProducts.includes(product.id);

  const [isClicked, setIsClicked] = useState(false)

    // 1. 只需要一个布尔值状态来记录是否展开（默认不展开）
    const [isExpanded, setIsExpanded] = useState(false);

    // 2. 预先判断原始文本是否真的超过了限制（比如 150 个字符，移动端 300 个字符通常太长了，你可以自己调）
    const maxLength = 150;
    const isLongText = product.description.length > maxLength;

    // 3. 渲染时实时计算当前应该显示的文本
    const displayText = isExpanded 
    ? product.description 
    : product.description.slice(0, maxLength) + (isLongText ? ' ...' : '');

  // 1. 记录当前索引 (你已经有了)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 2. 严厉检查：确保有一个图片数组用于轮播 (你已经有了)
  const carouselImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image, product.image, product.image]; 

  // 3. 新增：创建一个 Ref 指向滚动容器
  const scrollContainerRef = useRef(null);

  // 4. 监听滚动事件 (你已经有了)
  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    setCurrentImageIndex(newIndex);
  };

  // 5. 新增：向左滚动的函数
  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: -width, behavior: 'smooth' });
    }
  };

  // 6. 新增：向右滚动的函数
  const scrollNext = () => {
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: width, behavior: 'smooth' });
    }
  };

  // 1. 控制 Toast 显示/隐藏的状态
  const [showToast, setShowToast] = useState(false)
  // 2. 用于存储定时器 ID 的 Ref (极其重要，防止多次点击导致动画鬼畜)
  const toastTimerRef = useRef(null)

  // 3. 点击加入购物车的处理函数
  const handleAddToCart = () => {
    // 这里可以放你实际加入购物车的逻辑 (比如更新 Context 或 Redux)
    addToCart(product, quantity)
    console.log(`成功将 ${quantity} 件商品加入购物车`)

    // 触发动画显示
    setShowToast(true)

    // 严厉警告：必须先清除上一个定时器！
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current)
    }

    // 设定 3 秒后自动隐藏
    toastTimerRef.current = setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  // 4. 最佳实践：当用户离开这个页面时，清理掉可能还在倒数的定时器，防止内存泄漏
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    }
  }, [])

  useEffect(() => {
    console.log("从 URL 接收到的商品 ID 是:", id)
    console.log("Description Length:", product.description.length)
  }, [id])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatCurrentTime())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const increment = () => setQuantity(q => q + 1)
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1))

  return (
    <>  
        {/* === 顶部 Header === */}
        <div className="absolute inset-x-0 top-[44px] z-20 bg-white pb-3 min-h-[44px]">
          <div className="mx-auto w-full max-w-[360px] px-5">
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="text-[#1C1B1B] transition hover:scale-110">
                  <BackIcon />
                </button>
                <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[1.2] text-black">
              Grocerry
            </h1>
              </div>
              <button
                onClick={() => {
                    setLikedProducts(toggleWishlistId(product.id));
                    // setIsLiked(!isLiked)
                    setIsClicked(true);
                    setTimeout(() => {
                        setIsClicked(false);
                    }, 300);
                }}
                className={`grid h-7 w-7 place-items-center rounded-full text-white transition-all hover:scale-110
        ${isClicked ? 'bg-[#42c236]' : 'bg-[#18181b]'}`}>
                <HeartIcon filled={isLiked} />
              </button>
            </header>

            {/* === 顶部全局弹窗提示 (Toast) === */}
            <div 
            className={`absolute left-1/2 top-[90px] z-50 flex w-[calc(100%-40px)] max-w-[320px] -translate-x-1/2 items-center justify-between rounded-2xl border border-[#f3f4f6] bg-white p-3 shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out 
            ${showToast ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-6 opacity-0 pointer-events-none'}`}
            >
            <div className="flex items-center gap-3">
                <ToastCheckIcon />
                <p className="w-full text-[13px] font-semibold leading-tight text-[#1C1B1B]">
                The product has been added to your cart !
                </p>
            </div>
            
            {/* 右侧跳转购物车的快捷按钮 */}
            <button 
                onClick={() => navigate('/cart')}
                className="flex flex-col items-center min-w-[70px] justify-center border-l border-[#f3f4f6] pl-3 transition hover:opacity-70"
            >
                <ToastCartIcon />
                <span className="mt-1 text-[11px] font-bold text-[#42c236]">View Cart</span>
            </button>
            </div>
          </div>
        </div>

        {/* === 中间滚动内容区 === */}
        {/* 注意 bottom-[140px] 留出了底部操作栏和导航栏的空间 */}
        <div className="hide-scrollbar absolute inset-x-0 bottom-[130px] top-[90px] overflow-y-auto">
          <div className="mx-auto w-full max-w-[360px] flex flex-col">
            
            {/* 1. 顶部商品图展示区 */}
            <div className="relative flex h-[240px] w-full flex-col items-center justify-center">
  
            {/* 新增：左侧箭头 (仅在不是第一张图时显示) */}
            {currentImageIndex > 0 && (
                <button 
                onClick={scrollPrev}
                className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1C1B1B] shadow-sm backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white active:scale-95"
                >
                <ChevronLeftIcon />
                </button>
            )}

            {/* 轮播图滚动容器：加上了 ref={scrollContainerRef} */}
            <div 
                ref={scrollContainerRef}
                className="hide-scrollbar flex w-full overflow-x-auto snap-x snap-mandatory"
                onScroll={handleScroll}
            >
                {carouselImages.map((imgUrl, index) => (
                <div 
                    key={index} 
                    className="flex w-full flex-shrink-0 snap-center items-center justify-center"
                >
                    <img 
                    src={imgUrl} 
                    alt={`${product.name} - view ${index + 1}`} 
                    className="h-[180px] w-auto object-contain drop-shadow-sm mix-blend-multiply pointer-events-none"
                    />
                </div>
                ))}
            </div>

            {/* 新增：右侧箭头 (仅在不是最后一张图时显示) */}
            {currentImageIndex < carouselImages.length - 1 && (
                <button 
                onClick={scrollNext}
                className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#1C1B1B] shadow-sm backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white active:scale-95"
                >
                <ChevronRightIcon />
                </button>
            )}
            
            {/* 动态分页指示点 (Pagination) */}
            <div className="absolute bottom-2 flex items-center gap-1.5">
                {carouselImages.map((_, index) => (
                <div 
                    key={index} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentImageIndex === index 
                        ? 'w-3 bg-[#42c236]' 
                        : 'w-1.5 bg-[#d4d4d8]'
                    }`}
                ></div>
                ))}
            </div>
            </div>

            {/* 2. 详情白色卡片区 */}
            <div className="min-h-[350px] w-full flex-1 rounded-t-3xl bg-white px-5 pt-6 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
              
              {/* 标签 */}
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded bg-[#1e88e5] px-2.5 py-1 text-[11px] font-bold text-black tracking-wide">
                  Top Rated
                </span>
                <span className="rounded bg-[#42c236] px-2.5 py-1 text-[11px] font-bold text-black tracking-wide">
                  Free Shipping
                </span>
              </div>

              {/* 标题与价格 */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="w-[60%] text-[19px] font-bold leading-tight text-[#1C1B1B]">
                  {product.name}
                </h2>
                <div className="flex flex-col items-end pt-1">
                  <span className="text-[18px] font-bold text-[#ef4444]">{formatPrice(product.price)}</span>
                  {product.oldPrice && (
                    <span className="text-[13px] font-medium text-[#9ca3af] line-through">{formatPrice(product.oldPrice)}</span>
                  )}
                </div>
              </div>

              {/* 商品描述 */}
              <p className="mb-6 text-[13px] leading-relaxed text-[#6b7280]">
                {displayText}
                
                {/* 只有当文本真实长度大于限制时，才显示切换按钮 */}
                {isLongText && (
                    <span 
                    onClick={(e) => {
                        e.stopPropagation(); // 保持好习惯，防止文字点击冒泡
                        setIsExpanded(!isExpanded);
                    }}
                    className="ml-1 cursor-pointer font-medium text-[#ef4444] transition hover:underline"
                    >
                    {isExpanded ? 'Show less' : 'Read more'}
                    </span>
                )}
                </p>

              {/* 数量选择器 */}
              <div className="mb-2">
                <h3 className="mb-3 text-[15px] font-bold text-[#1C1B1B]">Quantity</h3>
                <div className="flex h-[42px] w-[100px] items-center justify-between rounded-xl border border-[#e4e4e7] px-3">
                  <button onClick={decrement} className="p-1 transition hover:opacity-70">
                    <MinusIcon />
                  </button>
                  <span className="text-[15px] font-semibold text-[#1C1B1B]">
                    {quantity}
                  </span>
                  <button onClick={increment} className="p-1 transition hover:opacity-70">
                    <PlusIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === 底部双按钮操作栏 === */}
        {/* 注意：bottom-[72px] 悬浮在 BottomNav 之上 */}
        <div className="absolute bottom-[72px] left-0 z-20 w-full border-t border-[#e4e4e7] bg-[#f8fafc] pb-2 pt-3">
          <div className="mx-auto w-full max-w-[360px] px-5">
            <div className="mb-3 flex items-center justify-center gap-4">
              <span className="text-[16px] font-medium text-[#1f2937]">In Cart</span>
              {/* 总价会自动根据打勾状态更新 */}
              <span className="text-[18px] font-bold text-[#42c236]">
                {productQuantityInCart > 0 ? productQuantityInCart : 0}
              </span>
            </div>
            <div className="flex items-center gap-3">
            <button 
              className="flex-1 rounded-xl border-2 border-[#1C1B1B] bg-white py-3.5 text-[15px] font-bold text-[#1C1B1B] transition hover:bg-gray-50 active:scale-95"
            >
              Buy Now
            </button>
            <button 
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1C1B1B] py-3.5 text-[15px] font-bold text-white transition hover:bg-[#2f3f58] active:scale-95"
            >
              Add To Cart
              <CartAddIcon />
            </button>
            </div>
          </div>
        </div>

        {/* 底部系统导航 */}
        <BottomNav />
     </>
  )
}