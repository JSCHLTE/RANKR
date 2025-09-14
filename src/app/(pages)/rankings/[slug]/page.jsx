import Players from "./Players"
import "../../CSS/players.css"
import { PlayersList } from "@/app/providers/players/PlayersList"

const Rankings = () => {
  return (
    <>
    <PlayersList>
        <Players />
    </PlayersList>
    </>
  )
}

export default Rankings