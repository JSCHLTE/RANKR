import React from 'react'
import { playerData } from './playerData'
import Image from "next/image";
import "./playerCard.css"

const PlayerCard = () => {
  return (
    playerData.map((item, index) => (
        <div className="player-card" key={index}>
        <div className="player-card-top" style={{backgroundColor: item.color}}>
          <Image src={item.teamImg} width={500} height={500} alt="player team" className='player-card-team'/>
          <div className="player-card-img">
            <Image src={item.pfp} width="200" height="200" alt='player card'/>
          </div>
          <div className="player-card-info">
              <p className="player-card-name">{item.name}</p>
              <p className="player-card-number">#{item.number} | {item.pos} | {item.team}</p>
          </div>
          </div>
          <div className="player-card-stats">
              <h2>2024 Rankings</h2>
              <div className="player-card-stats-wrapper">
                <div className="stat stat-overall">
                  <span>#{item.POSRank}</span>
                  <p>POS Rank</p>
                </div>
                <div className="stat stat-points">
                  <span>{item.PPRPoints.toFixed(2).replace(".00", "")}</span>
                  <p>PPR Points</p>
                </div>
                <div className="stat stat-avg">
                  <span>{item.PPRAvg.toFixed(2).replace(".00", "")}</span>
                  <p>PPR Avg</p>
                </div>
              </div>
          </div>
      </div>
    ))
  )
}

export default PlayerCard