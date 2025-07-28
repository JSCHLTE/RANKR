import { check } from "@/app/providers/posRanking/posRanking";
import "../CSS/playerItem.css"
import "../CSS/playerTable.css"
import PlayerTable from "./PlayerTable";

const PlayerItem = ({ 
  player, 
  overallRank, 
  onClick, 
  playerList,
  dragHandleProps, // For drag handle in edit mode
  isDragging, // For drag-specific styles
  playerCard,
}) => {

  const playerSeasons = playerCard?.find(obj => obj.playerId === player.playerId);

  return (
    <div 
      className={`player-item ${playerCard?.some(obj => obj.playerId === player.playerId) ? 'active' : ''}`}  
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
      { playerCard?.some(obj => obj.playerId === player.playerId) ? <PlayerTable player={player} playerSeasons={playerSeasons} playerCard={playerCard} /> : ""}
    </div>
  );
};

export default PlayerItem;