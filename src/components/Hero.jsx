import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero-badge"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <span className="dot" />
        Open Daily · 1:30 PM – 10:00 PM
        Open Daily · 11:30 AM – 10:30 PM
      </motion.div>

      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        ALPS
        <span className="line2">CAFE</span>
      </motion.h1>

      <motion.p
        className="hero-tagline"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <span>Brew</span> · <span>Bite</span> · <span>Belong</span>
      </motion.p>

      <motion.div
        className="hero-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <a href="#menu" className="btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' }) }}>
          Explore Menu →
        </a>
        <a href="#rooftop" className="btn-secondary" onClick={(e) => { e.preventDefault(); document.querySelector('#rooftop')?.scrollIntoView({ behavior: 'smooth' }) }}>
          Book Rooftop
        </a>
      </motion.div>

      <motion.div
        className="hero-stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="stat-item">
          <h3>5km</h3>
          <p>Free Delivery Radius</p>
        </div>
        <div className="stat-item">
          <h3>10%</h3>
          <p>Student Discount</p>
        </div>
        <div className="stat-item">
          <h3>★ 4.8</h3>
          <p>Loved by Nagercoil</p>
        </div>
      </motion.div>
    </section>
  )
}
