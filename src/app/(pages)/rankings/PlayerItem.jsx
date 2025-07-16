import { check } from "@/app/providers/posRanking/posRanking";

const PlayerItem = ({ 
  player, 
  overallRank, 
  onClick, 
  playerList,
  dragHandleProps, // For drag handle in edit mode
  isDragging // For drag-specific styles
}) => {
  return (
    <div 
      className="player-item flex" 
      onClick={onClick} // Optional, for static list
      style={{
        height: "90px",
        zIndex: isDragging ? 1000 : 'auto',
        position: isDragging ? 'fixed' : 'static',
      }}
    >
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
  );
};

export default PlayerItem;