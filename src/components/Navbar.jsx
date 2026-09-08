import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const links = [
  { href: '#about', label: 'About' },
  { href: '#menu', label: 'Menu' },
  { href: '#rooftop', label: 'Rooftop' },
  { href: '#delivery', label: 'Delivery' },
  { href: '#careers', label: 'Careers' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#" className="nav-brand" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <div className="nav-logo" style={{
            background: 'linear-gradient(135deg, #e8751a, #c45a0a)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
          }}>⛰</div>
          <div>
            <div className="nav-title">ALPS CAFE</div>
            <div className="nav-tagline">Brew · Bite · Belong</div>
          </div>
        </a>

        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={(e) => { e.preventDefault(); handleNav(link.href) }}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#delivery" className="nav-cta" onClick={(e) => { e.preventDefault(); handleNav('#delivery') }}>
              Order Now
            </a>
          </li>
        </ul>

        <button className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span style={mobileOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
          <span style={mobileOpen ? { opacity: 0 } : {}} />
          <span style={mobileOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
        </button>
      </motion.nav>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); handleNav(link.href) }}>
            {link.label}
          </a>
        ))}
        <a href="#delivery" className="btn-primary" onClick={(e) => { e.preventDefault(); handleNav('#delivery') }}>
          Order Now
        </a>
      </div>
    </>
  )
}
