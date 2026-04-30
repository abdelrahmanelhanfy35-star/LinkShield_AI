import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router'
import { Globe, Mic, MicOff, Scan, ShieldCheck, AlertTriangle, ShieldAlert, X, ArrowRight, Loader2, ServerOff } from 'lucide-react'
import type { PredictResponse, ScanResult } from '@/types'

interface AnalyzerSectionProps {
  onScanComplete: (result: ScanResult) => void
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const demoExamples = [
  { label: 'Safe Example', url: 'https://www.google.com/search?q=linkshield', type: 'safe' as const },
  { label: 'Suspicious Example', url: 'http://bit.ly/suspicious-login-page-verify-now', type: 'suspicious' as const },
  { label: 'Phishing Example', url: 'http://192.168.1.1/bank-secure-login-verify-account@phishing.com', type: 'dangerous' as const },
]

const statusConfig = {
  Safe: {
    icon: ShieldCheck,
    color: '#00F0FF',
    bgGlow: 'glow-safe',
    message: 'This URL appears safe to visit',
  },
  Suspicious: {
    icon: AlertTriangle,
    color: '#FFB800',
    bgGlow: 'glow-warning',
    message: 'Exercise caution with this URL',
  },
  Dangerous: {
    icon: ShieldAlert,
    color: '#FF4757',
    bgGlow: 'glow-danger',
    message: 'This URL is potentially harmful!',
  },
}

function CircularProgress({ percentage, color }: { percentage: number; color: string }) {
  const radius = 60
  const strokeWidth = 8
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative w-36 h-36">
      <svg width="144" height="144" viewBox="0 0 144 144" className="transform -rotate-90">
        <circle
          cx="72" cy="72" r={normalizedRadius}
          fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={strokeWidth}
        />
        <motion.circle
          cx="72" cy="72" r={normalizedRadius}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color }}>{percentage}%</span>
        <span className="text-xs text-[#A0AEC0]">Risk Score</span>
      </div>
    </div>
  )
}

// Client-side fallback prediction when backend is unavailable
function clientSidePredict(url: string): PredictResponse {
  const features: Record<string, number | boolean> = {}
  
  // Normalize URL
  let normalizedUrl = url
  if (!url.match(/^https?:\/\//i)) {
    normalizedUrl = 'http://' + url
  }
  
  features.url_length = normalizedUrl.length
  features.has_at_symbol = normalizedUrl.includes('@') ? 1 : 0
  features.num_dots = normalizedUrl.split('.').length - 1
  features.has_https = normalizedUrl.startsWith('https://') ? 1 : 0
  features.has_ip_address = /\b(?:\d{1,3}\.){3}\d{1,3}\b/.test(normalizedUrl) ? 1 : 0
  
  const domainMatch = normalizedUrl.match(/\/\/([^\/]+)/)
  const domain = domainMatch ? domainMatch[1] : ''
  const path = normalizedUrl.replace(/^https?:\/\/[^\/]+/, '')
  
  features.domain_length = domain.length
  features.path_length = path.length
  features.has_subdomain = domain.split('.').length > 2 ? 1 : 0
  
  const suspiciousWords = ['login', 'verify', 'bank', 'account', 'update', 'confirm', 'secure', 'signin', 'password', 'credential', 'auth', 'validate', 'authenticate', 'wallet', 'crypto', 'bitcoin']
  features.has_suspicious_words = suspiciousWords.some(w => normalizedUrl.toLowerCase().includes(w)) ? 1 : 0
  
  const shorteningServices = ['bit.ly', 'tinyurl', 't.co', 'goo.gl', 'ow.ly', 'short.link', 'is.gd', 'buff.ly']
  features.has_shortening_service = shorteningServices.some(s => normalizedUrl.toLowerCase().includes(s)) ? 1 : 0
  
  features.num_hyphens = normalizedUrl.split('-').length - 1
  features.num_slashes = normalizedUrl.split('/').length - 1
  
  // Rule-based scoring
  let score = 0
  if (features.url_length > 75) score += 15
  else if (features.url_length > 50) score += 8
  if (features.has_ip_address) score += 25
  if (!features.has_https) score += 10
  if (features.has_at_symbol) score += 20
  if (features.has_suspicious_words) score += 15
  if (features.has_shortening_service) score += 10
  if (features.num_dots > 3) score += 5
  if (features.num_hyphens > 3) score += 5
  if (features.has_subdomain) score += 5
  if (features.domain_length > 30) score += 5
  if (features.path_length > 50) score += 5
  
  const riskScore = Math.min(score, 100)
  
  let prediction: 'Safe' | 'Suspicious' | 'Dangerous'
  let confidence: number
  
  if (riskScore < 25) {
    prediction = 'Safe'
    confidence = Math.min(90 + (25 - riskScore), 99)
  } else if (riskScore < 60) {
    prediction = 'Suspicious'
    confidence = Math.min(60 + (riskScore - 25), 99)
  } else {
    prediction = 'Dangerous'
    confidence = Math.min(70 + (riskScore - 60), 99)
  }
  
  const reasons: string[] = []
  if (features.has_ip_address) reasons.push('Contains IP address instead of domain name')
  if (features.url_length > 75) reasons.push(`URL is too long (${features.url_length} characters)`)
  if (features.has_at_symbol) reasons.push('Contains @ symbol (potential redirect trap)')
  if (!features.has_https) reasons.push('No HTTPS encryption - data transmitted insecurely')
  if (features.has_suspicious_words) reasons.push('Contains suspicious keywords (login, verify, bank)')
  if (features.has_shortening_service) reasons.push('Uses URL shortening service (hides true destination)')
  if (features.num_dots > 3) reasons.push(`Excessive dots in URL (${features.num_dots} detected)`)
  if (features.num_hyphens > 3) reasons.push(`Multiple hyphens detected (${features.num_hyphens})`)
  if (features.has_subdomain) reasons.push('Multiple subdomains (potential spoofing)')
  if (features.domain_length > 30) reasons.push(`Unusually long domain name (${features.domain_length} chars)`)
  if (features.path_length > 50) reasons.push(`Very long URL path (${features.path_length} chars)`)
  
  if (reasons.length === 0) {
    if (prediction === 'Safe') {
      reasons.push('URL structure appears legitimate')
      reasons.push('Uses secure HTTPS connection')
    } else {
      reasons.push('Pattern matches known malicious URLs')
    }
  }
  
  return {
    prediction,
    confidence,
    risk_score: riskScore,
    reasons,
    features,
  }
}

export default function AnalyzerSection({ onScanComplete }: AnalyzerSectionProps) {
  const [url, setUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<PredictResponse | null>(null)
  const [error, setError] = useState('')
  const [listening, setListening] = useState(false)
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('')
  const [usingFallback, setUsingFallback] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    const handler = (e: any) => {
      if (e.detail?.url) {
        setUrl(e.detail.url)
        inputRef.current?.focus()
      }
    }
    window.addEventListener('focus-analyzer', handler)
    return () => window.removeEventListener('focus-analyzer', handler)
  }, [])

  // Voice input setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setUrl(transcript.trim())
        setListening(false)
      }
      recognition.onerror = () => {
        setListening(false)
      }
      recognition.onend = () => {
        setListening(false)
      }
      recognitionRef.current = recognition
    }
  }, [])

  const toggleVoice = () => {
    if (!recognitionRef.current) {
      alert('Voice input is not supported in your browser.')
      return
    }
    if (listening) {
      recognitionRef.current.stop()
      setListening(false)
    } else {
      recognitionRef.current.start()
      setListening(true)
    }
  }

  const analyzeUrl = useCallback(async (targetUrl: string) => {
    if (!targetUrl.trim()) {
      setError('Please enter a URL to analyze')
      return
    }
    setError('')
    setIsAnalyzing(true)
    setResult(null)
    setProgress(0)
    setStatusText('Extracting features...')
    setUsingFallback(false)

    const statusSteps = [
      { progress: 20, text: 'Extracting features...' },
      { progress: 50, text: 'Running AI model...' },
      { progress: 75, text: 'Analyzing patterns...' },
      { progress: 90, text: 'Finalizing result...' },
    ]

    statusSteps.forEach((step, i) => {
      setTimeout(() => {
        setProgress(step.progress)
        setStatusText(step.text)
      }, (i + 1) * 400)
    })

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)
      
      let data: PredictResponse
      
      try {
        const response = await fetch(`${API_URL}/predict`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: targetUrl.trim() }),
          signal: controller.signal,
        })
        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error('Backend error')
        }

        data = await response.json()
      } catch (e) {
        // Fallback to client-side prediction
        setUsingFallback(true)
        data = clientSidePredict(targetUrl.trim())
      }
      
      setProgress(100)
      setTimeout(() => {
        setResult(data)
        setIsAnalyzing(false)
        const scanResult: ScanResult = {
          id: Date.now().toString(),
          url: targetUrl,
          prediction: data.prediction,
          confidence: data.confidence,
          riskScore: data.risk_score,
          reasons: data.reasons,
          features: data.features,
          timestamp: new Date().toISOString(),
        }
        onScanComplete(scanResult)
      }, 500)
    } catch (err: any) {
      setError(err.message || 'Failed to analyze URL. Please try again.')
      setIsAnalyzing(false)
      setProgress(0)
    }
  }, [onScanComplete])

  const handleSubmit = () => analyzeUrl(url)

  const loadDemo = (demoUrl: string) => {
    setUrl(demoUrl)
    analyzeUrl(demoUrl)
  }

  const clearResult = () => {
    setResult(null)
    setError('')
    setUrl('')
    setUsingFallback(false)
  }

  return (
    <section id="analyzer" className="relative py-24 bg-[#0B0D17]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass rounded-2xl p-6 sm:p-8 border border-white/10"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-[#00F0FF]/10">
              <ShieldCheck className="w-6 h-6 text-[#00F0FF]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">URL Security Scanner</h2>
              <p className="text-sm text-[#A0AEC0]">AI-powered malicious link detection</p>
            </div>
          </div>

          {/* Input */}
          <div className="relative mb-4">
            <div className="glass rounded-xl p-1 flex items-center gap-2 border border-white/10 focus-within:border-[#00F0FF]/30 transition-all duration-300">
              <div className="flex items-center gap-3 px-4 py-3 flex-1 min-w-0">
                <Globe className="w-5 h-5 text-[#A0AEC0] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter URL to scan... (e.g., https://example.com)"
                  className="flex-1 bg-transparent text-white placeholder-[#6B7280] outline-none text-sm sm:text-base min-w-0"
                  onKeyDown={(e) => e.key === 'Enter' && !isAnalyzing && handleSubmit()}
                  disabled={isAnalyzing}
                />
              </div>
              <button
                onClick={toggleVoice}
                className={`p-3 rounded-lg shrink-0 transition-all duration-300 ${
                  listening
                    ? 'bg-[#FF4757]/20 text-[#FF4757] animate-pulse'
                    : 'bg-white/5 text-[#A0AEC0] hover:text-[#00F0FF] hover:bg-[#00F0FF]/10'
                }`}
                title="Voice input"
              >
                {listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <button
                onClick={handleSubmit}
                disabled={isAnalyzing || !url.trim()}
                className="px-5 py-3 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#B24CFF] text-white font-semibold flex items-center gap-2 hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:hover:scale-100 shrink-0"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Scan className="w-5 h-5" />
                    Analyze
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Demo Examples */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs text-[#6B7280] self-center mr-1">Try:</span>
            {demoExamples.map((demo) => (
              <button
                key={demo.label}
                onClick={() => loadDemo(demo.url)}
                disabled={isAnalyzing}
                className="px-3 py-1.5 rounded-full text-xs font-medium glass border border-white/10 hover:border-[#00F0FF]/30 hover:glow-cyan transition-all duration-300 disabled:opacity-50"
              >
                {demo.label}
              </button>
            ))}
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-4 rounded-xl bg-[#FF4757]/10 border border-[#FF4757]/20 text-[#FF4757] text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading State */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 py-4"
              >
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#A0AEC0]">{statusText}</span>
                    <span className="text-[#00F0FF] font-mono">{progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#00F0FF] to-[#B24CFF] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Neural Network Visualization */}
                <div className="flex items-center justify-center gap-6 py-4">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <motion.div
                        className="w-4 h-4 rounded-full bg-[#00F0FF]"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                      {i < 3 && (
                        <motion.div
                          className="w-8 h-[2px] bg-gradient-to-r from-[#00F0FF] to-[#B24CFF]"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fallback Warning */}
          <AnimatePresence>
            {usingFallback && result && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-lg bg-[#FFB800]/10 border border-[#FFB800]/20 flex items-center gap-2"
              >
                <ServerOff className="w-4 h-4 text-[#FFB800] shrink-0" />
                <span className="text-xs text-[#FFB800]">Running in offline mode. Connect the Python backend for enhanced AI accuracy.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result Display */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Analysis Result</h3>
                  <button
                    onClick={clearResult}
                    className="p-2 rounded-lg hover:bg-white/5 text-[#A0AEC0] hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className={`p-6 rounded-xl border ${statusConfig[result.prediction].bgGlow}`}
                  style={{ borderColor: `${statusConfig[result.prediction].color}30`, background: `${statusConfig[result.prediction].color}08` }}
                >
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Circular Progress */}
                    <CircularProgress percentage={result.risk_score} color={statusConfig[result.prediction].color} />

                    {/* Status Info */}
                    <div className="text-center sm:text-left flex-1">
                      <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                        {(() => {
                          const Icon = statusConfig[result.prediction].icon
                          return <Icon className="w-8 h-8" style={{ color: statusConfig[result.prediction].color }} />
                        })()}
                        <span className="text-2xl font-bold" style={{ color: statusConfig[result.prediction].color }}>
                          {result.prediction}
                        </span>
                      </div>
                      <p className="text-[#A0AEC0] text-sm mb-1">
                        AI Confidence: <span className="text-white font-semibold">{result.confidence}%</span>
                      </p>
                      <p className="text-sm" style={{ color: statusConfig[result.prediction].color }}>
                        {statusConfig[result.prediction].message}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reasons */}
                {result.reasons.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Detected Issues</h4>
                    <div className="space-y-2">
                      {result.reasons.map((reason, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.4 }}
                          className="flex items-start gap-3 p-3 rounded-lg glass border border-white/5"
                        >
                          <div className="mt-0.5">
                            {result.prediction === 'Safe' ? (
                              <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
                            ) : result.prediction === 'Suspicious' ? (
                              <AlertTriangle className="w-4 h-4 text-[#FFB800]" />
                            ) : (
                              <ShieldAlert className="w-4 h-4 text-[#FF4757]" />
                            )}
                          </div>
                          <span className="text-sm text-[#A0AEC0]">{reason}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Feature Details */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider">URL Features</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {Object.entries(result.features).map(([key, value], i) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        className="p-2 rounded-lg glass border border-white/5 text-center"
                      >
                        <p className="text-xs text-[#6B7280] capitalize mb-1">{key.replace(/_/g, ' ')}</p>
                        <p className="text-sm font-mono font-semibold text-white">
                          {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={clearResult}
                    className="flex-1 px-4 py-3 rounded-xl glass border border-white/10 text-[#A0AEC0] hover:text-white hover:border-[#00F0FF]/30 transition-all duration-300 text-sm font-medium"
                  >
                    Scan Another URL
                  </button>
                  <Link
                    to="/how-it-works"
                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#B24CFF] text-white text-sm font-medium flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
