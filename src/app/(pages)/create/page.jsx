import React from 'react'
import "../css/players.css"
import CreateRankings from './CreateRankings'
import "./create.css"

const Create = () => {

  return (
    <>
    <header className="rankings-header flex">
      <h1 className='knewave'>Create Your Own Rankings</h1>
      <p>Go into your drafts with full confidence, and never hesitate when it’s your turn on the board. Rank players your way and build the team you believe in.</p>
    </header>
    <main className="player-rankings-wrapper flex">
      <CreateRankings />
    </main>
    </>
  )
}

export default Create