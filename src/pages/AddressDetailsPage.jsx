import { useEffect, useMemo, useState } from 'react'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { useLocation, useNavigate } from 'react-router-dom'
import StatusIcons from '../components/layout/StatusBar'

const mapContainerStyle = {
  width: '100%',
  height: '252px',
}

const defaultCenter = { lat: 3.148492, lng: 101.696706 }

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C1B1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}

function formatCurrentTime() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

function parseFromComponents(components = []) {
  const find = (type) => components.find((item) => item.types.includes(type))
  return {
    postalCode: find('postal_code')?.long_name || '',
    subpremise: find('subpremise')?.long_name || '',
  }
}

export default function AddressDetailsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const data = location.state || {}
  const formDraft = data.formDraft || {}

  const [currentTime, setCurrentTime] = useState(formatCurrentTime())
  const [position, setPosition] = useState(defaultCenter)
  const [addressLine, setAddressLine] = useState(formDraft.address || '')
  const [unitNo, setUnitNo] = useState(formDraft.unitNo || '')
  const [postalCode, setPostalCode] = useState(formDraft.postalCode || '')
  const [mapError, setMapError] = useState('')
  const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script-address-details',
    googleMapsApiKey: googleApiKey,
  })

  const geocoder = useMemo(() => {
    if (!isLoaded || !window.google?.maps) return null
    return new window.google.maps.Geocoder()
  }, [isLoaded])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatCurrentTime())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!isLoaded || !window.google?.maps || !addressLine) return
    const locator = new window.google.maps.Geocoder()
    locator.geocode({ address: addressLine }, (results, status) => {
      if (status !== 'OK' || !results?.[0]?.geometry?.location) return
      const locationPoint = results[0].geometry.location
      setPosition({ lat: locationPoint.lat(), lng: locationPoint.lng() })
      const parsed = parseFromComponents(results[0].address_components)
      if (!postalCode && parsed.postalCode) setPostalCode(parsed.postalCode)
      if (!unitNo && parsed.subpremise) setUnitNo(parsed.subpremise)
    })
  }, [isLoaded, addressLine])

  const reverseGeocode = (latLng) => {
    if (!geocoder) return
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status !== 'OK' || !results?.[0]) {
        setMapError('Unable to fetch address from map pin.')
        return
      }
      setMapError('')
      const primary = results[0]
      const parsed = parseFromComponents(primary.address_components)
      setAddressLine(primary.formatted_address || '')
      if (parsed.postalCode) setPostalCode(parsed.postalCode)
      if (parsed.subpremise) setUnitNo(parsed.subpremise)
    })
  }

  const handleConfirm = () => {
    if (!addressLine.trim()) {
      alert('Address is required.')
      return
    }

    navigate('/edit-address', {
      replace: true,
      state: {
        ...data,
        formDraft: {
          ...formDraft,
          address: addressLine.trim(),
          unitNo: unitNo.trim(),
          postalCode: postalCode.trim(),
        },
      },
    })
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F4F5FD]">
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
              <button onClick={() => navigate(-1)} className="text-[#1f2937]" aria-label="Back">
                <BackIcon />
              </button>
              <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[120%] text-[#1C1B1B]">
                Address Details
              </h1>
            </div>
          </div>
        </div>

        <div className="hide-scrollbar absolute inset-x-0 bottom-0 top-[101px] overflow-y-auto px-[10px] pb-8 pt-[10px]">
          <div className="mx-auto flex w-full max-w-[360px] flex-col gap-6">
            <div className="rounded-2xl bg-white p-[10px] shadow-[0_8px_18px_rgba(28,27,27,0.08)]">
              <div className="overflow-hidden rounded-xl border border-[#F4F5FD] bg-[#E5E7EB]">
                {!googleApiKey ? (
                  <div className="flex h-[252px] items-center justify-center px-6 text-center text-[14px] text-[#6B7280]">
                    Add `VITE_GOOGLE_MAPS_API_KEY` to your `.env` file to enable Google map.
                  </div>
                ) : null}
                {loadError ? (
                  <div className="flex h-[252px] items-center justify-center px-6 text-center text-[14px] text-[#6B7280]">
                    Failed to load Google Maps.
                  </div>
                ) : null}
                {googleApiKey && isLoaded ? (
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={position}
                    zoom={15}
                    onClick={(event) => {
                      if (!event.latLng) return
                      const next = { lat: event.latLng.lat(), lng: event.latLng.lng() }
                      setPosition(next)
                      reverseGeocode(next)
                    }}
                    options={{
                      disableDefaultUI: false,
                      zoomControl: true,
                      mapTypeControl: true,
                      streetViewControl: true,
                    }}
                  >
                    <MarkerF
                      position={position}
                      draggable
                      onDragEnd={(event) => {
                        if (!event.latLng) return
                        const next = { lat: event.latLng.lat(), lng: event.latLng.lng() }
                        setPosition(next)
                        reverseGeocode(next)
                      }}
                    />
                  </GoogleMap>
                ) : null}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-[10px] shadow-[0_10px_22px_rgba(28,27,27,0.10)]">
              <div className="flex flex-col gap-3">
                <label htmlFor="address" className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[18px] font-bold leading-[23px] tracking-[0.0025em] text-[#1C1B1B]">
                  Address <span className="text-[#F25555]">*</span>
                </label>
                <input
                  id="address"
                  type="text"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="h-[60px] rounded-xl border border-[#F4F5FD] bg-white px-4 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] leading-[18px] tracking-[0.005em] text-[#1C1B1B] placeholder:text-[#C0C0C0] focus:outline-none"
                  placeholder="House No., Building, Street Name"
                />
                <input
                  type="text"
                  value={unitNo}
                  onChange={(e) => setUnitNo(e.target.value)}
                  placeholder="Unit No (optional)"
                  className="h-[60px] rounded-xl border border-[#F4F5FD] bg-white px-4 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] leading-[18px] tracking-[0.005em] text-[#1C1B1B] placeholder:text-[#C0C0C0] focus:outline-none"
                />
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Postal Code"
                  className="h-[60px] rounded-xl border border-[#F4F5FD] bg-white px-4 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] leading-[18px] tracking-[0.005em] text-[#1C1B1B] placeholder:text-[#C0C0C0] focus:outline-none"
                />
                {mapError ? <p className="text-[13px] text-[#EE4D4D]">{mapError}</p> : null}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={() => navigate(-1)}
                className="h-[60px] rounded-xl border border-[#EE4D4D] bg-transparent font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[17px] font-bold text-[#EE4D4D]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="h-[60px] rounded-xl bg-[#1C1B1B] font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[17px] font-bold text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
