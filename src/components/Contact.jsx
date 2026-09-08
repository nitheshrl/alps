import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <>
      <section id="contact" className="contact-section" ref={ref}>
        <motion.span
          className="section-label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Get in Touch
        </motion.span>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          Visit <em>Alps Cafe</em>
        </motion.h2>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="contact-item">
              <div className="icon">📍</div>
              <div>
                <h4>Location</h4>
                <p>Nagercoil, Tamil Nadu, India</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon">⏰</div>
              <div>
                <h4>Hours</h4>
                <p>Daily: 1:30 PM – 10:00 PM</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon">📱</div>
              <div>
                <h4>Instagram</h4>
                <p>
                  <a href="https://instagram.com/alpscafenagercoil" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--orange-light)' }}>
                    @alpscafenagercoil
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-item">
              <div className="icon">📞</div>
              <div>
                <h4>Phone</h4>
                <p>Call us to order or book events</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <textarea
              placeholder="Your message — bookings, feedback, job applications..."
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
              {sent ? '✓ Message Sent!' : 'Send Message →'}
            </button>
          </motion.form>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="nav-title">ALPS CAFE</div>
            <p>Brew · Bite · Belong — Nagercoil's favorite rooftop cafe.</p>
          </div>
          <ul className="footer-links">
            <li><a href="#about">About</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#rooftop">Rooftop</a></li>
            <li><a href="#delivery">Delivery</a></li>
            <li><a href="#careers">Careers</a></li>
          </ul>
          <div className="footer-social">
            <a href="https://instagram.com/alpscafenagercoil" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="WhatsApp">💬</a>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} Alps Cafe Nagercoil. All rights reserved.
        </div>
      </footer>
    </>
  )
}
