"use client";

import { createContext, useEffect, useState } from "react";
import { check } from "@/app/providers/posRanking/posRanking";
import { ref, get } from "firebase/database";
import { db } from "../../firebase";
import Loading from "@/app/components/loading/Loading";

const PlayersRankings = ({ playerList }) => {

  const [displayPlayers, setDisplayPlayers] = useState(playerList);
  const [searchValue, setSearchValue] = useState("");
  const [positionFilter, setPositionFilter] = useState([]);

    useEffect(() => {
      if(searchValue.trim().length <= 0) return setDisplayPlayers(playerList);
      setDisplayPlayers(playerList.filter(player => {
        const searchTerm = searchValue.toLowerCase().replace(/[^a-z0-9]/g, '');
        const playerName = player.full_name.toLowerCase().replace(/[^a-z0-9]/g, '');
        return playerName.includes(searchTerm);
      }))
    }, [searchValue, playerList])
  

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
      setDisplayPlayers(playerList);
      return;
    }
    const filter = playerList.filter(player => positionFilter.includes(player?.position))
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
            <div className='player-item flex' key={index}>
              <div className='player-item-all-wrapper flex'>
                <div className='player-item-img-wrapper'>
                  <img src={player?.playerImg ? player?.playerImg : "/images/player-default.webp"} onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'images/player-default.webp'
                    }}/>
                </div>
                <div className='player-item-info-wrapper'>
                  <div className='player-item-info-name'>
                    <p className='player-name'>{player?.full_name}</p>
                  </div>
                  <div className='player-item-info-details flex'>
                    <span>Overall: {playerList.indexOf(player) + 1}</span>
                    <span className={`player-pos ${player?.position}`}>{player?.position} {check(playerList, player)}</span>
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