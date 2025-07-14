"use client";

import { createContext, useEffect, useState } from "react";
import { check } from "@/app/providers/posRanking/posRanking";
import { ref, get } from "firebase/database";
import { db } from "../../firebase";
import Loading from "@/app/components/loading/Loading";

const PlayersRankings = ({ playerList }) => {

  const [displayPlayers, setDisplayPlayers] = useState(playerList);
  const [playerCard, setPlayerCard] = useState();
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

  const getHeight = (height) => {
    const feet = Math.floor(height / 12);
    const inches = height % 12;
    const heightString = `${feet}'${inches}"`;
    console.log(heightString)
    return heightString;
  }

  useEffect(() => {
    setSearchValue("");
    if(positionFilter.length <= 0) {
      setDisplayPlayers(playerList);
      return;
    }
    let filter = playerList.filter(player => positionFilter.includes(player?.position))
    if(positionFilter.includes("Rookie")) {
      let rookies = playerList.filter(player => player?.years_exp === 0 && player?.position !== "DEF");
      let filter = rookies.filter(player => positionFilter.includes(player?.position))
      if(positionFilter.length > 1) {
        setDisplayPlayers(filter);
      } else {
        setDisplayPlayers(rookies);
      }
      return;
    }
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
        <button onClick={() => handleFilter("Rookie")} className={positionFilter.includes("Rookie") ? 'active' : ''}>Rookie</button>
        <button onClick={() => handleFilter("K")} className={positionFilter.includes("K") ? 'active' : ''}>K</button>
        <button onClick={() => handleFilter("DEF")} className={positionFilter.includes("DEF") ? 'active' : ''}>DEF</button>
        </div></div>

        <div className='players-custom-wrapper flex'>
          {displayPlayers?.map((player, index) => (
            <div className='player-item flex' key={index} onClick={() => setPlayerCard(player)}>
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
                    { player?.years_exp === 0 && player?.position !== "DEF" ? <span className="player-rookie">Rookie</span> : "" }
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        { playerCard ? <div className="player-card-wrapper">
          <div className="player-card-header flex">
            <div className="player-card-header-img">
            <img src={playerCard?.playerImg ? playerCard?.playerImg : "/images/player-default.webp"} onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'images/player-default.webp'
                    }}/>
            </div>
            <div className="player-card-header-info flex">
              <div className="player-card-name">
                <h4>{playerCard.full_name}</h4>
              </div>
              <div className="player-card-player-info">
                    <div className="player-card-player-info age">
                      <h5>Age</h5>
                      <span>{playerCard.age}</span>
                    </div>
                    <div className="player-card-player-info height">
                      <h5>Height</h5>
                      <span>{getHeight(playerCard.height)}</span>
                    </div>
                    <div className="player-card-player-info weight">
                      <h5>Weight</h5>
                      <span>{playerCard.weight}</span>
                    </div>
                    <div className="player-card-player-info exp">
                      <h5>Exp</h5>
                      <span>{playerCard.years_exp}</span>
                    </div>
                    <div className="player-card-player-info college">
                      <h5>College</h5>
                      <span>{playerCard.college}</span>
                    </div>
              </div>
            </div>
          </div>
        </div> : "" }
    </>
  )
}

export default PlayersRankings