import broccoliImage from '../assets/home/broccoli.jpg'
import cookingOilImage from '../assets/home/cooking-oil.jpg'
import dutchLadyImage from '../assets/home/dutch-lady.jpg'
import rawSugarImage from '../assets/grocery-list/gula-prai.png'

export const bannerItems = [
  {
    id: 'fresh-fruit-1',
    image: dutchLadyImage,
    title: 'Fresh Fruits',
    subtitle: 'Weekly Specials',
    discount: '30% OFF',
  },
  {
    id: 'fresh-fruit-2',
    image: broccoliImage,
    title: 'Organic Picks',
    subtitle: 'Save More Today',
    discount: '15% OFF',
  },
  {
    id: 'fresh-fruit-3',
    image: cookingOilImage,
    title: 'Daily Groceries',
    subtitle: 'New Arrivals',
    discount: 'NEW',
  },
]

export const categories = [
  { id: 'fresh', label: 'Fresh Produce' },
  { id: 'packaged', label: 'Packaged Food' },
  { id: 'dairy', label: 'Dairy & Frozen' },
  { id: 'beverage', label: 'Beverage' },
]

export const products = [
  {
    id: 'broccoli',
    name: 'Broccoli (1 unit)',
    price: 3.0,
    oldPrice: null,
    image: broccoliImage,
  },
  {
    id: 'dutch-lady',
    name: 'Dutch Lady Milk',
    price: 7.0,
    oldPrice: 8.0,
    image: dutchLadyImage,
  },
  {
    id: 'cooking-oil',
    name: 'Cooking Oil',
    price: 12.5,
    oldPrice: 16.0,
    image: cookingOilImage,
  },
  {
    id: 'raw-sugar',
    name: 'Raw Sugar',
    price: 5.9,
    oldPrice: 7.2,
    image: rawSugarImage,
  },
]
