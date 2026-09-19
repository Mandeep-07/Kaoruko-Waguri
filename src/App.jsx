import './App.css'
import Header from './components/Header'
import Pomodoro from './components/Pomodoro'
import Youtubeplayer from './components/Youtubeplayer'
import Quicknote from './components/Quicknote'

function App() {
  return (
    <main className="dashboard">
      <Header />
      <Pomodoro />
      <Youtubeplayer />
      <Quicknote />
    </main>
  )
}

export default App