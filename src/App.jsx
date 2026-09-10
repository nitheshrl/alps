import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './CafeSite.css'
import heroAsset from './assets/2.png'
import logoAsset from './assets/1.png'
import storyAsset from './assets/img3.jpeg'
import storyDetailAsset from './assets/img4.jpeg'
import spaceAsset from './assets/img5.jpeg'
import spaceDetailAsset from './assets/img2.jpeg'
import rooftopAsset from './assets/img1.jpeg'
import { ExperienceSection, ReviewsSection, VisitPerks } from './components/CafeExtras'

const menuImages = {
  Burgers: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=88',
  Fries: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=88',
  Wraps: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=88',
  Quesadillas: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=900&q=88',
  Sandwiches: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=88',
  Drinks: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=88',
  Starters: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=88',
  Desserts: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=88',
}

const rawMenu = [
  ['Sauces', 'Ketchup', 10, 'Veg'], ['Sauces', 'Mayo', 15, 'Veg'],
  ['Crafted Burger', 'Sweet Heat Island Burger', 339, 'Non-veg', 'Customisable'],
  ['Fries Overload', 'Afghani Boti Loaded Fries', 250, 'Non-veg'], ['Fries Overload', 'Korean Loaded Fries', 265, 'Non-veg', 'Bestseller'], ['Fries Overload', 'Peri Peri Loaded Fries', 250, 'Non-veg'], ['Fries Overload', 'Signature Beef Fries', 265, 'Non-veg'], ['Fries Overload', 'Tikka Chicken Loaded Fries', 250, 'Non-veg'],
  ['Signature Wraps', 'Garlic Parmesan Wrap', 279, 'Non-veg', 'Customisable'], ['Signature Wraps', 'Grilledhouse Beef Wrap', 294, 'Non-veg', 'Customisable'], ['Signature Wraps', 'Shawarma Wrap', 279, 'Non-veg', 'Customisable'], ['Signature Wraps', 'Veg Melt Wrap', 265, 'Veg', 'Customisable'],
  ['Quesadillas', 'Smoky Beef Quesadillas', 294, 'Non-veg', 'Customisable', 'Cheese slice +₹15, shredded cheese +₹30'], ['Quesadillas', 'El Fuego Quesadillas', 250, 'Non-veg', 'Customisable'], ['Quesadillas', 'Zesty Peri Quesadillas', 250, 'Non-veg', 'Customisable'],
  ['Crafted Burger', 'Beef Smashed Burger', 324, 'Non-veg', 'Customisable'], ['Crafted Burger', 'Grilled Paneer Burger', 294, 'Veg', 'Customisable'], ['Crafted Burger', 'Nashville Burger', 324, 'Non-veg', 'Customisable'], ['Crafted Burger', 'Peri Peri Burger', 324, 'Non-veg', 'Customisable'], ['Crafted Burger', 'Sticky Smoke BBQ Burger', 339, 'Non-veg', 'Customisable'],
  ['The Sandwich Hub', 'Banh Mi Sandwich', 279, 'Non-veg', 'Customisable'], ['The Sandwich Hub', 'Beef Melt Sandwich', 309, 'Non-veg', 'Customisable'], ['The Sandwich Hub', 'Cowboy Sandwich', 279, 'Non-veg', 'Customisable'], ['The Sandwich Hub', 'The Tropical Chicken Sandwich', 294, 'Non-veg', 'Customisable'], ['The Sandwich Hub', 'Veggie Burst Sandwich', 265, 'Veg', 'Customisable'],
  ['Mocktail', 'Golden Orchard (350ml)', 220, 'Veg'], ['Mocktail', 'Paradise Elixir (350ml)', 220, 'Veg'], ['Mocktail', 'Pink Lagoon (350ml)', 220, 'Veg'], ['Mocktail', 'Purple Mist (350ml)', 220, 'Veg'], ['Mocktail', 'Ruby Sunset (350ml)', 220, 'Veg'],
  ['Iced Americano', 'Iced Americano Apple (350ml)', 206, 'Veg'], ['Iced Americano', 'Iced Americano Cranberry (350ml)', 206, 'Veg'], ['Iced Americano', 'Iced Americano Guava (350ml)', 206, 'Veg'], ['Iced Americano', 'Iced Americano Litchi (350ml)', 206, 'Veg'], ['Iced Americano', 'Iced Americano Orange (350ml)', 206, 'Veg'],
  ['Iced Latte', 'Iced Caramel Latte', 220, 'Veg', 'Customisable', 'Whipping cream +₹30'], ['Iced Latte', 'Iced Coffee Latte', 220, 'Veg', 'Customisable', 'Whipping cream +₹30'], ['Iced Latte', 'Iced Hazelnut Latte', 220, 'Veg', 'Customisable', 'Whipping cream +₹30'], ['Iced Latte', 'Iced Irish Cream Latte', 220, 'Veg', 'Customisable', 'Whipping cream +₹30'], ['Iced Latte', 'Iced Rose Latte', 220, 'Veg', 'Customisable', 'Whipping cream +₹30'],
  ['Iced Mocha', 'Iced Blueberry Mocha', 250, 'Veg', 'Customisable'], ['Iced Mocha', 'Iced Mango Mocha', 250, 'Veg', 'Customisable'], ['Iced Mocha', 'Iced Pineapple Mocha', 250, 'Veg', 'Customisable'], ['Iced Mocha', 'Iced Raspberry Mocha', 250, 'Veg', 'Customisable'], ['Iced Mocha', 'Iced Strawberry Mocha', 250, 'Veg', 'Customisable'],
  ['Iced Matcha', 'Iced Blueberry Matcha', 250, 'Veg', 'Customisable'], ['Iced Matcha', 'Iced Mango Matcha', 250, 'Veg', 'Customisable'], ['Iced Matcha', 'Iced Pineapple Matcha', 250, 'Veg', 'Customisable'], ['Iced Matcha', 'Iced Raspberry Matcha', 250, 'Veg', 'Customisable'], ['Iced Matcha', 'Iced Strawberry Matcha', 250, 'Veg', 'Customisable'],
  ['Milkshake', 'Cheesecake Strawberry Milkshake', 220, 'Veg', 'Customisable', 'Whipping cream +₹30'], ['Milkshake', 'Chocolate Milkshake', 220, 'Veg', 'Customisable', 'Whipping cream +₹30'], ['Milkshake', 'Cookie & Cream Milkshake', 220, 'Veg', 'Customisable', 'Whipping cream +₹30'], ['Milkshake', 'French Vanilla Milkshake', 220, 'Veg', 'Customisable', 'Whipping cream +₹30'], ['Milkshake', 'Red Velvet Milkshake', 220, 'Veg', 'Customisable', 'Whipping cream +₹30'], ['Milkshake', 'Tiramisu Milkshake', 220, 'Veg', 'Customisable', 'Whipping cream +₹30'], ['Milkshake', 'Cheesecake Blueberry Milkshake', 220, 'Veg', 'Customisable'], ['Milkshake', 'Cheesecake Mango Milkshake', 220, 'Veg', 'Customisable'],
  ['Starters', 'Chicken Popcorn', 206, 'Non-veg', 'Bestseller, Customisable'], ['Starters', 'Chicken Tenders', 235, 'Non-veg', 'Customisable'], ['Starters', 'Chilli Garlic Pops', 161, 'Veg', 'Customisable', 'Mayonnaise +₹15'], ['Starters', 'Classic Steamed Veg Momos', 176, 'Veg'], ['Starters', 'Crispy Non Veg Momos', 191, 'Non-veg', 'Customisable', 'Mayonnaise +₹15'], ['Starters', 'Crispy Tossed Non Veg Momos', 191, 'Non-veg', 'Customisable'], ['Starters', 'Crispy Tossed Veg Momos', 191, 'Veg', 'Customisable'], ['Starters', 'Crispy Veg Momos', 176, 'Veg', 'Customisable', 'Mayonnaise +₹15'], ['Starters', 'Fries', 191, 'Veg', 'Bestseller, Customisable'], ['Starters', 'Glazed Wings', 250, 'Non-veg', 'Customisable'], ['Starters', 'Golden Crunchy Wings', 235, 'Non-veg', 'Customisable'], ['Starters', 'Hot & Crispy Lollipop', 235, 'Non-veg', 'Customisable', 'Mayonnaise +₹15'], ['Starters', 'Non Veg Spring Roll', 235, 'Non-veg', 'Customisable', 'Mayonnaise +₹15'], ['Starters', 'Saucy Fries', 206, 'Veg', 'Customisable'], ['Starters', 'Sauted Steamed Non Veg Momos', 206, 'Non-veg', 'Customisable'], ['Starters', 'Sauted Steamed Veg Momos', 191, 'Veg', 'Customisable'], ['Starters', 'Veg Spring Roll', 191, 'Veg', 'Customisable', 'Mayonnaise +₹15'], ['Starters', 'Classic Steamed Non Veg Momos', 206, 'Non-veg'],
  ['Mojito', 'Apple Twist Mojito', 99, 'Veg'], ['Mojito', 'Blood Orange Mojito (350ml)', 99, 'Veg'], ['Mojito', 'Blue Curaco Mojito', 99, 'Veg'], ['Mojito', 'Blueberry Mojito', 99, 'Veg', 'Bestseller'], ['Mojito', 'Green Apple Mojito', 99, 'Veg'], ['Mojito', 'Hawaiian Pineapple Mojito (350ml)', 99, 'Veg'], ['Mojito', 'Lemon Tea Mojito', 99, 'Veg'], ['Mojito', 'Mint Mojito', 99, 'Veg'], ['Mojito', 'Passion Fruit Mojito', 99, 'Veg'], ['Mojito', 'Peach Tea Mojito', 99, 'Veg'], ['Mojito', 'Pina Colada Mojito (350ml)', 99, 'Veg'], ['Mojito', 'Raspberry Mojito', 99, 'Veg'], ['Mojito', 'Strawberry Mojito', 99, 'Veg'],
]

const menuItems = rawMenu.map(([category, name, price, type, flags = '', note = '']) => ({
  category,
  name,
  price: `₹${price}`,
  type,
  note,
  image: menuImages[category] || menuImages.Drinks,
  tags: flags.split(',').map((tag) => tag.trim()).filter(Boolean),
}))

const categories = ['All', 'Starters', 'Fries Overload', 'Signature Wraps', 'Quesadillas', 'Crafted Burger', 'The Sandwich Hub', 'Mocktail', 'Iced Americano', 'Iced Latte', 'Iced Mocha', 'Iced Matcha', 'Milkshake', 'Sauces', 'Mojito']
const itemsPerPage = 9

const gallery = [
  { image: spaceAsset, label: 'Morning light' },
  { image: spaceDetailAsset, label: 'Comfortable afternoons' },
  { image: rooftopAsset, label: 'Slow evenings' },
]

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [submitted, setSubmitted] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const filteredItems = activeCategory === 'All' ? menuItems : menuItems.filter((item) => item.category === activeCategory)
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage)
  const visibleItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const changeCategory = (category) => { setActiveCategory(category); setCurrentPage(1) }
  const handleBookingSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const subject = `Table request from ${formData.get('name')}`
    const body = `Name: ${formData.get('name')}\nDate: ${formData.get('date')}\nGuests: ${formData.get('guests')}`
    window.location.href = `mailto:mail@alpscafenagercoil.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  useEffect(() => {
    const revealTargets = document.querySelectorAll('.cafe-site > section, .menu-card, .experience-card, .gallery-card, .booking-form, .perk-item')
    revealTargets.forEach((element, index) => {
      element.classList.add('scroll-reveal')
      element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`)
    })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    revealTargets.forEach((element) => observer.observe(element))
    requestAnimationFrame(() => {
      revealTargets.forEach((element) => {
        if (element.getBoundingClientRect().top < window.innerHeight * 0.9) {
          element.classList.add('is-visible')
        }
      })
    })
    return () => observer.disconnect()
  }, [])

  return (
    <main className="cafe-site">
      <div className="night-atmosphere" aria-hidden="true"><div className="light-string"><span /><span /><span /><span /><span /><span /><span /><span /></div><div className="light-string light-string-secondary"><span /><span /><span /><span /><span /><span /></div><div className="light-string light-string-low"><span /><span /><span /><span /><span /></div></div>
      <div className="site-alert"><span>Now serving late breakfasts</span><span>Open daily 1:30 PM - 10:00 PM</span><a href="#visit">Reserve a table</a></div>
        <div className="site-alert"><span>Now serving late breakfasts</span><span>Open daily 11:30 AM - 10:30 PM</span><a href="#visit">Reserve a table</a></div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Alps Cafe home"><span className="brand-mark"><img src={logoAsset} alt="Alps Cafe logo" /></span></a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#menu">Menu</a><a href="#story">Our story</a><a href="#space">The space</a><a href="#visit">Visit</a>
        </nav>
        <a className="header-cta" href="#visit">Book a table <span>↗</span></a>
      </header>

      <section className="hero-panel" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Nagercoil's table for good days</p>
          <h1>Come for<br /><em>the craving.</em></h1>
          <p className="hero-intro">Big flavours, cold pours and a room that makes staying for one more round feel like the right decision.</p>
          <div className="hero-actions"><a className="button button-dark" href="#menu">Order something good <span>↓</span></a><a className="text-link" href="#visit">Find your table <span>↗</span></a></div>
            <div className="hero-meta"><span><strong>11:30 AM</strong> opening time</span><span><strong>10:30 PM</strong> closing time</span><span><strong>4.8/5</strong> from our regulars</span></div>
        </div>
        <div className="hero-photo-wrap"><img className="hero-photo" src={heroAsset} alt="Alps Cafe food and drinks" /><div className="photo-note"><span>01</span><span>Made slowly,<br />served warmly.</span></div></div>
        <div className="hero-stamp">Brew<br /><span>·</span> Bite <span>·</span> Belong</div>
      </section>

      <section className="marquee-band" aria-label="Cafe highlights">
        <div className="running-track"><span><b>ALPS CAFE</b> Fresh pours <i>✳</i> Loud flavours <i>✳</i> Late conversations <i>✳</i> Open today 11:30 AM - 10:30 PM</span><span aria-hidden="true"><b>ALPS CAFE</b> Fresh pours <i>✳</i> Loud flavours <i>✳</i> Late conversations <i>✳</i> Open today 11:30 AM - 10:30 PM</span></div>
      </section>

      <ExperienceSection />

      <section className="menu-section page-section" id="menu">
        <div className="section-heading"><div><p className="eyebrow">The Alps menu</p><h2>Pick your<br /><em>favourite.</em></h2></div><p className="section-lead">Burgers, loaded fries, wraps, small plates and colourful drinks. Browse the full menu and build your order.</p></div>
        <div className="category-tabs" role="tablist" aria-label="Menu categories">{categories.map((category) => <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => changeCategory(category)}>{category}</button>)}</div>
        <div className="menu-toolbar"><span>{filteredItems.length} items / page {currentPage} of {pageCount}</span>{cartCount > 0 && <strong>{cartCount} item{cartCount > 1 ? 's' : ''} ready to order</strong>}</div>
        <div className="menu-grid">{visibleItems.map((item, index) => <motion.article className="menu-card" key={item.name} layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.02, 0.3) }}><div className="menu-card-image"><img src={item.image} alt={item.name} /><span className="menu-category">{item.category}</span>{item.tags.includes('Bestseller') && <span className="menu-bestseller">Bestseller</span>}</div><div className="menu-card-body"><div className="menu-card-info"><div className="menu-card-title"><h3>{item.name}</h3><strong>{item.price}</strong></div><p>{item.type} item{item.tags.includes('Customisable') ? ' · Customisable' : ''}</p>{item.note && <small>{item.note}</small>}</div><button className="menu-add" aria-label={`Add ${item.name} to cart`} onClick={() => setCartCount((count) => count + 1)}>+</button></div></motion.article>)}</div>
        <nav className="pagination" aria-label="Menu pages"><button className="pagination-arrow" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)} aria-label="Previous menu page">←</button>{Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => <button key={page} className={currentPage === page ? 'active' : ''} onClick={() => setCurrentPage(page)}>{String(page).padStart(2, '0')}</button>)}<button className="pagination-arrow" disabled={currentPage === pageCount} onClick={() => setCurrentPage((page) => page + 1)} aria-label="Next menu page">→</button></nav>
      </section>

      <section className="story-section page-section" id="story"><div className="story-photo"><img className="story-photo-main" src={storyAsset} alt="Rooftop lights at Alps Cafe" /><div className="story-photo-detail"><img src={storyDetailAsset} alt="Warm interior details and a drink at Alps Cafe" /><span>THE ALPS MOOD</span></div><span className="vertical-label">04 / AFTER DARK</span><span className="story-photo-index">NAGERCOIL<br /><em>2026 — now</em></span></div><div className="story-copy"><p className="eyebrow">Why we are here</p><h2>A little<br /><em>more feeling.</em></h2><p>Alps is a warm room, a bright glass and one good reason to stay a while longer.</p><p>We make familiar food with curious hands, pour drinks worth slowing down for, and leave space for the moments that happen between them.</p><a className="text-link" href="#visit">Come find your corner <span>↗</span></a><div className="story-signature">Brew. Bite. Belong.<br /><small>made for your everyday escape</small></div></div></section>

      <section className="space-section page-section" id="space"><div className="section-heading"><div><p className="eyebrow">Take your time</p><h2>A table for<br /><em>every mood.</em></h2></div><p className="section-lead">Sunlit corners for slow mornings. Low lights for late plates. Upstairs, the rooftop catches the best breeze in town.</p></div><div className="gallery-grid">{gallery.map((item, index) => <figure className={`gallery-card gallery-${index + 1}`} key={item.label}><img src={item.image} alt={item.label} /><figcaption><span>0{index + 1}</span>{item.label}</figcaption></figure>)}</div></section>

      <ReviewsSection />
      <VisitPerks />

      <section className="visit-section page-section" id="visit"><div className="visit-card"><div className="visit-copy"><p className="eyebrow">Come by soon</p><h2>Make a little<br /><em>room for good.</em></h2><div className="visit-details"><p><strong>Find us</strong><br />Opp. to Industrial Estate, SIDCO<br />Kurusady, North Konam<br />Nagercoil, Tamil Nadu 629004<br /><a className="map-link" href="https://www.google.com/maps/place/ALPS+CAFE/@8.1634338,77.4114533,17z/data=!3m1!4b1!4m6!3m5!1s0x3b04f150642d7009:0x1823a6fd6948962!8m2!3d8.1634338!4d77.4114533!16s%2Fg%2F11np_90ckp?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">Open in Google Maps ↗</a></p><p><strong>Hours</strong><br />Daily / 11:30 PM - 10:30 PM<br />Kitchen closes at 10.00 PM</p><p><strong>Say hello</strong><br />+91 98765 43210<br />hello@alpscafe.in</p></div><div className="map-panel"><a className="directions-button" href="https://www.google.com/maps/place/ALPS+CAFE/@8.1634338,77.4114533,17z/data=!3m1!4b1!4m6!3m5!1s0x3b04f150642d7009:0x1823a6fd6948962!8m2!3d8.1634338!4d77.4114533!16s%2Fg%2F11np_90ckp?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">Show directions <span>↗</span></a><iframe title="Find Alps Cafe on Google Maps" src="https://www.google.com/maps?q=ALPS%20CAFE%2C%20Nagercoil%208.1634338%2C77.4114533&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div><form className="booking-form" onSubmit={handleBookingSubmit}><p className="eyebrow">Table request</p><h3>{submitted ? 'We will see you soon.' : 'Save your spot.'}</h3>{submitted ? <p className="form-success">Your email draft is ready. Send it to confirm your table request.</p> : <><label>Name<input required name="name" placeholder="Your name" /></label><div className="form-row"><label>Date<input required name="date" type="date" /></label><label>Guests<select name="guests" defaultValue="2"><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5+ guests</option></select></label></div><button className="button button-light" type="submit">Request a table <span>↗</span></button></>}</form></div></section>

      <footer className="site-footer"><div className="footer-main"><a className="brand" href="#top" aria-label="Alps Cafe home"><span className="brand-mark"><img src={logoAsset} alt="Alps Cafe logo" /></span></a><p>Good food. Better company.<br />See you upstairs.</p><div className="footer-links"><a href="#menu">Menu</a><a href="#story">About</a><a href="#visit">Contact</a><a href="#visit">Instagram ↗</a></div></div><div className="footer-bottom"><span>© 2026 Alps Cafe</span><span>Made for slow days and long nights.</span></div></footer>
    </main>
  )
}

export default App
