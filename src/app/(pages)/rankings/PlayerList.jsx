import Loading from "@/app/components/loading/Loading";
import PlayerItem from "./PlayerItem"; // Adjust path as needed

const PlayerList = ({ players, playerList, setPlayerCard, playerCard }) => {
  if (!playerList) return <Loading />;


  const handlePlayerClick = (player) => {
    console.log("clicked")
    setPlayerCard(prev => {
      if(prev.includes(player.playerId)) return prev.filter(item => item !== player.playerId) 
      return prev?.length >= 1 ? [...prev, player.playerId] : [player.playerId]
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