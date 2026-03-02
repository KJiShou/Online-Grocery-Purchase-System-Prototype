import { useState } from 'react'
import './App.css'

const categories = [
  { id: 'fresh', icon: 'FR', label: 'Fresh Products' },
  { id: 'packaged', icon: 'PK', label: 'Packaged Food' },
  { id: 'dairy', icon: 'DF', label: 'Dairy & Frozen' },
  { id: 'beverage', icon: 'BV', label: 'Beverage' },
]

const productsData = [
  {
    id: 'broccoli',
    name: 'Broccoli (1 unit)',
    price: 3.0,
    oldPrice: null,
    image:
      'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'dutch-lady',
    name: 'Dutch Lady Milk',
    price: 7.0,
    oldPrice: 8.0,
    image:
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'cooking-oil',
    name: 'Cooking Oil',
    price: 12.5,
    oldPrice: null,
    image:
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'raw-sugar',
    name: 'Raw Sugar',
    price: 5.9,
    oldPrice: null,
    image:
      'https://images.unsplash.com/photo-1581022295087-35e593704911?auto=format&fit=crop&w=500&q=80',
  },
]

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
      <section className="phone-screen">
        <header className="status-bar">
          <span className="status-time">9:41</span>
          <div className="status-icons" aria-hidden="true">
            <span>o</span>
            <span>~</span>
            <span>=</span>
          </div>
        </header>

        <main className="page-content">
          <section className="top-row">
            <h1>Home Page</h1>
            <button className="search-button" aria-label="Search">
              S
            </button>
          </section>

          <section className="hero-card">
            <img
              src="https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=900&q=80"
              alt="Fresh fruits weekly specials"
            />
            <div className="hero-overlay">
              <span className="discount-pill">30% OFF</span>
              <p>Fresh Fruits Weekly Specials</p>
            </div>
            <div className="hero-slider" aria-hidden="true">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </section>

          <section className="section-title">
            <h2>Categories</h2>
            <button type="button">SEE ALL</button>
          </section>

          <section className="category-row" aria-label="Category list">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-card${activeCategory === category.id ? ' active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="category-icon" aria-hidden="true">
                  {category.icon}
                </span>
                <span>{category.label}</span>
              </button>
            ))}
          </section>

          <section className="section-title">
            <h2>Popular Products</h2>
            <button type="button">SEE ALL</button>
          </section>

          <section className="product-grid">
            {productsData.map((product) => {
              const isLiked = likedProducts.includes(product.id)
              return (
                <article key={product.id} className="product-card">
                  <button
                    className={`wish-btn${isLiked ? ' active' : ''}`}
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={`Add ${product.name} to wishlist`}
                  >
                    {isLiked ? 'H' : '+'}
                  </button>
                  <img src={product.image} alt={product.name} />
                  <p className="product-name">{product.name}</p>
                  <p className="price">{money(product.price)}</p>
                  {product.oldPrice ? <p className="old-price">{money(product.oldPrice)}</p> : null}
                </article>
              )
            })}
          </section>
        </main>

        <nav className="bottom-nav" aria-label="Main navigation">
          <button
            className={activeTab === 'home' ? 'active' : ''}
            onClick={() => setActiveTab('home')}
          >
            <span aria-hidden="true">H</span>
            <span>Home</span>
          </button>
          <button
            className={activeTab === 'categories' ? 'active' : ''}
            onClick={() => setActiveTab('categories')}
          >
            <span aria-hidden="true">C</span>
            <span>Categories</span>
          </button>
          <button
            className={activeTab === 'cart' ? 'active' : ''}
            onClick={() => setActiveTab('cart')}
          >
            <span aria-hidden="true">T</span>
            <span>My Cart</span>
          </button>
          <button
            className={activeTab === 'wishlist' ? 'active' : ''}
            onClick={() => setActiveTab('wishlist')}
          >
            <span aria-hidden="true">W</span>
            <span>Wishlist</span>
          </button>
          <button
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            <span aria-hidden="true">P</span>
            <span>Profile</span>
          </button>
        </nav>

        <div className="home-indicator" aria-hidden="true">
          <div className="pill"></div>
        </div>
      </section>
    </div>
  )
}

export default App