import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import StatusIcons from '../components/layout/StatusBar'

function BackIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.7599 25.0935C12.5066 25.0935 12.2533 25.0002 12.0533 24.8002L3.95992 16.7068C3.57326 16.3202 3.57326 15.6802 3.95992 15.2935L12.0533 7.20016C12.4399 6.81349 13.0799 6.81349 13.4666 7.20016C13.8533 7.58682 13.8533 8.22682 13.4666 8.61349L6.07992 16.0002L13.4666 23.3868C13.8533 23.7735 13.8533 24.4135 13.4666 24.8002C13.2799 25.0002 13.0133 25.0935 12.7599 25.0935Z" fill="#1C1B1B"/>
      <path d="M27.3336 17H4.89355C4.34689 17 3.89355 16.5467 3.89355 16C3.89355 15.4533 4.34689 15 4.89355 15H27.3336C27.8802 15 28.3336 15.4533 28.3336 16C28.3336 16.5467 27.8802 17 27.3336 17Z" fill="#1C1B1B"/>
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 6L15 12L9 18" stroke="#1C1B1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function formatCurrentTime() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

function formatAddressDisplay(address, unitNo) {
  const trimmedAddress = (address || '').trim()
  const trimmedUnit = (unitNo || '').trim()
  if (!trimmedUnit) return trimmedAddress
  if (!trimmedAddress) return trimmedUnit
  return `${trimmedUnit}, ${trimmedAddress}`
}

export default function EditAddressPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const data = location.state || {}
  const editAddress = data.editAddress || null
  const formDraft = data.formDraft || null
  const initialFormValues = formDraft || editAddress || {}
  const isNewAddress = !editAddress?.id

  const [currentTime, setCurrentTime] = useState(formatCurrentTime())
  const addressLine = initialFormValues.address ?? ''
  const [name, setName] = useState(initialFormValues.name ?? '')
  const [phone, setPhone] = useState(initialFormValues.phone ?? '')
  const unitNo = initialFormValues.unitNo ?? ''
  const postalCode = initialFormValues.postalCode ?? ''
  const [isDefault, setIsDefault] = useState(Boolean(initialFormValues.isDefault))
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(formatCurrentTime()), 1000)
    return () => clearInterval(timer)
  }, [])

  const goToAddressDetails = () => {
    navigate('/address-details', {
      state: {
        ...data,
        editAddress,
        formDraft: {
          id: formDraft?.id ?? editAddress?.id,
          address: addressLine,
          name,
          phone,
          unitNo,
          postalCode,
          isDefault,
        },
      },
    })
  }

  const handleOpenSubmit = () => {
    if (!addressLine.trim()) {
      alert('Address is required.')
      return
    }
    if (!name.trim()) {
      alert('Name is required.')
      return
    }
    if (!phone.trim()) {
      alert('Phone is required.')
      return
    }
    setShowSubmitModal(true)
  }

  const handleSave = () => {
    const savedAddress = {
      ...(editAddress || {}),
      id: editAddress?.id || `addr-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      address: addressLine.trim(),
      unitNo: unitNo.trim(),
      postalCode: postalCode.trim(),
      isDefault,
    }

    navigate('/select-address', {
      replace: true,
      state: {
        ...data,
        savedAddress,
      },
    })
  }

  const handleDelete = () => {
    if (!editAddress?.id) {
      navigate('/select-address', { replace: true, state: { ...data } })
      return
    }

    navigate('/select-address', {
      replace: true,
      state: {
        ...data,
        deletedAddressId: editAddress.id,
      },
    })
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F4F5FD]">
      <section className="relative h-screen w-full overflow-hidden bg-[#F4F5FD] max-[420px]:mx-auto max-[420px]:h-[min(800px,100dvh)] max-[420px]:w-[min(360px,100vw)] max-[420px]:rounded-[24px] max-[420px]:border max-[420px]:border-[#d4d4d8] max-[420px]:shadow-[0_12px_36px_rgba(0,0,0,0.12)]">
        <div className="absolute inset-x-0 top-0 z-20 border-b border-[#F4F5FD] bg-white pt-3">
          <div className="mx-auto w-full max-w-[360px] px-4">
            <div className="mb-2 flex items-center justify-between text-[15px] font-normal tracking-[-0.24px] text-[#1C1B1B]">
              <span className="leading-5">{currentTime}</span>
              <StatusIcons />
            </div>
          </div>
          <div className="mx-auto flex w-full max-w-[360px] items-center gap-2 px-4 pb-3">
            <button
              onClick={() => navigate(-1)}
              className="grid min-h-[44px] min-w-[44px] place-items-center rounded-xl text-[#1f2937] transition hover:bg-[#F4F5FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]"
              aria-label="Back"
            >
                <BackIcon />
            </button>
            <div className="min-w-0">
              <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[120%] text-[#1C1B1B]">
                {isNewAddress ? 'New Address' : 'Edit Address'}
              </h1>
            </div>
          </div>
        </div>

        <div className="hide-scrollbar absolute inset-x-0 bottom-0 top-[101px] overflow-y-auto px-[10px] pb-8 pt-[10px]">
          <div className="mx-auto flex w-full max-w-[360px] flex-col gap-6">
            <div className="rounded-2xl border border-[#F4F5FD] bg-white p-[12px] shadow-[0_8px_20px_rgba(28,27,27,0.08)]">
              <div className="flex flex-col gap-2">
                <label className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[18px] font-bold leading-[23px] tracking-[0.0025em] text-[#1C1B1B]">
                  Address <span className="text-[#F25555]">*</span>
                </label>
                <button
                  type="button"
                  onClick={goToAddressDetails}
                  className="flex min-h-[60px] items-center justify-between rounded-xl border border-[#F4F5FD] bg-white px-4 py-3 text-left transition hover:shadow-[0_6px_14px_rgba(28,27,27,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]"
                >
                  <span
                    className={`font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] leading-[150%] tracking-[0.005em] ${
                      addressLine ? 'text-[#1C1B1B]' : 'text-[#C0C0C0]'
                    }`}
                  >
                    {formatAddressDisplay(addressLine, unitNo) || 'House No., Building, Street Name'}
                  </span>
                  <ChevronRight />
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-[#F4F5FD] bg-white p-[12px] shadow-[0_8px_20px_rgba(28,27,27,0.08)]">
              <div className="flex flex-col gap-4">
                <label htmlFor="name" className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#6F7384]">
                  Contact Details
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="h-[60px] rounded-xl border border-[#F4F5FD] bg-white px-4 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] leading-[18px] tracking-[0.005em] text-[#1C1B1B] placeholder:text-[#C0C0C0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]"
                />
                <input
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="h-[60px] rounded-xl border border-[#F4F5FD] bg-white px-4 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] leading-[18px] tracking-[0.005em] text-[#1C1B1B] placeholder:text-[#C0C0C0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-[#F4F5FD] bg-white p-[12px] shadow-[0_8px_20px_rgba(28,27,27,0.08)]">
              <div className="flex min-h-[44px] items-center justify-between">
                <span className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[15px] font-bold leading-[19px] tracking-[0.005em] text-[#000000]">
                  Set as Default Address
                </span>
                <button
                  type="button"
                  onClick={() => setIsDefault((prev) => !prev)}
                  className={`relative h-8 w-14 rounded-full transition ${isDefault ? 'bg-[#4CBF35]' : 'bg-[#C0C0C0]'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]`}
                  aria-label="Toggle default address"
                >
                  <span
                    className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${isDefault ? 'left-7' : 'left-1'}`}
                  ></span>
                </button>
              </div>
            </div>

            {isNewAddress ? (
              <button
                type="button"
                onClick={handleOpenSubmit}
                className="h-[60px] rounded-xl bg-[#1C1B1B] font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[17px] font-bold text-white transition hover:bg-[#131313] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]"
              >
                Save
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="h-[60px] rounded-xl border border-[#EE4D4D] bg-transparent font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[17px] font-bold text-[#EE4D4D] transition hover:bg-[#FFF1F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EE4D4D]"
                >
                  Delete Address
                </button>
                <button
                  type="button"
                  onClick={handleOpenSubmit}
                  className="h-[60px] rounded-xl bg-[#1C1B1B] font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[17px] font-bold text-white transition hover:bg-[#131313] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>

        {showSubmitModal ? (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/35 px-4">
            <div className="w-full max-w-[328px] rounded-2xl bg-white p-4 shadow-[0_16px_36px_rgba(0,0,0,0.22)]">
              <h3 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[18px] font-bold text-[#1C1B1B]">Confirm Address Update</h3>
              <p className="mt-2 text-[14px] leading-5 text-[#4B5563]">Save changes to this address?</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="h-10 rounded-lg border border-[#D4D4D8] bg-white text-[14px] font-semibold text-[#1C1B1B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="h-10 rounded-lg bg-[#1C1B1B] text-[14px] font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {showDeleteModal ? (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/35 px-4">
            <div className="w-full max-w-[328px] rounded-2xl bg-white p-4 shadow-[0_16px_36px_rgba(0,0,0,0.22)]">
              <h3 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[18px] font-bold text-[#1C1B1B]">Delete Address</h3>
              <p className="mt-2 text-[14px] leading-5 text-[#4B5563]">Delete this address?</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="h-10 rounded-lg border border-[#D4D4D8] bg-white text-[14px] font-semibold text-[#1C1B1B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="h-10 rounded-lg bg-[#EE4D4D] text-[14px] font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EE4D4D]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  )
}
