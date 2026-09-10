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
  ['Starters', 'Bread Omelette', 69, 'Veg'], ['Starters', 'Chicken Nuggets', 99, 'Non-veg'], ['Starters', 'Chicken Kieves', 99, 'Non-veg'], ['Starters', 'Veg Nuggets', 99, 'Veg'], ['Starters', 'Smiles', 99, 'Veg'], ['Starters', 'Cheese Triangles', 99, 'Veg'], ['Starters', 'Chilli Garlic Pops', 99, 'Veg'], ['Starters', 'Broasted Chicken', 129, 'Non-veg'], ['Starters', 'Bread Chicken Omelette', 109, 'Non-veg'], ['Starters', 'Mexicana Cheese Fries', 129, 'Veg'], ['Starters', 'Cheddar Cheese Fries', 129, 'Veg'], ['Starters', 'Cajun Spice Fries', 129, 'Veg'], ['Starters', 'Sour Cream Onion Fries', 129, 'Veg'], ['Starters', 'Sweet & Chilli BBQ Fries', 129, 'Veg'], ['Starters', 'Sweet & Smoky BBQ Fries', 129, 'Veg'], ['Starters', 'African Peri Peri Fries', 129, 'Veg'], ['Starters', 'Peri Peri Sprinkler Fries', 129, 'Veg'],
  ['Saucy Fries (Seasoning)', 'Mexicana Cheese', 139, 'Veg'], ['Saucy Fries (Seasoning)', 'Cheddar Cheese', 139, 'Veg'], ['Saucy Fries (Seasoning)', 'Cajun Spice', 139, 'Veg'], ['Saucy Fries (Seasoning)', 'Sour Cream Onion', 139, 'Veg'], ['Saucy Fries (Seasoning)', 'Sweet & Chilli BBQ', 139, 'Veg'], ['Saucy Fries (Seasoning)', 'Sweet & Smoky BBQ', 139, 'Veg'], ['Saucy Fries (Seasoning)', 'African Peri Peri', 139, 'Veg'], ['Saucy Fries (Seasoning)', 'Peri Peri Sprinkler', 139, 'Veg'], ['Saucy Fries (Mayonnaise)', 'Harissa Mayo', 139, 'Veg'], ['Saucy Fries (Mayonnaise)', 'Peri Peri Mayo', 139, 'Veg'], ['Saucy Fries (Mayonnaise)', 'Zingy Mayo', 139, 'Veg'], ['Saucy Fries (Mayonnaise)', 'Mexican Mayo', 139, 'Veg'], ['Saucy Fries (Mayonnaise)', 'Chipotle Mayo', 139, 'Veg'], ['Saucy Fries (Mayonnaise)', 'Cheese Jalapeno', 139, 'Veg'], ['Saucy Fries (Mayonnaise)', 'Veg Mayo', 139, 'Veg'], ['Saucy Fries (Mayonnaise)', 'Burger Mayo', 139, 'Veg'],
  ['Crispy Veg Momos', 'Mexicana Cheese Crispy Veg Momos', 119, 'Veg'], ['Crispy Veg Momos', 'Cheddar Cheese Crispy Veg Momos', 119, 'Veg'], ['Crispy Veg Momos', 'Lemon Garlic & Herb Crispy Veg Momos', 119, 'Veg'], ['Crispy Veg Momos', 'Chilli Garlic Crispy Veg Momos', 119, 'Veg'], ['Crispy Veg Momos', 'Green Chilli Oregano Crispy Veg Momos', 119, 'Veg'],
  ['Crispy Tossed Veg Momos', 'Korean Hot Chilli Crispy Tossed Veg Momos', 129, 'Veg'], ['Crispy Tossed Veg Momos', 'Tibet Dragon Crispy Tossed Veg Momos', 129, 'Veg'], ['Crispy Tossed Veg Momos', 'Burnt Chilli Roasted Garlic Crispy Tossed Veg Momos', 129, 'Veg'], ['Crispy Tossed Veg Momos', 'Korean Honey Gochu Glaze Crispy Tossed Veg Momos', 129, 'Veg'], ['Crispy Tossed Veg Momos', 'Cantonese Chilli Crispy Tossed Veg Momos', 129, 'Veg'],
  ['Crispy Non Veg Momos', 'Cajun Spice Crispy Non Veg Momos', 129, 'Non-veg'], ['Crispy Non Veg Momos', 'Sour Cream Onion Crispy Non Veg Momos', 129, 'Non-veg'], ['Crispy Non Veg Momos', 'Sweet & Chilli BBQ Crispy Non Veg Momos', 129, 'Non-veg'], ['Crispy Non Veg Momos', 'Sweet & Smoky BBQ Crispy Non Veg Momos', 129, 'Non-veg'], ['Crispy Non Veg Momos', 'African Peri Peri Crispy Non Veg Momos', 129, 'Non-veg'], ['Crispy Non Veg Momos', 'Peri Peri Sprinkler Crispy Non Veg Momos', 129, 'Non-veg'],
  ['Crispy Tossed Non Veg Momos', 'Spanish Chilli Herby Crispy Tossed Non Veg Momos', 139, 'Non-veg'], ['Crispy Tossed Non Veg Momos', 'Burnt Chilli Roasted Garlic Crispy Tossed Non Veg Momos', 139, 'Non-veg'], ['Crispy Tossed Non Veg Momos', 'Mongolian Hot Pepper Crispy Tossed Non Veg Momos', 139, 'Non-veg'], ['Crispy Tossed Non Veg Momos', 'Langkwai Crispy Tossed Non Veg Momos', 139, 'Non-veg'], ['Crispy Tossed Non Veg Momos', 'Buffalo Sauce Crispy Tossed Non Veg Momos', 139, 'Non-veg'],
  ['Sauted Steamed Veg Momos', 'Spanish Chilli Herby Sauted Steamed Veg Momos', 129, 'Veg'], ['Sauted Steamed Veg Momos', 'Korean Hot Chilli Sauted Steamed Veg Momos', 129, 'Veg'], ['Sauted Steamed Veg Momos', 'Tibet Dragon Sauted Steamed Veg Momos', 129, 'Veg'], ['Sauted Steamed Veg Momos', 'Burnt Chilli Roasted Garlic Sauted Steamed Veg Momos', 129, 'Veg'], ['Sauted Steamed Veg Momos', 'Korean Honey Gochu Glaze Sauted Steamed Veg Momos', 129, 'Veg'],
  ['Sauted Steamed Non Veg Momos', 'Mongolian Hot Pepper Sauted Steamed Non Veg Momos', 139, 'Non-veg'], ['Sauted Steamed Non Veg Momos', 'Langkwai Sauted Steamed Non Veg Momos', 139, 'Non-veg'], ['Sauted Steamed Non Veg Momos', 'Cantonese Chilli Sauted Steamed Non Veg Momos', 139, 'Non-veg'], ['Sauted Steamed Non Veg Momos', 'Buffalo Sauce Sauted Steamed Non Veg Momos', 139, 'Non-veg'], ['Sauted Steamed Non Veg Momos', 'Jamaican Mambo Sauted Steamed Non Veg Momos', 139, 'Non-veg'],
  ['Popcorn', 'Mexicana Cheese Chicken Popcorn', 149, 'Non-veg'], ['Popcorn', 'Cheddar Cheese Chicken Popcorn', 149, 'Non-veg'], ['Popcorn', 'Lemon Garlic & Herb Chicken Popcorn', 149, 'Non-veg'], ['Popcorn', 'Chilli Garlic Chicken Popcorn', 149, 'Non-veg'], ['Popcorn', 'Green Chilli Oregano Chicken Popcorn', 149, 'Non-veg'],
  ['Golden Crunchy Wings', 'Mexicana Cheese Golden Crunchy Wings', 159, 'Non-veg'], ['Golden Crunchy Wings', 'Cheddar Cheese Golden Crunchy Wings', 159, 'Non-veg'], ['Golden Crunchy Wings', 'Lemon Garlic & Herb Golden Crunchy Wings', 159, 'Non-veg'], ['Golden Crunchy Wings', 'Chilli Garlic Golden Crunchy Wings', 159, 'Non-veg'], ['Golden Crunchy Wings', 'Green Chilli Oregano Golden Crunchy Wings', 159, 'Non-veg'],
  ['Chicken Tenders', 'Cajun Spice Chicken Tenders', 149, 'Non-veg'], ['Chicken Tenders', 'Sour Cream Onion Chicken Tenders', 149, 'Non-veg'], ['Chicken Tenders', 'Sweet & Chilli BBQ Chicken Tenders', 149, 'Non-veg'], ['Chicken Tenders', 'Sweet & Smoky BBQ Chicken Tenders', 149, 'Non-veg'], ['Chicken Tenders', 'African Peri Peri Chicken Tenders', 149, 'Non-veg'], ['Chicken Tenders', 'Peri Peri Sprinkler Chicken Tenders', 149, 'Non-veg'],
  ['Glazed Wings', 'Korean Hot Chilli Glazed Wings', 169, 'Non-veg'], ['Glazed Wings', 'Tibet Dragon Glazed Wings', 169, 'Non-veg'], ['Glazed Wings', 'Burnt Chilli Roasted Garlic Glazed Wings', 169, 'Non-veg'], ['Glazed Wings', 'Korean Honey Gochu Glaze Glazed Wings', 169, 'Non-veg'], ['Glazed Wings', 'Cantonese Chilli Glazed Wings', 169, 'Non-veg'], ['Glazed Wings', 'Buffalo Sauce Glazed Wings', 169, 'Non-veg'],
  ['Hot & Crispy Lollipop', 'Mexicana Cheese Hot & Crispy Lollipop', 169, 'Non-veg'], ['Hot & Crispy Lollipop', 'Cheddar Cheese Hot & Crispy Lollipop', 169, 'Non-veg'], ['Hot & Crispy Lollipop', 'African Peri Peri Hot & Crispy Lollipop', 169, 'Non-veg'], ['Hot & Crispy Lollipop', 'Peri Peri Sprinkler Hot & Crispy Lollipop', 169, 'Non-veg'], ['Hot & Crispy Lollipop', 'Chilli Garlic Hot & Crispy Lollipop', 169, 'Non-veg'],
  ['Fries Overload', 'Veg Loaded Fries', 149, 'Veg'], ['Fries Overload', 'Peri Peri Loaded Fries', 169, 'Veg'], ['Fries Overload', 'Tikka Chicken Loaded Fries', 169, 'Non-veg'], ['Fries Overload', 'Korean Loaded Fries', 179, 'Veg'], ['Fries Overload', 'Beef Loaded Fries', 179, 'Non-veg'],
  ['Crafted Burger', 'Grilled Paneer Burger', 199, 'Veg'], ['Crafted Burger', 'Sweet Heat Island Burger', 229, 'Non-veg'], ['Crafted Burger', 'Sticky Smoke BBQ Burger', 229, 'Non-veg'], ['Crafted Burger', 'Peri Peri Burger', 219, 'Non-veg'], ['Crafted Burger', 'Nashville Burger', 219, 'Non-veg'], ['Crafted Burger', 'Beef Smashed Burger', 219, 'Non-veg'],
  ['Sandwich Club', 'Veggie Burst Sandwich', 179, 'Veg'], ['Sandwich Club', 'Cowboy Sandwich', 189, 'Non-veg'], ['Sandwich Club', 'Beef Melt Sandwich', 209, 'Non-veg'],
  ['Signature Wraps', 'Veg Melt Wrap', 179, 'Veg'], ['Signature Wraps', 'Shawarma Wrap', 189, 'Non-veg'], ['Signature Wraps', 'Grilledhouse Beef Wrap', 199, 'Non-veg'],
  ['Mocktail 350ml', 'Pink Lagoon', 149, 'Veg'], ['Mocktail 350ml', 'Purple Mist', 149, 'Veg'], ['Mocktail 350ml', 'Golden Orchard', 149, 'Veg'], ['Mocktail 350ml', 'Ruby Sunset', 149, 'Veg'], ['Mocktail 350ml', 'Paradise Elixir', 149, 'Veg'],
  ['Mojito 350ml', 'Blue Curaco', 99, 'Veg'], ['Mojito 350ml', 'Blueberry', 99, 'Veg'], ['Mojito 350ml', 'Raspberry', 99, 'Veg'], ['Mojito 350ml', 'Strawberry', 99, 'Veg'], ['Mojito 350ml', 'Mint', 99, 'Veg'], ['Mojito 350ml', 'Lemon Tea', 99, 'Veg'], ['Mojito 350ml', 'Peach Tea', 99, 'Veg'], ['Mojito 350ml', 'Tropical Fruit Beer', 99, 'Veg'], ['Mojito 350ml', 'Green Apple', 99, 'Veg'], ['Mojito 350ml', 'Apple Twist', 99, 'Veg'], ['Mojito 350ml', 'Passion Fruit', 99, 'Veg'],
  ['Lemon Juice', 'Soda Lemon Sweet', 49, 'Veg'], ['Lemon Juice', 'Soda Lemon Sweet & Salt', 49, 'Veg'], ['Lemon Juice', 'Soda Lemon Salt', 49, 'Veg'], ['Lemon Juice', 'Mint Lemon', 49, 'Veg'], ['Lemon Juice', 'Sweet Lemon', 49, 'Veg'], ['Lemon Juice', 'Salt Lemon', 49, 'Veg'], ['Lemon Juice', 'Sweet And Salt Lemon', 49, 'Veg'],
  ['Ice Lattes 350ml', 'Iced Caramel Latte', 129, 'Veg', 'Customisable', 'With whipping cream ₹149'], ['Ice Lattes 350ml', 'Iced Rose Latte', 129, 'Veg', 'Customisable', 'With whipping cream ₹149'], ['Ice Lattes 350ml', 'Iced Irish Cream Latte', 129, 'Veg', 'Customisable', 'With whipping cream ₹149'], ['Ice Lattes 350ml', 'Iced Hazelnut Latte', 129, 'Veg', 'Customisable', 'With whipping cream ₹149'], ['Ice Lattes 350ml', 'Iced Coffee Latte', 129, 'Veg', 'Customisable', 'With whipping cream ₹149'],
  ['Milkshake 350ml', 'Cookie & Cream', 129, 'Veg', 'Customisable', 'With whipping cream ₹149'], ['Milkshake 350ml', 'French Vanilla', 129, 'Veg', 'Customisable', 'With whipping cream ₹149'], ['Milkshake 350ml', 'Tiramisu', 129, 'Veg', 'Customisable', 'With whipping cream ₹149'], ['Milkshake 350ml', 'Red Velvet', 129, 'Veg', 'Customisable', 'With whipping cream ₹149'], ['Milkshake 350ml', 'Chocolate', 129, 'Veg', 'Customisable', 'With whipping cream ₹149'], ['Milkshake 350ml', 'Strawberry Cheesecake', 129, 'Veg', 'Customisable', 'With whipping cream ₹149'], ['Milkshake 350ml', 'Blueberry Cheesecake', 129, 'Veg', 'Customisable', 'With whipping cream ₹149'], ['Milkshake 350ml', 'Mango Cheesecake', 129, 'Veg', 'Customisable', 'With whipping cream ₹149'],
  ['Iced Mocha 350ml', 'Iced Strawberry Mocha', 169, 'Veg'], ['Iced Mocha 350ml', 'Iced Blueberry Mocha', 169, 'Veg'], ['Iced Mocha 350ml', 'Iced Mango Mocha', 169, 'Veg'], ['Iced Mocha 350ml', 'Iced Pineapple Mocha', 169, 'Veg'], ['Iced Mocha 350ml', 'Iced Raspberry Mocha', 169, 'Veg'],
  ['Iced Matcha 350ml', 'Iced Strawberry Matcha', 169, 'Veg'], ['Iced Matcha 350ml', 'Iced Blueberry Matcha', 169, 'Veg'], ['Iced Matcha 350ml', 'Iced Mango Matcha', 169, 'Veg'], ['Iced Matcha 350ml', 'Iced Pineapple Matcha', 169, 'Veg'], ['Iced Matcha 350ml', 'Iced Raspberry Matcha', 169, 'Veg'],
  ['Iced Americano 350ml', 'Iced Cranberry Americano', 139, 'Veg'], ['Iced Americano 350ml', 'Iced Litchi Americano', 139, 'Veg'], ['Iced Americano 350ml', 'Iced Apple Americano', 139, 'Veg'], ['Iced Americano 350ml', 'Iced Orange Americano', 139, 'Veg'], ['Iced Americano 350ml', 'Iced Guava Americano', 139, 'Veg'],
  ['Hot Beverages', 'Hot Chocolate', 159, 'Veg'], ['Hot Beverages', 'Tea', 30, 'Veg'], ['Hot Beverages', 'Coffee', 30, 'Veg'],
  ['Dessert', 'Butterscotch Ice Cream', 49, 'Veg'], ['Dessert', 'Strawberry Ice Cream', 49, 'Veg'], ['Dessert', 'Vanilla Ice Cream', 49, 'Veg'], ['Dessert', 'Chocolate Ice Cream', 49, 'Veg'], ['Dessert', 'Tiramisu', 119, 'Veg'], ['Dessert', 'Mango Cheesecake', 119, 'Veg'], ['Dessert', 'Strawberry Cheesecake', 119, 'Veg'], ['Dessert', 'Blueberry Cheesecake', 119, 'Veg'], ['Dessert', 'Cherry Cheesecake', 119, 'Veg'], ['Dessert', 'Chocolate Mousse Cake', 139, 'Veg'], ['Dessert', 'Biscoff Cheesecake', 149, 'Veg'],
  ['Pastas', 'Veg White Sauce Pasta', 149, 'Veg'], ['Pastas', 'Non-Veg White Sauce Pasta', 179, 'Non-veg'], ['Pastas', 'Veg Red Sauce Pasta', 149, 'Veg'], ['Pastas', 'Non-Veg Red Sauce Pasta', 179, 'Non-veg'],
  ['Combos', 'Bread Omelette + Tea or Coffee', 89, 'Veg'], ['Combos', 'Burger + Mocha', 299, 'Veg'], ['Combos', 'Wrap + Milkshake', 299, 'Veg'], ['Combos', 'Fries + Broasted + Mojito', 299, 'Non-veg'], ['Combos', '1 Broasted + 2 Wings + 2 Lollipop', 347, 'Non-veg'], ['Combos', '1 Loaded Fries + 1 Chicken Popcorn + 1 Mojito', 347, 'Non-veg', 'Snack & Sip'], ['Combos', 'Dessert - Can Choose Any Flavour', 239, 'Veg'],
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

const categories = ['All', 'Starters', 'Saucy Fries (Seasoning)', 'Saucy Fries (Mayonnaise)', 'Crispy Veg Momos', 'Crispy Tossed Veg Momos', 'Crispy Non Veg Momos', 'Crispy Tossed Non Veg Momos', 'Sauted Steamed Veg Momos', 'Sauted Steamed Non Veg Momos', 'Popcorn', 'Golden Crunchy Wings', 'Chicken Tenders', 'Glazed Wings', 'Hot & Crispy Lollipop', 'Fries Overload', 'Crafted Burger', 'Sandwich Club', 'Signature Wraps', 'Mocktail 350ml', 'Mojito 350ml', 'Lemon Juice', 'Ice Lattes 350ml', 'Milkshake 350ml', 'Iced Mocha 350ml', 'Iced Matcha 350ml', 'Iced Americano 350ml', 'Hot Beverages', 'Dessert', 'Pastas', 'Combos']
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
    window.location.href = `mailto:hello@alpscafenagercoil.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
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
        <div className="menu-grid">{visibleItems.map((item, index) => <motion.article className="menu-card" key={item.name} layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.02, 0.3) }}><div className="menu-card-image"><img src={item.image} alt={item.name} /><span className="menu-category">{item.category}</span>{item.tags.includes('Bestseller') && <span className="menu-bestseller">Bestseller</span>}{item.tags.includes('Snack & Sip') && <span className="menu-special-badge">Snack &amp; Sip</span>}</div><div className="menu-card-body"><div className="menu-card-info"><div className="menu-card-title"><h3>{item.name}</h3><strong>{item.price}</strong></div><p>{item.type} item{item.tags.includes('Customisable') ? ' · Customisable' : ''}</p>{item.note && <small>{item.note}</small>}</div><button className="menu-add" aria-label={`Add ${item.name} to cart`} onClick={() => setCartCount((count) => count + 1)}>+</button></div></motion.article>)}</div>
        <nav className="pagination" aria-label="Menu pages"><button className="pagination-arrow" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)} aria-label="Previous menu page">←</button>{Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => <button key={page} className={currentPage === page ? 'active' : ''} onClick={() => setCurrentPage(page)}>{String(page).padStart(2, '0')}</button>)}<button className="pagination-arrow" disabled={currentPage === pageCount} onClick={() => setCurrentPage((page) => page + 1)} aria-label="Next menu page">→</button></nav>
      </section>

      <section className="story-section page-section" id="story"><div className="story-photo"><img className="story-photo-main" src={storyAsset} alt="Rooftop lights at Alps Cafe" /><div className="story-photo-detail"><img src={storyDetailAsset} alt="Warm interior details and a drink at Alps Cafe" /><span>THE ALPS MOOD</span></div><span className="vertical-label">04 / AFTER DARK</span><span className="story-photo-index">NAGERCOIL<br /><em>2026 — now</em></span></div><div className="story-copy"><p className="eyebrow">Why we are here</p><h2>A little<br /><em>more feeling.</em></h2><p>Alps is a warm room, a bright glass and one good reason to stay a while longer.</p><p>We make familiar food with curious hands, pour drinks worth slowing down for, and leave space for the moments that happen between them.</p><a className="text-link" href="#visit">Come find your corner <span>↗</span></a><div className="story-signature">Brew. Bite. Belong.<br /><small>made for your everyday escape</small></div></div></section>

      <section className="space-section page-section" id="space"><div className="section-heading"><div><p className="eyebrow">Take your time</p><h2>A table for<br /><em>every mood.</em></h2></div><p className="section-lead">Sunlit corners for slow mornings. Low lights for late plates. Upstairs, the rooftop catches the best breeze in town.</p></div><div className="gallery-grid">{gallery.map((item, index) => <figure className={`gallery-card gallery-${index + 1}`} key={item.label}><img src={item.image} alt={item.label} /><figcaption><span>0{index + 1}</span>{item.label}</figcaption></figure>)}</div></section>

      <ReviewsSection />
      <VisitPerks />

      <section className="visit-section page-section" id="visit"><div className="visit-card"><div className="visit-copy"><p className="eyebrow">Come by soon</p><h2>Make a little<br /><em>room for good.</em></h2><div className="visit-details"><p><strong>Find us</strong><br />Opp. to Industrial Estate, SIDCO<br />Kurusady, North Konam<br />Nagercoil, Tamil Nadu 629004<br /><a className="map-link" href="https://www.google.com/maps/place/ALPS+CAFE/@8.1634338,77.4114533,17z/data=!3m1!4b1!4m6!3m5!1s0x3b04f150642d7009:0x1823a6fd6948962!8m2!3d8.1634338!4d77.4114533!16s%2Fg%2F11np_90ckp?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">Open in Google Maps ↗</a></p><p><strong>Hours</strong><br />Daily / 11:30 AM - 10:30 PM<br />Kitchen closes at 10:00 PM</p><p><strong>Say hello</strong><br />+91 80984 51995<br />+91 78068 17130<br />hello@alpscafenagercoil.com</p></div><div className="map-panel"><a className="directions-button" href="https://www.google.com/maps/place/ALPS+CAFE/@8.1634338,77.4114533,17z/data=!3m1!4m6!3m5!1s0x3b04f150642d7009:0x1823a6fd6948962!8m2!3d8.1634338!4d77.4114533!16s%2Fg%2F11np_90ckp?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">Show directions <span>↗</span></a><iframe title="Find Alps Cafe on Google Maps" src="https://www.google.com/maps?q=ALPS%20CAFE%2C%20Nagercoil%208.1634338%2C77.4114533&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div><form className="booking-form" onSubmit={handleBookingSubmit}><p className="eyebrow">Table request</p><h3>{submitted ? 'We will see you soon.' : 'Save your spot.'}</h3>{submitted ? <p className="form-success">Your email draft is ready. Send it to confirm your table request.</p> : <><label>Name<input required name="name" placeholder="Your name" /></label><div className="form-row"><label>Date<input required name="date" type="date" /></label><label>Guests<select name="guests" defaultValue="2"><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5+ guests</option></select></label></div><button className="button button-light" type="submit">Request a table <span>↗</span></button></>}</form></div></section>

      <footer className="site-footer"><div className="footer-main"><a className="brand" href="#top" aria-label="Alps Cafe home"><span className="brand-mark"><img src={logoAsset} alt="Alps Cafe logo" /></span></a><p>Good food. Better company.<br />See you upstairs.</p><div className="footer-links"><a href="#menu">Menu</a><a href="#story">About</a><a href="#visit">Contact</a><a href="#visit">Instagram ↗</a></div></div><div className="footer-bottom"><span>© 2026 Alps Cafe</span><span>Made for slow days and long nights.</span></div></footer>
    </main>
  )
}

export default App
