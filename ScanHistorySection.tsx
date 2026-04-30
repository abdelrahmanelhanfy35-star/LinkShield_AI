import { motion } from 'framer-motion'
import { Clock, ShieldCheck, AlertTriangle, ShieldAlert, Trash2, ExternalLink } from 'lucide-react'
import type { ScanResult } from '@/types'

interface ScanHistorySectionProps {
  history: ScanResult[]
  onClear: () => void
}

const statusColors = {
  Safe: { bg: 'bg-[#00F0FF]/10', text: 'text-[#00F0FF]', border: 'border-[#00F0FF]/20', icon: ShieldCheck },
  Suspicious: { bg: 'bg-[#FFB800]/10', text: 'text-[#FFB800]', border: 'border-[#FFB800]/20', icon: AlertTriangle },
  Dangerous: { bg: 'bg-[#FF4757]/10', text: 'text-[#FF4757]', border: 'border-[#FF4757]/20', icon: ShieldAlert },
}

export default function ScanHistorySection({ history, onClear }: ScanHistorySectionProps) {
  if (history.length === 0) return null

  return (
    <section className="relative py-24 bg-[#13162B]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#00F0FF]/10">
                <Clock className="w-5 h-5 text-[#00F0FF]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Recent Scans</h2>
                <p className="text-sm text-[#A0AEC0]">Your scan history ({history.length})</p>
              </div>
            </div>
            <button
              onClick={onClear}
              className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-white/10 text-[#A0AEC0] hover:text-[#FF4757] hover:border-[#FF4757]/30 transition-all duration-300 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          </div>

          {/* History Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.map((scan, i) => {
              const config = statusColors[scan.prediction]
              const Icon = config.icon
              const date = new Date(scan.timestamp).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })

              return (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`glass rounded-xl p-5 border ${config.border} hover:glow-${scan.prediction === 'Safe' ? 'safe' : scan.prediction === 'Suspicious' ? 'warning' : 'danger'} transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text} flex items-center gap-1.5`}>
                      <Icon className="w-3.5 h-3.5" />
                      {scan.prediction}
                    </div>
                    <span className="text-xs text-[#6B7280]">{date}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3 min-w-0">
                    <ExternalLink className="w-3.5 h-3.5 text-[#6B7280] shrink-0" />
                    <p className="text-sm text-[#A0AEC0] truncate">{scan.url}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#6B7280]">Risk Score</span>
                      <span className={`font-semibold ${config.text}`}>{scan.riskScore}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${scan.riskScore}%`,
                          backgroundColor: scan.prediction === 'Safe' ? '#00F0FF' : scan.prediction === 'Suspicious' ? '#FFB800' : '#FF4757'
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
