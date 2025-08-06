"use client"
import React, { useState } from 'react'
import { POSITION_STAT_FIELDS } from '@/app/providers/statLabels/statLabels'
import { getStat, getStatLow } from '@/app/providers/statColor/statColor'

import { gameTotals } from '@/app/providers/statColor/statValues'

import "../CSS/playerTable.css"

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
    <div className='player-stat-season-wrapper'>
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
                                <td><div className='table-stat'>Week {index}</div></td>
                                <td><div className='table-stat'>{game.opponent}</div></td>
                                <td><div className={`${getStat(game.fantasyPoints, gameTotals.WR.fantasyPoints.low, gameTotals.WR.fantasyPoints.mid)}`}>{game.fantasyPoints ? game.fantasyPoints?.toFixed(1) : "-"}</div></td>
                                <td><div>{game.weeklyRank}</div></td>
                                { pos == "WR" ? 
                                <>
                                    <td><div className={`${getStat(game.targets, gameTotals.WR.targets.low, gameTotals.WR.targets.mid)}`}>{game.targets}</div></td>
                                    <td><div className={`${getStat(game.receptions, gameTotals.WR.receptions.low, gameTotals.WR.receptions.mid)}`}>{game.receptions}</div></td>
                                    <td><div className={`${getStat(game.receivingYards, gameTotals.WR.receivingYards.low, gameTotals.WR.receivingYards.mid)}`}>{game.receivingYards}</div></td>
                                    <td><div className={`${getStat(game.receivingTDs, gameTotals.WR.receivingTDs.low, gameTotals.WR.receivingTDs.mid)}`}>{game.receivingTDs}</div></td>
                                    <td><div className={`${getStat(game.rushingAttempts, gameTotals.WR.rushingAttempts.low, gameTotals.WR.rushingAttempts.mid)}`}>{game.rushingAttempts}</div></td>
                                    <td><div className={`${getStat(game.rushingYards, gameTotals.WR.rushingYards.low, gameTotals.WR.rushingYards.mid)}`}>{game.rushingYards}</div></td>
                                    <td><div className={`${getStat(game.rushingTDs, gameTotals.WR.rushingTDs.low, gameTotals.WR.rushingTDs.mid)}`}>{game.rushingTDs}</div></td>
                                    <td><div className={`${getStat(game.fumbles, gameTotals.WR.fumbles.low, gameTotals.WR.fumbles.mid)}`}>{game.fumbles}</div></td>
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
    </div>
  )
}

export default PlayerLogs