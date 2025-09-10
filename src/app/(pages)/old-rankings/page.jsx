import Players from "./Players"
import "../CSS/players.css"
import { PlayersList } from "@/app/providers/players/PlayersList"

const Rankings = () => {
  return (
    <>
    <header className="rankings-header flex">
      <h1>Our Rankings</h1>
    </header>
    <main className="player-rankings-wrapper flex">
    <PlayersList>
        <Players />
    </PlayersList>
    </main>
    </>
  )
}

export default Rankings