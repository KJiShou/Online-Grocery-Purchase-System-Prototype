function PlaceholderPage({ title }) {
  return (
    <div className="absolute inset-0 bottom-[72px] top-0 overflow-y-auto">
      <div className="mx-auto flex h-full w-full max-w-[360px] items-center justify-center px-5 pb-6 pt-24">
        <h1 className="font-['Plus_Jakarta_Sans','Rubik',sans-serif] text-[28px] font-bold text-[#1C1B1B]">
          {title}
        </h1>
      </div>
    </div>
  )
}

export default PlaceholderPage
