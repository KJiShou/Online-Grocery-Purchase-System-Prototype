import { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom'
import { useOrder } from '../contexts/OrderContext'
import { ToastCheckIcon, ToastContactSupportIcon, ToastFailIcon } from '../components/Icons'
import tickIcon from '../assets/order-placed/tick.png'
import changeAddressIcon from '../assets/order-placed/change-address.png'
import orderIcon from '../assets/order-placed/order.png'

function formatCurrentTime() {
	const now = new Date()
	const hours = String(now.getHours()).padStart(2, '0')
	const minutes = String(now.getMinutes()).padStart(2, '0')
	return `${hours}:${minutes}`
}

function formatPrice(value) {
	return `RM ${Number(value || 0).toFixed(2)}`
}

function formatAddressDisplay(address, unitNo) {
	const trimmedAddress = (address || '').trim()
	const trimmedUnit = (unitNo || '').trim()
	if (!trimmedUnit) return trimmedAddress
	if (!trimmedAddress) return trimmedUnit
	return `${trimmedUnit}, ${trimmedAddress}`
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

function BackIcon() {
	return (
		<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12.7599 25.0935C12.5066 25.0935 12.2533 25.0002 12.0533 24.8002L3.95992 16.7068C3.57326 16.3202 3.57326 15.6802 3.95992 15.2935L12.0533 7.20016C12.4399 6.81349 13.0799 6.81349 13.4666 7.20016C13.8533 7.58682 13.8533 8.22682 13.4666 8.61349L6.07992 16.0002L13.4666 23.3868C13.8533 23.7735 13.8533 24.4135 13.4666 24.8002C13.2799 25.0002 13.0133 25.0935 12.7599 25.0935Z" fill="#1C1B1B" />
			<path d="M27.3336 17H4.89355C4.34689 17 3.89355 16.5467 3.89355 16C3.89355 15.4533 4.34689 15 4.89355 15H27.3336C27.8802 15 28.3336 15.4533 28.3336 16C28.3336 16.5467 27.8802 17 27.3336 17Z" fill="#1C1B1B" />
		</svg>
	)
}

function LocationIcon() {
	return (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C1B1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
			<circle cx="12" cy="10" r="3"></circle>
		</svg>
	)
}

export default function OrderPlacedPage() {
	const navigate = useNavigate()
  	const navigationType = useNavigationType()
	const location = useLocation()
	const { updateOrder, getOrderById } = useOrder()
	const data = { ...(location.state?.checkoutData || location.state || {}) }

	const [showToast, setShowToast] = useState(false);
	const [showToastFail, setShowToastFail] = useState(false);

	const defaultAddress = {
		id: 'andrew',
		name: 'Andrew',
		phone: '(+60) 12-345 6789',
		address:
			'Ground Floor, Bangunan Tan Sri Khaw Kai Boh (Block A), Jalan Genting Kelang, Setapak, 53100 Kuala Lumpur, Federal Territory of Kuala Lumpur',
		unitNo: 'Unit 01-01',
		postalCode: '53100',
	}

	const {
		items = [],
		subtotal = 0,
		selectedAddress = defaultAddress,
		discountAmount = 0,
		shippingDiscount = 0,
		grandTotal = subtotal + 5,
	} = data

	// console.log(data)

	const canChangeAddress = () => {
		const order = getOrderById(data.currentOrderId);
		return order && order.status === "Pending";
	};
	
	useEffect(() => {
		if (data.from && navigationType !== 'POP') {
			const order = getOrderById(data.currentOrderId);
			if (!order) {
				throw new Error('No order data found.')
			}
			if (order.status !== "Pending") {
				console.log('Order already shipped, cannot change address for order', data.currentOrderId)
				// Show fail toast if order is already shipped
				setShowToastFail(true)
				setTimeout(() => {
					setShowToastFail(false)
				}, 5000)
			} else {
				console.log('Updating shipping address for order', data.currentOrderId)
				const shippingInfo = order.shippingInfo;
				shippingInfo.address = formatAddressDisplay(data.selectedAddress.address, data.selectedAddress.unitNo);
				shippingInfo.name = data.selectedAddress.name;
				shippingInfo.phone = data.selectedAddress.phone;
				updateOrder(data.currentOrderId, { shippingInfo })
				
				// Show toast when shipping address is updated
				setShowToast(true)
				setTimeout(() => {
					setShowToast(false)
				}, 5000)
			}
		}
	}, [data.currentOrderId, data.from])


	const [currentTime, setCurrentTime] = useState(formatCurrentTime())

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(formatCurrentTime())
		}, 1000)

		return () => clearInterval(timer)
	}, [])

	return (
		<>
				<div className="absolute inset-x-0 top-[44px] z-20 bg-white min-h-[44px]">
          <div className="mx-auto w-full max-w-[360px] px-5">
						{/* <div className="mb-2 flex items-center justify-between text-[15px] font-normal tracking-[-0.24px] text-[#1C1B1B]">
							<span className="leading-5">{currentTime}</span>
							<StatusIcons />
						</div> */}

						<header className="flex items-center gap-2">
							<button onClick={() => navigate("/home")} className="text-[#1f2937] transition hover:scale-110 hover:text-[#42c236]">
								<BackIcon />
							</button>
							<h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[1.2] text-black">
								Order Placed
							</h1>
						</header>

						{/* Toast notification */}
						{/* <div 
							className={`absolute left-1/2 top-[50px] z-50 flex w-[calc(100%-40px)] max-w-[320px] -translate-x-1/2 items-center gap-3 rounded-2xl border border-[#f3f4f6] bg-white p-3 shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out 
							${showToast ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-6 opacity-0 pointer-events-none'}`}
						>
							<ToastCheckIcon />
							<p className="w-full text-[13px] font-semibold leading-tight text-[#1C1B1B]">
								Shipping address updated successfully!
							</p>
						</div> */}
						<div 
						className={`absolute left-1/2 top-[50px] z-50 flex w-[calc(100%-40px)] max-w-[320px] -translate-x-1/2 items-center justify-between rounded-2xl border border-[#f3f4f6] bg-white p-3 shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out 
						${showToast ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-6 opacity-0 pointer-events-none'}`}
						>
							<div className="flex items-center gap-3">
								<ToastCheckIcon />
								<p className="w-full text-[13px] font-semibold leading-tight text-[#1C1B1B]">
								Shipping address updated successfully!
								</p>
							</div>
						</div>

						{/* Toast fail notification */}
						<div 
							className={`absolute left-1/2 top-[50px] z-50 flex w-[calc(100%-40px)] max-w-[320px] -translate-x-1/2 items-center justify-between rounded-2xl border border-[#f3f4f6] bg-white p-3 shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out 
							${showToastFail ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-6 opacity-0 pointer-events-none'}`}
						>
							<div className="flex items-center gap-3">
								<ToastFailIcon />
								<p className="w-full text-[13px] font-semibold leading-tight text-[#1C1B1B]">
									Unable to change shipping address. Seller has already shipped the order, please contact support.
								</p>
							</div>
						  
							{/* 右侧跳转购物车的快捷按钮 */}
							<button 
							onClick={() => console.log('Contact support clicked')}
							className="flex min-w-[70px] flex-col items-center justify-center gap-1 border-l border-[#f3f4f6] text-[11px] font-bold text-[#ef4444] transition hover:opacity-70"
							>
								<ToastContactSupportIcon/>
								<span className="text-[11px] leading-[12px] font-bold text-[#EE4D4D]">Contact Support</span>
							</button>
						</div>
					</div>
				</div>

				<div className="hide-scrollbar absolute inset-x-0 bottom-[72px] top-[95px] overflow-y-auto pb-8">
					<div className="mx-auto w-full max-w-[360px] px-3 pt-4">
						<div className="mb-4 rounded-[16px] bg-white p-[20px] px-[16px]">
							<div className="flex flex-col items-center">
								<img src={tickIcon} alt="Order placed" className="h-[72px] w-[72px] object-contain" />
								<h2 className="mt-5 text-center text-[22px] font-bold leading-[1.1] tracking-[-0.03em] text-[#1C1B1B]">
									Order Placed!
								</h2>
							</div>

							<div className="mt-5">
								<p className="mb-2 text-[16px] font-semibold text-[#1C1B1B]">Your items will be delivered to:</p>

								<div className="flex items-start gap-2">
									<div className="mt-0.5">
										<LocationIcon />
									</div>
									<div className="flex flex-col gap-1">
										<p className="text-[14px] text-[#1C1B1B]">
											<span className="font-bold">{selectedAddress.name}</span>{' '}
											<span className="text-[#6b7280]">{selectedAddress.phone}</span>
										</p>
										<p className="pr-2 text-[13px] leading-relaxed text-[#4b5563]">
											{formatAddressDisplay(selectedAddress.address, selectedAddress.unitNo)}
										</p>
									</div>
								</div>
							</div>

							<div className="mt-4 grid grid-cols-2 gap-2">
								<button
									onClick={() => {
										if (!canChangeAddress()) {
											// Show fail toast if order is already shipped
											setShowToastFail(true)
											setTimeout(() => {
												setShowToastFail(false)
											}, 5000)
											return;
										} else {
											navigate('/select-address', { state: { ...data, from: location.pathname } })
										}
									}}
									className={`flex h-[46px] items-center justify-center gap-2 rounded-[12px] border border-[#e4e4e7] bg-white text-[15px] font-semibold text-[#1C1B1B] ${!canChangeAddress() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
								>
									<img src={changeAddressIcon} alt="Change Address" className="h-[20px] w-[20px] object-contain" />
									<span>Change Address</span>
								</button>

								<button
									  onClick={() => navigate('/order-detail/' + data.currentOrderId.substring(1))}
									className="flex h-[46px] items-center justify-center gap-2 rounded-[12px] bg-[#1C1B1B] text-[15px] font-semibold text-white"
								>
									<img src={orderIcon} alt="Order detail" className="h-[20px] w-[20px] object-contain" />
									<span>Order Detail</span>
								</button>
							</div>
						</div>

						<div className="rounded-[16px] bg-white p-[20px] px-[16px]">
							<h2 className="mb-4 text-[22px] font-bold leading-[1.1] tracking-[-0.03em] text-[#1C1B1B]">
								What You've Ordered
							</h2>

							{items.map((item) => (
								<div key={item.id} className="border-b border-[#f3f4f6] py-4">
									<div className="flex items-start gap-4">
										<div className="h-[80px] w-[60px] flex-shrink-0 rounded-lg bg-[#f8fafc] p-1">
											<img
												src={item.image}
												alt={item.name}
												className="h-full w-full object-contain"
											/>
										</div>

										<div className="flex flex-1 flex-col justify-between py-1">
											<p className="pr-4 text-[14px] font-medium leading-snug text-[#1C1B1B]">
												{item.name}
											</p>
											<div className="mt-2 flex flex-col">
												<p className="text-[15px] font-bold text-[#1C1B1B]">
													RM {Number(item.price || 0).toFixed(2)}
												</p>
												<p className="text-[12px] text-[#9CA3AF] line-through">RM {Number(item.oldPrice || 20).toFixed(2)}</p>
											</div>
										</div>

										<div className="self-center">
											<span className="text-[13px] font-medium text-[#6b7280]">x{item.quantity}</span>
										</div>
									</div>
								</div>
							))}

							<div className="py-4">
								<h3 className="mb-4 text-[15px] font-bold text-[#1C1B1B]">Payment Details</h3>

								<div className="flex flex-col gap-2.5 pl-0 -mr-10">
									<div className="grid grid-cols-3 items-center text-[14px]">
										<span className="text-left text-[#4b5563]">Subtotal:</span>
										<span className="text-left font-medium text-[#1C1B1B]">{formatPrice(subtotal)}</span>
										<div></div>
									</div>

									<div className="grid grid-cols-3 items-center text-[14px]">
										<span className="text-left text-[#4b5563]">Discount:</span>
										<span className="text-left -ml-1.5 font-medium text-[#ee4d4d]">-{formatPrice(discountAmount)}</span>
										<div></div>
									</div>

									<div className="grid grid-cols-3 items-center text-[14px]">
										<span className="text-left text-[#4b5563]">Shipping Cost:</span>
										<span className="text-left font-medium text-[#1C1B1B]">{formatPrice(5 - shippingDiscount)}</span>
										<div></div>
									</div>

									<div className="grid grid-cols-3 items-center text-[14px]">
										<span className="text-left font-bold text-[#1C1B1B]">Total:</span>
										<span className="text-left font-medium text-[#1C1B1B]">{formatPrice(grandTotal)}</span>
										<div></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
	)
}
