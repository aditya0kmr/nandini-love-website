import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import './FloatingNav.css'
import { useEffect, useRef, useState } from 'react'

function FloatingNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const navRef = useRef(null)
  const itemsRef = useRef([])
  const [slideAmount, setSlideAmount] = useState(0)

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
        const proximity = 1 - (distance / influenceRadius)
        
        // Apply perspective transform based on mouse position
        const tiltX = Math.sin(angle) * proximity * 8
        const tiltY = -Math.cos(angle) * proximity * 8
        const scaleEffect = 1 + proximity * 0.05
        
        // Calculate horizontal sliding for nav panel AND icons
        const navSlideAmount = (mouseX - window.innerWidth / 2) / (window.innerWidth / 2) * 50
        setSlideAmount(navSlideAmount)
        
        nav.style.transform = `translateX(calc(-50% + ${navSlideAmount}px)) perspective(1000px) rotateX(${2 + tiltY}deg) rotateY(${tiltX}deg) scale(${scaleEffect})`
        
        // Apply magnetic effect to individual items WITH horizontal sliding
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
            
            // Icons also slide horizontally with the same amount
            item.style.transform = `translateY(${magnetY}px) translateX(${magnetX + navSlideAmount * 0.5}px) scale(${1 + itemProximity * 0.1})`
          } else {
            // Icons still slide horizontally even without magnetic attraction
            item.style.transform = `translateX(${navSlideAmount * 0.3}px)`
          }
        })
      } else {
        // Reset when mouse is far
        nav.style.transform = 'translateX(-50%) perspective(1000px) rotateX(2deg) rotateZ(-1deg)'
        setSlideAmount(0)
        itemsRef.current.forEach(item => {
          if (item) item.style.transform = ''
        })
      }
    }
    
    const handleMouseLeave = () => {
      if (navRef.current) {
        navRef.current.style.transform = 'translateX(-50%) perspective(1000px) rotateX(2deg) rotateZ(-1deg)'
      }
      setSlideAmount(0)
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
