"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { ref, get, equalTo, query, orderByChild } from "firebase/database";
import { db } from "../../../firebase";
import { useParams } from 'next/navigation';
import { getUserBySlug } from '@/app/providers/getUser/getUser';
import Loading from '@/app/components/loading/Loading';
import { usePlayerContext } from '@/app/providers/players/PlayersList';

const Rankings = () => {
  const { slug } = useParams();
  const { players } = usePlayerContext(); // Assume this can be undefined initially
  const [rankings, setRankings] = useState();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const fetched = await getUserBySlug(slug);
      setUser(fetched);
    };
    fetchUser();
  }, [slug]);

  const fetchRankings = async () => {
    try {
      const rankingsRef = query(
        ref(db, `rankings`),
        orderByChild("author"),
        equalTo(slug)
      );
      const snapshot = await get(rankingsRef);

      if (snapshot.exists()) {
        const rankingsData = snapshot.val();
        const rankingsArray = Object.entries(rankingsData).map(([id, data]) => ({
          id,
          ...data,
        }));
        setRankings(rankingsArray);
      }
    } catch (err) {
      console.error(`${err} an error has occurred.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, [slug]);

  // Memoize a player lookup Map for fast access (O(1) lookups)
  const playerMap = useMemo(() => {
    if (!players) return new Map();
    return new Map(players.map((player) => [player.playerId, player]));
  }, [players]);

  // Function to get top 10 valid players for a given ranking's playerIds
  const getTopValidPlayers = (playerIds) => {
    if (!playerIds || playerIds.length === 0 || playerMap.size === 0) return [];

    const matched = [];
    for (const id of playerIds) {
      const player = playerMap.get(id);
      if (player) {
        matched.push(player);
        if (matched.length === 10) break; // Stop once we have 10 valid
      }
    }
    return matched;
  };

  if (loading) return <p>Fetching {slug}'s rankings...</p>;

  return (
    <>
      {rankings ? 
        rankings.map((ranking, index) => {
          // Compute top players per ranking here
          const topPlayersForThisRanking = getTopValidPlayers(ranking.playerIds);

          return (
            <div key={index} className='ranking-item flex'>
              <div className='ranking-title-wrapper'>
                <h3>{ranking.title}</h3>
              </div>
              <div className='player-list'>
                <ol className='flex'>
                  {topPlayersForThisRanking.length > 0 ? (
                    topPlayersForThisRanking.map((player, playerIndex) => (
                      <li 
                        key={player.playerId || playerIndex}
                        className='flex player-item' 
                      >
                        <img src={player?.playerImg} width={150} height={150} alt={player?.full_name} /> 
                        {player?.full_name}
                      </li>
                    ))
                  ) : (
                    <li>No top players available yet.</li>
                  )}
                </ol>
              </div>
              <div className='format-wrapper flex'>
                <div className='format-item qb flex'>
                  <span className='format-number'>{ranking.format.QB}</span>
                  <span className='format-label'>QB</span>
                </div>
                <div className='format-item rb flex'>
                  <span className='format-number'>{ranking.format.RB}</span>
                  <span className='format-label'>RB</span>
                </div>
                <div className='format-item wr flex'>
                  <span className='format-number'>{ranking.format.WR}</span>
                  <span className='format-label'>WR</span>
                </div>
                <div className='format-item te flex'>
                  <span className='format-number'>{ranking.format.TE}</span>
                  <span className='format-label'>TE</span>
                </div>
                <div className={`format-item ${ranking.superFlex ? 'sflx' : 'flx'} flex`}>
                  <span className='format-number'>{ranking.format.FLEX}</span>
                  <span className='format-label'>{ranking.superFlex ? 'SFLX' : "FLEX"}</span>
                </div>
              </div>
              <div className='user-info flex'>
                <img src={user?.pfp ? user.pfp : '/images/lion-blue.svg'} alt='PFP' width={40} height={40}/>
                <p>{user?.displayName}</p>
              </div>
            </div>
          );
        }) : `No rankings found for ${slug}.`
      }
    </>
  );
};

export default Rankings;