import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Menu, X, Scan } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/#analyzer', label: 'Analyze' },
  { path: '/how-it-works', label: 'How It Works' },
  { path: '/about/abdelrahman', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const handleNavClick = (path: string) => {
    if (path === '/#analyzer') {
      if (location.pathname !== '/') {
        return
      }
      const el = document.getElementById('analyzer')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(11,13,23,0.9)] backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield className="w-8 h-8 text-[#00F0FF] group-hover:text-[#B24CFF] transition-colors duration-300" />
              <div className="absolute inset-0 blur-lg bg-[#00F0FF]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold text-gradient">LinkShield AI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path.startsWith('/#') ? '/' : link.path}
                onClick={() => handleNavClick(link.path)}
                className="relative text-sm font-medium text-[#A0AEC0] hover:text-[#00F0FF] transition-colors duration-300 tracking-wide"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00F0FF] transition-all duration-300 hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              to="/#analyzer"
              onClick={() => handleNavClick('/#analyzer')}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-[#00F0FF] border border-[#00F0FF]/30 hover:bg-gradient-to-r hover:from-[#00F0FF] hover:to-[#B24CFF] hover:text-white hover:border-transparent transition-all duration-300"
            >
              <Scan className="w-4 h-4" />
              Scan Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[rgba(11,13,23,0.95)] backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path.startsWith('/#') ? '/' : link.path}
                  onClick={() => {
                    handleNavClick(link.path)
                    setMobileOpen(false)
                  }}
                  className="block text-base font-medium text-[#A0AEC0] hover:text-[#00F0FF] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/#analyzer"
                onClick={() => {
                  handleNavClick('/#analyzer')
                  setMobileOpen(false)
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-[#00F0FF] to-[#B24CFF] text-white"
              >
                <Scan className="w-4 h-4" />
                Scan Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
