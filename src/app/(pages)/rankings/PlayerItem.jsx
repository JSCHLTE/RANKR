import { check } from "@/app/providers/posRanking/posRanking";
import { PlayerStatsLabel } from "./PlayerStats";
import { PlayerStatsValue } from "./PlayerStats";
import { teams } from "@/app/providers/teams/TeamProvider";
import { getHeight } from "@/app/providers/players/getHeight";
import "../CSS/playerItem.css"
import "../CSS/playerTable.css"

const PlayerItem = ({ 
  player, 
  overallRank, 
  onClick, 
  playerList,
  dragHandleProps, // For drag handle in edit mode
  isDragging, // For drag-specific styles
  playerCard,
}) => {

  return (
    <div 
      className={`player-item ${playerCard.playerId?.includes(player.playerId) ? 'active' : ''}`} 
      style={{
        zIndex: isDragging ? 1000 : 'auto',
        position: isDragging ? 'fixed' : 'static',
      }}
    >
      <div className="player-item-inner">
      <div className="player-item-all-wrapper">
      <div className="player-item-header flex" onClick={onClick}>
      {dragHandleProps && ( // Conditionally render drag handle for edit mode
        <div className="drag-handle-tab flex-center" {...dragHandleProps}>
          <div className="lines-wrapper flex-center">
            <div className="line-drag"></div>
            <div className="line-drag"></div>
            <div className="line-drag"></div>
          </div>
        </div>
      )}
      <div className="player-item-img-wrapper">
          {player.currentTeam && ( // Assuming player has currentTeam; make optional if needed
            <img
              src={`https://sleepercdn.com/images/team_logos/nfl/${player.currentTeam.toLowerCase()}.png`}
              alt={`${player.currentTeam} logo`}
              className="player-team-logo"
            />
          )}
          <img 
            src={player.playerImg ?? "/images/player-default.webp"} 
            alt={player.full_name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/player-default.webp";
            }} 
          />
        </div>
        <div className="player-item-info-wrapper">
          <div className="player-item-info-name">
            <p className="player-name">{player.full_name ? player.full_name : "N/A"}</p>
          </div>
          <div className="player-item-info-details flex">
            <span>Overall: {overallRank ? overallRank : "N/A"}</span>
            <span className={`player-pos ${player.position ? player.position : "N/A"}`}>
              {player.position ? player.position : "N/A"} {check(playerList, player)}
            </span>
            {player.years_exp === 0 && player.position !== "DEF" ? (
              <span className="player-rookie">Rookie</span>
            ) : null}
          </div>
        </div>
      </div>
      </div>
</div>
      {/* { player.seasons && playerCard?.includes(player.playerId) ? 
      <>
            <div className="player-card-header-info flex">
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
            </div>
  <div className="player-stat-season-wrapper">
    <table border="1">
    <thead>
        <tr>
          <th>Team</th>
          <th>Year</th>
          <th>GP</th>
          <th>FP</th>
          <th>FP/G</th>
          <PlayerStatsLabel pos={player.position} />
        </tr>
      </thead>
      <tbody>

{player.seasons.map((item, index) => (
<tr key={index}>
          <td className="logo-team"><img src={`https://sleepercdn.com/images/team_logos/nfl/${item.team.toLowerCase()}.png`} alt="${item.team} Logo" width={25} height={25}/>{item.team}</td>
          <td>{item.year}</td>

          <PlayerStatsValue player={player} item={item} />


        </tr>
)).reverse()}


      </tbody>
    </table>
  </div></> : ""} */}
    </div>
  );
};

export default PlayerItem;