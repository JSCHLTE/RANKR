import React from 'react'

import { POSITION_STAT_FIELDS } from '@/app/providers/statLabels/statLabels' 
import { getStat, getStatLow } from '@/app/providers/statColor/statColor'
import { seasonTotals } from '@/app/providers/statColor/statValues'

export const PlayerStatsLabel = ({ pos }) => {

  const labels = POSITION_STAT_FIELDS

  return (
    <>
            { pos === "WR" ? 
          
          <>
          <tr>
            <th colSpan={5} className='table-section border-right'>Details</th>
            <th colSpan={4} className='table-section border-right'>Receiving</th>
            <th colSpan={4} className='table-section'>Rushing</th>
          </tr>
          <tr>

            <th>{labels.team.label}</th>
            <th>{labels.year.label}</th>
            <th>{labels.games.label}</th>
            <th>{labels.ppr.label}</th>
            <th className='border-right'>{labels.pprg.label}</th>
            <th>{labels.targets.label}</th>
            <th>{labels.receptions.label}</th>
            <th>{labels.recYards.label}</th>
            <th className='border-right'>{labels.recTds.label}</th>
            <th>{labels.carries.label}</th>
            <th>{labels.rushYds.label}</th>
            <th>{labels.rushTds.label}</th>
            <th>{labels.fumbles.label}</th>
          </tr>
          </>

          : "" }

        { pos === "RB" ? 
                
                <>
                <tr>
            <th colSpan={5} className='table-section border-right'>Details</th>
            <th colSpan={4} className='table-section border-right'>Rushing</th>
            <th colSpan={4} className='table-section'>Receiving</th>
          </tr>
          <tr>
            <th>{labels.team.label}</th>
            <th>{labels.year.label}</th>
            <th>{labels.games.label}</th>
            <th>{labels.ppr.label}</th>
            <th className='border-right'>{labels.pprg.label}</th>
            <th>{labels.carries.label}</th>
            <th>{labels.rushYds.label}</th>
            <th>{labels.rushTds.label}</th>
            <th className='border-right'>{labels.fumbles.label}</th>
            <th>{labels.targets.label}</th>
            <th>{labels.receptions.label}</th>
            <th>{labels.recYards.label}</th>
            <th>{labels.recTds.label}</th>
          </tr>
          </>
                : "" }

        { pos === "QB" ? 

          <>
                <tr>
            <th colSpan={5} className='table-section border-right'>Details</th>
            <th colSpan={5} className='table-section border-right'>Passing</th>
            <th colSpan={4} className='table-section'>Rushing</th>
          </tr>
          <tr>
          <th>{labels.team.label}</th>
            <th>{labels.year.label}</th>
            <th>{labels.games.label}</th>
            <th>{labels.ppr.label}</th>
            <th className='border-right'>{labels.pprg.label}</th>
            <th>{labels.attempts.label}</th>
            <th>{labels.completionP.label}</th>
            <th>{labels.passingYards.label}</th>
            <th>{labels.passingTds.label}</th>
            <th className='border-right'>{labels.interceptions.label}</th>
            <th>{labels.carries.label}</th>
            <th>{labels.rushYds.label}</th>
            <th>{labels.rushTds.label}</th>
            <th>{labels.fumbles.label}</th>
          </tr>
          </>
                      

                        : "" }

        { pos === "TE" ? 
                                
          <>
          <tr>
            <th colSpan={5} className='table-section border-right'>Details</th>
            <th colSpan={4} className='table-section'>Receiving</th>
          </tr>
          <tr>
            <th>{labels.team.label}</th>
            <th>{labels.year.label}</th>
            <th>{labels.games.label}</th>
            <th>{labels.ppr.label}</th>
            <th className='border-right'>{labels.pprg.label}</th>
            <th>{labels.targets.label}</th>
            <th>{labels.receptions.label}</th>
            <th>{labels.recYards.label}</th>
            <th>{labels.recTds.label}</th>
          </tr>
          </>

                                : "" }
    </>
  )
}

export const PlayerStatsValue = ({ playerCard, item, player }) => {

    return (
      <>
                { player.position === "WR" ? 
          
          <>
            <td><div className={`table-stat ${item.totals?.gamesPlayed <= 14 ? "red" : "green"}`}>{item.totals?.gamesPlayed ?? "—"}</div></td>
            <td><div className={`${getStat(item.totals?.fantasyPoints, seasonTotals.WR.fantasyPoints.low, seasonTotals.WR.fantasyPoints.mid)}`}>{typeof item.totals?.fantasyPoints === "number" ? item.totals.fantasyPoints.toFixed(1) : "—"}</div></td>
            <td className='border-right'><div className={getStat(item.totals?.fantasyPoints, seasonTotals.WR.fantasyPoints.low, seasonTotals.WR.fantasyPoints.mid)}>{
            item.totals?.gamesPlayed
              ? (item.totals.fantasyPoints / item.totals.gamesPlayed).toFixed(1)
              : "—"
            }</div></td>
            <td className='spacing-left'><div className={getStat(item.totals?.targets, seasonTotals.WR.targets.low, seasonTotals.WR.targets.mid)}>{item.totals?.targets ?? 0}</div></td>
            <td><div className={getStat(item.totals?.receptions, seasonTotals.WR.receptions.low, seasonTotals.WR.receptions.mid)}>{item.totals?.receptions ?? 0}</div></td>
            <td><div className={getStat(item.totals?.receivingYards, seasonTotals.WR.receivingYards.low, seasonTotals.WR.receivingYards.mid)}>{item.totals?.receivingYards ?? 0}</div></td>
            <td className='border-right'><div className={getStat(item.totals?.receivingTDs, seasonTotals.WR.receivingTDs.low, seasonTotals.WR.receivingTDs.mid)}>{item.totals?.receivingTDs ?? 0}</div></td>
            <td className='spacing-left'><div className={getStat(item.totals?.rushingAttempts, seasonTotals.WR.rushingAttempts.low, seasonTotals.WR.rushingAttempts.mid)}>{item.totals?.rushingAttempts ?? 0}</div></td>
            <td><div className={getStat(item.totals?.rushingYards, seasonTotals.WR.rushingYards.low, seasonTotals.WR.rushingYards.mid)}>{item.totals?.rushingYards ?? 0}</div></td>
            <td><div className={getStat(item.totals?.rushingTDs, seasonTotals.WR.rushingTDs.low, seasonTotals.WR.rushingTDs.mid)}>{item.totals?.rushingTDs ?? 0}</div></td>
            <td><div className={getStatLow(item.totals?.fumbles, seasonTotals.WR.fumbles.low, seasonTotals.WR.fumbles.mid)}>{item.totals?.fumbles ?? 0}</div></td>
            </>
          
          : "" }

          { player.position === "TE" ? 
          
            <>
            <td><div className={`table-stat ${item.totals?.gamesPlayed <= 14 ? "red" : "green"}`}>{item.totals?.gamesPlayed ?? "—"}</div></td>
            <td><div className={getStat(item.totals?.fantasyPoints, seasonTotals.TE.fantasyPoints.low, seasonTotals.TE.fantasyPoints.mid)}>{typeof item.totals?.fantasyPoints === "number" ? item.totals.fantasyPoints.toFixed(1) : "—"}</div></td>
            <td className='border-right'><div className={getStat(item.totals?.fantasyPoints, seasonTotals.TE.fantasyPoints.low, seasonTotals.TE.fantasyPoints.mid)}>{
            item.totals?.gamesPlayed
              ? (item.totals.fantasyPoints / item.totals.gamesPlayed).toFixed(1)
              : "—"
            }</div></td>
            <td className='spacing-left'><div className={getStat(item.totals?.targets, seasonTotals.TE.targets.low, seasonTotals.TE.targets.mid)}>{item.totals?.targets ?? 0}</div></td>
            <td><div className={getStat(item.totals?.receptions, seasonTotals.TE.receptions.low, seasonTotals.TE.receptions.mid)}>{item.totals?.receptions ?? 0}</div></td>
            <td><div className={getStat(item.totals?.receivingYards, seasonTotals.TE.receivingYards.low, seasonTotals.TE.receivingYards.mid)}>{item.totals?.receivingYards ?? 0}</div></td>
            <td><div className={getStat(item.totals?.receivingTDs, seasonTotals.TE.receivingTDs.low, seasonTotals.TE.receivingTDs.mid)}>{item.totals?.receivingTDs ?? 0}</div></td>
            </>
          
          : "" }

          { player.position === "RB" ? 
                    
            <>
            <td><div className={`table-stat ${item.totals?.gamesPlayed <= 14 ? "red" : "green"}`}>{item.totals?.gamesPlayed ?? "—"}</div></td>
              <td><div className={getStat(item.totals?.fantasyPoints, seasonTotals.RB.fantasyPoints.low, seasonTotals.RB.fantasyPoints.mid)}>{typeof item.totals?.fantasyPoints === "number" ? item.totals.fantasyPoints.toFixed(1) : "—"}</div></td>
              <td className='border-right'><div className={`${getStat(item.totals?.fantasyPoints, seasonTotals.RB.fantasyPoints.low, seasonTotals.RB.fantasyPoints.mid)}`}>{
                item.totals?.gamesPlayed
                ? (item.totals.fantasyPoints / item.totals.gamesPlayed).toFixed(1)
                : "—"
              }</div></td>
              <td className='spacing-left'><div className={getStat(item.totals?.rushingAttempts, seasonTotals.RB.rushingAttempts.low, seasonTotals.RB.rushingAttempts.mid)}>{item.totals?.rushingAttempts ?? 0}</div></td>
              <td><div className={getStat(item.totals?.rushingYards, seasonTotals.RB.rushingYards.low, seasonTotals.RB.rushingYards.mid)}>{item.totals?.rushingYards ?? 0}</div></td>
              <td><div className={getStat(item.totals?.rushingTDs, seasonTotals.RB.rushingTDs.low, seasonTotals.RB.rushingTDs.mid)}>{item.totals?.rushingTDs ?? 0}</div></td>
              <td className='border-right'><div className={getStatLow(item.totals?.fumbles, seasonTotals.RB.fumbles.low, seasonTotals.RB.fumbles.mid)}>{item.totals?.fumbles ?? 0}</div></td>
              <td className='spacing-left'><div className={getStat(item.totals?.targets, seasonTotals.RB.targets.low, seasonTotals.RB.targets.mid)}>{item.totals?.targets ?? 0}</div></td>
              <td><div className={getStat(item.totals?.receptions, seasonTotals.RB.receptions.low, seasonTotals.RB.receptions.mid)}>{item.totals?.receptions ?? 0}</div></td>
              <td><div className={getStat(item.totals?.receivingYards, seasonTotals.RB.receivingYards.low, seasonTotals.RB.receivingYards.mid)}>{item.totals?.receivingYards ?? 0}</div></td>
              <td><div className={getStat(item.totals?.receivingTDs, seasonTotals.RB.receivingTDs.low, seasonTotals.RB.receivingTDs.mid)}>{item.totals?.receivingTDs ?? 0}</div></td>
            </>
                    
          : "" }

          { player.position === "QB" ? 
                              
            <>
            <td><div className={`table-stat ${item.totals?.gamesPlayed <= 14 ? "red" : "green"}`}>{item.totals?.gamesPlayed ?? "—"}</div></td>
            <td><div className={getStat(item.totals?.fantasyPoints, seasonTotals.QB.fantasyPoints.low, seasonTotals.QB.fantasyPoints.mid)}>{typeof item.totals?.fantasyPoints === "number" ? item.totals.fantasyPoints.toFixed(1) : "—"}</div></td>
            <td className='border-right'><div className={getStat(item.totals?.fantasyPoints, seasonTotals.QB.fantasyPoints.low, seasonTotals.QB.fantasyPoints.mid)}>{
            item.totals?.gamesPlayed
              ? (item.totals.fantasyPoints / item.totals.gamesPlayed).toFixed(1)
              : "—"
            }</div></td>
              <td className='spacing-left'><div className={getStat(item.totals?.passingAttempts, seasonTotals.QB.passingAttempts.low, seasonTotals.QB.passingAttempts.mid)}>{item.totals?.passingAttempts ?? 0}</div></td>
              <td><div className={getStat((item.totals?.completions / item.totals?.passingAttempts * 100).toFixed(1), seasonTotals.QB.passingPct.low, seasonTotals.QB.passingPct.mid)}>{(item.totals?.completions / item.totals?.passingAttempts * 100).toFixed(1) ?? 0}%</div></td>
              <td><div className={getStat(item.totals?.passingYards, seasonTotals.QB.passingYards.low, seasonTotals.QB.passingYards.mid)}>{item.totals?.passingYards ?? 0}</div></td>
              <td><div className={getStat(item.totals?.passingTDs, seasonTotals.QB.passingTDs.low, seasonTotals.QB.passingTDs.mid)}>{item.totals?.passingTDs ?? 0}</div></td>
              <td className='border-right'><div className={getStatLow(item.totals?.interceptions, seasonTotals.QB.interceptions.low, seasonTotals.QB.interceptions.mid)}>{item.totals?.interceptions ?? 0}</div></td>
              <td className='spacing-left'><div className={getStat(item.totals?.rushingAttempts, seasonTotals.QB.rushingAttempts.low, seasonTotals.QB.rushingAttempts.mid)}>{item.totals?.rushingAttempts ?? 0}</div></td>
              <td><div className={getStat(item.totals?.rushingYards, seasonTotals.QB.rushingYards.low, seasonTotals.QB.rushingYards.mid)}>{item.totals?.rushingYards ?? 0}</div></td>
              <td><div className={getStat(item.totals?.rushingTDs, seasonTotals.QB.rushingTDs.low, seasonTotals.QB.rushingTDs.mid)}>{item.totals?.rushingTDs ?? 0}</div></td>
              <td><div className={getStatLow(item.totals?.fumbles, seasonTotals.QB.fumbles.low, seasonTotals.QB.fumbles.mid)}>{item.totals?.fumbles ?? 0}</div></td>
            </>
                              
          : "" }
      </>
    )
  }