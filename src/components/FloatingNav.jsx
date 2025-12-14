import { NavLink, useLocation } from 'react-router-dom'
import './FloatingNav.css'
import { useEffect, useRef } from 'react'

function FloatingNav() {
  const location = useLocation()
  const navRef = useRef(null)
  const itemsRef = useRef([])

  // Don't show nav on login page
  if (location.pathname === '/login' || location.pathname === '/') {
    return null
  }

  // Mouse tracking effect for interactive sliding
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!navRef.current) return
      
      const nav = navRef.current
      const rect = nav.getBoundingClientRect()
      const navCenterX = rect.left + rect.width / 2
      const navCenterY = rect.top + rect.height / 2
      
      const mouseX = e.clientX
      const mouseY = e.clientY
      
      // Calculate distance from mouse to nav center
      const distX = mouseX - navCenterX
      const distY = mouseY - navCenterY
      const distance = Math.sqrt(distX * distX + distY * distY)
      
      // Radius of influence - nav reacts when mouse is within 300px
      const influenceRadius = 300
      
      if (distance < influenceRadius) {
        // Calculate the angle and apply subtle tilt
        const angle = Math.atan2(distY, distX)
        const proximity = 1 - (distance / influenceRadius) // 1 at center, 0 at edge
        
        // Apply perspective transform based on mouse position
        const tiltX = Math.sin(angle) * proximity * 8
        const tiltY = -Math.cos(angle) * proximity * 8
        const scaleEffect = 1 + proximity * 0.05
        
        // Add horizontal sliding based on cursor X position
        const slideAmount = (mouseX - window.innerWidth / 2) / (window.innerWidth / 2) * 30
        
        nav.style.transform = `translateX(calc(-50% + ${slideAmount}px)) perspective(1000px) rotateX(${2 + tiltY}deg) rotateY(${tiltX}deg) scale(${scaleEffect})`
        
        // Apply magnetic effect to individual items
        itemsRef.current.forEach((item, index) => {
          if (!item) return
          
          const itemRect = item.getBoundingClientRect()
          const itemCenterX = itemRect.left + itemRect.width / 2
          const itemCenterY = itemRect.top + itemRect.height / 2
          
          const itemDistX = mouseX - itemCenterX
          const itemDistY = mouseY - itemCenterY
          const itemDistance = Math.sqrt(itemDistX * itemDistX + itemDistY * itemDistY)
          
          const itemInfluenceRadius = 150
          
          if (itemDistance < itemInfluenceRadius) {
            const itemProximity = 1 - (itemDistance / itemInfluenceRadius)
            const magnetX = (itemDistX / itemDistance) * itemProximity * 15
            const magnetY = (itemDistY / itemDistance) * itemProximity * 15
            
            item.style.transform = `translateY(${magnetY}px) translateX(${magnetX}px) scale(${1 + itemProximity * 0.1})`
          } else {
            item.style.transform = ''
          }
        })
      } else {
        // Reset when mouse is far
        nav.style.transform = 'translateX(-50%) perspective(1000px) rotateX(2deg) rotateZ(-1deg)'
        itemsRef.current.forEach(item => {
          if (item) item.style.transform = ''
        })
      }
    }
    
    const handleMouseLeave = () => {
      if (navRef.current) {
        navRef.current.style.transform = 'translateX(-50%) perspective(1000px) rotateX(2deg) rotateZ(-1deg)'
      }
      itemsRef.current.forEach(item => {
        if (item) item.style.transform = ''
      })
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const navItems = [
    { path: '/home', label: '🏠', title: 'Home' },
    { path: '/letters', label: '💌', title: 'Love Letters' },
    { path: '/gallery', label: '📸', title: 'Gallery' },
    { path: '/timeline', label: '📅', title: 'Timeline' },
    { path: '/poems', label: '📝', title: 'Poems & Quotes' },
    { path: '/games', label: '🎮', title: 'Games' },
    { path: '/future', label: '🔮', title: 'Our Future' },
    { path: '/favorites', label: '⭐', title: 'Favorites' },
    { path: '/her-corner', label: '♥️', title: 'Her Corner' }, 
  ]

  return (
    <nav className="floating-nav" ref={navRef}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          ref={(el) => {
            if (el) itemsRef.current[navItems.indexOf(item)] = el
          }}
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
