import { motion } from 'framer-motion'
import { User, GraduationCap, BookOpen, Award, Code, Brain, Lightbulb } from 'lucide-react'

const skills = [
  { label: 'Machine Learning', color: '#00F0FF' },
  { label: 'Cybersecurity', color: '#B24CFF' },
  { label: 'Data Analysis', color: '#00F0FF' },
  { label: 'UI/UX Design', color: '#B24CFF' },
  { label: 'Research', color: '#00F0FF' },
  { label: 'Python', color: '#B24CFF' },
]

const achievements = [
  { icon: Lightbulb, title: 'Project Concept', desc: 'Developed the original idea and vision for LinkShield AI' },
  { icon: Code, title: 'Frontend Development', desc: 'Built the modern React interface with animations and interactivity' },
  { icon: Brain, title: 'Research & Testing', desc: 'Conducted extensive testing and validation of the AI model' },
]

export default function AboutAmira() {
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00F0FF]/10 rounded-full blur-[150px]" />
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
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#B24CFF] to-[#00F0FF] p-[3px]">
                <div className="w-full h-full rounded-full bg-[#13162B] flex items-center justify-center">
                  <User className="w-16 h-16 text-[#A0AEC0]" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[#B24CFF]/20 border border-[#B24CFF]/40 flex items-center justify-center">
                <Award className="w-5 h-5 text-[#B24CFF]" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Amira Ammar</h1>
            <p className="text-lg text-gradient font-semibold mb-4">AI & Cybersecurity Researcher</p>
            <div className="flex items-center gap-2 text-[#A0AEC0]">
              <GraduationCap className="w-5 h-5 text-[#00F0FF]" />
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
              <BookOpen className="w-6 h-6 text-[#B24CFF]" />
              <h2 className="text-2xl font-bold text-white">About the Project</h2>
            </div>

            <div className="space-y-4 text-[#A0AEC0] leading-relaxed">
              <p>
                The internet should be a safe space for everyone, but <span className="text-[#FF4757] font-semibold">cybercriminals</span> continue to exploit unsuspecting users through cleverly disguised malicious links. As students of Educational Technology, we recognized an opportunity to apply AI to solve this real-world problem.
              </p>
              <p>
                LinkShield AI represents my belief that <span className="text-[#B24CFF] font-semibold">technology should serve people</span>. By combining machine learning with an intuitive user interface, we've created a tool that makes advanced cybersecurity accessible to students, families, and anyone who uses the internet.
              </p>
              <p>
                Working on this project has been an incredible journey of learning and innovation. From researching phishing detection techniques to designing user-friendly interfaces, every step reinforced the importance of <span className="text-[#00F0FF] font-semibold">interdisciplinary collaboration</span> in solving complex problems.
              </p>
              <p>
                My vision for LinkShield AI extends beyond this academic project — I hope it inspires others to explore how artificial intelligence can protect and empower everyday users in our increasingly connected world.
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
                    className="glass rounded-xl p-6 border border-white/10 text-center hover:border-[#B24CFF]/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#B24CFF]/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-[#B24CFF]" />
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
