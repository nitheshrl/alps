import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  {
    icon: '☕',
    title: 'Artisan Coffee',
    desc: 'Freshly brewed espresso, cold brews, and signature milkshakes crafted with love.',
  },
  {
    icon: '🍔',
    title: 'Gourmet Burgers',
    desc: 'Juicy, stacked burgers with premium ingredients and house-made sauces.',
  },
  {
    icon: '🏔',
    title: 'Rooftop Vibes',
    desc: 'Stunning rooftop dining under fairy lights with panoramic city views.',
  },
  {
    icon: '🤝',
    title: 'Community Hub',
    desc: 'A cozy space where friends gather, students unwind, and memories are made.',
  },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref}>
      <motion.span
        className="section-label"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Our Story
      </motion.span>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Where Every Cup Tells a <em>Story</em>
      </motion.h2>

      <motion.p
        className="section-desc"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Nestled in the heart of Nagercoil, Alps Cafe is your go-to destination for
        great food, warm ambiance, and unforgettable rooftop experiences. From our
        signature burgers to artisan coffee — we brew moments worth savoring.
      </motion.p>

      <div className="cards-grid">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="card"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
          >
            <div className="card-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
