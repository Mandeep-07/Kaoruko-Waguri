import { useEffect, useState } from 'react'

const MODES = {
  focus: {
    label: 'FOCUS',
    duration: 25 * 60,
  },
  short: {
    label: 'SHORT BREAK',
    duration: 5 * 60,
  },
  long: {
    label: 'LONG BREAK',
    duration: 15 * 60,
  },
}

function Pomodoro() {
  const [mode, setMode] = useState('focus')
  const [timeLeft, setTimeLeft] = useState(MODES.focus.duration)
  const [isRunning, setIsRunning] = useState(false)

  const totalTime = MODES[mode].duration

  // Timer
  useEffect(() => {
    if (!isRunning) return

    const timer = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          clearInterval(timer)
          setIsRunning(false)
          return 0
        }

        return previous - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning])

  // Change mode
  const changeMode = (newMode) => {
    setIsRunning(false)
    setMode(newMode)
    setTimeLeft(MODES[newMode].duration)
  }

  // Reset
  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(totalTime)
  }

  // Time formatting
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const formattedTime = `${String(minutes).padStart(
    2,
    '0'
  )}:${String(seconds).padStart(2, '0')}`

  // =========================
  // CIRCULAR PROGRESS
  // =========================

  const radius = 70
  const circumference = 2 * Math.PI * radius

  // 1 = completely full
  // 0 = completely empty
  const progress = timeLeft / totalTime

  const dashOffset = circumference * (1 - progress)

  return (
    <section className="absolute left-10 top-44 w-[29%] max-w-[440px]">
      <div
        className="
          rounded-3xl
          border
          border-[var(--theme-border)]
          bg-[var(--theme-card)]
          px-5 py-5
          text-center
          backdrop-blur-md
          shadow-[0_0_25px_rgba(0,0,0,0.15)]
        "
      >

        {/* TITLE */}
        <h2
          className="
            text-xl
            font-medium
            tracking-wide
            text-[var(--theme-text)]
          "
        >
          Pomodoro Focus
        </h2>

        {/* TIMER RING */}
        <div className="my-5 flex justify-center">

          <div
            className={`
              relative
              flex
              h-[155px]
              w-[155px]
              items-center
              justify-center
              rounded-full
              ${isRunning ? 'animate-pulse' : ''}
            `}
          >

            <svg
              className="absolute inset-0 h-full w-full -rotate-90"
              viewBox="0 0 160 160"
            >

              {/* Background ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="transparent"
                stroke="var(--theme-border)"
                strokeWidth="9"
              />

              {/* Glow ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="transparent"
                stroke="var(--theme-accent)"
                strokeWidth="13"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="blur-[5px]"
              />

              {/* Main progress ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="transparent"
                stroke="url(#themeGradient)"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="transition-[stroke-dashoffset] duration-1000 ease-linear"
              />

              {/* Theme gradient */}
              <defs>
                <linearGradient
                  id="themeGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--theme-accent)"
                  />

                  <stop
                    offset="50%"
                    stopColor="var(--theme-accent-light)"
                  />

                  <stop
                    offset="100%"
                    stopColor="var(--theme-accent-dark)"
                  />
                </linearGradient>
              </defs>

            </svg>

            {/* Time */}
            <span
              className="
                relative
                z-10
                text-[32px]
                font-light
                tracking-wide
                text-[var(--theme-text)]
              "
            >
              {formattedTime}
            </span>

          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-3">

          {/* START */}
          <button
            onClick={() => setIsRunning(true)}
            className="
              rounded-full
              bg-[var(--theme-accent-light)]
              px-6
              py-2
              text-sm
              font-medium
              text-black
              transition
              hover:scale-105
              hover:brightness-110
            "
          >
            {isRunning ? 'RUNNING' : 'START'}
          </button>

          {/* PAUSE */}
          <button
            onClick={() => setIsRunning(false)}
            className="
              rounded-full
              border
              border-[var(--theme-border)]
              bg-[var(--theme-card)]
              px-5
              py-2
              text-sm
              font-medium
              text-[var(--theme-text)]
              transition
              hover:brightness-125
            "
          >
            PAUSE
          </button>

          {/* RESET */}
          <button
            onClick={resetTimer}
            className="
              rounded-full
              border
              border-[var(--theme-border)]
              bg-[var(--theme-card)]
              px-5
              py-2
              text-sm
              font-medium
              text-[var(--theme-text)]
              transition
              hover:brightness-125
            "
          >
            RESET
          </button>

        </div>

        {/* MODES */}
        <div
          className="
            mt-4
            flex
            justify-center
            gap-4
            text-[11px]
            tracking-wide
          "
        >

          {/* FOCUS */}
          <button
            onClick={() => changeMode('focus')}
            className={`
              transition
              ${
                mode === 'focus'
                  ? 'text-[var(--theme-accent-light)]'
                  : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-accent-light)]'
              }
            `}
          >
            FOCUS
          </button>

          {/* SHORT BREAK */}
          <button
            onClick={() => changeMode('short')}
            className={`
              transition
              ${
                mode === 'short'
                  ? 'text-[var(--theme-accent-light)]'
                  : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-accent-light)]'
              }
            `}
          >
            SHORT BREAK
          </button>

          {/* LONG BREAK */}
          <button
            onClick={() => changeMode('long')}
            className={`
              transition
              ${
                mode === 'long'
                  ? 'text-[var(--theme-accent-light)]'
                  : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-accent-light)]'
              }
            `}
          >
            LONG BREAK
          </button>

        </div>

      </div>
    </section>
  )
}

export default Pomodoro