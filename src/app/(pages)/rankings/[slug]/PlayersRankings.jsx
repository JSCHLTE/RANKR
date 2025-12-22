"use client";

import { useEffect, useMemo, useState } from "react";
import PositionFilters from "./PositionFilters";
import PlayerList from "./PlayerList";

import styles from "./playerSearch.module.css";
import Filters from "./(filters)/Filters";

const POSITIONS = ['QB', 'RB', 'WR', 'TE'];

const PlayersRankings = ({ playerList }) => {

  const [searchValue, setSearchValue] = useState("");
  const [activeFilter, setActiveFilter] = useState(undefined);
  const [positionFilter, setPositionFilter] = useState([]);
  const [playerCard, setPlayerCard] = useState([]);

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

  return (
    <>
      <input
        type="text"
        placeholder="Search player..."
        className={styles.playerSearch}
        value={searchValue}
        onChange={({ target }) => setSearchValue(target.value)}
      />
      <PositionFilters
        positionFilter={positionFilter}
        handleFilter={handleFilter}
        resetFilters={() => setPositionFilter([])}
        POSITIONS={POSITIONS}
      />
      <Filters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <PlayerList
        players={displayPlayers}
        playerList={playerList} // For global ranks
        setPlayerCard={setPlayerCard}
        playerCard={playerCard}
      />
    </>
  );
};

export default PlayersRankings;