import { motion } from 'framer-motion'
import spaceAsset from '../assets/img5.jpeg'
import rooftopAsset from '../assets/img1.jpeg'

const experiences = [
  { number: '01', title: 'Coffee first', detail: 'Cold brews, iced lattes and bright pours made for slow starts.', image: spaceAsset },
  { number: '02', title: 'Stay for dinner', detail: 'Loaded fries, crafted burgers and plates with something to say.', image: rooftopAsset },
  { number: '03', title: 'Take it upstairs', detail: 'Warm lights, open air and a rooftop made for one more round.', image: rooftopAsset },
]

export function ExperienceSection() {
  return (
    <section className="experience-section page-section" id="experience">
      <div className="section-heading">
        <div><p className="eyebrow">More than a meal</p><h2>Make a night<br /><em>of it.</em></h2></div>
        <p className="section-lead">There is always another reason to stay at Alps. Pick a mood, find a table and let the evening take its time.</p>
      </div>
      <div className="experience-grid">
        {experiences.map((experience, index) => (
          <motion.article className="experience-card" key={experience.number} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.1 }}>
            <div className="experience-image"><img src={experience.image} alt="" /></div>
            <div className="experience-copy"><span>{experience.number}</span><div><h3>{experience.title}</h3><p>{experience.detail}</p></div></div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export function ReviewsSection() {
  return (
    <section className="reviews-section page-section" aria-label="Guest notes">
      <div className="review-label"><span>Guest notes</span><span>Alps / 2026</span></div>
      <div className="review-quote"><span className="quote-mark">“</span><blockquote>Come hungry, stay late. The burger is the reason we came back, but the rooftop is why we never want to leave.</blockquote><cite>— A regular from Nagercoil</cite></div>
      <div className="review-rating"><strong>4.8</strong><span>★★★★★</span><small>loved by our table regulars</small></div>
    </section>
  )
}

export function VisitPerks() {
  return (
    <section className="perks-section page-section" aria-label="Alps Cafe perks">
      <div className="perk-item"><span>01</span><strong>Student friendly</strong><p>Good plates, easy afternoons and a little extra off for students.</p></div>
      <div className="perk-item"><span>02</span><strong>Delivery ready</strong><p>Your favourites travel up to 5 km, packed fresh from our kitchen.</p></div>
      <div className="perk-item"><span>03</span><strong>Bring your people</strong><p>Groups, birthdays, first dates and last-minute plans all welcome.</p></div>
    </section>
  )
}
