import { Routes, Route, useLocation } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import AboutAbdelrahman from './pages/AboutAbdelrahman'
import AboutAmira from './pages/AboutAmira'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[#0B0D17] text-white">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about/abdelrahman" element={<AboutAbdelrahman />} />
          <Route path="/about/amira" element={<AboutAmira />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
