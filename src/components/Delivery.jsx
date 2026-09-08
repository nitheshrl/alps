import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const deliveryFeatures = [
  { icon: '🛵', title: 'Free Delivery', desc: 'Free delivery up to 5km from our shop' },
  { icon: '⏰', title: '1:30 PM – 10 PM', desc: 'Order anytime during our delivery hours' },
  { icon: '📱', title: 'Easy Ordering', desc: 'Call or WhatsApp to place your order' },
]

export default function Delivery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="delivery" ref={ref}>
      <motion.span
        className="section-label"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
      >
        Delivery
      </motion.span>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
      >
        We <em>Deliver</em> to You!
      </motion.h2>

      <motion.p
        className="section-desc"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        Craving Alps? Enjoy our coffee, burgers, snacks, and sandwiches delivered
        hot and fresh right to your doorstep.
      </motion.p>

      <div className="delivery-cards">
        {deliveryFeatures.map((f, i) => (
          <motion.div
            key={f.title}
            className="delivery-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.15 }}
          >
            <div className="icon">{f.icon}</div>
            <h4>{f.title}</h4>
            <p>{f.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        style={{ textAlign: 'center', marginTop: '3rem' }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6 }}
      >
        <a href="tel:+919876543210" className="btn-primary">
          📞 Call to Order Now
        </a>
      </motion.div>
    </section>
  )
}
