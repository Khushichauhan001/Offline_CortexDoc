import { motion } from 'framer-motion'
import { BsStars } from 'react-icons/bs'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative py-12 px-6 border-t border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BsStars className="w-6 h-6 text-purple-500" />
          <span className="text-lg font-bold text-gradient">CortexDoc</span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} CortexDoc. Built with React + Vite. Powered by offline AI.
        </p>
      </div>
    </motion.footer>
  )
}
