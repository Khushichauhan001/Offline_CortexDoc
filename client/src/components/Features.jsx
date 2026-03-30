import { motion } from 'framer-motion'
import { BsCpu, BsShieldCheck, BsLightning, BsFiles } from 'react-icons/bs'

const features = [
  {
    icon: BsCpu,
    title: 'Offline AI Processing',
    description: 'All computation happens locally. No data leaves your machine.',
  },
  {
    icon: BsShieldCheck,
    title: 'Secure & Private',
    description: 'Your documents remain private. Zero telemetry, zero tracking.',
  },
  {
    icon: BsLightning,
    title: 'Fast Document Search',
    description: 'Instant semantic search powered by local vector embeddings.',
  },
  {
    icon: BsFiles,
    title: 'Multi-Document Support',
    description: 'Upload and query multiple documents at scale (coming soon).',
  },
]

export default function Features() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section id="features" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-center mb-16"
        >
          <span className="text-gradient">Why CortexDoc?</span>
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ scale: 1.03, y: -5 }}
              className="glass dark:glass p-6 rounded-2xl hover:glow-purple-sm transition-all duration-300 cursor-pointer"
            >
              <feature.icon className="w-10 h-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
