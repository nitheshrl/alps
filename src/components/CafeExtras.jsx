import { motion } from 'framer-motion'
import spaceAsset from '../assets/img5.jpeg'
import rooftopAsset from '../assets/img1.jpeg'
import interiorAsset from '../assets/img4.jpeg'
import barAsset from '../assets/img2.jpeg'

const experiences = [
  { number: '01', title: 'Coffee first', detail: 'Cold brews, iced lattes and bright pours made for slow starts.', image: spaceAsset },
  { number: '02', title: 'Stay for dinner', detail: 'Loaded fries, crafted burgers and plates with something to say.', image: interiorAsset },
  { number: '03', title: 'Take it upstairs', detail: 'Warm lights, open air and a rooftop made for one more round.', image: barAsset },
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
  const reviews = [
    { quote: 'Come hungry, stay late. The burger is the reason we came back, but the rooftop is why we never want to leave.', author: 'A regular from Nagercoil' },
    { quote: 'The kind of place where one coffee becomes an entire afternoon. Beautiful space, generous food and lovely people.', author: 'A weekend guest' },
    { quote: 'The loaded fries were excellent and the atmosphere after sunset is something special. We will be back soon.', author: 'A dinner guest' },
    { quote: 'Bright drinks, warm service and a menu that makes it difficult to choose just one thing.', author: 'A first-time visitor' },
  ]

  return (
    <section className="reviews-section page-section" aria-label="Google reviews">
      <div className="review-label"><span className="google-mark">G</span><span>Google reviews</span><span>Alps / 2026</span></div>
      <div className="review-quote"><div className="review-marquee"><div className="review-track">{[...reviews, ...reviews].map((review, index) => <article className="review-slide" key={`${review.author}-${index}`}><span className="quote-mark">“</span><blockquote>{review.quote}</blockquote><cite>— {review.author}</cite></article>)}</div></div><a className="review-link" href="https://www.google.com/maps/place/ALPS+CAFE/@8.1634338,77.4114533,17z/data=!3m1!4b1!4m6!3m5!1s0x3b04f150642d7009:0x1823a6fd6948962!8m2!3d8.1634338!4d77.4114533!16s%2Fg%2F11np_90ckp?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">Read all reviews <span>↗</span></a></div>
      <div className="review-rating"><strong>4.8</strong><span>★★★★★</span><small>Google guest rating</small><a className="review-count" href="https://www.google.com/maps/place/ALPS+CAFE/@8.1634338,77.4114533,17z/data=!3m1!4b1!4m6!3m5!1s0x3b04f150642d7009:0x1823a6fd6948962!8m2!3d8.1634338!4d77.4114533!16s%2Fg%2F11np_90ckp?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">View on Google Maps</a></div>
    </section>
  )
}

export function VisitPerks() {
  return (
    <section className="perks-section page-section" aria-label="Alps Cafe perks">
      <div className="perks-intro"><p className="eyebrow">The Alps club</p><h2>Stay for<br /><em>the extras.</em></h2><span className="perks-orbit">A / 2026</span></div>
      <div className="perks-list">
        <div className="perk-item"><span>01</span><div><strong>Student friendly</strong><p>Good plates, easy afternoons and a little extra off for students.</p></div><b>→</b></div>
        <div className="perk-item"><span>02</span><div><strong>Delivery ready</strong><p>Your favourites travel up to 5 km, packed fresh from our kitchen.</p></div><b>→</b></div>
        <div className="perk-item"><span>03</span><div><strong>Bring your people</strong><p>Groups, birthdays, first dates and last-minute plans all welcome.</p></div><b>→</b></div>
      </div>
    </section>
  )
}
