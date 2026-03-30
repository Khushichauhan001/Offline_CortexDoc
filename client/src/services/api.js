import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 120_000,
})

/**
 * Upload one or more files to the backend.
 * Supports: PDF, TXT, DOCX, images (JPG, PNG, etc.)
 * @param {File|File[]} files - Single file or array of files
 * @returns {Promise<object>} backend response with num_chunks and file details
 */
export async function uploadFiles(files) {
  const formData = new FormData()
  
  // Handle both single file and array of files
  const fileArray = Array.isArray(files) ? files : [files]
  
  fileArray.forEach((file) => {
    formData.append('files', file)
  })
  
  const { data } = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

// Backward compatibility alias
export const uploadPDF = uploadFiles

/**
 * Query the indexed document.
 * @param {string} question
 * @returns {Promise<object>} backend response
 */
export async function queryDocument(question) {
  const { data } = await api.get('/query', {
    params: { q: question },
  })
  return data
}

export default api
