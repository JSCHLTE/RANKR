"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../firebase";

const PlayerContext = createContext();

export function PlayersList({ children } = {}) {
  const [players, setPlayers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      const playersRef = ref(db, "players");

      try {
        const snapshot = await get(playersRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const playersArray = Array.isArray(data)
            ? data
            : Object.values(data);

          setPlayers(playersArray);
        } else {
          console.log("No player data available");
        }
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <PlayerContext.Provider value={{ players, loading }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  return useContext(PlayerContext);
}