import { teams } from "@/app/providers/teams/TeamProvider";

const PlayerCard = ({
    player,
    onClose,
    getHeight,
  }) => (
    <div className="player-card-wrapper">
      <div className={`player-card-header flex`} style={{ '--team-color': `var(--${player.currentTeam.toLowerCase()})`}}>
        <div className="player-card-header-wrapper flex">
        <div className="player-card-header-left flex">
            <div className="player-card-img-group">
            <img
                src={`https://sleepercdn.com/images/team_logos/nfl/${player.currentTeam.toLowerCase()}.png`}
                alt={`${player.currentTeam} logo`}
                className="player-card-team-logo"
                />
                <img
                src={player.playerImg ?? "/images/player-default.webp"}
                onError={(e) => (e.currentTarget.src = "/images/player-default.webp")}
                alt={player.full_name}
                className="player-card-player-img"
                />
            </div>
        </div>
          <div className="player-card-header-right flex">
            <div className="player-card-name">
              <h4>{player.full_name}</h4>
            </div>
            <div className="player-card-header-left-pos-info flex">
                <div className="number"><p>#{player.number}</p></div>
                <div className="position"><p>{player.position}</p></div>
                <div className="team">{teams[player.currentTeam].name}</div>
            </div>
          </div>
        </div>
      </div>
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
              </div>
            </div>
      <div className="player-card-seperator">
        <p>STATS</p>
      </div>
      <button onClick={onClose}>Close</button> {/* Simple close button */}
    </div>
  );

export default PlayerCard