"use client";
import { useEffect, useState } from 'react';
import { players } from '../../top400'

const Players = () => {

  const [allPlayers, setAllPlayers] = useState(players);

  const [wrs, setWrs] = useState(players.filter(pos => pos.position === "WR"));
  const [rbs, setRbs] = useState(players.filter(pos => pos.position === "RB"));
  const [qbs, setQbs] = useState(players.filter(pos => pos.position === "QB"));
  const [tes, setTes] = useState(players.filter(pos => pos.position === "TE"));

  const check = (player) => {
    if (player.position) {
      const truth = allPlayers.filter(i => i.position === player.position).findIndex(item => item.full_name === player.full_name)
      return truth + 1
    }
    return null;
  };
  



  return (
    <>
        {allPlayers.map((player, index) => (
            <div className='player-item flex' key={index}>
              <div className='player-item-img-wrapper'>
                <img src={player.playerImg} />
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