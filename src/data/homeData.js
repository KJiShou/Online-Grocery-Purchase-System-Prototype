import bananaImage from '../assets/home/banana.png'
import chickenBreastImage from '../assets/home/chicken breast.png'
import cookingOilImage from '../assets/home/cooking oil.png'
import dutchLadyMilkImage from '../assets/home/dutchLadyMilk.png'
import eggImage from '../assets/home/egg.png'
import gardeniaImage from '../assets/home/gardenia.png'
import instantNoodleImage from '../assets/home/instant noodle.png'
import potatoImage from '../assets/home/potato.png'
import rawSugarImage from '../assets/home/raw sugar.png'
import riceImage from '../assets/home/rice.png'
import waterImage from '../assets/home/water.png'
import yellowOnionImage from '../assets/home/yellow onion.png'
import bakeryBreakfastIcon from '../assets/categories/bakery-breakfast.png'
import beveragesIcon from '../assets/categories/beverages.png'
import biscuitsCrackersIcon from '../assets/categories/biscuits-crackers.png'
import cookingCondimentsIcon from '../assets/categories/cooking-condiments.png'
import dairyFrozenIcon from '../assets/categories/dairy-frozen.png'
import freshProduceIcon from '../assets/categories/fresh-produce.png'
import iceCreamIcon from '../assets/categories/ice-cream.png'
import meatSeafoodDeliIcon from '../assets/categories/meat-seafood-deli.png'
import packagedFoodIcon from '../assets/categories/packaged-food.png'
import riceNoodlesPastaIcon from '../assets/categories/rice-noodles-pasta.png'

export const bannerItems = [
  {
    id: 'fresh-fruit-1',
    image: dutchLadyMilkImage,
    title: 'Dairy Deals',
    subtitle: 'Fresh Milk Picks',
    discount: '30% OFF',
    productId: 'dutch-lady',
  },
  {
    id: 'fresh-fruit-2',
    image: bananaImage,
    title: 'Fresh Fruits',
    subtitle: 'Daily Healthy Picks',
    discount: '15% OFF',
    productId: 'bananas',
  },
  {
    id: 'fresh-fruit-3',
    image: cookingOilImage,
    title: 'Kitchen Essentials',
    subtitle: 'Daily Groceries',
    discount: 'NEW',
    productId: 'cooking-oil',
  },
]

export const categories = [
  { id: 'fresh', label: 'Fresh Produce' },
  { id: 'packaged', label: 'Packaged Food' },
  { id: 'dairy', label: 'Dairy & Frozen' },
  { id: 'beverage', label: 'Beverage' },
]

export const productCategories = [
  { id: 'beverages', label: 'Beverages', icon: beveragesIcon },
  { id: 'dairy-frozen', label: 'Dairy & Frozen', icon: dairyFrozenIcon },
  { id: 'fresh-produce', label: 'Fresh Produce', icon: freshProduceIcon },
  { id: 'packaged-food', label: 'Packaged Food', icon: packagedFoodIcon },
  { id: 'meat-seafood-deli', label: 'Meat, Seafood & Deli', icon: meatSeafoodDeliIcon },
  { id: 'bakery-breakfast', label: 'Bakery & Breakfast', icon: bakeryBreakfastIcon },
  { id: 'rice-noodles-pasta', label: 'Rice, Noodles & Pasta', icon: riceNoodlesPastaIcon },
  { id: 'biscuits-crackers', label: 'Biscuits & Crackers', icon: biscuitsCrackersIcon },
  { id: 'ice-cream', label: 'Ice Cream', icon: iceCreamIcon },
  { id: 'cooking-condiments', label: 'Cooking & Condiments', icon: cookingCondimentsIcon },
]

export const products = [
  {
    id: 'white-bread',
    categoryId: 'bakery-breakfast',
    name: 'Gardenia Original Classic White Bread',
    price: 3.4,
    oldPrice: 3.8,
    image: gardeniaImage,
    description:
      'Soft Gardenia white bread that is suitable for toast, sandwiches, and quick breakfast at home.',
  },
  {
    id: 'eggs',
    categoryId: 'dairy-frozen',
    name: 'Grade A Eggs (10 pcs)',
    price: 5.9,
    oldPrice: null,
    image: eggImage,
    description:
      'Fresh brown eggs packed in a tray, ideal for breakfast, baking, and everyday family cooking.',
  },
  {
    id: 'dutch-lady',
    categoryId: 'dairy-frozen',
    name: 'Dutch Lady Fresh Milk 1L',
    price: 7.0,
    oldPrice: 8.0,
    image: dutchLadyMilkImage,
    description:
      'Dutch Lady fresh milk in a family-size pack, a common choice for cereal, drinks, and daily household use.',
  },
  {
    id: 'rice',
    categoryId: 'rice-noodles-pasta',
    name: 'Super Import Rice 5kg',
    price: 18.9,
    oldPrice: 21.5,
    image: riceImage,
    description:
      'A household-size rice pack suited for everyday lunch and dinner preparation for the family.',
  },
  {
    id: 'cooking-oil',
    categoryId: 'cooking-condiments',
    name: 'Cooking Oil 2kg',
    price: 12.5,
    oldPrice: 16.0,
    image: cookingOilImage,
    description:
      'A large bottle of cooking oil for frying and everyday meal preparation in the home kitchen.',
  },
  {
    id: 'onions',
    categoryId: 'fresh-produce',
    name: 'Yellow Onions 1kg',
    price: 4.2,
    oldPrice: null,
    image: yellowOnionImage,
    description:
      'Fresh yellow onions for stir-fry, soup, and base cooking, adding aroma and flavor to savory dishes.',
  },
  {
    id: 'potatoes',
    categoryId: 'fresh-produce',
    name: 'Potatoes 1kg',
    price: 4.8,
    oldPrice: 5.5,
    image: potatoImage,
    description:
      'Fresh potatoes that are suitable for frying, roasting, mashing, or adding into curries and stews.',
  },
  {
    id: 'chicken-breast',
    categoryId: 'meat-seafood-deli',
    name: 'Chicken Breast 500g',
    price: 11.9,
    oldPrice: 13.5,
    image: chickenBreastImage,
    description:
      'Fresh chicken breast portion for grilling, pan-frying, soup, or simple weekday meals.',
  },
  {
    id: 'instant-noodles',
    categoryId: 'packaged-food',
    name: 'Instant Noodles Multipack',
    price: 6.9,
    oldPrice: null,
    image: instantNoodleImage,
    description:
      'A convenient instant noodle pack for quick meals, supper, or stocking up the pantry.',
  },
  {
    id: 'raw-sugar',
    categoryId: 'packaged-food',
    name: 'Raw Sugar 1kg',
    price: 5.9,
    oldPrice: 7.2,
    image: rawSugarImage,
    description:
      'Golden raw sugar for drinks, baking, and cooking, with a richer look and color than regular white sugar.',
  },
  {
    id: 'bananas',
    categoryId: 'fresh-produce',
    name: 'Bananas 1kg',
    price: 4.5,
    oldPrice: null,
    image: bananaImage,
    description:
      'Fresh bananas for quick breakfast, smoothies, lunch boxes, and easy daily snacking.',
  },
  {
    id: 'mineral-water',
    categoryId: 'beverages',
    name: 'Mineral Water 1.5L',
    price: 2.2,
    oldPrice: null,
    image: waterImage,
    description:
      'Bottled drinking water for daily hydration at home, at work, or while traveling.',
  },
]
