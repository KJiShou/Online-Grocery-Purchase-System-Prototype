import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import StatusIcons from '../components/layout/StatusBar'

const defaultAddresses = [
  {
    id: 'andrew',
    name: 'Andrew',
    phone: '(+60) 12-345 6789',
    address:
      'Ground Floor, Bangunan Tan Sri Khaw Kai Boh (Block A), Jalan Genting Kelang, Setapak, 53300 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    isDefault: true,
  },
  {
    id: 'kong',
    name: 'Kong Ji Shou',
    phone: '(+60) 14-350 3255',
    address:
      '19, Jalan Kampung Wira Jaya, Taman Melati, 53300 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur',
    isDefault: false,
  },
]

function formatCurrentTime() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C1B1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}

function LocationPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1C1B1B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 12H16" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 16V8" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

function formatAddressDisplay(address, unitNo) {
  const trimmedAddress = (address || '').trim()
  const trimmedUnit = (unitNo || '').trim()
  if (!trimmedUnit) return trimmedAddress
  if (!trimmedAddress) return trimmedUnit
  return `${trimmedUnit}, ${trimmedAddress}`
}

export default function SelectAddressPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const data = location.state?.checkoutData || location.state || {}
  const incomingAddresses = Array.isArray(data.addresses) && data.addresses.length > 0 ? data.addresses : defaultAddresses
  const savedAddress = location.state?.savedAddress
  const deletedAddressId = location.state?.deletedAddressId

  const [currentTime, setCurrentTime] = useState(formatCurrentTime())
  const addresses = useMemo(() => {
    let nextAddresses = incomingAddresses

    if (savedAddress) {
      const exists = nextAddresses.some((item) => item.id === savedAddress.id)
      nextAddresses = exists
        ? nextAddresses.map((item) => (item.id === savedAddress.id ? { ...item, ...savedAddress } : item))
        : [...nextAddresses, savedAddress]

      if (savedAddress.isDefault) {
        nextAddresses = nextAddresses.map((item) => ({
          ...item,
          isDefault: item.id === savedAddress.id,
        }))
      }
    }

    if (deletedAddressId) {
      nextAddresses = nextAddresses.filter((item) => item.id !== deletedAddressId)

      if (nextAddresses.length === 0) {
        nextAddresses = defaultAddresses
      }
    }

    if (!nextAddresses.some((item) => item.isDefault) && nextAddresses[0]) {
      nextAddresses = nextAddresses.map((item, index) => ({
        ...item,
        isDefault: index === 0,
      }))
    }

    return nextAddresses
  }, [incomingAddresses, savedAddress, deletedAddressId])

  const initialAddressId = savedAddress?.id || data.selectedAddress?.id || addresses.find((item) => item.isDefault)?.id || addresses[0]?.id || 'andrew'
  const [selectedAddressId, setSelectedAddressId] = useState(initialAddressId)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatCurrentTime())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const effectiveSelectedAddressId = addresses.some((item) => item.id === selectedAddressId) ? selectedAddressId : addresses[0]?.id
  const selectedAddress = addresses.find((item) => item.id === effectiveSelectedAddressId) || addresses[0]

  return (
    <>
        <div className="absolute inset-x-0 top-[44px] z-20 bg-white pb-3 min-h-[44px]">
          <div className="mx-auto w-full max-w-[360px] px-5">
            <header className="flex items-center gap-2">
              <button onClick={() => navigate(-1)} className="text-[#1f2937] transition hover:scale-110">
                <BackIcon />
              </button>
              <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[1.2] text-black">
                Select Address
              </h1>
            </header>
          </div>
        </div>

        <div className="hide-scrollbar absolute inset-x-0 bottom-[128px] top-[109px] overflow-y-auto">
          <div className="mx-auto w-full max-w-[360px] px-3 pb-8 pt-4">
            <div className="mb-3 flex items-center justify-between rounded-2xl border border-[#F4F5FD] bg-white px-3 py-2.5">
              <h2 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] font-semibold tracking-[0.005em] text-[#1C1B1B]">
                Address
              </h2>
              <span className="rounded-full bg-[#F4F5FD] px-2 py-1 text-[11px] font-semibold text-[#1C1B1B]">
                {addresses.length} Saved
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {addresses.map((item) => {
                const isSelected = effectiveSelectedAddressId === item.id

                return (
                <article
                  key={item.id}
                  onClick={() => setSelectedAddressId(item.id)}
                  className={`relative cursor-pointer rounded-2xl border px-3 py-3.5 transition duration-200 ${
                    isSelected
                      ? 'border-[#1C1B1B] bg-white shadow-[0_8px_20px_rgba(28,27,27,0.14)]'
                      : 'border-[#F4F5FD] bg-white shadow-[0_4px_14px_rgba(15,23,42,0.08)] hover:border-[#D4D4D8] hover:shadow-[0_8px_18px_rgba(15,23,42,0.10)]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 rounded-lg bg-white p-1.5 shadow-sm">
                      <LocationPin />
                    </div>
                    <div className="min-w-0 flex-1 pr-12">
                      <div className="mb-0.5 flex flex-wrap items-center gap-1.5">
                        <span className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] font-semibold leading-5 tracking-[0.005em] text-[#1C1B1B]">
                          {item.name}
                        </span>
                        <span className="rounded-md bg-[#F4F5FD] px-1.5 py-0.5 text-[11px] font-semibold text-[#6F7384]">
                          {item.phone}
                        </span>
                      </div>
                      <p className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] leading-[1.55] tracking-[0.005em] text-[#1C1B1B]">
                        {formatAddressDisplay(item.address, item.unitNo)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        {item.isDefault ? (
                          <span className="inline-flex h-6 items-center rounded-full bg-[#FFECE8] px-2.5 text-[12px] font-semibold tracking-[0.005em] text-[#F53F3F]">
                            Default
                          </span>
                        ) : null}
                        {isSelected ? (
                          <span className="inline-flex h-6 items-center rounded-full bg-[#EAF8E7] px-2.5 text-[12px] font-semibold tracking-[0.005em] text-[#4CBF35]">
                            Selected
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate('/edit-address', {
                        state: {
                          ...data,
                          addresses,
                          editAddress: item,
                        },
                      })
                    }}
                    className="absolute right-3 top-3 rounded-md px-1.5 py-0.5 text-[13px] font-semibold leading-[18px] text-[#2563EB] transition hover:bg-[#EAF2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setSelectedAddressId(item.id)}
                    aria-label={`Choose ${item.name}`}
                    type="button"
                    className={`absolute right-3 top-1/2 grid min-h-[44px] min-w-[44px] -translate-y-1/2 place-items-center rounded-full ${
                      isSelected ? 'text-[#4CBF35]' : 'text-[#1C1B1B]'
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]`}
                  >
                    <span
                      className={`grid h-6 w-6 place-items-center rounded-full border-2 ${
                        isSelected ? 'border-[#4CBF35]' : 'border-[#1C1B1B]'
                      }`}
                    >
                      {isSelected ? <span className="h-2.5 w-2.5 rounded-full bg-[#4CBF35]"></span> : null}
                    </span>
                  </button>
                </article>
                )
              })}
            </div>
          </div>
        </div>

        <div className="absolute bottom-[0px] left-0 z-20 w-full border-t border-[#e4e4e7] bg-[#f8fafc] pb-2 pt-3">
          <div className="mx-auto flex w-full max-w-[360px] gap-3 px-5">
            <button
              onClick={() =>
                navigate('/edit-address', {
                  state: {
                    ...data,
                    addresses,
                    editAddress: null,
                    formDraft: null,
                  },
                })
              }
              className="flex flex-1 gap-2 justify-center rounded-xl border-2 border-[#1C1B1B] bg-white py-3.5 text-[16px] font-bold text-[#1C1B1B] transition hover:bg-[#fff5f5] active:scale-95"
              // className="flex h-[60px] items-center justify-center gap-2 rounded-xl border border-[#1C1B1B] bg-white text-[16px] font-bold text-[#1C1B1B] transition duration-200 hover:bg-[#F4F5FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]"
            >
              New Address
              <PlusIcon />
            </button>
            <button
              onClick={() =>
                navigate('/payment', {
                  state: {
                    ...data,
                    selectedAddress,
                    addresses,
                  },
                  replace: true,
                })
              }
              className="flex-1 rounded-xl bg-[#1C1B1B] py-3.5 text-[16px] font-bold text-white shadow-[0_10px_18px_rgba(28,27,27,0.28)] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]"
              // className="h-[60px] rounded-xl bg-[#1C1B1B] text-[17px] font-bold text-white shadow-[0_10px_18px_rgba(28,27,27,0.28)] transition duration-200 hover:bg-[#131313] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]"
            >
              Confirm
            </button>
          </div>
        </div>
      </>
  )
}
