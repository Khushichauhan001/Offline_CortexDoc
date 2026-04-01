import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import ChatMessage from '../components/ChatMessage'
import ChatInput from '../components/ChatInput'
import ThemeToggle from '../components/ThemeToggle'
import AnimatedBackground from '../components/AnimatedBackground'
import { queryDocument } from '../services/api'
import { useToast } from '../context/ToastContext'
import { BsStars } from 'react-icons/bs'

export default function AppPage() {
  const { addToast } = useToast()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [typingMessageId, setTypingMessageId] = useState(null)
  const chatContainerRef = useRef(null)

  // Auto scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (question) => {
    const userMessage = { id: Date.now(), role: 'user', content: question }
    setMessages((prev) => [...prev, userMessage])
    setLoading(true)

    try {
      const response = await queryDocument(question)
      const aiMessageId = Date.now() + 1
      const aiMessage = {
        id: aiMessageId,
        role: 'ai',
        content: response.answer || response.response || 'No response received.',
        sources: response.sources || [] 
      }
      setTypingMessageId(aiMessageId)
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error(error)
      addToast(error.response?.data?.detail || 'Failed to get response', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex h-screen overflow-hidden">
      <AnimatedBackground />

      {/* Sidebar */}
      <Sidebar onUploadComplete={() => {}} />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="glass dark:glass border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BsStars className="w-6 h-6 text-purple-500" />
            <h1 className="text-xl font-bold text-gradient">CortexDoc</h1>
          </div>
          <ThemeToggle />
        </div>

        {/* Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-6 py-8 space-y-6"
        >
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="h-full flex items-center justify-center"
            >
              <div className="text-center space-y-4 max-w-md">
                <BsStars className="w-16 h-16 text-purple-500 mx-auto" />
                <h2 className="text-2xl font-bold text-gradient">
                  Welcome to CortexDoc
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Upload a PDF from the sidebar and start asking questions about your
                  document.
                </p>
              </div>
            </motion.div>
          ) : (
            messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isTyping={msg.id === typingMessageId}
              />
            ))
          )}
        </div>

        {/* Input */}
        <ChatInput onSend={handleSendMessage} loading={loading} />
      </div>
    </div>
  )
}
