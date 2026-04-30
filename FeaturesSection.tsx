import { motion } from 'framer-motion'
import { Brain, Zap, Eye, Shield, Lock, BookOpen } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Detection',
    description: 'Machine learning algorithms trained on millions of URLs to identify threats with high accuracy.',
    color: '#00F0FF',
  },
  {
    icon: Zap,
    title: 'Real-Time Analysis',
    description: 'Get instant results with sub-second response times. No waiting, no delays.',
    color: '#B24CFF',
  },
  {
    icon: Eye,
    title: 'Pattern Recognition',
    description: 'Identifies suspicious patterns that humans might miss, including hidden redirects.',
    color: '#00F0FF',
  },
  {
    icon: Shield,
    title: 'Phishing Protection',
    description: 'Detects sophisticated phishing techniques designed to steal your credentials.',
    color: '#B24CFF',
  },
  {
    icon: Lock,
    title: 'Malware Prevention',
    description: 'Blocks URLs leading to malware downloads and malicious software.',
    color: '#00F0FF',
  },
  {
    icon: BookOpen,
    title: 'Educational Insights',
    description: 'Learn why a URL is dangerous with detailed explanations of detected threats.',
    color: '#B24CFF',
  },
]

export default function FeaturesSection() {
  return (
    <section className="relative py-24 bg-[#0B0D17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why LinkShield AI?</h2>
          <p className="text-lg text-[#A0AEC0] max-w-2xl mx-auto">
            Advanced cybersecurity powered by cutting-edge artificial intelligence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass rounded-2xl p-8 border border-white/10 hover:border-[#00F0FF]/30 transition-all duration-300 group"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:glow-cyan"
                  style={{ background: `${feature.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-sm text-[#A0AEC0] leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
