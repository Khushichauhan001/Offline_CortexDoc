import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import LandingPage from './pages/LandingPage'
import AppPage from './pages/AppPage'
import Toast from './components/Toast'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<AppPage />} />
          </Routes>
          <Toast />
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
