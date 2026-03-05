import beveragesIcon from '../assets/categories/beverages.png'
import dairyFrozenIcon from '../assets/categories/dairy-frozen.png'
import freshProduceIcon from '../assets/categories/fresh-produce.png'
import packagedFoodIcon from '../assets/categories/packaged-food.png'

const categoryIconMap = {
  fresh: freshProduceIcon,
  packaged: packagedFoodIcon,
  dairy: dairyFrozenIcon,
  beverage: beveragesIcon,
}

export function SearchIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M15.3337 28.9998C7.80033 28.9998 1.66699 22.8665 1.66699 15.3332C1.66699 7.79984 7.80033 1.6665 15.3337 1.6665C22.867 1.6665 29.0003 7.79984 29.0003 15.3332C29.0003 22.8665 22.867 28.9998 15.3337 28.9998ZM15.3337 3.6665C8.89366 3.6665 3.66699 8.9065 3.66699 15.3332C3.66699 21.7598 8.89366 26.9998 15.3337 26.9998C21.7737 26.9998 27.0003 21.7598 27.0003 15.3332C27.0003 8.9065 21.7737 3.6665 15.3337 3.6665Z"
        fill="#1C1B1B"
      />
      <path
        d="M29.3333 30.3333C29.0799 30.3333 28.8266 30.2399 28.6266 30.0399L25.9599 27.3733C25.5733 26.9866 25.5733 26.3466 25.9599 25.9599C26.3466 25.5733 26.9866 25.5733 27.3733 25.9599L30.0399 28.6266C30.4266 29.0133 30.4266 29.6533 30.0399 30.0399C29.8399 30.2399 29.5866 30.3333 29.3333 30.3333Z"
        fill="#1C1B1B"
      />
    </svg>
  )
}

export function SearchFieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke="#6F7384"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M21 21L17.2 17.2" stroke="#6F7384" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function FilterIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22 7.25H16C15.59 7.25 15.25 6.91 15.25 6.5C15.25 6.09 15.59 5.75 16 5.75H22C22.41 5.75 22.75 6.09 22.75 6.5C22.75 6.91 22.41 7.25 22 7.25Z" fill="#6F7384" />
      <path d="M6 7.25H2C1.59 7.25 1.25 6.91 1.25 6.5C1.25 6.09 1.59 5.75 2 5.75H6C6.41 5.75 6.75 6.09 6.75 6.5C6.75 6.91 6.41 7.25 6 7.25Z" fill="#6F7384" />
      <path d="M10 10.75C7.66 10.75 5.75 8.84 5.75 6.5C5.75 4.16 7.66 2.25 10 2.25C12.34 2.25 14.25 4.16 14.25 6.5C14.25 8.84 12.34 10.75 10 10.75ZM10 3.75C8.48 3.75 7.25 4.98 7.25 6.5C7.25 8.02 8.48 9.25 10 9.25C11.52 9.25 12.75 8.02 12.75 6.5C12.75 4.98 11.52 3.75 10 3.75Z" fill="#6F7384" />
      <path d="M22 18.25H18C17.59 18.25 17.25 17.91 17.25 17.5C17.25 17.09 17.59 16.75 18 16.75H22C22.41 16.75 22.75 17.09 22.75 17.5C22.75 17.91 22.41 18.25 22 18.25Z" fill="#6F7384" />
      <path d="M8 18.25H2C1.59 18.25 1.25 17.91 1.25 17.5C1.25 17.09 1.59 16.75 2 16.75H8C8.41 16.75 8.75 17.09 8.75 17.5C8.75 17.91 8.41 18.25 8 18.25Z" fill="#6F7384" />
      <path d="M14 21.75C11.66 21.75 9.75 19.84 9.75 17.5C9.75 15.16 11.66 13.25 14 13.25C16.34 13.25 18.25 15.16 18.25 17.5C18.25 19.84 16.34 21.75 14 21.75ZM14 14.75C12.48 14.75 11.25 15.98 11.25 17.5C11.25 19.02 12.48 20.25 14 20.25C15.52 20.25 16.75 19.02 16.75 17.5C16.75 15.98 15.52 14.75 14 14.75Z" fill="#6F7384" />
    </svg>
  )
}

export function RecentArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18.9999 18.2499C18.8099 18.2499 18.6199 18.1799 18.4699 18.0299L4.46994 4.02994C4.17994 3.73994 4.17994 3.25994 4.46994 2.96994C4.75994 2.67994 5.23994 2.67994 5.52994 2.96994L19.5299 16.9699C19.8199 17.2599 19.8199 17.7399 19.5299 18.0299C19.3799 18.1799 19.1899 18.2499 18.9999 18.2499Z" fill="#C0C0C0" />
      <path d="M5 14.52C4.59 14.52 4.25 14.18 4.25 13.77V3.5C4.25 3.09 4.59 2.75 5 2.75H15.27C15.68 2.75 16.02 3.09 16.02 3.5C16.02 3.91 15.68 4.25 15.27 4.25H5.75V13.77C5.75 14.18 5.41 14.52 5 14.52Z" fill="#C0C0C0" />
    </svg>
  )
}

export function HeartIcon({ filled = false }) {
  if (filled) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M16.44 3.1001C14.63 3.1001 13.01 3.9801 12 5.3301C10.99 3.9801 9.37 3.1001 7.56 3.1001C4.49 3.1001 2 5.6001 2 8.6901C2 9.8801 2.19 10.9801 2.52 12.0001C4.1 17.0001 8.97 19.9901 11.38 20.8101C11.72 20.9301 12.28 20.9301 12.62 20.8101C15.03 19.9901 19.9 17.0001 21.48 12.0001C21.81 10.9801 22 9.8801 22 8.6901C22 5.6001 19.51 3.1001 16.44 3.1001Z"
          fill="#FFFFFF"
        />
      </svg>
    )
  }

  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M6 10.8248C5.845 10.8248 5.695 10.8048 5.57 10.7598C3.66 10.1048 0.625 7.7798 0.625 4.3448C0.625 2.5948 2.04 1.1748 3.78 1.1748C4.625 1.1748 5.415 1.5048 6 2.0948C6.585 1.5048 7.375 1.1748 8.22 1.1748C9.96 1.1748 11.375 2.5998 11.375 4.3448C11.375 7.7848 8.34 10.1048 6.43 10.7598C6.305 10.8048 6.155 10.8248 6 10.8248ZM3.78 1.9248C2.455 1.9248 1.375 3.0098 1.375 4.3448C1.375 7.7598 4.66 9.6598 5.815 10.0548C5.905 10.0848 6.1 10.0848 6.19 10.0548C7.34 9.6598 10.63 7.7648 10.63 4.3448C10.63 3.0098 9.55 1.9248 8.225 1.9248C7.465 1.9248 6.76 2.2798 6.305 2.8948C6.165 3.0848 5.845 3.0848 5.705 2.8948C5.24 2.2748 4.54 1.9248 3.78 1.9248Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

export function CategoryIcon({ type }) {
  const iconSrc = categoryIconMap[type]

  if (!iconSrc) {
    return <div className="h-8 w-8 rounded-full bg-[#F4F5FD]" aria-hidden="true" />
  }

  return <img src={iconSrc} alt="" className="h-8 w-8 object-contain" aria-hidden="true" />
}
