import { useEffect, useMemo, useState } from 'react'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import { useLocation, useNavigate } from 'react-router-dom'

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
  }, [isLoaded, addressLine, postalCode, unitNo])

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
    <>
        <div className="absolute inset-x-0 top-[44px] z-20 bg-white min-h-[44px]">
          <div className="mx-auto w-full max-w-[360px] px-5">
            <header className="flex items-center gap-2">
              <button onClick={() => navigate(-1)} className="text-[#1f2937] transition hover:scale-110">
                <BackIcon />
              </button>
              <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[25px] font-bold leading-[1.2] text-black">
                Address Details
              </h1>
            </header>
          </div>
        </div>

        <div className="hide-scrollbar absolute inset-x-0 bottom-[128px] top-[88px] overflow-y-auto">
          <div className="mx-auto flex w-full max-w-[360px] flex-col gap-3 px-3 pb-8 pt-4">
            <div className="rounded-2xl border border-[#F4F5FD] bg-white p-3 shadow-[0_4px_14px_rgba(15,23,42,0.08)]">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-[14px] font-semibold text-[#1C1B1B]">Map Location</h2>
                <span className="text-[11px] font-medium text-[#6F7384]">Tap map to reposition pin</span>
              </div>
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

            <div className="rounded-2xl border border-[#F4F5FD] bg-white p-3 shadow-[0_4px_14px_rgba(15,23,42,0.08)]">
              <div className="flex flex-col gap-3">
                <label htmlFor="address" className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[18px] font-bold leading-[23px] tracking-[0.0025em] text-[#1C1B1B]">
                  Address <span className="text-[#F25555]">*</span>
                </label>
                <input
                  id="address"
                  type="text"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="h-[60px] rounded-xl border border-[#F4F5FD] bg-white px-4 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] leading-[18px] tracking-[0.005em] text-[#1C1B1B] placeholder:text-[#C0C0C0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]"
                  placeholder="House No., Building, Street Name"
                />
                <label htmlFor="unitNo" className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#6F7384]">
                  Unit Number
                </label>
                <input
                  id="unitNo"
                  type="text"
                  value={unitNo}
                  onChange={(e) => setUnitNo(e.target.value)}
                  placeholder="Unit No (optional)"
                  className="h-[60px] rounded-xl border border-[#F4F5FD] bg-white px-4 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] leading-[18px] tracking-[0.005em] text-[#1C1B1B] placeholder:text-[#C0C0C0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]"
                />
                <label htmlFor="postalCode" className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#6F7384]">
                  Postal Code
                </label>
                <input
                  id="postalCode"
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Postal Code"
                  className="h-[60px] rounded-xl border border-[#F4F5FD] bg-white px-4 font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[14px] leading-[18px] tracking-[0.005em] text-[#1C1B1B] placeholder:text-[#C0C0C0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]"
                />
                {mapError ? <p className="text-[13px] text-[#EE4D4D]">{mapError}</p> : null}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[0px] left-0 z-20 w-full border-t border-[#e4e4e7] bg-[#f8fafc] pb-2 pt-3">
          <div className="mx-auto flex w-full max-w-[360px] gap-3 px-5">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 rounded-xl border-2 border-[#1C1B1B] bg-white py-3.5 text-[16px] font-bold text-[#1C1B1B] transition hover:bg-[#fff5f5] active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 rounded-xl bg-[#1C1B1B] py-3.5 text-[16px] font-bold text-white shadow-[0_10px_18px_rgba(28,27,27,0.28)] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B1B]"
            >
              Confirm
            </button>
          </div>
        </div>
      </>
  )
}
