import { motion } from 'framer-motion'
import { Globe, Database, Brain, ShieldCheck, ChevronRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Globe,
    title: 'User Submits Link',
    description: 'Simply paste any URL into our scanner. We accept all formats including HTTP, HTTPS, and shortened links. Our system normalizes the input for consistent analysis.',
    color: '#00F0FF',
  },
  {
    number: '02',
    icon: Database,
    title: 'Feature Extraction',
    description: 'Our system extracts 12+ key security features from the URL: length analysis, domain structure, HTTPS usage, suspicious keywords, IP detection, and more.',
    color: '#B24CFF',
  },
  {
    number: '03',
    icon: Brain,
    title: 'AI Model Analysis',
    description: 'A trained Random Forest classifier processes the extracted features, comparing them against patterns learned from millions of known malicious and legitimate URLs.',
    color: '#00F0FF',
  },
  {
    number: '04',
    icon: ShieldCheck,
    title: 'Instant Results',
    description: 'Get clear, color-coded results with risk percentages and detailed explanations of any threats detected. Actionable insights help you make informed decisions.',
    color: '#B24CFF',
  },
]

const metrics = [
  { value: '12+', label: 'Features Extracted', color: '#00F0FF' },
  { value: '99.2%', label: 'Model Accuracy', color: '#B24CFF' },
  { value: '200+', label: 'Decision Trees', color: '#00F0FF' },
]

export default function HowItWorks() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-[72px]"
    >
      {/* Hero Banner */}
      <section className="relative py-20 sm:py-28 bg-[#13162B] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#B24CFF]/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#00F0FF]/20 rounded-full blur-[150px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">How It Works</h1>
            <p className="text-lg sm:text-xl text-[#A0AEC0] max-w-2xl mx-auto leading-relaxed">
              Our AI analyzes URLs using advanced machine learning techniques to keep you safe from online threats
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="relative py-24 bg-[#0B0D17]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-24 bottom-24 w-[2px] bg-gradient-to-b from-[#00F0FF] via-[#B24CFF] to-[#00F0FF] hidden lg:block opacity-30" />

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isLeft = i % 2 === 0

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className={`flex items-center gap-4 mb-4 ${isLeft ? 'lg:justify-end' : ''}`}>
                      <span className="text-5xl sm:text-6xl font-extrabold text-gradient opacity-80">{step.number}</span>
                    </div>
                    <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'lg:justify-end' : ''}`}>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${step.color}15` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: step.color }} />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-[#A0AEC0] leading-relaxed max-w-md">{step.description}</p>
                  </div>

                  {/* Center Node */}
                  <div className="hidden lg:flex w-16 h-16 rounded-full items-center justify-center shrink-0 z-10"
                    style={{ background: `${step.color}20`, border: `2px solid ${step.color}40` }}
                  >
                    <div className="w-4 h-4 rounded-full" style={{ background: step.color, boxShadow: `0 0 20px ${step.color}60` }} />
                  </div>

                  {/* Visual */}
                  <div className="flex-1 w-full">
                    <div className="glass rounded-2xl p-6 border border-white/10">
                      {i === 0 && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                          <Globe className="w-5 h-5 text-[#00F0FF]" />
                          <span className="text-sm text-[#A0AEC0] truncate">https://example.com/page?param=value</span>
                          <ChevronRight className="w-4 h-4 text-[#6B7280] ml-auto" />
                        </div>
                      )}
                      {i === 1 && (
                        <div className="space-y-2">
                          {['URL Length: 87', 'Has HTTPS: No', 'IP Address: Yes', 'Suspicious Words: 2'].map((feat, j) => (
                            <div key={j} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                              <span className="text-xs text-[#A0AEC0]">{feat.split(':')[0]}</span>
                              <span className="text-xs font-mono text-[#00F0FF]">{feat.split(':')[1]}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {i === 2 && (
                        <div className="flex items-center justify-center gap-4 py-4">
                          {[0, 1, 2].map((j) => (
                            <div key={j} className="flex flex-col items-center gap-2">
                              <div className="w-10 h-10 rounded-full bg-[#00F0FF]/20 flex items-center justify-center">
                                <Brain className="w-5 h-5 text-[#00F0FF]" />
                              </div>
                              {j < 2 && <div className="w-8 h-[2px] bg-gradient-to-r from-[#00F0FF] to-[#B24CFF]" />}
                            </div>
                          ))}
                        </div>
                      )}
                      {i === 3 && (
                        <div className="text-center py-2">
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF4757]/10 border border-[#FF4757]/30">
                            <ShieldCheck className="w-5 h-5 text-[#FF4757]" />
                            <span className="text-sm font-semibold text-[#FF4757]">Dangerous — 87% Risk</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="relative py-24 bg-[#13162B]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Our AI Model</h2>
              <div className="space-y-4 text-[#A0AEC0] leading-relaxed">
                <p>
                  LinkShield AI uses a <span className="text-[#00F0FF] font-semibold">Random Forest Classifier</span>, an ensemble machine learning algorithm that combines hundreds of decision trees to make highly accurate predictions.
                </p>
                <p>
                  The model was trained on over <span className="text-[#B24CFF] font-semibold">10,000 real URLs</span> — including known phishing sites, malware distributors, and verified legitimate domains from trusted sources.
                </p>
                <p>
                  Each URL is broken down into 12+ measurable features that capture the structural patterns commonly found in malicious links. The model learns to recognize subtle combinations of these features that indicate danger.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4">
                {metrics.map((metric) => (
                  <div key={metric.label} className="glass rounded-xl p-4 text-center border border-white/10">
                    <p className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: metric.color }}>{metric.value}</p>
                    <p className="text-xs text-[#A0AEC0]">{metric.label}</p>
                  </div>
                ))}
              </div>

              {/* Feature Flow Diagram */}
              <div className="glass rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-xl bg-[#00F0FF]/10 flex items-center justify-center mx-auto mb-2">
                      <Database className="w-6 h-6 text-[#00F0FF]" />
                    </div>
                    <span className="text-xs text-[#A0AEC0]">Features</span>
                  </div>
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-[#00F0FF] to-[#B24CFF]" />
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-xl bg-[#B24CFF]/10 flex items-center justify-center mx-auto mb-2">
                      <Brain className="w-6 h-6 text-[#B24CFF]" />
                    </div>
                    <span className="text-xs text-[#A0AEC0]">Model</span>
                  </div>
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-[#B24CFF] to-[#00F0FF]" />
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-xl bg-[#00F0FF]/10 flex items-center justify-center mx-auto mb-2">
                      <ShieldCheck className="w-6 h-6 text-[#00F0FF]" />
                    </div>
                    <span className="text-xs text-[#A0AEC0]">Result</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
