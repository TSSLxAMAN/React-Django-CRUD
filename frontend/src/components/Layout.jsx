import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import BGimage from '../assets/BackgroundImage.jpg'

export const Layout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen" style={{ backgroundImage: `url(${BGimage})` }}>
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 flex container mx-auto p-4 justify-center items-center">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}
