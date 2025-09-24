'use client'

import React, { useState } from 'react'
import { PlayerStatsLabel } from "./PlayerStats";
import { PlayerStatsValue } from "./PlayerStats";
import PlayerTableToggle from './PlayerTableToggle';
import PlayerLogs from './PlayerLogs';
import YearSelect from './YearSelect';


const PlayerTable = ({ player, playerSeasons, playerCard, setPlayerCard }) => {

  // Check if career mode is active for this specific player
  const isCareerMode = playerCard.find(({ mode, playerId }) => mode === "career" && playerId === player.playerId);

  //This is the year switcher for the player
  const [years, setYears] = useState(playerSeasons.stats.map(item => item.year));
  const [yearIndex, setYearIndex] = useState(years.length - 2);

  return (
    <>
    {/* <div className="player-card-header-info flex">
      <div className="player-card-player-info-wrapper flex">
        <div className="player-card-player-info age">
          <div className="player-card-player-info-title-wrapper flex-center">
            <h5 className="player-card-player-info-title">Age</h5>
          </div>
          <div className="player-card-player-info-value-wrapper flex-center">
            <span className="player-card-player-value">{player.age ? player.age : "N/A"}</span>
          </div>
        </div>
        <div className="player-card-player-info height">
          <div className="player-card-player-info-title-wrapper flex-center">
            <h5 className="player-card-player-info-title">Height</h5>
          </div>
          <div className="player-card-player-info-value-wrapper flex-center">
            <span className="player-card-player-value">{getHeight(player.height)}</span>
          </div>
        </div>
        <div className="player-card-player-info weight">
          <div className="player-card-player-info-title-wrapper flex-center">
            <h5 className="player-card-player-info-title">Weight</h5>
          </div>
          <div className="player-card-player-info-value-wrapper flex-center">
            <span className="player-card-player-value">{player.weight ? player.weight : "N/A"}</span>
          </div>
        </div>
        <div className="player-card-player-info exp">
          <div className="player-card-player-info-title-wrapper flex-center">
            <h5 className="player-card-player-info-title">Exp</h5>
          </div>
          <div className="player-card-player-info-value-wrapper flex-center">
            <span className="player-card-player-value">{player.years_exp ? player.years_exp : "N/A"}</span>
          </div>
        </div>
        <div className="player-card-player-info college">
          <div className="player-card-player-info-title-wrapper flex-center">
            <h5 className="player-card-player-info-title">College</h5>
          </div>
          <div className="player-card-player-info-value-wrapper flex-center">
            <span className="player-card-player-value">{player.college ? player.college : "N/A"}</span>
          </div>
        </div>
        <div className="player-card-player-info college">
          <div className="player-card-player-info-title-wrapper flex-center">
            <h5 className="player-card-player-info-title">Number</h5>
          </div>
          <div className="player-card-player-info-value-wrapper flex-center">
            <span className="player-card-player-value">{player.number ? `${player.number}` : "N/A"}</span>
          </div>
        </div>
        <div className="player-card-player-info college">
          <div className="player-card-player-info-title-wrapper flex-center">
            <h5 className="player-card-player-info-title">Position</h5>
          </div>
          <div className="player-card-player-info-value-wrapper flex-center">
            <span className="player-card-player-value">{player.position ? player.position : "N/A"}</span>
          </div>
        </div>
        <div className="player-card-player-info college">
          <div className="player-card-player-info-title-wrapper flex-center">
            <h5 className="player-card-player-info-title">Team</h5>
          </div>
          <div className="player-card-player-info-value-wrapper flex-center">
            <span className="player-card-player-value">{teams[player.currentTeam]?.name ? teams[player.currentTeam]?.name : "N/A"}</span>
          </div>
        </div>
      </div>
    </div> */}
    { player?.years_exp > 0 ? 
    <>
    <div className='player-stats-wrapper'>
    <PlayerTableToggle player={player} playerCard={playerCard} setPlayerCard={setPlayerCard} />
    <YearSelect years={years} yearIndex={yearIndex} setYearIndex={setYearIndex} />
<table border="1" className='stats-table'>
  <tbody className={ isCareerMode ? "" : "hide" }>
  <PlayerStatsLabel pos={player.position} />

{playerSeasons?.stats?.map((item, index) => {
  if(item.year === 2025) return;
return (
    <tr key={index}>
      <td><div className='table-stat team'><div className='logo-team'><img src={`https://sleepercdn.com/images/team_logos/nfl/${item.team.toLowerCase()}.png`} alt="${item.team} Logo" width={25} height={25}/>{item.team}</div></div></td>
      <td><div className='table-stat'>{item.year}</div></td>
      <PlayerStatsValue playerCard={playerCard} item={item} player={player}/>
    </tr>
)
}).reverse()}
</tbody>
  <tbody className={ isCareerMode ? "hide" : "" }>
    <PlayerLogs playerLogs={playerSeasons.stats} pos={player.position} years={years} yearIndex={yearIndex}/>
  </tbody>
</table>
</div></> : <p className='stats-error'>Stats for {player.full_name} are not available.</p> }
</>
  )
}

export default PlayerTable