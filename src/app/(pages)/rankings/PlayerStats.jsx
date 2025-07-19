import React from 'react'

export const PlayerStatsLabel = ({ pos }) => {
  return (
    <>
            { pos === "WR" ? 
          
          <>
            <th>Rec</th>
            <th>Targets</th>
            <th>RecYds</th>
            <th>RecTD</th>
            <th>RushAtt</th>
            <th>RushYds</th>
            <th>RushTD</th>
            <th>Fum</th>
          </>

          : "" }

        { pos === "RB" ? 
                
                <>
                <th>RushAtt</th>
                <th>RushYds</th>
                <th>RushTD</th>
                <th>Fum</th>
                <th>Rec</th>
                <th>Targets</th>
                <th>RecYds</th>
                <th>RecTD</th>
                </>

                : "" }

        { pos === "QB" ? 
                        
                        <>
          <th>Attempts</th>
          <th>Comp</th>
          <th>Yards</th>
          <th>Td's</th>
          <th>Int</th>
          <th>RushAtt</th>
          <th>RushYds</th>
          <th>RushTD</th>
          <th>Fum</th>
                        </>

                        : "" }

        { pos === "TE" ? 
                                
                                <>
                    <th>Rec</th>
                    <th>Targets</th>
                    <th>RecYds</th>
                    <th>RecTD</th>
                    <th>RushAtt</th>
                    <th>RushYds</th>
                    <th>RushTD</th>
                    <th>Fum</th>
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

export const PlayerStatsValue = ({ player, item }) => {


    const getStat = (type, low, mid) => {
        return `table-stat ${type <= low ? "red" : type <= mid ? "yellow" : "green"}`
    }

    return (
      <>
                { player.position === "WR" ? 
          
          <>
            <td className={getStat(item.totals?.receptions, 59, 79)}>{item.totals?.receptions ?? 0}</td>
            <td className={getStat(item.totals?.targets, 99, 135)}>{item.totals?.targets ?? 0}</td>
            <td className={getStat(item.totals?.receivingYards, 899, 1299)}>{item.totals?.receivingYards ?? 0}</td>
            <td className={getStat(item.totals?.receivingTDs, 4, 9)}>{item.totals?.receivingTDs ?? 0}</td>
            <td className="table-stat">{item.totals?.rushingAttempts ?? 0}</td>
            <td className="table-stat">{item.totals?.rushingYards ?? 0}</td>
            <td className="table-stat">{item.totals?.rushingTDs ?? 0}</td>
            <td className="table-stat">{item.totals?.fumbles ?? 0}</td>
            </>
          
          : "" }

          { player.position === "TE" ? 
          
            <>
              <td className="table-stat">{item.totals?.receptions ?? 0}</td>
              <td className="table-stat">{item.totals?.targets ?? 0}</td>
              <td className="table-stat">{item.totals?.receivingYards ?? 0}</td>
              <td className="table-stat">{item.totals?.receivingTDs ?? 0}</td>
              <td className="table-stat">{item.totals?.rushingAttempts ?? 0}</td>
              <td className="table-stat">{item.totals?.rushingYards ?? 0}</td>
              <td className="table-stat">{item.totals?.rushingTDs ?? 0}</td>
              <td className="table-stat">{item.totals?.fumbles ?? 0}</td>
            </>
          
          : "" }

          { player.position === "RB" ? 
                    
            <>
              <td className="table-stat">{item.totals?.rushingAttempts ?? 0}</td>
              <td className="table-stat">{item.totals?.rushingYards ?? 0}</td>
              <td className="table-stat">{item.totals?.rushingTDs ?? 0}</td>
              <td className="table-stat">{item.totals?.fumbles ?? 0}</td>
              <td className="table-stat">{item.totals?.receptions ?? 0}</td>
              <td className="table-stat">{item.totals?.targets ?? 0}</td>
              <td className="table-stat">{item.totals?.receivingYards ?? 0}</td>
              <td className="table-stat">{item.totals?.receivingTDs ?? 0}</td>
            </>
                    
          : "" }

          { player.position === "QB" ? 
                              
            <>
              <td className="table-stat">{item.totals?.passingAttempts ?? 0}</td>
              <td className="table-stat">{item.totals?.passingCompletions ?? 0}</td>
              <td className="table-stat">{item.totals?.passingYards ?? 0}</td>
              <td className="table-stat">{item.totals?.passingTDs ?? 0}</td>
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