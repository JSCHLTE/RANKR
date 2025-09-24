"use client"

import Loading from "@/app/components/loading/Loading";
import PlayerItem from "./PlayerItem"; // Adjust path as needed
import { getStats } from "@/app/providers/players/getStats";
import { useEffect, useState } from "react";

const PlayerList = ({ players, playerList, playerCard, setPlayerCard }) => {

  if (!playerList) return <Loading />;

  const [loading, setLoading] = useState(null);
  const [statsCache, setStatsCache] = useState({});

  const handlePlayerClick = async (player) => {
    setLoading(true);
    const existingPlayerIndex = playerCard.findIndex(obj => obj.playerId === player.playerId);
    
    if (existingPlayerIndex !== -1) {
      setPlayerCard(prev => prev.filter((_, index) => index !== existingPlayerIndex));
      setLoading(false);
      return;
    }
    
    // Check if stats are already cached
    if (statsCache[player.playerId]) {
      setPlayerCard(prev => ([
        ...prev,
        { playerId: player.playerId, stats: statsCache[player.playerId], mode: 'logs' }
      ]));
      setLoading(false);
      return;
    }
    
    // Fetch stats only if not cached
    const rawStats = await getStats(player.playerId);
    const cleanStats = rawStats.flatMap(seasonObj => {
      return Object.entries(seasonObj).map(([year, seasonData]) => ({
        year: parseInt(year),
        ...seasonData
      }));
    });
    
    // Cache the stats
    setStatsCache(prev => ({
      ...prev,
      [player.playerId]: cleanStats
    }));
    
    setPlayerCard(prev => ([
      ...prev,
      { playerId: player.playerId, stats: cleanStats, mode: 'logs' }
    ]));
    setLoading(false);
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
          loading={loading}
        />
      ))}
    </div>
  );
};

export default PlayerList;