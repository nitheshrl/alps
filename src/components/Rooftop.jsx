import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Rooftop() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="rooftop" ref={ref}>
      <motion.div
        className="feature-banner"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div>
          <span className="section-label">Rooftop & Events</span>
          <h3>
            Make Your Birthday<br />
            <span className="highlight">Extra Special!</span>
          </h3>
          <p className="section-desc" style={{ marginTop: '1rem' }}>
            Celebrate under the stars on our stunning rooftop terrace. Fairy lights,
            warm ambiance, and panoramic views — the perfect backdrop for your special day.
          </p>
          <ul className="feature-list">
            <li>Rooftop Rent FREE for birthday parties</li>
            <li>Perfect for surprise celebrations</li>
            <li>Customizable food & beverage packages</li>
            <li>Capacity for groups of 20–50 guests</li>
          </ul>
          <a
            href="#contact"
            className="btn-primary"
            style={{ marginTop: '1.5rem' }}
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            Book Your Event →
          </a>
        </div>
        <motion.div
          className="feature-visual"
          animate={inView ? { y: [0, -15, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          🎂✨
        </motion.div>
      </motion.div>
    </section>
  )
}
