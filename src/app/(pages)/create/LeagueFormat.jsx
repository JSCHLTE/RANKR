import React from 'react'

import "./format.css"

const LeagueFormat = () => {
  return (
    <div className='format-wrapper'>
        <div className='format-item'>
            <h3>Redraft</h3>
            <p>Rosters reset after the fantasy season</p>
        </div>
        <div className='format-item'>
            <h3>Keeper</h3>
            <p>Each owner can keep designated players for next season</p>
        </div>
        <div className='format-item'>
            <h3>Dynasty</h3>
            <p>All rosters stay with their team owners</p>
        </div>
    </div>
  )
}

export default LeagueFormat