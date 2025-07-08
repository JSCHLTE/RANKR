"use client";

import React, { useState, useEffect } from 'react';
import PlayersEdit from './PlayersEdit';
import PlayersRankings from './PlayersRankings';
import { getDatabase, ref, set, get } from "firebase/database";
import { db } from '@/app/firebase';
import Loading from '@/app/components/loading/Loading';

const Players = () => {

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(null);
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
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

  const saveRankings = () => {
    setLoading(true);
    
    const playersRef = ref(db, "rankr-rankings");

    set(playersRef, players)
      .then(() => {
        alert("Rankings have been saved!");
        setLoading(null);
        setEditMode(null);
      })
      .catch((error) => {
        console.error("Error saving players: ", error);
        setLoading(null);
      })

  }

  if(loading) return <Loading />;

  return !loading && (
    <>
    <div className='edit-buttons flex-center'>
      {editMode ? <button className='btn main' onClick={saveRankings}>Save Rankings</button> : <button className='btn main' onClick={() => setEditMode(prev => !prev)}>Edit Rankings</button>}
      {editMode ? <button className='btn alt' onClick={() => setEditMode(null)}>Cancel</button> : ''}
    </div>
      {editMode ? <PlayersEdit players={players} setPlayers={setPlayers}/> : <PlayersRankings players={players}/>}
    </>
  )
}

export default Players;