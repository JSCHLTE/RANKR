"use client";

import { useEffect, useState } from "react";
import { players } from "../../top400"

const Players = () => {

  const [allPlayers, setAllPlayers] = useState(players);
  const [displayPlayers, setDisplayPlayers] = useState(allPlayers)
  const [searchValue, setSearchValue] = useState("");
  const [positionFilter, setPositionFilter] = useState([]);

  const check = (player) => {
    if (player.position) {
      const truth = allPlayers.filter(i => i.position === player.position).findIndex(item => item.full_name === player.full_name)
      return truth + 1
    }
    return null;
  };

  useEffect(() => {
    if(searchValue.trim().length <= 0) setDisplayPlayers(allPlayers);
    setDisplayPlayers(allPlayers.filter(player => player.full_name.toLowerCase().includes(searchValue.toLowerCase())));
  }, [searchValue]);

  useEffect(() => {

  }, [positionFilter]);
  

  const handleFilter = (pos) => {
    if(positionFilter.includes(pos)) return
    setPositionFilter(prev => [...prev, pos])
  }

  useEffect(() => {
    console.log(positionFilter)
  }, [positionFilter])

  return (
    <>
    <input type='text' placeholder='Search player...' className='player-search' id="playerSearch" value={searchValue} onChange={({ target }) => setSearchValue(target.value)}/>
    <div className="filter-items flex"><span>Position:</span><div className="filter-buttons flex"><button className={`${positionFilter.length <= 0 ? 'active' : ''}`} onClick={() => setPositionFilter([])}>All</button><button onClick={() => handleFilter("QB")} className={positionFilter.includes("QB") ? 'active' : ''}>QB</button><button onClick={() => handleFilter("RB")} className={positionFilter.includes("RB") ? 'active' : ''}>RB</button><button onClick={() => handleFilter("WR")} className={positionFilter.includes("WR") ? 'active' : ''}>WR</button><button onClick={() => handleFilter("TE")} className={positionFilter.includes("TE") ? 'active' : ''}>TE</button></div></div>
        {displayPlayers.map((player, index) => (
            <div className='player-item flex' key={index}>
              <div className='player-item-img-wrapper'>
                <img src={player.playerImg} onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'images/player-default.webp'
                }}/>
              </div>
              <div className='player-item-info-wrapper'>
                <div className='player-item-info-name'>
                  <p className='player-name'>{player.full_name}</p>
                </div>
                <div className='player-item-info-details flex'>
                  <span>Overall: {index + 1}</span>
                  <span className={`player-pos ${player.position}`}>{player.position} {check(player, index)}</span>
                </div>
              </div>
            </div>
        ))}
    </>
  )
}

export default Players