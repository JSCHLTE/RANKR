import Players from "./Players"
import './players.css'

const Rankings = () => {
  return (
    <>
    <header className="rankings-header flex">
      <h1>Our Rankings</h1>
      <p>Rank Junkie's official 2025 rankings</p>
    </header>
    <main className="player-rankings-wrapper flex">
        <Players />
    </main>
    </>
  )
}

export default Rankings