import { useState } from 'react'
import { motion } from 'framer-motion'
import { BsSend } from 'react-icons/bs'
import LoadingDots from './LoadingDots'

export default function ChatInput({ onSend, loading = false }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return
    onSend(input.trim())
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass dark:glass border-t border-slate-200 dark:border-slate-800 p-4"
    >
      <div className="flex items-end gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about your document..."
          disabled={loading}
          rows={1}
          className="flex-1 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ minHeight: '48px', maxHeight: '120px' }}
        />
        <motion.button
          type="submit"
          disabled={!input.trim() || loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-xl shadow-lg hover:glow-purple-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <LoadingDots /> : <BsSend className="w-5 h-5" />}
        </motion.button>
      </div>
    </form>
  )
}
