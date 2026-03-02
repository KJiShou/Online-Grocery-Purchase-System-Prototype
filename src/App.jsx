import { useMemo, useState } from 'react'
import MainLayout from './components/layout/MainLayout'
import HomePage from './pages/HomePage'
import PlaceholderPage from './pages/PlaceholderPage'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  const pageContent = useMemo(() => {
    if (activeTab === 'home') {
      return <HomePage />
    }

    if (activeTab === 'categories') {
      return <PlaceholderPage title="Categories Page" />
    }

    if (activeTab === 'cart') {
      return <PlaceholderPage title="My Cart Page" />
    }

    if (activeTab === 'wishlist') {
      return <PlaceholderPage title="Wishlist Page" />
    }

    return <PlaceholderPage title="Profile Page" />
  }, [activeTab])

  return (
    <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {pageContent}
    </MainLayout>
  )
}

export default App
