import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './enhancements.css'
import { PlayerProvider } from './context/PlayerContext'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlayerProvider>
      <App />
    </PlayerProvider>
  </StrictMode>,
)
