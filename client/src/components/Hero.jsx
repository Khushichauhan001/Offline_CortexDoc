import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'

export default function Hero() {
  const navigate = useNavigate()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto text-center"
      >
        {/* Title */}
        <motion.h1 variants={item} className="text-6xl md:text-8xl font-black mb-6">
          <span className="text-gradient">AI Document Assistant</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12 font-medium"
        >
          Query your documents intelligently using{' '}
          <span className="text-purple-500 font-bold">offline AI</span>
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={item}>
          <motion.button
            onClick={() => navigate('/app')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-full shadow-2xl glow-purple hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            Get Started
            <BsArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
