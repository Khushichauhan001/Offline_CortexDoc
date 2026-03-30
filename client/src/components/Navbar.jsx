import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BsStars } from 'react-icons/bs'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass backdrop-blur-xl shadow-xl' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <BsStars className="w-7 h-7 text-purple-500" />
          <span className="text-xl font-bold text-gradient">CortexDoc</span>
        </div>

        {/* Right: Theme Toggle */}
        <ThemeToggle />
      </div>
    </motion.nav>
  )
}
