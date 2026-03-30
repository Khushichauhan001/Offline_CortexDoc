import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '../context/ToastContext'
import { BsCheckCircle, BsExclamationCircle, BsInfoCircle, BsX } from 'react-icons/bs'

const icons = {
  success: <BsCheckCircle className="w-5 h-5 text-green-400" />,
  error: <BsExclamationCircle className="w-5 h-5 text-red-400" />,
  info: <BsInfoCircle className="w-5 h-5 text-blue-400" />,
}

export default function Toast() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="glass dark:glass px-4 py-3 rounded-xl shadow-lg flex items-start gap-3 min-w-[280px]"
          >
            <div className="flex-shrink-0 mt-0.5">{icons[toast.type] || icons.info}</div>
            <p className="flex-1 text-sm font-medium text-slate-800 dark:text-white">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors"
              aria-label="Close"
            >
              <BsX className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
