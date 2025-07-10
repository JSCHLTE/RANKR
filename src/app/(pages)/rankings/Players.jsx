"use client";

import React, { useState, useEffect } from 'react';
import PlayersEdit from './PlayersEdit';
import PlayersRankings from './PlayersRankings';
import { getDatabase, ref, set, get } from "firebase/database";
import { db } from '@/app/firebase';
import Loading from '@/app/components/loading/Loading';
import { usePlayerContext } from '@/app/providers/players/PlayersList';

const Players = () => {

  const { players, loading } = usePlayerContext();
  const [editMode, setEditMode] = useState(null);


  const saveRankings = () => {
    const playersRef = ref(db, "rankr-rankings");

    set(playersRef, players)
      .then(() => {
        alert("Rankings have been saved!");
        setEditMode(null);
      })
      .catch((error) => {
        console.error("Error saving players: ", error);
      })
  }

  if(loading) return <Loading />

  return (
    <>
    <div className='edit-buttons flex-center'>
      {editMode ? <button className='btn main' onClick={saveRankings}>Save Rankings</button> : <button className='btn main' onClick={() => setEditMode(prev => !prev)}>Edit Rankings</button>}
      {editMode ? <button className='btn alt' onClick={() => setEditMode(null)}>Cancel</button> : ''}
    </div>
      {editMode ? <PlayersEdit players={players}/> : <PlayersRankings players={players} loading={loading}/>}
    </>
  )
}

export default Players;