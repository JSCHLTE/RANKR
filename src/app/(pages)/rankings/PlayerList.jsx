import Loading from "@/app/components/loading/Loading";
import PlayerItem from "./PlayerItem"; // Adjust path as needed
import { getStats } from "@/app/providers/players/getStats";

const PlayerList = ({ players, playerList, playerCard, setPlayerCard }) => {
  if (!playerList) return <Loading />;


  const handlePlayerClick = (player) => {
    setPlayerCard(async prev => {
      if(prev.playerId?.includes(player.playerId)) return prev.filter(item => item !== player.playerId) 
        return {
          ...prev,
          [player.playerId]: { stats: getStats(player.playerId) }
        };
    }) 
  }

  
  return (
    <div className="players-custom-wrapper flex">
      {players?.map((player, index) => (
        <PlayerItem
          key={player.full_name}
          player={player}
          overallRank={playerList.indexOf(player) + 1} // Or optimize to index + 1 if players === playerList
          onClick={() => handlePlayerClick(player)}
          playerList={playerList}
          playerCard={playerCard}
        />
      ))}
    </div>
  );
};

export default PlayerList;