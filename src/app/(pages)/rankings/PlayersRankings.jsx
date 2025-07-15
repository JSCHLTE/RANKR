// PlayersRankings.jsx (or .js if you prefer)
"use client";

import { useMemo, useState } from "react";
import { check } from "@/app/providers/posRanking/posRanking"; // Assuming this is needed

const POSITIONS = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'];

const PlayersRankings = ({ playerList }) => {
  const [searchValue, setSearchValue] = useState("");
  const [positionFilter, setPositionFilter] = useState([]);
  const [playerCard, setPlayerCard] = useState(null);

  const displayPlayers = useMemo(() => {
    let filtered = playerList;

    // Apply position filters
    if (positionFilter.length > 0) {
      const isRookieFilter = positionFilter.includes('Rookie');
      const posFilters = positionFilter.filter(p => p !== 'Rookie');

      if (isRookieFilter) {
        filtered = filtered.filter(player => player.years_exp === 0 && player.position !== 'DEF');
      }

      if (posFilters.length > 0) {
        filtered = filtered.filter(player => posFilters.includes(player.position));
      }
    }

    // Apply search on top (with regex normalization for better matching, e.g., "aj brown" matches "A.J. Brown")
    if (searchValue.trim().length > 0) {
      const searchTerm = searchValue.toLowerCase().replace(/[^a-z0-9]/g, '');
      filtered = filtered.filter(player => {
        const playerName = player.full_name.toLowerCase().replace(/[^a-z0-9]/g, '');
        return playerName.includes(searchTerm);
      });
    }

    return filtered;
  }, [playerList, positionFilter, searchValue]);

  const handleFilter = (pos) => {
    setPositionFilter(prev =>
      prev.includes(pos) ? prev.filter(item => item !== pos) : [...prev, pos]
    );
  };

  const getHeight = (height) => {
    const feet = Math.floor(height / 12);
    const inches = height % 12;
    return `${feet}'${inches}"`;
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search player..."
        className="player-search"
        value={searchValue}
        onChange={({ target }) => setSearchValue(target.value)}
      />
      <PositionFilters
        positionFilter={positionFilter}
        handleFilter={handleFilter}
        resetFilters={() => setPositionFilter([])}
      />
      <PlayerList
        players={displayPlayers}
        playerList={playerList} // For global ranks
        onPlayerClick={setPlayerCard}
      />
      {playerCard && (
        <PlayerCard player={playerCard} onClose={() => setPlayerCard(null)} getHeight={getHeight} />
      )}
    </>
  );
};

// Extracted: Filters
const PositionFilters = ({
  positionFilter,
  handleFilter,
  resetFilters,
}) => (
  <div className="filter-items flex">
    <span>Position:</span>
    <div className="filter-buttons flex">
      <button className={positionFilter.length <= 0 ? 'active' : ''} onClick={resetFilters}>
        All
      </button>
      {POSITIONS.map(pos => (
        <button
          key={pos}
          onClick={() => handleFilter(pos)}
          className={positionFilter.includes(pos) ? 'active' : ''}
        >
          {pos}
        </button>
      ))}
      <button
        onClick={() => handleFilter('Rookie')}
        className={positionFilter.includes('Rookie') ? 'active' : ''}
      >
        Rookie
      </button>
    </div>
  </div>
);

// Extracted: Player List
const PlayerList = ({
  players,
  playerList,
  onPlayerClick,
}) => (
  <div className="players-custom-wrapper flex">
    {players.map((player) => (
      <div className="player-item flex" key={player.full_name} onClick={() => onPlayerClick(player)}>
        <div className="player-item-all-wrapper flex">
          <div className="player-item-img-wrapper">
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

// Extracted: Player Card (add your full stats JSX here; I kept it as a skeleton)
const PlayerCard = ({
  player,
  onClose,
  getHeight,
}) => (
  <div className="player-card-wrapper">
    <button onClick={onClose}>Close</button> {/* Simple close button */}
    <div className={`player-card-header flex ${player.currentTeam}`}>
      <div className="player-card-header-wrapper flex">
        <div className="player-card-header-img">
          <img
            src={player.playerImg ?? "/images/player-default.webp"}
            onError={(e) => (e.currentTarget.src = "/images/player-default.webp")}
            alt={player.full_name}
          />
        </div>
        <div className="player-card-header-right">
          <div className="player-card-name">
            <h4>{player.full_name}</h4>
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
        </div>
      </div>
      <img
        src={`https://sleepercdn.com/images/team_logos/nfl/${player.currentTeam.toLowerCase()}.png`}
        alt={`${player.currentTeam} logo`}
      />
    </div>
    <div className="player-card-seperator">
      <p>STATS</p>
    </div>
  </div>
);

export default PlayersRankings;