import { useState } from 'react'
import './App.css'

const categories = [
  { id: 'fresh', label: 'Fresh Produce' },
  { id: 'packaged', label: 'Packaged Food' },
  { id: 'dairy', label: 'Dairy & Frozen' },
  { id: 'beverage', label: 'Beverage' },
]

const productsData = [
  {
    id: 'broccoli',
    name: 'Broccoli (1 unit)',
    price: 3.0,
    oldPrice: null,
    image:
      'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'dutch-lady',
    name: 'Dutch Lady Milk',
    price: 7.0,
    oldPrice: 8.0,
    image:
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cooking-oil',
    name: 'Cooking Oil',
    price: 12.5,
    oldPrice: 16.0,
    image:
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'raw-sugar',
    name: 'Raw Sugar',
    price: 5.9,
    oldPrice: 7.2,
    image:
      'https://images.unsplash.com/photo-1581022295087-35e593704911?auto=format&fit=crop&w=600&q=80',
  },
]

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16L20 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function NavIcon({ type, active }) {
  const color = active ? '#4CBF35' : '#6F7384'

  if (type === 'home') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 10.5L12 4L20 10.5V20H14V14H10V20H4V10.5Z" fill={color} />
      </svg>
    )
  }

  if (type === 'categories') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="7" height="7" rx="1.5" fill={color} />
        <rect x="13" y="4" width="7" height="7" rx="1.5" fill={color} />
        <rect x="4" y="13" width="7" height="7" rx="1.5" fill={color} />
        <rect x="13" y="13" width="7" height="7" rx="1.5" fill={color} />
      </svg>
    )
  }

  if (type === 'cart') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5H6L8 15H18L20 8H9" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="19" r="1.7" fill={color} />
        <circle cx="17" cy="19" r="1.7" fill={color} />
      </svg>
    )
  }

  if (type === 'wishlist') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20L5.2 13.5C3 11.3 3 7.8 5.2 5.8C7.1 4.1 10.1 4.4 12 6.3C13.9 4.4 16.9 4.1 18.8 5.8C21 7.8 21 11.3 18.8 13.5L12 20Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" fill="none" stroke={color} strokeWidth="1.8" />
      <path d="M5 19C6.5 15.7 9 14 12 14C15 14 17.5 15.7 19 19" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [activeCategory, setActiveCategory] = useState('fresh')
  const [likedProducts, setLikedProducts] = useState(['dutch-lady'])

  const toggleWishlist = (productId) => {
    setLikedProducts((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    )
  }

  const money = (value) => `RM${value.toFixed(2)}`

  return (
    <div className="stage">
      <section className="phone-screen" aria-label="Home Screen">
        <header className="status-bar">
          <span className="status-time">9:41</span>
          <div className="status-icons" aria-hidden="true">
            <span className="signal"><i></i><i></i><i></i><i></i></span>
            <span className="wifi"></span>
            <span className="battery"><em></em></span>
          </div>
        </header>

        <section className="header-row">
          <h1>Home Page</h1>
          <button className="search-button" aria-label="Search">
            <SearchIcon />
          </button>
        </section>

        <section className="banner" aria-label="Weekly specials banner">
          <img
            src="https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=900&q=80"
            alt="Fresh fruits"
          />
          <div className="banner-overlay"></div>
          <div className="badge-group">
            <span className="badge">30% OFF</span>
            <p>Fresh Fruits</p>
            <p>Weekly Specials</p>
          </div>
          <div className="progress-indicators" aria-hidden="true">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </section>

        <section className="categories-section">
          <div className="headline">
            <h2>Categories</h2>
            <button type="button">SEE ALL</button>
          </div>
          <div className="categories-list">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-card${activeCategory === category.id ? ' active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-image" aria-hidden="true"></span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="products-section">
          <div className="headline">
            <h2>Popular Products</h2>
            <button type="button">SEE ALL</button>
          </div>
          <div className="products-listing">
            {productsData.map((product) => {
              const isLiked = likedProducts.includes(product.id)
              return (
                <article key={product.id} className="product-card">
                  <button
                    className={`wishlist-btn${isLiked ? ' active' : ''}`}
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={`Toggle wishlist for ${product.name}`}
                  >
                    <span>{isLiked ? 'H' : '+'}</span>
                  </button>
                  <img src={product.image} alt={product.name} />
                  <div className="product-text">
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">{money(product.price)}</p>
                    <p className="product-old-price">{product.oldPrice ? money(product.oldPrice) : ''}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <nav className="bottom-navigation" aria-label="Bottom Navigation">
          {[
            { id: 'home', label: 'Home', cls: 'home' },
            { id: 'categories', label: 'Categories', cls: 'categories' },
            { id: 'cart', label: 'My Cart', cls: 'cart' },
            { id: 'wishlist', label: 'Wishlist', cls: 'wishlist' },
            { id: 'profile', label: 'Profile', cls: 'profile' },
          ].map((item) => {
            const active = activeTab === item.id
            return (
              <button key={item.id} className={`nav-item ${item.cls} ${active ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
                <span className="nav-icon"><NavIcon type={item.id} active={active} /></span>
                <span className="nav-label">{item.label}</span>
                {item.id === 'cart' ? <span className="cart-dot"></span> : null}
              </button>
            )
          })}
        </nav>

        <div className="home-indicator" aria-hidden="true">
          <div className="home-pill"></div>
        </div>
      </section>
    </div>
  )
}

export default App