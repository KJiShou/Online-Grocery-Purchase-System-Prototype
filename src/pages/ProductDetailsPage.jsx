import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { products } from '../data/homeData'
import { useCart } from '../contexts/CartContext'
import { loadWishlistIds, saveWishlistIds, toggleWishlistId } from '../utils/wishlist'
import { formatPrice } from '../utils/helper'
import { BackIcon, HeartIcon, ChevronRightIcon, CartAddIcon, PlusIcon, MinusIcon, ChevronLeftIcon, ToastCheckIcon, ToastCartIcon } from '../components/Icons'

function ProductImagePlaceholder({ name }) {
  return (
    <div className="flex h-[180px] w-[220px] flex-col items-center justify-center rounded-[28px] bg-gradient-to-br from-[#f4f4f5] to-[#e5e7eb] px-5 text-center text-[#1f2937]">
      <span className="mb-3 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#42c236]">
        Add Image
      </span>
      <span className="text-[16px] font-semibold leading-[1.4]">{name}</span>
    </div>
  )
}

export default function ProductDetailPage() {
  const navigate = useNavigate()
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
    : [product.image]; 

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
            className={`absolute left-1/2 top-[50px] z-50 flex w-[calc(100%-40px)] max-w-[320px] -translate-x-1/2 items-center justify-between rounded-2xl border border-[#f3f4f6] bg-white p-3 shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out 
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
        <div className="hide-scrollbar absolute inset-x-0 bottom-[180px] top-[90px] overflow-y-auto">
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
                    {imgUrl ? (
                      <img 
                        src={imgUrl} 
                        alt={`${product.name} - view ${index + 1}`} 
                        className="h-[180px] w-auto object-contain drop-shadow-sm mix-blend-multiply pointer-events-none"
                      />
                    ) : (
                      <ProductImagePlaceholder name={product.name} />
                    )}
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
     </>
  )
}
