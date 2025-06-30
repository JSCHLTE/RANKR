"use client";
import { players } from '../../top400'

const Players = () => {
  return (
    <>
        {players.map((player, index) => (
            <div className='player-item flex' key={index}>
              <div className='player-item-img-wrapper'>
                <img src={player.playerImg} />
              </div>
              <div className='player-item-info-wrapper'>
                <div className='player-item-info-name'>
                  <p className='player-name'>{player.full_name}</p>
                </div>
                <div className='player-item-info-details'>
                  <span>Rank: {player.rank}</span>
                  <span className={`player-pos ${player.position}`}>{player.position}</span>
                </div>
              </div>
            </div>
        ))}
    </>
  )
}

export default Players