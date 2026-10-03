import { useState } from 'react'
import './App.css'

import Header from './components/Header'
import Pomodoro from './components/Pomodoro'
import Youtubeplayer from './components/Youtubeplayer'
import Quicknote from './components/Quicknote'

import waguriBg from './assets/waguri-bg.jpeg'
import alyaBg from './assets/alya-bg.png'
import shinobuBg from './assets/shinobu-bg.png'

const THEMES = {
  waguri: {
    name: 'Kaoruko Waguri',
    background: waguriBg,

    accent: '#b987ff',
    accentLight: '#d8b4fe',
    accentDark: '#9b5cff',

    text: '#f3e8ff',
    textMuted: 'rgba(216, 180, 254, 0.6)',

    border: 'rgba(190, 120, 255, 0.2)',
    card: 'rgba(15, 10, 25, 0.68)',

    // ORIGINAL PURPLE GLOW
    shadowColor: 'rgba(180, 120, 255, 0.12)',
  },

  alya: {
    name: 'Alya Kujou',
    background: alyaBg,

    accent: '#8fd3ff',
    accentLight: '#c7e9ff',
    accentDark: '#4aa8e8',

    text: '#eef9ff',
    textMuted: 'rgba(199, 233, 255, 0.6)',

    border: 'rgba(143, 211, 255, 0.22)',
    card: 'rgba(8, 18, 28, 0.68)',

    // ALYA BLUE GLOW
    shadowColor: 'rgba(100, 190, 255, 0.15)',
  },

  shinobu: {
    name: 'Shinobu Kocho',
    background: shinobuBg,

    accent: '#c49cff',
    accentLight: '#eadcff',
    accentDark: '#9b68e8',

    text: '#f7f0ff',
    textMuted: 'rgba(234, 220, 255, 0.6)',

    border: 'rgba(196, 156, 255, 0.22)',
    card: 'rgba(18, 12, 28, 0.68)',

    // SHINOBU PURPLE GLOW
    shadowColor: 'rgba(190, 130, 255, 0.15)',
  },
}

function App() {
  const [selectedTheme, setSelectedTheme] = useState('waguri')

  const theme = THEMES[selectedTheme]

  return (
    <main
      className="dashboard"
      style={{
        backgroundImage: `url(${theme.background})`,

        '--theme-accent': theme.accent,
        '--theme-accent-light': theme.accentLight,
        '--theme-accent-dark': theme.accentDark,

        '--theme-text': theme.text,
        '--theme-text-muted': theme.textMuted,

        '--theme-border': theme.border,
        '--theme-card': theme.card,

        // THEME-SPECIFIC BOX GLOW
        '--theme-shadow-color': theme.shadowColor,
      }}
    >
      <Header
        themes={THEMES}
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
      />

      <Pomodoro />
      <Youtubeplayer />
      <Quicknote />
    </main>
  )
}

export default App