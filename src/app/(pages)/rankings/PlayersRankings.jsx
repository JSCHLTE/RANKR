"use client";

import { useEffect, useMemo, useState } from "react";
import PlayerCard from "./PlayerCard";
import PositionFilters from "./PositionFilters";
import PlayerList from "./PlayerList";

const POSITIONS = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'];

const PlayersRankings = ({ playerList }) => {
  
  const [searchValue, setSearchValue] = useState("");
  const [positionFilter, setPositionFilter] = useState([]);
  const [playerCard, setPlayerCard] = useState([]);

  useEffect(() => {
    console.log(playerCard)
  }, [playerCard])

  const displayPlayers = useMemo(() => {
    let filtered = playerList;

    // Apply position filters
    if (positionFilter.length > 0) {
      const isRookieFilter = positionFilter.includes('Rookie');
      const posFilters = positionFilter.filter(p => p !== 'Rookie');

      //Checks if player is a rookie and that the item is not a defense
      if (isRookieFilter) {
        filtered = filtered.filter(player => player?.years_exp === 0 && player?.position !== "DEF");
      }

      //Filters players by position
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
        POSITIONS={POSITIONS}
      />
      <PlayerList
        players={displayPlayers}
        playerList={playerList} // For global ranks
        setPlayerCard={setPlayerCard}
        getHeight={getHeight}
        playerCard={playerCard}
      />
    </>
  );
};

export default PlayersRankings;