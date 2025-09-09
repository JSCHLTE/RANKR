"use client";

import React, { useState, useEffect } from 'react';
import PlayersEdit from './PlayersEdit';
import PlayersRankings from './PlayersRankings';
import { getDatabase, ref, set, get } from "firebase/database";
import { db } from '@/app/firebase';
import Loading from '@/app/components/loading/Loading';
import { usePlayerContext } from '@/app/providers/players/PlayersList';
import ButtonLink from '@/app/components/buttons/ButtonLink';

const Players = () => {

  const { players } = usePlayerContext();
  const [rankings, setRankings] = useState();
  const [playerList, setPlayerList] = useState();
  const [unsaved, setUnsaved] = useState();
  const [editMode, setEditMode] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchRankings = async () => {
      const rankingRef = ref(db, "rankr-ppr-template");

      try {
        const snapshot = await get(rankingRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const rankingsArray = Array.isArray(data)
            ? data
            : Object.values(data);

            setRankings(rankingsArray);
        } else {
          console.log("No player data available");
        }
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchRankings();
  }, []);

    useEffect(() => {
      if (!players || !rankings) return;

      const orderedPlayers = rankings
        .map((id) => players.find((p) => String(p.playerId) === String(id)))
        .filter(Boolean)

      setPlayerList(orderedPlayers.filter(player => player.status === "Active"));
      setUnsaved(orderedPlayers);

    }, [players, rankings]);

  const saveRankings = () => {
    const playersRef = ref(db, "rankr-ppr-template");
    const newOrder = playerList.map(item => item.playerId)

    set(playersRef, newOrder)
      .then(() => {
        setEditMode(null);
      })
      .catch((error) => {
        console.error("Error saving players: ", error);
      })
  }

  const cancelEdit = () => {
    setEditMode(null);
    setPlayerList(unsaved);
  }

  if(!playerList) return <Loading />

  return (
    <>
    <div className='edit-buttons flex-center'>
      {editMode ? <ButtonLink variant="main" onClick={saveRankings}>Save Rankings</ButtonLink> : <ButtonLink variant="main" onClick={() => setEditMode(prev => !prev)}>Edit Rankings</ButtonLink>}
      {editMode ? <ButtonLink variant="alt" onClick={() => cancelEdit()}>Cancel</ButtonLink> : ''}
    </div>
      {editMode ? <PlayersEdit playerList={playerList} setPlayerList={setPlayerList}/> : <PlayersRankings playerList={playerList} loading={loading}/>}
    </>
  )
}

export default Players;