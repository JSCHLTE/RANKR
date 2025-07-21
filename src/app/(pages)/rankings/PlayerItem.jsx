import { check } from "@/app/providers/posRanking/posRanking";
import { PlayerStatsLabel } from "./PlayerStats";
import { PlayerStatsValue } from "./PlayerStats";
import { teams } from "@/app/providers/teams/TeamProvider";

const PlayerItem = ({ 
  player, 
  overallRank, 
  onClick, 
  playerList,
  dragHandleProps, // For drag handle in edit mode
  isDragging, // For drag-specific styles
  getHeight,
  playerCard
}) => {
  return (
    <div 
      className={`player-item ${playerCard.includes(player.playerId) ? 'active' : ''}`} 
      onClick={onClick} // Optional, for static list
      style={{
        zIndex: isDragging ? 1000 : 'auto',
        position: isDragging ? 'fixed' : 'static',
      }}
    >
      <div className="player-item-inner">
      {dragHandleProps && ( // Conditionally render drag handle for edit mode
        <div className="drag-handle-tab flex-center" {...dragHandleProps}>
          <div className="lines-wrapper flex-center">
            <div className="line-drag"></div>
            <div className="line-drag"></div>
            <div className="line-drag"></div>
          </div>
        </div>
      )}
      <div className="player-item-all-wrapper flex">
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
            <p className="player-name">{player.full_name}</p>
          </div>
          <div className="player-item-info-details flex">
            <span>Overall: {overallRank}</span>
            <span className={`player-pos ${player.position}`}>
              {player.position} {check(playerList, player)}
            </span>
            {player.years_exp === 0 && player.position !== "DEF" ? (
              <span className="player-rookie">Rookie</span>
            ) : null}
          </div>
        </div>
      </div>
      </div>

      { player.seasons && playerCard?.includes(player.playerId) ? 
      <>
            <div className="player-card-header-info flex">
              <div className="player-card-player-info-wrapper flex">
                <div className="player-card-player-info age">
                  <div className="player-card-player-info-title-wrapper flex-center">
                    <h5 className="player-card-player-info-title">Age</h5>
                  </div>
                  <div className="player-card-player-info-value-wrapper flex-center">
                    <span className="player-card-player-value">{player.age}</span>
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
                    <span className="player-card-player-value">{player.weight}</span>
                  </div>
                </div>
                <div className="player-card-player-info exp">
                  <div className="player-card-player-info-title-wrapper flex-center">
                    <h5 className="player-card-player-info-title">Exp</h5>
                  </div>
                  <div className="player-card-player-info-value-wrapper flex-center">
                    <span className="player-card-player-value">{player.years_exp}</span>
                  </div>
                </div>
                <div className="player-card-player-info college">
                  <div className="player-card-player-info-title-wrapper flex-center">
                    <h5 className="player-card-player-info-title">College</h5>
                  </div>
                  <div className="player-card-player-info-value-wrapper flex-center">
                    <span className="player-card-player-value">{player.college}</span>
                  </div>
                </div>
                <div className="player-card-player-info college">
                  <div className="player-card-player-info-title-wrapper flex-center">
                    <h5 className="player-card-player-info-title">Number</h5>
                  </div>
                  <div className="player-card-player-info-value-wrapper flex-center">
                    <span className="player-card-player-value">#{player.number}</span>
                  </div>
                </div>
                <div className="player-card-player-info college">
                  <div className="player-card-player-info-title-wrapper flex-center">
                    <h5 className="player-card-player-info-title">Position</h5>
                  </div>
                  <div className="player-card-player-info-value-wrapper flex-center">
                    <span className="player-card-player-value">{player.position}</span>
                  </div>
                </div>
                <div className="player-card-player-info college">
                  <div className="player-card-player-info-title-wrapper flex-center">
                    <h5 className="player-card-player-info-title">Team</h5>
                  </div>
                  <div className="player-card-player-info-value-wrapper flex-center">
                    <span className="player-card-player-value">{teams[player.currentTeam].name}</span>
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
          <th>FP</th>
          <th>FP/G</th>
          <th>GP</th>
          <PlayerStatsLabel pos={player.position} />
        </tr>
      </thead>
      <tbody>

{player.seasons.map((item, index) => (
<tr key={index}>
          <td className="logo-team"><img src={`https://sleepercdn.com/images/team_logos/nfl/${item.team.toLowerCase()}.png`} alt="${item.team} Logo" width={25} height={25}/>{item.team}</td>
          <td>{item.year}</td>
          <td className="table-stat">{typeof item.totals?.fantasyPoints === "number" ? item.totals.fantasyPoints.toFixed(2) : "—"}</td>
          <td className="table-stat">{
            item.totals?.gamesPlayed
              ? (item.totals.fantasyPoints / item.totals.gamesPlayed).toFixed(2)
              : "—"
          }</td>
          <td className={`table-stat ${item.totals?.gamesPlayed <= 14 ? "red" : "green"}`}>{item.totals?.gamesPlayed ?? "—"}</td>

          <PlayerStatsValue player={player} item={item} />


        </tr>
)).reverse()}


      </tbody>
    </table>
  </div></> : ""}
    </div>
  );
};

export default PlayerItem;