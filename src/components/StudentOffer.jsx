import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function StudentOffer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref}>
      <motion.div
        className="offer-section"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="offer-badge">STUDENT SPECIAL</span>
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>
          Good Food, <em>Better Vibes</em>
        </h2>
        <p className="section-desc" style={{ margin: '0 auto', textAlign: 'center' }}>
          School & college students get <strong style={{ color: 'var(--orange-light)' }}>5–10% off</strong> on
          bills above ₹399. Just show your valid student ID at checkout!
        </p>
        <motion.div
          style={{ marginTop: '2rem' }}
          animate={inView ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '3rem',
            fontWeight: 800,
            color: 'var(--orange-light)',
          }}>
            5–10% OFF
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
