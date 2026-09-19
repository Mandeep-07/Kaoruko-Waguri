import { useEffect, useState } from 'react'

function Header() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const date = currentTime.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const time = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return (
    <header className="absolute top-10 left-10 w-[48%] max-w-[660px]">
      <div
        className="
          flex items-center justify-between
          rounded-2xl
          border border-purple-300/20
          bg-transparent
          px-6 py-4
          backdrop-blur-md
          shadow-[0_0_25px_rgba(180,120,255,0.12)]
        "
      >

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-xl font-medium tracking-wide text-purple-100">
            KAORUKO WAGURI
          </h1>

          <p className="mt-1 text-sm text-purple-200/60">
            {date}&nbsp; | &nbsp;{time}
          </p>
        </div>

        {/* SETTINGS */}
        <button
          className="
            text-2xl
            text-purple-200/80
            transition
            hover:text-purple-100
            hover:rotate-45
          "
          aria-label="Settings"
        >
          ⚙
        </button>

      </div>
    </header>
  )
}

export default Header