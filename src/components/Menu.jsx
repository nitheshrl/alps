import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const categories = ['All', 'Starters', 'Loaded Fries', 'Momos', 'Wings & Popcorn', 'Burgers', 'Drinks', 'Pastas', 'Combos']

const menuItems = [
  { name: 'Crispy Chicken', desc: 'Golden, crunchy chicken bites', price: '₹149', emoji: '🍗', cat: 'Starters' },
  { name: 'Chicken 65', desc: 'South Indian spiced chicken bites', price: '₹149', emoji: '🍗', cat: 'Starters' },
  { name: 'Chicken Lollipop', desc: 'Crispy chicken wings on the bone', price: '₹179', emoji: '🍗', cat: 'Starters' },
  { name: 'Peri Peri Chicken', desc: 'Chicken tossed in peri peri spice', price: '₹169', emoji: '🌶️', cat: 'Starters' },
  { name: 'Korean Hot Chilli Veg Momos', desc: 'Crispy tossed vegetable momos', price: '₹129', emoji: '🥟', cat: 'Momos' },
  { name: 'Tibet Dragon Veg Momos', desc: 'Crispy tossed vegetable momos', price: '₹129', emoji: '🥟', cat: 'Momos' },
  { name: 'Spanish Chilli Herby Non Veg Momos', desc: 'Crispy tossed non-veg momos', price: '₹139', emoji: '🥟', cat: 'Momos' },
  { name: 'Mongolian Hot Pepper Non Veg Momos', desc: 'Crispy tossed non-veg momos', price: '₹139', emoji: '🥟', cat: 'Momos' },
  { name: 'Mexicana Cheese Chicken Popcorn', desc: 'Chicken popcorn with Mexican cheese', price: '₹149', emoji: '🍿', cat: 'Wings & Popcorn' },
  { name: 'Lemon Garlic & Herb Chicken Popcorn', desc: 'Bright lemon, garlic and herb seasoning', price: '₹149', emoji: '🍿', cat: 'Wings & Popcorn' },
  { name: 'Chilli Garlic Chicken Popcorn', desc: 'Crisp chicken with chilli garlic', price: '₹149', emoji: '🍿', cat: 'Wings & Popcorn' },
  { name: 'Mexicana Cheese Golden Crunchy Wings', desc: 'Crunchy wings with Mexican cheese', price: '₹159', emoji: '🍗', cat: 'Wings & Popcorn' },
  { name: 'Veg Loaded Fries', desc: 'Fries piled with savoury veg toppings', price: '₹149', emoji: '🍟', cat: 'Loaded Fries' },
  { name: 'Peri Peri Loaded Fries', desc: 'Loaded fries with peri peri seasoning', price: '₹169', emoji: '🍟', cat: 'Loaded Fries' },
  { name: 'Tikka Chicken Loaded Fries', desc: 'Loaded fries with tikka chicken', price: '₹169', emoji: '🍟', cat: 'Loaded Fries' },
  { name: 'Korean Loaded Fries', desc: 'Loaded fries with Korean-style toppings', price: '₹179', emoji: '🍟', cat: 'Loaded Fries' },
  { name: 'Grilled Paneer Burger', desc: 'Grilled paneer with fresh burger toppings', price: '₹199', emoji: '🍔', cat: 'Burgers' },
  { name: 'Sweet Heat Island Burger', desc: 'Sweet and spicy crafted burger', price: '₹219', emoji: '🍔', cat: 'Burgers' },
  { name: 'Alps Signature Burger', desc: 'The house crafted burger', price: '₹249', emoji: '🍔', cat: 'Burgers' },
  { name: 'Crispy Chicken Burger', desc: 'Crispy chicken in a toasted bun', price: '₹219', emoji: '🍔', cat: 'Burgers' },
  { name: 'Veg White Sauce Pasta', desc: 'Creamy white sauce pasta with vegetables', price: '₹149', emoji: '🍝', cat: 'Pastas' },
  { name: 'Non-Veg White Sauce Pasta', desc: 'Creamy white sauce pasta with chicken', price: '₹179', emoji: '🍝', cat: 'Pastas' },
  { name: 'Veg Red Sauce Pasta', desc: 'Pasta in a rich tomato red sauce', price: '₹149', emoji: '🍝', cat: 'Pastas' },
  { name: 'Non-Veg Red Sauce Pasta', desc: 'Tomato red sauce pasta with chicken', price: '₹179', emoji: '🍝', cat: 'Pastas' },
  { name: 'Cookie & Cream Milkshake', desc: 'Creamy cookie shake, 350 ml', price: '₹129 / ₹149', emoji: '🥤', cat: 'Drinks' },
  { name: 'French Vanilla Milkshake', desc: 'Smooth vanilla shake, 350 ml', price: '₹129 / ₹149', emoji: '🥤', cat: 'Drinks' },
  { name: 'Iced Strawberry Mocha', desc: 'Chilled strawberry mocha, 350 ml', price: '₹169', emoji: '🧋', cat: 'Drinks' },
  { name: 'Pink Lagoon', desc: 'Fruity sparkling mocktail, 350 ml', price: '₹149', emoji: '🍹', cat: 'Drinks' },
  { name: 'Blue Curacao Mojito', desc: 'Blue curacao mojito, 350 ml', price: '₹99', emoji: '🍹', cat: 'Drinks' },
  { name: 'Blueberry Mojito', desc: 'Fresh blueberry mojito, 350 ml', price: '₹99', emoji: '🍹', cat: 'Drinks' },
  { name: 'Mango Cheesecake Combo', desc: 'A sweet combo to finish your meal', price: '₹249', emoji: '🍰', cat: 'Combos' },
  { name: 'Burger + Fries + Mocha', desc: 'Burger served with fries and iced mocha', price: '₹299', emoji: '🍔', cat: 'Combos' },
  { name: 'Wrap + Fries + Mojito', desc: 'Wrap served with fries and mojito', price: '₹279', emoji: '🌯', cat: 'Combos' },
  { name: 'Pasta + Mojito', desc: 'A pasta and mojito pairing', price: '₹249', emoji: '🍝', cat: 'Combos' },
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
        From crispy starters and loaded fries to crafted burgers, pastas and refreshing drinks — every dish is made to order.
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
