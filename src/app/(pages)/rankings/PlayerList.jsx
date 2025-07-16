import Loading from "@/app/components/loading/Loading";
import PlayerItem from "./PlayerItem"; // Adjust path as needed

const PlayerList = ({ players, playerList, onPlayerClick }) => {
  if (!playerList) return <Loading />;

  return (
    <div className="players-custom-wrapper flex">
      {players?.map((player, index) => (
        <PlayerItem
          key={player.full_name}
          player={player}
          overallRank={playerList.indexOf(player) + 1} // Or optimize to index + 1 if players === playerList
          onClick={() => onPlayerClick(player)}
          playerList={playerList}
        />
      ))}
    </div>
  );
};

export default PlayerList;