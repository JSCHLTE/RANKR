"use client";

import React, { useState, useEffect } from 'react';
import PlayersEdit from './PlayersEdit';
import PlayersRankings from './PlayersRankings';
import { ref, set, get } from "firebase/database";
import { db } from '@/app/firebase';
import Loading from '@/app/components/loading/Loading';
import { usePlayerContext } from '@/app/providers/players/PlayersList';
import ButtonLink from '@/app/components/buttons/ButtonLink';
import { useParams } from 'next/navigation';
import { getUserById } from '@/app/providers/getUser/getUser';
import Link from 'next/link';
import { useAuth } from '@/app/providers/AuthProvider';

const Players = () => {

  const { slug } = useParams();
  const { players } = usePlayerContext();
  const { user } = useAuth();
 
  const [rankings, setRankings] = useState();
  const [rankData, setRankData] = useState();
  const [userData, setUserData] = useState();
  const [playerList, setPlayerList] = useState();
  const [unsaved, setUnsaved] = useState();
  const [editMode, setEditMode] = useState(null);
  const [loading, setLoading] = useState(null);
  const [author, setAuthor] = useState(null)

  //Pulls ranking id from url slug
  useEffect(() => {
    const fetchRankings = async () => {
      const rankingRef = ref(db, `rankings/${slug}`);

      try {
        const snapshot = await get(rankingRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const rankingsArray = Array.isArray(data.playerIds)
            ? data.playerIds
            : Object.values(data.playerIds);

            setRankings(rankingsArray);
            setRankData(data);
        } else {
          console.log("No player data available");
          setPlayerList();
        }
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchRankings();
  }, []);

  //Gets player information from the player id we got from rankings.playerIds
    useEffect(() => {
      if (!players || !rankings) return;

      const orderedPlayers = rankings
        .map((id) => players.find((p) => String(p.playerId) === String(id)))
        .filter(Boolean)

      setPlayerList(orderedPlayers.filter(player => player.status === "Active"));
      setUnsaved(orderedPlayers);

    }, [players, rankings]);

  //Saves rankings
  const saveRankings = () => {
    const playersRef = ref(db, `rankings/${slug}/playerIds`);
    const dateRef = ref(db, `rankings/${slug}/updatedAt`)
    const newOrder = playerList.map(item => item.playerId)
    const newDate = new Date().toISOString();

    set(dateRef, newDate)
    set(playersRef, newOrder)
      .then(() => {
        setEditMode(null);
      })
      .catch((error) => {
        console.error("Error saving players: ", error);
      })

      setRankings(newOrder)
  }

  const cancelEdit = () => {
    setEditMode(null);
    setPlayerList(unsaved);
  }

  //Fetches user data for authors username
  useEffect(() => {
    const getUser = async () => {
      setUserData(await getUserById(rankData.uid))
    }

    if(rankData) getUser();
    if(rankData?.uid === user?.uid) setAuthor(true);
  }, [rankData])

  if(!playerList) return <Loading />

  return (
    <>
    <header className="rankings-header flex">
      <h1>{rankData ? rankData.title : "Title of Ranking"}</h1>
      <Link href={`/users/${userData?.username}`}>
        <div className='author-wrapper flex'>
          <div className='author-img'>
            <img src={userData?.pfp ? userData.pfp : '/images/lion-blue.svg'} alt='User profile picture' width={50} height={50}/>
        </div>
          <p className='username'>{userData ? userData.displayName : "User"}</p>
        </div>
      </Link>
      { author ? <div className='edit-buttons flex'>
          {editMode ? <ButtonLink variant="main create" onClick={saveRankings}>Save Order</ButtonLink> : <ButtonLink variant="main create" onClick={() => setEditMode(prev => !prev)}>Edit Order</ButtonLink>}
          {editMode ? <ButtonLink variant="alt cancel" onClick={() => cancelEdit()}>Cancel</ButtonLink> : ''}
        </div> : "" }
    </header>
      <main className="player-rankings-wrapper flex">
          {editMode ? <PlayersEdit playerList={playerList} setPlayerList={setPlayerList}/> : <PlayersRankings playerList={playerList} loading={loading}/>}
      </main>
      </>
  )
}

export default Players;