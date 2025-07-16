import { check } from "@/app/providers/posRanking/posRanking";

const PlayerList = ({
    players,
    playerList,
    onPlayerClick,
  }) => (
    <div className="players-custom-wrapper flex">
      {players?.map((player) => (
        <div className="player-item flex" key={player.full_name} onClick={() => onPlayerClick(player)}>
          <div className="player-item-all-wrapper flex">
            <div className="player-item-img-wrapper">
            <img
                src={`https://sleepercdn.com/images/team_logos/nfl/${player?.currentTeam?.toLowerCase()}.png`}
                alt={`${player.currentTeam} logo`}
                className="player-team-logo"
                />
              <img
                src={player.playerImg ?? "/images/player-default.webp"}
                onError={(e) => (e.currentTarget.src = "/images/player-default.webp")}
                alt={player.full_name}
              />
            </div>
            <div className="player-item-info-wrapper">
              <div className="player-item-info-name">
                <p className="player-name">{player.full_name}</p>
              </div>
              <div className="player-item-info-details flex">
                <span>Overall: {playerList.indexOf(player) + 1}</span>
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
      ))}
    </div>
  );

  export default PlayerList