# CortexDoc Frontend

A modern, production-level React frontend for an AI-powered document Q&A system. Features a stunning landing page with glassmorphism UI and a ChatGPT-like interface.

## ✨ Features

### UI/UX
- **Dark/Light Mode**: Persistent theme toggle with smooth transitions
- **Glassmorphism Design**: Modern glass-effect cards with gradient accents
- **Framer Motion Animations**: Smooth page transitions, staggered reveals, and viewport animations
- **Animated Background**: Floating gradient orbs with dynamic grid overlay
- **Responsive Design**: Mobile-first approach, works on all screen sizes

### Landing Page
- **Hero Section**: Eye-catching gradient text with staggered animation
- **Features Grid**: 4 animated cards showcasing key capabilities
- **Smooth Scroll**: Animated navbar with blur-on-scroll effect
- **Professional Footer**: Clean, minimal branding

### Chat Interface
- **ChatGPT-like Layout**: Familiar, intuitive design
- **Typing Animation**: Character-by-character reveal for AI responses
- **Auto-scroll**: Messages automatically scroll into view
- **Loading States**: Smooth loading indicators for uploads and queries
- **Toast Notifications**: Success/error feedback with auto-dismiss

### File Upload
- **One-Click Upload**: Simple file picker integration
- **Automatic Processing**: PDF auto-uploads on selection
- **Status Display**: Shows filename and chunk count after indexing
- **Visual Feedback**: Progress indicators and success states

## 🛠 Tech Stack

- **React** (18.3.1) - UI library
- **Vite** (5.1.4) - Build tool and dev server
- **React Router** (6.22.1) - Client-side routing
- **Framer Motion** (11.0.5) - Animation library
- **Tailwind CSS** (3.4.1) - Utility-first CSS
- **Axios** (1.6.7) - HTTP client
- **React Icons** (5.0.1) - Icon library

## 📁 Project Structure

```
client/
├── public/
│   └── favicon.svg           # Custom brand icon
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.jsx    # Floating gradient orbs
│   │   ├── ChatInput.jsx             # Message input with Enter support
│   │   ├── ChatMessage.jsx           # User/AI message bubbles
│   │   ├── Features.jsx              # Features grid section
│   │   ├── Footer.jsx                # Landing page footer
│   │   ├── Hero.jsx                  # Landing hero section
│   │   ├── LoadingDots.jsx           # 3-dot bounce loader
│   │   ├── Navbar.jsx                # Sticky navbar with blur
│   │   ├── Sidebar.jsx               # PDF upload sidebar
│   │   ├── ThemeToggle.jsx           # Dark/light mode switch
│   │   ├── Toast.jsx                 # Notification system
│   │   └── TypingText.jsx            # Character-by-character animation
│   ├── context/
│   │   ├── ThemeContext.jsx          # Dark/light theme state
│   │   └── ToastContext.jsx          # Toast notification state
│   ├── pages/
│   │   ├── LandingPage.jsx           # Main landing page
│   │   └── AppPage.jsx               # Chat interface page
│   ├── services/
│   │   └── api.js                    # Axios API wrapper
│   ├── App.jsx                       # Root component with routing
│   ├── index.css                     # Global styles + Tailwind
│   └── main.jsx                      # App entry point
├── index.html                # HTML template
├── tailwind.config.js        # Tailwind configuration
├── vite.config.js            # Vite configuration
└── package.json              # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- Backend server running at `http://127.0.0.1:8000`

### Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔌 Backend Integration

The frontend connects to the following backend endpoints:

### POST `/upload`
Upload a PDF file for indexing.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `{ file: File }`

**Response:**
```json
{
  "num_chunks": 42,
  "message": "Success"
}
```

### GET `/query`
Query the indexed document.

**Request:**
- Method: `GET`
- Query: `?q=your question here`

**Response:**
```json
{
  "answer": "The answer to your question...",
  "context": "..."
}
```

## 🎨 Design System

### Colors
- **Primary**: Purple gradient (`#a855f7` → `#3b82f6`)
- **Background (Dark)**: `#0a0a0f` (slate-950)
- **Background (Light)**: `#f8fafc` (slate-50)
- **Glass Effect**: `rgba(255,255,255,0.05)` with backdrop blur

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300-900

### Animations
- **Float**: 6s ease-in-out infinite
- **Pulse Glow**: 3s ease-in-out infinite
- **Gradient X**: 8s ease infinite

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ⚙️ Configuration

### API Base URL
Edit `src/services/api.js` to change the backend URL:
```javascript
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 120_000,
})
```

### Theme Persistence
Theme preference is saved in `localStorage` under the key `cortexdoc-theme`.

## 🧩 Key Features Explained

### Theme Toggle
- Persists across sessions using localStorage
- Applies `dark` class to `<html>` for Tailwind dark mode
- Animated sun/moon icons with rotation

### Typing Animation
- Streams AI responses character-by-character (20ms delay)
- Enhances user engagement
- Configurable speed per component

### Toast Notifications
- Auto-dismiss after 4 seconds
- Supports `success`, `error`, and `info` types
- Stacked positioning in top-right corner

### Auto-scroll
- Chat messages automatically scroll to bottom
- Triggers on new message or state change
- Smooth scrolling behavior

## 🐛 Troubleshooting

### Dev server won't start
- Ensure port 3000 is available
- Run `npm install` to ensure all dependencies are installed

### API calls failing
- Verify backend is running at `http://127.0.0.1:8000`
- Check browser console for CORS errors
- Ensure backend endpoints match expected schema

### Dark mode not persisting
- Clear browser cache and localStorage
- Check browser console for errors

## 📄 License

MIT

## 🤝 Contributing

This is a production-ready frontend. Feel free to extend with:
- Multi-document support
- Chat history persistence
- Export conversation feature
- Advanced search filters

---

Built with ❤️ using React + Vite. Powered by offline AI.
