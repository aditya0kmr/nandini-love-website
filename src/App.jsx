import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'

// Page imports
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import LoveLettersPage from './pages/LoveLettersPage'
import GalleryPage from './pages/GalleryPage'
import TimelinePage from './pages/TimelinePage'
import PoemsQuotesPage from './pages/PoemsQuotesPage'
import GamesPage from './pages/GamesPage'
import FuturePage from './pages/FuturePage'
import FavoritesPage from './pages/FavoritesPage'
import HerCornerPage from './pages/HerCornerPage'

// Component imports
import FloatingNav from './components/FloatingNav'
import ComplimentSystem from './components/ComplimentSystem'

// Style imports
import './styles/theme.css'
import './styles/responsive.css'
import './styles/ComplimentSystem.css'

function App() {
  return (
    <ThemeProvider>
      <div className="app page container">
        <FloatingNav />
        <ComplimentSystem />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/letters" element={<LoveLettersPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/poems" element={<PoemsQuotesPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/future" element={<FuturePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/her-corner" element={<HerCornerPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
