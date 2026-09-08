import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const jobs = [
  {
    title: 'Chef',
    salary: '₹15,000 – ₹18,000 / month',
    desc: 'Passionate about creating delicious food? Join our kitchen team and bring the Alps experience to life.',
  },
  {
    title: 'Waiter',
    salary: '₹13,000 – ₹17,000 / month',
    desc: 'Friendly, energetic, and love hospitality? Help us create warm, memorable dining experiences.',
  },
]

export default function Careers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="careers" ref={ref}>
      <motion.span
        className="section-label"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
      >
        Join Our Team
      </motion.span>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1 }}
      >
        We're <em>Hiring!</em>
      </motion.h2>

      <motion.p
        className="section-desc"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        Be part of the Alps family. We're looking for talented, passionate people to join our growing team in Nagercoil.
      </motion.p>

      <div className="career-grid">
        {jobs.map((job, i) => (
          <motion.div
            key={job.title}
            className="career-card"
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.15 }}
          >
            <h4>{job.title}</h4>
            <div className="career-salary">{job.salary}</div>
            <p>{job.desc}</p>
            <a
              href="#contact"
              className="career-apply"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              Apply Now →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
