"use client";

import React, { useState, useEffect } from 'react';
import PlayersEdit from './PlayersEdit';
import PlayersRankings from './PlayersRankings';
import { getDatabase, ref, set, get } from "firebase/database";
import Loading from '@/app/components/loading/Loading';

const Players = () => {

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(null);
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      const db = getDatabase();
      const rankingsRef = ref(db, "rankr-rankings");

      try {
        const snapshot = await get(rankingsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();

          const playersArray = Array.isArray(data)
            ? data
            : Object.values(data);

          setPlayers(playersArray);
          setLoading(false);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  const savePlayers = (name) => {
    console.log("hi" + name)
  }

  if(loading) return <Loading />;

  return !loading && (
    <>
      <button onClick={() => setEditMode(prev => !prev)}>{editMode ? "Save Rankings" : "Edit Rankings"}</button>
      {editMode ? <PlayersEdit players={players} savePlayers={savePlayers}/> : <PlayersRankings players={players}/>}
    </>
  )
}

export default Players;