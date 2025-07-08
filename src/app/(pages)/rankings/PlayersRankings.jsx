"use client";

import { useEffect, useState } from "react";
import { check } from "@/app/providers/posRanking/posRanking";

const PlayersRankings = ({ players }) => {

  const [displayPlayers, setDisplayPlayers] = useState(players)
  const [filteredPlayers, setFilteredPlayers] = useState(players);
  const [searchValue, setSearchValue] = useState("");
  const [positionFilter, setPositionFilter] = useState([]);

  useEffect(() => {
    if(searchValue.trim().length <= 0) setDisplayPlayers(players);
    setDisplayPlayers(filteredPlayers?.filter(player => player.full_name.toLowerCase().includes(searchValue.toLowerCase())));
  }, [searchValue]);
  

  const handleFilter = (pos) => {
    if(positionFilter.includes(pos)) {
      setPositionFilter(prev => prev.filter(item => item !== pos))
      return
    }
    setPositionFilter(prev => [...prev, pos])
  }

  useEffect(() => {
    setSearchValue("");
    if(positionFilter.length <= 0) {
      setFilteredPlayers(players);
      setDisplayPlayers(players);
      return;
    }
    const filter = players.filter(player => positionFilter.includes(player.position))
    setFilteredPlayers(filter)
    setDisplayPlayers(filter)
  }, [positionFilter])

  return (
    <>
    <input type='text' placeholder='Search player...' className='player-search' id="playerSearch" value={searchValue} onChange={({ target }) => setSearchValue(target.value)}/>
    <div className="filter-items flex">
      <span>Position:</span>
      <div className="filter-buttons flex">
        <button className={`${positionFilter.length <= 0 ? 'active' : ''}`} onClick={() => setPositionFilter([])}>All</button>
        <button onClick={() => handleFilter("QB")} className={positionFilter.includes("QB") ? 'active' : ''}>QB</button>
        <button onClick={() => handleFilter("RB")} className={positionFilter.includes("RB") ? 'active' : ''}>RB</button>
        <button onClick={() => handleFilter("WR")} className={positionFilter.includes("WR") ? 'active' : ''}>WR</button>
        <button onClick={() => handleFilter("TE")} className={positionFilter.includes("TE") ? 'active' : ''}>TE</button>
        <button onClick={() => handleFilter("K")} className={positionFilter.includes("K") ? 'active' : ''}>K</button>
        <button onClick={() => handleFilter("DEF")} className={positionFilter.includes("DEF") ? 'active' : ''}>DEF</button>
        </div></div>

        <div className='players-custom-wrapper flex'>
          {displayPlayers?.map((player, index) => (
            <div className='player-item flex' key={player.full_name}>
              <div className='player-item-all-wrapper flex'>
                <div className='player-item-img-wrapper'>
                  <img src={player.playerImg ? player.playerImg : "/images/player-default.webp"} onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'images/player-default.webp'
                    }}/>
                </div>
                <div className='player-item-info-wrapper'>
                  <div className='player-item-info-name'>
                    <p className='player-name'>{player.full_name}</p>
                  </div>
                  <div className='player-item-info-details flex'>
                    <span>Overall: {player?.order}</span>
                    <span className={`player-pos ${player.position}`}>{player.position} {check(players, player)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
    </>
  )
}

export default PlayersRankings