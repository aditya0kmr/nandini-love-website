import { Link, useLocation } from 'react-router-dom'

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
  ]

  return (
    <nav className="floating-nav">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          title={item.title}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

export default FloatingNav
