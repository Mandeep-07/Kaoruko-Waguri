import { useEffect, useState } from 'react'

function Header({ themes, selectedTheme, setSelectedTheme }) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

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
    <header className="absolute top-10 left-10 z-50 w-[48%] max-w-[660px]">
      <div
        className="
          relative
          flex items-center justify-between
          rounded-2xl
          border
          border-[var(--theme-border)]
          bg-[var(--theme-card)]
          px-6 py-4
          backdrop-blur-md
          shadow-[0_0_25px_var(--theme-shadow-color)]
        "
      >
        {/* LEFT SIDE */}
        <div>
          <h1
            className="
              text-xl
              font-medium
              tracking-wide
              text-[var(--theme-text)]
            "
          >
            {themes[selectedTheme].name.toUpperCase()}
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-[var(--theme-text-muted)]
            "
          >
            {date}&nbsp; | &nbsp;{time}
          </p>
        </div>

        {/* SETTINGS */}
        <div className="relative">
          <button
            onClick={() => setIsSettingsOpen((previous) => !previous)}
            className="
              text-2xl
              text-[var(--theme-accent-light)]
              transition
              hover:text-[var(--theme-accent)]
              hover:rotate-45
            "
            aria-label="Settings"
          >
            ⚙
          </button>

          {/* THEME MENU */}
          {isSettingsOpen && (
            <div
              className="
                absolute
                right-0
                top-12
                z-50
                w-52
                overflow-hidden
                rounded-xl
                border
                border-[var(--theme-border)]
                bg-black/70
                p-2
                backdrop-blur-xl
                shadow-[0_0_30px_var(--theme-shadow-color)]
              "
            >
              <p
                className="
                  px-3
                  py-2
                  text-xs
                  font-medium
                  uppercase
                  tracking-wider
                  text-[var(--theme-text-muted)]
                "
              >
                Choose Theme
              </p>

              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedTheme(key)
                    setIsSettingsOpen(false)
                  }}
                  className={`
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-lg
                    px-3
                    py-2
                    text-left
                    text-sm
                    transition
                    ${
                      selectedTheme === key
                        ? 'bg-white/10 text-[var(--theme-text)]'
                        : 'text-[var(--theme-text-muted)] hover:bg-white/5 hover:text-[var(--theme-text)]'
                    }
                  `}
                >
                  <span>{theme.name}</span>

                  {selectedTheme === key && (
                    <span className="text-[var(--theme-accent)]">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header