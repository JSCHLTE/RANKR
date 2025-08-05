"use client"
import React, { useState } from 'react'

const PlayerLogs = ({ playerLogs }) => {

    const [years, setYears] = useState(playerLogs.map(item => item.year));
    const [yearIndex, setYearIndex] = useState(years.length - 2);

    const decrease = () => {
        if(yearIndex <= 0) return
        setYearIndex(prev => --prev);
    }

    const increase = () => {
        if(yearIndex >= years.length - 1) return
        setYearIndex(prev => ++prev);
    }

  return (
    <div className='player-logs-wrapper'>
        <div className='playerYearWrapper'>
        <div className='playerYearGroup flex-center'>
            <button onClick={decrease} className={yearIndex <= 0 ? "inactive" : ""} disabled={yearIndex <= 0 ? true : false}><i className="fa-solid fa-chevron-left"></i></button>
            <span>{years[yearIndex]}</span>
            <button onClick={increase} className={yearIndex >= years.length - 1 ? "inactive" : ""} disabled={yearIndex >= years.length - 1 ? true : false}><i className="fa-solid fa-chevron-right"></i></button>
        </div>
    </div>
        {playerLogs.map(item => {
            if(item.year == years[yearIndex]) {
                // Convert games object to array if it's not already an array
                const gamesArray = Array.isArray(item.games) 
                    ? item.games 
                    : Object.values(item.games || {});
                
                return (
                    <div key={item.team}>
                        <p>{item.team}</p>
                        {gamesArray.map((game, index) => (
                            <div key={index}>
                                {/* Add your game display logic here */}
                                <p>Game: {JSON.stringify(game.fantasyPoints)}</p>
                            </div>
                        ))}
                    </div>
                );
            } else {
                return null;
            }
        })}
    </div>
  )
}

export default PlayerLogs