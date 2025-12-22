import { check } from "@/app/providers/posRanking/posRanking";
import "../../CSS/playerItem.css"
import "../../CSS/playerTable.css"
import PlayerTable from "./PlayerTable";

const PlayerItem = ({
  player,
  overallRank,
  onClick,
  playerList,
  dragHandleProps, // For drag handle in edit mode
  isDragging, // For drag-specific styles
  playerCard,
  setPlayerCard,
  loading
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
                <div className="player-name-wrapper"><p className="player-name">{player.full_name ? player.full_name : "N/A"}</p> {player.years_exp === 0 && player.position !== "DEF" ? (
                  <div className="player-rookie"><img src="/images/rookie.svg" draggable="false" /></div>
                ) : null}</div>
              </div>
              <div className="player-item-info-details flex">
                <span>OVR: {overallRank ? overallRank : "N/A"}</span>
                <span className={`player-pos ${player.position ? player.position : "N/A"}`}>
                  {player.position ? player.position : "N/A"} {check(playerList, player)}
                </span>
                {player.currentTeam ? (
                  <span style={{ backgroundColor: `var(--${player.currentTeam.toLowerCase()})`, borderColor: `var(--${player.currentTeam.toLowerCase()})` }}>{player.currentTeam}</span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      {playerCard?.some(obj => obj.playerId === player.playerId) ? <PlayerTable key={player} player={player} playerSeasons={playerSeasons} playerCard={playerCard} setPlayerCard={setPlayerCard} loading={loading} /> : ""}
    </div>
  );
};

export default PlayerItem;