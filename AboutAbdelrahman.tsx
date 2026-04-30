import { motion } from 'framer-motion'
import { User, GraduationCap, BookOpen, Award, Code, Brain, Shield } from 'lucide-react'

const skills = [
  { label: 'Machine Learning', color: '#00F0FF' },
  { label: 'Cybersecurity', color: '#B24CFF' },
  { label: 'Python', color: '#00F0FF' },
  { label: 'Flask', color: '#B24CFF' },
  { label: 'Random Forest', color: '#00F0FF' },
  { label: 'AI Research', color: '#B24CFF' },
]

const achievements = [
  { icon: Brain, title: 'AI Model Development', desc: 'Built and trained the Random Forest classifier for URL detection' },
  { icon: Code, title: 'Backend Engineering', desc: 'Developed the Flask API and feature extraction pipeline' },
  { icon: Shield, title: 'Cybersecurity Research', desc: 'Researched phishing patterns and malicious URL characteristics' },
]

export default function AboutAbdelrahman() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-[72px]"
    >
      {/* Profile Header */}
      <section className="relative py-20 sm:py-28 bg-[#13162B] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B24CFF]/10 rounded-full blur-[150px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Avatar */}
            <div className="relative mb-6">
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#B24CFF] p-[3px]">
                <div className="w-full h-full rounded-full bg-[#13162B] flex items-center justify-center">
                  <User className="w-16 h-16 text-[#A0AEC0]" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF]/40 flex items-center justify-center">
                <Award className="w-5 h-5 text-[#00F0FF]" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Abdelrahman Mahmoud</h1>
            <p className="text-lg text-gradient font-semibold mb-4">AI & Cybersecurity Researcher</p>
            <div className="flex items-center gap-2 text-[#A0AEC0]">
              <GraduationCap className="w-5 h-5 text-[#B24CFF]" />
              <span>Faculty of Specific Education — Department of Educational Technology</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="relative py-24 bg-[#0B0D17]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-2xl p-8 sm:p-12 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-[#00F0FF]" />
              <h2 className="text-2xl font-bold text-white">About the Project</h2>
            </div>

            <div className="space-y-4 text-[#A0AEC0] leading-relaxed">
              <p>
                In today's digital landscape, <span className="text-[#00F0FF] font-semibold">cybersecurity threats</span> are more prevalent than ever. Phishing attacks, malicious links, and online scams affect millions of users daily, causing financial losses and compromising personal data.
              </p>
              <p>
                LinkShield AI was born from a passion for making advanced security technology accessible to everyone. As a student in the Department of Educational Technology, I believe that <span className="text-[#B24CFF] font-semibold">AI can be a powerful educational tool</span> — not just for experts, but for everyday internet users who need protection.
              </p>
              <p>
                This project represents a practical application of machine learning in cybersecurity. Using a <span className="text-[#00F0FF] font-semibold">Random Forest classifier</span> trained on thousands of real URLs, LinkShield AI demonstrates how AI can detect patterns invisible to the human eye and provide instant security assessments.
              </p>
              <p>
                The goal is simple: <span className="text-white font-semibold">empower users with knowledge</span>. When you understand why a link is dangerous, you're better equipped to protect yourself and others in your community.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section className="relative py-16 bg-[#13162B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-xl font-bold text-white text-center mb-8">Technical Skills & Expertise</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.label}
                  className="px-4 py-2 rounded-full border text-sm font-medium"
                  style={{ borderColor: `${skill.color}40`, color: skill.color, background: `${skill.color}10` }}
                >
                  {skill.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements */}
      <section className="relative py-24 bg-[#0B0D17]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-xl font-bold text-white text-center mb-10">Project Contributions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {achievements.map((ach, i) => {
                const Icon = ach.icon
                return (
                  <motion.div
                    key={ach.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="glass rounded-xl p-6 border border-white/10 text-center hover:border-[#00F0FF]/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#00F0FF]/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-[#00F0FF]" />
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-2">{ach.title}</h4>
                    <p className="text-xs text-[#A0AEC0]">{ach.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
