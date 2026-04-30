import { motion } from 'framer-motion'
import HeroSection from '@/sections/HeroSection'
import AnalyzerSection from '@/sections/AnalyzerSection'
import ScanHistorySection from '@/sections/ScanHistorySection'
import FeaturesSection from '@/sections/FeaturesSection'
import { useScanHistory } from '@/hooks/useScanHistory'

export default function Home() {
  const { history, addScan, clearHistory } = useScanHistory()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HeroSection />
      <AnalyzerSection onScanComplete={addScan} />
      <ScanHistorySection history={history} onClear={clearHistory} />
      <FeaturesSection />
    </motion.div>
  )
}
