import { NavLink, useLocation } from 'react-router-dom'
import './FloatingNav.css'

function FloatingNav() {
  const location = useLocation()

  // Don't show nav on login page
  if (location.pathname === '/login' || location.pathname === '/') {
    return null
  }

  const navItems = [
    { path: '/home', label: '🏠', title: 'Home' },
    { path: '/letters', label: '💌', title: 'Love Letters' },
    { path: '/gallery', label: '📸', title: 'Gallery' },
    { path: '/timeline', label: '📅', title: 'Timeline' },
    { path: '/poems', label: '📝', title: 'Poems & Quotes' },
    { path: '/games', label: '🎮', title: 'Games' },
    { path: '/future', label: '🔮', title: 'Our Future' },
    { path: '/favorites', label: '⭐', title: 'Favorites' },
    { path: '/her-corner', label: '♥️', title: 'Her Corner' },  ]

  return (
    <nav className="floating-nav">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => 
            `nav-item ${isActive ? 'active' : ''}`
          }
          title={item.title}
        >
          <span className="nav-emoji">{item.label}</span>
          <span className="nav-tooltip">{item.title}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default FloatingNav
