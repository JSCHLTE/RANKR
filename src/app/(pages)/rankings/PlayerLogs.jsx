"use client"
import React, { useState } from 'react'
import { POSITION_STAT_FIELDS } from './playerStatsPosition' 

const PlayerLogs = ({ playerLogs, pos }) => {

    const [years, setYears] = useState(playerLogs.map(item => item.year));
    const [yearIndex, setYearIndex] = useState(years.length - 2);

    const labels = POSITION_STAT_FIELDS

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
    <table border="1" className='stats-table'>
        <tr>
            <th>DETAILS</th>
            { pos == "WR" ? 
            <>
                <th>Receiving</th>
                <th>Rushing</th>
            </>
            : "" }
            { pos == "RB" ? 
            <>
                <th>Rushing</th>
                <th>Receiving</th>
            </>
            : "" }
            { pos == "QB" ? 
            <>
                <th>Passing</th>
                <th>Rushing</th>
            </>
            : "" }
            { pos == "TE" ? 
            <>
                <th>Receiving</th>
            </>
            : "" }
        </tr>
        <tr>
            <th>WEEK</th>
            <th>OPP</th>
            <th>PPR</th>
            <th>RANK</th>
            { pos == "WR" ? 
            <>
                <th>{labels.targets.label}</th>
                <th>{labels.receptions.label}</th>
                <th>{labels.recYards.label}</th>
                <th>{labels.recTds.label}</th>
                <th>{labels.carries.label}</th>
                <th>{labels.rushYds.label}</th>
                <th>{labels.rushTds.label}</th>
                <th>{labels.fumbles.label}</th>
            </>
            : "" }
        </tr>
        {playerLogs.map((item, index) => {
            if(item.year == years[yearIndex]) {
                // Convert games object to array if it's not already an array
                const gamesArray = Array.isArray(item.games) 
                    ? item.games 
                    : Object.values(item.games || {});
                
                return (
                    <>
                        {gamesArray.map((game, index) => (
                            <tr key={index}>
                                <td>Week {index}</td>
                                <td>{game.opponent}</td>
                                <td>{game.fantasyPoints?.toFixed(1)}</td>
                                <td>{game.weeklyRank}</td>
                                { pos == "WR" ? 
                                <>
                                    <td>{game.targets}</td>
                                    <td>{game.receptions}</td>
                                    <td>{game.receivingYards}</td>
                                    <td>{game.receivingTDs}</td>
                                    <td>{game.rushingAttempts}</td>
                                    <td>{game.rushingYards}</td>
                                    <td>{game.rushingTDs}</td>
                                    <td>{game.fumbles}</td>
                                </>
                                : "" }
                            </tr>
                        ))}
                    </>
                );
            } else {
                return null;
            }
        })}
        </table>
    </div>
  )
}

export default PlayerLogs