import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import './FloatingNav.css'
import { useEffect, useRef, useState } from 'react'

function FloatingNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const navRef = useRef(null)
  const itemsRef = useRef([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Don't show nav on login page
  if (location.pathname === '/login' || location.pathname === '/') {
    return null
  }

  const navItems = [
    { path: '/home', label: '🏠', title: 'Home', key: '1' },
    { path: '/letters', label: '💌', title: 'Love Letters', key: '2' },
    { path: '/gallery', label: '📸', title: 'Gallery', key: '3' },
    { path: '/timeline', label: '📅', title: 'Timeline', key: '4' },
    { path: '/poems', label: '📝', title: 'Poems & Quotes', key: '5' },
    { path: '/games', label: '🎮', title: 'Games', key: '6' },
    { path: '/future', label: '🔮', title: 'Our Future', key: '7' },
    { path: '/favorites', label: '⭐', title: 'Favorites', key: '8' },
    { path: '/her-corner', label: '♥️', title: 'Her Corner', key: '9' }, 
  ]

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      
      // Press 'h' to go directly to Her Corner
      if (key === 'h') {
        navigate('/her-corner')
        return
      }
      
      // Press number keys (1-9) to jump to specific pages
      const numKey = parseInt(key)
      if (numKey >= 1 && numKey <= 9) {
        const item = navItems[numKey - 1]
        if (item) {
          navigate(item.path)
        }
        return
      }
      
      // Arrow keys for sequential navigation
      const currentIndex = navItems.findIndex(item => item.path === location.pathname.replace('/#', ''))
      
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        const nextIndex = (currentIndex + 1) % navItems.length
        navigate(navItems[nextIndex].path)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        const prevIndex = (currentIndex - 1 + navItems.length) % navItems.length
        navigate(navItems[prevIndex].path)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [location.pathname, navigate])

  // Circular mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      
      if (!navRef.current) return
      
      const nav = navRef.current
      const rect = nav.getBoundingClientRect()
      const navCenterX = rect.left + rect.width / 2
      const navCenterY = rect.top + rect.height / 2
      
      const mouseX = e.clientX
      const mouseY = e.clientY
      
      // Calculate distance and angle from nav center
      const distX = mouseX - navCenterX
      const distY = mouseY - navCenterY
      const distance = Math.sqrt(distX * distX + distY * distY)
      const angle = Math.atan2(distY, distX)
      
      // Influence radius
      const influenceRadius = 400
      const proximity = Math.max(0, 1 - (distance / influenceRadius))
      
      // Nav panel slight tilt
      const tiltX = Math.sin(angle) * proximity * 5
      const tiltY = -Math.cos(angle) * proximity * 5
      const scaleEffect = 1 + proximity * 0.02
      
      nav.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale(${scaleEffect})`
      
      // Circular arrangement for items
      const numItems = navItems.length
      const baseRadius = 80 // Base radius of the circle
      const maxRadiusChange = 40 // How much icons move from base radius
      
      itemsRef.current.forEach((item, index) => {
        if (!item) return
        
        // Calculate angle for this item in the circle
        const itemAngle = (index / numItems) * Math.PI * 2
        const itemX = Math.cos(itemAngle)
        const itemY = Math.sin(itemAngle)
        
        // Get item's current world position
        const itemRect = item.getBoundingClientRect()
        const itemCenterX = itemRect.left + itemRect.width / 2
        const itemCenterY = itemRect.top + itemRect.height / 2
        
        // Distance from mouse to this item
        const itemDistX = mouseX - itemCenterX
        const itemDistY = mouseY - itemCenterY
        const itemDistance = Math.sqrt(itemDistX * itemDistX + itemDistY * itemDistY)
        
        // Magnetic influence radius for each item
        const itemInfluenceRadius = 200
        const itemProximity = Math.max(0, 1 - (itemDistance / itemInfluenceRadius))
        
        // Calculate dynamic radius (items move outward when cursor is near)
        const dynamicRadius = baseRadius + (itemProximity * maxRadiusChange)
        
        // Calculate magnetic pull
        const magnetStrength = itemProximity * 20
        const magnetX = (itemDistX / Math.max(itemDistance, 1)) * magnetStrength
        const magnetY = (itemDistY / Math.max(itemDistance, 1)) * magnetStrength
        
        // Combine circular position with magnetic attraction
        const circleX = itemX * dynamicRadius
        const circleY = itemY * dynamicRadius
        
        const finalX = circleX + magnetX
        const finalY = circleY + magnetY
        
        // Scale based on proximity
        const itemScale = 1 + itemProximity * 0.15
        
        item.style.transform = `translate(${finalX}px, ${finalY}px) scale(${itemScale})`
        item.style.transition = 'none'
      })
    }
    
    const handleMouseLeave = () => {
      if (navRef.current) {
        navRef.current.style.transform = 'perspective(1000px) scale(1)'
      }
      itemsRef.current.forEach(item => {
        if (item) item.style.transform = 'translate(0, 0) scale(1)'
      })
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <nav className="floating-nav circular-nav" ref={navRef}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          ref={(el) => {
            if (el) itemsRef.current[navItems.indexOf(item)] = el
          }}
          to={item.path}
          className={({ isActive }) =>
            `nav-item circular-item ${isActive ? 'active' : ''}`
          }
          title={`${item.title} (Press ${item.key})`}
        >
          <span className="nav-emoji">{item.label}</span>
          <span className="nav-tooltip">{item.title}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default FloatingNav
