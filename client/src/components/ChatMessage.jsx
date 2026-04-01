import { motion } from 'framer-motion'
import { BsPerson, BsStars } from 'react-icons/bs'
import TypingText from './TypingText'

export default function ChatMessage({ message, isTyping = false }) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-purple-600'
            : 'bg-gradient-to-br from-purple-500 to-pink-600'
        }`}
      >
        {isUser ? (
          <BsPerson className="w-5 h-5 text-white" />
        ) : (
          <BsStars className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={`max-w-[70%] px-5 py-3 rounded-2xl ${
          isUser
            ? 'bg-gradient-to-br from-blue-600 to-purple-700 text-white'
            : 'glass dark:glass text-slate-900 dark:text-white'
        }`}
      >
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {isTyping ? (
            <TypingText text={message.content} speed={20} />
          ) : (
            message.content
          )}
        </div>


        {/*  Sources */}
         {!isUser && message.sources && message.sources.length > 0 && (
           <div className="mt-2 space-y-1">
             {message.sources.map((src, i) => (
               <div key={i} className="text-xs text-gray-400">
                 📄 {src.file} (Page {src.page})
               </div>
             ))}
           </div>
         )}


      </div>
    </motion.div>
  )
}
