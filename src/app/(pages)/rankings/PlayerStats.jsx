import React from 'react'

export const PlayerStatsLabel = ({ pos }) => {
  return (
    <>
            { pos === "WR" ? 
          
          <>
          <tr>
            <th colSpan={5} className='table-section'>Details</th>
            <th colSpan={4} className='table-section'>Receiving</th>
            <th colSpan={4} className='table-section'>Rushing</th>
          </tr>
          <tr>

            <th>Team</th>
            <th>Year</th>
            <th>Games</th>
            <th>FP</th>
            <th>FP/G</th>
            <th>Targets</th>
            <th>Rec</th>
            <th>RecYds</th>
            <th>RecTD</th>
            <th>RushAtt</th>
            <th>RushYds</th>
            <th>RushTD</th>
            <th>Fum</th>
          </tr>
          </>

          : "" }

        { pos === "RB" ? 
                
                <>
                <tr>
            <th colSpan={5} className='table-section'>Details</th>
            <th colSpan={4} className='table-section'>Rushing</th>
            <th colSpan={4} className='table-section'>Receiving</th>
          </tr>
          <tr>
            <th>Team</th>
            <th>Year</th>
            <th>Games</th>
            <th>FP</th>
            <th>FP/G</th>
            <th>RushAtt</th>
            <th>RushYds</th>
            <th>RushTD</th>
            <th>Fum</th>
            <th>Targets</th>
            <th>Rec</th>
            <th>RecYds</th>
            <th>RecTD</th>
          </tr>
          </>
                : "" }

        { pos === "QB" ? 

          <>
                <tr>
            <th colSpan={5} className='table-section'>Details</th>
            <th colSpan={5} className='table-section'>Passing</th>
            <th colSpan={4} className='table-section'>Rushing</th>
          </tr>
          <tr>
            <th>Team</th>
            <th>Year</th>
            <th>Games</th>
            <th>FP</th>
            <th>FP/G</th>
            <th>ATT</th>
            <th>CMP%</th>
            <th>YDS</th>
            <th>TDS</th>
            <th>INT</th>
            <th>RushAtt</th>
            <th>RushYds</th>
            <th>RushTD</th>
            <th>Fum</th>
          </tr>
          </>
                      

                        : "" }

        { pos === "TE" ? 
                                
          <>
          <tr>
            <th colSpan={5} className='table-section'>Details</th>
            <th colSpan={4} className='table-section'>Receiving</th>
            <th colSpan={4} className='table-section'>Rushing</th>
          </tr>
          <tr>

            <th>Team</th>
            <th>Year</th>
            <th>Games</th>
            <th>FP</th>
            <th>FP/G</th>
            <th>Targets</th>
            <th>Rec</th>
            <th>RecYds</th>
            <th>RecTD</th>
            <th>RushAtt</th>
            <th>RushYds</th>
            <th>RushTD</th>
            <th>Fum</th>
          </tr>
          </>

                                : "" }


                    {/* <th>Team</th>
          <th>Year</th>
          <th>FP</th>
          <th>FP/G</th>
          <th>GP</th>
          <th>Rec</th>
          <th>Targets</th>
          <th>RecYds</th>
          <th>RecTD</th>
          <th>RushAtt</th>
          <th>RushYds</th>
          <th>RushTD</th>
          <th>Fum</th>
          <th>Attempts</th>
          <th>Comp</th>
          <th>Yards</th>
          <th>Td's</th>
          <th>Int</th> */}
    </>
  )
}

export const PlayerStatsValue = ({ playerCard, item, player }) => {

    const seasonTotals = {

      /*
      the getStat func uses these values

      stat < low = red
      stat > low = yellow

      stat < mid = yellow
      stat > mid = green

      */

      "WR": {
        "fantasyPoints": {
          low: 184,
          mid: 249
        },
        "receptions": {
          low: 59,
          mid: 79
        },
        "targets": {
          low: 99,
          mid: 135
        },
        "receivingYards": {
          low: 899,
          mid: 1299
        },
        "receivingTDs": {
          low: 4,
          mid: 9
        }
      },
      "TE": {
        "receptions": {
          low: 54,
          mid: 74
        },
        "targets": {
          low: 79,
          mid: 99
        },
        "receivingYards": {
          low: 599,
          mid: 899
        },
        "receivingTDs": {
          low: 3,
          mid: 6
        }
      },
      "RB": {
        "fantasyPoints": {
          low: 184,
          mid: 289
        },
        "rushingAttempts": {
          low: 174,
          mid: 254
        },
        "rushingYards": {
          low: 749,
          mid: 1129
        },
        "rushingTDs": {
          low: 7,
          mid: 12
        },
        "targets": {
          low: 49,
          mid: 74
        },
        "receptions": {
          low: 44,
          mid: 59
        },
        "receivingYards": {
          low: 299,
          mid: 899
        },
        "receivingTDs": {
          low: 3,
          mid: 6
        }
      },
      "QB": {
        "fantasyPoints": {
          low: 249,
          mid: 319
        },
        "passingAttempts": {
          low: 439,
          mid: 514
        },
        "passingPct": {
          low: 61,
          mid: 64
        },
        "passingYards": {
          low: 3300,
          mid: 4099
        },
        "passingTDs": {
          low: 23,
          mid: 31
        },
        "interceptions": {
          low: 44,
          mid: 59
        },
        "rushingAttempts": {
          low: 299,
          mid: 899
        },
        "rushingYards": {
          low: 3,
          mid: 6
        }, 
        "rushingTDs": {
          low: 0,
          mid: 0
        }, 
        "fumbles": {
          low: 0,
          mid: 0
        }
      }
    }

    const getStat = (type, low, mid) => {
        return `table-stat ${type <= low ? "red" : type <= mid ? "yellow" : "green"}`
    }

    return (
      <>
                { player.position === "WR" ? 
          
          <>
            <td className={`table-stat ${item.totals?.gamesPlayed <= 14 ? "red" : "green"}`}>{item.totals?.gamesPlayed ?? "—"}</td>
            <td className={getStat(item.totals?.fantasyPoints, seasonTotals.WR.fantasyPoints.low, seasonTotals.WR.fantasyPoints.mid)}>{typeof item.totals?.fantasyPoints === "number" ? item.totals.fantasyPoints.toFixed(1) : "—"}</td>
            <td className={getStat(item.totals?.fantasyPoints, seasonTotals.WR.fantasyPoints.low, seasonTotals.WR.fantasyPoints.mid)}>{
            item.totals?.gamesPlayed
              ? (item.totals.fantasyPoints / item.totals.gamesPlayed).toFixed(1)
              : "—"
            }</td>
            <td className={getStat(item.totals?.targets, seasonTotals.WR.targets.low, seasonTotals.WR.targets.mid)}>{item.totals?.targets ?? 0}</td>
            <td className={getStat(item.totals?.receptions, seasonTotals.WR.receptions.low, seasonTotals.WR.receptions.mid)}>{item.totals?.receptions ?? 0}</td>
            <td className={getStat(item.totals?.receivingYards, seasonTotals.WR.receivingYards.low, seasonTotals.WR.receivingYards.mid)}>{item.totals?.receivingYards ?? 0}</td>
            <td className={getStat(item.totals?.receivingTDs, seasonTotals.WR.receivingTDs.low, seasonTotals.WR.receivingTDs.mid)}>{item.totals?.receivingTDs ?? 0}</td>
            <td className="table-stat">{item.totals?.rushingAttempts ?? 0}</td>
            <td className="table-stat">{item.totals?.rushingYards ?? 0}</td>
            <td className="table-stat">{item.totals?.rushingTDs ?? 0}</td>
            <td className="table-stat">{item.totals?.fumbles ?? 0}</td>
            </>
          
          : "" }

          { player.position === "TE" ? 
          
            <>
            <td className={`table-stat ${item.totals?.gamesPlayed <= 14 ? "red" : "green"}`}>{item.totals?.gamesPlayed ?? "—"}</td>
            <td className="table-stat">{typeof item.totals?.fantasyPoints === "number" ? item.totals.fantasyPoints.toFixed(1) : "—"}</td>
            <td className="table-stat">{
            item.totals?.gamesPlayed
              ? (item.totals.fantasyPoints / item.totals.gamesPlayed).toFixed(1)
              : "—"
            }</td>
            <td className={getStat(item.totals?.receptions, seasonTotals.TE.receptions.low, seasonTotals.TE.receptions.mid)}>{item.totals?.receptions ?? 0}</td>
            <td className={getStat(item.totals?.targets, seasonTotals.TE.targets.low, seasonTotals.TE.targets.mid)}>{item.totals?.targets ?? 0}</td>
            <td className={getStat(item.totals?.receivingYards, seasonTotals.TE.receivingYards.low, seasonTotals.TE.receivingYards.mid)}>{item.totals?.receivingYards ?? 0}</td>
            <td className={getStat(item.totals?.receivingTDs, seasonTotals.TE.receivingTDs.low, seasonTotals.TE.receivingTDs.mid)}>{item.totals?.receivingTDs ?? 0}</td>
            <td className="table-stat">{item.totals?.rushingAttempts ?? 0}</td>
            <td className="table-stat">{item.totals?.rushingYards ?? 0}</td>
            <td className="table-stat">{item.totals?.rushingTDs ?? 0}</td>
            <td className="table-stat">{item.totals?.fumbles ?? 0}</td>
            </>
          
          : "" }

          { player.position === "RB" ? 
                    
            <>
            <td className={`table-stat ${item.totals?.gamesPlayed <= 14 ? "red" : "green"}`}>{item.totals?.gamesPlayed ?? "—"}</td>
              <td className={getStat(item.totals?.fantasyPoints, seasonTotals.RB.fantasyPoints.low, seasonTotals.RB.fantasyPoints.mid)}>{typeof item.totals?.fantasyPoints === "number" ? item.totals.fantasyPoints.toFixed(1) : "—"}</td>
              <td className={getStat(item.totals?.fantasyPoints, seasonTotals.RB.fantasyPoints.low, seasonTotals.RB.fantasyPoints.mid)}>{
                item.totals?.gamesPlayed
                ? (item.totals.fantasyPoints / item.totals.gamesPlayed).toFixed(1)
                : "—"
              }</td>
              <td className={getStat(item.totals?.rushingAttempts, seasonTotals.RB.rushingAttempts.low, seasonTotals.RB.rushingAttempts.mid)}>{item.totals?.rushingAttempts ?? 0}</td>
              <td className={getStat(item.totals?.rushingYards, seasonTotals.RB.rushingYards.low, seasonTotals.RB.rushingYards.mid)}>{item.totals?.rushingYards ?? 0}</td>
              <td className={getStat(item.totals?.rushingTDs, seasonTotals.RB.rushingTDs.low, seasonTotals.RB.rushingTDs.mid)}>{item.totals?.rushingTDs ?? 0}</td>
              <td className="table-stat">{item.totals?.fumbles ?? 0}</td>
              <td className={getStat(item.totals?.targets, seasonTotals.RB.targets.low, seasonTotals.RB.targets.mid)}>{item.totals?.targets ?? 0}</td>
              <td className={getStat(item.totals?.receptions, seasonTotals.RB.receptions.low, seasonTotals.RB.receptions.mid)}>{item.totals?.receptions ?? 0}</td>
              <td className={getStat(item.totals?.receivingYards, seasonTotals.RB.receivingYards.low, seasonTotals.RB.receivingYards.mid)}>{item.totals?.receivingYards ?? 0}</td>
              <td className={getStat(item.totals?.receivingTDs, seasonTotals.RB.receivingTDs.low, seasonTotals.RB.receivingTDs.mid)}>{item.totals?.receivingTDs ?? 0}</td>
            </>
                    
          : "" }

          { player.position === "QB" ? 
                              
            <>
            <td className={`table-stat ${item.totals?.gamesPlayed <= 14 ? "red" : "green"}`}>{item.totals?.gamesPlayed ?? "—"}</td>
            <td className={getStat(item.totals?.fantasyPoints, seasonTotals.QB.fantasyPoints.low, seasonTotals.QB.fantasyPoints.mid)}>{typeof item.totals?.fantasyPoints === "number" ? item.totals.fantasyPoints.toFixed(1) : "—"}</td>
            <td className={getStat(item.totals?.fantasyPoints, seasonTotals.QB.fantasyPoints.low, seasonTotals.QB.fantasyPoints.mid)}>{
            item.totals?.gamesPlayed
              ? (item.totals.fantasyPoints / item.totals.gamesPlayed).toFixed(1)
              : "—"
            }</td>
              <td className={getStat(item.totals?.passingAttempts, seasonTotals.QB.passingAttempts.low, seasonTotals.QB.passingAttempts.mid)}>{item.totals?.passingAttempts ?? 0}</td>
              <td className={getStat((item.totals?.completions / item.totals?.passingAttempts * 100).toFixed(1), seasonTotals.QB.passingPct.low, seasonTotals.QB.passingPct.mid)}>{(item.totals?.completions / item.totals?.passingAttempts * 100).toFixed(1) ?? 0}%</td>
              <td className={getStat(item.totals?.passingYards, seasonTotals.QB.passingYards.low, seasonTotals.QB.passingYards.mid)}>{item.totals?.passingYards ?? 0}</td>
              <td className={getStat(item.totals?.passingTDs, seasonTotals.QB.passingTDs.low, seasonTotals.QB.passingTDs.mid)}>{item.totals?.passingTDs ?? 0}</td>
              <td className="table-stat">{item.totals?.interceptions ?? 0}</td>
              <td className="table-stat">{item.totals?.rushingAttempts ?? 0}</td>
              <td className="table-stat">{item.totals?.rushingYards ?? 0}</td>
              <td className="table-stat">{item.totals?.rushingTDs ?? 0}</td>
              <td className="table-stat">{item.totals?.fumbles ?? 0}</td>
            </>
                              
          : "" }

          {/* <td className="table-stat">{item.totals?.receptions ?? 0}</td>
          <td className="table-stat">{item.totals?.targets ?? 0}</td>
          <td className="table-stat">{item.totals?.receivingYards ?? 0}</td>
          <td className="table-stat">{item.totals?.receivingTDs ?? 0}</td>
          <td className="table-stat">{item.totals?.rushingAttempts ?? 0}</td>
          <td className="table-stat">{item.totals?.rushingYards ?? 0}</td>
          <td className="table-stat">{item.totals?.rushingTDs ?? 0}</td>
          <td className="table-stat">{item.totals?.fumbles ?? 0}</td>
          <td className="table-stat">{item.totals?.passingAttempts ?? 0}</td>
          <td className="table-stat">{item.totals?.passingCompletions ?? 0}</td>
          <td className="table-stat">{item.totals?.passingYards ?? 0}</td>
          <td className="table-stat">{item.totals?.passingTDs ?? 0}</td>
          <td className="table-stat">{item.totals?.interceptions ?? 0}</td> */}
      </>
    )
  }