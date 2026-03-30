import { motion } from 'framer-motion'
import { BsSun, BsMoon } from 'react-icons/bs'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative p-2 rounded-full glass dark:glass hover:glow-purple-sm transition-all duration-300"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <BsMoon className="w-5 h-5 text-purple-400" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center"
      >
        <BsSun className="w-5 h-5 text-orange-500" />
      </motion.div>
    </motion.button>
  )
}
