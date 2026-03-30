import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BsFileEarmarkPdf, BsCloudUpload, BsCheckCircleFill, BsFileEarmarkText, BsFileEarmarkImage, BsFileEarmarkWord, BsX } from 'react-icons/bs'
import { uploadFiles } from '../services/api'
import { useToast } from '../context/ToastContext'
import LoadingDots from './LoadingDots'

const FILE_ICONS = {
  pdf: BsFileEarmarkPdf,
  txt: BsFileEarmarkText,
  docx: BsFileEarmarkWord,
  image: BsFileEarmarkImage,
}

function getFileIcon(filename) {
  const ext = filename.split('.').pop().toLowerCase()
  if (ext === 'pdf') return FILE_ICONS.pdf
  if (ext === 'txt') return FILE_ICONS.txt
  if (ext === 'docx') return FILE_ICONS.docx
  if (['jpg', 'jpeg', 'png', 'bmp', 'tiff'].includes(ext)) return FILE_ICONS.image
  return BsFileEarmarkText
}

export default function Sidebar({ onUploadComplete }) {
  const { addToast } = useToast()
  const fileInputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([]) // Array of uploaded files

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Validate file types
    const allowedExtensions = ['pdf', 'txt', 'docx', 'jpg', 'jpeg', 'png', 'bmp', 'tiff']
    const invalidFiles = files.filter(file => {
      const ext = file.name.split('.').pop().toLowerCase()
      return !allowedExtensions.includes(ext)
    })

    if (invalidFiles.length > 0) {
      addToast(
        `Unsupported file type: ${invalidFiles[0].name}. Supported: PDF, TXT, DOCX, Images`,
        'error'
      )
      return
    }

    setUploading(true)
    try {
      const response = await uploadFiles(files)
      
      // Add uploaded files to the list
      const newFiles = response.files?.map(f => ({
        filename: f.filename,
        chunks: f.chunks || 0,
        status: f.status,
        error: f.error
      })) || []
      
      setUploadedFiles(prev => [...prev, ...newFiles])
      
      const successCount = newFiles.filter(f => f.status === 'success').length
      const failCount = newFiles.filter(f => f.status === 'error').length
      
      if (successCount > 0) {
        addToast(
          `${successCount} file(s) uploaded successfully! Total chunks: ${response.num_chunks}`,
          'success'
        )
      }
      if (failCount > 0) {
        addToast(`${failCount} file(s) failed to upload`, 'error')
      }
      
      if (onUploadComplete) onUploadComplete(response)
    } catch (error) {
      console.error(error)
      addToast(error.response?.data?.detail || 'Upload failed', 'error')
    } finally {
      setUploading(false)
      e.target.value = '' // Reset input
    }
  }

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="w-80 flex-shrink-0 glass dark:glass border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6">
      {/* Upload Button */}
      <motion.button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-lg glow-purple-sm hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? (
          <>
            <LoadingDots />
            <span>Uploading...</span>
          </>
        ) : (
          <>
            <BsCloudUpload className="w-5 h-5" />
            <span>Upload Files</span>
          </>
        )}
      </motion.button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.txt,.docx,.jpg,.jpeg,.png,.bmp,.tiff"
        onChange={handleFileChange}
        className="hidden"
        multiple
      />

      {/* Uploaded Files List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        <AnimatePresence>
          {uploadedFiles.map((file, index) => {
            const FileIcon = getFileIcon(file.filename)
            const isError = file.status === 'error'
            
            return (
              <motion.div
                key={`${file.filename}-${index}`}
                initial={{ opacity: 0, scale: 0.9, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                className={`glass dark:glass p-3 rounded-xl border ${
                  isError ? 'border-red-500/30' : 'border-green-500/30'
                }`}
              >
                <div className="flex items-start gap-2">
                  {isError ? (
                    <BsX className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <BsCheckCircleFill className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <FileIcon className="w-4 h-4 text-purple-500 flex-shrink-0" />
                      <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                        {file.filename}
                      </p>
                    </div>
                    {isError ? (
                      <p className="text-[10px] text-red-500">
                        {file.error || 'Upload failed'}
                      </p>
                    ) : (
                      <p className="text-[10px] text-slate-600 dark:text-slate-400">
                        {file.chunks} chunks indexed
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="flex-shrink-0 text-slate-500 hover:text-red-500 transition-colors"
                    aria-label="Remove"
                  >
                    <BsX className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
        <p>✓ PDF, TXT, DOCX, Images</p>
        <p>✓ Multiple file upload</p>
        <p>✓ Offline & secure</p>
      </div>
    </div>
  )
}
