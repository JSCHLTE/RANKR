"use client"

import Loading from "@/app/components/loading/Loading";
import PlayerItem from "./PlayerItem"; // Adjust path as needed
import { getStats } from "@/app/providers/players/getStats";
import { useEffect, useState } from "react";

const PlayerList = ({ players, playerList, playerCard, setPlayerCard }) => {

  if (!playerList) return <Loading />;

  const handlePlayerClick = async (player) => {
    const existingPlayerIndex = playerCard.findIndex(obj => obj.playerId === player.playerId);
    
    if (existingPlayerIndex !== -1) {
      setPlayerCard(prev => prev.filter((_, index) => index !== existingPlayerIndex));
      return;
    }
    
    const rawStats = await getStats(player.playerId);
    const cleanStats = rawStats.flatMap(seasonObj => {
      return Object.entries(seasonObj).map(([year, seasonData]) => ({
        year: parseInt(year),
        ...seasonData
      }));
    });
    
    setPlayerCard(prev => ([
      ...prev,
      { playerId: player.playerId, stats: cleanStats, mode: 'logs' }
    ]));
  };
  
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
          setPlayerCard={setPlayerCard}
        />
      ))}
    </div>
  );
};

export default PlayerList;