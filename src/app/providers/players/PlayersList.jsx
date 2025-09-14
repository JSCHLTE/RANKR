"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../../firebase";

const PlayerContext = createContext();

export function PlayersList({ children } = {}) {
  const [players, setPlayers] = useState(null);

  //Grabs player data
  useEffect(() => {
    const fetchPlayers = async () => {
      const playersRef = ref(db, "fantasy-players");

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
      }
    };

    fetchPlayers();
  }, []);

  return (
    <PlayerContext.Provider value={{ players }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  return useContext(PlayerContext);
}