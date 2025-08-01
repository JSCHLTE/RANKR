import React from 'react'
import "../CSS/playerTableToggle.css"

const PlayerTableToggle = ({ player, playerCard, setPlayerCard }) => {

    const pCard = playerCard.find(item => item.playerId === player.playerId)?.mode

    const handleTable = (p, mode) => {
        console.log(playerCard)
        setPlayerCard(prev => prev.map(item => {
            if(item.playerId === p.playerId) {
                return {...item, mode: mode}
            } else {
                return item
            }
        }));
    };

  return (
    <div className='table-filter flex'>
        <button className={`table-logs ${pCard === 'logs' ? 'active' : ''}`} onClick={() => handleTable(player, 'logs')}>Logs</button>
        <button className={`table-career ${pCard === 'career' ? 'active' : ''}`} onClick={() => handleTable(player, 'career')}>Career</button>
    </div>
  )
}

export default PlayerTableToggle