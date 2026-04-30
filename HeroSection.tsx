import { motion } from 'framer-motion'
import { Shield, Globe, ArrowRight, Scan, Activity, Zap } from 'lucide-react'
import { useState } from 'react'

export default function HeroSection() {
  const [url, setUrl] = useState('')

  const handleAnalyze = () => {
    const analyzer = document.getElementById('analyzer')
    if (analyzer) {
      analyzer.scrollIntoView({ behavior: 'smooth' })
      // Dispatch custom event to focus input
      window.dispatchEvent(new CustomEvent('focus-analyzer', { detail: { url } }))
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[72px]">
      {/* Animated Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] animate-grid-drift"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00F0FF]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#B24CFF]/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00F0FF]/20 mb-8"
        >
          <Zap className="w-4 h-4 text-[#00F0FF]" />
          <span className="text-xs font-medium text-[#00F0FF] uppercase tracking-wider">AI-Powered Cybersecurity</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6"
        >
          Protect Yourself from{' '}
          <span className="text-gradient">Malicious Links</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg sm:text-xl text-[#A0AEC0] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          LinkShield AI uses advanced machine learning to detect phishing, malware, and suspicious URLs in real-time.
        </motion.p>

        {/* Input Group */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass rounded-2xl p-2 flex flex-col sm:flex-row gap-2 border border-white/10 focus-within:border-[#00F0FF]/30 focus-within:glow-cyan transition-all duration-300">
            <div className="flex-1 flex items-center gap-3 px-4 py-3">
              <Globe className="w-5 h-5 text-[#A0AEC0] shrink-0" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to scan..."
                className="flex-1 bg-transparent text-white placeholder-[#6B7280] outline-none text-base"
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              />
            </div>
            <button
              onClick={handleAnalyze}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#B24CFF] text-white font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300 animate-glow-pulse"
            >
              <Scan className="w-5 h-5" />
              Analyze Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-10"
        >
          <div className="flex items-center gap-2 text-sm text-[#A0AEC0]">
            <Activity className="w-4 h-4 text-[#00F0FF]" />
            <span>15K+ URLs Scanned</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-[#6B7280]" />
          <div className="flex items-center gap-2 text-sm text-[#A0AEC0]">
            <Shield className="w-4 h-4 text-[#B24CFF]" />
            <span>99.2% Accuracy</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-[#6B7280]" />
          <div className="flex items-center gap-2 text-sm text-[#A0AEC0]">
            <Zap className="w-4 h-4 text-[#00F0FF]" />
            <span>Real-time Detection</span>
          </div>
        </motion.div>
      </div>

      {/* Floating Decorative Shields */}
      <motion.div
        className="absolute top-1/3 right-[10%] hidden lg:block"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Shield className="w-24 h-24 text-[#00F0FF]/20" />
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 left-[8%] hidden lg:block"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <Shield className="w-16 h-16 text-[#B24CFF]/20" />
      </motion.div>
    </section>
  )
}
