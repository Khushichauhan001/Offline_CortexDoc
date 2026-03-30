# Frontend Quick Start Guide

## 🚀 Running the Frontend

### 1. Navigate to client folder
```bash
cd client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

The app will automatically open at **http://localhost:3000**

---

## ✅ What's Included

### Landing Page (`/`)
- **Hero section** with animated gradient text
- **Features grid** showcasing 4 key capabilities
- **Dark/light mode toggle** (top-right)
- **"Get Started" button** → navigates to `/app`

### App Page (`/app`)
- **Sidebar** (left):
  - "Upload PDF" button
  - One-click file selection
  - Auto-upload on file select
  - Success card with chunk count
- **Chat area** (right):
  - Welcome message (when empty)
  - User/AI message bubbles
  - Typing animation for AI responses
  - Auto-scroll to latest message
- **Input box** (bottom):
  - Ask questions
  - Press Enter or click send
  - Loading indicator during query

---

## 🔌 Backend Connection

The frontend is configured to connect to:
```
http://127.0.0.1:8000
```

**Make sure your backend is running before using the app.**

### Endpoints Used:
- `POST /upload` - Upload PDF
- `GET /query?q=...` - Ask questions

---

## 🎨 UI Features

✨ **Glassmorphism** cards with gradient accents  
🌓 **Dark/light mode** with localStorage persistence  
🎭 **Framer Motion** animations throughout  
💬 **Toast notifications** for success/error feedback  
⌨️ **Enter key** support in chat input  
📱 **Fully responsive** design  

---

## 📦 Tech Stack

- React 18.3.1
- Vite 5.1.4
- Tailwind CSS 3.4.1
- Framer Motion 11.0.5
- Axios 1.6.7
- React Router 6.22.1
- React Icons 5.0.1

---

## 🛠 Troubleshooting

### Port 3000 already in use?
Kill the process or change port in `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3001, // change here
  },
})
```

### Backend not responding?
- Check backend is running at `http://127.0.0.1:8000`
- Test endpoints manually: `curl http://127.0.0.1:8000`

### Build errors?
```bash
rm -rf node_modules package-lock.json
npm install
```

---

**For detailed documentation, see `client/README.md`**
