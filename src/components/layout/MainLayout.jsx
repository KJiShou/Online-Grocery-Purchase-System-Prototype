import { Outlet } from 'react-router-dom'
import BottomNav from '../navigation/BottomNav'
import StatusBar from './StatusBar'

function MainLayout() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f4f4f5]">
      <section className="relative h-screen w-full overflow-hidden bg-[#f4f4f5] max-[420px]:mx-auto max-[420px]:h-[min(800px,100dvh)] max-[420px]:w-[min(360px,100vw)] max-[420px]:rounded-[24px] max-[420px]:border max-[420px]:border-[#d4d4d8] max-[420px]:shadow-[0_12px_36px_rgba(0,0,0,0.12)]">
        <StatusBar />
        <Outlet />
        <BottomNav />
      </section>
    </div>
  )
}

export default MainLayout
