import React from 'react'

const PlayerLogs = ({ playerLogs }) => {
  return (
    <div className='player-logs-wrapper'>
        {playerLogs.map(item => {
            if(item.year == "2024") {
                // Convert games object to array if it's not already an array
                const gamesArray = Array.isArray(item.games) 
                    ? item.games 
                    : Object.values(item.games || {});
                
                console.log('Games array:', gamesArray);
                
                return (
                    <div key={item.team}>
                        <p>{item.team}</p>
                        {gamesArray.map((game, index) => (
                            <div key={index}>
                                {/* Add your game display logic here */}
                                <p>Game: {JSON.stringify(game.fantasyPoints)}</p>
                            </div>
                        ))}
                    </div>
                );
            } else {
                return null;
            }
        })}
    </div>
  )
}

export default PlayerLogs