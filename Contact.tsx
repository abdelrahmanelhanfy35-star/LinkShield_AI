import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MapPin, Clock, Send, CheckCircle, User, MessageSquare, ChevronDown } from 'lucide-react'

const subjects = [
  'General Inquiry',
  'Bug Report',
  'Feature Request',
  'Partnership',
  'Other',
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.subject) newErrors.subject = 'Please select a subject'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSubmitting(false)
    setSubmitted(true)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => { const next = { ...prev }; delete next[field]; return next })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-[72px]"
    >
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-[#13162B] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#00F0FF]/10 rounded-full blur-[150px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Get In Touch</h1>
            <p className="text-lg text-[#A0AEC0] max-w-xl mx-auto">
              Have questions about LinkShield AI? We're here to help. Reach out and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="relative py-24 bg-[#0B0D17]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="glass rounded-2xl p-8 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#00F0FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#6B7280] mb-1">Email</p>
                      <p className="text-white">contact@linkshield.ai</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#B24CFF]/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#B24CFF]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#6B7280] mb-1">Location</p>
                      <p className="text-white">Egypt</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-[#00F0FF]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#6B7280] mb-1">Response Time</p>
                      <p className="text-white">We typically respond within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="glass rounded-2xl p-8 border border-white/10">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#00F0FF]/10 flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-[#00F0FF]" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Message Sent Successfully!</h3>
                      <p className="text-[#A0AEC0] text-sm mb-6">Thank you for reaching out. We'll get back to you soon.</p>
                      <button
                        onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }) }}
                        className="px-5 py-2.5 rounded-lg border border-[#00F0FF]/30 text-[#00F0FF] text-sm font-medium hover:bg-[#00F0FF]/10 transition-colors"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <h2 className="text-xl font-bold text-white mb-2">Send a Message</h2>

                      {/* Name */}
                      <div>
                        <label className="flex items-center gap-2 text-sm text-[#A0AEC0] mb-2">
                          <User className="w-4 h-4" />
                          Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={e => handleChange('name', e.target.value)}
                          placeholder="Your name"
                          className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-[#6B7280] outline-none transition-all duration-200 focus:border-[#00F0FF] focus:ring-2 focus:ring-[#00F0FF]/20 ${errors.name ? 'border-[#FF4757]' : 'border-white/10'}`}
                        />
                        {errors.name && <p className="text-xs text-[#FF4757] mt-1">{errors.name}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="flex items-center gap-2 text-sm text-[#A0AEC0] mb-2">
                          <Mail className="w-4 h-4" />
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={e => handleChange('email', e.target.value)}
                          placeholder="your@email.com"
                          className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-[#6B7280] outline-none transition-all duration-200 focus:border-[#00F0FF] focus:ring-2 focus:ring-[#00F0FF]/20 ${errors.email ? 'border-[#FF4757]' : 'border-white/10'}`}
                        />
                        {errors.email && <p className="text-xs text-[#FF4757] mt-1">{errors.email}</p>}
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="flex items-center gap-2 text-sm text-[#A0AEC0] mb-2">
                          <MessageSquare className="w-4 h-4" />
                          Subject
                        </label>
                        <div className="relative">
                          <select
                            value={formData.subject}
                            onChange={e => handleChange('subject', e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white outline-none transition-all duration-200 focus:border-[#00F0FF] focus:ring-2 focus:ring-[#00F0FF]/20 appearance-none ${errors.subject ? 'border-[#FF4757]' : 'border-white/10'}`}
                          >
                            <option value="" disabled>Select a subject</option>
                            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
                        </div>
                        {errors.subject && <p className="text-xs text-[#FF4757] mt-1">{errors.subject}</p>}
                      </div>

                      {/* Message */}
                      <div>
                        <label className="flex items-center gap-2 text-sm text-[#A0AEC0] mb-2">
                          <MessageSquare className="w-4 h-4" />
                          Message
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={e => handleChange('message', e.target.value)}
                          placeholder="How can we help you?"
                          rows={5}
                          className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-[#6B7280] outline-none transition-all duration-200 focus:border-[#00F0FF] focus:ring-2 focus:ring-[#00F0FF]/20 resize-none ${errors.message ? 'border-[#FF4757]' : 'border-white/10'}`}
                        />
                        {errors.message && <p className="text-xs text-[#FF4757] mt-1">{errors.message}</p>}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#B24CFF] text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform duration-300 disabled:opacity-70"
                      >
                        {submitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
