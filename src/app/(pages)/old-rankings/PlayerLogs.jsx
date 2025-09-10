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
        if(yearIndex >= years.length - 2) return
        setYearIndex(prev => ++prev);
    }

  return (
    <div className='player-logs-wrapper'>
        <div className='playerYearWrapper'>
        <div className='playerYearGroup flex-center'>
            <button onClick={decrease} className={yearIndex <= 0 ? "inactive" : ""} disabled={yearIndex <= 0 ? true : false}><i className="fa-solid fa-chevron-left"></i></button>
            <span>{years[yearIndex]}</span>
            <button onClick={increase} className={yearIndex >= years.length - 2 ? "inactive" : ""} disabled={yearIndex >= years.length - 1 ? true : false}><i className="fa-solid fa-chevron-right"></i></button>
        </div>
    </div>
    <table border="1" className='stats-table'>
        <tr>
            <th colSpan="4" className='table-section border-right'>DETAILS</th>
            { pos == "WR" ? 
            <>
                <th colSpan="5" className='table-section border-right'>Receiving</th>
                <th colSpan="4" className='table-section'>Rushing</th>
            </> 
            : "" }
            { pos == "RB" ? 
            <>
                <th colSpan="5" className='table-section border-right'>Rushing</th>
                <th colSpan="5" className='table-section'>Receiving</th>
            </>
            : "" }
            { pos == "QB" ? 
            <>
                <th colSpan="5" className='table-section border-right'>Passing</th>
                <th colSpan="4" className='table-section'>Rushing</th>
            </>
            : "" }
            { pos == "TE" ? 
            <>
                <th colSpan="4" className='table-section'>Receiving</th>
            </>
            : "" }
        </tr>
        <tr>
            <th>WEEK</th>
            <th>OPP</th>
            <th>PPR</th>
            <th className='border-right'>RANK</th>
            { pos == "WR" ? 
            <>
                <th className='spacing-left'>{labels.targets.label}</th>
                <th>{labels.receptions.label}</th>
                <th>{labels.recYards.label}</th>
                <th>{labels.recTds.label}</th>
                <th className='border-right'>YPT</th>
                <th className='spacing-left'>{labels.carries.label}</th>
                <th>{labels.rushYds.label}</th>
                <th>{labels.rushTds.label}</th>
                <th>{labels.fumbles.label}</th>
            </>
            : "" }

            { pos == "RB" ? 
            <>
                <th>{labels.carries.label}</th>
                <th>{labels.rushYds.label}</th>
                <th>YDS/A</th>
                <th>{labels.rushTds.label}</th>
                <th className='border-right'>{labels.fumbles.label}</th>
                <th className='spacing-left'>{labels.targets.label}</th>
                <th>{labels.receptions.label}</th>
                <th>{labels.recYards.label}</th>
                <th>YPT</th>
                <th>{labels.recTds.label}</th>
            </>
            : "" }

            { pos == "QB" ? 
            <>
                <th>{labels.attempts.label}</th>
                <th>{labels.completionP.label}</th>
                <th>{labels.passingYards.label}</th>
                <th>{labels.passingTds.label}</th>
                <th className='border-right'>{labels.interceptions.label}</th>
                <th className='spacing-left'>{labels.carries.label}</th>
                <th>{labels.rushYds.label}</th>
                <th>{labels.rushTds.label}</th>
                <th>{labels.fumbles.label}</th>
            </>
            : "" }

            { pos == "TE" ? 
            <>
                <th className='spacing-left'>{labels.targets.label}</th>
                <th>{labels.receptions.label}</th>
                <th>{labels.recYards.label}</th>
                <th>{labels.recTds.label}</th>
            </>
            : "" }
        </tr>
        {playerLogs.map((item, index) => {
            if(item.year == years[yearIndex]) {
                const gamesArray = Array.isArray(item.games) 
                    ? item.games 
                    : Object.values(item.games || {});
                
                return (
                    <>
                        {gamesArray.map((game, index) => (
                            <tr key={index}>
                                <td><div className='table-stat'>{index}</div></td>
                                <td><div className='table-stat'>{game.opponent}</div></td>
                                { pos == "WR" ? 
                                <>
                                    <td><div className={`${getStat(game.fantasyPoints, gameTotals.WR.fantasyPoints.low, gameTotals.WR.fantasyPoints.mid)}`}>{game.fantasyPoints ? game.fantasyPoints?.toFixed(1) : "-"}</div></td>
                                    <td className='border-right'><div className={`${getStatLow(game.weeklyRank, gameTotals.rank.WR.low, gameTotals.rank.WR.mid)}`}>{game.weeklyRank}</div></td>
                                    <td className='spacing-left'><div className={`${getStat(game.targets, gameTotals.WR.targets.low, gameTotals.WR.targets.mid)}`}>{game.targets}</div></td>
                                    <td><div className={`${getStat(game.receptions, gameTotals.WR.receptions.low, gameTotals.WR.receptions.mid)}`}>{game.receptions}</div></td>
                                    <td><div className={`${getStat(game.receivingYards, gameTotals.WR.receivingYards.low, gameTotals.WR.receivingYards.mid)}`}>{game.receivingYards}</div></td>
                                    <td><div className={`${getStat(game.receivingTDs, gameTotals.WR.receivingTDs.low, gameTotals.WR.receivingTDs.mid)}`}>{game.receivingTDs}</div></td>
                                    <td className='border-right'><div className='table-stat'>{(game.receivingYards / game.targets).toFixed(1)}</div></td>
                                    <td className='spacing-left'><div className={`${getStat(game.rushingAttempts, gameTotals.WR.rushingAttempts.low, gameTotals.WR.rushingAttempts.mid)}`}>{game.rushingAttempts}</div></td>
                                    <td><div className={`${getStat(game.rushingYards, gameTotals.WR.rushingYards.low, gameTotals.WR.rushingYards.mid)}`}>{game.rushingYards}</div></td>
                                    <td><div className={`${getStat(game.rushingTDs, gameTotals.WR.rushingTDs.low, gameTotals.WR.rushingTDs.mid)}`}>{game.rushingTDs}</div></td>
                                    <td><div className={`${getStatLow(game.fumbles, gameTotals.WR.fumbles.low, gameTotals.WR.fumbles.mid)}`}>{game.fumbles}</div></td>
                                </>
                                : "" }

                                { pos == "RB" ? 
                                <>
                                    <td><div className={`${getStat(game.fantasyPoints, gameTotals.RB.fantasyPoints.low, gameTotals.RB.fantasyPoints.mid)}`}>{game.fantasyPoints ? game.fantasyPoints?.toFixed(1) : "-"}</div></td>
                                    <td className='border-right'><div className={`${getStatLow(game.weeklyRank, gameTotals.rank.RB.low, gameTotals.rank.RB.mid)}`}>{game.weeklyRank}</div></td>
                                    <td className='spacing-left'><div className={`${getStat(game.rushingAttempts, gameTotals.RB.rushingAttempts.low, gameTotals.RB.rushingAttempts.mid)}`}>{game.rushingAttempts}</div></td>
                                    <td><div className={`${getStat(game.rushingYards, gameTotals.RB.rushingYards.low, gameTotals.RB.rushingYards.mid)}`}>{game.rushingYards}</div></td>
                                    <td><div className={`${getStat(game.rushingYards, gameTotals.RB.rushingYards.low, gameTotals.RB.rushingYards.mid)}`}>{(game.rushingYards / game.rushingAttempts).toFixed(1)}</div></td>
                                    <td><div className={`${getStat(game.rushingTDs, gameTotals.RB.rushingTDs.low, gameTotals.RB.rushingTDs.mid)}`}>{game.rushingTDs}</div></td>
                                    <td className='border-right'><div className={`${getStatLow(game.fumbles, gameTotals.RB.fumbles.low, gameTotals.RB.fumbles.mid)}`}>{game.fumbles}</div></td>
                                    <td className='spacing-left'><div className={`${getStat(game.targets, gameTotals.RB.targets.low, gameTotals.RB.targets.mid)}`}>{game.targets}</div></td>
                                    <td><div className={`${getStat(game.receptions, gameTotals.RB.receptions.low, gameTotals.RB.receptions.mid)}`}>{game.receptions}</div></td>
                                    <td><div className={`${getStat(game.receivingYards, gameTotals.RB.receivingYards.low, gameTotals.RB.receivingYards.mid)}`}>{game.receivingYards}</div></td>
                                    <td><div className='table-stat'>{(game.receivingYards / game.targets).toFixed(1)}</div></td>
                                    <td><div className={`${getStat(game.receivingTDs, gameTotals.RB.receivingTDs.low, gameTotals.RB.receivingTDs.mid)}`}>{game.receivingTDs}</div></td>
                                </>
                                : "" }

                                { pos == "TE" ? 
                                <>
                                    <td><div className={`${getStat(game.fantasyPoints, gameTotals.TE.fantasyPoints.low, gameTotals.TE.fantasyPoints.mid)}`}>{game.fantasyPoints ? game.fantasyPoints?.toFixed(1) : "-"}</div></td>
                                    <td className='border-right'><div className={`${getStatLow(game.weeklyRank, gameTotals.rank.TE.low, gameTotals.rank.TE.mid)}`}>{game.weeklyRank}</div></td>
                                    <td className='spacing-left'><div className={`${getStat(game.targets, gameTotals.TE.targets.low, gameTotals.TE.targets.mid)}`}>{game.targets}</div></td>
                                    <td><div className={`${getStat(game.receptions, gameTotals.TE.receptions.low, gameTotals.TE.receptions.mid)}`}>{game.receptions}</div></td>
                                    <td><div className={`${getStat(game.receivingYards, gameTotals.TE.receivingYards.low, gameTotals.TE.receivingYards.mid)}`}>{game.receivingYards}</div></td>
                                    <td><div className={`${getStat(game.receivingTDs, gameTotals.TE.receivingTDs.low, gameTotals.TE.receivingTDs.mid)}`}>{game.receivingTDs}</div></td>
                                </>
                                : "" }

                                { pos == "QB" ? 
                                <>
                                    <td><div className={`${getStat(game.fantasyPoints, gameTotals.QB.fantasyPoints.low, gameTotals.QB.fantasyPoints.mid)}`}>{game.fantasyPoints ? game.fantasyPoints?.toFixed(1) : "-"}</div></td>
                                    <td className='border-right'><div className={`${getStatLow(game.weeklyRank, gameTotals.rank.QB.low, gameTotals.rank.QB.mid)}`}>{game.weeklyRank}</div></td>

                                    <td className='spacing-left'><div className={`${getStat(game.passingAttempts, gameTotals.QB.passingAttempts.low, gameTotals.QB.passingAttempts.mid)}`}>{game.passingAttempts}</div></td>
                                    <td><div className={getStat((game.completions / game.passingAttempts * 100).toFixed(1), gameTotals.QB.passingPct.low, gameTotals.QB.passingPct.mid)}>{(game.completions / game.passingAttempts * 100).toFixed(1) ?? 0}%</div></td>
                                    <td><div className={`${getStat(game.passingYards, gameTotals.QB.passingTDs.low, gameTotals.QB.passingYards.mid)}`}>{game.passingYards}</div></td>
                                    <td><div className={`${getStat(game.passingTDs, gameTotals.QB.passingTDs.low, gameTotals.QB.passingTDs.mid)}`}>{game.passingTDs}</div></td>
                                    <td className='border-right'><div className={`${getStatLow(game.interceptions, gameTotals.QB.interceptions.low, gameTotals.QB.interceptions.mid)}`}>{game.interceptions}</div></td>

                                    <td className='spacing-left'><div className={`${getStat(game.rushingAttempts, gameTotals.QB.rushingAttempts.low, gameTotals.QB.rushingAttempts.mid)}`}>{game.rushingAttempts}</div></td>
                                    <td><div className={`${getStat(game.rushingYards, gameTotals.QB.rushingYards.low, gameTotals.QB.rushingYards.mid)}`}>{game.rushingYards}</div></td>
                                    <td><div className={`${getStat(game.rushingTDs, gameTotals.QB.rushingTDs.low, gameTotals.QB.rushingTDs.mid)}`}>{game.rushingTDs}</div></td>
                                    <td><div className={`${getStatLow(game.fumbles, gameTotals.QB.fumbles.low, gameTotals.QB.fumbles.mid)}`}>{game.fumbles}</div></td>
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