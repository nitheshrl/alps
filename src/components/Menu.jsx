import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const categories = ['All', 'Burgers', 'Coffee', 'Snacks', 'Shakes']

const menuItems = [
  { name: 'Alps Signature Burger', desc: 'Double patty, cheese, special sauce', price: '₹249', emoji: '🍔', cat: 'Burgers' },
  { name: 'Classic Cheese Burger', desc: 'Juicy beef patty with melted cheddar', price: '₹199', emoji: '🍔', cat: 'Burgers' },
  { name: 'Crispy Chicken Burger', desc: 'Crunchy fried chicken with mayo', price: '₹219', emoji: '🍗', cat: 'Burgers' },
  { name: 'Espresso', desc: 'Rich, bold single shot', price: '₹89', emoji: '☕', cat: 'Coffee' },
  { name: 'Cappuccino', desc: 'Velvety foam, perfect balance', price: '₹129', emoji: '☕', cat: 'Coffee' },
  { name: 'Cold Brew', desc: 'Smooth 12-hour steeped coffee', price: '₹149', emoji: '🧊', cat: 'Coffee' },
  { name: 'Golden Fries', desc: 'Crispy seasoned potato fries', price: '₹99', emoji: '🍟', cat: 'Snacks' },
  { name: 'Grilled Sandwich', desc: 'Fresh veggies with cheese melt', price: '₹149', emoji: '🥪', cat: 'Snacks' },
  { name: 'Pasta Alfredo', desc: 'Creamy white sauce with herbs', price: '₹199', emoji: '🍝', cat: 'Snacks' },
  { name: 'Chocolate Shake', desc: 'Thick, rich Belgian chocolate', price: '₹159', emoji: '🥤', cat: 'Shakes' },
  { name: 'Mango Shake', desc: 'Fresh alphonso mango blend', price: '₹149', emoji: '🥭', cat: 'Shakes' },
  { name: 'Oreo Blast', desc: 'Crushed oreo with vanilla ice cream', price: '₹169', emoji: '🍨', cat: 'Shakes' },
]

export default function Menu() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? menuItems : menuItems.filter((item) => item.cat === active)

  return (
    <section id="menu" ref={ref}>
      <motion.span
        className="section-label"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
      >
        Our Menu
      </motion.span>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
      >
        Taste the <em>Alps</em> Difference
      </motion.h2>

      <motion.p
        className="section-desc"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        From hearty burgers to refreshing shakes — every dish is crafted with passion and the finest ingredients.
      </motion.p>

      <motion.div
        className="menu-categories"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3 }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            className={`menu-tab ${active === cat ? 'active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <motion.div className="menu-grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div
              key={item.name}
              className="menu-item"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <div className="menu-item-visual">{item.emoji}</div>
              <div className="menu-item-info">
                <h4>{item.name}</h4>
                <p>{item.desc}</p>
                <div className="menu-item-footer">
                  <span>{item.price}</span>
                  <button aria-label={`Add ${item.name}`}>+</button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
