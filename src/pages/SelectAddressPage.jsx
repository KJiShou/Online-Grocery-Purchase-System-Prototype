import { useEffect, useState } from 'react'
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.3" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
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

  const [currentTime, setCurrentTime] = useState(formatCurrentTime())
  const [addresses, setAddresses] = useState(incomingAddresses)
  const initialAddressId = data.selectedAddress?.id || incomingAddresses.find((item) => item.isDefault)?.id || incomingAddresses[0]?.id || 'andrew'
  const [selectedAddressId, setSelectedAddressId] = useState(initialAddressId)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatCurrentTime())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!location.state?.savedAddress) return
    const saved = location.state.savedAddress
    const exists = addresses.some((item) => item.id === saved.id)
    let nextAddresses = exists
      ? addresses.map((item) => (item.id === saved.id ? { ...item, ...saved } : item))
      : [...addresses, saved]

    if (saved.isDefault) {
      nextAddresses = nextAddresses.map((item) => ({
        ...item,
        isDefault: item.id === saved.id,
      }))
    }

    setAddresses(nextAddresses)
    setSelectedAddressId(saved.id)
  }, [location.state?.savedAddress])

  useEffect(() => {
    if (!location.state?.deletedAddressId) return
    const deletedId = location.state.deletedAddressId
    let nextAddresses = addresses.filter((item) => item.id !== deletedId)

    if (nextAddresses.length === 0) {
      nextAddresses = defaultAddresses
    }

    if (!nextAddresses.some((item) => item.isDefault) && nextAddresses[0]) {
      nextAddresses = nextAddresses.map((item, index) => ({
        ...item,
        isDefault: index === 0,
      }))
    }

    setAddresses(nextAddresses)
    if (selectedAddressId === deletedId) {
      setSelectedAddressId(nextAddresses[0].id)
    }
  }, [location.state?.deletedAddressId])

  const selectedAddress = addresses.find((item) => item.id === selectedAddressId) || addresses[0]

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f4f4f5]">
      <section className="relative h-screen w-full overflow-hidden bg-[#F4F5FD] max-[420px]:mx-auto max-[420px]:h-[min(800px,100dvh)] max-[420px]:w-[min(360px,100vw)] max-[420px]:rounded-[24px] max-[420px]:border max-[420px]:border-[#d4d4d8] max-[420px]:shadow-[0_12px_36px_rgba(0,0,0,0.12)]">
        <div className="absolute inset-x-0 top-0 z-20 bg-white pt-3">
          <div className="mx-auto w-full max-w-[360px] px-4">
            <div className="mb-2 flex items-center justify-between text-[15px] font-normal tracking-[-0.24px] text-[#1C1B1B]">
              <span className="leading-5">{currentTime}</span>
              <StatusIcons />
            </div>
          </div>
          <div className="h-14 border-b border-[#F4F5FD]">
            <div className="mx-auto flex h-full w-full max-w-[360px] items-center gap-2 px-4">
              <button onClick={() => navigate(-1)} className="text-[#1f2937] transition hover:scale-110" aria-label="Back">
                <BackIcon />
              </button>
              <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[120%] text-[#1C1B1B]">
                Select Address
              </h1>
            </div>
          </div>
        </div>

        <div className="hide-scrollbar absolute inset-x-0 bottom-[112px] top-[101px] overflow-y-auto">
          <div className="mx-auto w-full max-w-[360px] px-[6px] pb-8 pt-3">
            <h2 className="mb-3 px-2 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] font-medium tracking-[0.005em] text-[#1C1B1B]">
              Address
            </h2>

            <div className="flex flex-col gap-1.5">
              {addresses.map((item) => (
                <article
                  key={item.id}
                  onClick={() => setSelectedAddressId(item.id)}
                  className="relative cursor-pointer rounded-2xl bg-white px-3 py-3 shadow-[0_8px_20px_rgba(28,27,27,0.10)] transition active:scale-[0.99]"
                >
                  <div className="flex items-start gap-3">
                    <div className="min-w-0 flex-1 pr-10">
                      <div className="mb-1 flex items-center gap-2">
                        <LocationPin />
                        <span className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[13px] font-semibold leading-4 tracking-[0.005em] text-[#1C1B1B]">
                          {item.name}
                        </span>
                        <span className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] leading-[18px] tracking-[0.005em] text-[#6F7384]">
                          {item.phone}
                        </span>
                      </div>
                      <p className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] leading-[22px] tracking-[0.005em] text-[#1C1B1B]">
                        {formatAddressDisplay(item.address, item.unitNo)}
                      </p>
                      {item.isDefault ? (
                        <span className="mt-1 inline-flex h-6 items-center rounded-full bg-[#FFECE8] px-2.5 text-[12px] font-semibold tracking-[0.005em] text-[#F53F3F]">
                          Default
                        </span>
                      ) : null}
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
                    className="absolute right-3 top-3 text-[14px] font-semibold leading-[18px] text-[#1C1B1B] underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setSelectedAddressId(item.id)}
                    aria-label={`Choose ${item.name}`}
                    type="button"
                    className={`absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full border-2 ${
                      selectedAddressId === item.id ? 'border-[#4CBF35]' : 'border-[#1C1B1B]'
                    } z-10`}
                  >
                    {selectedAddressId === item.id ? <span className="h-2.5 w-2.5 rounded-full bg-[#4CBF35]"></span> : null}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 bg-[#F4F5FD] px-[15px] pb-8 pt-4">
          <div className="mx-auto grid w-full max-w-[360px] grid-cols-2 gap-[15px]">
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
              className="flex h-[60px] items-center justify-center gap-2 rounded-xl bg-[#1C1B1B] text-[17px] font-bold text-white"
            >
              <span>New Address</span>
              <span className="grid h-6 w-6 place-items-center rounded-md border border-white">
                <PlusIcon />
              </span>
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
              className="h-[60px] rounded-xl bg-[#1C1B1B] text-[17px] font-bold text-white"
            >
              Confirm
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
