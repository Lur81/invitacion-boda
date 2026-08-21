import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./styles/theme.css";
import "./styles/sections.css";
import "./styles/intro-envelope.css";
import "./styles/hero.css";
import "./styles/story.css";
import "./styles/countdown.css";
import "./styles/event.css";
import "./styles/rsvp.css";
import "./styles/gallery.css";
import "./styles/album.css";
import "./styles/music.css";
import "./styles/gift.css";
import "./styles/footer.css";
import "./styles/animations.css";
import "./styles/music-player.css";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
