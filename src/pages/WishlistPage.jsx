import { useMemo, useState } from 'react'
import { products } from '../data/homeData'
import { loadWishlistIds, toggleWishlistId } from '../utils/wishlist'
import { addItemToCart } from '../utils/cart'
import { Message } from '@arco-design/web-react'

function CartActionIcon({ color = '#4CBF35' }) {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.2 18.9C15.0385 18.9 15.7188 18.2197 15.7188 17.3812C15.7188 16.5428 15.0385 15.8625 14.2 15.8625C13.3616 15.8625 12.6813 16.5428 12.6813 17.3812C12.6813 18.2197 13.3616 18.9 14.2 18.9Z" stroke={color} strokeWidth="1.4"/>
      <path d="M7.2625 18.9C8.10096 18.9 8.78125 18.2197 8.78125 17.3812C8.78125 16.5428 8.10096 15.8625 7.2625 15.8625C6.42404 15.8625 5.74375 16.5428 5.74375 17.3812C5.74375 18.2197 6.42404 18.9 7.2625 18.9Z" stroke={color} strokeWidth="1.4"/>
      <path d="M3.93 3.90126L3.75625 6.03C3.7215 6.43875 4.04338 6.7775 4.45213 6.7775H17.7569C18.1228 6.7775 18.4272 6.49938 18.4534 6.1335C18.566 4.59725 17.3938 3.34625 15.8575 3.34625H5.1745C5.08762 2.96363 4.91425 2.59888 4.6445 2.2945C4.20963 1.83356 3.60088 1.5625 2.97538 1.5625H1.46875" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M17.5483 8.08H4.20838C3.8425 8.08 3.54638 8.35813 3.51163 8.71531L3.19813 12.4994C3.07688 13.9831 4.24038 15.25 5.72413 15.25H15.3975C16.7035 15.25 17.8496 14.1809 17.9453 12.8748L18.2321 8.81963C18.2668 8.41956 17.9533 8.08 17.5483 8.08Z" stroke={color} strokeWidth="1.4"/>
    </svg>
  )
}

function ToastSuccessIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M10 18.3333C5.4 18.3333 1.66667 14.6 1.66667 10C1.66667 5.4 5.4 1.66667 10 1.66667C14.6 1.66667 18.3333 5.4 18.3333 10C18.3333 14.6 14.6 18.3333 10 18.3333Z"
        stroke="white"
        strokeWidth="1.7"
      />
      <path d="M6.45801 10L8.81634 12.3583L13.5413 7.6333" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
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

function formatPrice(value) {
  if (typeof value !== 'number') return null
  return `RM ${value.toFixed(2)}`
}

export default function WishlistPage() {
  const [messageApi, messageContextHolder] = Message.useMessage()
  const [wishlistIds, setWishlistIds] = useState(() => loadWishlistIds())
  const [selectedItem, setSelectedItem] = useState(null)
  const [modalQuantity, setModalQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const wishlistItems = useMemo(
    () => products.filter((item) => wishlistIds.includes(item.id)),
    [wishlistIds],
  )

  const openQuantityModal = (item) => {
    setSelectedItem(item)
    setModalQuantity(1)
  }

  const closeQuantityModal = () => {
    setSelectedItem(null)
  }

  const updateModalQuantity = (nextQuantity) => {
    const safeQuantity = Math.min(99, Math.max(1, nextQuantity))
    setModalQuantity(safeQuantity)
  }

  const handleAddToCart = () => {
    if (!selectedItem || isAdding) return
    setIsAdding(true)
    addItemToCart(selectedItem, modalQuantity)
    closeQuantityModal()
    setWishlistIds(toggleWishlistId(selectedItem.id))
    messageApi.success({
      id: 'wishlist-add-to-cart',
      duration: 2500,
      showIcon: false,
      closable: false,
      style: {
        width: 328,
        border: '1px solid #C0C0C0',
        borderRadius: 12,
        background: '#FFFFFF',
        padding: '10px 12px',
      },
      content: (
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-10 w-10 place-items-center rounded-[8px] bg-[#4CBF35]">
              <ToastSuccessIcon />
            </div>
            <p className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[13px] font-semibold leading-4 tracking-[0.005em] text-[#1C1B1B]">
              The product has been added to
              <br />
              your cart !
            </p>
          </div>
          <button
            onClick={() => navigate('/cart')}
            className="flex cursor-pointer flex-col items-center justify-center text-[#4CBF35] transition hover:opacity-80"
          >
            <CartActionIcon color="#4CBF35" />
            <span className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[13px] font-semibold leading-4 tracking-[0.005em]">
              View Cart
            </span>
          </button>
        </div>
      ),
    })
    setIsAdding(false)
  }

  return (
    <>
      {messageContextHolder}
      <div className="absolute inset-x-0 top-[44px] z-20 bg-white pb-3">
        <div className="mx-auto w-full max-w-[360px] px-5">
          <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[1.2] text-black">
            Wishlist
          </h1>
        </div>
      </div>

      <div className="hide-scrollbar absolute inset-x-0 bottom-[94px] top-[100px] overflow-y-auto bg-[#F4F4F5]">
        <div className="mx-auto w-full max-w-[360px] px-4 py-4">
          <div className="flex flex-col gap-4">
            {wishlistItems.length === 0 ? (
              <div className="rounded-xl bg-white p-6 text-center text-[14px] text-[#6F7384]">
                No items in wishlist yet.
              </div>
            ) : null}
            {wishlistItems.map((item, index) => (
              <article key={`${item.id}-${index}`} className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm">
                <div className="h-[120px] w-[120px] shrink-0 overflow-hidden rounded-xl bg-white p-1">
                  <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="max-w-[190px] font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] leading-[150%] font-medium text-[#1C1B1B]">
                    {item.name}
                  </h2>
                  <p className="mt-2 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[18px] font-bold leading-none text-[#1C1B1B]">
                    {formatPrice(item.price)}
                  </p>
                  {typeof item.oldPrice === 'number' ? (
                    <p className="mt-1 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[13px] text-[#EE4D4D] line-through">
                      {formatPrice(item.oldPrice)}
                    </p>
                  ) : null}

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <button
                      onClick={() => openQuantityModal(item)}
                      className="flex items-center gap-2 text-[#4CBF35] transition hover:opacity-80"
                      aria-label={`Add ${item.name} to cart`}
                    >
                      <CartActionIcon />
                      <span className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[10px] font-semibold leading-[13px] tracking-[0.015em]">
                        Add To Cart
                      </span>
                    </button>
                    <button
                      aria-label="Remove from wishlist"
                      onClick={() => setWishlistIds(toggleWishlistId(item.id))}
                      className="grid h-11 w-11 place-items-center rounded-xl text-[#EE4D4D] transition hover:bg-[#fff2f2] hover:scale-105"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {selectedItem ? (
        <div className="absolute inset-0 z-50 bg-black/45 px-4">
          <div className="mx-auto mt-[210px] w-full max-w-[328px] rounded-2xl bg-white p-4 shadow-[0_20px_40px_rgba(0,0,0,0.18)]">
            <h2 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[16px] font-bold text-[#1C1B1B]">
              Choose Quantity
            </h2>
            <p className="mt-1 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[13px] text-[#6F7384]">
              {selectedItem.name}
            </p>

            <div className="mt-4 flex h-[52px] items-center justify-center gap-3 rounded-xl border border-[#E4E4E7] bg-[#F8FAFC]">
              <button
                onClick={() => updateModalQuantity(modalQuantity - 1)}
                aria-label="Decrease quantity"
                className="grid h-11 w-11 place-items-center rounded-lg text-[22px] font-semibold text-[#1C1B1B] transition hover:bg-[#eef2f7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4CBF35]"
              >
                -
              </button>
              <span className="w-10 text-center font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[16px] font-semibold text-[#1C1B1B]">
                {modalQuantity}
              </span>
              <button
                onClick={() => updateModalQuantity(modalQuantity + 1)}
                aria-label="Increase quantity"
                className="grid h-11 w-11 place-items-center rounded-lg text-[22px] font-semibold text-[#1C1B1B] transition hover:bg-[#eef2f7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4CBF35]"
              >
                +
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={closeQuantityModal}
                className="h-11 rounded-xl border border-[#D4D4D8] font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[13px] font-semibold text-[#1C1B1B] transition hover:bg-[#f4f4f5]"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="h-11 rounded-xl bg-[#4CBF35] font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[13px] font-semibold text-white transition hover:bg-[#37a423]"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
