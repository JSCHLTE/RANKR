import React from 'react'
import Players from './Players'
import "../rankings/players.css"

const Create = () => {
  return (
    <>
    <header className="rankings-header flex">
      <h1>Our Rankings</h1>
    </header>
    <main className="player-rankings-wrapper flex">
        <Players />
    </main>
    </>
  )
}

export default Create