import { Navigate, useLocation } from 'react-router-dom'

export default function NewAddressPage() {
  const location = useLocation()
  return <Navigate to="/edit-address" replace state={location.state || {}} />
}
