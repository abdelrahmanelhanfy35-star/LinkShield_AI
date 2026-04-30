import { Link } from 'react-router'
import { Shield, Github, Twitter, Mail } from 'lucide-react'

const productLinks = [
  { path: '/', label: 'Home' },
  { path: '/#analyzer', label: 'Analyzer' },
  { path: '/how-it-works', label: 'How It Works' },
]

const companyLinks = [
  { path: '/about/abdelrahman', label: 'About Abdelrahman' },
  { path: '/about/amira', label: 'About Amira' },
  { path: '/contact', label: 'Contact' },
]

const legalLinks = [
  { path: '#', label: 'Privacy Policy' },
  { path: '#', label: 'Terms of Service' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0B0D17] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="w-7 h-7 text-[#00F0FF]" />
              <span className="text-lg font-bold text-gradient">LinkShield AI</span>
            </Link>
            <p className="text-sm text-[#A0AEC0] leading-relaxed">
              AI-powered URL security for everyone. Detect phishing, malware, and suspicious links in real-time.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              {productLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-[#A0AEC0] hover:text-[#00F0FF] transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-[#A0AEC0] hover:text-[#00F0FF] transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map(link => (
                <li key={link.label}>
                  <span className="text-sm text-[#A0AEC0] hover:text-[#00F0FF] transition-colors duration-300 cursor-pointer">
                    {link.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6B7280]">
            2025 LinkShield AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[#6B7280] hover:text-[#00F0FF] transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-[#6B7280] hover:text-[#00F0FF] transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-[#6B7280] hover:text-[#00F0FF] transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
