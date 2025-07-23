import React from 'react'
import AllPlayers from './AllPlayers'
import { PlayersList } from '@/app/providers/players/PlayersList'

const Players = () => {
  return (
    <>
      <header>
          <h1>RANKR Players</h1>
          <p>All NFL players in our database.</p>
      </header>
      <main>
        <PlayersList>
        <div className='player-rankings-wrapper flex'>
          <AllPlayers />
        </div>
        </PlayersList>
      </main>
    </>
  )
}

export default Players